export interface AfterMintConfig {
  apiKey: string;
  environment?: 'development' | 'staging' | 'production';
  flowNetwork?: 'testnet' | 'mainnet';
  rewardsJsonUrl?: string;
  debug?: boolean;
}

export interface RewardOffer {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'exclusive_content' | 'physical_item' | 'experience' | 'token';
  value: string;
  imageUrl?: string;
  expiresAt?: string;
  requirements: {
    contractAddress: string;
    tokenIds?: string[];
    minBalance?: number;
    traits?: Record<string, string>;
  };
  redemptionUrl?: string;
  litConditions?: any[];
}

export interface NFTMintEvent {
  transactionId: string;
  contractAddress: string;
  tokenId: string;
  owner: string;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface UserWallet {
  address: string;
  isConnected: boolean;
  provider: string;
  chainId?: string;
}

export interface AfterMintContextType {
  config: AfterMintConfig;
  wallet: UserWallet | null;
  isInitialized: boolean;
  rewards: RewardOffer[];
  showRewardModal: (nftData?: any) => void;
  hideRewardModal: () => void;
  checkAccess: (requirements: RewardOffer['requirements']) => Promise<boolean>;
}