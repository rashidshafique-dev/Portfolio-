import { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import styles from '../styles.module.css';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import {
  getProjectSlug,
  PROJECT_CATEGORIES,
  matchesCategory,
} from '../../../utils/projectUtils';
import { useGithubProjects } from '../hooks/useGithubProjects';

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const { projectList, loading } = useGithubProjects({ sortByFeatured: true });

  const handleCardClick = (e, project) => {
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    navigate(`/projects#${getProjectSlug(project)}`);
  };

  // Filter out projects without images
  const projectsWithImages = projectList.filter(project => !!project.imageUrl);

  // Filter logic based on activeFilter state matching project.category
  const filteredProjects = projectsWithImages.filter((p) =>
    matchesCategory(p.category, activeFilter)
  );

  // Reset showAll when filter changes to prevent empty views
  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  const skeletonCards = Array.from({ length: 3 });

  return (
    <section className={styles.section} id="featured-projects" aria-label="Featured Projects">
      <div className="container">

        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>TECHNICAL PORTFOLIO</span>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            Production web platforms, high-performance Python backends, and full-stack systems.
          </p>
        </div>

        {/* Filter Chips Row */}
        <div className={styles.filterChipsRow} role="navigation" aria-label="Project category filtering">
          {PROJECT_CATEGORIES.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`${styles.filterChip} ${activeFilter.toLowerCase() === chip.toLowerCase() ? styles.activeChip : ''}`}
              aria-pressed={activeFilter.toLowerCase() === chip.toLowerCase() ? 'true' : 'false'}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Responsive Grid / Flex list layout */}
        <div className={styles.projectsGrid}>
          {loading ? (
            skeletonCards.map((_, index) => (
              <div
                key={`project-skeleton-${index}`}
                className={`${styles.projectCard} ${styles.skeletonCard}`}
              >
                <div className={`${styles.skeletonImage} skeleton`} />
                <div className={styles.cardContent}>
                  <div className={styles.cardHeaderMeta}>
                    <div className={`${styles.skeletonBadge} skeleton`} />
                  </div>
                  <div className={`${styles.skeletonTitle} skeleton`} />
                  <div className={`${styles.skeletonDescLine1} skeleton`} />
                  <div className={`${styles.skeletonDescLine2} skeleton`} />
                  <div className={styles.techList} style={{ marginTop: '1rem' }}>
                    <div className={`${styles.skeletonTech} skeleton`} />
                    <div className={`${styles.skeletonTech} skeleton`} />
                  </div>
                </div>
                <div className={styles.cardActions} style={{ gap: '0.5rem', marginTop: '1rem' }}>
                  <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '8px' }} />
                  <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '8px' }} />
                </div>
              </div>
            ))
          ) : (
            displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>

        {/* View Toggle */}
        {filteredProjects.length > 3 && (
          <div className={styles.toggleWrapper}>
            <button
              className={styles.exploreToggle}
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              aria-controls="featured-projects"
            >
              <span>{showAll ? 'Show Featured Projects' : 'View All Projects'}</span>
              {showAll ? (
                <ChevronUp size={16} className={styles.toggleIcon} aria-hidden="true" />
              ) : (
                <ChevronDown size={16} className={styles.toggleIcon} aria-hidden="true" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
