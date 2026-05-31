'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Skills.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CategoriesData {
  'AI & Machine Learning': string[];
  'Data Science': string[];
  'Engineering & Deployment': string[];
  'Web & Frontend': string[];
}

type Categories = keyof CategoriesData;

const skillsData: CategoriesData = {
  'AI & Machine Learning': [
    'Python',
    'PyTorch',
    'TensorFlow',
    'Scikit-learn',
    'Deep Learning',
    'Anomaly Detection',
  ],
  'Data Science': [
    'Pandas / NumPy',
    'Data Analysis',
    'Statistics',
    'SQL',
    'Visualization',
    'Feature Eng.',
  ],
  'Engineering & Deployment': [
    'Edge AI / IoT',
    'Raspberry Pi',
    'Git / GitHub',
    'REST APIs',
    'Google Apps Script',
    'Linux / Bash',
  ],
  'Web & Frontend': [
    'React / Next.js',
    'JavaScript',
    'Three.js',
    'CSS Modules',
    'HTML',
  ],
};

const categoriesList: Categories[] = [
  'AI & Machine Learning',
  'Data Science',
  'Engineering & Deployment',
  'Web & Frontend',
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Categories>('AI & Machine Learning');
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Entrance animations for headers and tabs
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      headerRef.current!.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Only animate desktop tabs if visible
    if (tabsRef.current && tabsRef.current.children.length > 0) {
      gsap.fromTo(
        tabsRef.current.children,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: containerRef });

  // Skill cards reveal on active category switch (desktop only)
  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.skillCard}`);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [activeCategory]);

  return (
    <section id="skills" ref={containerRef} className={styles.skills}>
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <p className={styles.tagline}>Technical Arsenal</p>
        <h2 className={styles.heading}>Skills</h2>
      </div>

      <div className={styles.gridContainer}>
        {/* DESKTOP LAYOUT (Visible only on desktop) */}
        <div className={styles.desktopLayout}>
          <div ref={tabsRef} className={styles.tabsContainer}>
            {categoriesList.map((category) => (
              <button
                key={category}
                className={`${styles.tabBtn} ${activeCategory === category ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <span className={styles.tabDot} />
                {category}
              </button>
            ))}
          </div>

          <div ref={gridRef} className={styles.skillsList}>
            {skillsData[activeCategory || 'AI & Machine Learning'].map((skillName) => (
              <div key={skillName} className={styles.skillCard}>
                <span className={styles.skillIcon} />
                <span className={styles.skillName}>{skillName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE & TABLET ACCORDION LAYOUT (Visible only on mobile/tablet) */}
        <div className={styles.accordionContainer}>
          {categoriesList.map((category) => {
            const isActive = activeCategory === category;
            return (
              <div key={category} className={styles.accordionGroup}>
                <button
                  className={`${styles.accordionHeader} ${isActive ? styles.accordionHeaderActive : ''}`}
                  onClick={() => setActiveCategory(isActive ? '' as any : category)}
                  aria-expanded={isActive}
                >
                  <span className={styles.accordionTitle}>
                    <span className={`${styles.tabDot} ${isActive ? styles.tabDotActive : ''}`} />
                    {category}
                  </span>
                  <svg
                    className={`${styles.accordionArrow} ${isActive ? styles.arrowOpen : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div className={`${styles.accordionContent} ${isActive ? styles.contentOpen : ''}`}>
                  <div className={styles.accordionGrid}>
                    {skillsData[category].map((skillName) => (
                      <div key={skillName} className={styles.skillCard}>
                        <span className={styles.skillIcon} />
                        <span className={styles.skillName}>{skillName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
