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
  'SNOWFLAKE', 'PYTHON', 'POWER BI', 'STREAMLIT',
  'SQL', 'PANDAS', 'SCIPY', 'DAX', 'OPENPYXL'
];

const TABLE_ROWS = [
  { name: 'DIM_CUSTOMER',   rows: '18,479 rows',   desc: 'Adventures Online Sales' },
  { name: 'DIM_PRODUCT',    rows: '3,795 rows',    desc: 'Both datasets merged' },
  { name: 'DIM_DATE',       rows: '1,439 rows',    desc: 'Auto-generated' },
  { name: 'DIM_WAREHOUSE',  rows: '20 rows',       desc: 'Synthetically generated' },
  { name: 'FACT_ORDERS',    rows: '60,382 rows',   desc: 'Adventures Online Sales' },
  { name: 'FACT_INVENTORY', rows: '397,884 rows',  desc: 'Online Retail dataset' },
];

// ── GitHub icon ──
const GHIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function QCommerceAnalyticsPage() {
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
        const isCurrency = target.startsWith('$');
        const isMillions = target.endsWith('M');
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
                let str = '';
                if (isCurrency && isMillions) {
                  str = '$' + counter.val.toFixed(1) + 'M';
                } else if (isPercent) {
                  str = counter.val.toFixed(1) + '%';
                } else {
                  str = Math.round(counter.val).toLocaleString();
                }
                el.textContent = str;
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
        <p className={styles.heroTagline}>Personal Project · Data Engineering · 2025</p>

        <h1 className={styles.heroTitle}>
          QCommerce Analytics<br />Intelligence Platform
        </h1>

        <p className={styles.heroSubtitle}>
          Data warehousing · ETL pipeline · Business intelligence ·<br />
          Anomaly detection · What-If simulation
        </p>

        {/* Metric row */}
        <div className={styles.metricRow}>
          {[
            { val: '$29.3M',  lbl: 'Revenue Modeled' },
            { val: '60,382',  lbl: 'Orders Processed' },
            { val: '397,884', lbl: 'Inventory Records' },
            { val: '53.3%',   lbl: 'Avg Profit Margin' },
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
            Quick commerce platforms like Blinkit and Zepto operate on razor-thin margins and hyper-fast
            delivery windows. The business intelligence challenge they face is real and complex — order
            volumes in the tens of thousands, inventory across hundreds of SKUs, customers spread across
            multiple regions, all moving in real time.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            I wanted to understand this problem space deeply — not from a textbook, but by actually building
            the full data stack from scratch. No pre-built datasets with clean schemas. No drag-and-drop BI
            tools with pre-loaded connectors. I wanted to go from raw Excel files all the way to a live
            intelligence dashboard and anomaly detection engine.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            The personal challenge I set myself: simulate an entire quick commerce data ecosystem,
            architect the warehouse, build the ETL, and surface actionable business insights — end to end, alone.
          </p>

          <blockquote className={`${styles.quoteBlock} animInit`}>
            <p className={styles.quoteText}>
              &ldquo;Raw Excel files in. Executive dashboard and anomaly engine out.<br />
              Everything in between, built by hand.&rdquo;
            </p>
          </blockquote>
        </section>

        {/* ─────────────── 02 · OBJECTIVES ─────────────── */}
        <section id="objectives" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>02 · Objectives</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What I Set Out To Do</h2>

          <div className={`${styles.objGrid} animInit`}>
            {[
              { n: '01', text: 'Design and implement a production-grade Constellation Schema data warehouse on Snowflake (AWS) — two fact tables, four dimensions, built from scratch.' },
              { n: '02', text: 'Build a 3-phase Python ETL pipeline that cleans, transforms, and loads raw Excel source data into structured Snowflake schemas.' },
              { n: '03', text: 'Create 6 SQL analytical views exposing KPIs for revenue, delivery, inventory, and customer segmentation — queryable by any BI layer.' },
              { n: '04', text: 'Develop a 4-page Power BI executive dashboard with DAX queries covering delivery performance, inventory risk, and customer segment analysis.' },
              { n: '05', text: 'Build a Streamlit web app with live Snowflake queries, Z-score anomaly detection, auto-generated insights, and a 3-scenario What-If revenue simulator.' },
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
            Before building, I looked at how quick commerce analytics is typically approached — and found that most solutions solve only one layer of the problem.
          </p>

          <div className={`${styles.priorGrid} animInit`}>
            {/* Card 1 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Excel + Basic Dashboards</p>
              <p className={styles.priorCardAuthor}>Spreadsheet Standard</p>
              <p className={styles.priorCardStat}>Familiar</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it does</p>
                <p className={styles.priorSectionText}>Pivot tables, manual refresh, static charts. Easy to set up, familiar to business users.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacks</p>
                <p className={styles.priorSectionText}>No warehouse · No automated ETL · Breaks above 100K rows · No live querying</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Pre-built BI Tools</p>
              <p className={styles.priorCardAuthor}>Tableau / Looker</p>
              <p className={styles.priorCardStat}>Visuals-Only</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it does</p>
                <p className={styles.priorSectionText}>Powerful visualisation and exploration on top of an existing structured data source.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacks</p>
                <p className={styles.priorSectionText}>Requires pre-built warehouse · No ETL · No custom anomaly logic · High licensing costs</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.priorCard}>
              <p className={styles.priorCardTitle}>Cloud Data Platforms</p>
              <p className={styles.priorCardAuthor}>Databricks / dbt</p>
              <p className={styles.priorCardStat}>Engineering-Heavy</p>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it does</p>
                <p className={styles.priorSectionText}>Production transformation pipelines, lineage tracking, and warehouse integration.</p>
              </div>
              <div className={styles.priorSection}>
                <p className={styles.priorSectionLabel}>What it lacks</p>
                <p className={styles.priorSectionText}>Steep learning curve · No BI or simulation layer · Requires infrastructure team</p>
              </div>
            </div>

            {/* Summary */}
            <div className={styles.priorSummary}>
              <p className={styles.priorSummaryText}>
                None of these gave me the full picture end to end. I wanted to own every layer — warehouse design,
                ETL logic, SQL modeling, BI visualisation, and a custom intelligence layer — in a single cohesive
                project. So I built it myself.
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
            <h3 className={styles.subHeading}>The Warehouse Design</h3>
            <p className={styles.bodyText}>
              I designed a Constellation Schema on Snowflake hosted on AWS (ap-southeast-1) — two fact tables
              sharing four dimension tables, chosen because the business has two distinct measurement processes:
              order transactions and inventory movements.
            </p>
            <p className={styles.bodyText}>
              FACT_ORDERS (60,382 rows) captures every customer transaction linked to DIM_CUSTOMER, DIM_PRODUCT,
              and DIM_DATE. FACT_INVENTORY (397,884 rows) captures stock movements linked to DIM_PRODUCT, DIM_DATE,
              and DIM_WAREHOUSE (20 warehouse nodes, synthetically generated using Faker).
            </p>

            {/* Schema diagram */}
            <div className={styles.schemaWrapper}>
              <pre className={styles.schemaPre}>
{`             DIM_DATE
            /        \\
DIM_CUSTOMER—FACT_ORDERS   FACT_INVENTORY—DIM_WAREHOUSE
            \\        /
            DIM_PRODUCT`}
              </pre>
            </div>

            <table className={styles.modelTable}>
              <thead>
                <tr>
                  <th>Table Name</th>
                  <th>Row Count</th>
                  <th>Data Source</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((r) => (
                  <tr key={r.name}>
                    <td><code>{r.name}</code></td>
                    <td>{r.rows}</td>
                    <td>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sub B */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The 3-Phase ETL</h3>
            <p className={styles.bodyText}>
              I built a 3-phase Python ETL pipeline using Pandas and openpyxl:
            </p>
            <p className={styles.bodyText}>
              <strong>Phase 1 — Clean:</strong> Loaded raw Excel files, handled nulls, standardised date formats,
              removed duplicates, and normalised currency values.
            </p>
            <p className={styles.bodyText}>
              <strong>Phase 2 — Schema:</strong> Transformed flat cleaned data into a dimensional schema — extracting
              dimension tables, generating surrogate keys, building fact table joins, and merging product data across
              both source datasets.
            </p>
            <p className={styles.bodyText}>
              <strong>Phase 3 — Load:</strong> Connected to Snowflake via Python connector, created all tables via DDL,
              bulk-loaded all dimension and fact data, and created 6 SQL analytical views exposing KPIs directly to the BI layer.
            </p>

            {/* Pipeline flowchart */}
            <div className={styles.pipelineFlow}>
              <div className={styles.flowNode}>
                <p className={styles.flowTitle}>Raw Excel</p>
                <p className={styles.flowDesc}>Source Files</p>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowNode}>
                <p className={styles.flowTitle}>Phase 1 Clean</p>
                <p className={styles.flowDesc}>Pandas Normalization</p>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowNode}>
                <p className={styles.flowTitle}>Phase 2 Schema</p>
                <p className={styles.flowDesc}>Dimensions & Keys</p>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowNode}>
                <p className={styles.flowTitle}>Phase 3 Load</p>
                <p className={styles.flowDesc}>Snowflake Tables</p>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowNode}>
                <p className={styles.flowTitle}>SQL Views</p>
                <p className={styles.flowDesc}>KPI Modeling</p>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowNode}>
                <p className={styles.flowTitle}>BI & App</p>
                <p className={styles.flowDesc}>Power BI / Streamlit</p>
              </div>
            </div>
          </div>

          {/* Sub C */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The 4-Page Executive Dashboard</h3>
            <p className={styles.bodyText}>
              I built a 4-page Power BI dashboard driven entirely by DAX queries against the Snowflake SQL views:
            </p>

            {/* 2x2 grid */}
            <div className={styles.dashboardGrid}>
              <div className={styles.dashboardCard}>
                <p className={styles.dashboardTitle}>Page 1 — Executive Overview</p>
                <p className={styles.dashboardText}>
                  Revenue trend, category split, regional performance. Top-line KPIs for leadership.
                </p>
              </div>
              <div className={styles.dashboardCard}>
                <p className={styles.dashboardTitle}>Page 2 — Delivery Performance</p>
                <p className={styles.dashboardText}>
                  Delay rates, average delivery days by region, on-time rate tracking. 99.5% on-time achieved in simulated data.
                </p>
              </div>
              <div className={styles.dashboardCard}>
                <p className={styles.dashboardTitle}>Page 3 — Inventory Intelligence</p>
                <p className={styles.dashboardText}>
                  Stock movement analysis, stockout risk classification, SKU-level coverage across 3,665 products and 397,884 movements.
                </p>
              </div>
              <div className={styles.dashboardCard}>
                <p className={styles.dashboardTitle}>Page 4 — Customer Insights</p>
                <p className={styles.dashboardText}>
                  VIP / Regular / New segmentation, income vs spend correlation, promotion impact analysis across 18,479 customers in 6 countries.
                </p>
              </div>
            </div>
          </div>

          {/* Sub D */}
          <div className={`${styles.subSection} animInit`}>
            <h3 className={styles.subHeading}>The Live Intelligence App</h3>
            <p className={styles.bodyText}>
              Beyond the static dashboard, I built a Streamlit web app that queries Snowflake live and adds three intelligence layers:
            </p>
            <p className={styles.bodyText}>
              <strong>Live KPIs:</strong> Real-time metrics pulled directly from Snowflake on every page load — no cached data, no manual refresh.
            </p>
            <p className={styles.bodyText}>
              <strong>Auto Insights:</strong> 7 rule-based insights generated automatically from live data — flagging delivery trends, inventory risks, and revenue patterns without manual analysis.
            </p>
            <p className={styles.bodyText}>
              <strong>Anomaly Detection:</strong> Z-score detection with threshold = 2.0 flags unusual revenue drops or spikes on any day, regions with abnormally high delivery delay rates, and products with dangerously low stock movement.
            </p>
            <p className={styles.bodyText}>
              <strong>What-If Simulator:</strong> 3 interactive scenario sliders let users project revenue impact of: reducing delivery time (customer retention lift), increasing promotion coverage (order volume vs margin trade-off), and restocking low-inventory products (recovered missed sales).
            </p>
          </div>
        </section>

        {/* ─────────────── 05 · CHALLENGES ─────────────── */}
        <section id="challenges" className={`${styles.section} gsap-section`}>
          <p className={`${styles.sectionLabel} animInit`}>05 · Challenges</p>
          <h2 className={`${styles.sectionHeading} animInit`}>What Broke, and How I Fixed It</h2>

          <div className={`${styles.challengeList} animInit`}>
            {[
              {
                problem: 'The two source datasets had completely different schemas, column naming conventions, date formats, and product identifier systems. Merging them into a single DIM_PRODUCT table without losing referential integrity across both fact tables was the first major data engineering challenge I hit.',
                fix: 'I built Phase 2 of the ETL specifically to handle cross-dataset normalisation — generating unified surrogate keys for products, reconciling naming conflicts programmatically using Pandas, and validating referential integrity before any Snowflake load. Every foreign key relationship was verified before Phase 3 ran.',
              },
              {
                problem: "DIM_WAREHOUSE didn't exist in either source dataset. A real quick commerce platform has warehouse nodes — but my data had none. Without it, the Constellation Schema was incomplete and FACT_INVENTORY had no location dimension.",
                fix: 'I synthetically generated 20 warehouse records using Faker and NumPy — realistic location names, capacity values, and region assignments — then linked them to FACT_INVENTORY during Phase 2. This completed the schema and made the inventory analysis geographically meaningful.',
              },
              {
                problem: 'Simple threshold-based anomaly detection (flag anything below X) produced too many false positives — flagging normal seasonal dips as critical alerts and making the intelligence layer feel noisy and unreliable.',
                fix: 'I switched to Z-score statistical anomaly detection using SciPy, with a threshold of 2.0 standard deviations. This adapts to the actual distribution of each metric — revenue, delivery delay rates, stock movement — and only flags genuinely unusual deviations relative to historical patterns. False positive rate dropped dramatically.',
              },
              {
                problem: 'Connecting Streamlit to live Snowflake queries introduced latency on every page load — especially on the KPI cards and anomaly detection scan which ran multiple queries simultaneously. The app felt slow and unresponsive.',
                fix: "I restructured the Streamlit app to batch all required queries into a single connection session per page load, used Streamlit's caching decorators for semi-static data like dimension table lookups, and reserved live queries only for metrics that genuinely change — keeping the app responsive without sacrificing data freshness.",
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
              { target: '$29.3M',  lbl: 'Total Revenue Modeled' },
              { target: '397884',  lbl: 'Inventory Records Processed' },
              { target: '99.5%',   lbl: 'On-Time Delivery Rate' },
              { target: '53.3%',   lbl: 'Average Profit Margin' },
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
            I built a complete end-to-end data engineering and business intelligence platform entirely from scratch
            — from raw Excel files to a live cloud warehouse to an intelligent web application.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            Every layer was designed and implemented personally: the Constellation Schema warehouse on Snowflake,
            the 3-phase Python ETL pipeline, the 6 SQL analytical views, the 4-page Power BI executive dashboard,
            and the Streamlit intelligence layer with live Snowflake queries, Z-score anomaly detection, and a What-If revenue simulator.
          </p>
          <p className={`${styles.bodyText} animInit`}>
            This project gave me hands-on production experience with the full modern data stack — cloud warehousing,
            dimensional modeling, ETL engineering, BI development, and applied statistics — in a single cohesive system
            that mirrors what a real quick commerce analytics team would build.
          </p>

          {/* Outcomes Flowchart */}
          <div className={styles.schemaWrapper} style={{ marginTop: '2rem' }}>
            <pre className={styles.schemaPre}>
{`Raw Excel
    ↓
Python ETL (3 phases)
    ↓
Snowflake Constellation Schema
    ↓
6 SQL Analytical Views
    ↓
┌──────────────┬─────────────────┐
│  Power BI    │    Streamlit    │
│  Dashboard   │  Intelligence   │
│  (4 pages)   │  + What-If Sim  │
└──────────────┴─────────────────┘`}
            </pre>
          </div>

          <div className={`${styles.tagsRow} animInit`} style={{ marginTop: '2.5rem' }}>
            {TAGS.concat(['FAKER']).map((t) => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={`${styles.ghBtnWrap} animInit`}>
            <a
              href="https://github.com/rakeshpara/qcommerce-analytics-platform"
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
