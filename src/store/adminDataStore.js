import {
  buildLogs as defaultBuildLogs,
  projects as defaultProjects,
  personalInfo as defaultPersonalInfo,
  testimonials as defaultTestimonials,
} from '../constants/portfolioData';
import {
  fetchOnlinePortfolioData,
  pushPortfolioDataToGitHub,
  getGitHubConfig,
  getGitHubToken,
} from '../services/githubSyncService';
import { generateSemanticImageName } from '../utils/projectUtils';

const STORAGE_KEYS = {
  BUILD_LOGS: 'portfolio_admin_build_logs_v1',
  PROJECTS: 'portfolio_admin_projects_v1',
  PROFILE: 'portfolio_admin_profile_v1',
  TESTIMONIALS: 'user_testimonials',
  ADMIN_PIN_HASH: 'portfolio_admin_pin_hash_v2',
  AUTH_SESSION: 'portfolio_admin_session_auth_v1',
  SESSION_ACTIVE_AT: 'portfolio_admin_session_active_at_v2',
  FAILED_ATTEMPTS: 'portfolio_admin_failed_attempts_v2',
  LOCKOUT_UNTIL: 'portfolio_admin_lockout_until_v2',
  LAST_LOGIN: 'portfolio_admin_last_login_v2',
};

const DEFAULT_PIN = '4067';
const PIN_SALT = 'rs_portfolio_admin_salt_v2_secure';
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// ── Web Crypto SHA-256 Hashing ──
export const hashPin = async (pin) => {
  if (!pin) return '';
  const text = `${PIN_SALT}::${pin.trim()}`;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (err) {
      console.warn('Web Crypto digest failed, using fallback:', err);
    }
  }
  // Lightweight fallback if Web Crypto is unavailable
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `sha256_fallback_${Math.abs(hash).toString(16)}`;
};

// ── Rate Limiting & Lockout Status ──
export const getLockoutStatus = () => {
  if (typeof window === 'undefined') {
    return { isLocked: false, remainingAttempts: MAX_FAILED_ATTEMPTS, remainingMs: 0 };
  }

  const lockoutUntil = parseInt(localStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL) || '0', 10);
  const now = Date.now();

  if (lockoutUntil > now) {
    const remainingMs = lockoutUntil - now;
    return {
      isLocked: true,
      remainingMs,
      remainingAttempts: 0,
      lockoutUntil,
    };
  }

  // If lockout has elapsed, automatically clear lockout record
  if (lockoutUntil > 0) {
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    localStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
  }

  const failedAttempts = parseInt(localStorage.getItem(STORAGE_KEYS.FAILED_ATTEMPTS) || '0', 10);
  return {
    isLocked: false,
    remainingMs: 0,
    remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - failedAttempts),
    failedAttempts,
  };
};

// ── Authentication Helpers ──
export const isUserAdminAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
};

export const verifyAdminPin = async (enteredPin) => {
  if (typeof window === 'undefined') return { success: false, message: 'Window not available' };

  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    const minutes = Math.ceil(lockout.remainingMs / 60000);
    return {
      success: false,
      locked: true,
      remainingMs: lockout.remainingMs,
      message: `Console locked due to excessive failed attempts. Please retry in ${minutes} minute(s).`,
    };
  }

  if (!enteredPin || !enteredPin.trim()) {
    return {
      success: false,
      locked: false,
      message: 'Please enter your admin security PIN.',
    };
  }

  const cleanPin = enteredPin.trim();
  const enteredHash = await hashPin(cleanPin);
  const storedHash = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN_HASH);
  const legacyPin = localStorage.getItem('portfolio_admin_pin_v1');

  let isValid = false;

  if (storedHash) {
    isValid = enteredHash === storedHash;
  } else if (legacyPin) {
    if (cleanPin === legacyPin) {
      isValid = true;
      // Transparently migrate plaintext PIN to cryptographic SHA-256 hash
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN_HASH, enteredHash);
      localStorage.removeItem('portfolio_admin_pin_v1');
    }
  } else {
    // Initial default PIN check
    const defaultHash = await hashPin(DEFAULT_PIN);
    isValid = enteredHash === defaultHash;
    if (isValid) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN_HASH, defaultHash);
    }
  }

  if (isValid) {
    // Reset rate-limiting state
    localStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    localStorage.removeItem('admin_moderator');

    // Telemetry & active session
    const loginTime = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.LAST_LOGIN, loginTime);
    sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ACTIVE_AT, Date.now().toString());

    return { success: true };
  } else {
    // Increment failed attempts
    const prevAttempts = parseInt(localStorage.getItem(STORAGE_KEYS.FAILED_ATTEMPTS) || '0', 10);
    const newAttempts = prevAttempts + 1;
    localStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, newAttempts.toString());

    if (newAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockoutEnd = Date.now() + LOCKOUT_DURATION_MS;
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, lockoutEnd.toString());
      return {
        success: false,
        locked: true,
        remainingMs: LOCKOUT_DURATION_MS,
        remainingAttempts: 0,
        message: 'Security lockout triggered: 5 failed attempts. Console locked for 15 minutes.',
      };
    }

    const remaining = MAX_FAILED_ATTEMPTS - newAttempts;
    return {
      success: false,
      locked: false,
      remainingAttempts: remaining,
      message: `Invalid PIN. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining before 15-minute security lockout.`,
    };
  }
};

