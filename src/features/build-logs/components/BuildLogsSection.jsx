import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Tag, ExternalLink } from 'lucide-react';
import { buildLogs } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import Modal from '../../../components/Modal';

export default function BuildLogsSection() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const found = buildLogs.find(log => log.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash);
      if (found) {
        setSelectedLog(found);
      }
    }
  }, [location]);

  const openLog = (log) => {
    setSelectedLog(log);
  };

  const closeLog = () => {
    setSelectedLog(null);
    if (window.location.hash) {
      window.location.hash = '';
    }
  };

  const categories = ['All', 'Backend', 'Performance', 'Big Data', 'AI', 'IoT', 'Algorithms'];

  const filteredLogs = activeCategory === 'All'
    ? buildLogs
    : buildLogs.filter(log => 
        log.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase())) ||
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
            A structured collection of low-latency optimization logs, system telemetry, and pipeline architectural write-ups.
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
                aria-pressed={activeCategory === cat ? "true" : "false"}
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
              
              {/* Top Row: Tags Left, Date Right */}
              <div className={styles.topRow}>
                <div className={styles.tagList}>
                  <span className={styles.cardTag}>{log.type}</span>
                  <span className={styles.cardTag}>{log.metric}</span>
                </div>
                <span className={styles.cardDate}>{log.date}</span>
              </div>

              {/* Divider after top row */}
              <div className={styles.divider} />

              {/* Card Title & Desc */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <button
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

              {/* Bottom Divider */}
              <div className={styles.bottomDivider} />

              {/* Topic chips (bottom) */}
              <div className={styles.topicList}>
                {log.tags.slice(0, 3).map((tag) => (
                  <div key={tag} className={styles.topicChip} onClick={(e) => e.stopPropagation()}>
                    <Tag size={10} aria-hidden="true" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

            </article>
          ))}
        </div>

        {/* Selected Log Content Modal */}
        <Modal
          isOpen={!!selectedLog}
          onClose={closeLog}
          title={selectedLog?.title || ''}
          size="lg"
        >
          {selectedLog && (
            <div>
              <div className={styles.modalMeta}>
                <span className={styles.modalDate}>{selectedLog.date}</span>
                <div className={styles.modalTags}>
                  {selectedLog.tags.map((tag) => (
                    <span key={tag} className={styles.modalTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.modalBody}>
                {selectedLog.content}
              </div>
            </div>
          )}
        </Modal>

      </div>
    </section>
  );
}

