import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { buildLogs } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import BuildLogModal from './BuildLogModal';

export default function BuildLogsSection() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const found = buildLogs.find(
        (log) => log.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash
      );
      if (found) {
        setSelectedLog(found);
        // Scroll overlay back to top when opening via hash
        window.scrollTo({ top: 0, behavior: 'instant' });
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

  const categories = ['All', 'Backend', 'Performance', 'Data Analysis', 'AI', 'IoT', 'Algorithms'];

  const filteredLogs =
    activeCategory === 'All'
      ? buildLogs
      : buildLogs.filter(
          (log) =>
            log.tags.some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase())) ||
            log.type.toLowerCase().includes(activeCategory.toLowerCase())
        );

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

        {/* Category Filter Pills */}
        <nav className={styles.filterContainer} aria-label="Filter build logs by technology">
          <div className={styles.filterScroller}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                aria-pressed={activeCategory === cat ? 'true' : 'false'}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Log Cards Grid */}
        <div className={styles.logsGrid}>
          {filteredLogs.map((log) => (
            <article
              key={log.id}
              className={styles.card}
              onClick={() => openLog(log)}
              style={{ scrollMarginTop: '80px' }}
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

              {/* Topic chips */}
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

        {/* ── Build Log Article Modal ── */}
        <BuildLogModal log={selectedLog} onClose={closeLog} />

      </div>
    </section>
  );
}
