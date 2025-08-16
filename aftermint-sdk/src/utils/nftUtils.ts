import * as fcl from '@onflow/fcl';

export interface NFTOwnership {
  hasNFTs: boolean;
  balance: number;
  tokenIds: string[];
  metadata: Record<string, any>[];
}

export async function checkNFTOwnership(
  walletAddress: string,
  contractAddress: string
): Promise<NFTOwnership> {
  try {
    // Flow script to check NFT ownership
    const script = `
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import GhibliNFT from ${contractAddress}

      pub fun main(address: Address): {String: AnyStruct} {
        let account = getAccount(address)
        
        let collectionRef = account
          .getCapability(GhibliNFT.CollectionPublicPath)
          .borrow<&{NonFungibleToken.CollectionPublic}>()
        
        if collectionRef == nil {
          return {
            "hasNFTs": false,
            "balance": 0,
            "tokenIds": [] as [UInt64],
            "metadata": [] as [AnyStruct]
          }
        }
        
        let ids = collectionRef!.getIDs()
        let metadata: [AnyStruct] = []
        
        for id in ids {
          let nft = collectionRef!.borrowNFT(id: id)
          // Add metadata extraction logic here if needed
          metadata.append({})
        }
        
        return {
          "hasNFTs": ids.length > 0,
          "balance": ids.length,
          "tokenIds": ids,
          "metadata": metadata
        }
      }
    `;

    const result = await fcl.query({
      cadence: script,
      args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
    });

    return {
      hasNFTs: result.hasNFTs || false,
      balance: result.balance || 0,
      tokenIds: (result.tokenIds || []).map((id: any) => id.toString()),
      metadata: result.metadata || [],
    };
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    return {
      hasNFTs: false,
      balance: 0,
      tokenIds: [],
      metadata: [],
    };
  }
}

export function formatTokenId(tokenId: string | number): string {
  return tokenId.toString();
}

export function formatContractAddress(address: string): string {
  if (!address.startsWith('0x')) {
    return `0x${address}`;
  }
  return address;
}