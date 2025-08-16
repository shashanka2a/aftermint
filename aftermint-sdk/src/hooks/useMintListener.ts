import { useState, useEffect, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { NFTMintEvent } from '../types';

interface MintListenerOptions {
  contractAddress: string;
  eventName?: string;
  onMint?: (event: NFTMintEvent) => void;
}

export function useMintListener({ 
  contractAddress, 
  eventName = 'Deposit',
  onMint 
}: MintListenerOptions) {
  const [mintEvents, setMintEvents] = useState<NFTMintEvent[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(async () => {
    if (isListening) return;

    try {
      setIsListening(true);
      setError(null);

      // Subscribe to Flow events
      const unsubscribe = fcl.events(`A.${contractAddress.replace('0x', '')}.GhibliNFT.${eventName}`)
        .subscribe((events: any[]) => {
          events.forEach((event) => {
            try {
              const mintEvent: NFTMintEvent = {
                transactionId: event.transactionId,
                contractAddress: contractAddress,
                tokenId: event.data.id,
                owner: event.data.to,
                metadata: event.data.metadata || {},
                timestamp: Date.now(),
              };

              setMintEvents(prev => [...prev, mintEvent]);
              
              if (onMint) {
                onMint(mintEvent);
              }
            } catch (parseError) {
              console.error('Error parsing mint event:', parseError);
            }
          });
        });

      return unsubscribe;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start listening');
      setIsListening(false);
    }
  }, [contractAddress, eventName, onMint, isListening]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    mintEvents,
    isListening,
    error,
    startListening,
    stopListening,
  };
}