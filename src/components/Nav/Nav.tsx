'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Nav.module.css';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: 'HOME', href: '#home', id: 'home' },
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'SKILLS', href: '#skills', id: 'skills' },
  { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { label: 'PROJECTS', href: '#projects', id: 'projects' },
  { label: 'EDUCATION', href: '#education', id: 'education' },
  { label: 'CERTIFICATIONS', href: '#certifications', id: 'certifications' },
  { label: 'CONTACT', href: '#contact', id: 'contact' },
];

export default function Nav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Show/hide navigation bar based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      // Reveal nav bar after scrolling past 85% of hero height
      if (window.scrollY > heroHeight * 0.85) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active link highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the sweet spot of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // GSAP animation for revealing the bar on visibility toggle
  useGSAP(() => {
    if (!navContainerRef.current) return;

    if (isVisible) {
      gsap.to(navContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(navContainerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isVisible]);

  // Handle drawer animations
  useGSAP(() => {
    if (!drawerRef.current) return;

    if (mobileMenuOpen) {
      // Slide in drawer
      gsap.to(drawerRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
      // Stagger items
      const items = drawerRef.current.querySelectorAll(`.${styles.drawerItem}`);
      gsap.fromTo(
        items,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.1, ease: 'power2.out' }
      );
    } else {
      // Slide out drawer
      gsap.to(drawerRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update address bar cleanly
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      <nav
        ref={navContainerRef}
        className={`${styles.nav} ${isVisible ? styles.visible : ''}`}
        style={{ transform: 'translateY(-100px)', opacity: 0 }}
      >
        <div className={styles.container}>
          {/* Logo Monogram */}
          <a
            href="#home"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              window.history.pushState(null, '', '#home');
            }}
          >
            RAKESH<span className={styles.logoAccent}>.PARA</span>
          </a>

          {/* Desktop Navigation Links */}
          <div ref={linksRef} className={styles.links}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`${styles.linkItem} ${activeSection === link.id ? styles.active : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphism Navigation Drawer */}
      <div
        ref={drawerRef}
        className={styles.drawer}
        style={{ transform: 'translateX(100%)', opacity: 0 }}
      >
        <div className={styles.drawerContent}>
          {navLinks.map((link) => (
            <a
              key={`mobile-${link.id}`}
              href={link.href}
              className={`${styles.drawerItem} ${activeSection === link.id ? styles.drawerActive : ''}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              <span className={styles.drawerNumber}>0{navLinks.indexOf(link) + 1}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
