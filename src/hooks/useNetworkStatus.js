import { useState, useEffect, useCallback } from 'react';
import {
  getNetworkStatus,
  subscribeNetworkStatus,
  measureNetworkHealth,
  initNetworkMonitoring,
  hasPendingOfflinePush,
} from '../services/networkStatusService';

export function useNetworkStatus() {
  const [network, setNetwork] = useState(() => getNetworkStatus());
  const [hasPending, setHasPending] = useState(() => hasPendingOfflinePush());

  useEffect(() => {
    initNetworkMonitoring();

    const unsubscribe = subscribeNetworkStatus((status) => {
      setNetwork(status);
      setHasPending(hasPendingOfflinePush());
    });

    return () => unsubscribe();
  }, []);

  const checkNow = useCallback(async () => {
    return await measureNetworkHealth();
  }, []);

  return {
    ...network,
    hasPending,
    checkNow,
  };
}

export default useNetworkStatus;
