import { useState, useEffect } from 'react';
import { projects } from '../../../constants/portfolioData';
import { formatProjectTitle } from '../../../utils/projectUtils';

const CACHE_KEY = 'github_repos_raw_cache_v13';
const CACHE_TIME_KEY = 'github_repos_raw_cache_time_v13';
const ONE_HOUR = 60 * 60 * 1000;

export const mergeProjects = (rawGithubRepos, sortByFeatured = false) => {
  const mergedProjects = rawGithubRepos.map((apiProj) => {
    const matchedStatic = projects.find(
      (p) =>
        p.title.toLowerCase() === apiProj.repoName.toLowerCase() ||
        (p.githubUrl && p.githubUrl.toLowerCase().includes(apiProj.repoName.toLowerCase()))
    );
    if (matchedStatic) {
      return {
        ...apiProj,
        ...matchedStatic,
        title:
          matchedStatic.title === 'Sales-Data-Analysis-System'
            ? 'Sales Data Analysis System'
            : formatProjectTitle(matchedStatic.title),
        techStack: Array.from(
          new Set([...(matchedStatic.tech || matchedStatic.techStack || []), ...apiProj.techStack])
        ),
      };
    }
    return apiProj;
  });

  const unmatchedStatic = projects.filter(
    (staticProj) =>
      !rawGithubRepos.some(
        (apiProj) =>
          staticProj.title.toLowerCase() === apiProj.repoName.toLowerCase() ||
          (staticProj.githubUrl &&
            staticProj.githubUrl.toLowerCase().includes(apiProj.repoName.toLowerCase()))
      )
  );

  const allProjects = [...mergedProjects, ...unmatchedStatic];

  return [...allProjects].sort((a, b) => {
    if (sortByFeatured) {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
    }
    const idA = a.id !== undefined ? a.id : 999;
    const idB = b.id !== undefined ? b.id : 999;
    return idA - idB;
  });
};

const getInitialProjects = (sortByFeatured) => {
  try {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
    if (cachedData && cachedTime && Date.now() - Number(cachedTime) < ONE_HOUR) {
      const rawRepos = JSON.parse(cachedData);
      return mergeProjects(rawRepos, sortByFeatured);
    }
  } catch (e) {
    console.warn('Failed to parse projects cache on init:', e);
  }
  return [...projects].sort((a, b) => {
    if (sortByFeatured) {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
    }
    const idA = a.id !== undefined ? a.id : 999;
    const idB = b.id !== undefined ? b.id : 999;
    return idA - idB;
  });
};

export function useGithubProjects({ sortByFeatured = false } = {}) {
  const [projectList, setProjectList] = useState(() => getInitialProjects(sortByFeatured));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGithubRepos() {
      try {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && Date.now() - Number(cachedTime) < ONE_HOUR) {
          if (isMounted) setLoading(false);
          return;
        }

        if (isMounted) setLoading(true);

        const response = await fetch(
          'https://api.github.com/users/rashidshafique-dev/repos?sort=updated&per_page=30'
        );
        if (!response.ok) throw new Error('API fetch failed');
        const repos = await response.json();

        const mappedProjects = repos
          .filter(
            (repo) =>
              !repo.fork &&
              repo.name.toLowerCase() !== 'rashidshafique-dev' &&
              repo.name.toLowerCase() !== 'rashidkhan4067' &&
              repo.name.toLowerCase() !== 'portfolio-' &&
              repo.name.toLowerCase() !== 'foody-app'
          )
          .map((repo, index) => {
            let category = 'Open Source';
            let accentColor = '#7C3AED';

            const desc = (repo.description || '').toLowerCase();
            const topics = repo.topics || [];

            if (
              topics.includes('machine-learning') ||
              topics.includes('ai') ||
              desc.includes('face') ||
              desc.includes('opencv') ||
              desc.includes('predictive') ||
              desc.includes('analysis') ||
              desc.includes('ml')
            ) {
              category = 'AI / ML';
              accentColor = '#1A73E8';
            } else if (
              topics.includes('mobile') ||
              topics.includes('android') ||
              topics.includes('ios') ||
              desc.includes('mobile') ||
              desc.includes('capacitor')
            ) {
              category = 'Mobile';
              accentColor = '#FEA116';
            } else if (
              topics.includes('iot') ||
              desc.includes('iot') ||
              desc.includes('arduino') ||
              desc.includes('telemetry')
            ) {
              category = 'IoT';
              accentColor = '#00C1D4';
            } else if (
              topics.includes('fullstack') ||
              topics.includes('frontend') ||
              desc.includes('react') ||
              desc.includes('next') ||
              desc.includes('dashboard')
            ) {
              category = 'Full-Stack';
              accentColor = '#34A853';
            } else if (
              topics.includes('backend') ||
              desc.includes('api') ||
              desc.includes('backend') ||
              desc.includes('django') ||
              desc.includes('fastapi')
            ) {
              category = 'Backend';
              accentColor = '#EA4335';
            }

            const techStack = [];
            if (repo.language) techStack.push(repo.language);
            topics.slice(0, 3).forEach((t) => {
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
              description:
                repo.description ||
                'A highly performant, automated software repository deployed with modern engineering workflows.',
              techStack: techStack,
              tech: techStack,
              category: category,
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              accentColor: accentColor,
              featured: false,
            };
          });

        if (mappedProjects.length > 0 && isMounted) {
          const sortedProjects = mergeProjects(mappedProjects, sortByFeatured);
          setProjectList(sortedProjects);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(mappedProjects));
            sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
          } catch (storageErr) {
            console.warn('SessionStorage quota exceeded, skipping caching:', storageErr);
          }
        }
      } catch (error) {
        console.warn('GitHub API rate limit or error, falling back to cached static data:', error);
        if (isMounted) {
          const expiredCache = sessionStorage.getItem(CACHE_KEY);
          if (expiredCache) {
            try {
              setProjectList(mergeProjects(JSON.parse(expiredCache), sortByFeatured));
            } catch {
              setProjectList(
                [...projects].sort((a, b) => {
                  if (sortByFeatured) {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                  }
                  const idA = a.id !== undefined ? a.id : 999;
                  const idB = b.id !== undefined ? b.id : 999;
                  return idA - idB;
                })
              );
            }
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGithubRepos();

    return () => {
      isMounted = false;
    };
  }, [sortByFeatured]);

  return { projectList, loading };
}
