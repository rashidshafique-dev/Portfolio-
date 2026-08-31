import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Smartphone
} from 'lucide-react';
import {
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
  RedditIcon
} from '../../../components/SocialIcons';
import styles from './project-share.module.css';

const getProjectSlug = (project) => {
  if (!project) return '';
  if (project.repoName) return project.repoName.toLowerCase();
  if (project.githubUrl) {
    const parts = project.githubUrl.split('/');
    return parts[parts.length - 1].toLowerCase();
  }
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/gu, '')
    .replace(/[\u2600-\u27BF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export default function ProjectShareModal({ project, isOpen, onClose }) {
  const [shareTarget, setShareTarget] = useState('portfolio'); // 'portfolio' | 'live'
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trap Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !project) return null;

  const slug = getProjectSlug(project);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rashid-shafique-portfolio.vercel.app';
  const portfolioUrl = `${origin}/projects#${slug}`;
  const liveUrl = project.liveUrl || portfolioUrl;

  const activeUrl = shareTarget === 'live' && project.liveUrl ? liveUrl : portfolioUrl;
  const activeDomain = activeUrl.replace(/^https?:\/\//, '').split('/')[0];

  const shareTitle = `${project.title} — ${project.tagline || cleanText(project.description).slice(0, 90)}`;
  const shareText = `Explore "${project.title}" by Muhammad Rashid Shafique — ${cleanText(project.description).slice(0, 140)}...`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(activeUrl);
      } else {
        const input = document.createElement('input');
        input.value = activeUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: shareText,
          url: activeUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Native share error:', err);
        }
      }
    }
  };

  const encodedUrl = encodeURIComponent(activeUrl);
  const encodedTitle = encodeURIComponent(project.title);
  const encodedText = encodeURIComponent(`${shareText} ${activeUrl}`);

  const shareLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedinIcon size={20} />
    },
    {
      id: 'twitter',
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodedUrl}`,
      icon: <TwitterIcon size={18} />
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
      icon: <WhatsappIcon size={20} />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon size={20} />
    },
    {
      id: 'reddit',
      name: 'Reddit',
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: <RedditIcon size={20} />
    }
  ];

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="google-share-title"
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Google MD3 Header */}
            <div className={styles.header}>
              <h2 id="google-share-title" className={styles.title}>Share</h2>
              <button
                type="button"
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close share dialog"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className={styles.body}>

              {/* YouTube / Google Style Social Share Circles */}
              <div>
                <span className={styles.sectionLabel}>Share to</span>
                <div className={styles.socialRow}>
                  {shareLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialItem}
                      title={`Share on ${item.name}`}
                    >
                      <div className={styles.socialCircle}>
                        {item.icon}
                      </div>
                      <span className={styles.socialName}>{item.name}</span>
                    </a>
                  ))}

                  {hasNativeShare && (
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className={styles.socialItem}
                      title="More share options"
                    >
                      <div className={styles.socialCircle}>
                        <Smartphone size={18} aria-hidden="true" />
                      </div>
                      <span className={styles.socialName}>More</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Google Item Preview Card */}
              <div className={styles.previewCard}>
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={styles.previewThumb}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.previewThumb} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px' }}>
                    Preview
                  </div>
                )}
                <div className={styles.previewInfo}>
                  <span className={styles.previewCategory}>
                    {project.category || 'Project'}
                  </span>
                  <h3 className={styles.previewTitle}>{project.title}</h3>
                  <span className={styles.previewDomain}>{activeDomain}</span>
                </div>
              </div>

              {/* Google Drive Style Copy Link */}
              <div>
                <span className={styles.sectionLabel}>Share link</span>
                
                {project.liveUrl && (
                  <div className={styles.targetControl} role="group" aria-label="Link destination">
                    <button
                      type="button"
                      className={`${styles.targetOption} ${shareTarget === 'portfolio' ? styles.targetOptionActive : ''}`}
                      onClick={() => setShareTarget('portfolio')}
                    >
                      Case Study
                    </button>
                    <button
                      type="button"
                      className={`${styles.targetOption} ${shareTarget === 'live' ? styles.targetOptionActive : ''}`}
                      onClick={() => setShareTarget('live')}
                    >
                      Live Demo
                    </button>
                  </div>
                )}

                <div className={styles.copyRow}>
                  <div className={styles.linkInputWrapper}>
                    <input
                      type="text"
                      readOnly
                      value={activeUrl}
                      className={styles.linkInput}
                      aria-label="Link URL"
                      onClick={(e) => e.target.select()}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`${styles.copyButton} ${copied ? styles.copyButtonSuccess : ''}`}
                  >
                    {copied ? (
                      <>
                        <Check size={16} aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} aria-hidden="true" />
                        <span>Copy link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
