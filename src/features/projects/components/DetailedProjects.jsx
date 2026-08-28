import { useState, useEffect } from 'react';
import {
  Code2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GithubIcon as Github } from '../../../components/SocialIcons';
import { projects } from '../../../constants/portfolioData';
import styles from '../detailed-styles.module.css';
import SectionHeading from '../../../components/SectionHeading';
import ProjectCard from './ProjectCard';

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

const repoTitleOverrides = {
  'rashidshafique-dev': 'Sales Data Pipeline',
  'rashidkhan4067': 'Sales Data Pipeline',
  'sales-data-analysis-system': 'Sales Data Pipeline',
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
        title: matchedStatic.title === 'Sales-Data-Analysis-System' ? 'Sales Data Pipeline' : matchedStatic.title,
        techStack: Array.from(new Set([...matchedStatic.techStack, ...apiProj.techStack]))
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
    const idA = a.id !== undefined ? a.id : 999;
    const idB = b.id !== undefined ? b.id : 999;
    return idA - idB;
  });
};

function ProjectVisualPlaceholder({ project }) {
  const isML = project.category === 'AI / ML';
  const isBackend = project.category === 'Backend';

  return (
    <div className={styles.placeholderContainer}>
      <svg className={styles.placeholderSvg} viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" rx="6" />

        {isML && (
          <>
            <rect x="30" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="75" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Data Ingest</text>

            <path d="M 120 90 L 150 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <rect x="155" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="200" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ML Predictor</text>

            <path d="M 245 90 L 275 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <rect x="280" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="325" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Plotly UI</text>
          </>
        )}

        {isBackend && (
          <>
            <rect x="30" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="75" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Client API</text>

            <path d="M 120 90 L 150 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <rect x="155" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="200" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Auth Token</text>

            <path d="M 245 90 L 275 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <rect x="280" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="325" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Postgres DB</text>
          </>
        )}

        {!isML && !isBackend && (
          <>
            <rect x="30" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="75" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">React SPA</text>

            <path d="M 120 90 L 150 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <rect x="155" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="200" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Node Server</text>

            <path d="M 245 90 L 275 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <rect x="280" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="325" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Store DB</text>
          </>
        )}

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--projects-accent)" />
          </marker>
        </defs>
      </svg>
      <span className={styles.placeholderText}>{project.title} Architecture</span>
    </div>
  );
}

