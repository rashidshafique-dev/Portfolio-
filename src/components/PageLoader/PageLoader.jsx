import Logo from '../Logo';
import styles from './PageLoader.module.css';

/**
 * PageLoader - Executive, Linear/Vercel-inspired loading state
 *
 * Characteristics:
 * - Single focal point: Unified Rashid.dev brand mark with breathing pulse
 * - Precision hairline indeterminate progress bar (160px wide, 2px high)
 * - Zero gimmicks: No bouncing balls, no spinning rings, no sci-fi corner brackets
 * - Native dark/light mode surface tokens with smooth ease transitions
 */
export default function PageLoader() {
  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className={styles.centre}>
        {/* Brand Mark with Subtle Breathing Halo */}
        <div className={styles.markWrapper}>
          <div className={styles.markGlow} aria-hidden="true" />
          <Logo size="lg" showText={false} />
        </div>

        {/* Brand Wordmark & Engineering Identity */}
        <div className={styles.identity}>
          <h2 className={styles.title}>
            Rashid<span className={styles.dot}>.dev</span>
          </h2>
          <p className={styles.subtitle}>Systems &amp; Full-Stack Engineering</p>
        </div>

        {/* Precision Indeterminate Progress Indicator */}
        <div className={styles.progressContainer} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>

        {/* Ambient Status Indicator */}
        <span className={styles.statusText} aria-hidden="true">
          INITIALIZING...
        </span>
      </div>
    </div>
  );
}
