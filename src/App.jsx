import { useState, useRef } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  Layers3,
  Menu,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Wallet,
  CalendarDays,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

import BlueprintScrollLine from "./BlueprintScrollLine";
import BlueprintRail from "./BlueprintRail";
import HeroBuild from "./HeroBuild";

import "./App.css";

/* =========================================
   ANIMATION SETTINGS
========================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 55 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

/* =========================================
   PAGE DATA
========================================= */

const features = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "AI Drawing Intelligence",
    text: "Analyze engineering drawings and understand important construction information."
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Component Detection",
    text: "Identify construction components such as walls, doors, windows and columns."
  },
  {
    icon: ChartNoAxesCombined,
    number: "03",
    title: "Measurement Extraction",
    text: "Extract available dimensions and measurement information from drawings."
  },
  {
    icon: Users,
    number: "04",
    title: "Quantity Takeoff",
    text: "Calculate construction quantities using identified components and measurements."
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "BOQ Generation",
    text: "Organize calculated quantities into structured Bills of Quantities."
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Cost Estimation",
    text: "Support project cost estimation using quantities and applicable rates."
  }
];

const steps = [
  {
    number: "01",
    title: "Upload Engineering Drawings",
    description: "Upload architectural, structural or MEP drawings to begin analysis.",
    icon: Building2
  },
  {
    number: "02",
    title: "Identify Components",
    description: "Recognize construction elements and organize drawing information.",
    icon: Layers3
  },
  {
    number: "03",
    title: "Extract Measurements",
    description: "Extract dimensions and calculate construction quantities.",
    icon: ChartNoAxesCombined
  },
  {
    number: "04",
    title: "Generate BOQ & Estimate",
    description: "Prepare quantity details and support project cost estimation.",
    icon: BrainCircuit
  }
];

const questions = [
  [
    "What is Mepzora.ai?",
    "Mepzora.ai is a construction-focused digital platform designed to help organize project information, activities and progress."
  ],
  [
    "Who can use Mepzora.ai?",
    "Construction companies, project managers, engineers and teams can use Mepzora.ai to coordinate project activities."
  ],
  [
    "How does AI support construction management?",
    "AI can help analyze project information, surface useful insights and support informed project decisions."
  ],
  [
    "Can I manage multiple projects?",
    "The platform is designed around organized project management. Multi-project capabilities depend on the implemented product features."
  ]
];

/* =========================================
   REVEAL ANIMATION
========================================= */

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.18
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   DASHBOARD PREVIEW
========================================= */

