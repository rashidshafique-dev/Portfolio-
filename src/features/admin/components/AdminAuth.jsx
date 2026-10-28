import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, X, ShieldAlert, Clock, ArrowRight } from 'lucide-react';
import { verifyAdminPin, getLockoutStatus } from '../../../store/adminDataStore';
import styles from '../styles.module.css';

export default function AdminAuth({ onAuthenticated }) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  // Rate limiting countdown
  useEffect(() => {
    const checkLockout = () => {
      const status = getLockoutStatus();
      if (status.isLocked) {
        setLockoutRemaining(Math.ceil(status.remainingMs / 1000));
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          checkLockout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const isLockedOut = lockoutRemaining > 0;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 380);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (!pin.trim()) {
      setError('Please enter your PIN');
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await verifyAdminPin(pin.trim());
      if (result.success) {
        onAuthenticated();
      } else {
        triggerShake();
        if (result.locked) {
          setLockoutRemaining(Math.ceil(result.remainingMs / 1000));
        }
        setError(result.message || 'Invalid PIN');
        setPin('');
      }
    } catch {
      setError('Verification failed');
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authModalBackdrop}>
      <div className={`${styles.authModalDialog} ${shake ? styles.shake : ''}`}>
        {/* Close Button returning to main portfolio */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className={styles.modalCloseBtn}
          title="Return to site"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Minimal Professional Header */}
        <div className={styles.popupHeader}>
          <div className={styles.popupIcon}>
            {isLockedOut ? (
              <ShieldAlert size={20} style={{ color: '#dc2626' }} />
            ) : (
              <Lock size={20} />
            )}
          </div>
          <h2 className={styles.popupTitle}>Admin Access</h2>
        </div>

        {/* Lockout Warning */}
        {isLockedOut && (
          <div className={styles.lockoutBanner} style={{ margin: 0, padding: '0.65rem 0.85rem' }} role="alert">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
              <Clock size={14} style={{ color: '#dc2626' }} />
              <strong>Rate limit active</strong>
            </div>
            <div className={styles.countdownBadge} style={{ marginTop: '0.35rem', fontSize: '0.74rem' }}>
              Retry in: <strong>{formatCountdown(lockoutRemaining)}</strong>
            </div>
          </div>
        )}

        {/* Clean Login Form */}
        <form onSubmit={handleSubmit} className={styles.authForm} style={{ gap: '0.85rem' }}>
          <div className={styles.pinInputWrapper}>
            <input
              type={showPin ? 'text' : 'password'}
              maxLength={12}
              value={pin}
              disabled={isLockedOut || isSubmitting}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter PIN"
              autoFocus
              className={styles.pinInput}
              aria-label="Admin PIN"
              autoComplete="current-password"
            />
            <button
              type="button"
              disabled={isLockedOut || isSubmitting}
              onClick={() => setShowPin(!showPin)}
              className={styles.pinToggleBtn}
              title={showPin ? 'Hide PIN' : 'Show PIN'}
              aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
            >
              {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && <span className={styles.authError}>{error}</span>}

          <button
            type="submit"
            disabled={isLockedOut || isSubmitting}
            className={styles.primaryBtn}
            style={{
              justifyContent: 'center',
              height: '40px',
              fontSize: '0.86rem',
              opacity: isLockedOut || isSubmitting ? 0.6 : 1,
              cursor: isLockedOut || isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            <span>{isSubmitting ? 'Verifying...' : 'Unlock'}</span>
            {!isSubmitting && <ArrowRight size={14} />}
          </button>
        </form>
      </div>
    </div>
  );
}