export const logoutAdmin = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  sessionStorage.removeItem(STORAGE_KEYS.SESSION_ACTIVE_AT);
  localStorage.removeItem('admin_moderator');
};

export const changeAdminPin = async (currentPin, newPin) => {
  if (typeof window === 'undefined') return { success: false, message: 'Window not available' };

  if (!currentPin || !currentPin.trim()) {
    return { success: false, message: 'Please provide your current security PIN.' };
  }
  if (!newPin || newPin.trim().length < 4 || newPin.trim().length > 12) {
    return { success: false, message: 'New PIN must be between 4 and 12 characters.' };
  }
  if (currentPin.trim() === newPin.trim()) {
    return { success: false, message: 'New PIN must be different from current PIN.' };
  }

  // Verify current PIN cryptographically
  const currentEnteredHash = await hashPin(currentPin.trim());
  const storedHash = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN_HASH);
  const legacyPin = localStorage.getItem('portfolio_admin_pin_v1');

  let currentValid = false;
  if (storedHash) {
    currentValid = currentEnteredHash === storedHash;
  } else if (legacyPin) {
    currentValid = currentPin.trim() === legacyPin;
  } else {
    const defaultHash = await hashPin(DEFAULT_PIN);
    currentValid = currentEnteredHash === defaultHash;
  }

  if (!currentValid) {
    return { success: false, message: 'Current security PIN is incorrect.' };
  }

  // Store new SHA-256 hash and remove legacy plaintext
  const newHash = await hashPin(newPin.trim());
  localStorage.setItem(STORAGE_KEYS.ADMIN_PIN_HASH, newHash);
  localStorage.removeItem('portfolio_admin_pin_v1');

  return { success: true, message: 'Admin security PIN successfully updated and encrypted.' };
};

export const getSecurityTelemetry = () => {
  if (typeof window === 'undefined') return null;
  const lockout = getLockoutStatus();
  const lastLogin = localStorage.getItem(STORAGE_KEYS.LAST_LOGIN);
  const failedAttempts = parseInt(localStorage.getItem(STORAGE_KEYS.FAILED_ATTEMPTS) || '0', 10);
  const hasHashedPin = Boolean(localStorage.getItem(STORAGE_KEYS.ADMIN_PIN_HASH));

  return {
    algorithm: 'SHA-256 + Salt (Web Crypto)',
    maxAttempts: MAX_FAILED_ATTEMPTS,
    lockoutDurationMinutes: 15,
    idleTimeoutMinutes: 15,
    isHashed: hasHashedPin || true,
    lastLogin: lastLogin
      ? new Date(lastLogin).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Initial Active Session',
    failedAttempts: lockout.isLocked ? MAX_FAILED_ATTEMPTS : failedAttempts,
    isLocked: lockout.isLocked,
    remainingLockoutMs: lockout.remainingMs,
  };
};

export const resetLockoutTelemetry = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
  localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
};

// ── Build Logs Store ──
export const getStoredBuildLogs = () => {
  if (typeof window === 'undefined') return defaultBuildLogs;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BUILD_LOGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Error reading admin build logs:', err);
  }
  return defaultBuildLogs;
};

