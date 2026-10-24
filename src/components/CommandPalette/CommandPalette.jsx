import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  Layers,
  Wrench,
  Briefcase,
  FileCode2,
  User,
  Mail,
  FileText,
  Sun,
  Moon,
  Copy,
  ExternalLink,
  FolderGit2,
  Check,
  Shield,
} from 'lucide-react';
import { useUIStore, useThemeStore } from '../../store';
import { personalInfo } from '../../constants/portfolioData';
import { copyToClipboard } from '../../utils';
import styles from './CommandPalette.module.css';

export default function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, setResumeModalOpen } = useUIStore();
  const { theme, toggleTheme } = useThemeStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global Keyboard Shortcut: Ctrl + K / Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Focus input and reset query on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCommandPaletteOpen]);

  // Command definitions
  const allCommands = useMemo(() => {
    const list = [
      // ── Pages ──
      {
        id: 'nav-home',
        title: 'Home',
        subtitle: 'Overview, hero, and highlighted systems',
        category: 'Navigation',
        icon: <Home size={15} />,
        keywords: ['home', 'landing', 'main', 'start'],
        perform: () => navigate('/'),
      },
      {
        id: 'nav-projects',
        title: 'Projects',
        subtitle: 'Full catalogue of full-stack & systems work',
        category: 'Navigation',
        icon: <Layers size={15} />,
        keywords: ['projects', 'work', 'portfolio', 'apps'],
        perform: () => navigate('/projects'),
      },
      {
        id: 'nav-skills',
        title: 'Skills',
        subtitle: 'Backend, systems, languages, and frameworks',
        category: 'Navigation',
        icon: <Wrench size={15} />,
        keywords: ['skills', 'tech', 'stack', 'languages', 'python', 'django', 'react'],
        perform: () => navigate('/skills'),
      },
      {
        id: 'nav-experience',
        title: 'Experience',
        subtitle: 'Employment timeline, academics, and open source',
        category: 'Navigation',
        icon: <Briefcase size={15} />,
        keywords: ['experience', 'work', 'history', 'career', 'uaf', 'education'],
        perform: () => navigate('/experience'),
      },
      {
        id: 'nav-logs',
        title: 'Build Logs',
        subtitle: 'Engineering deep-dives and system write-ups',
        category: 'Navigation',
        icon: <FileCode2 size={15} />,
        keywords: ['build logs', 'logs', 'articles', 'architecture', 'benchmarks'],
        perform: () => navigate('/build-logs'),
      },
      {
        id: 'nav-about',
        title: 'About',
        subtitle: 'Engineering background and core accreditations',
        category: 'Navigation',
        icon: <User size={15} />,
        keywords: ['about', 'bio', 'whoami', 'profile', 'story'],
        perform: () => navigate('/about'),
      },
      {
        id: 'nav-contact',
        title: 'Contact',
        subtitle: 'Send message, schedule call, or direct inquiries',
        category: 'Navigation',
        icon: <Mail size={15} />,
        keywords: ['contact', 'email', 'hire', 'message', 'reach out'],
        perform: () => navigate('/contact'),
      },

      // ── Featured Projects ──
      {
        id: 'proj-shifaa',
        title: 'Shifaa HMS',
        subtitle: 'AI Hospital Management System · Django, React, Voice AI',
        category: 'Projects',
        icon: <FolderGit2 size={15} />,
        keywords: ['shifaa', 'hms', 'hospital', 'ai', 'voice', 'whisper', 'groq', 'django', 'supabase'],
        perform: () => {
          navigate('/projects');
          window.location.hash = 'al-shifaa-clinic';
        },
      },
      {
        id: 'proj-sunrise',
        title: 'Sunrise Imperial Resort',
        subtitle: 'Hotel PMS & Guest SaaS · React 19, TypeScript, INP < 10ms',
        category: 'Projects',
        icon: <FolderGit2 size={15} />,
        keywords: ['sunrise', 'hotel', 'pms', 'resort', 'react 19', 'typescript', 'tailwind'],
        perform: () => {
          navigate('/projects');
          window.location.hash = 'sunrise-imperial-resort';
        },
      },
      {
        id: 'proj-aioverse',
        title: 'AioVerse',
        subtitle: 'Mobile Workspace & 40+ Utilities · React Native, 60 FPS',
        category: 'Projects',
        icon: <FolderGit2 size={15} />,
        keywords: ['aioverse', 'mobile', 'react native', 'expo', 'django', 'utilities'],
        perform: () => {
          navigate('/projects');
          window.location.hash = 'aioverse';
        },
      },
      {
        id: 'proj-rescue',
        title: 'Rescue Project',
        subtitle: 'Missing Person Coordination · Python, FastAPI, D-Hash',
        category: 'Projects',
        icon: <FolderGit2 size={15} />,
        keywords: ['rescue', 'fastapi', 'd-hash', 'python', 'search and rescue'],
        perform: () => {
          navigate('/projects');
          window.location.hash = 'rescue-project';
        },
      },
      {
        id: 'proj-bhutta',
        title: 'Bhutta Scents',
        subtitle: 'Luxury Fragrance Storefront · Vanilla CSS Modules',
        category: 'Projects',
        icon: <FolderGit2 size={15} />,
        keywords: ['bhutta', 'scents', 'ecommerce', 'fragrance', 'storefront'],
        perform: () => {
          navigate('/projects');
          window.location.hash = 'bhutta-scents';
        },
      },

      // ── Technical Build Logs ──
      {
        id: 'log-ai-latency',
        title: 'Sub-120ms Real-Time AI Inference Pipeline',
        subtitle: 'Optimizing OpenCV & Keras frame ingestion',
        category: 'Engineering Logs',
        icon: <FileCode2 size={15} />,
        keywords: ['ai inference', 'opencv', 'keras', 'latency', 'computer vision', 'fps'],
        perform: () => {
          navigate('/build-logs');
          window.location.hash = 'optimizing-opencv-keras-frame-pipelines-for-sub-120ms-real-time-ai-inference';
        },
      },
      {
        id: 'log-sqlite-wal',
        title: 'Preventing Race Conditions with SQLite WAL',
        subtitle: 'Atomic ACID isolation in hospital bed allocation',
        category: 'Engineering Logs',
        icon: <FileCode2 size={15} />,
        keywords: ['sqlite', 'wal', 'transactions', 'race conditions', 'concurrency', 'acid'],
        perform: () => {
          navigate('/build-logs');
          window.location.hash = 'preventing-race-conditions-in-patient-bed-allocations-with-atomic-sqlite-transactions';
        },
      },
      {
        id: 'log-canvas-60fps',
        title: 'Locked 60 FPS in D3 & React Canvas Rendering',
        subtitle: 'Bypassing Virtual DOM reconciliation in graph traversal',
        category: 'Engineering Logs',
        icon: <FileCode2 size={15} />,
        keywords: ['canvas', '60 fps', 'd3', 'virtual dom', 'dijkstra', 'algorithms'],
        perform: () => {
          navigate('/build-logs');
          window.location.hash = 'achieving-locked-60-fps-in-d3-react-graph-pathfinding-visualizations';
        },
      },
      {
        id: 'log-packet-protocol',
        title: 'Fault-Tolerant IoT Binary Packet Framing',
        subtitle: 'C++ frame packets & Python sliding-window XOR checksums',
        category: 'Engineering Logs',
        icon: <FileCode2 size={15} />,
        keywords: ['iot', 'packets', 'c++', 'checksum', 'xor', 'sliding window', 'telemetry'],
        perform: () => {
          navigate('/build-logs');
          window.location.hash = 'architecting-fault-tolerant-iot-telemetry-with-c-frame-packets-and-python-daemons';
        },
      },

      // ── Actions ──
      {
        id: 'action-resume',
        title: 'View Resume',
        subtitle: 'Open official executive document & PDF download',
        category: 'Actions',
        icon: <FileText size={15} />,
        keywords: ['resume', 'cv', 'pdf', 'credentials', 'experience'],
        perform: () => setResumeModalOpen(true),
      },
      {
        id: 'action-theme',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        subtitle: `Currently active: ${theme === 'dark' ? 'Dark' : 'Light'}`,
        category: 'Actions',
        icon: theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />,
        keywords: ['theme', 'mode', 'dark', 'light', 'color'],
        perform: () => toggleTheme(),
      },
      {
        id: 'action-copy-email',
        title: copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Email Address',
        subtitle: personalInfo.email,
        category: 'Actions',
        icon: copiedEmail ? <Check size={15} /> : <Copy size={15} />,
        keywords: ['email', 'copy email', 'mail', 'contact'],
        perform: async () => {
          await copyToClipboard(personalInfo.email);
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        },
      },
      {
        id: 'action-github',
        title: 'Open GitHub Profile',
        subtitle: 'github.com/rashidshafique-dev',
        category: 'Actions',
        icon: <ExternalLink size={15} />,
        keywords: ['github', 'code', 'repositories', 'git'],
        perform: () => window.open(personalInfo.socials.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-admin',
        title: 'Portfolio Admin Console',
        subtitle: 'Manage build logs, projects, profile, and testimonials',
        category: 'Actions',
        icon: <Shield size={15} />,
        keywords: ['admin', 'panel', 'login', 'manage', 'edit', 'dashboard', 'settings'],
        perform: () => navigate('/rashidshafique.admin'),
      },
      {
        id: 'action-linkedin',
        title: 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/rashidshafique-dev',
        category: 'Actions',
        icon: <ExternalLink size={15} />,
        keywords: ['linkedin', 'profile', 'network', 'connect'],
        perform: () => window.open(personalInfo.socials.linkedin, '_blank', 'noopener,noreferrer'),
      },
    ];

    return list;
  }, [navigate, setResumeModalOpen, theme, toggleTheme, copiedEmail]);

  // Filtered list based on search query
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;

    return allCommands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSubtitle = cmd.subtitle?.toLowerCase().includes(q);
      const matchCategory = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [allCommands, query]);

  // Keep selected index in bounds when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within results
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCommandPaletteOpen(false);
    }
  };

  const executeCommand = (cmd) => {
    setCommandPaletteOpen(false);
    cmd.perform();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setCommandPaletteOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          <motion.div
            className={styles.palette}
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Input Header ── */}
            <div className={styles.inputWrapper}>
              <Search size={16} className={styles.searchIcon} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className={styles.input}
                autoComplete="off"
                spellCheck="false"
                aria-label="Search commands, projects, and pages"
              />
              <span className={styles.escBadge} aria-hidden="true">ESC</span>
            </div>

            {/* ── Results List ── */}
            <ul ref={listRef} className={styles.resultsList} role="listbox">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const isFirstInCategory =
                    idx === 0 || cmd.category !== filteredCommands[idx - 1].category;

                  return (
                    <li key={cmd.id} role="option" aria-selected={isSelected}>
                      {isFirstInCategory && (
                        <div className={styles.groupHeader}>{cmd.category}</div>
                      )}
                      <div
                        className={`${styles.item} ${isSelected ? styles.active : ''}`}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className={styles.itemLeft}>
                          <span className={styles.itemIcon}>{cmd.icon}</span>
                          <div className={styles.itemTextGroup}>
                            <span className={styles.itemTitle}>{cmd.title}</span>
                            {cmd.subtitle && (
                              <span className={styles.itemSubtitle}>{cmd.subtitle}</span>
                            )}
                          </div>
                        </div>
                        <span className={styles.itemBadge}>{cmd.category}</span>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <span>No matching commands found</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    Try searching for "FastAPI", "React", "Resume", or "Logs"
                  </span>
                </div>
              )}
            </ul>

            {/* ── Footer Bar ── */}
            <div className={styles.footer}>
              <div className={styles.footerHints}>
                <span className={styles.footerHint}>
                  <kbd className={styles.kbd}>↑</kbd>
                  <kbd className={styles.kbd}>↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className={styles.footerHint}>
                  <kbd className={styles.kbd}>↵</kbd>
                  <span>Select</span>
                </span>
                <span className={styles.footerHint}>
                  <kbd className={styles.kbd}>esc</kbd>
                  <span>Close</span>
                </span>
              </div>
              <span style={{ opacity: 0.8 }}>
                {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
