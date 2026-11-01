
import React, { useEffect, useRef, useState } from "react";
import "./homepage.css";
import "./scrapbook.css";

// ========================================
// FEATURED HIGHLIGHTS DATA
// ========================================

const featuredFolders = [
  {
    id: "01",
    title: "Innovator",
    description: "I imagine possibilities and build solutions.",
    category: "IDEAS & INNOVATION",
    className: "folder-innovator",
  },
  {
    id: "02",
    title: "Creator",
    description: "I turn ideas into meaningful experiences.",
    category: "DESIGN & CREATIVITY",
    className: "folder-creator",
  },
  {
    id: "03",
    title: "Leader",
    description: "I bring people together and empower them.",
    category: "COMMUNITY & IMPACT",
    className: "folder-leader",
  },
  {
    id: "04",
    title: "Explorer",
    description: "I learn, discover, and grow beyond boundaries.",
    category: "LEARNING & DISCOVERY",
    className: "folder-explorer",
  },
];

// ========================================
// FLOATING INTEREST LABELS
// ========================================

const floatingInterests = [
  { name: "Web Dev", className: "interest-1" },
  { name: "Machine Learning", className: "interest-2" },
  { name: "Data Analysis", className: "interest-3" },
  { name: "Cloud", className: "interest-4" },
  { name: "Quantum", className: "interest-5" },
  { name: "Robotics", className: "interest-6" },
  { name: "Research", className: "interest-7" },
  { name: "Startups", className: "interest-8" },
  { name: "Community", className: "interest-9" },
  { name: "Mentoring", className: "interest-10" },
  { name: "Design", className: "interest-11" },
  { name: "Innovation", className: "interest-12" },
];

