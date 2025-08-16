import { useState, useEffect, useCallback } from 'react';
import { RewardOffer, UserWallet } from '../types';
import { checkNFTOwnership } from '../utils/nftUtils';

interface RewardGateOptions {
  rewardsJsonUrl: string;
  wallet: UserWallet | null;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useRewardGate({ 
  rewardsJsonUrl, 
  wallet, 
  autoRefresh = true,
  refreshInterval = 30000 
}: RewardGateOptions) {
  const [rewards, setRewards] = useState<RewardOffer[]>([]);
  const [availableRewards, setAvailableRewards] = useState<RewardOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(rewardsJsonUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch rewards: ${response.statusText}`);
      }

      const data = await response.json();
      const rewardOffers: RewardOffer[] = data.rewards || [];
      
      setRewards(rewardOffers);

      // Filter rewards based on wallet ownership
      if (wallet?.address) {
        const available = await Promise.all(
          rewardOffers.map(async (reward) => {
            const hasAccess = await checkAccess(reward.requirements, wallet.address);
            return hasAccess ? reward : null;
          })
        );

        setAvailableRewards(available.filter(Boolean) as RewardOffer[]);
      } else {
        setAvailableRewards([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  }, [rewardsJsonUrl, wallet]);

  const checkAccess = useCallback(async (
    requirements: RewardOffer['requirements'],
    walletAddress: string
  ): Promise<boolean> => {
    try {
      const { contractAddress, tokenIds, minBalance, traits } = requirements;

      // Check NFT ownership
      const ownership = await checkNFTOwnership(walletAddress, contractAddress);
      
      if (!ownership.hasNFTs) {
        return false;
      }

      // Check minimum balance requirement
      if (minBalance && ownership.balance < minBalance) {
        return false;
      }

      // Check specific token IDs
      if (tokenIds && tokenIds.length > 0) {
        const hasRequiredTokens = tokenIds.some(tokenId => 
          ownership.tokenIds.includes(tokenId)
        );
        if (!hasRequiredTokens) {
          return false;
        }
      }

      // Check traits (simplified - would need more complex logic for real implementation)
      if (traits && Object.keys(traits).length > 0) {
        // This would require fetching NFT metadata and checking traits
        // For now, we'll assume trait checking passes
        console.log('Trait checking not fully implemented:', traits);
      }

      return true;
    } catch (error) {
      console.error('Error checking access:', error);
      return false;
    }
  }, []);

  const refreshRewards = useCallback(() => {
    fetchRewards();
  }, [fetchRewards]);

  const getPersonalizedOffers = useCallback((nftData?: any): RewardOffer[] => {
    if (!nftData) return availableRewards;

    // Filter rewards based on the specific NFT that was minted
    return availableRewards.filter(reward => {
      const { contractAddress, tokenIds } = reward.requirements;
      
      // Check if reward is for the contract that was minted
      if (contractAddress.toLowerCase() !== nftData.contractAddress?.toLowerCase()) {
        return false;
      }

      // If specific token IDs are required, check if the minted token qualifies
      if (tokenIds && tokenIds.length > 0) {
        return tokenIds.includes(nftData.tokenId);
      }

      return true;
    });
  }, [availableRewards]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchRewards, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchRewards]);

  return {
    rewards,
    availableRewards,
    loading,
    error,
    refreshRewards,
    checkAccess,
    getPersonalizedOffers,
  };
}