import { useState } from 'react';
import { ExternalLink, Folder, BookOpen, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon as Github } from '../../../components/SocialIcons';
import styles from '../styles.module.css';
import ProjectShareModal from './ProjectShareModal';

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

const stripEmojis = (text) => {
  if (!text) return '';
  return text
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/gu, '') // Strips high-surrogate emojis
    .replace(/[\u2600-\u27BF]/g, '')             // Strips standard symbols/emojis
    .replace(/\s+/g, ' ')                        // Normalize whitespace
    .trim();
};

export default function ProjectCard({ project, onClick }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const slug = getProjectSlug(project);
  
  // Enforce maximum of 5 tech stack chips per card
  const slicedTechStack = project.tech || project.techStack ? (project.tech || project.techStack).slice(0, 5) : [];

  const handleTitleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e, project);
    }
  };

  return (
    <article 
      role="article"
      className={styles.projectCard}
      onClick={(e) => onClick && onClick(e, project)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* 16:9 Image or Fallback */}
      <div className={styles.cardImageContainer}>
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={`${project.title} Preview`} 
            className={styles.cardImage} 
            loading="lazy"
            width="380"
            height="214"
            style={{ objectPosition: 'top' }}
          />
        ) : (
          <div className={styles.cardImageFallback}>
            <Folder size={24} className={styles.fallbackIcon} />
          </div>
        )}
      </div>
 
      {/* Card Info and Meta */}
      <div className={styles.cardContent}>
        {/* Row 1 — Clean Category Badge */}
        <div className={styles.cardHeaderMeta}>
          <span className={styles.categoryBadge}>
            {project.category || 'Software'}
          </span>
        </div>
 
        {/* Row 2 — project title */}
        <h3 className={styles.projectTitle}>
          <Link 
            to={`/projects#${slug}`}
            className={styles.projectTitleLink}
            onClick={handleTitleClick}
          >
            {project.title}
          </Link>
        </h3>
        
        {/* Row 3 — description */}
        <p className={`${styles.projectDesc} line-clamp-3 overflow-hidden [-webkit-line-clamp:3]`}>
          {stripEmojis(project.description)}
        </p>
 
        {/* Row 4 — tech stack chips */}
        <div className={styles.techList}>
          {slicedTechStack.map((tech) => (
            <div key={tech} className={styles.techItem}>
              <span className={styles.techName}>{tech}</span>
            </div>
          ))}
        </div>

        {/* Row 4.5 — Build Log Context Link */}
        {project.relatedLogTitle && (
          <div className={styles.logLinkRow}>
            <Link 
              to={`/build-logs#${project.relatedLogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className={styles.logLink}
              style={{ '--projects-accent': project.accentColor || 'var(--accent-brand)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <BookOpen size={12} aria-hidden="true" style={{ marginRight: '6px', flexShrink: 0 }} />
              <span>Read the Build Log</span>
            </Link>
          </div>
        )}

        {/* Row 5 — action buttons */}
        <div className={styles.cardActions}>
          {project.liveUrl && project.liveUrl !== project.githubUrl ? (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.liveButton}
              aria-label={`View live demo of ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} aria-hidden="true" style={{ marginRight: '6px' }} />
              <span>Live Demo</span>
            </a>
          ) : (
            <button
              type="button"
              className={styles.liveButton}
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e, project);
              }}
              aria-label={`Explore Case Study for ${project.title}`}
            >
              <ExternalLink size={13} aria-hidden="true" style={{ marginRight: '6px' }} />
              <span>Case Study</span>
            </button>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.githubButton}
              aria-label={`View GitHub repo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={13} aria-hidden="true" style={{ marginRight: '6px' }} />
              <span>GitHub</span>
            </a>
          )}
          <button
            type="button"
            className={styles.shareButton}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsShareOpen(true);
            }}
            aria-label={`Share ${project.title} on social media`}
            title="Share Project"
          >
            <Share2 size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Social Media Share Modal with Live Preview */}
      <ProjectShareModal
        project={project}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </article>
  );
}
