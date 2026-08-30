import { ArrowRight, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import profileLargeImg from '../../../assets/profile1.webp';
import { personalInfo } from '../../../constants/portfolioData';

// Thin SVG Icons for social links (Linear/Stripe aesthetic)
const GithubIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring a large responsive profile photo, structured tech panel grid,
 * and clear professional positioning.
 */
export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <style dangerouslySetInnerHTML={{
        __html: `
        .object-top {
          object-position: top center !important;
        }
        .items-center {
          align-items: center !important;
        }
        /* dot pulse */
        @keyframes dotPulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.85); opacity: 0.6; }
        }
        [class*="statusDot"] {
          display: inline-block;
          animation: dotPulse 2s ease-in-out infinite;
          border-radius: 50%;
        }
        /* arrow nudge on hover */
        [class*="primaryButton"] svg {
          transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
        }
        [class*="primaryButton"]:hover svg {
          transform: translateX(4px);
        }
        [class*="primaryButton"],
        [class*="secondaryButton"] {
          transition: transform 150ms cubic-bezier(0.2, 0, 0, 1),
                      background-color var(--transition-fast),
                      border-color var(--transition-fast);
        }
        [class*="primaryButton"]:active,
        [class*="secondaryButton"]:active {
          transform: scale(0.98);
        }
      `}} />
      <div className="container">
        <div className={`${styles.gridContainer} items-center`}>

          {/* ── Group B: Right Column (Large profile photo with ambient aura) ── */}
          <div className={styles.rightColumn}>
            <div className={styles.ambientAura} aria-hidden="true" />
            <div className={styles.profileCard}>
              <img
                src={profileLargeImg}
                alt="Muhammad Rashid Shafique — Backend-Focused Full-Stack Engineer"
                className={`${styles.profileImageLarge} object-top`}
                loading="eager"
                width="340"
                height="425"
                fetchPriority="high"
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
          </div>

          {/* ── Group A & C: Header & Details (Pill, Positioning Line, Name, Tagline, Bio, CTAs) ── */}
          <div className={styles.headerBlock} style={{ gridRow: '1 / span 2' }}>
            {/* ── delay1: Status badge (Simple & Professional) ── */}
            <div className={`${styles.avatarStatusRow} ${styles.animItem} ${styles.delay1}`}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>Available for Hire</span>
              </div>
            </div>

            {/* ── delay2: H1 Name ── */}
            <h1 className={`${styles.headline} ${styles.animItem} ${styles.delay2}`}>
              Muhammad Rashid Shafique
            </h1>

            {/* ── delay3: Role subtitle (hierarchy bridge between name and bio) ── */}
            <p className={`${styles.roleSubtitle} ${styles.animItem} ${styles.delay3}`}>
              Full-Stack Software Engineer &middot; Python &middot; Django &middot; React
            </p>

            {/* ── delay4: Bio ── */}
            <p className={`${styles.description} ${styles.animItem} ${styles.delay4}`}>
              Engineering scalable full-stack web applications, secure Python REST backends, and modern React interfaces. Focused on robust system architecture, database performance optimization, and clean production code.
            </p>

            {/* ── delay5: CTA Buttons (Symmetric Equal-Sized Pair) ── */}
            <div className={`${styles.ctaRow} ${styles.animItem} ${styles.delay5}`}>
              <Link
                to="/projects"
                className={styles.primaryButton}
                aria-label="Explore projects by Muhammad Rashid Shafique"
              >
                <span>Explore Work</span>
                <ArrowRight size={16} className={styles.ctaIcon} aria-hidden="true" />
              </Link>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Muhammad_Rashid_Resume.pdf"
                className={styles.secondaryButton}
                aria-label="Download Resume"
              >
                <FileText size={15} aria-hidden="true" />
                <span>Resume</span>
              </a>
            </div>

            {/* ── delay6: Social Links ── */}
            <div className={`${styles.socialRow} ${styles.animItem} ${styles.delay6}`}>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.socials.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter Profile"
              >
                <TwitterIcon size={16} />
                <span>Twitter</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
