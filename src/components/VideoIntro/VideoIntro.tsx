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
  const ambientRef   = useRef<HTMLVideoElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const taglineRef       = useRef<HTMLParagraphElement>(null);
  const firstNameRef     = useRef<HTMLSpanElement>(null);
  const lastNameRef      = useRef<HTMLSpanElement>(null);
  const dividerRef       = useRef<HTMLDivElement>(null);
  const roleRef          = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  // Always start muted — the ONLY way to autoplay on mobile
  const [isMuted, setIsMuted] = useState(true);

  // ── Force play on mount (fixes mobile where autoPlay attr alone fails) ──
  useEffect(() => {
    const v = mainVideoRef.current;
    const a = ambientRef.current;
    if (!v || !a) return;

    // Ensure both are muted before any play attempt (mobile requirement)
    v.muted = true;
    a.muted = true;

    // Use a short delay so the browser has time to load enough data
    const playTimer = setTimeout(() => {
      v.play()
        .then(() => setVideoLoaded(true))
        .catch(() => {
          // If autoplay still fails, wait for a user gesture via the section click
        });
      a.play().catch(() => {});
    }, 300);

    return () => clearTimeout(playTimer);
  }, []);

  // ── Unmute on first user interaction ──────────────────────────
  // Works for both desktop (click/key/scroll) and mobile (touchstart)
  useEffect(() => {
    let unmuted = false;
    const unmute = () => {
      if (unmuted) return;
      unmuted = true;
      const v = mainVideoRef.current;
      if (v) {
        v.muted = false;
        setIsMuted(false);
        // Also kick-start play in case it was blocked
        if (v.paused) v.play().catch(() => {});
      }
      window.removeEventListener('click',      unmute);
      window.removeEventListener('keydown',    unmute);
      window.removeEventListener('scroll',     unmute);
      window.removeEventListener('touchstart', unmute);
    };

    window.addEventListener('click',      unmute, { passive: true });
    window.addEventListener('keydown',    unmute, { passive: true });
    window.addEventListener('scroll',     unmute, { passive: true });
    window.addEventListener('touchstart', unmute, { passive: true });

    return () => {
      window.removeEventListener('click',      unmute);
      window.removeEventListener('keydown',    unmute);
      window.removeEventListener('scroll',     unmute);
      window.removeEventListener('touchstart', unmute);
    };
  }, []);

  // ── GSAP entrance animations ───────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
      .to(firstNameRef.current,  { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.5')
      .to(lastNameRef.current,   { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.75')
      .to(dividerRef.current,    { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .to(roleRef.current,       { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
      .to(scrollIndicatorRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  // ── Keep ambient bg video in sync with main ───────────────────
  useEffect(() => {
    const v = mainVideoRef.current;
    const a = ambientRef.current;
    if (!v || !a) return;

    const onPlay    = () => { a.currentTime = v.currentTime; a.play().catch(() => {}); };
    const onPause   = () => { a.pause(); };
    const onSeeking = () => { a.currentTime = v.currentTime; };

    v.addEventListener('play',    onPlay);
    v.addEventListener('pause',   onPause);
    v.addEventListener('seeking', onSeeking);

    if (!v.paused) { a.currentTime = v.currentTime; a.play().catch(() => {}); }

    return () => {
      v.removeEventListener('play',    onPlay);
      v.removeEventListener('pause',   onPause);
      v.removeEventListener('seeking', onSeeking);
    };
  }, []);

  // ── Mute toggle button (bottom-right corner) ──────────────────
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = mainVideoRef.current;
    if (!v) return;
    // Also kick-start play if it was blocked (mobile tap activates it)
    if (v.paused) { v.play().catch(() => {}); }
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
        {/* Ambient blurred bg — always muted, no audio */}
        <video
          ref={ambientRef}
          className={styles.ambientBg}
          src="/hero-video.mp4"
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
        />

        {/* Main foreground video
            IMPORTANT: muted attr is set via ref, not React prop,
            because React's muted prop is unreliable across browsers */}
        <video
          ref={mainVideoRef}
          className={`${styles.mainVideo} ${videoLoaded ? styles.loaded : ''}`}
          src="/hero-video.mp4"
          autoPlay
          muted          /* initial HTML attr — required for mobile autoplay */
          playsInline
          loop={false}
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
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
            <span ref={lastNameRef}  className={styles.lastName}>Para</span>
          </div>

          <div ref={dividerRef} className={styles.divider} />

          <p ref={roleRef} className={styles.role}>
            M.Sc. Data Science · GITAM University<br />
            <span>AI/ML Engineer</span> · Anomaly Detection · Edge AI<br />
            IIT Bombay Research Intern
          </p>
        </div>

        {/* ── Sound Toggle Button (Bottom Right) ── */}
        <div className={styles.soundWrapper} data-no-transition="true">
          {/* Hint label — visible only while muted */}
          {isMuted && (
            <span className={styles.soundHint}>
              Tap speaker for audio
            </span>
          )}
          <button
            className={styles.soundToggle}
            onClick={toggleMute}
            data-no-transition="true"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
          </button>
        </div>

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
