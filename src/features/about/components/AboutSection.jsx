import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, ArrowRight, FileText } from 'lucide-react';
import { credentials } from '../../../constants/portfolioData';
import { getStoredProfile } from '../../../store/adminDataStore';
import { useUIStore } from '../../../store';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import SectionHeading from '../../../components/SectionHeading';
import styles from '../styles.module.css';
import profileImg from '../../../assets/profile/profile.webp';

export default function AboutSection() {
  const { setResumeModalOpen } = useUIStore();
  const [info, setInfo] = useState(() => getStoredProfile());

  useEffect(() => {
    const handleSync = () => {
      setInfo(getStoredProfile());
    };
    window.addEventListener('portfolio_data_updated', handleSync);
    return () => window.removeEventListener('portfolio_data_updated', handleSync);
  }, []);

  return (
    <SectionWrapper id="about">
      <div className={styles.aboutGrid}>
        {/* Left — Portrait Card */}
        <motion.div className={styles.aboutLeft} variants={itemVariants}>
          <div className={styles.avatarCard}>
            <div className={styles.avatar}>
              <img 
                src={info.avatarUrl || profileImg} 
                alt={info.name} 
                className={styles.avatarImg} 
                width="280" 
                height="320" 
                loading="eager"
              />
            </div>
            <div className={styles.avatarInfo}>
              <h3 className={styles.avatarName}>{info.name}</h3>
              <p className={styles.avatarRole}>{info.title}</p>
              <div className={styles.avatarMeta}>
                <span><MapPin size={13} /> {info.location}</span>
                <span><Briefcase size={13} /> Available for Full-Time & Freelance</span>
              </div>
            </div>
            <div className={styles.avatarActions} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className={styles.resumeButton}
                style={{ width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}
                aria-label="View Resume"
              >
                <FileText size={14} aria-hidden="true" />
                <span>View Resume</span>
              </button>
              <Link to="/contact" className={styles.socialBtn} style={{ width: '100%', height: '36px', borderRadius: '9999px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 500 }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right — Bio, Credentials & Experience Link */}
        <motion.div className={styles.aboutRight} variants={itemVariants}>
          <SectionHeading
            eyebrow="About Me"
            title="Building Full-Stack Web & Scalable Python Backends"
            subtitle={
              <>
                <p>
                  I am a Software Engineer specializing in backend architectures, REST API engineering, and modern React web platforms.
                </p>
                <p>
                  With strong fundamentals in Data Structures, Algorithms, and Relational Database Design, I architect robust production systems with clean code, composite SQL indexing, and seamless full-stack integrations.
                </p>
              </>
            }
            level={1}
          />

          {/* Engineering Credentials & Core Accreditations */}
          {credentials && credentials.length > 0 && (
            <div className={styles.credentialsSection}>
              <h4 className={styles.timelineTitle}>Core Accreditations & Technical Focus</h4>
              <div className={styles.credentialsGrid}>
                {credentials.map((cred) => (
                  <div key={cred.id} className={styles.credentialCard}>
                    <div className={styles.credentialHeader}>
                      <span className={styles.credentialBadge}>{cred.badge}</span>
                      <span className={styles.credentialPeriod}>{cred.period}</span>
                    </div>
                    <h5 className={styles.credentialTitle}>{cred.title}</h5>
                    <p className={styles.credentialInstitution}>{cred.institution}</p>
                    <p className={styles.credentialHighlights}>{cred.highlights}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Gateway — Replaces duplicate timeline */}
          <div className={styles.experienceCallout}>
            <div>
              <h4 className={styles.timelineTitle} style={{ margin: 0, padding: 0 }}>Career History & Experience</h4>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--md-on-surface-variant)' }}>
                Detailed breakdown of client systems, open-source work, and academic milestones.
              </p>
            </div>
            <Link to="/experience" className={styles.experienceCalloutBtn}>
              <span>View Experience</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
