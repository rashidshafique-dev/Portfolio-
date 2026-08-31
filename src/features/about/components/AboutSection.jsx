import { motion } from 'framer-motion';
import { MapPin, Briefcase, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../../components/SocialIcons';
import { personalInfo, timeline, credentials } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import SectionHeading from '../../../components/SectionHeading';
import Button from '../../../components/Button';
import styles from '../styles.module.css';
import profileImg from '../../../assets/profile/profile.webp';

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className={styles.aboutGrid}>
        {/* Left — Portrait Card */}
        <motion.div className={styles.aboutLeft} variants={itemVariants}>
          <div className={styles.avatarCard}>
            <div className={styles.avatar}>
              <img 
                src={profileImg} 
                alt={personalInfo.name} 
                className={styles.avatarImg} 
                width="280" 
                height="320" 
                loading="eager"
              />
            </div>
            <div className={styles.avatarInfo}>
              <h3 className={styles.avatarName}>{personalInfo.name}</h3>
              <p className={styles.avatarRole}>{personalInfo.title}</p>
              <div className={styles.avatarMeta}>
                <span><MapPin size={13} /> {personalInfo.location}</span>
                <span><Briefcase size={13} /> Available for Full-Time & Freelance</span>
              </div>
            </div>
            <div className={styles.avatarActions}>
              <Button
                variant="primary"
                size="sm"
                href={personalInfo.resumeUrl}
                target="_blank"
                download="Muhammad_Rashid_Resume.pdf"
                icon={<Download size={14} />}
                className={styles.resumeButton}
              >
                Resume
              </Button>
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                <GithubIcon size={16} />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right — Bio, Credentials & Timeline */}
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

          <h4 className={styles.timelineTitle}>Engineering Milestones</h4>
          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={styles.timelineItem}
                variants={itemVariants}
              >
                <div className={styles.timelineYearCol}>
                  <span className={styles.timelineYear}>{item.year}</span>
                </div>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot} />
                  {i < timeline.length - 1 && <div className={styles.timelineConnector} />}
                </div>
                <div className={styles.timelineContent}>
                  <p>{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
