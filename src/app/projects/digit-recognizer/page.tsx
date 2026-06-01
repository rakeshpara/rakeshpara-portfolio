'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CaseStudy.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
  { id: 'problem',       label: 'Problem' },
  { id: 'objectives',     label: 'Objectives' },
  { id: 'prior-art',      label: 'Prior Art' },
  { id: 'what-i-built',   label: 'What I Built' },
  { id: 'challenges',     label: 'Challenges' },
  { id: 'outcomes',       label: 'Outcomes' },
];

const TAGS = [
  'TENSORFLOW', 'KERAS', 'CNN', 'TKINTER',
  'NUMPY', 'PILLOW', 'PYTHON'
];

const TRAIN_ROWS = [
  { name: 'Optimizer',    val: 'Adam (lr = 0.001)' },
  { name: 'Loss',         val: 'Categorical Crossentropy' },
  { name: 'Epochs',       val: '10' },
  { name: 'Batch size',   val: '128' },
  { name: 'Validation',   val: 'MNIST test set (10,000 images)' },
];

const PIPELINE_STEPS = [
  { n: '1', title: 'Grayscale Conversion', desc: 'Convert the RGB canvas capture to grayscale.' },
  { n: '2', title: 'Color Inversion', desc: 'Invert pixel values (255 − x): white background becomes black, black digit becomes white. This matches MNIST\'s format exactly.' },
  { n: '3', title: 'Noise Thresholding', desc: 'Any pixel value below 30 is set to 0. Removes faint smudges and canvas artifacts that would confuse the model.' },
  { n: '4', title: 'Bounding Box Crop', desc: 'Find all non-zero pixels, compute their min/max coordinates, crop tightly around the digit. Eliminates empty canvas space that distorts the digit\'s relative size.' },
  { n: '5', title: 'Proportional Resize + Centering', desc: 'Resize the cropped digit proportionally to fit within 20×20 pixels, then paste it centered inside a clean 28×28 black frame — exactly matching MNIST\'s centering convention.' },
  { n: '6', title: 'Normalise + Reshape', desc: 'Divide all pixel values by 255 (range 0–1), reshape to (1, 28, 28, 1) for model input.' }
];

const PREDICTION_SAMPLES = [
  { digit: '0', conf: '98%' },
  { digit: '5', conf: '82%' },
  { digit: '3', conf: '43%' },
  { digit: '7', conf: '79%' },
];

