'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Education.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Icons ───────────────────────────────────────────────────────
const MedalIcon = () => (
  <svg className={styles.eduIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BookIcon = () => (
  <svg className={styles.eduIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = () => (
  <svg className={styles.eduIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface EducationItem {
  degree: string;
  period: string;
  school: string;
  description: string;
  icon: 'medal' | 'book' | 'users';
  bullets?: string[];
}

const educationData: EducationItem[] = [
  {
    degree: 'MASTER OF SCIENCE - DATA SCIENCE',
    period: 'AUG 2024 - APR 2026',
    school: 'GITAM DEEMED-TO-BE UNIVERSITY',
    description:
      'Specialized in deep learning model architectures, computer vision preprocessors, reinforcement learning feedback layers, and Snowflake cloud data warehouses. Graduated with CGPA: 7.62.',
    icon: 'medal',
  },
  {
    degree: 'B.SC. COMPUTER SCIENCE, STATISTICS & MATHEMATICS',
    period: 'AUG 2019 - MAR 2023',
    school: 'THE OXFORD COLLEGE OF SCIENCE',
    description:
      'Affiliated to Bangalore University. Acquired solid foundations in statistical modeling, linear algebra, mathematical distributions, and classical computer science algorithms. Graduated with CGPA: 7.23.',
    icon: 'book',
  },
  {
    degree: 'STUDENT COUNCIL MEMBER (LEADERSHIP)',
    period: 'JUN 2020 – SEP 2022',
    school: 'THE OXFORD COLLEGE OF SCIENCE',
    description:
      'Served as the primary liaison representing student interests, streamlining communication channels with the senior administration, and organizing academic symposiums.',
    icon: 'users',
    bullets: [
      'Bridged communications between 500+ undergraduate students and the academic board to resolve curriculum feedback, laboratory scheduling conflicts, and resource requests.',
      'Pioneered a statistics peer-tutoring network that lowered exam failure rates by 12% in foundational math and probability courses.',
      'Spearheaded the organization of the annual Inter-College Science and Technology Symposium, managing multi-committee team logistics, budgeting, and guest speaker scheduling.'
    ]
  },
];

export default function Education() {
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

    // Timeline line growth reveal
    const trackLine = listRef.current!.querySelector(`.${styles.trackLine}`);
    gsap.fromTo(
      trackLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 75%',
          end: 'bottom 75%',
          scrub: true,
        },
      }
    );

    // Cards and nodes reveal
    const items = listRef.current!.querySelectorAll(`.${styles.item}`);
    items.forEach((item) => {
      const card = item.querySelector(`.${styles.card}`);
      const node = item.querySelector(`.${styles.node}`);

      gsap.fromTo(
        card,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="education" ref={containerRef} className={styles.educationSection}>
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <p className={styles.tagline}>Academic Credentials</p>
        <h2 className={styles.heading}>
          Education <span className={styles.headingAccent}>History</span>
        </h2>
      </div>

      {/* List Container */}
      <div ref={listRef} className={styles.listContainer}>
        {/* Track Line */}
        <div className={styles.trackLine} style={{ transformOrigin: 'top center' }} />

        {educationData.map((item, idx) => (
          <div key={idx} className={styles.item}>
            {/* Timeline node */}
            <div className={styles.node}>
              <span className={styles.nodeDot} />
            </div>

            {/* Glass Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <div className={styles.iconWrapper}>
                    {item.icon === 'medal' ? (
                      <MedalIcon />
                    ) : item.icon === 'users' ? (
                      <UsersIcon />
                    ) : (
                      <BookIcon />
                    )}
                  </div>
                  <div>
                    <h3 className={styles.degree}>{item.degree}</h3>
                    <h4 className={styles.school}>{item.school}</h4>
                  </div>
                </div>
                <span className={styles.period}>{item.period}</span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.description}>{item.description}</p>
                {item.bullets && (
                  <ul className={styles.bulletsList}>
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.bulletItem}>
                        <span className={styles.bulletDot}>•</span>
                        <span className={styles.bulletText}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
