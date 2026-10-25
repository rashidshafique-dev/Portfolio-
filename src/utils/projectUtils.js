export const repoTitleOverrides = {
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
  'ai-hms': 'Al Shifaa Clinic',
  'sunrise-hotel': 'Sunrise Imperial Resort',
  'sunrise-hotel-plum': 'Sunrise Imperial Resort',
  'sunrise_hotel': 'Sunrise Imperial Resort',
  'shadcn-dashboard-vite': 'Sunrise Imperial Resort',
  'sunrise-imperial-resort': 'Sunrise Imperial Resort',
  'aioverse': 'AioVerse',
};

export const PROJECT_CATEGORIES = ['All', 'Full-Stack', 'AI/ML', 'Open Source', 'Mobile', 'IoT'];

/**
 * Returns a URL-friendly slug for a project object.
 */
export const getProjectSlug = (project) => {
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
  if (project.title) {
    return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  return '';
};

/**
 * Formats repository or project name for display, applying overrides or title-casing.
 */
export const formatProjectTitle = (name) => {
  if (!name) return '';
  const key = name.toLowerCase().trim();
  if (repoTitleOverrides[key]) {
    return repoTitleOverrides[key];
  }
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
};

/**
 * Strips high-surrogate and standard emojis from text.
 */
export const stripEmojis = (text) => {
  if (!text) return '';
  return text
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/gu, '') // Strips high-surrogate emojis
    .replace(/[\u2600-\u27BF]/g, '')             // Strips standard symbols/emojis
    .replace(/\s+/g, ' ')                        // Normalize whitespace
    .trim();
};

/**
 * Checks if a project's category matches the given filter.
 */
export const matchesCategory = (projectCategory, filterCategory) => {
  if (!filterCategory || filterCategory.toLowerCase() === 'all') return true;
  if (!projectCategory) return false;
  const cat = projectCategory.toLowerCase();
  const filter = filterCategory.toLowerCase();
  if (filter === 'ai/ml' || filter === 'ai' || filter === 'ml') {
    return cat.includes('ai') || cat.includes('ml');
  }
  if (filter === 'full-stack' || filter === 'fullstack') {
    return cat.includes('full-stack') || cat.includes('fullstack') || cat.includes('full stack');
  }
  if (filter === 'backend') {
    return cat.includes('backend') || cat.includes('api') || cat.includes('python');
  }
  return cat.includes(filter);
};

/**
 * Generates a clean, SEO-friendly semantic image file name based on project/portfolio context.
 * e.g. "Sunrise Imperial Resort" -> "sunrise-imperial-resort-cover.webp"
 * e.g. "Rashid Shafique Portfolio" -> "rashid-shafique-portfolio-cover.webp"
 * e.g. "Profile" -> "rashid-shafique-portfolio-profile.png"
 */
export const generateSemanticImageName = (titleOrContext, originalFileName = '', defaultType = 'cover') => {
  let ext = 'webp';
  if (originalFileName && typeof originalFileName === 'string' && originalFileName.includes('.')) {
    const parts = originalFileName.split('.');
    const rawExt = parts[parts.length - 1].toLowerCase().replace(/[^a-z0-9]/g, '');
    if (rawExt) ext = rawExt;
  }
  if (ext === 'jpeg') ext = 'jpg';

  const raw = (titleOrContext || '').toLowerCase().trim();

  if (!raw || raw === 'portfolio' || raw.includes('rashid shafique portfolio') || raw.includes('profile')) {
    if (defaultType === 'profile' || defaultType === 'avatar') {
      return `rashid-shafique-portfolio-profile.${ext}`;
    }
    if (raw.includes('portfolio')) {
      return `rashid-shafique-portfolio-showcase.${ext}`;
    }
  }

  const cleanSlug = raw
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const base = cleanSlug || 'portfolio-project';
  return `${base}-${defaultType}.${ext}`;
};

