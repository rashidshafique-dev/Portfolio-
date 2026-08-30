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
    category: "Core Languages",
    filter: "languages",
    items: [
      { name: "Python", desc: "My main language. I use it for backends, APIs, automation scripts, and data projects.", icon: "FileCode2", currentFocus: true, level: "Expert" },
      { name: "C++", desc: "Used in coursework and for the AquaSync IoT project (Arduino firmware).", icon: "Cpu", level: "Familiar" },
      { name: "Java", desc: "Covered in university. Good for understanding OOP and data structures concepts.", icon: "Coffee", level: "Familiar" },
      { name: "HTML5 & CSS3", desc: "I write clean HTML and CSS by hand — no generated code, proper structure.", icon: "Globe", level: "Expert" },
    ]
  },
  {
    category: "Backend & API Engineering",
    filter: "backend",
    items: [
      { name: "Django", desc: "My go-to Python framework. ORM, auth, REST APIs — I know it well.", icon: "Server", currentFocus: true, level: "Expert" },
      { name: "FastAPI", desc: "For async APIs that need to be fast. Auto-docs are a nice bonus.", icon: "Zap", level: "Expert" },
      { name: "Django REST", desc: "Serializers, viewsets, permissions — I use DRF on all my Django projects.", icon: "Layers", currentFocus: true, level: "Expert" },
      { name: "Node.js & Express", desc: "Used it on a few projects. Comfortable enough for simple REST APIs.", icon: "Box", level: "Proficient" },
    ]
  },
  {
    category: "Frontend & UI",
    filter: "frontend",
    items: [
      { name: "React.js", desc: "My main frontend tool. Hooks, state management, component patterns — daily use.", icon: "Atom", currentFocus: true, level: "Expert" },
      { name: "Tailwind CSS", desc: "Great for moving fast. I use it when I don't need fine-grained control.", icon: "Paintbrush", level: "Expert" },
      { name: "Vite", desc: "My build tool of choice — fast dev server, clean production builds.", icon: "Flame", level: "Proficient" },
      { name: "React Native", desc: "Built cross-platform mobile apps with it. Comfortable with Expo workflow.", icon: "Component", level: "Proficient" },
    ]
  },
  {
    category: "Databases & Auth",
    filter: "database",
    items: [
      { name: "PostgreSQL", desc: "Relational DB I use most. I care about schema design and proper indexing.", icon: "Database", currentFocus: true, level: "Expert" },
      { name: "JWT & OAuth", desc: "Handled auth on every project — token rotation, blacklisting, Google OAuth.", icon: "KeyRound", level: "Expert" },
      { name: "Supabase & Firebase", desc: "For projects that need real-time data or quick managed auth setup.", icon: "ShieldCheck", level: "Proficient" },
    ]
  },
  {
    category: "DevOps & Tools",
    filter: "devops",
    items: [
      { name: "Git & GitHub", desc: "Use it every day. Branching, PRs, conflict resolution — comfortable with it all.", icon: "GitBranch", currentFocus: true, level: "Expert" },
      { name: "Vercel & Railway", desc: "Where I deploy. Both are fast to set up and reliable for personal projects.", icon: "Triangle", level: "Proficient" },
      { name: "Linux & Bash", desc: "I work in Linux terminals, write shell scripts, and set up cron jobs.", icon: "Container", level: "Proficient" },
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
    { label: "Primary Stack", value: "focus" },
    { label: "Familiar (Academic)", value: "familiar" },
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
      : activeFilter === "familiar"
        ? SKILLS.map(cat => ({
            ...cat,
            items: cat.items.filter(item => item.level === "Familiar")
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
            Python backends, React frontends, and data-driven tools — built and deployed.
          </p>
        </div>

        {/* Level Legend */}
        <div className={styles.levelLegend}>
          <span className={styles.legendItem}><span className={styles.legendDotCore} /> Core Stack</span>
          <span className={styles.legendItem}><span className={styles.legendDotProficient} /> Proficient</span>
          <span className={styles.legendItem}><span className={styles.legendDotFamiliar} /> Familiar (Academic)</span>
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
                          {!skill.currentFocus && skill.level === "Familiar" && (
                            <span className={styles.familiarPill}>Academic</span>
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
