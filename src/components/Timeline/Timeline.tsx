'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Timeline.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  location?: string;
  description: string;
  tag: string;
  highlight?: boolean;
  side: 'left' | 'right';
  bullets?: string[];
  skills?: string[];
}

const timelineData: TimelineEntry[] = [
  {
    period: 'MAY 2025 – AUG 2025',
    role: 'Research Intern - ML-Based Automated Inspection',
    org: 'IIT Bombay',
    location: 'Mumbai, India (Remote)',
    description:
      'Collaborated on industrial inspection pipelines using unsupervised deep learning and computer vision architectures, developing robust benchmark models to parse high-dimensional manufacturing datasets.',
    tag: 'Research',
    highlight: true,
    side: 'left',
    bullets: [
      'Implemented a Deep Autoencoder Neural Network (DANN) + SMOTE hybrid pipeline for unsupervised anomaly detection on high-dimensional industrial gas turbine data (87,620 features, 56 rows), achieving 99.40% accuracy, a perfect F1-score of 0.9649, and an Area Under Curve (AUC) of 0.981 using the Adamax optimizer.',
      'Systematically benchmarked four optimizers (Adam, SGD, RMSprop, Adamax), identifying Adamax as optimal due to infinity-norm gradient scaling which stabilized weight adjustments across highly sparse features.',
      'Applied Synthetic Minority Over-sampling Technique (SMOTE) to address class imbalance, establishing a reconstruction boundary between normal and anomalous patterns within the autoencoder latent space.',
      'Conducted an in-depth literature synthesis of 15+ state-of-the-art one-class defect detection frameworks: PaDiM (Patch Distribution Modeling via multivariate Gaussians), PatchCore (coreset memory banks for sample efficiency), DRAEM (Discriminative Reconstruction Autoencoders using synthetic defect noise), and Normalizing Flow density estimation (FastFlow).',
      'Evaluated performance using AUROC, AUPRO (Area Under Pixel-level Recall-threshold Curve), AUPRC, and pixel-level F1 metrics, ensuring rigorous and bias-free evaluation protocols suitable for real-world manufacturing pipelines.'
    ],
    skills: [
      'DEEP AUTOENCODERS',
      'SMOTE',
      'COMPUTER VISION',
      'MVTEC AD',
      'ADAMAX',
      'SCIPY',
      'NORMALIZING FLOWS'
    ]
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header reveal
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

    // Cards reveal
    const cards = listRef.current!.querySelectorAll(`.${styles.card}`);
    gsap.fromTo(
      cards,
      { y: 55, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className={styles.timelineSection}>
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <p className={styles.tagline}>The Journey</p>
        <h2 className={styles.heading}>Experience</h2>
      </div>

      {/* List Container */}
      <div ref={listRef} className={styles.listContainer}>
        {timelineData.map((entry, idx) => {
          const highlightClass = entry.highlight ? styles.cardHighlight : '';

          return (
            <div key={idx} className={`${styles.card} ${highlightClass}`}>
              <div className={styles.cardHeader}>
                <span className={styles.period}>{entry.period}</span>
                <span className={styles.badge}>{entry.tag}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.role}>{entry.role}</h3>
                <h4 className={styles.org}>
                  {entry.org}
                  {entry.location && <span className={styles.location}> · {entry.location}</span>}
                </h4>
                <p className={styles.description}>{entry.description}</p>

                {entry.bullets && (
                  <ul className={styles.bulletsList}>
                    {entry.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.bulletItem}>
                        <span className={styles.bulletDot}>•</span>
                        <span className={styles.bulletText}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.skills && (
                  <div className={styles.skillsTags}>
                    {entry.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
