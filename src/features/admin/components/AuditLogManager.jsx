import { useState, useEffect } from 'react';
import {
  History,
  Search,
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Laptop,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileCode,
} from 'lucide-react';
import {
  getStoredAuditLogs,
  clearAuditLogs,
  exportAuditLogsAsCSV,
  exportAuditLogsAsJSON,
} from '../../../store/adminDataStore';
import styles from '../styles.module.css';

const CATEGORIES = ['All', 'Security', 'Projects', 'Profile', 'Build Logs', 'Cloud Sync', 'System'];
const SEVERITIES = ['All', 'success', 'info', 'warning', 'danger'];

export default function AuditLogManager({ showToast }) {
  const [logs, setLogs] = useState(() => getStoredAuditLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const refreshLogs = () => {
    setLogs(getStoredAuditLogs());
  };

  useEffect(() => {
    const handleNewLog = () => refreshLogs();
    const handleClear = () => setLogs([]);

    window.addEventListener('portfolio_audit_log_added', handleNewLog);
    window.addEventListener('portfolio_audit_log_cleared', handleClear);

    return () => {
      window.removeEventListener('portfolio_audit_log_added', handleNewLog);
      window.removeEventListener('portfolio_audit_log_cleared', handleClear);
    };
  }, []);

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all audit logs? This cannot be undone.')) {
      clearAuditLogs();
      setLogs([]);
      showToast('Audit trail cleared successfully');
    }
  };

  const handleExportCSV = () => {
    const csvContent = exportAuditLogsAsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported audit log as CSV');
  };

  const handleExportJSON = () => {
    const jsonContent = exportAuditLogsAsJSON();
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-audit-log-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported audit log as JSON');
  };

  const formatRelativeTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffSec < 45) return 'Just now';
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHr < 24) return `${diffHr}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return isoString;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'success':
        return {
          icon: <CheckCircle2 size={13} />,
          color: '#16a34a',
          bg: 'rgba(22, 163, 74, 0.1)',
          label: 'Success',
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={13} />,
          color: '#d97706',
          bg: 'rgba(217, 119, 6, 0.1)',
          label: 'Warning',
        };
      case 'danger':
        return {
          icon: <AlertCircle size={13} />,
          color: '#dc2626',
          bg: 'rgba(220, 38, 38, 0.1)',
          label: 'Critical',
        };
      default:
        return {
          icon: <Info size={13} />,
          color: 'var(--md-primary, #1a73e8)',
          bg: 'rgba(26, 115, 232, 0.08)',
          label: 'Info',
        };
    }
  };

  // Filtered list
  const filteredLogs = (logs || []).filter((log) => {
    if (!log) return false;

    // Category filter
    if (selectedCategory !== 'All' && log.category !== selectedCategory) {
      return false;
    }

    // Severity filter
    if (selectedSeverity !== 'All' && log.severity !== selectedSeverity) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (log.title || '').toLowerCase().includes(q);
      const matchDetails = (log.details || '').toLowerCase().includes(q);
      const matchAction = (log.action || '').toLowerCase().includes(q);
      const matchActor = (log.actor || '').toLowerCase().includes(q);
      const matchDevice = (log.device || '').toLowerCase().includes(q);
      return matchTitle || matchDetails || matchAction || matchActor || matchDevice;
    }

    return true;
  });

  // Overview Counts
  const totalCount = logs.length;
  const securityCount = logs.filter((l) => l.category === 'Security').length;
  const projectsCount = logs.filter((l) => l.category === 'Projects').length;
  const syncCount = logs.filter((l) => l.category === 'Cloud Sync').length;

  return (
    <div className={styles.panelContainer}>
      {/* Header Row */}
      <div className={styles.panelHeaderRow}>
        <div>
          <h2 className={styles.panelTitle}>Audit Log &amp; Security Trail</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Immutable activity trail recording authentication attempts, project mutations, profile updates, and cloud sync events.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={refreshLogs}
            className={styles.secondaryBtn}
            title="Refresh logs"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className={styles.secondaryBtn}
            title="Download CSV"
          >
            <FileSpreadsheet size={13} />
            <span>CSV</span>
          </button>
          <button
            type="button"
            onClick={handleExportJSON}
            className={styles.secondaryBtn}
            title="Download JSON"
          >
            <FileCode size={13} />
            <span>JSON</span>
          </button>
          {logs.length > 0 && (
            <button
              type="button"
              onClick={handleClearLogs}
              className={styles.dangerBtn}
              title="Clear all audit entries"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem',
      }}>
        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--md-outline-variant, #e1e4e8)',
          backgroundColor: 'var(--md-surface, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)', fontWeight: 600 }}>Total Events</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{totalCount}</span>
        </div>

        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--md-outline-variant, #e1e4e8)',
          backgroundColor: 'var(--md-surface, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)', fontWeight: 600 }}>Security &amp; Auth</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--md-primary)' }}>{securityCount}</span>
        </div>

        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--md-outline-variant, #e1e4e8)',
          backgroundColor: 'var(--md-surface, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)', fontWeight: 600 }}>Project Mutations</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#16a34a' }}>{projectsCount}</span>
        </div>

        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--md-outline-variant, #e1e4e8)',
          backgroundColor: 'var(--md-surface, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)', fontWeight: 600 }}>Cloud Sync</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0284c7' }}>{syncCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.65rem',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, actions, actors, or details..."
            className={styles.input}
            style={{ width: '100%', paddingLeft: '2.1rem' }}
          />
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.5,
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--md-on-surface-variant)', fontWeight: 600 }}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
            style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Severity Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--md-on-surface-variant)', fontWeight: 600 }}>Severity:</label>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className={styles.select}
            style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem' }}
          >
            {SEVERITIES.map((sev) => (
              <option key={sev} value={sev}>{sev === 'All' ? 'All Severities' : sev.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <span className={styles.searchCountBadge}>
          Showing {filteredLogs.length} of {totalCount}
        </span>
      </div>

      {/* Audit Log Table / Stream */}
      <div className={styles.tableContainer}>
        <div className={styles.tableList}>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => {
              const sev = getSeverityBadge(log.severity);
              const isExpanded = expandedId === log.id;
              const formattedDate = new Date(log.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <div
                  key={log.id}
                  className={styles.tableRow}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    padding: '0.85rem 1rem',
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : log.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', width: '100%' }}>
                    {/* Left: Severity dot + Category + Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', flex: 1 }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: sev.color,
                          backgroundColor: sev.bg,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {sev.icon}
                        <span>{sev.label}</span>
                      </span>

                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          backgroundColor: 'var(--md-surface-container, rgba(0,0,0,0.04))',
                          border: '1px solid var(--md-outline-variant, #e1e4e8)',
                          color: 'var(--md-on-surface-variant)',
                        }}
                      >
                        {log.category}
                      </span>

                      <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: 'var(--md-on-surface)' }}>
                        {log.title}
                      </h4>
                    </div>

                    {/* Right: Relative Time & Expand toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
                      <span
                        title={formattedDate}
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--md-on-surface-variant)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Clock size={12} style={{ opacity: 0.6 }} />
                        <span>{formatRelativeTime(log.timestamp)}</span>
                      </span>

                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.2rem',
                          cursor: 'pointer',
                          color: 'var(--md-on-surface-variant)',
                        }}
                        aria-label="Toggle details"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Meta Bar: Actor, Device, Action Code */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    fontSize: '0.72rem',
                    color: 'var(--md-on-surface-variant)',
                  }}>
                    <span>
                      Actor: <strong>{log.actor || 'Administrator'}</strong>
                    </span>
                    <span>&middot;</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Laptop size={11} style={{ opacity: 0.7 }} />
                      <span>{log.device || 'Admin Session'}</span>
                    </span>
                    <span>&middot;</span>
                    <code style={{ fontSize: '0.68rem', opacity: 0.75 }}>{log.action}</code>
                  </div>

                  {/* Expanded Details Drawer */}
                  {isExpanded && log.details && (
                    <div style={{
                      marginTop: '0.4rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--md-surface-container, rgba(0,0,0,0.03))',
                      border: '1px solid var(--md-outline-variant, #e1e4e8)',
                      fontSize: '0.78rem',
                      lineHeight: '1.45',
                      color: 'var(--md-on-surface)',
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.2rem', color: 'var(--md-on-surface-variant)' }}>
                        Event Details:
                      </div>
                      <p style={{ margin: 0 }}>{log.details}</p>
                      <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', opacity: 0.6 }}>
                        Timestamp: {formattedDate} (ISO: {log.timestamp})
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--md-on-surface-variant)', fontSize: '0.85rem' }}>
              <History size={28} style={{ opacity: 0.35, margin: '0 auto 0.75rem auto', display: 'block' }} />
              <p style={{ margin: 0, fontWeight: 500 }}>No audit logs found matching your filters.</p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', opacity: 0.7 }}>
                Try resetting your search query or selecting a different category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
