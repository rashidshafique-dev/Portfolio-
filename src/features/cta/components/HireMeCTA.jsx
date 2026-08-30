import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';

export default function HireMeCTA() {
  return (
    <section className={styles.section} id="hire-me-cta">
      <div className={styles.container}>
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.textBlock}>
            <h2 className={styles.title}>
              Let's Build Something Real Together
            </h2>
            <p className={styles.desc}>
              Available for full-stack software engineering roles, high-performance Python/Django backends, and custom AI-integrated web applications.
            </p>
          </div>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.primaryCtaBtn}>
              <Mail size={16} aria-hidden="true" />
              <span>Get in Touch</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <a 
              href="https://www.fiverr.com/s/rEYj067" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.fiverrBtn}
            >
              <span>Fiverr Services</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
