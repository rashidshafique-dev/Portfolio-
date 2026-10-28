import { useState } from 'react';
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';

export default function NetworkStatusBadge({ compact = false }) {
  const {
    isOnline,
    isSlow,
    isOffline,
    latency,
    effectiveType,
    downlink,
    hasPending,
    checkNow,
  } = useNetworkStatus();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleManualCheck = async (e) => {
    e.stopPropagation();
    setIsRefreshing(true);
    await checkNow();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getStatusConfig = () => {
    if (isOffline) {
      return {
        label: 'No Internet',
        sub: 'Offline Mode Active',
        color: '#dc2626',
        bg: 'rgba(220, 38, 38, 0.08)',
        border: 'rgba(220, 38, 38, 0.25)',
        icon: <WifiOff size={13} style={{ color: '#dc2626' }} />,
        dotColor: '#dc2626',
      };
    }
    if (isSlow) {
      return {
        label: 'Slow Internet',
        sub: latency ? `${latency}ms · High Latency` : 'Slow Connection',
        color: '#d97706',
        bg: 'rgba(217, 119, 6, 0.08)',
        border: 'rgba(217, 119, 6, 0.25)',
        icon: <AlertTriangle size={13} style={{ color: '#d97706' }} />,
        dotColor: '#d97706',
      };
    }
    return {
      label: 'Online',
      sub: latency ? `${latency}ms · Fast` : 'Stable',
      color: '#16a34a',
      bg: 'rgba(22, 163, 74, 0.08)',
      border: 'rgba(22, 163, 74, 0.25)',
      icon: <Wifi size={13} style={{ color: '#16a34a' }} />,
      dotColor: '#16a34a',
    };
  };

  const cfg = getStatusConfig();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        title="Click to view network diagnostics"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: compact ? '0.2rem 0.55rem' : '0.3rem 0.65rem',
          borderRadius: '9999px',
          border: `1px solid ${cfg.border}`,
          backgroundColor: cfg.bg,
          color: cfg.color,
          fontSize: '0.74rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 150ms ease',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: cfg.dotColor,
            boxShadow: `0 0 0 2px ${cfg.bg}`,
            animation: isOffline ? 'none' : 'statusPulse 2s infinite ease-in-out',
            flexShrink: 0,
          }}
        />
        {cfg.icon}
        <span>{cfg.label}</span>
        {latency && (
          <span style={{ opacity: 0.8, fontWeight: 500, fontSize: '0.68rem' }}>
            ({latency}ms)
          </span>
        )}
        {hasPending && (
          <span
            style={{
              padding: '0.05rem 0.35rem',
              borderRadius: '99px',
              backgroundColor: '#d97706',
              color: '#ffffff',
              fontSize: '0.62rem',
              fontWeight: 700,
              marginLeft: '0.2rem',
            }}
            title="Queued changes waiting to auto-push"
          >
            Queued
          </span>
        )}
      </button>

      {/* Popover / Diagnostics Drawer */}
      {showDetails && (
        <>
          <div
            onClick={() => setShowDetails(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998,
              background: 'transparent',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              zIndex: 999,
              minWidth: '260px',
              backgroundColor: 'var(--md-surface, #ffffff)',
              border: '1px solid var(--md-outline-variant, #e1e4e8)',
              borderRadius: '10px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
              padding: '0.85rem',
              fontSize: '0.76rem',
              color: 'var(--md-on-surface, #0f172a)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              animation: 'modalScaleIn 140ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--md-outline-variant, #e1e4e8)', paddingBottom: '0.45rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Network Diagnostics</span>
              <button
                type="button"
                onClick={handleManualCheck}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--md-primary, #1a73e8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                }}
              >
                <RefreshCw size={11} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
                <span>Test Ping</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--md-on-surface-variant)' }}>Internet Status:</span>
                <strong style={{ color: cfg.color }}>{cfg.label} ({cfg.sub})</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--md-on-surface-variant)' }}>Round-Trip Latency:</span>
                <span>{latency ? `${latency} ms` : 'Measuring...'}</span>
              </div>

              {effectiveType && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--md-on-surface-variant)' }}>Connection Quality:</span>
                  <span style={{ textTransform: 'uppercase' }}>{effectiveType} {downlink ? `(${downlink} Mbps)` : ''}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--md-on-surface-variant)' }}>Auto-Push Queue:</span>
                <span>{hasPending ? 'Pending offline edits' : 'Synced with GitHub'}</span>
              </div>
            </div>

            <div style={{
              backgroundColor: cfg.bg,
              padding: '0.45rem 0.6rem',
              borderRadius: '6px',
              fontSize: '0.7rem',
              color: cfg.color,
              lineHeight: 1.35,
            }}>
              {isOffline && 'Offline: Every edit you save is protected in local storage and will auto-push immediately when connection is restored.'}
              {isSlow && 'Slow Internet: Edits will be saved instantly to local cache; GitHub push will retry in background.'}
              {isOnline && !isSlow && 'Optimal Connection: Every save will automatically push to your GitHub repository in real time.'}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
