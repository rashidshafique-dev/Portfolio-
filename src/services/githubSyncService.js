// GitHub Repository Sync Service
// Enables persisting all portfolio changes to GitHub so they appear online across all browsers and devices.

const GITHUB_CONFIG_KEY = 'portfolio_github_sync_config_v1';
const GITHUB_PAT_KEY = 'portfolio_github_pat_v1';
const LAST_SYNC_KEY = 'portfolio_github_last_sync_v1';

import {
  getNetworkStatus,
  markPendingOfflinePush,
  clearPendingOfflinePush,
} from './networkStatusService';

export const DEFAULT_GITHUB_CONFIG = {
  owner: 'rashidshafique-dev',
  repo: 'Portfolio-',
  branch: 'main',
  path: 'public/data/portfolio-data.json',
  autoSync: false,
};

export const getGitHubConfig = () => {
  if (typeof window === 'undefined') return DEFAULT_GITHUB_CONFIG;
  try {
    const raw = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (raw) {
      return { ...DEFAULT_GITHUB_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Error reading GitHub sync config:', err);
  }
  return DEFAULT_GITHUB_CONFIG;
};

export const saveGitHubConfig = (cfg) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(cfg));
};

export const getGitHubToken = () => {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(GITHUB_PAT_KEY);
  if (stored && stored.trim()) return stored.trim();

  // Check Vite environment variable (from .env.local) if available
  const envToken = import.meta.env?.VITE_GITHUB_TOKEN;
  if (envToken && envToken.trim()) {
    try {
      localStorage.setItem(GITHUB_PAT_KEY, envToken.trim());
    } catch {
      // ignore
    }
    return envToken.trim();
  }

  return '';
};

export const saveGitHubToken = (token) => {
  if (typeof window === 'undefined') return;
  if (!token) {
    localStorage.removeItem(GITHUB_PAT_KEY);
  } else {
    localStorage.setItem(GITHUB_PAT_KEY, token.trim());
  }
};

export const getLastSyncInfo = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_SYNC_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
};

export const setLastSyncInfo = (info) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_SYNC_KEY, JSON.stringify(info));
};

// Safe UTF-8 to Base64 (supporting emojis and international characters)
function utf8ToBase64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1);
    })
  );
}

// Safe Base64 to UTF-8
function base64ToUtf8(str) {
  try {
    const clean = str.replace(/\s/g, '');
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return decodeURIComponent(escape(atob(str.replace(/\s/g, ''))));
  }
}

// Test GitHub token and connection
export const testGitHubConnection = async (tokenOverride) => {
  const token = tokenOverride || getGitHubToken();
  if (!token) {
    return { success: false, message: 'No GitHub Personal Access Token provided.' };
  }

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.status === 200) {
      const user = await res.json();
      return {
        success: true,
        user: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url,
        message: `Successfully connected as @${user.login}`,
      };
    } else if (res.status === 401) {
      return { success: false, message: 'Invalid GitHub Token. Please check token permissions.' };
    } else {
      return { success: false, message: `GitHub API error: HTTP ${res.status}` };
    }
  } catch (err) {
    return { success: false, message: `Network error connecting to GitHub: ${err.message}` };
  }
};

