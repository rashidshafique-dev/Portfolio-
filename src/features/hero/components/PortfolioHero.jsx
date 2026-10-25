import { useState, useEffect } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredProfile } from '../../../store/adminDataStore';
import styles from '../styles.module.css';
import profileLargeImg from '../../../assets/profile/profile1.webp';

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring a large responsive profile photo, structured tech panel grid,
 * and clear professional positioning.
 */
export default function HeroSection() {
  const [profile, setProfile] = useState(() => getStoredProfile());

  useEffect(() => {
    const handleSync = () => {
      setProfile(getStoredProfile());
    };
    window.addEventListener('portfolio_data_updated', handleSync);
    return () => window.removeEventListener('portfolio_data_updated', handleSync);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <div className={styles.gridContainer}>

          {/* ── Group B: Right Column (Large profile photo) ── */}
          <div className={styles.rightColumn}>
            <div className={styles.profileCard}>
              <img
                src={profile.avatarUrl || profileLargeImg}
                alt="Muhammad Rashid Shafique — Backend-Focused Full-Stack Engineer"
                className={styles.profileImageLarge}
                loading="eager"
                decoding="async"
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

              <Link
                to="/contact"
                className={styles.secondaryButton}
                aria-label="Get in Touch with Muhammad Rashid Shafique"
              >
                <Mail size={15} aria-hidden="true" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
