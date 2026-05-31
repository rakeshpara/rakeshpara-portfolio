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
  iconType: 'chip' | 'database' | 'brain';
}

const projectsData: Project[] = [
  {
    number: '01',
    title: 'GESTURE SMART HOME - DL & IOT',
    subtitle: 'Edge AI Platform',
    tagline: 'DEEP LEARNING • IOT • RL',
    description:
      'Co-led the research and implementation of an edge-deployed artificial intelligence platform aimed at assisting elderly and mobility-impaired individuals with voice-free, offline home appliance control.',
    bullets: [
      'Engineered a MediaPipe preprocessing pipeline extracting 21 hand landmarks and applying a 20% padded bounding box crop, raising EfficientNetB0 classification accuracy from 72.5% to 98% with zero changes to model weights.',
      'Trained and evaluated five CNN architectures, selecting DenseNet121 (99.92% test accuracy, perfect F1-score) for final deployment on a Raspberry Pi 4 due to its dense connectivity that maximizes fine-grained finger curvature feature reuse.',
      'Designed a Q-learning agent with a 128-state discrete space (gesture state, PIR sensor value, temperature, proximity boundaries) using Bellman equation updates to learn personalized, energy-efficient device behaviors over time.',
      'Programmed an ESP32 microcontroller in C (Arduino) to poll ultrasonic (HC-SR04), motion (PIR HC-SR501), and temperature (DHT11) sensors, handling real-time appliance switching via multi-channel relay modules.'
    ],
    tags: ['DENSENET121', 'MEDIAPIPE LANDMARKS', 'Q-LEARNING (RL)', 'RASPBERRY PI 4', 'ESP32 NODE', 'TENSORFLOW/KERAS', 'OPENCV'],
    accent: 'orange',
    metric: {
      label: 'MODEL GESTURE ACCURACY',
      value: '99.93%'
    },
    githubUrl: 'https://github.com/pararakesh',
    // liveUrl: 'https://github.com/pararakesh',
    iconType: 'chip'
  },
  {
    number: '02',
    title: 'QCOMMERCE ANALYTICS INTELLIGENCE PLATFORM',
    subtitle: 'Business Intelligence & Data Warehousing',
    tagline: 'DATA WAREHOUSING • BI • ETL',
    description:
      'Architected an end-to-end data engineering and business intelligence platform simulating a high-throughput quick-commerce ecosystem processing 60,382 orders, 18,479 customers, and $29.3M in revenue.',
    bullets: [
      'Designed a Constellation Schema data warehouse on Snowflake (AWS) featuring two fact tables (FACT_ORDERS and FACT_INVENTORY, totaling 397,884 records) and four dimensions, optimized via six SQL analytical Views.',
      'Created a three-phase Python ETL pipeline utilizing Pandas and openpyxl to clean, transform, and load raw source spreadsheets into Snowflake schemas.',
      'Developed a 4-page Power BI executive dashboard driven by DAX queries, visualizing delivery performance metrics, stocking risks, and customer segmentation patterns.',
      'Constructed a Streamlit web portal querying Snowflake live KPIs, using SciPy Z-score limits (threshold = 2.0) to auto-flag inventory stockout risks and revenue anomalies, and built a scenario-based What-If Simulator.'
    ],
    tags: ['SNOWFLAKE (AWS)', 'PYTHON', 'SQL VIEWS', 'POWER BI (DAX)', 'STREAMLIT FRAMEWORK', 'SCIPY Z-SCORE', 'OPENPYXL'],
    accent: 'blue',
    metric: {
      label: 'REVENUE MODELED',
      value: '$29.3M'
    },
    githubUrl: 'https://github.com/pararakesh',
    //liveUrl: 'https://github.com/pararakesh',
    iconType: 'database'
  },
  {
    number: '03',
    title: 'HANDWRITTEN DIGIT RECOGNIZER - CNN',
    subtitle: 'Deep Learning Deployment',
    tagline: 'COMPUTER VISION • CNN',
    description:
      'Developed a full model-to-application deep learning deployment demonstrating convolutional neural network design and real-time user-drawn image preprocessors.',
    bullets: [
      'Constructed a custom CNN architecture using TensorFlow and Keras, employing alternating Conv2D filters, MaxPool pooling layers, and Dropout regularization, achieving 99.17% test accuracy on the MNIST dataset.',
      'Engineered an OpenCV drawing preprocessor that captures desktop canvas inputs, applying grayscale inversion, noise threshold limits (cutoff < 30), and proportional thumbnail resizing.',
      'Centered the output canvas in a 28x28 bounding box to match MNIST parameters, resolving prediction drift issues when users draw off-center characters.',
      'Deployed the model inside a Tkinter-based desktop interface to display prediction probabilities and draw confidence indicators in real time.'
    ],
    tags: ['TENSORFLOW', 'KERAS', 'OPENCV', 'TKINTER GUI', 'NUMPY', 'GRAYSCALE INVERSION'],
    accent: 'orange',
    metric: {
      label: 'MNIST TEST ACCURACY',
      value: '99.17%'
    },
    githubUrl: 'https://github.com/pararakesh',
    // liveUrl: 'https://github.com/pararakesh',
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
                    <h4 className={styles.projectSubtitle}>{project.subtitle}</h4>
                    <p className={styles.description}>{project.description}</p>

                    <ul className={styles.bulletsList}>
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={styles.bulletItem}>
                          <span className={styles.bulletDot}>•</span>
                          <span className={styles.bulletText}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
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
