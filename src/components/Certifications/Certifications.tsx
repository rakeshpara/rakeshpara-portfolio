'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Certifications.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Icons ───────────────────────────────────────────────────────
const AwardIcon = () => (
  <svg className={styles.awardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="8 12 11 15 16 10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Card reveal
    gsap.fromTo(
      contentRef.current!,
      { y: 55, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="certifications" ref={containerRef} className={styles.certSection}>
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <p className={styles.tagline}>Professional Training</p>
        <h2 className={styles.heading}>Certifications</h2>
      </div>

      {/* Content Container */}
      <div ref={contentRef} className={styles.content}>
        {/* Glass Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.titleGroup}>
              <div className={styles.iconWrapper}>
                <AwardIcon />
              </div>
              <div>
                <h3 className={styles.degree}>JAVA FULL STACK DEVELOPMENT</h3>
                <h4 className={styles.school}>JSPIDERS TRAINING INSTITUTE</h4>
              </div>
            </div>
            <span className={styles.period}>MAR 2023 – DEC 2023</span>
          </div>

          <div className={styles.cardBody}>
            <p className={styles.description}>
              Completed intensive, industry-aligned training focused on object-oriented programming
              paradigms, relational database integrations, schema modeling, MVC architectures,
              and full stack deployment workflows.
            </p>

            {/* Curriculum Focus Grid */}
            <div className={styles.curriculumSection}>
              <h4 className={styles.curriculumTitle}>CURRICULUM FOCUS:</h4>
              <div className={styles.curriculumGrid}>
                {/* Column 1 */}
                <div className={styles.gridColumn}>
                  <div className={styles.bulletItem}>
                    <CheckCircleIcon />
                    <span className={styles.bulletText}>Core & Advanced Java</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircleIcon />
                    <span className={styles.bulletText}>Spring Framework & Hibernate ORM</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircleIcon />
                    <span className={styles.bulletText}>Web Application Technologies (HTML/CSS/JS)</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className={styles.gridColumn}>
                  <div className={styles.bulletItem}>
                    <CheckCircleIcon />
                    <span className={styles.bulletText}>J2EE Architecture & Web Servlets</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircleIcon />
                    <span className={styles.bulletText}>SQL Databases & Schema Designing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