function DashboardPreview() {
  const projects = [
    {
      name: "Commercial Complex",
      location: "Chennai",
      progress: 72,
      color: "blue",
      status: "On Track"
    },
    {
      name: "Residential Tower",
      location: "Coimbatore",
      progress: 48,
      color: "purple",
      status: "At Risk"
    },
    {
      name: "Office Development",
      location: "Madurai",
      progress: 89,
      color: "green",
      status: "On Track"
    }
  ];

  const activities = [
    {
      title: "Task completed",
      detail: "Site preparation completed",
      time: "10 minutes ago",
      icon: CheckCircle2,
      color: "success"
    },
    {
      title: "Team updated",
      detail: "New team assignment added",
      time: "35 minutes ago",
      icon: Users,
      color: "blue"
    },
    {
      title: "Progress updated",
      detail: "Office milestone reached 89%",
      time: "1 hour ago",
      icon: TrendingUp,
      color: "purple"
    }
  ];

  const milestones = [
    {
      title: "Foundation completion",
      project: "Commercial Complex",
      date: "24 Nov 2026"
    },
    {
      title: "Structural inspection",
      project: "Residential Tower",
      date: "28 Nov 2026"
    },
    {
      title: "Project review",
      project: "Office Development",
      date: "02 Dec 2026"
    }
  ];

  const stats = [
    {
      title: "Drawings Analyzed",
      value: "12",
      note: "Engineering plans",
      icon: Building2,
      color: "blue"
    },
    {
      title: "Components Detected",
      value: "48",
      note: "Identified elements",
      icon: ClipboardList,
      color: "purple"
    },
    {
      title: "Measurements Extracted",
      value: "26",
      note: "Drawing dimensions",
      icon: Users,
      color: "green"
    },
    {
      title: "BOQ Items Generated",
      value: "68%",
      note: "Quantity report",
      icon: Wallet,
      color: "orange"
    }
  ];

  return (
  <>
    {/* BEFORE & AFTER AI SECTION */}
    <section className="dashboard-section section" id="dashboard">

      <div className="section-container">

        {/* SECTION INTRO */}
        <Reveal>

          <div className="eyebrow">
            <span /> SEE THE INTELLIGENCE IN ACTION
          </div>

          <h2>
            From complex drawings
            <br />
            <span>to clear construction data.</span>
          </h2>

          <p className="dashboard-description">
            Mepzora.ai aims to simplify engineering drawing
            interpretation by transforming drawing information
            into structured components, measurements and
            construction quantity insights.
          </p>

        </Reveal>

        {/* BEFORE & AFTER CARDS */}
        <Reveal>

          <div className="before-after-grid">

            {/* BEFORE MEPZORA */}
            <div className="comparison-card before-card">

              <div className="comparison-card-header">
                <div>
                  <span className="comparison-label">
                    BEFORE MEPZORA
                  </span>

                  <h3>Manual Drawing Interpretation</h3>
                </div>

                <span className="comparison-number">01</span>
              </div>

              <div className="comparison-image before-image">
                <img
                  src="/images/drawing-before.png"
                  alt="Engineering drawing before AI-assisted analysis"
                />

                <div className="drawing-tag">
                  ORIGINAL DRAWING
                </div>
              </div>

              <div className="comparison-details">

                <div className="comparison-point">
                  <span className="comparison-dot" />
                  <p>Review engineering drawings manually</p>
                </div>

                <div className="comparison-point">
                  <span className="comparison-dot" />
                  <p>Identify construction components</p>
                </div>

                <div className="comparison-point">
                  <span className="comparison-dot" />
                  <p>Measure dimensions and calculate quantities</p>
                </div>

              </div>
            </div>

            {/* WITH MEPZORA */}
            <div className="comparison-card after-card">

              <div className="comparison-card-header">
                <div>
                  <span className="comparison-label">
                    WITH MEPZORA
                  </span>

                  <h3>Structured Drawing Insights</h3>
                </div>

                <span className="comparison-number">02</span>
              </div>

              <div className="comparison-image after-image">
                <img
                  src="/images/drawing-after.jpeg"
                  alt="Engineering drawing with AI-assisted component and measurement insights"
                />

                <div className="drawing-tag ai-tag">
                  MEPZORA INTELLIGENCE
                </div>
              </div>

              <div className="comparison-details">

                <div className="comparison-point">
                  <span className="comparison-dot ai-dot" />
                  <p>AI-assisted component identification</p>
                </div>

                <div className="comparison-point">
                  <span className="comparison-dot ai-dot" />
                  <p>Extract available drawing measurements</p>
                </div>

                <div className="comparison-point">
                  <span className="comparison-dot ai-dot" />
                  <p>Organize quantities for BOQ and cost estimation</p>
                </div>

              </div>
            </div>

          </div>

        </Reveal>

        {/* BOTTOM MESSAGE */}
        <Reveal>

          <div className="comparison-bottom">

            <div className="comparison-bottom-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <strong>
                Engineering information, made more meaningful.
              </strong>

              <p>
                From drawing interpretation to quantity insights,
                Mepzora.ai brings engineering information into
                a more organized digital workflow.
              </p>
            </div>

          </div>

        </Reveal>

      </div>

    </section>
  </>
);
}

/* =========================================
   3D BOOK-STYLE FEATURE SHOWCASE
========================================= */

