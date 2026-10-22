import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import profileLargeImg from '../../../assets/profile/profile1.webp';
import { personalInfo } from '../../../constants/portfolioData';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../../components/SocialIcons';

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring a large responsive profile photo, structured tech panel grid,
 * and clear professional positioning.
 */
export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <div className={styles.gridContainer}>

          {/* ── Group B: Right Column (Large profile photo) ── */}
          <div className={styles.rightColumn}>
            <div className={styles.profileCard}>
              <img
                src={profileLargeImg}
                alt="Muhammad Rashid Shafique — Backend-Focused Full-Stack Engineer"
                className={styles.profileImageLarge}
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
