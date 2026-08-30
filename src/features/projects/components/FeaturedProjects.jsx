import { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { projects } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const getProjectSlug = (project) => {
  if (project.repoName) return project.repoName.toLowerCase();
  if (project.githubUrl) {
    const parts = project.githubUrl.split('/');
    return parts[parts.length - 1].toLowerCase();
  }
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const repoTitleOverrides = {
  'sales-data-analysis-system': 'Sales Data Analysis System',
  'medicare / hospital management': 'MediCare / Hospital Management',
  'medicare': 'MediCare / Hospital Management',
  'hospital-management-system': 'Hospital Management System',
  'algoviz-pro': 'AlgoViz Pro',
  'face-recognition-attendance-system': 'Face Recognition Attendance System',
  'taleempro': 'TaleemPro',
  'venturetwist': 'VentureTwist',
  'rescue_project-': 'Rescue Project',
  'foody-app': 'FoodDash',
  'fooddash': 'FoodDash',
  'ai-hms': 'Al Shifaa Clinic'
};

const formatProjectTitle = (name) => {
  if (!name) return '';
  const key = name.toLowerCase().trim();
  if (repoTitleOverrides[key]) {
    return repoTitleOverrides[key];
  }
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
};

const CACHE_KEY = 'github_repos_raw_cache_v13';
const CACHE_TIME_KEY = 'github_repos_raw_cache_time_v13';
const ONE_HOUR = 60 * 60 * 1000;

const mergeProjects = (rawGithubRepos) => {
  const mergedProjects = rawGithubRepos.map(apiProj => {
    const matchedStatic = projects.find(p =>
      p.title.toLowerCase() === apiProj.repoName.toLowerCase() ||
      (p.githubUrl && p.githubUrl.toLowerCase().includes(apiProj.repoName.toLowerCase()))
    );
    if (matchedStatic) {
      return {
        ...apiProj,
        ...matchedStatic,
        title: matchedStatic.title === 'Sales-Data-Analysis-System' ? 'Sales Data Analysis System' : formatProjectTitle(matchedStatic.title),
        techStack: Array.from(new Set([...(matchedStatic.tech || matchedStatic.techStack || []), ...apiProj.techStack]))
      };
    }
    return apiProj;
  });

  const unmatchedStatic = projects.filter(staticProj => 
    !rawGithubRepos.some(apiProj => 
      staticProj.title.toLowerCase() === apiProj.repoName.toLowerCase() ||
      (staticProj.githubUrl && staticProj.githubUrl.toLowerCase().includes(apiProj.repoName.toLowerCase()))
    )
  );

  const allProjects = [...mergedProjects, ...unmatchedStatic];

  return [...allProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const idA = a.id !== undefined ? a.id : 999;
    const idB = b.id !== undefined ? b.id : 999;
    return idA - idB;
  });
};

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [projectList, setProjectList] = useState(() => {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
        const rawRepos = JSON.parse(cachedData);
        return mergeProjects(rawRepos);
      }
    } catch (e) {
      console.warn('Failed to parse projects cache on init:', e);
    }
    return [...projects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.id - b.id;
    });
  });

  const [loading, setLoading] = useState(false);

  const handleCardClick = (e, project) => {
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    navigate(`/projects#${getProjectSlug(project)}`);
  };

  useEffect(() => {
    async function fetchGithubRepos() {
      try {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
          setLoading(false);
          return;
        }

        const response = await fetch('https://api.github.com/users/rashidshafique-dev/repos?sort=updated&per_page=30');
        if (!response.ok) throw new Error('API fetch failed');
        const repos = await response.json();

        const mappedProjects = repos
          .filter(repo => !repo.fork && repo.name.toLowerCase() !== 'rashidshafique-dev' && repo.name.toLowerCase() !== 'rashidkhan4067' && repo.name.toLowerCase() !== 'portfolio-' && repo.name.toLowerCase() !== 'foody-app')
          .map((repo, index) => {
            let category = 'Open Source';
            let accentColor = '#7C3AED';

            const desc = (repo.description || '').toLowerCase();
            const topics = repo.topics || [];

            if (topics.includes('machine-learning') || topics.includes('ai') || desc.includes('face') || desc.includes('opencv') || desc.includes('predictive') || desc.includes('analysis') || desc.includes('ml')) {
              category = 'AI/ML';
              accentColor = '#1A73E8';
            } else if (topics.includes('mobile') || topics.includes('android') || topics.includes('ios') || desc.includes('mobile') || desc.includes('capacitor')) {
              category = 'Mobile';
              accentColor = '#FEA116';
            } else if (topics.includes('iot') || desc.includes('iot') || desc.includes('arduino') || desc.includes('telemetry')) {
              category = 'IoT';
              accentColor = '#00C1D4';
            } else if (topics.includes('fullstack') || topics.includes('frontend') || desc.includes('react') || desc.includes('next') || desc.includes('dashboard')) {
              category = 'Full-Stack';
              accentColor = '#34A853';
            } else if (topics.includes('backend') || desc.includes('api') || desc.includes('backend') || desc.includes('django') || desc.includes('fastapi')) {
              category = 'Full-Stack';
              accentColor = '#EA4335';
            }

            const techStack = [];
            if (repo.language) techStack.push(repo.language);
            topics.slice(0, 3).forEach(t => {
              const formattedTopic = t.charAt(0).toUpperCase() + t.slice(1);
              if (!techStack.includes(formattedTopic)) {
                techStack.push(formattedTopic);
              }
            });
            if (techStack.length === 0) techStack.push('Software');

            return {
              id: repo.id || index,
              repoName: repo.name,
              title: formatProjectTitle(repo.name),
              description: repo.description || 'A highly performant, automated software repository deployed with modern engineering workflows.',
              techStack: techStack,
              tech: techStack,
              category: category,
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              accentColor: accentColor,
              featured: false
            };
          });

        if (mappedProjects.length > 0) {
          const sortedProjects = mergeProjects(mappedProjects);
          setProjectList(sortedProjects);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(mappedProjects));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        }
      } catch (error) {
        console.warn('GitHub API rate limit or error, falling back to cached static data:', error);
        const expiredCache = sessionStorage.getItem(CACHE_KEY);
        if (expiredCache) {
          setProjectList(mergeProjects(JSON.parse(expiredCache)));
        } else {
          setProjectList([...projects].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.id - b.id;
          }));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGithubRepos();
  }, []);

  // Filter out projects without images
  const projectsWithImages = projectList.filter(project => !!project.imageUrl);

  // Filter logic based on activeFilter state matching project.category
  const filteredProjects = activeFilter.toLowerCase() === 'all'
    ? projectsWithImages
    : projectsWithImages.filter(p => p.category && p.category.toLowerCase() === activeFilter.toLowerCase());

  // Reset showAll when filter changes to prevent empty views
  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  const skeletonCards = Array.from({ length: 3 });
  const FILTER_CHIPS = ['All', 'Full-Stack', 'AI/ML', 'Open Source', 'Mobile', 'IoT'];

  return (
    <section className={styles.section} id="featured-projects" aria-label="Featured Projects">
      <div className="container">

        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>TECHNICAL PORTFOLIO</span>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            Web apps, Python backends, and real-world semester projects.
          </p>
        </div>

        {/* Filter Chips Row */}
        <div className={styles.filterChipsRow} role="navigation" aria-label="Project category filtering">
          {FILTER_CHIPS.map((chip) => (
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
