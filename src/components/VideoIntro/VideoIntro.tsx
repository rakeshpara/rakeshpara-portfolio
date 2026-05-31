'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';

// ── SVG Icons ──────────────────────────────────────────────────
const SoundOnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SoundOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────
export default function VideoIntro({ onVideoEnded }: { onVideoEnded?: () => void }) {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const taglineRef = useRef<HTMLParagraphElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Unmute on first user interaction (bypasses browser autoplay restrictions)
  useEffect(() => {
    const unmute = () => {
      const v = mainVideoRef.current;
      if (v && v.muted) {
        v.muted = false;
        setIsMuted(false);
      }
      window.removeEventListener('click', unmute);
      window.removeEventListener('keydown', unmute);
      window.removeEventListener('scroll', unmute);
      window.removeEventListener('touchstart', unmute);
    };

    window.addEventListener('click', unmute, { passive: true });
    window.addEventListener('keydown', unmute, { passive: true });
    window.addEventListener('scroll', unmute, { passive: true });
    window.addEventListener('touchstart', unmute, { passive: true });

    return () => {
      window.removeEventListener('click', unmute);
      window.removeEventListener('keydown', unmute);
      window.removeEventListener('scroll', unmute);
      window.removeEventListener('touchstart', unmute);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(taglineRef.current, {
      opacity: 1, y: 0, duration: 1.0,
      ease: 'power3.out',
    })
      .to(firstNameRef.current, {
        opacity: 1, y: 0, duration: 1.1,
        ease: 'power3.out',
      }, '-=0.5')
      .to(lastNameRef.current, {
        opacity: 1, y: 0, duration: 1.1,
        ease: 'power3.out',
      }, '-=0.75')
      .to(dividerRef.current, {
        opacity: 1, scaleX: 1, duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      .to(roleRef.current, {
        opacity: 1, y: 0, duration: 1.0,
        ease: 'power3.out',
      }, '-=0.4')
      .to(scrollIndicatorRef.current, {
        opacity: 1, duration: 1.2,
        ease: 'power2.out',
      }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  // Sync both videos
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
    const v = mainVideoRef.current;
    if (v) {
      v.muted = false;
      v.play()
        .then(() => {
          // Unmuted autoplay succeeded
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay with sound blocked: play muted instead
          v.muted = true;
          setIsMuted(true);
          v.play().catch(() => { });
        });
    }
    ambientRef.current?.play().catch(() => { });
  }, []);



  // Keep background and foreground videos perfectly in sync
  useEffect(() => {
    const v = mainVideoRef.current;
    const a = ambientRef.current;
    if (!v || !a) return;

    const handlePlay = () => {
      a.currentTime = v.currentTime;
      a.play().catch(() => {});
    };

    const handlePause = () => {
      a.pause();
    };

    const handleSeeking = () => {
      a.currentTime = v.currentTime;
    };

    v.addEventListener('play', handlePlay);
    v.addEventListener('pause', handlePause);
    v.addEventListener('seeking', handleSeeking);

    // Initial check: if main is already playing, sync and play ambient
    if (!v.paused) {
      a.currentTime = v.currentTime;
      a.play().catch(() => {});
    }

    return () => {
      v.removeEventListener('play', handlePlay);
      v.removeEventListener('pause', handlePause);
      v.removeEventListener('seeking', handleSeeking);
    };
  }, [videoLoaded]);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const v = mainVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const scrollToNext = useCallback(() => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        {/* Ambient blurred bg */}
        <video
          ref={ambientRef}
          className={styles.ambientBg}
          src="/hero-video.mp4"
          autoPlay
          muted
          playsInline
        />

        {/* Main foreground video */}
        <video
          ref={mainVideoRef}
          className={`${styles.mainVideo} ${videoLoaded ? styles.loaded : ''}`}
          src="/hero-video.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          onCanPlay={handleVideoLoaded}
          onEnded={onVideoEnded}
        />

        {/* Cinematic gradients */}
        <div className={styles.gradientTop} />
        <div className={styles.gradientLeft} />
        <div className={styles.gradientBottom} />
        <div className={styles.lightBleed} />



        {/* ── Portfolio Content ── */}
        <div className={styles.content}>
          <p ref={taglineRef} className={styles.tagline}>
            Data Science · AI/ML · Creative Engineering
          </p>

          <div className={styles.nameGroup}>
            <span ref={firstNameRef} className={styles.firstName}>Rakesh</span>
            <span ref={lastNameRef} className={styles.lastName}>Para</span>
          </div>

          <div ref={dividerRef} className={styles.divider} />

          <p ref={roleRef} className={styles.role}>
            M.Sc. Data Science · GITAM University<br />
            <span>AI/ML Engineer</span> · Anomaly Detection · Edge AI<br />
            IIT Bombay Research Intern
          </p>
        </div>

        {/* ── Small Sound Toggle (Bottom Right Corner) ── */}
        <button
          className={styles.soundToggle}
          onClick={toggleMute}
          data-no-transition="true"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>

        {/* ── Scroll Indicator ── */}
        <div
          ref={scrollIndicatorRef}
          className={styles.scrollIndicator}
          onClick={scrollToNext}
          role="button"
          aria-label="Scroll to next section"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && scrollToNext()}
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── Placeholder next section ── */}
      <div ref={nextSectionRef} className={styles.nextSection}>
        <p>— Portfolio continues here —</p>
      </div>
    </>
  );
}
