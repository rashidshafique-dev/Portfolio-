import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import NotFoundPage from '../pages/NotFoundPage';

// ── Lazy-loaded pages for code splitting ──
const HomePage       = lazy(() => import('../pages/HomePage'));
const AboutPage      = lazy(() => import('../pages/AboutPage'));
const ProjectsPage   = lazy(() => import('../pages/ProjectsPage'));
const SkillsPage     = lazy(() => import('../pages/SkillsPage'));
const ExperiencePage = lazy(() => import('../pages/ExperiencePage'));
const ContactPage    = lazy(() => import('../pages/ContactPage'));
const BuildLogsPage  = lazy(() => import('../pages/BuildLogsPage'));
const AdminPage      = lazy(() => import('../pages/AdminPage'));

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/"           element={<HomePage />}       />
        <Route path="/about"      element={<AboutPage />}      />
        <Route path="/projects"   element={<ProjectsPage />}   />
        <Route path="/skills"     element={<SkillsPage />}     />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact"    element={<ContactPage />}    />
        <Route path="/build-logs"           element={<BuildLogsPage />}  />
        <Route path="/rashidshafique.admin" element={<AdminPage />}      />
        <Route path="*"                     element={<NotFoundPage />}   />
      </Routes>
    </MainLayout>
  );
}
