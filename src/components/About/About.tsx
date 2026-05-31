'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './About.module.css';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  // GSAP animations for About entrance reveals
  useGSAP(() => {
    if (!containerRef.current) return;

    // Entrance animation for content
    gsap.fromTo(
      leftColRef.current!.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className={styles.about}>
      <div className={styles.container}>
        {/* Bio Text Content Container */}
        <div ref={leftColRef} className={styles.leftColumn}>
          <p className={styles.tagline}>Crafting intelligence from data</p>
          <h2 className={styles.heading}>About Me</h2>
          
          <div className={styles.bio}>
            <p>
              I&apos;m a Data Scientist and AI/ML Engineer based in Hyderabad,
              India — passionate about building systems that see, understand,
              and decide. My work lives at the intersection of deep learning,
              edge deployment, and real-world impact.
            </p>
            <p>
              I completed my M.Sc. in Data Science from GITAM University
              in 2026, and prior to that a B.Sc. in Computer Science,
              Statistics & Mathematics from Bangalore University. I&apos;ve
              spent time doing research at IIT Bombay, building anomaly
              detection pipelines using autoencoders, VAE, SVDD, and
              OC-NN on the MVTec AD dataset.
            </p>
            <p>
              When I&apos;m not training models, I&apos;m deploying them — on
              Raspberry Pi 4, ESP32, and anywhere else that pushes the
              limits of edge AI. I believe the best ML engineer is also
              a great engineer, full stop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
