import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Milestone, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { experience, timeline, personalInfo } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import HireMeCTA from '../../cta/components/HireMeCTA';
import styles from '../styles.module.css';

function getRoleIcon(category) {
  if (category === 'education') return <GraduationCap size={16} />;
  if (category === 'client') return <ShoppingBag size={16} />;
  return <Briefcase size={16} />;
}

function ExperienceCard({ job, isLast }) {
  return (
    <motion.div
      layout
      variants={itemVariants}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
      className={styles.timelineItemWrapper}
    >
      {/* Sleek Vertical Rail & Node */}
      <div className={styles.timelineNode} aria-hidden="true">
        <div className={`${styles.timelineDot} ${job.isCurrent ? styles.activeTimelineDot : ''}`}>
          {job.isCurrent && <span className={styles.timelinePulse} />}
        </div>
        {!isLast && <div className={styles.timelineLine} />}
      </div>

      {/* Modern Compact Google Material 3 Card */}
      <article className={styles.card}>
        
        {/* Header Block: Clean, Structured, Un-fragmented */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.roleIcon}>
              {getRoleIcon(job.category)}
            </div>
            <div className={styles.titleInfo}>
              <div className={styles.roleRow}>
                <h3 className={styles.roleTitle}>{job.role}</h3>
                {job.isCurrent && (
                  <span className={styles.liveIndicator}>
                    <span className={styles.liveDot} />
                    Current
                  </span>
                )}
              </div>
              
              <div className={styles.companyMeta}>
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.companyLink}
                  aria-label={`Visit ${job.company}`}
                >
                  <span>{job.company}</span>
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
                <span className={styles.metaDot}>&bull;</span>
                <span className={styles.locationText}>{job.location}</span>
                <span className={styles.metaDot}>&bull;</span>
                <span className={styles.typeText}>{job.type}</span>
              </div>
            </div>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.datePill}>
              <Calendar size={11} aria-hidden="true" />
              <span>{job.period}</span>
            </span>
          </div>
        </div>

        {/* Concise Description */}
        <p className={styles.description}>{job.description}</p>

        {/* High-Signal Key Deliverables */}
        {job.highlights && job.highlights.length > 0 && (
          <ul className={styles.highlightsList}>
            {job.highlights.map((h, i) => (
              <li key={i} className={styles.highlightItem}>
                <CheckCircle2 size={13} className={styles.highlightIcon} aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer: Compact Tech Chips & Direct Action Link */}
        <div className={styles.cardFooter}>
          <div className={styles.techPills} aria-label="Technologies used">
            {job.techStack.map((tech) => (
              <span key={tech} className={styles.techPill}>
                {tech}
              </span>
            ))}
          </div>

          {job.projectLink && (
            <a
              href={job.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitSiteBtn}
            >
              <span>Visit Live Storefront</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </article>
    </motion.div>
  );
}

function MilestonesView({ items }) {
  return (
    <div className={styles.milestonesContainer}>
      <div className={styles.milestonesGrid}>
        {items.map((m, idx) => (
          <motion.div
            key={idx}
            className={styles.milestoneCard}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.25 }}
          >
            <div className={styles.milestoneHeader}>
              <span className={styles.milestoneYear}>{m.year}</span>
              <div className={styles.milestoneIconBubble}>
                <Milestone size={13} />
              </div>
            </div>
            <p className={styles.milestoneText}>{m.event}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const FILTER_TABS = [
    { label: 'All Experience', value: 'all' },
    { label: 'Engineering Roles', value: 'work' },
    { label: 'Client Platforms', value: 'client' },
    { label: 'Academic Background', value: 'education' },
    { label: 'Key Milestones', value: 'milestones' },
  ];

  const filteredExperience = activeFilter === 'all'
    ? experience
    : experience.filter(e => e.category === activeFilter);

  return (
    <SectionWrapper id="experience">
      {/* Section Header */}
      <div className={styles.headerContainer}>
        <span className={styles.eyebrow}>CAREER &amp; EXPERIENCE</span>
        <h1 className={styles.title}>Engineering Experience</h1>
        <p className={styles.subtitle}>
          A track record of engineering scalable backend architectures, high-performance web platforms, and client solutions.
        </p>
      </div>

      {/* Filter Tabs Navigation */}
      <nav className={styles.filterTabsContainer} aria-label="Experience category filtering">
        <div className={styles.filterTabsScroller}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`${styles.filterChip} ${activeFilter === tab.value ? styles.activeChip : ''}`}
              aria-pressed={activeFilter === tab.value ? 'true' : 'false'}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content Rendering */}
      {activeFilter === 'milestones' ? (
        <MilestonesView items={timeline} />
      ) : (
        <div className={styles.timeline}>
          <AnimatePresence mode="popLayout">
            {filteredExperience.map((job, idx) => (
              <ExperienceCard
                key={job.id}
                job={job}
                isLast={idx === filteredExperience.length - 1}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </SectionWrapper>
  );
}