export default function DetailedProjects() {
  const [showAll, setShowAll] = useState(false);
  const [projectList, setProjectList] = useState(() => {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
        const rawRepos = JSON.parse(cachedData);
        return mergeProjects(rawRepos);
      }
    } catch (e) {
      console.warn('Failed to parse detailed projects cache on init:', e);
    }
    return [...projects].sort((a, b) => a.id - b.id);
  });
  const [loading, setLoading] = useState(() => {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
        return false;
      }
    } catch {
      // Ignore cache retrieval errors
    }
    return true;
  });

  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImg, setActiveImg] = useState(null);

  // Reset activeImg when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      if (selectedProject.screenshots && selectedProject.screenshots.length > 0) {
        setActiveImg(selectedProject.screenshots[0].url);
      } else {
        setActiveImg(selectedProject.imageUrl);
      }
    } else {
      setActiveImg(null);
    }
  }, [selectedProject]);

  // Sync state with URL hash and router location
  useEffect(() => {
    const rawHash = (location.hash || window.location.hash || '').replace(/^#/, '').toLowerCase();
    if (rawHash && projectList && projectList.length > 0) {
      const found = projectList.find(p => getProjectSlug(p) === rawHash);
      if (found) {
        setSelectedProject(found);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    if (!rawHash) {
      setSelectedProject(null);
    }
  }, [location, projectList, loading]);

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

            if (topics.includes('machine-learning') || topics.includes('ai') || desc.includes('face') || desc.includes('opencv') || desc.includes('pyspark') || desc.includes('predictive') || desc.includes('ml')) {
              category = 'AI / ML';
              accentColor = '#1A73E8';
            } else if (topics.includes('fullstack') || topics.includes('frontend') || desc.includes('react') || desc.includes('next') || desc.includes('dashboard')) {
              category = 'Full-Stack';
              accentColor = '#34A853';
            } else if (topics.includes('backend') || desc.includes('api') || desc.includes('backend') || desc.includes('django') || desc.includes('fastapi')) {
              category = 'Backend';
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
              category: category,
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              accentColor: accentColor
            };
          });

        const merged = mergeProjects(mappedProjects);
        setProjectList(merged);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(mappedProjects));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch (storageErr) {
          console.warn('SessionStorage quota exceeded, skipping caching:', storageErr);
        }
      } catch (error) {
        console.warn('GitHub API rate limit or error, falling back to cached static data:', error);
        const expiredCache = sessionStorage.getItem(CACHE_KEY);
        if (expiredCache) {
          setProjectList(mergeProjects(JSON.parse(expiredCache)));
        } else {
          setProjectList([...projects].sort((a, b) => {
            const idA = a.id !== undefined ? a.id : 999;
            const idB = b.id !== undefined ? b.id : 999;
            return idA - idB;
          }));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGithubRepos();
  }, []);

  const handleCardClick = (e, project) => {
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    const slug = getProjectSlug(project);
    setSelectedProject(project);
    window.location.hash = slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    window.history.pushState('', document.title, window.location.pathname);
    setSelectedProject(null);
  };

  if (selectedProject) {
    const hasImage = !!selectedProject.imageUrl;
    const statusText = selectedProject.status || 'Completed';
    const problemStatementText = selectedProject.problemStatement || 'Traditional healthcare administration suffers from high check-in overhead, slow patient registration, and insecure role-based operations.';
    const challengesList = selectedProject.challenges || [
      'Technical challenge 1 and decision made.',
      'Technical challenge 2 and decision made.'
    ];
    const outcomeText = selectedProject.outcome || 'Fully open-source code repository published on GitHub.';

    return (
      <section className={styles.section} id="project-article-view">
        <div className="container">
          <article className={styles.articleContainer}>
            {/* Back Button */}
            <button onClick={handleBack} className={styles.backButton} aria-label="Go back to project grid">
              <ArrowLeft size={16} />
              <span>Back to Projects</span>
            </button>

            {/* Article Header */}
            <header className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <span 
                  className={styles.categoryBadge} 
                  style={{ '--projects-accent': selectedProject.accentColor || 'var(--accent-brand)' }}
                >
                  {selectedProject.category}
                </span>
                <span className={styles.statusBadge}>
                  <span
                    className={styles.statusDot}
                    style={{ backgroundColor: (statusText === 'In Development' || statusText === 'In Progress') ? '#FBBC05' : '#34A853' }}
                  />
                  {statusText}
                </span>
              </div>
              <h1 className={styles.articleTitle}>{selectedProject.title}</h1>
              <p className={styles.articleTagline}>{selectedProject.tagline || stripEmojis(selectedProject.description)}</p>

              {/* Quick Action Buttons for immediate access */}
              <div className={styles.headerActions}>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.articlePrimaryAction}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    <span>Live Demo</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.articleSecondaryAction}
                  >
                    <Github size={14} aria-hidden="true" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {selectedProject.relatedLogTitle && (
                  <Link
                    to={`/build-logs#${selectedProject.relatedLogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className={styles.articleSecondaryAction}
                  >
                    <BookOpen size={14} aria-hidden="true" />
                    <span>Read Build Log</span>
                  </Link>
                )}
              </div>
            </header>

            {/* Hero Image / Mockup Container */}
            <div className={styles.heroSectionWrapper}>
              <div className={styles.articleHero}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDotsGroup}>
                    <span className={styles.browserDot} style={{ backgroundColor: '#ef4444' }} />
                    <span className={styles.browserDot} style={{ backgroundColor: '#f59e0b' }} />
                    <span className={styles.browserDot} style={{ backgroundColor: '#10b981' }} />
                  </div>
                  <div className={styles.browserUrlBar}>
                    {selectedProject.liveUrl ? selectedProject.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${getProjectSlug(selectedProject)}.app`}
                  </div>
                  <div style={{ width: '40px' }} />
                </div>
                <div className={styles.browserBody}>
                  {hasImage ? (
                    <img
                      src={activeImg || selectedProject.imageUrl}
                      alt={`${selectedProject.title} Preview`}
                      className={styles.heroImage}
                    />
                  ) : (
                    <ProjectVisualPlaceholder project={selectedProject} />
                  )}
                </div>
              </div>

              {/* Clean Screenshot Gallery Tabs Below Mockup */}
              {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                <div className={styles.screenshotTabsContainer}>
                  <span className={styles.screenshotTabsLabel}>Views:</span>
                  <div className={styles.screenshotTabsScroller}>
                    {selectedProject.screenshots.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setActiveImg(s.url)}
                        className={`${styles.screenshotTabBtn} ${activeImg === s.url ? styles.screenshotTabBtnActive : ''}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Article Content Area */}
            <div className={styles.articleContent}>
              
              {/* Left Column: Text Case Study */}
              <div className={styles.mainContentCol}>
                
                {/* Problem Statement */}
                <section className={styles.articleSection}>
                  <h2 className={styles.articleSectionTitle}>Problem & Architectural Context</h2>
                  <p className={styles.articleParagraph}>{problemStatementText}</p>
                </section>

                {/* Challenges & Decisions */}
                <section className={styles.articleSection}>
                  <h2 className={styles.articleSectionTitle}>Key Challenges & Engineering Decisions</h2>
                  <ul className={styles.articleChallengesList}>
                    {challengesList.map((challenge, idx) => (
                      <li key={idx} className={styles.articleChallengeItem}>
                        <span className={styles.bulletDot} />
                        <span className={styles.challengeText}>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Outcome & Impact */}
                <section className={styles.articleSection}>
                  <h2 className={styles.articleSectionTitle}>Outcome & Production Impact</h2>
                  <div className={styles.articleOutcomeCallout}>
                    <p className={styles.articleOutcomeText}>{outcomeText}</p>
                  </div>
                </section>

                {/* Project Milestones */}
                {selectedProject.milestones && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSectionTitle}>Development Milestones</h2>
                    <div className={styles.milestoneTimeline}>
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div key={idx} className={styles.milestoneItem}>
                          <div className={styles.milestoneHeader}>
                            <span 
                              className={styles.milestoneDot} 
                              style={{ 
                                backgroundColor: milestone.status === 'Completed' ? '#34A853' : 
                                                 milestone.status === 'In Progress' ? '#FBBC05' : '#707070' 
                              }}
                            />
                            <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                            <span 
                              className={`${styles.milestoneStatus} ${
                                milestone.status === 'Completed' ? styles.statusCompleted : 
                                milestone.status === 'In Progress' ? styles.statusInProgress : styles.statusPlanned
                              }`}
                            >
                              {milestone.status}
                            </span>
                          </div>
                          <ul className={styles.milestoneDetails}>
                            {milestone.details.map((detail, dIdx) => (
                              <li key={dIdx} className={styles.milestoneDetailItem}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Comprehensive Features */}
                {selectedProject.features && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSectionTitle}>Core Modules & Dashboard Features</h2>
                    <div className={styles.featuresGrid}>
                      {selectedProject.features.map((feature, idx) => (
                        <div key={idx} className={styles.featureCard}>
                          <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                          <ul className={styles.featureDetails}>
                            {feature.details.map((detail, dIdx) => (
                              <li key={dIdx} className={styles.featureDetailItem}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>

              {/* Right Column: Sidebar Specs */}
              <aside className={styles.sidebarCol}>
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>Technologies Used</h3>
                  <div className={styles.sidebarTechList}>
                    {selectedProject.techStack.map((tech) => (
                      <div key={tech} className={styles.sidebarTechItem}>
                        <span className={styles.sidebarTechBadge}>{tech}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.sidebarDivider} />

                  <h3 className={styles.sidebarTitle} style={{ marginTop: '1.25rem' }}>Project Specifications</h3>
                  <div className={styles.sidebarSpecList}>
                    <div className={styles.sidebarSpecRow}>
                      <span className={styles.sidebarSpecLabel}>Category</span>
                      <span className={styles.sidebarSpecValue}>{selectedProject.category}</span>
                    </div>
                    <div className={styles.sidebarSpecRow}>
                      <span className={styles.sidebarSpecLabel}>Status</span>
                      <span className={styles.sidebarSpecValue}>{statusText}</span>
                    </div>
                    <div className={styles.sidebarSpecRow}>
                      <span className={styles.sidebarSpecLabel}>Architecture</span>
                      <span className={styles.sidebarSpecValue}>Full-Stack / Distributed</span>
                    </div>
                  </div>
                </div>
              </aside>

            </div>
          </article>
        </div>
      </section>
    );
  }

  const displayedProjects = projectList.filter(p => !!p.imageUrl); // Filter out projects without images
  const skeletonCards = Array.from({ length: 6 });

  return (
    <section className={styles.section} id="featured-projects">
      <div className="container">

        <SectionHeading
          eyebrow="Technical Archive"
          title="Project Showcase"
          subtitle="A detailed archive of systems engineering, full-stack applications, and technical case studies."
          centered={true}
        />

        <div className={styles.projectsGrid}>
          {loading ? (
            skeletonCards.map((_, index) => (
              <article
                key={`project-skeleton-${index}`}
                className={`${styles.projectCard} ${styles.skeletonCard}`}
                style={{ pointerEvents: 'none' }}
              >
                <div className={`${styles.visualSide} skeleton`} style={{ height: '220px' }} />
                <div className={styles.textSide}>
                  <div className="skeleton" style={{ width: '40%', height: '24px', borderRadius: '4px' }} />
                  <div className="skeleton" style={{ width: '85%', height: '16px', borderRadius: '4px', marginTop: '0.5rem' }} />
                  <div className="skeleton" style={{ width: '60%', height: '16px', borderRadius: '4px', marginTop: '0.5rem' }} />
                </div>
              </article>
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

      </div>
    </section>
  );
}