export const saveBuildLog = (logData) => {
  const current = getStoredBuildLogs();
  let updated;

  if (logData.id) {
    // Update existing
    updated = current.map((item) => (item.id === logData.id ? { ...item, ...logData } : item));
  } else {
    // Create new
    const maxId = current.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    const newId = maxId + 1;
    const newLog = {
      ...logData,
      id: newId,
      date: logData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      tags: Array.isArray(logData.tags) ? logData.tags : (logData.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    };
    updated = [newLog, ...current];
  }

  localStorage.setItem(STORAGE_KEYS.BUILD_LOGS, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
  return updated;
};

export const deleteBuildLog = (logId) => {
  const current = getStoredBuildLogs();
  const updated = current.filter((item) => item.id !== logId);
  localStorage.setItem(STORAGE_KEYS.BUILD_LOGS, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
  return updated;
};

// Fast lookup maps for bundled Vite default assets
const defaultProjectImageById = new Map();
const defaultProjectImageByTitle = new Map();

(defaultProjects || []).forEach((p) => {
  if (p.id != null && p.imageUrl) {
    defaultProjectImageById.set(Number(p.id), p.imageUrl);
  }
  if (p.title && p.imageUrl) {
    defaultProjectImageByTitle.set(p.title.toLowerCase().trim(), p.imageUrl);
  }
});

/**
 * Resolves project image to ensure it is always a valid, loadable URL:
 * - Keeps base64 data URLs (uploaded screenshots)
 * - Keeps external web URLs (https:// / http://)
 * - Keeps blob URLs
 * - Resolves unbundled '/src/assets/...' or broken paths to the bundled Vite asset URL
 *   via ID and title mapping against defaultProjects.
 */
export const resolveProjectImage = (project) => {
  if (!project) return '';

  const rawUrl = typeof project === 'string' ? project : project.imageUrl;

  // 1. Data URLs (uploaded images) or blob URLs
  if (rawUrl && (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:'))) {
    return rawUrl;
  }

  // 2. External web URLs
  if (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))) {
    return rawUrl;
  }

  // 3. Already compiled Vite asset path (starts with /assets/ or /@fs/ or has ?import)
  if (rawUrl && !rawUrl.startsWith('/src/assets/') && (rawUrl.startsWith('/assets/') || rawUrl.includes('?import'))) {
    return rawUrl;
  }

  // 4. Look up from default project map by ID or Title
  if (typeof project === 'object') {
    if (project.id != null && defaultProjectImageById.has(Number(project.id))) {
      return defaultProjectImageById.get(Number(project.id));
    }
    if (project.title && defaultProjectImageByTitle.has(project.title.toLowerCase().trim())) {
      return defaultProjectImageByTitle.get(project.title.toLowerCase().trim());
    }
  }

  // 5. Look up by rawUrl matching keywords in default project assets
  if (rawUrl && typeof rawUrl === 'string') {
    const lower = rawUrl.toLowerCase();
    for (const def of defaultProjects) {
      if (!def.imageUrl) continue;
      const key = (def.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (key && lower.includes(key.slice(0, 6))) {
        return def.imageUrl;
      }
    }
  }

  // 6. Look up in screenshots if available
  if (typeof project === 'object' && Array.isArray(project.screenshots) && project.screenshots.length > 0) {
    const firstShot = project.screenshots[0]?.url;
    if (firstShot && firstShot !== rawUrl) {
      return resolveProjectImage({ ...project, imageUrl: firstShot, screenshots: [] });
    }
  }

  return rawUrl || '';
};

// ── Projects Store ──
export const getStoredProjects = () => {
  if (typeof window === 'undefined') return defaultProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p) => ({
          ...p,
          imageUrl: resolveProjectImage(p),
          imageName: p.imageName || generateSemanticImageName(p.title, p.imageUrl, 'cover'),
        }));
      }
    }
  } catch (err) {
    console.warn('Error reading admin projects:', err);
  }
  return defaultProjects.map((p) => ({
    ...p,
    imageUrl: resolveProjectImage(p),
    imageName: p.imageName || generateSemanticImageName(p.title, p.imageUrl, 'cover'),
  }));
};

export const saveProject = (projData) => {
  const current = getStoredProjects();
  let updated;

  const techArray = Array.isArray(projData.techStack)
    ? projData.techStack
    : (projData.techStack || '').split(',').map(t => t.trim()).filter(Boolean);

  const resolvedImg = projData.imageUrl && projData.imageUrl.startsWith('data:')
    ? projData.imageUrl
    : resolveProjectImage(projData);

  const semanticName = projData.imageName || generateSemanticImageName(projData.title, projData.imageUrl, 'cover');

  if (projData.id) {
    // Update existing
    updated = current.map((item) =>
      item.id === projData.id
        ? {
            ...item,
            ...projData,
            techStack: techArray,
            tech: techArray,
            imageUrl: resolvedImg,
            imageName: semanticName,
          }
        : item
    );
  } else {
    // Create new
    const maxId = current.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    const newId = maxId + 1;
    const newProj = {
      ...projData,
      id: newId,
      featured: Boolean(projData.featured),
      techStack: techArray,
      tech: techArray,
      imageUrl: resolvedImg,
      imageName: semanticName,
    };
    updated = [newProj, ...current];
  }

  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
  return updated;
};