// Fetch latest online data from GitHub repository or raw content
// Priority 1: GitHub REST API (0-second caching, direct Git tree)
// Priority 2: raw.githubusercontent.com (Fastly CDN with cache-busting headers)
// Priority 3: Local bundle fallback
export const fetchOnlinePortfolioData = async () => {
  const config = getGitHubConfig();
  const token = getGitHubToken();

  // 1. Direct GitHub REST API (Zero-second cache, bypasses Fastly 300s TTL)
  try {
    const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}&_cb=${Date.now()}`;
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(apiUrl, { headers, cache: 'no-store' });
    if (res.ok) {
      const fileData = await res.json();
      if (fileData && fileData.content) {
        const decodedStr = base64ToUtf8(fileData.content);
        const data = JSON.parse(decodedStr);
        if (data && (data.projects || data.buildLogs || data.personalInfo)) {
          return {
            data,
            source: 'github_api_realtime',
            commitSha: fileData.sha ? fileData.sha.slice(0, 7) : 'latest',
            isInstant: true,
          };
        }
      }
    }
  } catch {
    // API rate-limit or network fallback
  }

  // 2. Try raw.githubusercontent.com with strong cache-busting query & headers
  try {
    const rawUrl = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${config.path}?_cb=${Date.now()}&_nonce=${Math.random().toString(36).slice(2, 8)}`;
    const res = await fetch(rawUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.projects || data.buildLogs || data.personalInfo)) {
        return { data, source: 'github_raw', commitSha: 'latest' };
      }
    }
  } catch {
    // fallback
  }

  // 3. Try local served file (/data/portfolio-data.json)
  try {
    const localUrl = `/data/portfolio-data.json?_cb=${Date.now()}`;
    const res = await fetch(localUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.projects || data.buildLogs || data.personalInfo)) {
        return { data, source: 'local_bundle', commitSha: 'local' };
      }
    }
  } catch {
    // fallback
  }

  return null;
};

export const pushPortfolioDataToGitHub = async (snapshotData, customMessage) => {
  const token = getGitHubToken();
  if (!token) {
    return { success: false, message: 'GitHub token not configured. Please save your Personal Access Token in the Cloud Sync settings.' };
  }

  // Inspect internet situation before initiating network payload
  const net = getNetworkStatus();
  if (net.isOffline || (typeof navigator !== 'undefined' && !navigator.onLine)) {
    markPendingOfflinePush();
    return {
      success: false,
      isOffline: true,
      message: 'No internet connection detected. Changes are saved locally and queued for auto-push once reconnected.',
    };
  }

  const config = getGitHubConfig();
  const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`;

  try {
    // 1. Check existing file to obtain current SHA
    let existingSha = null;
    try {
      const checkRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (checkRes.ok) {
        const fileInfo = await checkRes.json();
        existingSha = fileInfo.sha;
      }
    } catch {
      // file might not exist yet, which is fine
    }

    // 2. Prepare payload
    const jsonString = JSON.stringify(snapshotData, null, 2);
    const contentBase64 = utf8ToBase64(jsonString);

    const bodyPayload = {
      message: customMessage || `chore: update portfolio content via admin console [skip ci]`,
      content: contentBase64,
      branch: config.branch,
    };

    if (existingSha) {
      bodyPayload.sha = existingSha;
    }

    // 3. Send PUT request to create or update file
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    if (putRes.ok || putRes.status === 201 || putRes.status === 200) {
      const resData = await putRes.json();
      const syncInfo = {
        timestamp: new Date().toISOString(),
        commitSha: resData.commit?.sha?.slice(0, 7) || 'latest',
        commitUrl: resData.commit?.html_url || '',
      };
      setLastSyncInfo(syncInfo);
      clearPendingOfflinePush();

      // Instantly track active commit version in local storage
      try {
        localStorage.setItem('portfolio_active_version_sha', syncInfo.commitSha);
      } catch {
        // ignore
      }

      return {
        success: true,
        message: `Successfully pushed to GitHub! Commit: ${syncInfo.commitSha}`,
        syncInfo,
      };
    } else {
      const errorJson = await putRes.json().catch(() => ({}));
      return {
        success: false,
        message: errorJson.message || `GitHub error: HTTP ${putRes.status}`,
      };
    }
  } catch (err) {
    markPendingOfflinePush();
    const isOfflineErr = !navigator.onLine || err.message?.toLowerCase().includes('network') || err.message?.toLowerCase().includes('fetch');
    return {
      success: false,
      isOffline: isOfflineErr,
      message: isOfflineErr
        ? 'Network disconnected during sync. Changes saved locally and queued for auto-push.'
        : `Failed to push to GitHub: ${err.message}`,
    };
  }
};
