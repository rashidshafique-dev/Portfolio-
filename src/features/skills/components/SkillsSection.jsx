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
  Triangle,
  GitBranch,
  Container
} from 'lucide-react';
import styles from '../styles.module.css';

const SKILLS = [
  {
    category: "Core Languages",
    filter: "languages",
    items: [
      { name: "Python", desc: "Core language for backend systems, asynchronous APIs, automation, and data pipelines.", icon: "FileCode2", level: "Production" },
      { name: "C++", desc: "Low-level system architecture, algorithm efficiency, and hardware firmware (AquaSync IoT).", icon: "Cpu", level: "Systems" },
      { name: "Java", desc: "Object-oriented architecture, thread concurrency, and computational structures.", icon: "Coffee", level: "Core" },
      { name: "HTML5 & CSS3", desc: "Semantic markup, modern CSS tokens, responsive flex/grid primitives, and Web Vitals.", icon: "Globe", level: "Production" },
    ]
  },
  {
    category: "Backend & API Engineering",
    filter: "backend",
    items: [
      { name: "Django", desc: "Production Python framework with robust ORM modeling, middleware, and secure authentication.", icon: "Server", level: "Framework" },
      { name: "FastAPI", desc: "High-throughput asynchronous REST APIs with Pydantic validation and automatic OpenAPI specs.", icon: "Zap", level: "Async APIs" },
      { name: "Django REST", desc: "Custom viewsets, serializers, declarative permission policies, and token rotation.", icon: "Layers", level: "REST Architecture" },
      { name: "Node.js & Express", desc: "Event-driven asynchronous micro-services and scalable REST API endpoints.", icon: "Box", level: "Services" },
    ]
  },
  {
    category: "Frontend & UI",
    filter: "frontend",
    items: [
      { name: "React.js", desc: "Single-page application architectures, custom hooks, context controllers, and optimized render trees.", icon: "Atom", level: "Production" },
      { name: "Tailwind CSS", desc: "Rapid responsive interface construction with utility-first modern design systems.", icon: "Paintbrush", level: "Modern UI" },
      { name: "Vite", desc: "Modern frontend build tooling with hot module replacement and optimized production bundles.", icon: "Flame", level: "Build Tooling" },
      { name: "React Native", desc: "Cross-platform mobile interfaces, native device bridges, and Expo workflow management.", icon: "Component", level: "Mobile" },
    ]
  },
  {
    category: "Databases & Auth",
    filter: "database",
    items: [
      { name: "PostgreSQL", desc: "Normalized relational schema modeling, composite B-tree indexing, and query optimization.", icon: "Database", level: "Relational DB" },
      { name: "JWT & OAuth 2.0", desc: "Stateless authentication, single-use token rotation queues, and Google SSO integrations.", icon: "KeyRound", level: "Security" },
      { name: "Supabase & Firebase", desc: "Cloud database architectures, real-time subscriptions, and managed auth infrastructure.", icon: "ShieldCheck", level: "Cloud DB" },
    ]
  },
  {
    category: "DevOps & Tools",
    filter: "devops",
    items: [
      { name: "Git & GitHub", desc: "Version control workflows, trunk-based development, pull request reviews, and CI automation.", icon: "GitBranch", level: "Workflows" },
      { name: "Vercel & Railway", desc: "Automated continuous deployment pipelines with zero-downtime production rollouts.", icon: "Triangle", level: "CI/CD Cloud" },
      { name: "Linux & Bash", desc: "Command-line environments, automated shell scripts, system crons, and daemon management.", icon: "Container", level: "Systems" },
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
  Triangle,
  GitBranch,
  Container
};

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const FILTER_CHIPS = [
    { label: "All Skills", value: "all" },
    { label: "Languages", value: "languages" },
    { label: "Backend & APIs", value: "backend" },
    { label: "Frontend & UI", value: "frontend" },
    { label: "Databases & Auth", value: "database" },
    { label: "DevOps & Tools", value: "devops" }
  ];

  // Filter skills based on active filter
  const filteredCategories = activeFilter === "all"
    ? SKILLS
    : SKILLS.filter(cat => cat.filter === activeFilter);

  return (
    <section className={styles.section} id="skills">
      <div className="container">

        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>TECHNICAL STACK</span>
          <h2 className={styles.title}>Skills & Technologies</h2>
          <p className={styles.subtitle}>
            Production technologies and frameworks engineered across full-stack systems.
          </p>
        </div>

        {/* Filter Chips */}
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
              {activeFilter === "all" && (
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
                        {/* Header: Clean Icon + Technology name */}
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <IconComponent size={18} strokeWidth={1.8} aria-hidden="true" />
                          </div>
                          <div className={styles.nameBlock}>
                            <span className={styles.skillName}>{skill.name}</span>
                            {skill.level && (
                              <span className={styles.skillBadge}>{skill.level}</span>
                            )}
                          </div>
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
