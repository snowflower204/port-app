
import React, { useEffect, useState } from "react";
import "./homepage.css";

const journeys = [
  {
    number: "01",
    name: "Inventor",
    intro: "I'm an Inventor",
    quote: "I build projects and learn from challenges.",
    imageLabel: "Inventor photograph",
    className: "inventor",
  },
  {
    number: "02",
    name: "Researcher",
    intro: "I'm a Researcher",
    quote: "I question and explore the possibilities.",
    imageLabel: "Researcher photograph",
    className: "researcher",
  },
  {
    number: "03",
    name: "Leader",
    intro: "I'm Also a Leader",
    quote: "I inspire youth and care for my community.",
    imageLabel: "Leader photograph",
    className: "leader",
  },
];

function PhotoPlaceholder({ label, className = "" }) {
  return (
    <div className={`photo-placeholder ${className}`}>
      <span className="photo-placeholder-icon" aria-hidden="true">
        +
      </span>
      <span>{label}</span>
      <small>Photo coming soon</small>
    </div>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = null;

    function handleScroll() {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        frame = null;
      });
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const moveLogo = Math.min(scrollY, 850);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const logoStyle = prefersReducedMotion
    ? {}
    : {
        transform: `
          translate3d(0, ${moveLogo * 0.22}px, 0)
          rotate(${moveLogo * 0.07}deg)
          scale(${1 + moveLogo * 0.00025})
        `,
      };

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="portfolio-site">
      {/* NAVIGATION */}
      <header className="site-header">
        <a className="site-brand" href="#home" onClick={closeMenu}>
          HAH<span>.</span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>

        <nav className={`site-nav ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#journeys" onClick={closeMenu}>Explore</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero-section">
          <div className="hero-panel">
            <div className="hero-decor hero-decor-one" />
            <div className="hero-decor hero-decor-two" />

            <div className="hero-content">
              <span className="eyebrow hero-eyebrow">
                WELCOME TO MY DIGITAL SPACE
              </span>

              <h1>
                Hi, I'm
                <br />
                <span>Hannah.</span>
              </h1>

              <p className="hero-tagline">
                I create. I discover. I empower.
              </p>

              <p className="hero-description">
                An Information Technology student exploring the
                possibilities of emerging technologies, scientific
                research, and community-driven innovation.
              </p>

              <a className="hero-link" href="#about">
                Discover my story <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="hero-art" aria-label="Portfolio logo">
              <div className="logo-halo" />
              <div className="logo-orbit logo-orbit-one" />
              <div className="logo-orbit logo-orbit-two" />

              <img
                src="/logo.png"
                alt="Hannah's portfolio logo"
                className="hero-logo"
                style={logoStyle}
              />
            </div>

            <div className="hero-bottom">
              <span>PORTFOLIO / 2026</span>
              <a href="#about">SCROLL TO EXPLORE ↓</a>
            </div>
          </div>
        </section>

          
{/* ABOUT */}
<section id="about" className="about-section section-spacing">
  <div className="section-heading reveal">
    <span className="eyebrow">01 / THE PERSON</span>
    <h2>A Little <em>About Me.</em></h2>
  </div>

  <div className="about-layout">
    <div className="about-photo-frame reveal">
      <img
        src="/images/hannah-portrait.png"
        alt="Hannah Hontiveros"
        className="portrait-image"
      />

      {/* Decorative logo with scroll movement */}
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="about-floating-logo"
        style={
          prefersReducedMotion
            ? {}
            : {
                transform: `translate3d(0, ${
                  Math.max(-65, Math.min(65, (scrollY - 1000) * 0.08))
                }px, 0) rotate(${
                  Math.max(-20, Math.min(20, (scrollY - 1000) * 0.025))
                }deg)`,
              }
        }
      />
    </div>

    <div className="about-story glass-panel reveal">
      <span className="eyebrow">HELLO, WORLD!</span>

      <h3>
        Genius? No.
        <br />
        <span>Curious? Always.</span>
      </h3>

      <p>
        Hi! I'm Hannah A. Hontiveros, but you can call me Hann.
      </p>

      <p>
        I'm an Information Technology student, researcher, and
        startup builder who loves turning ideas into solutions.
        My interests lie in software development, data, networks,
        and emerging technologies. I enjoy exploring how technology
        works and finding ways to make it useful in everyday life.
      </p>

      <p>
        Beyond building projects, I also enjoy bringing people
        together. Through mentoring, tutoring, organizing events,
        and leading student communities, I help young people
        discover opportunities and build confidence in technology.
      </p>

      <p>
        I'm still learning, experimenting, and figuring things
        out along the way. Whether I'm developing a new idea,
        working on research, or helping someone take their first
        step into tech, I want my work to create something
        meaningful.
      </p>

      <a className="text-link" href="#journeys">
        Get to know me <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</section>


        {/* THREE IDENTITIES */}
        <section id="journeys" className="journey-section section-spacing">
          <div className="journey-intro reveal">
            <div>
              <span className="eyebrow">02 / EXPLORE</span>
              <h2>
                Three Things
                <br />
                <em>About Me.</em>
              </h2>
            </div>

            <p>
              Three perspectives, one journey.
              A little glimpse into the different sides of who I am.
            </p>
          </div>

          <div className="journey-grid">
            {journeys.map((journey) => (
              <article
                key={journey.number}
                className={`journey-card ${journey.className} reveal`}
              >
                <div className="journey-card-top">
                  <span>{journey.number} / 03</span>
                  <span className="journey-symbol" aria-hidden="true">
                    ✳
                  </span>
                </div>

                <div className="journey-photo">
                  <PhotoPlaceholder label={journey.imageLabel} />
                </div>

                <div className="journey-card-content">
                  <span className="journey-small-title">{journey.intro}</span>
                  <h3>{journey.name}</h3>
                  <p>"{journey.quote}"</p>
                </div>

                <div className="journey-card-footer">
                  <span>CHAPTER COMING SOON</span>
                  <span className="journey-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="contact-panel reveal">
            <span className="eyebrow">03 / THE NEXT CHAPTER</span>

            <h2>
              Let's build
              <br />
              <em>something meaningful.</em>
            </h2>

            <p>
              I'm always open to meaningful conversations, learning
              opportunities, research collaborations, and ideas
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

            <div className="contact-decoration" aria-hidden="true">
              ✳
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Hannah A. Hontiveros</span>
        <span>Made with curiosity & creativity.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
