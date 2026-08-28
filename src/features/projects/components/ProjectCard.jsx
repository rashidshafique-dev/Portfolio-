import { ExternalLink, Folder, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon as Github } from '../../../components/SocialIcons';
import styles from '../styles.module.css';

const getProjectSlug = (project) => {
  if (project.repoName) return project.repoName.toLowerCase();
  if (project.githubUrl) {
    const parts = project.githubUrl.split('/');
    return parts[parts.length - 1].toLowerCase();
  }
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
        {/* Row 1 — badge */}
        <div className={styles.cardHeaderMeta}>
          <span className={styles.categoryBadge}>
            {project.category || 'Software'}
          </span>
          {project.metric && (
            <span 
              className={styles.metricBadge} 
              style={{ '--projects-accent': project.accentColor || 'var(--accent-brand)' }}
            >
              {project.metric}
            </span>
          )}
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
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.liveButton}
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={13} aria-hidden="true" style={{ marginRight: '6px' }} />
            <span>Live Demo</span>
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubButton}
            aria-label={`View GitHub repo for ${project.title}`}
          >
            <Github size={13} aria-hidden="true" style={{ marginRight: '6px' }} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
}