function FeatureShowcase() {
  const [activeSpread, setActiveSpread] = useState(0);
  const [turning, setTurning] = useState(null);

  const totalPages = features.length;
  const totalSpreads = Math.ceil(totalPages / 2);

  const getFeature = (index) => {
    return features[(index + totalPages) % totalPages];
  };

  const startTurn = (direction) => {
    if (turning || totalPages < 2) return;

    const targetIndex =
      direction === "next"
        ? (activeSpread + 2) % totalPages
        : (activeSpread - 2 + totalPages) % totalPages;

    setTurning({
      direction,
      from: activeSpread,
      to: targetIndex,
      key: `${activeSpread}-${targetIndex}-${Date.now()}`
    });
  };

  const nextSpread = () => startTurn("next");
  const previousSpread = () => startTurn("previous");

  const finishTurn = () => {
    if (!turning) return;

    setActiveSpread(turning.to);
    setTurning(null);
  };

  const renderPage = (index) => {
    const feature = getFeature(index);
    const Icon = feature.icon;

    return (
      <div className="album-paper-content">
        <div className="album-page-header">
          <span>MEPZORA INTELLIGENCE</span>
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(totalPages).padStart(2, "0")}
          </span>
        </div>

        <div className="album-feature-area">
          <span className="album-feature-label">
            FEATURE {String(index + 1).padStart(2, "0")}
          </span>

          <div className="album-feature-icon">
            <Icon size={38} strokeWidth={1.5} />
          </div>

          <h3>{feature.title}</h3>

          <p>{feature.description}</p>

          <div className="album-feature-bottom">
            <span>BUILD SMARTER. MANAGE BETTER.</span>
            <span>MZ.</span>
          </div>
        </div>

        <div className="album-page-number">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    );
  };

  const leftPageIndex = activeSpread;
  const rightPageIndex = activeSpread + 1;

  // Show the next right page underneath while turning forward.
  const underneathRightIndex = turning?.direction === "next"
    ? turning.to + 1
    : rightPageIndex;

  // Show the previous left page underneath while turning backward.
  const underneathLeftIndex = turning?.direction === "previous"
    ? turning.to
    : leftPageIndex;

  return (
    <section className="features-section section" id="features">
      <div className="container">

        <div className="album-heading">
          <span>POWERFUL CAPABILITIES</span>

          <h2>
            From drawings to <em>detailed quantities.</em>
          </h2>

          <p>
            Purposeful tools for a more connected construction workflow.
          </p>
        </div>

        <div className="album-wrapper">

          <div className="album-book">

            {/* LEFT PAGE UNDERNEATH */}
            <div className="album-left-page">
              {renderPage(underneathLeftIndex)}
            </div>

            {/* RIGHT PAGE UNDERNEATH */}
            <div className="album-right-page">
              {renderPage(underneathRightIndex)}
            </div>

            {/* CENTRE SPINE */}
            <div className="album-spine" />

            {/* PAGE STACK */}
            <div className="album-pages-stack album-stack-left" />
            <div className="album-pages-stack album-stack-right" />

            {/* PHYSICAL PAGE TURN */}
            {turning && (
              <motion.div
                key={turning.key}
                className={`album-turning-sheet ${
                  turning.direction === "next"
                    ? "turn-next"
                    : "turn-previous"
                }`}
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    turning.direction === "next" ? -180 : 180
                }}
                transition={{
                  duration: 1.3,
                  ease: [0.645, 0.045, 0.355, 1]
                }}
                onAnimationComplete={finishTurn}
              >

                {/* FRONT OF TURNING SHEET */}
                <div className="album-sheet-face album-sheet-front">
                  {renderPage(
                    turning.direction === "next"
                      ? turning.from + 1
                      : turning.from
                  )}
                </div>

                {/* BACK OF TURNING SHEET */}
                <div className="album-sheet-face album-sheet-back">
                  {renderPage(
                    turning.direction === "next"
                      ? turning.to
                      : turning.to + 1
                  )}
                </div>

              </motion.div>
            )}

          </div>
        </div>

        {/* SPREAD NAVIGATION */}
        <div className="album-navigation">

          <button
            onClick={previousSpread}
            disabled={Boolean(turning)}
            aria-label="Previous spread"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="album-page-indicators">
            {Array.from(
              { length: totalSpreads },
              (_, index) => index
            ).map((spread) => (
              <button
                key={spread}
                className={
                  Math.floor(activeSpread / 2) === spread
                    ? "active"
                    : ""
                }
                disabled={Boolean(turning)}
                onClick={() => {
                  if (turning) return;

                  const targetIndex = spread * 2;

                  if (targetIndex === activeSpread) return;

                  setTurning({
                    direction:
                      targetIndex > activeSpread
                        ? "next"
                        : "previous",
                    from: activeSpread,
                    to: targetIndex,
                    key: `${activeSpread}-${targetIndex}-${Date.now()}`
                  });
                }}
                aria-label={`Go to spread ${spread + 1}`}
              />
            ))}
          </div>

          <span className="album-page-count">
            {String(activeSpread + 1).padStart(2, "0")}–
            {String(Math.min(activeSpread + 2, totalPages)).padStart(2, "0")}
            {" / "}
            {String(totalPages).padStart(2, "0")}
          </span>

          <button
            onClick={nextSpread}
            disabled={Boolean(turning)}
            aria-label="Next spread"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        <p className="album-instruction">
          TURN THE PAGE TO EXPLORE MEPZORA
        </p>

      </div>
    </section>
  );
}


