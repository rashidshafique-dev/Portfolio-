import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import { buildLogs } from '../../../constants/portfolioData';
import styles from '../styles.module.css';

export default function BuildLogsTeaser() {
  const navigate = useNavigate();
  // Extract the latest 2 build logs
  const latestLogs = buildLogs && buildLogs.length > 0 ? buildLogs.slice(0, 2) : [];

  if (latestLogs.length === 0) return null;

  return (
    <section className={styles.section} id="build-logs-teaser">
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>HIGHLIGHTED INSIGHTS</span>
          <h2 className={styles.title}>Build Logs</h2>
          <p className={styles.subtitle}>
            Architectural decisions, performance benchmarks, and production systems post-mortems.
          </p>
        </div>

        {/* CSS Grid layout following spec */}
        <div className={styles.logsGrid}>
          {latestLogs.map((log) => (
            <article 
              key={log.id} 
              className={styles.card}
              onClick={() => navigate('/build-logs')}
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

              {/* Card Title */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <span className={styles.cardTitleLink}>
                    {log.title}
                  </span>
                </h3>
                <p className={styles.cardDesc}>{log.excerpt}</p>
              </div>

              {/* Bottom Divider */}
              <div className={styles.bottomDivider} />

              {/* Topic chips (bottom) */}
              <div className={styles.topicList}>
                {log.tags.map((tag) => (
                  <div key={tag} className={styles.topicChip} onClick={(e) => e.stopPropagation()}>
                    <Tag size={10} aria-hidden="true" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

            </article>
          ))}
        </div>

        {/* Premium Section CTA Button */}
        <div className={styles.ctaWrapper}>
          <Link to="/build-logs" className={styles.teaserCtaBtn}>
            <span>Open Journal</span>
            <ArrowRight size={14} className="ml-[6px]" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}

