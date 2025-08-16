import { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { UserWallet } from '../types';

export function useWallet(): UserWallet | null {
  const { primaryWallet, user, isAuthenticated } = useDynamicContext();
  const [wallet, setWallet] = useState<UserWallet | null>(null);

  useEffect(() => {
    if (isAuthenticated && primaryWallet && user) {
      setWallet({
        address: primaryWallet.address || '',
        isConnected: true,
        provider: primaryWallet.connector?.name || 'unknown',
        chainId: primaryWallet.chain || undefined,
      });
    } else {
      setWallet(null);
    }
  }, [isAuthenticated, primaryWallet, user]);

  return wallet;
}