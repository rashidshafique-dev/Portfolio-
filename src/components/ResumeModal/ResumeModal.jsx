import { useState, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Eye,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Modal from '../Modal/Modal';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import { copyToClipboard } from '../../utils';
import { personalInfo } from '../../constants/portfolioData';
import { useUIStore } from '../../store';
import styles from './ResumeModal.module.css';

const ATS_PLAIN_TEXT = `MUHAMMAD RASHID SHAFIQUE
Faisalabad, Pakistan | +92 319 8696623 | rashidshafique.dev@gmail.com
GitHub: https://github.com/rashidshafique-dev
LinkedIn: https://www.linkedin.com/in/rashidshafique-dev
Portfolio: https://rashid-shafique-portfolio.vercel.app

PROFESSIONAL SUMMARY
Full-stack software engineer specializing in AI-integrated web and mobile applications — architecting production-grade systems end-to-end, from database design and secure REST APIs to responsive frontends and cross-platform apps.

EDUCATION
University of Agriculture Faisalabad (UAF) — Faisalabad, Pakistan
Bachelor of Science in Computer Science (BS CS) | Sept 2023 – 2027 (Expected)
• Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Relational Database Management Systems (SQL), Operating Systems, Software Engineering, Web Systems Architecture.
• Academic Focus: Algorithmic Complexity (Big-O Analysis), Database Optimization, and Distributed Systems fundamentals.

EMPLOYMENT & EXPERIENCE
Software Engineer — Full-Stack & Systems | 2023 – Present
Independent / Open-Source Engineering — Remote / Faisalabad, Pakistan
• Architected and shipped production-grade Python backend services (Django, DRF, FastAPI) applying OOP design patterns and modular software principles for clean, maintainable codebases.
• Designed optimized SQL schemas, normalization models, and composite indexing strategies to minimize API response latency by 42% and eliminate redundant database round-trips.
• Engineered secure authentication systems using stateless JWT tokens with auto-rotation/blacklisting and Google OAuth 2.0 Single Sign-On (SSO).
• Built responsive, production-deployed frontends in React.js (Vite, Tailwind CSS, CSS Modules) and cross-platform mobile apps in React Native (Expo), shipping to Vercel and Railway.
• Core Technical Toolkit: Data Structures, Algorithmic Analysis (Big-O), OOP, SQL Databases, Python, Django, DRF, FastAPI, React.js, React Native, Vite, Tailwind CSS, JWT, Google OAuth 2.0, Supabase, Firebase, Vercel, Railway, Git, GitHub.

SOFTWARE PROJECTS
Shifaa — AI-Powered Hospital Management System
Live: https://al-shifaa-hms.vercel.app | GitHub: https://github.com/rashidshafique-dev/AI-HMS
• Architected multi-role hospital management platform with AI voice receptionist ("Sana") for natural voice booking (Admin, Doctor, Patient, Nurse, Receptionist, Pharmacist).
• Integrated Groq API (Mistral-7B / Llama 3), Whisper STT for speech-to-text, and Coqui TTS for voice responses.
• Engineered JWT-secured authentication, a feature-sliced React frontend architecture, and a normalized Supabase (PostgreSQL) schema.
• Utilized: Django REST Framework, React 18, Vite, Tailwind CSS, Supabase (PostgreSQL), Groq API, Whisper STT, Coqui TTS, JWT, Git, GitHub.

Sunrise Imperial Resort — Hotel PMS & Guest SaaS Platform
Live: https://sunrise-hotel-plum.vercel.app | GitHub: https://github.com/rashidkhan4067/Sunrise-Hotel.git
• Architected full-stack luxury Hotel Property Management System (PMS) and guest reservation portal with React 19, TypeScript, Tailwind CSS v4, and Radix UI.
• Built real-time hospitality modules: visual calendar reservation matrix, housekeeping inspection workflows, itemized POS folio invoicing, and ADR/RevPAR analytics.
• Optimized web vitals (INP < 10ms) via requestAnimationFrame CSS token batching and engineered automated dynamic chunk retry listeners for 100% deployment reliability.
• Utilized: React 19, TypeScript, Vite 7, Tailwind CSS v4, Radix UI, Zustand 5, TanStack Query, Recharts, Clerk Auth, Git, GitHub.

AioVerse — Mobile Workspace & Multi-Utility Platform
GitHub: https://github.com/rashidkhan4067/AioVerse
• Architected cross-platform mobile workspace app integrating 40+ native utilities in React Native (Expo) and TypeScript.
• Engineered high-performance Python Django REST Framework backend with stateless JWT token auto-rotation, guest mode isolation, and pytest validation suites.
• Offloaded binary media transformations to native thread workers and implemented offline-first local AsyncStorage caching, achieving locked 60 FPS performance.
• Utilized: React Native, Expo, TypeScript, Python, Django, Django REST Framework, PostgreSQL, JWT, AsyncStorage, Git, GitHub.

Rescue Project — Missing Person Search & Coordination System
Live: https://rescue-project.vercel.app | GitHub: https://github.com/rashidkhan4067/Rescue_Project-
• Engineered search-and-rescue web console for missing person registrations and volunteer squad coordination as part of a team project.
• Applied difference hashing algorithms for image comparison and configured secure JWT-based authentication workflows.
• Utilized: Data Structures, Algorithms, Python, FastAPI, Django, React.js, SQL, JWT, Git, GitHub.

TECHNICAL SKILLS
• CS Fundamentals: Data Structures & Algorithms, OOP, Big-O Complexity Analysis, RDBMS, Operating Systems, Software Engineering Principles
• Languages: Python, JavaScript/TypeScript, SQL (Familiar: C++, Java)
• Frameworks & Web: Django, DRF, FastAPI, React.js, React Native (Expo), Vite, Tailwind CSS, CSS Modules
• Databases & Cloud: PostgreSQL, SQL, Supabase, Firebase, Vercel, Railway
• AI & Voice: Groq API, Whisper STT, Coqui TTS, OpenAI API, Prompt Engineering
• Security & Tools: JWT Authentication, Google OAuth 2.0, Git, GitHub`;

export default function ResumeModal() {
  const { isResumeModalOpen, setResumeModalOpen } = useUIStore();
  const [viewMode, setViewMode] = useState('doc'); // 'doc' | 'pdf'
  const [copied, setCopied] = useState(false);

  // Synchronize with URL hash (#resume)
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#resume') {
        setResumeModalOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, [setResumeModalOpen]);

  const handleClose = () => {
    setResumeModalOpen(false);
    if (window.location.hash === '#resume') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleCopyText = async () => {
    const ok = await copyToClipboard(ATS_PLAIN_TEXT);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Minimal, professional header actions (no clutter, no sales pitch buttons)
  const headerExtra = (
    <div className={styles.headerControls}>
      <div className={styles.viewToggle} role="group" aria-label="Resume View Mode">
        <button
          type="button"
          onClick={() => setViewMode('doc')}
          className={`${styles.toggleBtn} ${viewMode === 'doc' ? styles.activeToggle : ''}`}
          aria-pressed={viewMode === 'doc'}
        >
          <FileText size={13} aria-hidden="true" />
          <span>Document</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('pdf')}
          className={`${styles.toggleBtn} ${viewMode === 'pdf' ? styles.activeToggle : ''}`}
          aria-pressed={viewMode === 'pdf'}
        >
          <Eye size={13} aria-hidden="true" />
          <span>PDF</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleCopyText}
        className={`${styles.headerSecondaryBtn} ${copied ? styles.copied : ''}`}
        title="Copy full text to clipboard"
        aria-label="Copy resume text to clipboard"
      >
        {copied ? (
          <>
            <Check size={13} aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy size={13} aria-hidden="true" />
            <span>Copy</span>
          </>
        )}
      </button>

      <a
        href={personalInfo.resumeUrl}
        download="Muhammad_Rashid_Shafique_Resume.pdf"
        className={styles.headerActionBtn}
        aria-label="Download official PDF resume"
      >
        <Download size={13} aria-hidden="true" />
        <span>PDF</span>
      </a>
    </div>
  );

  return (
    <Modal
      isOpen={isResumeModalOpen}
      onClose={handleClose}
      title="Resume"
      headerExtra={headerExtra}
      size="xl"
    >
      <div className={styles.container}>
        {viewMode === 'doc' ? (
          <article className={styles.resumeSheet}>
            {/* ── Document Header ── */}
            <header className={styles.sheetHeader}>
              <h1 className={styles.name}>{personalInfo.name}</h1>
              <p className={styles.role}>
                Full-Stack Software Engineer &middot; Systems Architecture
              </p>

              <div className={styles.contactLine}>
                <span>{personalInfo.location}</span>
                <span className={styles.contactDivider}>&bull;</span>
                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                  {personalInfo.phone}
                </a>
                <span className={styles.contactDivider}>&bull;</span>
                <a href={`mailto:${personalInfo.email}`} className={styles.contactLink}>
                  {personalInfo.email}
                </a>
                <span className={styles.contactDivider}>&bull;</span>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  github.com/rashidshafique-dev
                </a>
                <span className={styles.contactDivider}>&bull;</span>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  linkedin.com/in/rashidshafique-dev
                </a>
              </div>

              <p className={styles.tagline}>
                <strong>Full-stack software engineer</strong> specializing in AI-integrated web and mobile applications — architecting production-grade systems end-to-end, from database design and secure REST APIs to responsive frontends and cross-platform apps.
              </p>
            </header>

            {/* ── Education ── */}
            <section className={styles.section} aria-labelledby="resume-edu-title">
              <div className={styles.sectionHeader}>
                <h2 id="resume-edu-title" className={styles.sectionTitle}>Education</h2>
              </div>

              <div className={styles.entriesList}>
                <div className={styles.entry}>
                  <div className={styles.entryTopRow}>
                    <div className={styles.entryHeadingGroup}>
                      <h3 className={styles.entryTitle}>University of Agriculture Faisalabad (UAF)</h3>
                    </div>
                    <span className={styles.entryMeta}>Sept 2023 &mdash; 2027 (Expected)</span>
                  </div>
                  <div className={styles.entrySubRow}>
                    <span>Bachelor of Science in Computer Science (BS CS)</span>
                    <span className={styles.entrySubtitle}>Faisalabad, Pakistan</span>
                  </div>

                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <strong>Core Coursework:</strong> Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Relational Database Management Systems (SQL), Operating Systems, Software Engineering, Web Systems Architecture.
                    </li>
                    <li className={styles.bulletItem}>
                      <strong>Academic Focus:</strong> Algorithmic Complexity (Big-O Analysis), Database Optimization, and Distributed Systems fundamentals.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Employment & Experience ── */}
            <section className={styles.section} aria-labelledby="resume-exp-title">
              <div className={styles.sectionHeader}>
                <h2 id="resume-exp-title" className={styles.sectionTitle}>Employment &amp; Experience</h2>
              </div>

              <div className={styles.entriesList}>
                <div className={styles.entry}>
                  <div className={styles.entryTopRow}>
                    <div className={styles.entryHeadingGroup}>
                      <h3 className={styles.entryTitle}>Software Engineer &mdash; Full-Stack &amp; Systems</h3>
                    </div>
                    <span className={styles.entryMeta}>2023 &mdash; Present</span>
                  </div>
                  <div className={styles.entrySubRow}>
                    <span className={styles.entrySubtitle}>Independent &amp; Open-Source Engineering</span>
                    <span className={styles.entrySubtitle}>Remote / Faisalabad, Pakistan</span>
                  </div>

                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      Architected and shipped production-grade Python backend services (Django, DRF, FastAPI) applying OOP design patterns and modular software principles for clean, maintainable codebases.
                    </li>
                    <li className={styles.bulletItem}>
                      Designed optimized SQL schemas, normalization models, and composite indexing strategies to minimize API response latency by <strong>42%</strong> and eliminate redundant database round-trips.
                    </li>
                    <li className={styles.bulletItem}>
                      Engineered secure authentication systems using stateless JWT tokens with auto-rotation/blacklisting and Google OAuth 2.0 Single Sign-On (SSO).
                    </li>
                    <li className={styles.bulletItem}>
                      Built responsive, production-deployed frontends in React.js (Vite, Tailwind CSS, CSS Modules) and cross-platform mobile apps in React Native (Expo), shipping to Vercel and Railway.
                    </li>
                    <li className={styles.bulletItem}>
                      <strong>Core Technical Toolkit:</strong> Data Structures, Algorithmic Analysis (Big-O), OOP, SQL Databases, Python, Django, DRF, FastAPI, React.js, React Native, Vite, Tailwind CSS, JWT, Google OAuth 2.0, Supabase, Firebase, Vercel, Railway, Git, GitHub.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Key Software Projects ── */}
            <section className={styles.section} aria-labelledby="resume-proj-title">
              <div className={styles.sectionHeader}>
                <h2 id="resume-proj-title" className={styles.sectionTitle}>Software Projects</h2>
              </div>

              <div className={styles.entriesList}>
                {/* Shifaa */}
                <div className={styles.entry}>
                  <div className={styles.entryTopRow}>
                    <h3 className={styles.entryTitle}>Shifaa &mdash; AI-Powered Hospital Management System</h3>
                    <div className={styles.projectLinks}>
                      <a
                        href="https://al-shifaa-hms.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        Live <ExternalLink size={10} />
                      </a>
                      &middot;
                      <a
                        href="https://github.com/rashidshafique-dev/AI-HMS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        GitHub <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      Architected a multi-role hospital management platform with an AI voice receptionist ("Sana") for automated, natural voice appointment scheduling across 6 distinct hospital roles.
                    </li>
                    <li className={styles.bulletItem}>
                      Integrated Groq API (Mistral-7B / Llama 3) for conversational AI, Whisper for real-time speech-to-text, and Coqui TTS for low-latency voice responses.
                    </li>
                    <li className={styles.bulletItem}>
                      Engineered JWT-secured role-based access control, a modular React architecture, and normalized PostgreSQL schemas for high-concurrency patient intakes.
                    </li>
                  </ul>
                  <div className={styles.techLine}>
                    <strong>Utilized:</strong> Django REST Framework, React 18, Vite, Tailwind CSS, Supabase (PostgreSQL), Groq API, Whisper STT, Coqui TTS, JWT.
                  </div>
                </div>

                {/* Sunrise Imperial Resort */}
                <div className={styles.entry}>
                  <div className={styles.entryTopRow}>
                    <h3 className={styles.entryTitle}>Sunrise Imperial Resort &mdash; Hotel PMS &amp; Guest SaaS Platform</h3>
                    <div className={styles.projectLinks}>
                      <a
                        href="https://sunrise-hotel-plum.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        Live <ExternalLink size={10} />
                      </a>
                      &middot;
                      <a
                        href="https://github.com/rashidkhan4067/Sunrise-Hotel.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        GitHub <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      Architected a full-stack luxury Hotel Property Management System (PMS) and guest reservation portal with visual room scheduling, housekeeping inspection workflows, and POS folio invoicing.
                    </li>
                    <li className={styles.bulletItem}>
                      Optimized Core Web Vitals to <strong>INP &lt; 10ms</strong> via requestAnimationFrame CSS token batching, and engineered automated dynamic chunk retry listeners for 100% deployment reliability.
                    </li>
                  </ul>
                  <div className={styles.techLine}>
                    <strong>Utilized:</strong> React 19, TypeScript, Vite 7, Tailwind CSS v4, Radix UI, Zustand 5, TanStack Query, Recharts, Clerk Auth.
                  </div>
                </div>

                {/* AioVerse */}
                <div className={styles.entry}>
                  <div className={styles.entryTopRow}>
                    <h3 className={styles.entryTitle}>AioVerse &mdash; Mobile Workspace &amp; Multi-Utility Platform</h3>
                    <div className={styles.projectLinks}>
                      <a
                        href="https://github.com/rashidkhan4067/AioVerse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        GitHub <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      Architected a cross-platform mobile workspace integrating 40+ native utilities with an asynchronous Python/Django REST API backend.
                    </li>
                    <li className={styles.bulletItem}>
                      Offloaded binary media transformations to native thread workers and implemented offline-first local AsyncStorage caching, achieving locked <strong>60 FPS</strong> UI performance.
                    </li>
                  </ul>
                  <div className={styles.techLine}>
                    <strong>Utilized:</strong> React Native, Expo, TypeScript, Python, Django, Django REST Framework, PostgreSQL, JWT, AsyncStorage.
                  </div>
                </div>

                {/* Rescue Project */}
                <div className={styles.entry}>
                  <div className={styles.entryTopRow}>
                    <h3 className={styles.entryTitle}>Rescue Project &mdash; Missing Person Search &amp; Coordination System</h3>
                    <div className={styles.projectLinks}>
                      <a
                        href="https://rescue-project.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        Live <ExternalLink size={10} />
                      </a>
                      &middot;
                      <a
                        href="https://github.com/rashidkhan4067/Rescue_Project-"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkItem}
                      >
                        GitHub <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      Engineered a search-and-rescue dispatch console for missing person registrations and volunteer squad coordination as part of a team project.
                    </li>
                    <li className={styles.bulletItem}>
                      Applied difference hashing algorithms for automated photographic matching and built secure JWT verification workflows.
                    </li>
                  </ul>
                  <div className={styles.techLine}>
                    <strong>Utilized:</strong> Data Structures, Algorithms, Python, FastAPI, Django, React.js, SQL, JWT.
                  </div>
                </div>
              </div>
            </section>

            {/* ── Technical Skills ── */}
            <section className={styles.section} aria-labelledby="resume-skills-title">
              <div className={styles.sectionHeader}>
                <h2 id="resume-skills-title" className={styles.sectionTitle}>Technical Skills</h2>
              </div>

              <div className={styles.skillsContainer}>
                <div className={styles.skillRow}>
                  <span className={styles.skillLabel}>CS Fundamentals:</span>
                  <span className={styles.skillContent}>
                    Data Structures &amp; Algorithms, OOP, Big-O Complexity Analysis, RDBMS, Operating Systems, Software Engineering Principles
                  </span>
                </div>
                <div className={styles.skillRow}>
                  <span className={styles.skillLabel}>Languages:</span>
                  <span className={styles.skillContent}>
                    Python, JavaScript/TypeScript, SQL (Familiar: C++, Java)
                  </span>
                </div>
                <div className={styles.skillRow}>
                  <span className={styles.skillLabel}>Frameworks &amp; Web:</span>
                  <span className={styles.skillContent}>
                    Django, DRF, FastAPI, React.js, React Native (Expo), Vite, Tailwind CSS, CSS Modules
                  </span>
                </div>
                <div className={styles.skillRow}>
                  <span className={styles.skillLabel}>Databases &amp; Cloud:</span>
                  <span className={styles.skillContent}>
                    PostgreSQL, SQLite, Supabase, Firebase, Vercel, Railway
                  </span>
                </div>
                <div className={styles.skillRow}>
                  <span className={styles.skillLabel}>AI &amp; Audio:</span>
                  <span className={styles.skillContent}>
                    Groq API, Whisper STT, Coqui TTS, OpenAI API, Prompt Engineering
                  </span>
                </div>
                <div className={styles.skillRow}>
                  <span className={styles.skillLabel}>Security &amp; Tools:</span>
                  <span className={styles.skillContent}>
                    JWT Authentication, Google OAuth 2.0, Git, GitHub
                  </span>
                </div>
              </div>
            </section>
          </article>
        ) : (
          <div className={styles.pdfContainer}>
            <div className={styles.pdfCard}>
              <img
                src="/resume_preview_page_1.png"
                alt="Muhammad Rashid Shafique Resume Page 1"
                className={styles.pdfImage}
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
