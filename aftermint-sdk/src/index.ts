// Main exports
export { AfterMintProvider, useAfterMint } from './context/AfterMintContext';
export { RewardModal } from './components/RewardModal';

// Hooks
export { useWallet } from './hooks/useWallet';
export { useMintListener } from './hooks/useMintListener';
export { useRewardGate } from './hooks/useRewardGate';

// Utils
export { checkNFTOwnership, formatTokenId, formatContractAddress } from './utils/nftUtils';

// Types
export type {
  AfterMintConfig,
  RewardOffer,
  NFTMintEvent,
  UserWallet,
  AfterMintContextType,
} from './types';

// Default configuration
export const defaultConfig: Partial<AfterMintConfig> = {
  environment: 'development',
  flowNetwork: 'testnet',
  rewardsJsonUrl: '/rewards.json',
  debug: process.env.NODE_ENV === 'development',
};