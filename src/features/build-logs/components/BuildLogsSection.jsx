import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Copy, Check, ExternalLink, Zap } from 'lucide-react';
import { buildLogs, projects } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import Modal from '../../../components/Modal';
import LogContentRenderer from './LogContentRenderer';

const getProjectSlug = (project) => {
  if (!project) return '';
  if (project.repoName) {
    return project.repoName.toLowerCase().replace(/\.git$/i, '').trim();
  }
  if (project.githubUrl) {
    const cleanUrl = project.githubUrl.replace(/\/$/, '').replace(/\.git$/i, '');
    const parts = cleanUrl.split('/');
    const lastPart = parts[parts.length - 1].toLowerCase().trim();
    if (lastPart) return lastPart;
  }
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export default function BuildLogsSection() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const found = buildLogs.find(
        (log) => log.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash
      );
      if (found) {
        setSelectedLog(found);
      }
    }
  }, [location]);

  const openLog = (log) => {
    setSelectedLog(log);
    const slug = log.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    window.history.replaceState(null, '', `#${slug}`);
  };

  const closeLog = () => {
    setSelectedLog(null);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleCopyLogLink = async () => {
    if (!selectedLog) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const slug = selectedLog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `${origin}/build-logs#${slug}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Copy link failed:', err);
    }
  };

  const categories = ['All', 'Backend', 'Performance', 'Data Analysis', 'AI', 'IoT', 'Algorithms'];

  const filteredLogs =
    activeCategory === 'All'
      ? buildLogs
      : buildLogs.filter(
          (log) =>
            log.tags.some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase())) ||
            log.type.toLowerCase().includes(activeCategory.toLowerCase())
        );

  // Find related project for selected log
  const relatedProject = selectedLog
    ? projects.find(
        (p) =>
          p.relatedLogTitle === selectedLog.title ||
          selectedLog.title.toLowerCase().includes(p.title.toLowerCase()) ||
          selectedLog.content.toLowerCase().includes(p.title.toLowerCase())
      )
    : null;

  // Calculate reading time
  const readingTime = selectedLog
    ? `${Math.max(2, Math.ceil(selectedLog.content.split(/\s+/).length / 180))} min read`
    : '3 min read';

  return (
    <section className={styles.section} id="build-logs-section">
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>HIGHLIGHTED INSIGHTS</span>
          <h1 className={styles.title}>Build Logs</h1>
          <p className={styles.subtitle}>
            A structured collection of full-stack engineering logs, system architecture, and optimization write-ups.
          </p>
          <div style={{ marginTop: '0.85rem' }}>
            <a
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7495340020820512769"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.newsletterCtaBtn}
            >
              <span>Subscribe to Newsletter on LinkedIn</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Category Filter Selector pills */}
        <nav className={styles.filterContainer} aria-label="Filter build logs by technology">
          <div className={styles.filterScroller}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''} flex-shrink-0`}
                aria-pressed={activeCategory === cat ? 'true' : 'false'}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Responsive Grid Layout identical to Projects */}
        <div className={styles.logsGrid}>
          {filteredLogs.map((log) => (
            <article 
              key={log.id} 
              className={styles.card}
              onClick={() => openLog(log)}
            >
              
              {/* Top Row: Category Left, Date Right */}
              <div className={styles.topRow}>
                <span className={styles.cardTag}>{log.type}</span>
                <span className={styles.cardDate}>{log.date}</span>
              </div>

              {/* Card Title & Excerpt */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLog(log);
                    }}
                    className={styles.cardTitleButton}
                  >
                    {log.title}
                  </button>
                </h3>
                <p className={styles.cardDesc}>{log.excerpt}</p>
              </div>

              {/* Topic chips (bottom) */}
              <div className={styles.topicList}>
                {log.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className={styles.topicChip} onClick={(e) => e.stopPropagation()}>
                    {tag}
                  </span>
                ))}
              </div>

            </article>
          ))}
        </div>

        {/* Selected Log Content Modal — Google MD3 Engineering Log */}
        <Modal
          isOpen={!!selectedLog}
          onClose={closeLog}
          size="lg"
          title={
            selectedLog ? (
              <div className={styles.modalHeaderTitleBlock}>
                <span className={styles.modalCategoryBadge}>{selectedLog.type}</span>
                <h2 className={styles.modalTitle}>{selectedLog.title}</h2>
              </div>
            ) : ''
          }
          headerExtra={
            <button
              type="button"
              onClick={handleCopyLogLink}
              className={styles.copyLogLinkBtn}
              title="Copy link to this build log"
            >
              {copied ? (
                <>
                  <Check size={14} style={{ color: 'var(--accent-success, #10b981)' }} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy link</span>
                </>
              )}
            </button>
          }
        >
          {selectedLog && (
            <div>
              {/* Article Meta Bar (Date, Reading Time, Impact Metric, Tags) */}
              <div className={styles.modalMeta}>
                <div className={styles.modalMetaItem}>
                  <Calendar size={13} aria-hidden="true" />
                  <span>{selectedLog.date}</span>
                </div>
                
                <div className={styles.modalMetaItem}>
                  <Clock size={13} aria-hidden="true" />
                  <span>{readingTime}</span>
                </div>

                {selectedLog.metric && (
                  <div className={styles.modalMetricBadge}>
                    <Zap size={12} aria-hidden="true" />
                    <span>{selectedLog.metric}</span>
                  </div>
                )}

                <div className={styles.modalTags}>
                  {selectedLog.tags.map((tag) => (
                    <span key={tag} className={styles.modalTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rendered Markdown Article Body */}
              <div className={styles.modalBody}>
                <LogContentRenderer content={selectedLog.content} />
              </div>

              {/* Footer Bar: Related Project Link */}
              <div className={styles.modalFooter}>
                {relatedProject ? (
                  <Link
                    to={`/projects#${getProjectSlug(relatedProject)}`}
                    className={styles.relatedProjectBtn}
                    onClick={closeLog}
                  >
                    <span>Explore {relatedProject.title} Case Study</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={closeLog}
                  className={styles.copyLogLinkBtn}
                >
                  <span>Close Log</span>
                </button>
              </div>

            </div>
          )}
        </Modal>

      </div>
    </section>
  );
}
