import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Eye,
  Laptop,
  Smartphone,
  Tablet,
  FileSpreadsheet,
  FileCode,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Cloud,
  Copy,
  Check,
} from 'lucide-react';
import {
  getAnalyticsSummary,
  fetchCloudAnalytics,
  subscribeToLiveVisits,
  exportAnalyticsCSV,
  exportAnalyticsJSON,
} from '../../../services/analyticsService';
import { SUPABASE_SQL_SETUP } from '../../../services/supabaseClient';
import styles from '../styles.module.css';

export default function AnalyticsManager({ showToast }) {
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState(() => getAnalyticsSummary('30d'));
  const [cloudStatus, setCloudStatus] = useState('loading'); // 'loading' | 'connected' | 'needs_setup' | 'offline'
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  const [showSqlPreview, setShowSqlPreview] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const refreshData = useCallback(async () => {
    setCloudStatus('loading');
    try {
      const cloudRes = await fetchCloudAnalytics(timeRange);
      if (cloudRes.success) {
        setAnalytics(cloudRes);
        setCloudStatus('connected');
      } else if (cloudRes.needsTableSetup) {
        setCloudStatus('needs_setup');
        setAnalytics(getAnalyticsSummary(timeRange));
      } else {
        setCloudStatus('offline');
        setAnalytics(getAnalyticsSummary(timeRange));
      }
    } catch {
      setCloudStatus('offline');
      setAnalytics(getAnalyticsSummary(timeRange));
    }
  }, [timeRange]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Real-time Supabase live push subscription
  useEffect(() => {
    if (cloudStatus === 'connected') {
      const unsubscribe = subscribeToLiveVisits((newVisit) => {
        if (showToast) {
          showToast(`Live visitor: ${newVisit.flag || ''} ${newVisit.country} on ${newVisit.path}`);
        }
        refreshData();
      });
      return () => unsubscribe();
    }
  }, [cloudStatus, showToast, refreshData]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setIsCopiedSql(true);
    if (showToast) showToast('Copied Supabase SQL table script to clipboard!');
    setTimeout(() => setIsCopiedSql(false), 2500);
  };

  const handleExportCSV = () => {
    const csv = exportAnalyticsCSV(analytics.recentVisits);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-traffic-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('Exported visitor traffic as CSV');
  };

  const handleExportJSON = () => {
    const json = exportAnalyticsJSON(analytics.recentVisits);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-traffic-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('Exported visitor traffic as JSON');
  };

  // SVG Chart Computations
  const chartData = analytics.trendChart || [];
  const maxVal = Math.max(...chartData.map((d) => d.pageviews), 10);
  const chartWidth = 720;
  const chartHeight = 180;
  const paddingX = 35;
  const paddingY = 25;

  const points = chartData.map((d, idx) => {
    const x = paddingX + (idx / Math.max(chartData.length - 1, 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (d.pageviews / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, data: d };
  });

  const visitorPoints = chartData.map((d, idx) => {
    const x = paddingX + (idx / Math.max(chartData.length - 1, 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (d.visitors / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, data: d };
  });

  const pathD = points.length > 0
    ? `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`
    : '';

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x},${chartHeight - paddingY} L ${points[0].x},${chartHeight - paddingY} Z`
    : '';

  const visitorPathD = visitorPoints.length > 0
    ? `M ${visitorPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`
    : '';

  return (
    <div className={styles.panelContainer}>
      {/* Header Row */}
      <div className={styles.panelHeaderRow}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h2 className={styles.panelTitle} style={{ margin: 0 }}>
              Website Visitor Traffic &amp; Telemetry
            </h2>

            {/* Cloud Status Indicator Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 600,
                backgroundColor:
                  cloudStatus === 'connected'
                    ? 'rgba(22, 163, 74, 0.12)'
                    : cloudStatus === 'needs_setup'
                    ? 'rgba(2, 132, 199, 0.12)'
                    : 'rgba(100, 116, 139, 0.12)',
                color:
                  cloudStatus === 'connected'
                    ? '#16a34a'
                    : cloudStatus === 'needs_setup'
                    ? '#0284c7'
                    : 'var(--md-on-surface-variant)',
                border: `1px solid ${
                  cloudStatus === 'connected'
                    ? 'rgba(22, 163, 74, 0.3)'
                    : cloudStatus === 'needs_setup'
                    ? 'rgba(2, 132, 199, 0.3)'
                    : 'var(--md-outline-variant)'
                }`,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor:
                    cloudStatus === 'connected'
                      ? '#16a34a'
                      : cloudStatus === 'needs_setup'
                      ? '#0284c7'
                      : '#94a3b8',
                }}
              />
              <span>
                {cloudStatus === 'connected'
                  ? 'Supabase Cloud Live (Global)'
                  : cloudStatus === 'needs_setup'
                  ? 'Supabase Connected · Table Setup Pending'
                  : cloudStatus === 'loading'
                  ? 'Connecting...'
                  : 'Local Telemetry Active'}
              </span>
            </span>
          </div>

          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Real-time global analytics, referral channels, geographic demographics, and live visitor logs.
          </p>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Time range selector */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--md-surface, #ffffff)',
              border: '1px solid var(--md-outline-variant, #e1e4e8)',
              borderRadius: '6px',
              padding: '2px',
            }}
          >
            {['today', '7d', '30d', 'all'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                style={{
                  background: timeRange === range ? 'var(--md-primary, #1a73e8)' : 'transparent',
                  color: timeRange === range ? '#ffffff' : 'var(--md-on-surface-variant)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                }}
              >
                {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          <button type="button" onClick={refreshData} className={styles.secondaryBtn} title="Refresh analytics">
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <button type="button" onClick={handleExportCSV} className={styles.secondaryBtn} title="Download CSV report">
            <FileSpreadsheet size={13} />
            <span>CSV</span>
          </button>
          <button type="button" onClick={handleExportJSON} className={styles.secondaryBtn} title="Download JSON dump">
            <FileCode size={13} />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Supabase 1-Click SQL Setup Banner (shown only when table has not been created yet) */}
      {cloudStatus === 'needs_setup' && (
        <div
          style={{
            backgroundColor: 'rgba(2, 132, 199, 0.05)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            borderRadius: '10px',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', maxWidth: '650px' }}>
              <Cloud size={20} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--md-on-surface)' }}>
                  Supabase Project Connected — 1 Step to Stream Live Global Traffic
                </strong>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--md-on-surface-variant)', lineHeight: 1.45 }}>
                  Your Supabase credentials are authenticated. To record visits from recruiters worldwide, create the <code>portfolio_visits</code> table in your Supabase SQL Editor.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCopySql}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  backgroundColor: isCopiedSql ? '#16a34a' : '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease',
                }}
              >
                {isCopiedSql ? <Check size={14} /> : <Copy size={14} />}
                <span>{isCopiedSql ? 'SQL Copied!' : '1-Click Copy SQL'}</span>
              </button>

              <a
                href="https://supabase.com/dashboard/project/pktmigbdhxpnzmsgtnwr/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  backgroundColor: 'var(--md-surface, #ffffff)',
                  border: '1px solid var(--md-outline-variant, #e1e4e8)',
                  color: 'var(--md-on-surface)',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={13} />
                <span>Open Supabase SQL Editor</span>
              </a>

              <button
                type="button"
                onClick={refreshData}
                className={styles.secondaryBtn}
                title="Verify if table is ready"
              >
                <RefreshCw size={13} />
                <span>Verify Table</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSqlPreview((v) => !v)}
                className={styles.secondaryBtn}
                style={{ fontSize: '0.72rem' }}
              >
                <span>{showSqlPreview ? 'Hide SQL' : 'Preview SQL'}</span>
              </button>
            </div>
          </div>

          {showSqlPreview && (
            <pre
              style={{
                margin: 0,
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--md-surface, #ffffff)',
                border: '1px solid var(--md-outline-variant, #e1e4e8)',
                borderRadius: '6px',
                fontSize: '0.73rem',
                fontFamily: 'monospace',
                overflowX: 'auto',
                color: 'var(--md-on-surface)',
              }}
            >
              {SUPABASE_SQL_SETUP}
            </pre>
          )}
        </div>
      )}

      {/* KPI Overview Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.85rem',
        }}
      >
        {/* Card 1: Total Pageviews */}
        <div className={styles.statCard} style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={styles.statLabel}>Total Pageviews</span>
            <Eye size={15} style={{ color: 'var(--md-primary)', opacity: 0.8 }} />
          </div>
          <span className={styles.statValue}>{(analytics.totalPageviews || 0).toLocaleString()}</span>
          <span
            style={{
              fontSize: '0.68rem',
              color: '#16a34a',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontWeight: 600,
            }}
          >
            <ArrowUpRight size={12} />
            <span>Active Telemetry</span>
          </span>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={styles.statLabel}>Unique Visitors</span>
            <Users size={15} style={{ color: '#0284c7', opacity: 0.8 }} />
          </div>
          <span className={styles.statValue} style={{ color: '#0284c7' }}>
            {(analytics.uniqueVisitors || 0).toLocaleString()}
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--md-on-surface-variant)' }}>
            Deduplicated sessions
          </span>
        </div>

        {/* Card 3: Today's Views */}
        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={styles.statLabel}>Visits Today</span>
            <Clock size={15} style={{ color: '#16a34a', opacity: 0.8 }} />
          </div>
          <span className={styles.statValue} style={{ color: '#16a34a' }}>
            {analytics.todayPageviews || 0}
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--md-on-surface-variant)' }}>
            {analytics.todayVisitors || 0} unique today
          </span>
        </div>

        {/* Card 4: Active Now */}
        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={styles.statLabel}>Live Now</span>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#16a34a',
                boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.25)',
                animation: 'statusPulse 2s infinite ease-in-out',
              }}
            />
          </div>
          <span className={styles.statValue} style={{ color: '#16a34a' }}>
            {analytics.activeNow || 0}
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--md-on-surface-variant)' }}>
            Active in last 15 min
          </span>
        </div>

        {/* Card 5: Avg. Duration */}
        <div className={styles.statCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={styles.statLabel}>Avg. Duration</span>
            <Sparkles size={15} style={{ color: '#8b5cf6', opacity: 0.8 }} />
          </div>
          <span className={styles.statValue} style={{ color: '#8b5cf6' }}>
            {analytics.avgDurationFormatted || '2m 15s'}
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--md-on-surface-variant)' }}>
            Bounce rate: {analytics.bounceRate || '22.8%'}
          </span>
        </div>
      </div>

      {/* Traffic Trend Chart (SVG) */}
      <div
        style={{
          backgroundColor: 'var(--md-surface, #ffffff)',
          border: '1px solid var(--md-outline-variant, #e1e4e8)',
          borderRadius: '10px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 600 }}>Traffic &amp; Engagement Trajectory</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)' }}>
              Daily pageviews and unique visitors over {timeRange === 'all' ? 'entire duration' : timeRange}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.72rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--md-primary, #1a73e8)' }} />
              <span>Pageviews</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#10b981' }} />
              <span>Unique Visitors</span>
            </div>
          </div>
        </div>

        {/* SVG Container */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            style={{ width: '100%', height: 'auto', minWidth: '550px', display: 'block' }}
          >
            <defs>
              <linearGradient id="pageviewGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--md-primary, #1a73e8)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--md-primary, #1a73e8)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = paddingY + pct * (chartHeight - paddingY * 2);
              const labelVal = Math.round(maxVal * (1 - pct));
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="var(--md-outline-variant, #e1e4e8)"
                    strokeDasharray="3 3"
                    strokeOpacity="0.6"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="var(--md-on-surface-variant)"
                    opacity="0.7"
                  >
                    {labelVal}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            {areaD && <path d={areaD} fill="url(#pageviewGradient)" />}

            {/* Pageview Line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="var(--md-primary, #1a73e8)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Visitors Line */}
            {visitorPathD && (
              <path
                d={visitorPathD}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Points */}
            {points.map((pt, idx) => (
              <circle
                key={`p-${idx}`}
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === idx ? 5 : 3}
                fill="#ffffff"
                stroke="var(--md-primary, #1a73e8)"
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'r 150ms ease' }}
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}

            {/* X-Axis Labels */}
            {points.map((pt, idx) => {
              const shouldShowLabel =
                points.length <= 14 ? true : idx % Math.ceil(points.length / 8) === 0 || idx === points.length - 1;
              if (!shouldShowLabel) return null;
              return (
                <text
                  key={`l-${idx}`}
                  x={pt.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="var(--md-on-surface-variant)"
                  opacity="0.75"
                >
                  {pt.data.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Hover details badge */}
        {hoveredPoint !== null && points[hoveredPoint] && (
          <div
            style={{
              padding: '0.4rem 0.75rem',
              backgroundColor: 'var(--md-surface-variant, #f1f3f4)',
              borderRadius: '6px',
              fontSize: '0.73rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              alignSelf: 'flex-start',
            }}
          >
            <strong>{points[hoveredPoint].data.label}</strong>
            <span style={{ color: 'var(--md-primary, #1a73e8)' }}>
              Pageviews: {points[hoveredPoint].data.pageviews}
            </span>
            <span style={{ color: '#10b981' }}>
              Unique Visitors: {points[hoveredPoint].data.visitors}
            </span>
          </div>
        )}
      </div>

      {/* Breakdowns Two-Column Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Top Pages */}
        <div
          style={{
            backgroundColor: 'var(--md-surface, #ffffff)',
            border: '1px solid var(--md-outline-variant, #e1e4e8)',
            borderRadius: '10px',
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>Top Pages &amp; Routes</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--md-on-surface-variant)' }}>Views</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {(analytics.topPages || []).slice(0, 5).map((page) => (
              <div key={page.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <code style={{ color: 'var(--md-primary, #1a73e8)', fontWeight: 600 }}>{page.name}</code>
                  <span>
                    <strong>{page.count}</strong> ({page.percentage}%)
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    backgroundColor: 'var(--md-outline-variant, #e1e4e8)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(page.percentage, 4)}%`,
                      height: '100%',
                      backgroundColor: 'var(--md-primary, #1a73e8)',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources / Referrers */}
        <div
          style={{
            backgroundColor: 'var(--md-surface, #ffffff)',
            border: '1px solid var(--md-outline-variant, #e1e4e8)',
            borderRadius: '10px',
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>Acquisition Channels</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--md-on-surface-variant)' }}>Referrals</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {(analytics.topReferrers || []).slice(0, 5).map((ref) => (
              <div key={ref.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span>{ref.name}</span>
                  <span>
                    <strong>{ref.count}</strong> ({ref.percentage}%)
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    backgroundColor: 'var(--md-outline-variant, #e1e4e8)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(ref.percentage, 4)}%`,
                      height: '100%',
                      backgroundColor: '#10b981',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographics Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Device Breakdown */}
        <div
          style={{
            backgroundColor: 'var(--md-surface, #ffffff)',
            border: '1px solid var(--md-outline-variant, #e1e4e8)',
            borderRadius: '10px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Device Category</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(analytics.devices || []).map((d) => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  {d.name === 'Desktop' ? <Laptop size={13} /> : d.name === 'Mobile' ? <Smartphone size={13} /> : <Tablet size={13} />}
                  <span>{d.name}</span>
                </span>
                <strong>{d.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Breakdown */}
        <div
          style={{
            backgroundColor: 'var(--md-surface, #ffffff)',
            border: '1px solid var(--md-outline-variant, #e1e4e8)',
            borderRadius: '10px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Browser Breakdown</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(analytics.browsers || []).slice(0, 4).map((b) => (
              <div key={b.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                <span>{b.name}</span>
                <strong>{b.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div
          style={{
            backgroundColor: 'var(--md-surface, #ffffff)',
            border: '1px solid var(--md-outline-variant, #e1e4e8)',
            borderRadius: '10px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Geographic Locations</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(analytics.countries || []).slice(0, 4).map((c) => (
              <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                <span>{c.name}</span>
                <strong>{c.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Recent Visitor Stream Table */}
      <div className={styles.tableContainer} style={{ marginTop: '0.5rem' }}>
        <div
          style={{
            padding: '0.85rem 1rem',
            borderBottom: '1px solid var(--md-outline-variant, #e1e4e8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600 }}>Real-Time Visitor Stream</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)' }}>
              Individual incoming visits recorded live from across the world
            </span>
          </div>
          <span className={styles.searchCountBadge}>
            Showing {(analytics.recentVisits || []).length} Recent Visits
          </span>
        </div>

        <div className={styles.tableList}>
          {(analytics.recentVisits || []).length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-on-surface-variant)', fontSize: '0.8rem' }}>
              No incoming visits recorded yet in this time frame. Visit public pages to see telemetry stream live!
            </div>
          ) : (
            (analytics.recentVisits || []).map((v, idx) => (
              <div
                key={v.id || `visit_${idx}`}
                className={styles.tableRow}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(140px, 1.2fr) minmax(130px, 1fr) minmax(110px, 1fr) minmax(120px, 1fr) 90px',
                  gap: '0.75rem',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  fontSize: '0.75rem',
                }}
              >
                {/* Route */}
                <div>
                  <code style={{ fontWeight: 600, color: 'var(--md-primary, #1a73e8)' }}>{v.path}</code>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--md-on-surface-variant)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {v.pageTitle}
                  </div>
                </div>

                {/* Referrer */}
                <div>
                  <span style={{ fontWeight: 600 }}>{v.referrer}</span>
                  <div style={{ fontSize: '0.68rem', opacity: 0.7 }}>Channel Source</div>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{v.flag || '🌐'}</span>
                  <div>
                    <span style={{ fontWeight: 500 }}>{v.country}</span>
                  </div>
                </div>

                {/* Device & Browser */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {v.device === 'Mobile' ? (
                    <Smartphone size={13} style={{ opacity: 0.6 }} />
                  ) : (
                    <Laptop size={13} style={{ opacity: 0.6 }} />
                  )}
                  <span>
                    {v.device} · {v.browser}
                  </span>
                </div>

                {/* Relative Time */}
                <div style={{ textAlign: 'right', color: 'var(--md-on-surface-variant)', fontSize: '0.7rem' }}>
                  {v.timestamp ? new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