export const deleteProject = (projId) => {
  const current = getStoredProjects();
  const updated = current.filter((item) => item.id !== projId);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
  return updated;
};


// ── Profile / Personal Info Store ──
export const getStoredProfile = () => {
  if (typeof window === 'undefined') return defaultPersonalInfo;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Auto-purge legacy multi-megabyte base64 avatar to prevent main thread freeze
      if (parsed.avatarUrl && parsed.avatarUrl.length > 250000) {
        parsed.avatarUrl = defaultPersonalInfo.avatarUrl;
        try {
          localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed));
        } catch (e) {
          // ignore
        }
      }
      return { ...defaultPersonalInfo, ...parsed };
    }
  } catch (err) {
    console.warn('Error reading admin profile:', err);
  }
  return defaultPersonalInfo;
};

export const saveProfile = (updatedProfile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
  return updatedProfile;
};

// ── Testimonials Store ──
export const getStoredTestimonials = () => {
  if (typeof window === 'undefined') return defaultTestimonials;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      const customList = Array.isArray(parsed) ? parsed.map(p => ({ ...p, isCustom: true })) : [];
      return [...defaultTestimonials, ...customList];
    }
  } catch (err) {
    console.warn('Error reading testimonials:', err);
  }
  return defaultTestimonials;
};

export const deleteStoredTestimonial = (testimonialId) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      const filtered = parsed.filter(item => item.id !== testimonialId);
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(filtered));
    }
  } catch (err) {
    console.warn('Error deleting testimonial:', err);
  }
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
};

// ── Online Sync & Cloud Snapshot Helpers ──
export const getFullPortfolioSnapshot = () => {
  return {
    personalInfo: getStoredProfile(),
    projects: getStoredProjects(),
    buildLogs: getStoredBuildLogs(),
    testimonials: getStoredTestimonials(),
    version: '2.0.0',
    updatedAt: new Date().toISOString(),
  };
};

export const triggerAutoPushIfEnabled = () => {
  if (typeof window === 'undefined') return;
  const token = getGitHubToken();
  const config = getGitHubConfig();
  if (token && config.autoSync) {
    const snapshot = getFullPortfolioSnapshot();
    pushPortfolioDataToGitHub(snapshot)
      .then((result) => {
        window.dispatchEvent(new CustomEvent('portfolio_cloud_sync_status', { detail: result }));
      })
      .catch((err) => {
        window.dispatchEvent(
          new CustomEvent('portfolio_cloud_sync_status', {
            detail: { success: false, message: err.message || 'Auto-sync failed' },
          })
        );
      });
  }
};

let isSyncingOnline = false;
let hasInitializedOnline = false;

// Hydrates store with online data from GitHub across all browsers and devices
export const initOnlineDataSync = async () => {
  if (typeof window === 'undefined' || isSyncingOnline || hasInitializedOnline) return;
  isSyncingOnline = true;

  try {
    const result = await fetchOnlinePortfolioData();
    if (result && result.data) {
      const { data } = result;

      let changed = false;
      if (data.buildLogs && Array.isArray(data.buildLogs) && data.buildLogs.length > 0) {
        localStorage.setItem(STORAGE_KEYS.BUILD_LOGS, JSON.stringify(data.buildLogs));
        changed = true;
      }
      if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
        changed = true;
      }
      if (data.personalInfo && typeof data.personalInfo === 'object') {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.personalInfo));
        changed = true;
      }
      if (data.testimonials && Array.isArray(data.testimonials)) {
        const customOnly = data.testimonials.filter((t) => t.isCustom);
        if (customOnly.length > 0) {
          localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(customOnly));
          changed = true;
        }
      }

      if (changed) {
        window.dispatchEvent(new Event('portfolio_data_updated'));
      }
    }
  } catch (err) {
    console.warn('Online sync failed, relying on local cache:', err);
  } finally {
    isSyncingOnline = false;
    hasInitializedOnline = true;
  }
};

// ── Reset to Defaults ──
export const resetPortfolioToDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.BUILD_LOGS);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
  window.dispatchEvent(new Event('portfolio_data_updated'));
  triggerAutoPushIfEnabled();
};

// ── Export Formatter ──
export const generatePortfolioExportCode = () => {
  const profile = getStoredProfile();
  const logs = getStoredBuildLogs();
  const projs = getStoredProjects();
  const testimonials = getStoredTestimonials();

  return {
    json: JSON.stringify({ personalInfo: profile, projects: projs, buildLogs: logs, testimonials }, null, 2),
    timestamp: new Date().toISOString(),
  };
};
