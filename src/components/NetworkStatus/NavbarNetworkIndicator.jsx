import { useState, useRef, useEffect } from 'react';
import {
  RefreshCw,
  Radio,
} from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import styles from './styles.module.css';

export default function NavbarNetworkIndicator({ className = '' }) {
  const {
    isSlow,
    isOffline,
    latency,
    effectiveType,
    downlink,
    checkNow,
  } = useNetworkStatus();

  const [isOpen, setIsOpen] = useState(false);
  const [testing, setTesting] = useState(false);
  const popoverRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const handleTestPing = async (e) => {
    e.stopPropagation();
    setTesting(true);
    await checkNow();
    setTimeout(() => setTesting(false), 400);
  };

  const getStatusColor = () => {
    if (isOffline) return '#ef4444';
    if (isSlow) return '#f59e0b';
    return '#10b981';
  };

  const getBadgeText = () => {
    if (isOffline) return 'Offline';
    if (isSlow) return latency ? `${latency}ms` : 'Slow';
    return latency ? `${latency}ms` : 'Edge';
  };

  return (
    <div className={`${styles.navIndicatorWrapper} ${className}`} ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.navIndicatorBtn} ${isOffline ? styles.btnOffline : isSlow ? styles.btnSlow : styles.btnOnline}`}
        aria-label="Network Health and Latency Telemetry"
        title={`Network Status: ${isOffline ? 'Offline' : isSlow ? 'Slow Connection' : 'Optimal'} (${latency ? `${latency}ms` : 'Measuring...'})`}
        aria-expanded={isOpen}
      >
        <span
          className={styles.beaconDot}
          style={{
            backgroundColor: getStatusColor(),
            boxShadow: `0 0 8px ${getStatusColor()}80`,
          }}
        />
        <span className={styles.navIndicatorLabel}>{getBadgeText()}</span>
      </button>

      {/* Glassmorphic Telemetry HUD Popover */}
      {isOpen && (
        <div className={styles.telemetryHUD} role="dialog" aria-label="System & Network Diagnostics">
          <div className={styles.hudHeader}>
            <div className={styles.hudTitleGroup}>
              <Radio size={14} className={styles.hudTitleIcon} aria-hidden="true" />
              <span className={styles.hudTitle}>Live Network Telemetry</span>
            </div>
            <button
              type="button"
              onClick={handleTestPing}
              className={styles.hudPingBtn}
              title="Measure live round-trip latency"
            >
              <RefreshCw size={11} className={testing ? styles.spinIcon : ''} />
              <span>{testing ? 'Testing...' : 'Test Ping'}</span>
            </button>
          </div>

          <div className={styles.hudMetricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Connection State</span>
              <div className={styles.metricValueRow}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(),
                    display: 'inline-block',
                  }}
                />
                <span className={styles.metricValue}>
                  {isOffline ? 'Offline Cache' : isSlow ? 'Degraded / Slow' : 'Operational (Live)'}
                </span>
              </div>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Round-Trip Latency</span>
              <span className={styles.metricValueHighlight} style={{ color: getStatusColor() }}>
                {latency ? `${latency} ms` : 'Measuring...'}
              </span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Throughput & Type</span>
              <span className={styles.metricValue}>
                {effectiveType ? effectiveType.toUpperCase() : 'Broadband'} {downlink ? `(${downlink} Mbps)` : ''}
              </span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Data Architecture</span>
              <span className={styles.metricValue}>
                GitHub REST API · 0s CDN Bypass
              </span>
            </div>
          </div>

          <div className={styles.hudFooter}>
            <span className={styles.hudFooterHint}>
              {isOffline
                ? 'Offline mode: You are viewing locally cached assets.'
                : isSlow
                ? 'High latency network: Cloud sync will run with auto-retry.'
                : 'Zero-latency edge connected. Real-time updates active.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
