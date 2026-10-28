import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  WifiOff,
  Sparkles,
  RefreshCw,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import styles from './styles.module.css';

export default function GlobalNetworkBar() {
  const { isOffline, checkNow } = useNetworkStatus();
  const location = useLocation();
  const isAdmin = location.pathname.includes('admin');
  const [reconnectedNotice, setReconnectedNotice] = useState(false);
  const [newVersionInfo, setNewVersionInfo] = useState(null);
  const [prevOffline, setPrevOffline] = useState(false);

  // Monitor reconnect transition
  useEffect(() => {
    if (prevOffline && !isOffline) {
      setReconnectedNotice(true);
      const timer = setTimeout(() => {
        setReconnectedNotice(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
    setPrevOffline(isOffline);
  }, [isOffline, prevOffline]);

  // Listen for real-time version update events
  useEffect(() => {
    const handleNewVersion = (e) => {
      const detail = e.detail;
      if (detail) {
        setNewVersionInfo({
          commitSha: detail.commitSha || 'latest',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
    };

    window.addEventListener('portfolio_new_version_available', handleNewVersion);
    return () => window.removeEventListener('portfolio_new_version_available', handleNewVersion);
  }, []);

  const handleDismissVersion = () => {
    setNewVersionInfo(null);
  };

  const handleApplyVersion = () => {
    setNewVersionInfo(null);
    window.location.reload();
  };

  const offlineText = isAdmin
    ? 'You are offline. Edits are saved locally and will auto-push on reconnect.'
    : 'Offline mode active. Browsing cached portfolio content with full local availability.';

  const reconnectedText = isAdmin
    ? 'Back online. Cloud connection and auto-sync active.'
    : 'Internet connection restored. Live portfolio synchronized with edge.';

  return (
    <>
      {/* Top Floating Network State Capsule */}
      <div className={styles.floatingBannerContainer} aria-live="polite">
        {isOffline && (
          <aside className={`${styles.capsule} ${styles.offlineCapsule}`} role="status">
            <span className={`${styles.dot} ${styles.offlineDot}`} />
            <WifiOff size={13} aria-hidden="true" />
            <span>{offlineText}</span>
            <button
              type="button"
              onClick={() => checkNow()}
              className={styles.capsuleActionBtn}
              title="Test connection"
            >
              <RefreshCw size={10} />
              <span>Retry</span>
            </button>
          </aside>
        )}

        {!isOffline && reconnectedNotice && (
          <aside className={`${styles.capsule} ${styles.reconnectedCapsule}`} role="status">
            <span className={`${styles.dot} ${styles.onlineDot}`} />
            <CheckCircle2 size={13} aria-hidden="true" />
            <span>{reconnectedText}</span>
          </aside>
        )}
      </div>

      {/* Floating Bottom New Version Alert */}
      {newVersionInfo && (
        <aside className={styles.versionToastContainer} role="status" aria-live="polite">
          <div className={styles.versionCard}>
            <div className={styles.versionBadgeIcon}>
              <Sparkles size={16} />
            </div>

            <div className={styles.versionInfo}>
              <span className={styles.versionTitle}>New Version Live</span>
              <span className={styles.versionSub}>
                Synced commit <code>{newVersionInfo.commitSha}</code> at {newVersionInfo.time}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={handleApplyVersion}
                className={styles.versionBtn}
                title="Refresh to apply latest updates"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={handleDismissVersion}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  opacity: 0.6,
                  padding: '0.2rem',
                  display: 'flex',
                }}
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