// ── GitHub icon ──
const GHIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function DigitRecognizerPage() {
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
        <p className={styles.heroTagline}>Mini Project · GITAM University · 2025</p>

        <h1 className={styles.heroTitle}>
          Handwritten Digit Recognizer<br />with Real-Time GUI
        </h1>

        <p className={styles.heroSubtitle}>
          CNN training · Real-time preprocessing ·<br />
          Desktop deployment · Live confidence scoring
        </p>

        {/* Metric row */}
        <div className={styles.metricRow}>
          {[
            { val: '99.17%', lbl: 'MNIST Test Accuracy' },
            { val: '70,000', lbl: 'Training Images' },
            { val: '10',     lbl: 'Epochs to Converge' },
            { val: '10',     lbl: 'Digit Classes' },
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
          <h2 className={`${styles.sectionHeading} animInit`}>Why I Built This</h2>

          <p className={`${styles.bodyText} animInit`}>
            Every person writes differently — different size, different shape, different pressure, different style.
            Teaching a computer to reliably understand handwritten digits across all of that variation is genuinely
            hard, even though it looks simple to a human.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            I wanted to understand this problem from the inside — not just train a model on a dataset and check
            the accuracy number, but actually deploy it in a way that lets a real person draw freely and see the
            prediction live. That gap between dataset accuracy and real-world drawing performance is where the
            interesting engineering happens.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            The challenge I set myself: train a CNN that hits top-tier accuracy on MNIST, then build a preprocessing
            pipeline that makes the model work reliably on messy, off-center, free-hand drawings — not just on clean
            dataset images.
          </p>

          <blockquote className={`${styles.quoteBlock} animInit`}>
            <p className={styles.quoteText}>
              &ldquo;Anyone can hit 99% on MNIST.<br />
              Making it work on a real person&apos;s drawing is a different problem entirely.&rdquo;
            </p>
          </blockquote>
        </section>

        {/* ─────────────── 02 · OBJECTIVES ─────────────── */}
        <section id="objectives" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>02 · Objectives</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What I Set Out To Do</h2>

          <div className={`${styles.objGrid} animInit`}>
            {[
              { n: '01', text: 'Design and train a CNN model on the MNIST dataset that achieves >99% test accuracy using TensorFlow and Keras.' },
              { n: '02', text: 'Build a preprocessing pipeline that converts raw free-hand canvas drawings into the exact MNIST format the model expects — grayscale, inverted, cropped, centered, 28×28.' },
              { n: '03', text: 'Deploy the trained model inside a live desktop application where users draw digits and receive instant predictions with confidence scores.' },
              { n: '04', text: 'Understand the full end-to-end workflow of designing, training, saving, loading, and deploying a deep learning model inside a real interactive application.' },
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
          <h2 className={`${styles.sectionHeading} animInit`}>What Came Before</h2>
          <p className={`${styles.introLine} animInit`}>
            Handwritten digit recognition has a long research history. Two foundational works directly shaped how I approached this project.
          </p>

          <div className={`${styles.priorGrid} animInit`}>
            {/* Card 1 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>LeNet-5 — The Foundation</p>
              <p className={styles.priorCardAuthor}>LeCun et al. (1998)</p>
              <p className={styles.priorCardStat}>99.0%</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it did</p>
                <p className={styles.priorSectionText}>Introduced one of the first CNNs. Showed neural networks could automatically learn features from images on MNIST, laying the foundation for modern vision deep learning.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacked</p>
                <p className={styles.priorSectionText}>Limited by 1998 hardware · No real-time interface · No free-hand drawing support</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Preprocessing as the Key Insight</p>
              <p className={styles.priorCardAuthor}>Simard et al. (2003)</p>
              <p className={styles.priorCardStat}>99.6%</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it did</p>
                <p className={styles.priorSectionText}>Showed preprocessing — normalisation, centering, elastic distortions — significantly improves accuracy, proving image preparation matters as much as the model.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacked</p>
                <p className={styles.priorSectionText}>Focused on dataset benchmarks only · No deployment or interactive interface · No real-time user input pipeline</p>
              </div>
            </div>

            {/* Summary */}
            <div className={styles.priorSummary}>
              <p className={styles.priorSummaryText}>
                Both foundational works confirmed the importance of CNN architecture and preprocessing quality. My project
                extended their ideas by combining a modern CNN with a real-time preprocessing pipeline and deploying it
                in an interactive GUI — making the research actually usable by a person drawing freely.
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
            <h3 className={styles.subHeading}>The CNN Model</h3>
            <p className={styles.bodyText}>
              I built a custom CNN in TensorFlow/Keras trained on 60,000 MNIST training images and evaluated on
              10,000 test images.
            </p>
            <p className={styles.bodyText}>
              The architecture is designed for efficient feature extraction with regularisation at every stage
              to prevent overfitting:
            </p>

            {/* Architecture stack diagram */}
            <div className={styles.schemaWrapper}>
              <pre className={styles.schemaPre}>
{`Input (28×28×1)
     ↓
Conv2D — 32 filters, 3×3, ReLU (Learns edges/basic shapes)
     ↓
MaxPooling2D — 2×2 (Reduces spatial size, keeps key features)
     ↓
Dropout — 0.25 (Prevents overfitting)
     ↓
Conv2D — 64 filters, 3×3, ReLU (Learns complex curves)
     ↓
MaxPooling2D — 2×2
     ↓
Dropout — 0.25
     ↓
Flatten (Converts feature maps to 1D vector)
     ↓
Dense — 128 neurons, ReLU (Deep pattern relationships)
     ↓
Dropout — 0.5
     ↓
Dense — 10 neurons, Softmax (Outputs digit probabilities 0–9)`}
              </pre>
            </div>

            <table className={styles.modelTable}>
              <thead>
                <tr>
                  <th>Hyperparameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {TRAIN_ROWS.map((r) => (
                  <tr key={r.name}>
                    <td><code>{r.name}</code></td>
                    <td>{r.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sub B */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The Preprocessing Pipeline</h3>
            <p className={styles.bodyText}>
              This is where the real engineering was. A user drawing on a white canvas with a black pen looks
              nothing like MNIST images — which have black backgrounds and white digits, are perfectly centered,
              and are exactly 28×28.
            </p>
            <p className={styles.bodyText}>
              I built a 6-step preprocessing pipeline to bridge that gap:
            </p>

            {/* Step list layout */}
            <div className={styles.pipelineList}>
              {PIPELINE_STEPS.map((s) => (
                <div key={s.n} className={styles.pipelineStep}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <div className={styles.stepContent}>
                    <p className={styles.stepTitle}>{s.title}</p>
                    <p className={styles.stepDesc}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.inlineStat}>
              Steps 4 and 5 — crop and center — were the critical fixes. Without them, off-center drawings caused consistent mispredictions.
            </p>
          </div>

          {/* Sub C */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The Live Desktop Application</h3>
            <p className={styles.bodyText}>
              I deployed the trained model inside a Tkinter desktop application with three core components:
            </p>

            <div className={styles.guiComponents}>
              <div className={styles.guiCard}>
                <p className={styles.guiTitle}>Drawing Canvas</p>
                <p className={styles.guiText}>
                  300×300 white canvas with crosshair cursor. Users draw freely using mouse click-and-drag. Stroke radius is set to 6px for natural-feeling handwriting.
                </p>
              </div>
              <div className={styles.guiCard}>
                <p className={styles.guiTitle}>Recognize Button</p>
                <p className={styles.guiText}>
                  Captures the canvas using Win32GUI and ImageGrab, runs the full preprocessing pipeline, passes the result to the model, and displays the predicted digit + confidence percentage.
                </p>
              </div>
              <div className={styles.guiCard}>
                <p className={styles.guiTitle}>Clear Button</p>
                <p className={styles.guiText}>
                  Resets the drawing canvas and clears all labels, preparing the GUI for the next handwriting input instantly.
                </p>
              </div>
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
                problem: 'My initial predictions on free-hand drawings were unreliable — the model would correctly classify clean MNIST test images at 99%+ but frequently mispredict digits drawn on the canvas. The gap between dataset and real-world drawing performance was large and inconsistent.',
                fix: 'The root cause was the mismatch between the canvas format (white background, black digit, full frame) and MNIST format (black background, white digit, tightly centered). I built the full 6-step preprocessing pipeline — inversion, noise removal, bounding box crop, proportional resize, and 28×28 centering — to fully bridge this format gap before every prediction.',
              },
              {
                problem: 'Off-center drawings were consistently mispredicted. When a user drew a digit in the top-left corner or bottom-right of the canvas, the model would output low-confidence wrong predictions — because MNIST always has the digit centered in the frame.',
                fix: 'I added the bounding box crop followed by proportional thumbnail resize to 20×20, then paste-centered inside a fresh 28×28 black image. This means no matter where on the canvas the digit is drawn, the model always receives it perfectly centered — matching the training data distribution exactly.',
              },
              {
                problem: 'Canvas noise — faint smudges, accidental mouse movements, anti-aliasing artifacts — was being included in the preprocessed image and occasionally triggering false features in the CNN, reducing confidence on otherwise clear drawings.',
                fix: 'I added a noise threshold step: any pixel with value below 30 is zeroed out before the bounding box computation. This cleanly removes faint artifacts without touching the actual digit strokes, which are always much darker than the noise floor.',
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
              { target: '99.17%', lbl: 'MNIST Test Accuracy' },
              { target: '70000',  lbl: 'Images Trained On' },
              { target: '10',     lbl: 'Epochs to Converge' },
              { target: '6',      lbl: 'Preprocessing Steps' },
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
            I built a complete end-to-end deep learning deployment — from raw dataset to trained model to live
            interactive application — entirely from scratch.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            The CNN I designed achieved 99.17% test accuracy on 10,000 unseen MNIST images across just 10 training
            epochs. Training accuracy improved steadily from 88% at Epoch 1 to 98.6% by Epoch 10, with validation
            accuracy closely tracking at 99.18% — confirming strong generalisation with no overfitting.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            The preprocessing pipeline I engineered is what makes the system actually usable in practice. By solving
            the format mismatch between free-hand canvas drawings and MNIST-style images — inversion, noise removal,
            crop, center, resize — the model works reliably on real user input, not just clean dataset images.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            The real-time Tkinter GUI brings it all together: draw a digit, click Recognize, see the prediction and
            confidence instantly. The system responds in under a second and handles messy, imperfect, off-center
            handwriting far better than the raw model alone ever could.
          </p>

          {/* Real predictions grid */}
          <div className={`${styles.predictionGrid} animInit`}>
            {PREDICTION_SAMPLES.map((s) => (
              <div key={s.digit} className={styles.predictionCard}>
                <span className={styles.predictionVal}>&ldquo;{s.digit}&rdquo; predicted</span>
                <span className={styles.predictionConf}>{s.conf} confidence</span>
              </div>
            ))}
          </div>
          <span className={styles.gridNote}>
            Note: Lower confidence on 3 and 7 reflects natural ambiguity in hand-drawn strokes — the model correctly identifies the digit but registers uncertainty on less distinct drawings.
          </span>

          <div className={`${styles.tagsRow} animInit`} style={{ marginTop: '2.5rem' }}>
            {TAGS.concat(['WIN32GUI']).map((t) => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={`${styles.ghBtnWrap} animInit`}>
            <a
              href="https://github.com/pararakesh"
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
