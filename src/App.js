import React, { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ProjectList from "./components/ProjectList";
import TechStack from "./components/TechStack";
import ProjectDetail from "./components/ProjectDetail";
import projectsData from "./data/projects";
import "./styles.css";

function App() {
  // Load projects from localStorage or fallback
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : projectsData;
  });

  // Selected project state for detail view
  const [selectedProject, setSelectedProject] = useState(null);

  // Persist projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Update status callback
  const updateStatus = (id, newStatus) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      )
    );
  };

  // smooth scroll refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const techRef = useRef(null);
  const projectRef = useRef(null);
  const scrollTo = (ref) => ref.current.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <NavBar
        onHome={() => scrollTo(homeRef)}
        onAbout={() => scrollTo(aboutRef)}
        onTech={() => scrollTo(techRef)}
        onProjects={() => scrollTo(projectRef)}
      />

      {/* If project is selected → show detail page in modal */}
      {selectedProject ? (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)} // close when clicking outside
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <ProjectDetail
              project={selectedProject}
              updateStatus={updateStatus}
              onBack={() => setSelectedProject(null)}
            />
          </div>
        </div>
      ) : (
        <>
          {/* HOME */}
          <section ref={homeRef} className="home-section">
            <img src="/logo.png" className="home-logo-spin" alt="logo" />
            <h1 className="home-title">HAH DEV Portfolio</h1>
          </section>

          {/* ABOUT */}
          <section ref={aboutRef}>
            <About />
          </section>

          {/* TECH STACK */}
          <section ref={techRef}>
            <TechStack />
          </section>

          {/* PROJECTS */}
          <section ref={projectRef}>
            <ProjectList
              projects={projects}
              updateStatus={updateStatus}
              onSelect={(p) => setSelectedProject(p)}
            />
          </section>

          <footer className="footer">
            © {new Date().getFullYear()} Hannah Hontiveros
          </footer>
        </>
      )}
    </>
  );
}

export default App;
