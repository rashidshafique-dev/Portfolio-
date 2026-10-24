import { NavLink, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/SocialIcons';
import Logo from '../../components/Logo';
import { personalInfo, navLinks } from '../../constants/portfolioData';
import styles from './Footer.module.css';

/**
 * PortfolioFooter - A production-ready, fully responsive React component
 * concluding a Google Material 3 (Enterprise) light-mode design system.
 */
export default function PortfolioFooter() {
  // Filter out Home from footer sitemap (already handled by the brand logo)
  const sitemapLinks = navLinks.filter((link) => link.href !== '/');

  return (
    <footer className={styles.footer} id="portfolio-footer">
      <div className={`container ${styles.inner}`}>
        
        {/* Column 1: Brand / Identity (35% width) */}
        <div className={styles.brandCol}>
          <Logo withLink size="md" />
          <p className={styles.closingStatement}>
            Building scalable backend architectures, automated data systems, and premium user experiences.
          </p>
        </div>

        {/* Column 2: Navigation Directory (20% width) */}
        <nav className={styles.navCol} aria-label="Sitemap Explore">
          <h4 className={styles.columnTitle}>Explore</h4>
          <ul className={styles.linkList} role="list">
            {sitemapLinks.map((link) => (
              <li key={link.href}>
                <NavLink 
                  to={link.href} 
                  className={styles.navLink}
                  end={link.href === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Professional Connect (25% width) */}
        <div className={styles.connectCol}>
          <h4 className={styles.columnTitle}>Channels</h4>
          <ul className={styles.connectList} role="list">
            <li>
              <a 
                href={personalInfo.socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.connectLink}
              >
                <GithubIcon size={14} className={styles.connectIcon} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a 
                href={personalInfo.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.connectLink}
              >
                <LinkedinIcon size={14} className={styles.connectIcon} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className={styles.connectLink}
              >
                <Mail size={14} className={styles.connectIcon} aria-hidden="true" />
                <span>Email</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Status / Availability (20% width) */}
        <div className={styles.statusCol}>
          <div className={styles.availabilityCard}>
            <div className={styles.statusHeader}>
              <span className={styles.pulseDot} />
              <span className={styles.statusText}>Status</span>
            </div>
            <p className={styles.availabilityMessage}>
              Available for engineering contracts & roles.
            </p>
          </div>
        </div>

      </div>

      {/* Full-width Divider Line */}
      <div className="container">
        <div className={styles.divider} aria-hidden="true" />
      </div>

      {/* Bottom Legal Row */}
      <div className={`container ${styles.bottomRow}`}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Rashid.dev — Muhammad Rashid Shafique. All rights reserved.
        </p>
        <Link to="/rashidshafique.admin" className={styles.adminFooterLink} aria-label="Console login">
          Console
        </Link>
      </div>
    </footer>
  );
}
