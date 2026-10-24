import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FileCode2,
  FolderGit2,
  User,
  MessageSquareQuote,
  ShieldCheck,
  LogOut,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import {
  isUserAdminAuthenticated,
  logoutAdmin,
  getStoredBuildLogs,
  getStoredProjects,
  getStoredProfile,
  getStoredTestimonials,
} from '../store/adminDataStore';
import AdminAuth from '../features/admin/components/AdminAuth';
import BuildLogsManager from '../features/admin/components/BuildLogsManager';
import ProjectsManager from '../features/admin/components/ProjectsManager';
import ProfileManager from '../features/admin/components/ProfileManager';
import TestimonialsManager from '../features/admin/components/TestimonialsManager';
import ExportSyncCenter from '../features/admin/components/ExportSyncCenter';
import styles from '../features/admin/styles.module.css';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isUserAdminAuthenticated());
  const [activeTab, setActiveTab] = useState('build-logs');
  const [toastMessage, setToastMessage] = useState('');

  // Local data state
  const [buildLogs, setBuildLogs] = useState(() => getStoredBuildLogs());
  const [projects, setProjects] = useState(() => getStoredProjects());
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [testimonials, setTestimonials] = useState(() => getStoredTestimonials());

  // Listen for background updates
  useEffect(() => {
    const handleSync = () => {
      setBuildLogs(getStoredBuildLogs());
      setProjects(getStoredProjects());
      setProfile(getStoredProfile());
      setTestimonials(getStoredTestimonials());
    };

    window.addEventListener('portfolio_data_updated', handleSync);
    return () => window.removeEventListener('portfolio_data_updated', handleSync);
  }, []);

  // Inactivity Auto-Lockout Guard (15 minutes of inactivity)
  useEffect(() => {
    if (!isAuthenticated) return;

    const IDLE_LIMIT_MS = 15 * 60 * 1000;
    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        logoutAdmin();
        setIsAuthenticated(false);
      }, IDLE_LIMIT_MS);
    };

    const userActivityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    userActivityEvents.forEach((evt) => {
      window.addEventListener(evt, resetIdleTimer, { passive: true });
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      userActivityEvents.forEach((evt) => {
        window.removeEventListener(evt, resetIdleTimer);
      });
    };
  }, [isAuthenticated]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleDataReset = (freshData) => {
    setBuildLogs(freshData.logs);
    setProjects(freshData.projects);
    setProfile(freshData.profile);
    setTestimonials(freshData.testimonials);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Authentication | Rashid Shafique Portfolio</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Portfolio Admin Console | Rashid Shafique</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container">
        {/* Header Bar */}
        <header className={styles.dashboardHeader}>
          <div className={styles.headerTitleGroup}>
            <h1 className={styles.consoleTitle}>Portfolio Console</h1>
            <span className={styles.adminBadge}>Active Session</span>
          </div>

          <div className={styles.headerActionRow}>
            <Link to="/" className={styles.secondaryBtn}>
              <ExternalLink size={14} aria-hidden="true" />
              <span>Live Site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.secondaryBtn}
              title="End session"
            >
              <LogOut size={14} aria-hidden="true" />
              <span>Lock Console</span>
            </button>
          </div>
        </header>

        {/* Overview Metrics Strip */}
        <section className={styles.statsStrip} aria-label="Portfolio metrics overview">
          <div className={styles.statCard}>
            <span className={styles.statValue}>{buildLogs.length}</span>
            <span className={styles.statLabel}>Build Logs</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{projects.length}</span>
            <span className={styles.statLabel}>Total Projects</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{testimonials.length}</span>
            <span className={styles.statLabel}>Testimonials</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue} style={{ color: 'var(--md-primary)' }}>
              Local-First
            </span>
            <span className={styles.statLabel}>Storage Mode</span>
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className={styles.tabNav} aria-label="Admin console navigation">
          <button
            type="button"
            onClick={() => setActiveTab('build-logs')}
            className={`${styles.tabBtn} ${activeTab === 'build-logs' ? styles.activeTab : ''}`}
          >
            <FileCode2 size={15} aria-hidden="true" />
            <span>Build Logs</span>
            <span className={styles.tabCount}>{buildLogs.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.activeTab : ''}`}
          >
            <FolderGit2 size={15} aria-hidden="true" />
            <span>Projects</span>
            <span className={styles.tabCount}>{projects.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          >
            <User size={15} aria-hidden="true" />
            <span>Profile &amp; Contact</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`${styles.tabBtn} ${activeTab === 'testimonials' ? styles.activeTab : ''}`}
          >
            <MessageSquareQuote size={15} aria-hidden="true" />
            <span>Testimonials</span>
            <span className={styles.tabCount}>{testimonials.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`${styles.tabBtn} ${activeTab === 'security' ? styles.activeTab : ''}`}
          >
            <ShieldCheck size={15} aria-hidden="true" />
            <span>Security &amp; Export</span>
          </button>
        </nav>

        {/* Tab Panel Content */}
        <main>
          {activeTab === 'build-logs' && (
            <BuildLogsManager
              logs={buildLogs}
              onLogsUpdated={setBuildLogs}
              showToast={showToast}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsManager
              projects={projects}
              onProjectsUpdated={setProjects}
              showToast={showToast}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileManager
              profile={profile}
              onProfileUpdated={setProfile}
              showToast={showToast}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager
              testimonials={testimonials}
              onTestimonialsUpdated={setTestimonials}
              showToast={showToast}
            />
          )}

          {activeTab === 'security' && (
            <ExportSyncCenter
              onDataReset={handleDataReset}
              showToast={showToast}
              onLockConsole={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <aside className={styles.toast} role="status" aria-live="polite">
          <CheckCircle2 size={16} style={{ color: '#4ade80' }} aria-hidden="true" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}
