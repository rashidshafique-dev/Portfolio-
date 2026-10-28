import { Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ResumeModal from '../../components/ResumeModal/ResumeModal';
import CommandPalette from '../../components/CommandPalette/CommandPalette';
import { recordPageView } from '../../services/analyticsService';

import PageLoader from '../../components/PageLoader';
import styles from './MainLayout.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  // Scroll to top and record pageview telemetry on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!pathname.startsWith('/rashidshafique.admin')) {
      recordPageView(pathname);
    }
  }, [pathname]);

  // Isolate admin console from public website Navbar, Footer, and Modals
  if (pathname.startsWith('/rashidshafique.admin')) {
    return (
      <main id="main-content" style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
    );
  }

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main} id="main-content">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <ResumeModal />
      <CommandPalette />
    </div>
  );
}
