import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.svg', 'icon-512.svg', 'robots.txt'],
      manifest: {
        name: 'Muhammad Rashid Shafique — Portfolio',
        short_name: 'Rashid.dev',
        description: 'Systems Engineer & Full-Stack Developer. Building performant backend APIs, AI-integrated applications, and responsive React web products.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#0d0d0f',
        theme_color: '#1A73E8',
        categories: ['portfolio', 'developer', 'productivity'],
        lang: 'en-US',
        icons: [
          {
            src: '/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'View Projects',
            short_name: 'Projects',
            description: 'Browse all engineering projects',
            url: '/projects',
            icons: [{ src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
          },
          {
            name: 'Contact Me',
            short_name: 'Contact',
            description: 'Get in touch with Rashid',
            url: '/contact',
            icons: [{ src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
          },
          {
            name: 'About',
            short_name: 'About',
            description: 'Learn more about Rashid',
            url: '/about',
            icons: [{ src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
          },
        ],
      },
      workbox: {
        // Exclude PDF files from SPA navigateFallback to prevent React Router 404 intercept
        navigateFallbackDenylist: [/^\/resume\.pdf$/, /\.pdf$/],
        // Cache all pages and assets for offline-first experience
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2,pdf}'],
        // Skip the huge profile image from precache to keep service worker small
        globIgnores: ['**/profile1*.webp'],
        runtimeCaching: [
          {
            // Cache Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Network-first for GitHub API (fresh data, fall back to cache)
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 }, // 1 hour
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Stale-while-revalidate for images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      devOptions: {
        // Disable PWA in dev to prevent service worker caching from blocking live reload
        enabled: false,
        type: 'module',
      },
    }),
  ],
})
