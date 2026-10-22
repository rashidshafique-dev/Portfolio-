/**
 * utils/index.js — Pure utility functions
 */

/**
 * Clamps a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Format a date string for display
 */
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/**
 * Truncate string to a max length with ellipsis
 */
export const truncate = (str, max = 100) =>
  str.length > max ? `${str.slice(0, max).trim()}…` : str;

/**
 * Deep merge two objects
 */
export const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      key in target
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

/**
 * Debounce a function call
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Join class names, filtering out falsy values
 */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Check if we're in a browser environment
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Generate a random ID (for keys when data has none)
 */
export const uid = () => Math.random().toString(36).slice(2, 11);

/**
 * Copy text to clipboard with modern API and reliable legacy fallback
 */
export async function copyToClipboard(text) {
  if (!text) return false;
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API error, trying fallback:', err);
  }
  try {
    if (typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (err) {
    console.warn('Clipboard copy fallback failed:', err);
  }
  return false;
}

export * from './projectUtils';


