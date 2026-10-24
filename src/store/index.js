import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Theme Store (persisted to localStorage) ──
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'portfolio-theme',
    }
  )
);

// ── UI Store ──
export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  activeSection: 'home',
  isPageLoading: true,
  isResumeModalOpen: false,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
  setPageLoading: (loading) => set({ isPageLoading: loading }),
  setResumeModalOpen: (open) => set({ isResumeModalOpen: open }),
}));

// ── Project Filter Store ──
export const useProjectStore = create((set) => ({
  activeFilter: 'All',
  setFilter: (filter) => set({ activeFilter: filter }),
}));
