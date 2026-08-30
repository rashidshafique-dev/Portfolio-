import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <div className={styles.overlay} aria-label="Loading" role="status" aria-live="polite">

      {/* Corner accent decorators */}
      <span className={styles.cornerTL} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      {/* Centre content */}
      <div className={styles.centre}>

        {/* Logo mark */}
        <div className={styles.logoWrap} aria-hidden="true">
          <div className={styles.logoBox}>
            <span className={styles.logoInitials}>RS</span>
          </div>
          <span className={styles.logoRing} />
        </div>

        {/* Name + role */}
        <div className={styles.textBlock}>
          <p className={styles.name}>Muhammad Rashid Shafique</p>
          <p className={styles.tagline}>Full-Stack Software Engineer</p>
        </div>

        {/* Animated dots */}
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>

      </div>

      {/* Bottom progress sweep */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressBar} />
      </div>

    </div>
  );
}
