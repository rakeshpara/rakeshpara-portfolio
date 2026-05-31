'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Left Column items entrance fade and slide-in
    gsap.fromTo(
      leftColRef.current!.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.4,
      }
    );

    // Right Column Portrait fade and scale-in
    gsap.fromTo(
      rightColRef.current!,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.6,
      }
    );
  }, { scope: containerRef });

  const handleScrollToSection = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" ref={containerRef} className={styles.hero}>
      {/* Visual Ambient Light Spec Background Overlay */}
      <div className={styles.ambientOverlay} />

      <div className={styles.container}>
        {/* LEFT COLUMN — Details Text */}
        <div ref={leftColRef} className={styles.leftColumn}>
          <div className={styles.taglineWrapper}>
            <span className={styles.taglineLine} />
            <span className={styles.tagline}>ENGINEERING AUTONOMOUS INTELLIGENCE</span>
          </div>

          <h1 className={styles.title}>
            RAKESH<br />
            <span className={styles.titleAccent}>PARA</span>
            <span className={styles.titleDot}>.</span>
          </h1>

          <h2 className={styles.subheading}>AI Data Scientist & Analytics Architect</h2>

          <p className={styles.description}>
            M.Sc. Data Science professional from GITAM University (2026) specializing
            in deep learning, computer vision, reinforcement learning, and cloud analytics.
            Bridging the gap between complex mathematical models and scalable edge/cloud production architectures.
          </p>

          <div className={styles.buttonGroup}>
            <button
              className={styles.primaryBtn}
              onClick={(e) => handleScrollToSection(e, 'projects')}
            >
              VIEW PROJECTS
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={(e) => handleScrollToSection(e, 'contact')}
            >
              HIRE ME
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — Portrait Image */}
        <div className={styles.rightColumn}>
          <div ref={rightColRef} className={styles.imageFrame}>
            <Image
              src="/rakesh-portrait.jpeg"
              alt="Para Rakesh Portrait"
              width={420}
              height={460}
              className={styles.portrait}
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Downward indicator arrow */}
      <div 
        className={styles.scrollArrow}
        onClick={(e) => {
          const target = document.getElementById('about');
          target?.scrollIntoView({ behavior: 'smooth' });
        }}
        role="button"
        aria-label="Scroll to About Section"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="19 12 12 19 5 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