// ========================================
// MAIN APPLICATION
// ========================================

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [folderProgress, setFolderProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const highlightsRef = useRef(null);

  // ========================================
  // ACCESSIBILITY: REDUCED MOTION
  // ========================================

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ========================================
  // SCROLL TRACKING AND PARALLAX
  // ========================================

  useEffect(() => {
    let frame = null;

    function updateScroll() {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        setScrollY(currentScroll);

        // Calculate parallax relative to Highlights.
        if (highlightsRef.current) {
          const rect =
            highlightsRef.current.getBoundingClientRect();

          const viewportHeight = window.innerHeight;

          const progress =
            (viewportHeight * 0.6 - rect.top) /
            viewportHeight;

          setFolderProgress(
            Math.max(-1, Math.min(1, progress))
          );
        }

        frame = null;
      });
    }

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // ========================================
  // SECTION REVEAL ANIMATION
  // ========================================

  useEffect(() => {
    const elements =
      document.querySelectorAll(".reveal");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // ========================================
  // CURSOR REPULSION EFFECT
  // ========================================

  function handleHeroMouseMove(event) {
    if (
      event.pointerType === "touch" ||
      prefersReducedMotion
    ) {
      return;
    }

    const labels =
      heroRef.current?.querySelectorAll(
        ".floating-interest"
      );

    if (!labels) return;

    const radius = 180;

    labels.forEach((label) => {
      const rect = label.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = centerX - event.clientX;
      const distanceY = centerY - event.clientY;

      const distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
      );

      if (distance < radius) {
        const safeDistance = Math.max(distance, 1);

        const strength =
          (1 - distance / radius) * 48;

        const moveX =
          (distanceX / safeDistance) * strength;

        const moveY =
          (distanceY / safeDistance) * strength;

        label.style.setProperty(
          "--push-x",
          `${moveX}px`
        );

        label.style.setProperty(
          "--push-y",
          `${moveY}px`
        );
      } else {
        label.style.setProperty("--push-x", "0px");
        label.style.setProperty("--push-y", "0px");
      }
    });
  }

  function resetHeroInterests() {
    const labels =
      heroRef.current?.querySelectorAll(
        ".floating-interest"
      );

    labels?.forEach((label) => {
      label.style.setProperty("--push-x", "0px");
      label.style.setProperty("--push-y", "0px");
    });
  }

  // ========================================
  // LOGO ANIMATION
  // ========================================

  const moveLogo = Math.min(scrollY, 850);

  const logoStyle = prefersReducedMotion
    ? {}
    : {
        transform: `
          translate3d(0, ${moveLogo * 0.22}px, 0)
          rotate(${moveLogo * 0.07}deg)
          scale(${1 + moveLogo * 0.00025})
        `,
      };

  const aboutLogoStyle = prefersReducedMotion
    ? {}
    : {
        transform: `
          translate3d(
            0,
            ${Math.max(
              -65,
              Math.min(
                65,
                (scrollY - 1000) * 0.08
              )
            )}px,
            0
          )
          rotate(
            ${Math.max(
              -20,
              Math.min(
                20,
                (scrollY - 1000) * 0.025
              )
            )}deg
          )
        `,
      };

  // ========================================
  // FOLDER PARALLAX
  // ========================================

  function folderParallax(index) {
    if (prefersReducedMotion) return {};

    const direction = index % 2 === 0 ? 1 : -1;

    return {
      transform: `translate3d(
        0,
        ${folderProgress * direction * 28}px,
        0
      )`,
    };
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  // ========================================
  // WEBSITE
  // ========================================

  return (
    <div className="portfolio-site">

      {/* ===================================
          NAVIGATION
      =================================== */}

      <header className="site-header">

        <a
          className="site-brand"
          href="#home"
          onClick={closeMenu}
        >
          HAH<span>.</span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>

        <nav
          id="main-navigation"
          className={`site-nav ${
            mobileMenuOpen ? "open" : ""
          }`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#highlights" onClick={closeMenu}>
            Highlights
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

      </header>

      <main>

        {/* ===================================
            SECTION 1: SCRAPBOOK HERO
        =================================== */}

        <section
          id="home"
          className="scrapbook-hero"
          ref={heroRef}
          onPointerMove={handleHeroMouseMove}
          onPointerLeave={resetHeroInterests}
        >

          <div className="scrapbook-paper">

            {/* Notebook background */}

            <div
              className="notebook-lines"
              aria-hidden="true"
            />

            {/* FLOATING INTEREST WORDS */}

            <div
              className="interest-field"
              aria-hidden="true"
            >
              {floatingInterests.map((interest) => (
                <span
                  key={interest.name}
                  className={`floating-interest ${interest.className}`}
                >
                  {interest.name}
                </span>
              ))}
            </div>

            {/* FOUR MAIN IDENTITY BUBBLES */}

            <div className="identity-field">

              <span className="identity-bubble bubble-innovator">
                ✳ Innovator
              </span>

              <span className="identity-bubble bubble-creator">
                ✦ Creator
              </span>

              <span className="identity-bubble bubble-leader">
                ✳ Leader
              </span>

              <span className="identity-bubble bubble-explorer">
                ✦ Explorer
              </span>

            </div>

            {/* HERO TITLE */}

            <div className="scrapbook-hero-content">

              <span className="scrapbook-intro">
                my name is
              </span>

              <h1>HANNAH</h1>

              <div className="hero-center-logo">
                 <img
                   src="/logo.png"
                   alt="Hannah's portfolio logo"
                   className="hero-center-logo-image"
                   
                  />
               </div>

              <p className="scrapbook-subtitle">
                just a girl who loves learning
              </p>

              <a
                href="#highlights"
                className="scrapbook-cta"
              >
                Explore my world
                <span aria-hidden="true">↗</span>
              </a>

            </div>

          

            {/* HERO FOOTER */}

            <div className="scrapbook-hero-footer">

              <span>HANNAH A. HONTIVEROS</span>

              <span>SCROLL TO EXPLORE ↓</span>

            </div>

          </div>

        </section>


        {/* ===================================
            SECTION 2: FEATURED HIGHLIGHTS
        =================================== */}

        <section
          id="highlights"
          className="featured-highlights"
          ref={highlightsRef}
        >

          <div className="featured-heading reveal">

            <span className="eyebrow">
              01 / THE COLLECTION
            </span>

            <h2>
              Featured <em>Highlights.</em>
            </h2>

            <p>
              A little collection of the things
              that make me, me.
            </p>

          </div>

          <div className="folder-grid">

            {featuredFolders.map((folder, index) => (

              <article
                key={folder.id}
                className={`feature-folder ${folder.className}`}
                style={folderParallax(index)}
              >

                <div className="folder-tab">
                  <span>{folder.title}</span>
                </div>

                <div className="folder-body">

                  <div className="folder-meta">
                    <span>
                      FILE {folder.id} / 04
                    </span>

                    <span aria-hidden="true">✳</span>
                  </div>

                  {/* PHOTO PLACEHOLDER */}

                  <div className="folder-photo-placeholder">
                    <span aria-hidden="true">+</span>
                    <small>ADD PHOTO LATER</small>
                  </div>

                  {/* FOLDER CONTENT */}

                  <div className="folder-text">

                    <span className="folder-category">
                      {folder.category}
                    </span>

                    <h3>{folder.title}</h3>

                    <p>{folder.description}</p>

                  </div>

                  <div className="folder-bottom">

                    <span>MORE TO DISCOVER</span>

                    <span aria-hidden="true">
                      ↗
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* ===================================
            SECTION 3: ABOUT ME
        =================================== */}

        <section
          id="about"
          className="about-section section-spacing"
        >

          <div className="section-heading reveal">

            <span className="eyebrow">
              02 / THE PERSON
            </span>

            <h2>
              A Little <em>About Me.</em>
            </h2>

          </div>

          <div className="about-layout">

            {/* PORTRAIT */}

            <div className="about-photo-frame reveal">

              <img
                src="/images/hannah-portrait.png"
                alt="Hannah Hontiveros"
                className="portrait-image"
              />

              {/* FLOATING DECORATIVE LOGO */}

              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="about-floating-logo"
                style={aboutLogoStyle}
              />

            </div>

            {/* BIOGRAPHY */}

            <div className="about-story glass-panel reveal">

              <span className="eyebrow">
                HELLO, WORLD!
              </span>

              <h3>
                Genius? No.
                <br />
                <span>Curious? Always.</span>
              </h3>

              <p>
                Hi! I'm Hannah A. Hontiveros,
                but you can call me Hann.
              </p>

              <p>
                I'm an Information Technology student,
                researcher, and startup builder who
                loves turning ideas into solutions.
                My interests lie in software development,
                data, networks, and emerging technologies.
                I enjoy exploring how technology works
                and finding ways to make it useful
                in everyday life.
              </p>

              <p>
                Beyond building projects, I also enjoy
                bringing people together. Through
                mentoring, tutoring, organizing events,
                and leading student communities,
                I help young people discover opportunities
                and build confidence in technology.
              </p>

              <p>
                I'm still learning, experimenting,
                and figuring things out along the way.
                Whether I'm developing a new idea,
                working on research, or helping someone
                take their first step into tech,
                I want my work to create something
                meaningful.
              </p>

              <a
                className="text-link"
                href="#highlights"
              >
                Explore my highlights
                <span aria-hidden="true">↗</span>
              </a>

            </div>

          </div>

        </section>


        {/* ===================================
            SECTION 4: CONTACT
        =================================== */}

        <section
          id="contact"
          className="contact-section"
        >

          <div className="contact-panel reveal">

            <span className="eyebrow">
              03 / THE NEXT CHAPTER
            </span>

            <h2>
              Let's build
              <br />
              <em>something meaningful.</em>
            </h2>

            <p>
              I'm always open to meaningful
              conversations, learning opportunities,
              research collaborations, and ideas
              that can make a difference.
            </p>

            <a
              href="https://github.com/snowflower204"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              Explore my GitHub ↗
            </a>

            <div
              className="contact-decoration"
              aria-hidden="true"
            >
              ✳
            </div>

          </div>

        </section>

      </main>


      {/* ===================================
          FOOTER
      =================================== */}

      <footer className="site-footer">

        <span>
          © {new Date().getFullYear()} Hannah A. Hontiveros
        </span>

        <span>
          Made with curiosity & creativity.
        </span>

        <a href="#home">
          Back to top ↑
        </a>

      </footer>

    </div>
  );
}

export default App;
