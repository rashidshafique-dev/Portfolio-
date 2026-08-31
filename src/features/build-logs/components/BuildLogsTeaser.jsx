import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, ExternalLink } from 'lucide-react';
import { buildLogs } from '../../../constants/portfolioData';
import styles from '../styles.module.css';

export default function BuildLogsTeaser() {
  const navigate = useNavigate();
  // Extract the top 3 most relevant build logs for recruiters
  const latestLogs = buildLogs && buildLogs.length > 0 ? buildLogs.slice(0, 3) : [];

  if (latestLogs.length === 0) return null;

  return (
    <section className={styles.section} id="build-logs-teaser">
      <div className="container">

        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>HIGHLIGHTED INSIGHTS</span>
          <h2 className={styles.title}>Build Logs</h2>
          <p className={styles.subtitle}>
            Architectural decisions, system optimizations, and deep technical case studies.
          </p>
        </div>

        {/* CSS Grid layout for Home page teaser */}
        <div className={`${styles.logsGrid} ${styles.teaserGrid}`}>
          {latestLogs.map((log) => {
            const slug = log.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <article
                key={log.id}
                className={styles.card}
                onClick={() => navigate(`/build-logs#${slug}`)}
              >

                {/* Top Row: Category Left, Date Right */}
                <div className={styles.topRow}>
                  <span className={styles.cardTag}>{log.type}</span>
                  <span className={styles.cardDate}>{log.date}</span>
                </div>

                {/* Card Title & Excerpt */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>
                    <span className={styles.cardTitleLink}>
                      {log.title}
                    </span>
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
            );
          })}
        </div>

        {/* Section CTAs */}
        <div className={styles.ctaWrapper}>
          <Link to="/build-logs" className={styles.teaserCtaBtn}>
            <span>Open Journal</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a
            href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7495340020820512769"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.newsletterCtaBtn}
          >
            <span>Subscribe on LinkedIn</span>
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
}

