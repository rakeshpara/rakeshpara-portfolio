'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Projects.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Icons ───────────────────────────────────────────────────────
const ChipIcon = () => (
  <svg className={styles.chipIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" strokeLinecap="round" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className={styles.chipIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BrainIcon = () => (
  <svg className={styles.chipIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface Project {
  number: string;
  title: string;
  subtitle: string;
  badge?: string;
  tagline: string;
  description: string;
  bullets: string[];
  tags: string[];
  accent: 'orange' | 'blue';
  metric: {
    label: string;
    value: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  iconType: 'chip' | 'database' | 'brain';
}

const projectsData: Project[] = [
  {
    number: '01',
    title: 'Multi-Modal Deep Learning for Elderly Smart Home Control',
    subtitle: 'Research · GITAM University · 2026',
    badge: 'Research · GITAM University · 2026',
    tagline: 'DEEP LEARNING · IoT · REINFORCEMENT LEARNING',
    description:
      'Offline gesture-based home control system — no internet, no wearables, no voice required. Built for elderly users with mobility and speech impairments.',
    bullets: [
      'Designed a custom CNN + MediaPipe preprocessing pipeline for 4 gestures, improving accuracy from 72.5% to 99.92%.',
      'Evaluated 5 models (VGG16, MobileNets, EfficientNet, DenseNet121) selecting DenseNet121 for edge deployment.',
      'Integrated Q-learning agent (128 discrete states) for personalized IoT actuation via ESP32 microcontrollers.'
    ],
    tags: ['DENSENET121', 'MEDIAPIPE', 'Q-LEARNING', 'RASPBERRY PI 4', 'ESP32', 'TENSORFLOW', 'OPENCV'],
    accent: 'orange',
    metric: {
      label: 'GESTURE ACCURACY',
      value: '99.92%'
    },
    githubUrl: 'https://github.com/rakeshpara/multi-modal-deep-learning-for-personalized-ai-agents-smart-home',
    caseStudyUrl: '/projects/gesture-smart-home',
    iconType: 'chip'
  },
  {
    number: '02',
    title: 'QCommerce Analytics Intelligence Platform',
    subtitle: 'Personal Project · Data Engineering · 2025',
    badge: 'Personal Project · Data Engineering · 2025',
    tagline: 'DATA WAREHOUSING · BUSINESS INTELLIGENCE · ETL',
    description:
      'End-to-end data engineering and BI platform simulating a Blinkit/Zepto-style quick commerce ecosystem — built entirely from scratch for personal learning and portfolio depth.',
    bullets: [
      'Architected a Constellation Schema on Snowflake (AWS) processing 60,382 orders, 397,884 inventory records, and $29.3M in modeled revenue',
      'Built a 3-phase Python ETL pipeline and 6 SQL analytical views feeding a 4-page Power BI executive dashboard with DAX queries',
      'Developed a Streamlit intelligence layer with live Snowflake KPIs, Z-score anomaly detection, and a 3-scenario What-If revenue simulator'
    ],
    tags: ['SNOWFLAKE', 'PYTHON', 'POWER BI', 'STREAMLIT', 'SQL', 'PANDAS', 'SCIPY', 'DAX'],
    accent: 'orange',
    metric: {
      label: 'REVENUE MODELED',
      value: '$29.3M'
    },
    githubUrl: 'https://github.com/rakeshpara/qcommerce-analytics-platform',
    caseStudyUrl: '/projects/qcommerce-analytics',
    iconType: 'database'
  },
  {
    number: '03',
    title: 'Handwritten Digit Recognizer with Real-Time GUI',
    subtitle: 'Mini Project · GITAM University · 2025',
    badge: 'Mini Project · GITAM University · 2025',
    tagline: 'COMPUTER VISION · CNN · REAL-TIME DEPLOYMENT',
    description:
      'Full model-to-application deep learning deployment — CNN trained on MNIST to 99.17% accuracy, deployed inside a live Tkinter desktop interface where users draw digits and get instant predictions.',
    bullets: [
      'Built a custom CNN in TensorFlow/Keras achieving 99.17% test accuracy on 10,000 unseen MNIST images across 10 epochs',
      'Engineered a real-time preprocessing pipeline — grayscale inversion, noise thresholding, bounding box crop, proportional resize, 28×28 centering — bridging the gap between free-hand drawings and MNIST format',
      'Deployed the trained model inside a Tkinter desktop GUI with live canvas drawing, instant prediction, and confidence score display'
    ],
    tags: ['TENSORFLOW', 'KERAS', 'CNN', 'TKINTER', 'NUMPY', 'PILLOW', 'PYTHON'],
    accent: 'orange',
    metric: {
      label: 'MNIST TEST ACCURACY',
      value: '99.17%'
    },
    githubUrl: 'https://github.com/pararakesh',
    caseStudyUrl: '/projects/digit-recognizer',
    iconType: 'brain'
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade and slide up header
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

    // Fade and slide up project cards with stagger
    const cards = gridRef.current!.children;
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  const renderIcon = (type: 'chip' | 'database' | 'brain') => {
    switch (type) {
      case 'chip':
        return <ChipIcon />;
      case 'database':
        return <DatabaseIcon />;
      case 'brain':
        return <BrainIcon />;
    }
  };

  return (
    <section id="projects" ref={containerRef} className={styles.projects}>
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <p className={styles.tagline}>Selected Work</p>
        <h2 className={styles.heading}>Projects</h2>
      </div>

      {/* Grid */}
      <div ref={gridRef} className={styles.grid}>
        {projectsData.map((project) => {
          const accentClass = project.accent === 'orange' ? styles.accentOrange : styles.accentBlue;
          const cardClass = `${styles.card} ${styles.featured} ${accentClass}`;

          return (
            <div key={project.number} className={cardClass}>
              {/* Top border ambient element */}
              <div className={styles.borderGlow} />

              <div className={styles.featuredLayout}>
                {/* Left Column - Details */}
                <div className={styles.featuredLeft}>
                  <div className={styles.cardHeader}>
                    <span className={styles.number}>{project.number}</span>
                    <div className={styles.taglineWrapper}>
                      <span className={styles.featuredTagline}>{project.tagline}</span>
                      {renderIcon(project.iconType)}
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <h4 className={styles.projectSubtitle}>{project.badge || project.subtitle}</h4>
                    <p className={styles.description}>{project.description}</p>

                    <ul className={styles.bulletsList}>
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={styles.bulletItem}>
                          <span className={styles.bulletDot}>•</span>
                          <span className={styles.bulletText}>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {project.caseStudyUrl && (
                      <a href={project.caseStudyUrl} className={styles.caseStudyBtn}>
                        View Case Study →
                      </a>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.tagsContainer}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Metrics & Buttons */}
                <div className={styles.featuredRight}>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>{project.metric.label}</span>
                    <span className={styles.metricValue}>{project.metric.value}</span>
                  </div>

                  <div className={styles.actionBtns}>
                    {project.caseStudyUrl && (
                      <a href={project.caseStudyUrl} className={styles.liveBtn}>
                        VIEW CASE STUDY →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
                        <GitHubIcon /> BROWSE SOURCE
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                        LIVE SIMULATION <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
