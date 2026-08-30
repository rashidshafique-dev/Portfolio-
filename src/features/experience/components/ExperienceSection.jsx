import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, Terminal, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { experience } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import styles from '../styles.module.css';

function getRoleIcon(role) {
  if (role.toLowerCase().includes('academic') || role.toLowerCase().includes('researcher')) {
    return <GraduationCap size={18} />;
  }
  if (role.toLowerCase().includes('open source')) {
    return <Terminal size={18} />;
  }
  return <Briefcase size={18} />;
}

function ExperienceCard({ job }) {
  return (
    <motion.div variants={itemVariants} className={styles.timelineItemWrapper}>
      <div className={styles.timelineNode}>
        <div className={styles.timelineDot} />
        <div className={styles.timelineLine} />
      </div>

      <article className={styles.card}>
        {/* Top Header Row */}
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <div className={styles.roleHeader}>
              <div className={styles.roleIconContainer}>
                {getRoleIcon(job.role)}
              </div>
              <div>
                <h3 className={styles.roleTitle}>{job.role}</h3>
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.companyLink}
                >
                  <span>{job.company}</span>
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.metaRow}>
              <span className={styles.dateRange}>
                <Calendar size={12} /> {job.period}
              </span>
              {job.location && (
                <span className={styles.location}>
                  <MapPin size={12} /> {job.location}
                </span>
              )}
            </div>
            {job.type && (
              <span className={styles.categoryBadge}>{job.type}</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Description */}
        <p className={styles.description}>{job.description}</p>

        {/* Bullet Highlights */}
        <ul className={styles.bulletList}>
          {job.highlights.map((h, i) => (
            <li key={i} className={styles.bulletItem}>
              <span className={styles.bulletIndicator} />
              <span className={styles.bulletText}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Chips */}
        <div className={styles.techChips}>
          {job.techStack.map((tech) => (
            <span key={tech} className={styles.techChip}>
              {tech}
            </span>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      {/* Section Header */}
      <div className={styles.headerContainer}>
        <span className={styles.eyebrow}>WORK HISTORY</span>
        <h1 className={styles.title}>Professional Experience</h1>
        <p className={styles.subtitle}>
          Engineering full-stack web apps, Python backends, and data-driven tools since 2023.
        </p>
      </div>

      {/* Timeline Cards Container */}
      <div className={styles.timeline}>
        {experience.map((job) => (
          <ExperienceCard key={job.id} job={job} />
        ))}
      </div>
    </SectionWrapper>
  );
}
