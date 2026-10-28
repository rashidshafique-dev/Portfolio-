// Network & Internet Health Service
// Continuously monitors internet connectivity, detects slow network conditions,
// and coordinates offline queuing and automatic resyncing when reconnected.

let currentStatus = {
  status: typeof navigator !== 'undefined' && navigator.onLine ? 'online' : 'offline',
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isSlow: false,
  isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  latency: null,
  effectiveType: '4g',
  downlink: null,
  rtt: null,
  lastChecked: Date.now(),
  pendingOfflineSync: false,
};

const LISTENERS = new Set();
let monitorTimer = null;
let isPinging = false;

export const getNetworkStatus = () => ({ ...currentStatus });

export const subscribeNetworkStatus = (callback) => {
  LISTENERS.add(callback);
  callback(getNetworkStatus());
  return () => LISTENERS.delete(callback);
};

const notifyListeners = () => {
  const snapshot = getNetworkStatus();
  LISTENERS.forEach((cb) => {
    try {
      cb(snapshot);
    } catch (e) {
      console.warn('Network listener error:', e);
    }
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('portfolio_network_status', { detail: snapshot }));
  }
};

/**
 * Perform a real lightweight ping probe to measure actual round-trip latency
 * and true internet connectivity (surpassing false-positive navigator.onLine).
 */
export const measureNetworkHealth = async () => {
  if (typeof window === 'undefined') return currentStatus;
  if (isPinging) return currentStatus;
  isPinging = true;

  const prevStatus = currentStatus.status;
  const isBrowserOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  if (!isBrowserOnline) {
    currentStatus = {
      ...currentStatus,
      status: 'offline',
      isOnline: false,
      isSlow: false,
      isOffline: true,
      latency: null,
      lastChecked: Date.now(),
    };
    isPinging = false;
    notifyListeners();
    return currentStatus;
  }

  // Read Network Information API if supported
  const navConn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const effectiveType = navConn?.effectiveType || '4g';
  const downlink = navConn?.downlink ?? null;
  const rtt = navConn?.rtt ?? null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const startTime = performance.now();
    // Cache-busting probe to GitHub raw or public portfolio JSON
    const probeUrl = `/data/portfolio-data.json?probe=${Date.now()}`;
    const res = await fetch(probeUrl, {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const latency = Math.round(performance.now() - startTime);

    if (!res.ok && res.status !== 304 && res.status !== 200) {
      throw new Error(`Probe returned status ${res.status}`);
    }

    // Determine status based on latency and network conditions
    const isSlow = latency >= 380 || effectiveType === '2g' || effectiveType === 'slow-2g' || (downlink !== null && downlink < 0.75);

    currentStatus = {
      status: isSlow ? 'slow' : 'online',
      isOnline: true,
      isSlow,
      isOffline: false,
      latency,
      effectiveType,
      downlink,
      rtt,
      lastChecked: Date.now(),
      pendingOfflineSync: currentStatus.pendingOfflineSync,
    };
  } catch (err) {
    // If probe fails or times out, inspect if we are actually offline
    const isAbort = err.name === 'AbortError';
    currentStatus = {
      status: isAbort ? 'slow' : 'offline',
      isOnline: isAbort,
      isSlow: isAbort,
      isOffline: !isAbort,
      latency: isAbort ? 4500 : null,
      effectiveType,
      downlink,
      rtt,
      lastChecked: Date.now(),
      pendingOfflineSync: currentStatus.pendingOfflineSync,
    };
  } finally {
    isPinging = false;
  }

  // Trigger reconnect event if transitioning from offline to online
  if (prevStatus === 'offline' && currentStatus.status !== 'offline') {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portfolio_network_reconnected', { detail: currentStatus }));
    }
  }

  notifyListeners();
  return currentStatus;
};

/**
 * Record a pending push when user saves while offline or during critical network failure
 */
export const markPendingOfflinePush = () => {
  currentStatus.pendingOfflineSync = true;
  try {
    localStorage.setItem('portfolio_pending_offline_sync', 'true');
  } catch {
    // ignore
  }
  notifyListeners();
};

export const clearPendingOfflinePush = () => {
  currentStatus.pendingOfflineSync = false;
  try {
    localStorage.removeItem('portfolio_pending_offline_sync');
  } catch {
    // ignore
  }
  notifyListeners();
};

export const hasPendingOfflinePush = () => {
  if (typeof window === 'undefined') return false;
  return currentStatus.pendingOfflineSync || localStorage.getItem('portfolio_pending_offline_sync') === 'true';
};

/**
 * Starts continuous background network health monitoring
 */
export const initNetworkMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Restore pending flag
  if (localStorage.getItem('portfolio_pending_offline_sync') === 'true') {
    currentStatus.pendingOfflineSync = true;
  }

  const handleOnline = () => {
    measureNetworkHealth();
  };

  const handleOffline = () => {
    currentStatus = {
      ...currentStatus,
      status: 'offline',
      isOnline: false,
      isSlow: false,
      isOffline: true,
      latency: null,
      lastChecked: Date.now(),
    };
    notifyListeners();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  const navConn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (navConn && navConn.addEventListener) {
    navConn.addEventListener('change', () => measureNetworkHealth());
  }

  // Initial measure
  measureNetworkHealth();

  // Periodic heartbeat every 60 seconds (relaxed passive check)
  if (!monitorTimer) {
    monitorTimer = setInterval(() => {
      measureNetworkHealth();
    }, 60000);
  }
};
