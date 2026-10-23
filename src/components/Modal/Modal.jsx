import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  headerExtra = null,
}) {
  const [mounted, setMounted] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Scroll-lock without navbar layout shift
  useEffect(() => {
    if (isOpen) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (sw > 0) {
        document.body.style.paddingRight = `${sw}px`;
        document.documentElement.style.setProperty('--scrollbar-compensation', `${sw}px`);
      }
      // Reset body scroll to top on open
      requestAnimationFrame(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = 0;
      });
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--scrollbar-compensation');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--scrollbar-compensation');
    };
  }, [isOpen]);

  if (!mounted) return null;

  const sizeClass = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
    xl: styles.xl,
    full: styles.full,
  }[size] || styles.md;

  // Clean centered floating modal animation
  const cardVariants = {
    initial: { opacity: 0, scale: 0.96, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit:    { opacity: 0, scale: 0.96, y: 12 },
  };

  const cardTransition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : 'Build Log'}
        >
          <motion.div
            className={`${styles.modal} ${sizeClass}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={cardTransition}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header — flex-shrink:0, never collapses */}
            {(title || showCloseButton || headerExtra) && (
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  {title && (
                    typeof title === 'string' ? (
                      <h3 className={styles.title}>{title}</h3>
                    ) : (
                      title
                    )
                  )}
                </div>
                <div className={styles.headerRight}>
                  {headerExtra}
                  {showCloseButton && (
                    <button
                      type="button"
                      className={styles.closeBtn}
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Only the body scrolls */}
            <div ref={bodyRef} className={styles.body}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
