import { useState, useEffect } from 'react';
import {
  Copy,
  Download,
  KeyRound,
  RotateCcw,
  Check,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  Activity,
  LogOut,
  RefreshCw,
  UploadCloud,
  GitCommit,
  ExternalLink,
  AlertCircle,
  Save,
} from 'lucide-react';
import {
  changeAdminPin,
  generatePortfolioExportCode,
  resetPortfolioToDefaults,
  getStoredBuildLogs,
  getStoredProjects,
  getStoredProfile,
  getStoredTestimonials,
  getSecurityTelemetry,
  resetLockoutTelemetry,
  logoutAdmin,
  getFullPortfolioSnapshot,
} from '../../../store/adminDataStore';
import {
  getGitHubConfig,
  saveGitHubConfig,
  getGitHubToken,
  saveGitHubToken,
  getLastSyncInfo,
  testGitHubConnection,
  pushPortfolioDataToGitHub,
} from '../../../services/githubSyncService';
import { copyToClipboard } from '../../../utils';
import styles from '../styles.module.css';

export default function ExportSyncCenter({ onDataReset, showToast, onLockConsole }) {
  // GitHub Cloud Sync State
  const [githubConfig, setGithubConfigState] = useState(() => getGitHubConfig());
  const [tokenInput, setTokenInput] = useState(() => getGitHubToken());
  const [showToken, setShowToken] = useState(false);
  const [lastSync, setLastSync] = useState(() => getLastSyncInfo());
  const [isTesting, setIsTesting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  // PIN change state
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [pinError, setPinError] = useState('');
  const [pinSubmitting, setPinSubmitting] = useState(false);

  // Export state
  const [copied, setCopied] = useState(false);
  const [telemetry, setTelemetry] = useState(() => getSecurityTelemetry());

  const exportData = generatePortfolioExportCode();

  useEffect(() => {
    setTelemetry(getSecurityTelemetry());

    // Listen for automatic background sync events
    const handleSyncStatus = (e) => {
      if (e.detail?.success) {
        setLastSync(getLastSyncInfo());
        showToast('Auto-synced latest portfolio edits to GitHub.');
      }
    };

    window.addEventListener('portfolio_cloud_sync_status', handleSyncStatus);
    return () => window.removeEventListener('portfolio_cloud_sync_status', handleSyncStatus);
  }, [showToast]);

  // Test connection to GitHub
  const handleTestConnection = async () => {
    if (!tokenInput.trim()) {
      setTestStatus({ success: false, message: 'Please paste your GitHub Personal Access Token first.' });
      return;
    }

    setIsTesting(true);
    setTestStatus(null);

    const result = await testGitHubConnection(tokenInput.trim());
    setIsTesting(false);
    setTestStatus(result);

    if (result.success) {
      saveGitHubToken(tokenInput.trim());
      showToast(result.message);
    }
  };

  // Save config & sync changes to GitHub
  const handleSaveAndPublishOnline = async () => {
    if (!tokenInput.trim()) {
      showToast('Please provide a GitHub Personal Access Token to publish online.');
      return;
    }

    saveGitHubToken(tokenInput.trim());
    saveGitHubConfig(githubConfig);

    setIsPublishing(true);
    const snapshot = getFullPortfolioSnapshot();
    const result = await pushPortfolioDataToGitHub(snapshot);
    setIsPublishing(false);

    if (result.success) {
      setLastSync(getLastSyncInfo());
      showToast('All portfolio edits published online to GitHub! Visible across all browsers.');
    } else {
      showToast(`Publishing failed: ${result.message}`);
    }
  };

  const handlePinChange = async (e) => {
    e.preventDefault();
    setPinError('');

    if (!currentPin.trim()) {
      setPinError('Please enter your current security PIN.');
      return;
    }
    if (!newPin.trim() || newPin.trim().length < 4) {
      setPinError('New PIN must be at least 4 characters long.');
      return;
    }
    if (newPin.trim() !== confirmPin.trim()) {
      setPinError('New PIN and confirmation PIN do not match.');
      return;
    }
    if (currentPin.trim() === newPin.trim()) {
      setPinError('New PIN cannot be identical to current PIN.');
      return;
    }

    setPinSubmitting(true);
    try {
      const result = await changeAdminPin(currentPin.trim(), newPin.trim());
      if (result.success) {
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
        showToast(result.message || 'Admin PIN updated successfully.');
        setTelemetry(getSecurityTelemetry());
      } else {
        setPinError(result.message || 'Failed to update PIN.');
      }
    } catch (err) {
      setPinError('An unexpected error occurred while updating the PIN.');
    } finally {
      setPinSubmitting(false);
    }
  };

  const handleResetLockout = () => {
    resetLockoutTelemetry();
    setTelemetry(getSecurityTelemetry());
    showToast('Security lockout & attempt counters reset to clean state.');
  };

  const handleEmergencyLock = () => {
    if (window.confirm('Emergency Lock: Instantly terminate active session and lock the admin console?')) {
      logoutAdmin();
      if (onLockConsole) {
        onLockConsole();
      } else {
        window.location.reload();
      }
    }
  };

  const handleCopyJson = async () => {
    const success = await copyToClipboard(exportData.json);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      showToast('Complete backup JSON copied to clipboard');
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([exportData.json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup file downloaded');
  };

  const handleReset = () => {
    if (window.confirm('Reset all custom edits back to original default portfolio code?')) {
      resetPortfolioToDefaults();
      onDataReset({
        logs: getStoredBuildLogs(),
        projects: getStoredProjects(),
        profile: getStoredProfile(),
        testimonials: getStoredTestimonials(),
      });
      showToast('All data reset to original defaults');
    }
  };

  const hasTokenConfigured = Boolean(tokenInput.trim());

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeaderRow}>
        <div>
          <h2 className={styles.panelTitle}>Cloud Sync &amp; Security Center</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Sync changes online across all browsers via GitHub, rotate cryptographic credentials, and manage backups.
          </p>
        </div>
      </div>

      {/* GitHub Cloud Sync & Multi-Browser Online Persistence */}
      <div className={styles.formCard} style={{ borderColor: 'rgba(26, 115, 232, 0.35)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={18} style={{ color: 'var(--md-primary)' }} />
            <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 600 }}>GitHub Cloud Sync (Multi-Browser Persistence)</h3>
          </div>
          {hasTokenConfigured ? (
            <span className={styles.statusPillActive}>
              <span className={styles.activeDot} />
              Cloud Online Sync Active
            </span>
          ) : (
            <span className={styles.statusPillInactive}>
              <AlertCircle size={12} />
              Local-Only (Connect Token to Sync Online)
            </span>
          )}
        </div>

        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--md-on-surface-variant)', lineHeight: 1.5 }}>
          Local browser storage is limited to a single device. By connecting your GitHub Personal Access Token, all modifications to projects, build logs, and profile info are <strong>committed directly to your GitHub repository</strong>, making your changes visible online across every browser, mobile device, and visitor worldwide.
        </p>

        <div className={styles.pinFormGrid} style={{ marginTop: '0.25rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Repository Target</label>
            <input
              type="text"
              value={`${githubConfig.owner} / ${githubConfig.repo}`}
              disabled
              className={styles.input}
              style={{ backgroundColor: 'rgba(0,0,0,0.03)', opacity: 0.8 }}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Target Branch &amp; Path</label>
            <input
              type="text"
              value={`${githubConfig.branch} : ${githubConfig.path}`}
              disabled
              className={styles.input}
              style={{ backgroundColor: 'rgba(0,0,0,0.03)', opacity: 0.8 }}
            />
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className={styles.label}>GitHub Token (PAT) *</label>
              <a
                href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin+Sync"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.72rem', color: 'var(--md-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <span>Create Token</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <div className={styles.pinInputWrapper}>
              <input
                type={showToken ? 'text' : 'password'}
                value={tokenInput}
                onChange={(e) => {
                  setTokenInput(e.target.value);
                  setTestStatus(null);
                }}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className={styles.pinToggleBtn}
                tabIndex={-1}
                aria-label={showToken ? 'Hide Token' : 'Show Token'}
              >
                {showToken ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Test Result Message */}
        {testStatus && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              backgroundColor: testStatus.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 38, 38, 0.1)',
              color: testStatus.success ? '#16a34a' : '#dc2626',
              border: `1px solid ${testStatus.success ? 'rgba(34, 197, 94, 0.25)' : 'rgba(220, 38, 38, 0.25)'}`,
            }}
          >
            {testStatus.message}
          </div>
        )}

        {/* Sync Metadata Row */}
        {lastSync && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.76rem', color: 'var(--md-on-surface-variant)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <GitCommit size={13} style={{ color: 'var(--md-primary)' }} />
              <span>Last online commit: <strong>{lastSync.commitSha}</strong> ({new Date(lastSync.timestamp).toLocaleTimeString()})</span>
            </div>
            {lastSync.commitUrl && (
              <a
                href={lastSync.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--md-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}
              >
                <span>View on GitHub</span>
                <ExternalLink size={11} />
              </a>
            )}
          </div>
        )}

        {/* Actions & Auto-Sync Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="autoSyncToggle"
              checked={githubConfig.autoSync}
              onChange={(e) => {
                const updated = { ...githubConfig, autoSync: e.target.checked };
                setGithubConfigState(updated);
                saveGitHubConfig(updated);
                showToast(e.target.checked ? 'Auto-sync enabled: Edits will automatically push to GitHub' : 'Auto-sync disabled');
              }}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="autoSyncToggle" style={{ fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500 }}>
              Auto-Sync: Automatically commit to GitHub when saving edits
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting || !tokenInput.trim()}
              className={styles.secondaryBtn}
            >
              <span>{isTesting ? 'Verifying...' : 'Test Connection'}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveAndPublishOnline}
              disabled={isPublishing || !tokenInput.trim()}
              className={styles.primaryBtn}
            >
              <UploadCloud size={14} />
              <span>{isPublishing ? 'Publishing Online...' : 'Save & Publish Online Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Telemetry & Audit Strip */}
      <div className={styles.formCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={17} style={{ color: 'var(--md-primary)' }} />
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Active Security Telemetry</h3>
          </div>
          <span className={styles.statusPillActive}>
            <span className={styles.activeDot} />
            Cryptographic Guard Active
          </span>
        </div>

        <div className={styles.securityGrid}>
          <div className={styles.securityCard}>
            <span className={styles.securityLabel}>Hash Algorithm</span>
            <span className={styles.securityValue}>SHA-256 + Salt</span>
            <span className={styles.securitySub}>Web Crypto Standard</span>
          </div>

          <div className={styles.securityCard}>
            <span className={styles.securityLabel}>Brute-Force Guard</span>
            <span className={styles.securityValue}>5 Max Attempts</span>
            <span className={styles.securitySub}>15-Min Lockout Penalty</span>
          </div>

          <div className={styles.securityCard}>
            <span className={styles.securityLabel}>Session Idle Guard</span>
            <span className={styles.securityValue}>15 Min Timeout</span>
            <span className={styles.securitySub}>Auto-Lock on Inactivity</span>
          </div>

          <div className={styles.securityCard}>
            <span className={styles.securityLabel}>Last Authenticated</span>
            <span className={styles.securityValue} style={{ fontSize: '0.8rem' }}>
              {telemetry?.lastLogin || 'Current Session'}
            </span>
            <span className={styles.securitySub}>Verified Owner Session</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', paddingTop: '0.35rem' }}>
          <button type="button" onClick={handleEmergencyLock} className={styles.dangerBtn}>
            <LogOut size={13} />
            <span>Emergency Revoke &amp; Lock Console</span>
          </button>
          <button type="button" onClick={handleResetLockout} className={styles.secondaryBtn}>
            <RefreshCw size={13} />
            <span>Reset Attempt Counters</span>
          </button>
        </div>
      </div>

      {/* Advanced Cryptographic PIN Rotation */}
      <div className={styles.formCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <KeyRound size={17} style={{ color: 'var(--md-primary)' }} />
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Rotate Security PIN</h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
          To modify your console access credentials, verify your current PIN first. The new PIN will be salted and converted to an irreversible cryptographic SHA-256 hash.
        </p>

        <form onSubmit={handlePinChange} className={styles.securePinForm}>
          <div className={styles.pinFormGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Current PIN *</label>
              <div className={styles.pinInputWrapper}>
                <input
                  type={showCurrentPin ? 'text' : 'password'}
                  maxLength={12}
                  value={currentPin}
                  onChange={(e) => {
                    setCurrentPin(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Enter current PIN"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPin(!showCurrentPin)}
                  className={styles.pinToggleBtn}
                  tabIndex={-1}
                  aria-label={showCurrentPin ? 'Hide current PIN' : 'Show current PIN'}
                >
                  {showCurrentPin ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>New PIN (4-12 Digits) *</label>
              <div className={styles.pinInputWrapper}>
                <input
                  type={showNewPin ? 'text' : 'password'}
                  maxLength={12}
                  value={newPin}
                  onChange={(e) => {
                    setNewPin(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Enter new secure PIN"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPin(!showNewPin)}
                  className={styles.pinToggleBtn}
                  tabIndex={-1}
                  aria-label={showNewPin ? 'Hide new PIN' : 'Show new PIN'}
                >
                  {showNewPin ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm New PIN *</label>
              <div className={styles.pinInputWrapper}>
                <input
                  type={showNewPin ? 'text' : 'password'}
                  maxLength={12}
                  value={confirmPin}
                  onChange={(e) => {
                    setConfirmPin(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Repeat new PIN"
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {pinError && <div className={styles.authError} style={{ textAlign: 'left' }}>{pinError}</div>}

          <div>
            <button type="submit" disabled={pinSubmitting} className={styles.primaryBtn}>
              <ShieldCheck size={14} />
              <span>{pinSubmitting ? 'Encrypting & Updating...' : 'Update & Hash PIN'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* JSON Backup & Export */}
      <div className={styles.formCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Portfolio Data Export (JSON)</h3>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
              Complete snapshot of your active build logs, projects, and personal information.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" onClick={handleCopyJson} className={styles.secondaryBtn}>
              {copied ? <Check size={13} style={{ color: '#16a34a' }} /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
            <button type="button" onClick={handleDownloadJson} className={styles.primaryBtn}>
              <Download size={13} />
              <span>Download Backup File</span>
            </button>
          </div>
        </div>

        <pre className={styles.codeBlock}>{exportData.json.slice(0, 800)}... (truncated preview)</pre>
      </div>

      {/* Factory Reset */}
      <div className={styles.formCard} style={{ borderColor: 'rgba(220, 38, 38, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={17} style={{ color: '#dc2626' }} />
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#dc2626' }}>Reset to Codebase Defaults</h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--md-on-surface-variant)', lineHeight: 1.5 }}>
          Clear all locally saved browser edits and restore original static data defined in <code>src/constants/portfolioData.js</code>. Your security credentials are independently preserved.
        </p>
        <div>
          <button type="button" onClick={handleReset} className={styles.dangerBtn}>
            <RotateCcw size={13} />
            <span>Reset All Local Storage Overrides</span>
          </button>
        </div>
      </div>
    </div>
  );
}
