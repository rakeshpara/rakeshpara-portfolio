'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Contact.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Icons ───────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MapPinIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // const [form, setForm] = useState({ name: '', email: '', message: '' });
  // const [showToast, setShowToast] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Body container reveal
    gsap.fromTo(
      bodyRef.current!,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  /*
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);

    // Simulate submission to API / mailto triggers
    console.log('Sending message:', form);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setForm({ name: '', email: '', message: '' });

      // Automatically hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 8000);
  };
  */

  return (
    <section id="contact" ref={containerRef} className={styles.contact}>
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <p className={styles.tagline}>Let&apos;s Build Something</p>
        <h2 className={styles.heading}>Get In Touch</h2>
      </div>

      <div ref={bodyRef} className={styles.content}>
        <p className={styles.subtext}>
          I&apos;m actively looking for roles in AI/ML Engineering and
          Data Science. Whether you have an opportunity, a project,
          or just want to talk about edge AI and anomaly detection —
          my inbox is open.
        </p>

        {/* Clickable Social/Mail Links Rows */}
        <div className={styles.linksContainer}>
          <a href="mailto:rakesh@example.com" className={styles.linkRow}>
            <div className={styles.linkRowLeft}>
              <EmailIcon />
              <span className={styles.linkLabel}>Email</span>
            </div>
            <span className={styles.linkValue}>rakeshpara313@gmail.com</span>
          </a>

          <a href="https://www.linkedin.com/in/rakeshpara/" target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
            <div className={styles.linkRowLeft}>
              <LinkedInIcon />
              <span className={styles.linkLabel}>LinkedIn</span>
            </div>
            <span className={styles.linkValue}>linkedin.com/in/rakeshpara</span>
          </a>

          <a href="https://github.com/rakeshpara" target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
            <div className={styles.linkRowLeft}>
              <GitHubIcon />
              <span className={styles.linkLabel}>GitHub</span>
            </div>
            <span className={styles.linkValue}>github.com/rakeshpara</span>
          </a>

          <div className={styles.infoRow}>
            <div className={styles.linkRowLeft}>
              <MapPinIcon />
              <span className={styles.linkLabel}>Location</span>
            </div>
            <span className={styles.linkValue}>Hyderabad, India · Open to Relocation</span>
          </div>
        </div>

        {/* Contact Form (Commented out as requested)
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className={styles.input}
                placeholder="Enter your name"
                required
                value={form.name}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className={styles.input}
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={styles.textarea}
              placeholder="Tell me about your project or opportunity..."
              required
              value={form.message}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
        */}
      </div>

      {/* Success Toast (Commented out as requested)
      <div className={`${styles.toast} ${showToast ? styles.toastActive : ''}`}>
        <span className={styles.toastTick}>✓</span>
        <span>Message sent successfully!</span>
      </div>
      */}

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Para Rakesh · Built with Next.js</p>
      </footer>
    </section>
  );
}