/* =========================================
   MAIN APP
========================================= */

export default function App() {
  const pageRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 130]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0.2]
  );

  const navigation = [
    ["Home", "home"],
    ["Platform", "platform"],
    ["Dashboard", "dashboard"],
    ["Features", "features"],
    ["Workflow", "workflow"],
    ["Contact", "contact"]
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="mepzora-page" ref={pageRef}>

      {/* ORIGINAL ARCHITECTURAL LINE (behind the sections) */}
      <BlueprintScrollLine pageRef={pageRef} />

      {/* ALL WEBSITE CONTENT */}
      <div className="mepzora-content">

        {/* EDGE-RAIL SCROLL LINE (sits above sections, below the navbar) */}
        <BlueprintRail pageRef={pageRef} />

        {/* SCROLL PROGRESS */}
        <motion.div
          className="scroll-progress"
          style={{ scaleX: smoothProgress }}
        />

        {/* NAVIGATION */}
        <nav className="navbar">

          <a href="#home" className="logo" onClick={closeMenu}>
  <img
    src="/mepzora-logo.png"
    alt="Mepzora AI"
    className="logo-image"
  />
</a>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}

            <a
              href="#contact"
              className="nav-cta"
              onClick={closeMenu}
            >
              Get Started <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </nav>

        {/* HERO */}
        <section className="hero" id="home">

          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="blueprint-grid" />
          <HeroBuild />

          <motion.div
            className="hero-content"
            style={{ y: heroY, opacity: heroOpacity }}
          >

            <motion.div
              className="eyebrow hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="pulse-dot" />
              INTELLIGENT CONSTRUCTION MANAGEMENT
            </motion.div>

            <h1>
              <span className="line">
                <motion.span
                  className="line-inner"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  Understand Drawings.
                </motion.span>
              </span>
              <span className="line">
                <motion.span
                  className="line-inner accent"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  Calculate Quantities.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              Transform engineering drawings into construction quantities, BOQs and cost insights.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <a href="#contact" className="button-primary">
                Explore Mepzora <ArrowRight size={18} />
              </a>

              <a href="#platform" className="button-outline">
                Discover Platform
              </a>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span><CheckCircle2 size={16} /> Smarter workflows</span>
              <span><CheckCircle2 size={16} /> Connected teams</span>
              <span><CheckCircle2 size={16} /> AI-powered insights</span>
            </motion.div>

          </motion.div>

          {/* FLOATING AI PANEL */}
          <motion.div
            className="floating-panel"
            animate={{ y: [0, -13, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >

            <div className="panel-top">
              <span className="panel-icon">
                <BrainCircuit size={19} />
              </span>
              <span>MEPZORA INTELLIGENCE</span>
              <span className="live-dot" />
            </div>

            <div className="panel-main">
              <div>
                <small>Project overview</small>
                <h3>Smart Insights</h3>
              </div>
              <TrendingUp size={27} className="panel-trend" />
            </div>

            <div className="panel-line">
              <span />
            </div>

            <div className="panel-bottom">
              <span>Project visibility</span>
              <strong>Connected</strong>
            </div>

          </motion.div>

          <div className="hero-bottom">
            <span>BUILT FOR THE FUTURE OF CONSTRUCTION</span>
            <span className="scroll-indicator">SCROLL TO EXPLORE ↓</span>
          </div>

        </section>

        {/* PLATFORM INTRO */}
        <section className="intro-section section" id="platform">
          <div className="section-container intro-grid">

            <Reveal>
              <div className="eyebrow">
                <span /> THE MEPZORA APPROACH
              </div>

              <h2>
                Engineering drawings,
                <span> reimagined with AI.</span>
              </h2>
            </Reveal>

            <Reveal>
              <p className="intro-copy">
                Construction projects involve people, planning and countless
                moving parts. Mepzora.ai brings project information into a
                connected digital experience, helping teams stay organized
                and informed.
              </p>

              <a href="#dashboard" className="text-link">
                Explore the platform <ArrowUpRight size={17} />
              </a>
            </Reveal>

          </div>

          <div className="intro-visual">
            <div className="intro-visual-image" />
            <div className="intro-visual-overlay" />

            <div className="intro-visual-caption">
              <span>01 / CONNECTED PROJECT EXPERIENCE</span>
              <h3>
                From engineering drawings
                <br />
                to project progress.
              </h3>
            </div>

            <div className="visual-corner">MZ / 2026</div>
          </div>
        </section>

        {/* DASHBOARD */}
        <DashboardPreview />

        <FeatureShowcase />

        {/* WORKFLOW */}
        <section className="workflow-section section" id="workflow">

          <div className="workflow-bg" />

          <div className="section-container">

            <Reveal>
              <div className="workflow-heading">

                <div className="eyebrow">
                  <span /> SIMPLE. CONNECTED. INTELLIGENT.
                </div>

                <h2>
                  A clearer path
                  <span> from drawings to estimates.</span>
                </h2>

                <p>
                  Move from setup to insights through a connected project workflow.
                </p>

              </div>
            </Reveal>

            <div className="workflow-list">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <Reveal key={step.number}>
                    <div className="workflow-item">

                      <div className="workflow-number">
                        {step.number}
                      </div>

                      <div className="workflow-content">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>

                      <div className="workflow-symbol">
                        <Icon />
                      </div>

                    </div>
                  </Reveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* WHY MEPZORA */}
        <section className="difference-section section">
          <div className="section-container difference-grid">

            <Reveal>
              <div className="eyebrow">
                <span /> BUILT AROUND YOUR WORK
              </div>

              <h2>
                More drawing clarity.
                <br />
                <span>Less manual effort.</span>
              </h2>

              <p>
                Bring project details, team coordination and progress visibility
                into one organized experience. Focus on what matters at every
                stage of construction.
              </p>

              <a href="#contact" className="button-primary">
                Get to know Mepzora <ArrowRight size={18} />
              </a>
            </Reveal>

            <Reveal className="difference-cards">

              <div className="difference-card difference-card-large">
                <div className="difference-card-icon">
                  <Clock3 />
                </div>

                <small>PROJECT WORKFLOW</small>

                <h3>
                  Keep every drawing stage
                  <br />
                  moving forward.
                </h3>

                <div className="mini-timeline">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="timeline-labels">
                  <span>Plan</span>
                  <span>Organize</span>
                  <span>Track</span>
                  <span>Improve</span>
                </div>
              </div>

              <div className="difference-card difference-card-small">
                <div className="difference-card-icon">
                  <MessageSquare />
                </div>

                <h3>
                  One connected
                  <br />
                  project experience.
                </h3>

                <span className="card-decoration">MZ.</span>
              </div>

            </Reveal>

          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section section" id="contact">
          <div className="section-container faq-grid">

            <Reveal>
              <div className="eyebrow">
                <span /> QUESTIONS & ANSWERS
              </div>

              <h2>
                Good questions.
                <br />
                <span>Clear answers.</span>
              </h2>

              <p>
                Learn more about the Mepzora.ai platform and its approach
                to construction management.
              </p>
            </Reveal>

            <Reveal className="faq-list">
              {questions.map(([question, answer], index) => (
                <div
                  className={`faq-item ${openFaq === index ? "faq-open" : ""}`}
                  key={question}
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                    aria-expanded={openFaq === index}
                  >
                    <span>{question}</span>
                    <ChevronDown size={20} />
                  </button>

                  <motion.div
                    className="faq-answer"
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                  >
                    <p>{answer}</p>
                  </motion.div>
                </div>
              ))}
            </Reveal>

          </div>
        </section>

        
{/* FINAL CTA */}
<section className="final-cta">

  <div className="cta-image" />
  <div className="cta-overlay" />

  <Reveal className="cta-content">

    <div className="eyebrow">
      <span /> INTELLIGENCE FOR THE FUTURE OF CONSTRUCTION
    </div>

    <h2>
      From drawings
      <br />
      <span>to decisions.</span>
    </h2>

    <p>
      Transform engineering drawings into construction quantities,
      structured BOQs and smarter project cost insights with
      Mepzora.ai.
    </p>

    <a href="mailto:hello@mepzora.ai" className="button-light">
      Connect with us <ArrowUpRight size={18} />
    </a>

  </Reveal>

  <div className="cta-decoration">
    MZ / DRAWING INTELLIGENCE
  </div>

</section>

{/* FOOTER */}
<footer className="footer">

  <a href="#home" className="logo">
    <img
      src="/mepzora-logo.png"
      alt="Mepzora AI"
      className="footer-logo-image"
    />
  </a>

  <p>
    AI-powered engineering drawing intelligence.
    Smarter quantities. Better estimates.
  </p>

  <span>© 2026 Mepzora.ai. All rights reserved.</span>

</footer>


      </div>
    </main>
  );
}