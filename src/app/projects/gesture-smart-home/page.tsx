'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CaseStudy.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
  { id: 'problem',     label: 'Problem' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'prior-art',  label: 'Prior Art' },
  { id: 'what-i-built', label: 'What I Built' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'outcomes',   label: 'Outcomes' },
];

const TAGS = [
  'DENSENET121', 'MEDIAPIPE', 'Q-LEARNING', 'RASPBERRY PI 4',
  'ESP32', 'TENSORFLOW/KERAS', 'OPENCV', 'PYTHON',
];

const MODEL_ROWS = [
  { name: 'VGG16',          acc: '65.8%',  note: 'No preprocessing',           selected: false },
  { name: 'MobileNetV2',    acc: '69.4%',  note: 'No preprocessing',           selected: false },
  { name: 'MobileNetV3',    acc: '65.3%',  note: 'No preprocessing',           selected: false },
  { name: 'EfficientNetB0', acc: '98.4%',  note: 'With MediaPipe',             selected: false },
  { name: 'DenseNet121',    acc: '99.92%', note: 'With MediaPipe ✓ SELECTED',  selected: true  },
];

// ── GitHub icon ──
const GHIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function GestureSmartHomePage() {
  const [activeTab, setActiveTab] = useState('problem');
  const pageRef = useRef<HTMLDivElement>(null);

  // ── GSAP scroll animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements
      gsap.fromTo(
        '.gsap-hero > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // All section elements with animInit class
      gsap.utils.toArray<HTMLElement>('.gsap-section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.animInit'),
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Outcome metric count-up
      const outcomeCards = gsap.utils.toArray<HTMLElement>('.outcome-value');
      outcomeCards.forEach((el) => {
        const target = el.dataset.target || '0';
        const isPercent = target.includes('%');
        const isPlus = target.startsWith('+');
        const raw = parseFloat(target.replace(/[^0-9.]/g, ''));
        const counter = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: raw,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                const v = Math.round(counter.val * 100) / 100;
                el.textContent = isPercent
                  ? v.toFixed(2) + '%'
                  : isPlus
                  ? '+' + Math.round(v) + 'pp'
                  : String(Math.round(v));
              },
            });
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // ── Sticky nav active section tracking ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* ── Back Button ── */}
      <a href="/#projects" className={styles.backBtn}>← Back to Portfolio</a>

      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <div className={`${styles.hero} gsap-hero`}>
        <p className={styles.heroTagline}>M.Sc. Final Project · GITAM University · April 2026</p>

        <h1 className={styles.heroTitle}>
          Multi-Modal Deep Learning<br />for Elderly Smart Home Control
        </h1>

        <p className={styles.heroSubtitle}>
          Gesture recognition · Edge AI deployment ·<br />
          Reinforcement learning · Offline operation
        </p>

        {/* Metric row */}
        <div className={styles.metricRow}>
          {[
            { val: '99.92%', lbl: 'Test Accuracy' },
            { val: '1.00',   lbl: 'F1-Score (all classes)' },
            { val: '+27pp',  lbl: 'Accuracy gain from preprocessing' },
            { val: '128',    lbl: 'Q-Learning states' },
          ].map(({ val, lbl }) => (
            <div key={lbl} className={styles.metricPill}>
              <span className={styles.metricNum}>{val}</span>
              <span className={styles.metricLbl}>{lbl}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className={styles.tagsRow}>
          {TAGS.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
        </div>

        <div className={styles.heroDivider} />
      </div>

      {/* ════════════════════════════ STICKY NAV ════════════════════════════ */}
      <nav className={styles.stickyNav}>
        <div className={styles.navInner}>
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.navTab} ${activeTab === id ? styles.navTabActive : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ════════════════════════════ CONTENT ═══════════════════════════════ */}
      <div className={styles.content}>

        {/* ─────────────── 01 · PROBLEM ─────────────── */}
        <section id="problem" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>01 · Problem</p>
          <h2 className={`${styles.sectionHeading} animInit`}>Why This Exists</h2>

          <p className={`${styles.bodyText} animInit`}>
            Elderly individuals increasingly rely on smart home systems for daily independence — yet every
            major platform requires clear speech and a stable internet connection. For seniors with speech
            impairments, limited mobility, or poor connectivity, these systems are simply inaccessible.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            Touchscreen and keyboard alternatives demand fine motor control that many elderly users no
            longer have. Existing gesture-based solutions are either wearable (requiring maintenance),
            accuracy-limited at 88–93%, or lack any adaptive personalisation — meaning they cannot learn
            a user&apos;s habits over time.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            I set out to build an offline, camera-only, gesture-controlled system that is highly accurate,
            adaptive, and requires zero wearable hardware.
          </p>

          <blockquote className={`${styles.quoteBlock} animInit`}>
            <p className={styles.quoteText}>
              &ldquo;No internet. No cloud. No wearables.<br />Just a camera and a hand.&rdquo;
            </p>
          </blockquote>
        </section>

        {/* ─────────────── 02 · OBJECTIVES ─────────────── */}
        <section id="objectives" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>02 · Objectives</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What I Set Out To Do</h2>

          <div className={`${styles.objGrid} animInit`}>
            {[
              { n: '01', text: 'Design a CNN model classifying 4 hand gestures with >99% accuracy on a custom 8,000-image dataset.' },
              { n: '02', text: 'Build a MediaPipe preprocessing pipeline that detects and crops the hand region before CNN inference — eliminating feature loss from raw image resizing.' },
              { n: '03', text: 'Deploy the trained model on a Raspberry Pi 4 for real-time, fully offline gesture inference.' },
              { n: '04', text: 'Integrate a Q-learning RL agent that uses gesture labels and IoT sensor context to personalise device control decisions over time.' },
              { n: '05', text: 'Evaluate 5 CNN architectures — VGG16, EfficientNetB0, MobileNetV2, MobileNetV3, DenseNet121 — and select the best for constrained edge deployment.' },
            ].map(({ n, text }) => (
              <div key={n} className={styles.objCard}>
                <span className={styles.objNum}>{n}</span>
                <p className={styles.objText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────── 03 · PRIOR ART ─────────────── */}
        <section id="prior-art" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>03 · Prior Art</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What Already Existed</h2>
          <p className={`${styles.introLine} animInit`}>
            Three prior works directly informed my design — and revealed a clear gap none of them filled.
          </p>

          <div className={`${styles.priorGrid} animInit`}>
            {/* Card 1 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Feature Fusion + CNN</p>
              <p className={styles.priorCardAuthor}>Alabdullah et al. (2023)</p>
              <p className={styles.priorCardStat}>&gt;90%</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it did</p>
                <p className={styles.priorSectionText}>HOG + LBP + colour histogram fused into a CNN classifier. Consistent improvement over single-feature baselines across 4 benchmark datasets.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacked</p>
                <p className={styles.priorSectionText}>No IoT integration · No RL · No elderly focus · Static benchmark datasets only</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Deep RL for Energy Management</p>
              <p className={styles.priorCardAuthor}>Lissa et al. (2021)</p>
              <p className={styles.priorCardStat}>8% energy saving</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it did</p>
                <p className={styles.priorSectionText}>DQN agent for smart home energy management, trained over 1,000 simulated episodes. Showed RL can learn adaptive control policies.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacked</p>
                <p className={styles.priorSectionText}>No gesture input · Simulation only · No edge hardware · No elderly focus</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Gesture Control for Elderly Users</p>
              <p className={styles.priorCardAuthor}>Wang et al. (2021)</p>
              <p className={styles.priorCardStat}>88–93%</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it did</p>
                <p className={styles.priorSectionText}>Wrist-worn sensors + camera fusion for gesture recognition. Elderly participants preferred it over voice and touchscreen alternatives.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacked</p>
                <p className={styles.priorSectionText}>Required wearable hardware · No RL adaptation · Dropped to 80–85% in low light</p>
              </div>
            </div>

            {/* Summary */}
            <div className={styles.priorSummary}>
              <p className={styles.priorSummaryText}>
                The gap I identified: no existing system combined camera-only gesture recognition + IoT actuation +
                adaptive RL in a single offline-capable framework designed specifically for elderly care.
                That is exactly what I built.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────── 04 · WHAT I BUILT ─────────────── */}
        <section id="what-i-built" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>04 · My Work</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What I Actually Built</h2>

          {/* Sub A */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The Preprocessing Breakthrough</h3>
            <p className={styles.bodyText}>
              I collected a custom dataset of 8,000 images across 4 gesture classes — open palm (light on),
              peace/V sign (light off), thumbs up (door lock), thumbs down (door unlock) — captured across
              3 lighting conditions, 3 distances, 5 background types, both hands.
            </p>
            <p className={styles.bodyText}>
              The single most impactful decision I made: rather than resizing raw 4536×8064 smartphone images
              directly to 224×224 (which compresses hand features into a few pixels), I built a MediaPipe
              pipeline that detects hand landmarks, computes a padded bounding box, crops the hand region,
              then resizes to 224×224.
            </p>
            <p className={styles.bodyText}>
              This one change pushed EfficientNetB0 from 72.5% to 98.4% — with absolutely zero change to the model.
            </p>
            <p className={styles.inlineStat}>72.5% → 98.4% · Same model · Same data · One preprocessing change</p>
          </div>

          {/* Sub B */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>Choosing the Right Architecture</h3>
            <p className={styles.bodyText}>
              I trained and evaluated all 5 architectures with an identical classification head: Global Average
              Pooling → Batch Normalisation → Dense 256 (ReLU) → Dropout 0.4 → Softmax 4.
            </p>
            <p className={styles.bodyText}>
              I chose DenseNet121 as my final model. Its dense connectivity — where each layer receives feature
              maps from ALL preceding layers — is uniquely suited for fine-grained gesture recognition, where
              subtle differences like the direction of thumb extension must be reliably distinguished.
            </p>
            <p className={styles.bodyText}>
              Final result: 99.92% test accuracy, perfect F1-score of 1.00 across all 4 classes, only
              1 misclassification out of 1,200 test images.
            </p>

            <table className={styles.modelTable}>
              <thead>
                <tr>
                  <th>Architecture</th>
                  <th>Accuracy</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_ROWS.map((r) => (
                  <tr key={r.name} className={r.selected ? styles.selected : ''}>
                    <td>{r.name}</td>
                    <td>{r.acc}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sub C */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The Adaptive Control Layer</h3>
            <p className={styles.bodyText}>
              I designed a Q-learning agent with 128 discrete states encoding: gesture label, current light
              state, door state, PIR motion reading, temperature category, and ultrasonic distance.
            </p>
            <p className={styles.bodyText}>
              Reward function: +10 correct action, −5 incorrect, +5 energy-efficient decision (light off,
              no motion), +3 context-appropriate door unlock (user nearby), −2 no action when gesture
              requires one.
            </p>
            <p className={styles.bodyText}>
              Parameters: α = 0.1, γ = 0.9, epsilon decay 1.0 → 0.01 over training. 80% of exploratory
              actions are guided toward the contextually correct choice — ensuring fast early learning
              without sacrificing exploration.
            </p>
          </div>

          {/* Sub D */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The Physical System</h3>
            <p className={styles.bodyText}>The system runs across three computing nodes:</p>

            <div className={styles.hardwareList}>
              {[
                { emoji: '💻', label: 'Laptop', role: 'DenseNet121 real-time inference via USB camera. Transmits gesture label + confidence over Wi-Fi.' },
                { emoji: '🖥',  label: 'Raspberry Pi 4 (4GB RAM)', role: 'Hosts the Q-learning RL agent. Receives gesture payload, reads sensor data, dispatches commands.' },
                { emoji: '📡', label: 'ESP32 Microcontroller', role: 'Polls PIR HC-SR501 (motion), DHT11 (temperature), HC-SR04 (distance). Drives relay and servo.' },
                { emoji: '⚡', label: 'Actuators', role: '5V relay module for 230V light bulb. SG90 servo motor for door lock (0° = locked, 90° = unlocked).' },
              ].map(({ emoji, label, role }) => (
                <div key={label} className={styles.hardwareItem}>
                  <span className={styles.hardwareEmoji}>{emoji}</span>
                  <span className={styles.hardwareLabel}>{label}</span>
                  <p className={styles.hardwareRole}>{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────── 05 · CHALLENGES ─────────────── */}
        <section id="challenges" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>05 · Challenges</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What Broke, and How I Fixed It</h2>

          <div className={`${styles.challengeList} animInit`}>
            {[
              {
                problem: 'Direct image resize destroyed gesture features. Resizing full 4536×8064px smartphone images to 224×224 compressed hand details into a few pixels. Every CNN I tested maxed out at 72.5% — no matter how I tuned the architecture or training.',
                fix: 'I built a MediaPipe hand detection pipeline that first locates the hand landmarks, computes a padded bounding box, crops just the hand region, then resizes to 224×224. The CNN now sees the hand clearly. Accuracy jumped to 98%+ immediately — zero model changes required.',
              },
              {
                problem: 'My original light_off gesture — a closed fist — was visually too similar to other closed-hand postures. It caused consistent class confusion across every model I trained, dragging down overall accuracy.',
                fix: 'I redesigned the gesture to a peace/V sign, which has high visual distinctiveness from the other three classes. The confusion disappeared entirely. I also confirmed the V sign is more natural and intuitive for elderly users to produce.',
              },
              {
                problem: 'Thumbs up (door_lock) and thumbs down (door_unlock) share the same vertical axis orientation. My early models frequently confused these two classes on external real-world images, even after MediaPipe preprocessing.',
                fix: "DenseNet121's dense connectivity solved this. Early-layer feature maps encoding fine-grained thumb direction propagate directly to the final classification layers — preserving the spatial detail that distinguishes the two gestures. Final confidence: 95% door_lock, 99% door_unlock on external images.",
              },
              {
                problem: 'Connecting the live RL loop in real time — gesture output → Q-agent → ESP32 actuation — without flooding the Wi-Fi network or introducing latency that made the system feel unresponsive.',
                fix: 'I applied a confidence threshold of 0.80 to filter low-quality predictions before transmission. Gesture payloads are sent every 10 frames as JSON over Wi-Fi on port 5007, preventing saturation. The Q-agent on the Raspberry Pi processes each payload, reads live sensor data on port 5005, and dispatches commands to the ESP32 on port 5006.',
              },
            ].map(({ problem, fix }, i) => (
              <div key={i} className={styles.challengeCard}>
                <div className={styles.challengeHalf}>
                  <p className={`${styles.challengeLabel} ${styles.problemLabel}`}>The Problem</p>
                  <p className={styles.challengeText}>{problem}</p>
                </div>
                <div className={styles.challengeDivider} />
                <div className={styles.challengeHalf}>
                  <p className={`${styles.challengeLabel} ${styles.fixLabel}`}>My Fix</p>
                  <p className={styles.challengeText}>{fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────── 06 · OUTCOMES ─────────────── */}
        <section id="outcomes" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>06 · Outcomes</p>
          <h2 className={`${styles.sectionHeading} animInit`}>Final Results</h2>

          <div className={`${styles.outcomesGrid} animInit`}>
            {[
              { target: '99.92%', lbl: 'Test Accuracy' },
              { target: '1.00',   lbl: 'F1-Score (all 4 classes)' },
              { target: '+27pp',  lbl: 'Accuracy gain from MediaPipe' },
              { target: '128',    lbl: 'Q-Learning state space' },
            ].map(({ target, lbl }) => (
              <div key={lbl} className={styles.outcomeCard}>
                <span
                  className={`${styles.outcomeValue} outcome-value`}
                  data-target={target}
                >
                  {target}
                </span>
                <span className={styles.outcomeLabel}>{lbl}</span>
              </div>
            ))}
          </div>

          <p className={`${styles.bodyText} animInit`}>
            I achieved 99.92% gesture classification accuracy — the highest reported for this task on custom
            edge-deployed hardware. The MediaPipe preprocessing pipeline I designed was the single most impactful
            improvement in the entire project, contributing over 27 percentage points of accuracy gain without
            touching the model architecture.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            My Q-learning agent demonstrated clear convergence toward correct gesture-to-action policies in live
            hardware testing. The ESP32 successfully actuated the relay module for light control and the SG90
            servo for door lock simulation in direct response to real-time gesture input — fully offline,
            no internet required.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            The system I built directly addresses the accessibility gap for elderly users with speech or mobility
            impairments: no internet, no cloud, no wearable hardware, no voice required. Just a camera and
            a hand gesture.
          </p>

          <div className={`${styles.tagsRow} animInit`} style={{ marginTop: '1.5rem' }}>
            {TAGS.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={`${styles.ghBtnWrap} animInit`}>
            <a
              href="https://github.com/rakeshpara/multi-modal-deep-learning-for-personalized-ai-agents-smart-home"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghBtn}
            >
              <GHIcon /> View on GitHub ↗
            </a>
          </div>
        </section>

      </div>{/* /content */}

      {/* ════════════════════════════ FOOTER ════════════════════════════════ */}
      <footer className={styles.footer}>
        <a href="/#projects" className={styles.footerLink}>← Back to Portfolio</a>
        <span className={styles.footerCopy}>© 2026 Para Rakesh</span>
        <a href="/#projects" className={`${styles.footerLink} ${styles.footerLinkRight}`}>Next Project →</a>
      </footer>

    </div>
  );
}
