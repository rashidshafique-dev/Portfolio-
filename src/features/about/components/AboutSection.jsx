import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../../components/SocialIcons';
import { personalInfo, timeline } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import SectionHeading from '../../../components/SectionHeading';
import Button from '../../../components/Button';
import styles from '../styles.module.css';
import profileImg from '../../../assets/profile.webp';

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
                <span><Briefcase size={13} /> Full-time Available</span>
                <span><Calendar size={13} /> 3+ Yrs Experience</span>
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

        {/* Right — Bio & Timeline */}
        <motion.div className={styles.aboutRight} variants={itemVariants}>
          <SectionHeading
            eyebrow="About Me"
            title="Architecting Scalable Backend & AI Systems"
            subtitle={
              <>
                <p>
                  I am a Software Engineer specializing in low-latency systems development, distributed big data pipelines, and high-concurrency automated scripts.
                </p>
                <p>
                  Currently pursuing my BS in Computer Science at the University of Agriculture Faisalabad (UAF), I apply core academic fundamentals—including advanced Data Structures, Algorithmic Analysis, and Database Optimization—to engineer production-grade enterprise software. I thrive on translating abstract computational complexities into highly scalable, performant systems.
                </p>
              </>
            }
            level={1}
          />

          <h4 className={styles.timelineTitle}>Career Timeline</h4>
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
