import React from "react";
import "../styles.css";

export default function TechStack() {
  const skills = [
    { name: "React.js", logo: "/tech/react.png" },
    { name: "Node.js", logo: "/tech/node.png" },
    { name: "JavaScript", logo: "/tech/js.png" },
    { name: "HTML/CSS", logo: "/tech/htmlcss.png" },
    { name: "Python", logo: "/tech/python.png" },
    { name: "SQL", logo: "/tech/sql.png" },
    { name: "Next.js", logo: "/tech/next.png" },
    { name: "Express.js", logo: "/tech/express.png" },
  ];

  return (
    <div className="glass tech-stack">
      <h2>Tech Stacks & Skills</h2>

      <div className="tech-grid">
        {skills.map((s, i) => (
          <div key={i} className="tech-card glass">
            <img src={s.logo} alt={s.name} className="tech-logo" />
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
