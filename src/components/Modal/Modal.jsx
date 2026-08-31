import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trap escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
          aria-label={typeof title === 'string' ? title : 'Dialog'}
        >
          <motion.div
            className={`${styles.modal} ${sizeClass}`}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
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
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className={styles.body}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
