'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const VideoIntro = dynamic(
  () => import('@/components/VideoIntro/VideoIntro'),
  { ssr: false }
);

const CinematicLayer = dynamic(
  () => import('@/components/CinematicLayer/CinematicLayer'),
  { ssr: false }
);

const Nav = dynamic(
  () => import('@/components/Nav/Nav'),
  { ssr: false }
);

const Hero = dynamic(
  () => import('@/components/Hero/Hero'),
  { ssr: false }
);

const About = dynamic(
  () => import('@/components/About/About'),
  { ssr: false }
);

const Projects = dynamic(
  () => import('@/components/Projects/Projects'),
  { ssr: false }
);

const Skills = dynamic(
  () => import('@/components/Skills/Skills'),
  { ssr: false }
);

const Timeline = dynamic(
  () => import('@/components/Timeline/Timeline'),
  { ssr: false }
);

const Education = dynamic(
  () => import('@/components/Education/Education'),
  { ssr: false }
);

const Certifications = dynamic(
  () => import('@/components/Certifications/Certifications'),
  { ssr: false }
);

const Contact = dynamic(
  () => import('@/components/Contact/Contact'),
  { ssr: false }
);

export default function Home() {
  const [introEnded, setIntroEnded] = useState(false);
  const [unmountIntro, setUnmountIntro] = useState(false);

  useEffect(() => {
    // 1. Auto transition after 10.5 seconds (gives time for the full 10s video to play)
    const autoTimer = setTimeout(() => {
      setIntroEnded(true);
    }, 10500);

    // 2. Immediate transition if user scrolls
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIntroEnded(true);
      }
    };

    // 3. Immediate transition if user clicks anywhere on the landing screen
    const handleTouch = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('[data-no-transition="true"]')) {
        return;
      }
      setIntroEnded(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleTouch, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  // Unmount VideoIntro 1.5s after transition to free up memory and GPU
  useEffect(() => {
    if (introEnded) {
      const unmountTimer = setTimeout(() => {
        setUnmountIntro(true);
      }, 1500);
      return () => clearTimeout(unmountTimer);
    }
  }, [introEnded]);

  return (
    <>
      {/* Persistent Cinematic Background Starfield */}
      <CinematicLayer />

      {/* Cinematic Video Intro Loader Overlay */}
      {!unmountIntro && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            opacity: introEnded ? 0 : 1,
            pointerEvents: introEnded ? 'none' : 'auto',
            transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <VideoIntro onVideoEnded={() => setIntroEnded(true)} />
        </div>
      )}

      {/* Main Cinematic Portfolio Content */}
      <div
        style={{
          opacity: introEnded ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
          visibility: introEnded ? 'visible' : 'hidden',
        }}
      >
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </div>
    </>
  );
}

