import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AfterMintConfig, AfterMintContextType, RewardOffer, UserWallet } from '../types';
import { useWallet } from '../hooks/useWallet';
import { useMintListener } from '../hooks/useMintListener';
import { useRewardGate } from '../hooks/useRewardGate';
import { RewardModal } from '../components/RewardModal';

const AfterMintContext = createContext<AfterMintContextType | null>(null);

interface AfterMintProviderProps {
  children: React.ReactNode;
  config: AfterMintConfig;
}

export function AfterMintProvider({ children, config }: AfterMintProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalNftData, setModalNftData] = useState<any>(null);
  const [modalRewards, setModalRewards] = useState<RewardOffer[]>([]);

  const wallet = useWallet();
  
  const {
    availableRewards,
    getPersonalizedOffers,
    checkAccess,
    refreshRewards,
  } = useRewardGate({
    rewardsJsonUrl: config.rewardsJsonUrl || '/rewards.json',
    wallet,
  });

  const { startListening } = useMintListener({
    contractAddress: config.flowNetwork === 'mainnet' 
      ? '0x...' // mainnet contract
      : '0xf8d6e0586b0a20c7', // testnet contract
    onMint: (mintEvent) => {
      if (config.debug) {
        console.log('AfterMint: NFT minted', mintEvent);
      }
      
      // Auto-show reward modal on mint
      const personalizedOffers = getPersonalizedOffers({
        contractAddress: mintEvent.contractAddress,
        tokenId: mintEvent.tokenId,
        owner: mintEvent.owner,
        metadata: mintEvent.metadata,
      });

      if (personalizedOffers.length > 0) {
        showRewardModal({
          nftName: mintEvent.metadata.name,
          creator: mintEvent.metadata.creator,
          transactionId: mintEvent.transactionId,
          image: mintEvent.metadata.thumbnail,
          contractAddress: mintEvent.contractAddress,
          tokenId: mintEvent.tokenId,
        });
      }
    },
  });

  const initialize = useCallback(async () => {
    try {
      if (config.debug) {
        console.log('AfterMint: Initializing SDK', config);
      }

      // Start listening for mint events
      await startListening();

      setIsInitialized(true);

      if (config.debug) {
        console.log('AfterMint: SDK initialized successfully');
      }
    } catch (error) {
      console.error('AfterMint: Initialization failed', error);
    }
  }, [config, startListening]);

  const showRewardModal = useCallback((nftData?: any) => {
    const offers = nftData ? getPersonalizedOffers(nftData) : availableRewards;
    setModalRewards(offers);
    setModalNftData(nftData);
    setShowModal(true);
  }, [availableRewards, getPersonalizedOffers]);

  const hideRewardModal = useCallback(() => {
    setShowModal(false);
    setModalNftData(null);
    setModalRewards([]);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const contextValue: AfterMintContextType = {
    config,
    wallet,
    isInitialized,
    rewards: availableRewards,
    showRewardModal,
    hideRewardModal,
    checkAccess,
  };

  return (
    <AfterMintContext.Provider value={contextValue}>
      {children}
      
      <RewardModal
        isOpen={showModal}
        onClose={hideRewardModal}
        rewards={modalRewards}
        nftData={modalNftData}
        onRedeemReward={(reward) => {
          if (config.debug) {
            console.log('AfterMint: Redeeming reward', reward);
          }
          // Handle reward redemption
        }}
      />
    </AfterMintContext.Provider>
  );
}

export function useAfterMint(): AfterMintContextType {
  const context = useContext(AfterMintContext);
  if (!context) {
    throw new Error('useAfterMint must be used within an AfterMintProvider');
  }
  return context;
}