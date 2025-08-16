import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ExternalLink, Copy, Check } from 'lucide-react';
import { RewardOffer } from '../types';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewards: RewardOffer[];
  nftData?: any;
  onRedeemReward?: (reward: RewardOffer) => void;
}

export function RewardModal({ 
  isOpen, 
  onClose, 
  rewards, 
  nftData,
  onRedeemReward 
}: RewardModalProps) {
  const [copiedReward, setCopiedReward] = useState<string | null>(null);

  const handleCopyCode = async (reward: RewardOffer) => {
    if (reward.redemptionUrl) {
      await navigator.clipboard.writeText(reward.redemptionUrl);
      setCopiedReward(reward.id);
      setTimeout(() => setCopiedReward(null), 2000);
    }
  };

  const handleRedeem = (reward: RewardOffer) => {
    if (onRedeemReward) {
      onRedeemReward(reward);
    } else if (reward.redemptionUrl) {
      window.open(reward.redemptionUrl, '_blank');
    }
  };

  const getRewardIcon = (type: RewardOffer['type']) => {
    switch (type) {
      case 'discount':
        return '🏷️';
      case 'exclusive_content':
        return '🔒';
      case 'physical_item':
        return '📦';
      case 'experience':
        return '🎭';
      case 'token':
        return '🪙';
      default:
        return '🎁';
    }
  };

  const getRewardColor = (type: RewardOffer['type']) => {
    switch (type) {
      case 'discount':
        return 'from-red-400 to-pink-400';
      case 'exclusive_content':
        return 'from-purple-400 to-indigo-400';
      case 'physical_item':
        return 'from-blue-400 to-cyan-400';
      case 'experience':
        return 'from-green-400 to-emerald-400';
      case 'token':
        return 'from-yellow-400 to-orange-400';
      default:
        return 'from-gray-400 to-slate-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
                  <p className="text-emerald-100">
                    Your NFT mint unlocked {rewards.length} exclusive reward{rewards.length !== 1 ? 's' : ''}!
                  </p>
                </div>
              </div>
            </div>

            {/* NFT Info */}
            {nftData && (
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  {nftData.image && (
                    <img
                      src={nftData.image}
                      alt={nftData.nftName || 'NFT'}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{nftData.nftName || 'Your NFT'}</h3>
                    <p className="text-gray-600">by {nftData.creator || 'Unknown'}</p>
                    {nftData.transactionId && (
                      <p className="text-sm text-gray-500">
                        TX: {nftData.transactionId.slice(0, 8)}...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Rewards List */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {rewards.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-xl font-semibold mb-2">No rewards available</h3>
                  <p className="text-gray-600">
                    Check back later for exclusive offers based on your NFT collection!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rewards.map((reward) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        {/* Reward Icon */}
                        <div className={`w-12 h-12 bg-gradient-to-r ${getRewardColor(reward.type)} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                          {getRewardIcon(reward.type)}
                        </div>

                        {/* Reward Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-lg">{reward.title}</h4>
                              <p className="text-gray-600 text-sm mb-2">{reward.description}</p>
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 bg-gradient-to-r ${getRewardColor(reward.type)} text-white text-sm rounded-full`}>
                                  {reward.value}
                                </span>
                                {reward.expiresAt && (
                                  <span className="text-xs text-gray-500">
                                    Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            {reward.imageUrl && (
                              <img
                                src={reward.imageUrl}
                                alt={reward.title}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => handleRedeem(reward)}
                              className={`flex-1 px-4 py-2 bg-gradient-to-r ${getRewardColor(reward.type)} text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Redeem Now
                            </button>

                            {reward.redemptionUrl && (
                              <button
                                onClick={() => handleCopyCode(reward)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                              >
                                {copiedReward === reward.id ? (
                                  <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-green-500">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    Copy Link
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  🔒 These rewards are exclusively for NFT holders
                </p>
                <p className="text-xs text-gray-500">
                  Powered by AfterMint SDK • Secured by Lit Protocol
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}