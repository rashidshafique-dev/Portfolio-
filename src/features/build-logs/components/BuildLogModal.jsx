import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Copy, Check, Zap } from 'lucide-react';
import { projects } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import Modal from '../../../components/Modal';
import LogContentRenderer from './LogContentRenderer';
import { copyToClipboard } from '../../../utils';
import { getProjectSlug } from '../../../utils/projectUtils';

export default function BuildLogModal({ log, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!log) return null;

  const handleCopyLogLink = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const slug = log.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `${origin}/build-logs#${slug}`;
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find related project for selected log
  const relatedProject = projects.find(
    (p) =>
      p.relatedLogTitle === log.title ||
      log.title.toLowerCase().includes(p.title.toLowerCase()) ||
      log.content.toLowerCase().includes(p.title.toLowerCase())
  );

  // Calculate reading time
  const readingTime = `${Math.max(2, Math.ceil(log.content.split(/\s+/).length / 180))} min read`;

  return (
    <Modal
      isOpen={Boolean(log)}
      onClose={onClose}
      size="lg"
      title={
        <div className={styles.modalHeaderTitleBlock}>
          <span className={styles.modalCategoryBadge}>{log.type}</span>
          <span className={styles.modalTitle}>{log.title}</span>
        </div>
      }
      headerExtra={
        <button
          type="button"
          onClick={handleCopyLogLink}
          className={styles.copyLogLinkBtn}
          title="Copy link to this build log"
          aria-label="Copy link to this build log"
        >
          {copied ? (
            <>
              <Check size={13} style={{ color: '#10b981' }} />
              <span className={styles.copyBtnLabel}>Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span className={styles.copyBtnLabel}>Copy link</span>
            </>
          )}
        </button>
      }
    >
      <div>
        {/* ── Article Hero: Full title + meta inside body ── */}
        <div className={styles.articleHero}>
          <h2 className={styles.articleHeroTitle}>{log.title}</h2>

          {/* Meta row: date · read time · metric · tags */}
          <div className={styles.modalMeta}>
            <div className={styles.modalMetaItem}>
              <Calendar size={13} aria-hidden="true" />
              <span>{log.date}</span>
            </div>

            <span className={styles.modalMetaDivider} aria-hidden="true" />

            <div className={styles.modalMetaItem}>
              <Clock size={13} aria-hidden="true" />
              <span>{readingTime}</span>
            </div>

            {log.metric && (
              <>
                <span className={styles.modalMetaDivider} aria-hidden="true" />
                <div className={styles.modalMetricBadge}>
                  <Zap size={11} aria-hidden="true" />
                  <span>{log.metric}</span>
                </div>
              </>
            )}

            <div className={styles.modalTags}>
              {log.tags.map((tag) => (
                <span key={tag} className={styles.modalTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <div className={styles.modalBody}>
          <LogContentRenderer content={log.content} />
        </div>

        {/* ── Footer: Related Project + Close ── */}
        <div className={styles.modalFooter}>
          {relatedProject ? (
            <Link
              to={`/projects#${getProjectSlug(relatedProject)}`}
              className={styles.relatedProjectBtn}
              onClick={onClose}
            >
              <span>Explore {relatedProject.title} Case Study</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className={styles.modalFooterCloseBtn}
          >
            <span>Close Log</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
