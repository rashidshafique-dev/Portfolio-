import { NavLink } from 'react-router-dom';
import styles from './Logo.module.css';

/**
 * Logo - Proprietary brand mark for Rashid.dev
 *
 * Features:
 * - Bespoke geometric vector monogram: Architectural 'R' fused with terminal prompt & execution dot
 * - 4 responsive sizes: sm (28px), md (32px), lg (48px), xl (64px)
 * - Light and Dark theme native tokens
 * - Optional NavLink routing or static display
 */
export default function Logo({
  size = 'md',
  showText = true,
  withLink = false,
  subtitle = null,
  className = '',
  onClick = null,
}) {
  const containerClasses = [
    styles.logo,
    styles[size] || styles.md,
    withLink ? styles.isLink : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className={styles.iconBox} aria-hidden="true">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.glyphSvg}
        >
          {/* Subtle Squircle Background */}
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="8.5"
            className={styles.tileBg}
          />
          {/* Precision Monogram: Terminal Prompt Stem + Geometric R */}
          <path
            d="M9.5 7.5V24.5M9.5 7.5H16.5C19.8 7.5 22 9.5 22 12.5C22 15.5 19.8 17.5 16.5 17.5H9.5M15 17.5L22.5 24.5"
            className={styles.glyphStroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Active Terminal Dot */}
          <circle cx="23" cy="8" r="2.2" className={styles.dotGlyph} />
        </svg>
      </span>

      {showText && (
        <div className={styles.textWrap}>
          <span className={styles.brandName}>
            Rashid<span className={styles.brandDot}>.dev</span>
          </span>
          {subtitle && <span className={styles.brandSub}>{subtitle}</span>}
        </div>
      )}
    </>
  );

  if (withLink) {
    return (
      <NavLink
        to="/"
        className={containerClasses}
        aria-label="Rashid.dev Home"
        onClick={onClick}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <div className={containerClasses} onClick={onClick}>
      {content}
    </div>
  );
}
