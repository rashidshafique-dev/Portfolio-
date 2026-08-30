import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Menu, X, Code2,
  Home, User2, FolderGit2, Sparkles, Briefcase, Mail, FileText, BookOpen
} from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../../components/SocialIcons';
import { useThemeStore, useUIStore } from '../../store';
import { navLinks, personalInfo } from '../../constants/portfolioData';
import styles from './Navbar.module.css';

// Map nav paths to clean icons
const iconMap = {
  '/': Home,
  '/about': User2,
  '/projects': FolderGit2,
  '/skills': Sparkles,
  '/experience': Briefcase,
  '/contact': Mail,
  '/build-logs': BookOpen
};

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scrolled navbar consistency on scroll and route changes
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location, setMobileMenuOpen]);

  const handleMobileNav = (href) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo} aria-label="Home">
          <span className={styles.logoIcon}>
            <Code2 size={18} aria-hidden="true" />
          </span>
          <span className={styles.logoText}>
            Rashid<span className={styles.logoDot}>.dev</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className={styles.links} role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                end={link.href === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a
            href={personalInfo.resumeUrl}
            className={styles.resumeBtn}
            target="_blank"
            rel="noopener noreferrer"
            download="Muhammad_Rashid_Resume.pdf"
            aria-label="Download Resume"
          >
            Resume
          </a>

          {/* Hamburger */}
          <button
            className={styles.menuBtn}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-In Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileBrand}>
                <span className={styles.mobileBrandIcon}>
                  <Code2 size={18} aria-hidden="true" />
                </span>
                <div className={styles.mobileBrandText}>
                  <span className={styles.mobileBrandName}>Rashid<span className={styles.logoDot}>.dev</span></span>
                  <span className={styles.mobileBrandSub}>Software Engineer</span>
                </div>
              </div>
              <button
                className={styles.menuCloseBtn}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            
            <ul role="list" className={styles.mobileNavList}>
              {navLinks.map((link, i) => {
                const isCurrent = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 + i * 0.02, duration: 0.18 }}
                  >
                    <button
                      type="button"
                      className={`${styles.mobileLink} ${isCurrent ? styles.mobileLinkActive : ''}`}
                      onClick={() => handleMobileNav(link.href)}
                    >
                      <span>{link.label}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
            
            <div className={styles.mobileActions}>
              <a
                href={personalInfo.resumeUrl}
                className={styles.mobileResume}
                target="_blank"
                rel="noopener noreferrer"
                download="Muhammad_Rashid_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={15} className={styles.mobileResumeBtnIcon} />
                <span>Download Resume</span>
              </a>
              
              <div className={styles.mobileSocials}>
                <a 
                  href={personalInfo.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub"
                  className={styles.mobileSocialBtn}
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>
                <a 
                  href={personalInfo.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className={styles.mobileSocialBtn}
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
