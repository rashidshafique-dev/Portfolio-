import { useEffect } from 'react';
import { useThemeStore } from '../store';
import AppRouter from '../routes';
import { initOnlineDataSync } from '../store/adminDataStore';

export default function App() {
  const { theme } = useThemeStore();

  // Apply theme attribute to document root for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Hydrate portfolio with online data from GitHub across all browsers
  useEffect(() => {
    initOnlineDataSync();
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}
