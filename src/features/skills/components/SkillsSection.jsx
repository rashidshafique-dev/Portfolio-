import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode2,
  Cpu,
  Coffee,
  Globe,
  Server,
  Zap,
  Box,
  Layers,
  Atom,
  Paintbrush,
  Flame,
  Component,
  Database,
  KeyRound,
  ShieldCheck,
  MemoryStick,
  Triangle,
  Train,
  GitBranch,
  Container,
  Sparkles
} from 'lucide-react';
import styles from '../styles.module.css';

const SKILLS = [
  {
    category: "Systems Engineering & Core Languages",
    filter: "languages",
    items: [
      { name: "Python", desc: "Object-oriented scripting, low-latency backends, and algorithmic workflows.", icon: "FileCode2", currentFocus: true, level: "Expert" },
      { name: "C++", desc: "High-performance systems programming and algorithm optimization.", icon: "Cpu", level: "Proficient" },
      { name: "Java", desc: "Enterprise architecture fundamentals and OOP design patterns.", icon: "Coffee", level: "Proficient" },
      { name: "HTML5 & CSS3", desc: "Semantic DOM structure and modern responsive styling architectures.", icon: "Globe", level: "Expert" },
    ]
  },
  {
    category: "Distributed Systems & API Engineering",
    filter: "backend",
    items: [
      { name: "Django", desc: "Enterprise Python web framework with ORM and secure session management.", icon: "Server", currentFocus: true, level: "Expert" },
      { name: "FastAPI", desc: "Asynchronous, high-throughput REST APIs with automatic OpenAPI docs.", icon: "Zap", level: "Expert" },
      { name: "Django REST", desc: "Stateless REST API layers, serializer validations, and permission classes.", icon: "Layers", currentFocus: true, level: "Expert" },
      { name: "Node.js & Express", desc: "Event-driven asynchronous microservices and API gateways.", icon: "Box", level: "Proficient" },
    ]
  },
  {
    category: "User Interface & Experience",
    filter: "frontend",
    items: [
      { name: "React.js", desc: "Component architectures, state management hooks, and Virtual DOM workflows.", icon: "Atom", currentFocus: true, level: "Expert" },
      { name: "Tailwind CSS", desc: "Utility-first design tokens and responsive layout systems.", icon: "Paintbrush", level: "Expert" },
      { name: "Vite", desc: "Next-generation frontend tooling and optimized production bundling.", icon: "Flame", level: "Proficient" },
      { name: "React Native", desc: "Cross-platform mobile application development for Android and iOS.", icon: "Component", level: "Proficient" },
    ]
  },
  {
    category: "Data Architecture & Storage",
    filter: "database",
    items: [
      { name: "PostgreSQL", desc: "Relational database modeling, B-tree indexing, and ACID transaction safety.", icon: "Database", currentFocus: true, level: "Expert" },
      { name: "JWT & OAuth", desc: "Stateless authentication, token auto-rotation, and SSO integration.", icon: "KeyRound", level: "Expert" },
      { name: "Supabase & Firebase", desc: "Real-time database sync, cloud storage, and managed auth services.", icon: "ShieldCheck", level: "Proficient" },
    ]
  },
  {
    category: "DevOps & Automated Deployment",
    filter: "devops",
    items: [
      { name: "Git & GitHub", desc: "Distributed version control, branch workflows, and PR code reviews.", icon: "GitBranch", currentFocus: true, level: "Expert" },
      { name: "Vercel & Railway", desc: "Automated CI/CD deployment pipelines and edge runtime hosting.", icon: "Triangle", level: "Proficient" },
      { name: "Linux & Bash", desc: "Server administration, cron automation, and shell scripting.", icon: "Container", level: "Proficient" },
    ]
  }
];

const ICON_MAP = {
  FileCode2,
  Cpu,
  Coffee,
  Globe,
  Server,
  Zap,
  Box,
  Layers,
  Atom,
  Paintbrush,
  Flame,
  Component,
  Database,
  KeyRound,
  ShieldCheck,
  MemoryStick,
  Triangle,
  Train,
  GitBranch,
  Container,
  Sparkles
};

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const FILTER_CHIPS = [
    { label: "All", value: "all" },
    { label: "Current Focus", value: "focus" },
    { label: "Languages", value: "languages" },
    { label: "Backend", value: "backend" },
    { label: "UI/UX", value: "frontend" },
    { label: "Data & Storage", value: "database" },
    { label: "DevOps", value: "devops" }
  ];

  // Filter skills based on active filter
  const filteredCategories = activeFilter === "all"
    ? SKILLS
    : activeFilter === "focus"
      ? SKILLS.map(cat => ({
          ...cat,
          items: cat.items.filter(item => item.currentFocus)
        })).filter(cat => cat.items.length > 0)
      : SKILLS.filter(cat => cat.filter === activeFilter);

  return (
    <section className={styles.section} id="skills">
      <div className="container">
        
        {/* Section Header — Clean, single concise statement */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>TECHNICAL STACK</span>
          <h2 className={styles.title}>Skills & Technologies</h2>
          <p className={styles.subtitle}>
            Production-grade backend architectures, distributed data pipelines, and responsive frontend systems.
          </p>
        </div>

        {/* Filter Chips — Subtler borders and cleaner active states */}
        <nav className={styles.filterTabsContainer} aria-label="Skills category filtering">
          <div className={styles.filterTabsScroller}>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setActiveFilter(chip.value)}
                className={`${styles.filterChip} ${activeFilter === chip.value ? styles.activeChip : ''}`}
                aria-pressed={activeFilter === chip.value ? "true" : "false"}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Categories / Grid */}
        <div className={styles.categoriesWrapper}>
          {filteredCategories.map((categoryGroup) => (
            <div key={categoryGroup.filter} className={styles.categorySection}>
              {/* Show category label when activeFilter is "all" or "focus" */}
              {(activeFilter === "all" || activeFilter === "focus") && (
                <h3 className={styles.categoryLabel}>
                  {categoryGroup.category}
                </h3>
              )}
              
              <div className={styles.grid}>
                <AnimatePresence mode="popLayout">
                  {categoryGroup.items.map((skill) => {
                    const IconComponent = ICON_MAP[skill.icon] || Globe;
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
                        key={skill.name} 
                        className={styles.skillCard}
                      >
                        {/* Header: Subtle icon + Technology name + Proficiency */}
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <IconComponent size={16} strokeWidth={1.75} aria-hidden="true" />
                          </div>
                          <div className={styles.nameBlock}>
                            <span className={styles.skillName}>{skill.name}</span>
                            <span className={styles.skillLevel}>&bull; {skill.level}</span>
                          </div>
                          {skill.currentFocus && (
                            <span className={styles.focusPill}>Primary</span>
                          )}
                        </div>

                        {/* Concise Engineering Description */}
                        <p className={styles.skillDesc}>
                          {skill.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
