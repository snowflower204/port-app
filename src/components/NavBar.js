import React from "react";
import "../styles.css";

function NavBar({ onHome, onAbout, onTech, onProjects }) {
  return (
    <header className="navbar glass">
      <div className="nav-brand">Hannah Hontiveros</div>

      <nav>
        <button onClick={onHome}>Home</button>
        <button onClick={onAbout}>About</button>
        <button onClick={onTech}>Tech Stack</button>
        <button onClick={onProjects}>Projects</button>
      </nav>
    </header>
  );
}

export default NavBar;
