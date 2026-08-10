import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Muhammad Rashid Shafique</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className={styles.page}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className={styles.actions}>
          <Button variant="gradient" size="lg" href="/" icon={<Home size={16} />}>
            Back to Home
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            icon={<ArrowLeft size={16} />}
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
    </>
  );
}
