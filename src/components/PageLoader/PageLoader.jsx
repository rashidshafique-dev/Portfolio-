import { useState, useEffect } from 'react';
import styles from './PageLoader.module.css';

const STATUS_STEPS = [
  'INITIALIZING RUNTIME',
  'COMPOSING SYSTEM VIEW',
  'STANDBY',
];

export default function PageLoader() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className={styles.centre}>
        {/* Animated Brand Monogram */}
        <div className={styles.markWrapper}>
          <div className={styles.monogramBox}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.monogramSvg}
              aria-hidden="true"
            >
              {/* Squircle Tile Base */}
              <rect
                x="0.75"
                y="0.75"
                width="30.5"
                height="30.5"
                rx="8.5"
                className={styles.tileBg}
              />
              {/* Precision Stroke Draw: R Monogram & Terminal Prompt */}
              <path
                d="M9.5 7.5V24.5M9.5 7.5H16.5C19.8 7.5 22 9.5 22 12.5C22 15.5 19.8 17.5 16.5 17.5H9.5M15 17.5L22.5 24.5"
                className={styles.strokePath}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Active Terminal Execution Dot with Radar Ping */}
              <circle cx="23" cy="8" r="2.2" className={styles.radarDot} />
            </svg>
          </div>
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

        {/* Live Phased Telemetry Status */}
        <div className={styles.statusRow} aria-hidden="true">
          <span className={styles.statusPulseDot} />
          <span className={styles.statusText}>
            {STATUS_STEPS[statusIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
