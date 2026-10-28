import React from "react";

export default function ProjectCard({ project, updateStatus, onSelect }) {
  const handleChange = (e) => {
    updateStatus(project.id, e.target.value);
  };

  return (
    <div className="glass project-card" onClick={() => onSelect(project)}>
      <h3>{project.title}</h3>
      <p>{project.category}</p>
      <p className="desc">{project.short}</p>

      <details>
        <summary>View Details</summary>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>Stack:</strong> {project.stack}</p>
        <p><strong>Built:</strong> {project.build}</p>

        {/* Status dropdown */}
        <div className="status-control" onClick={(e) => e.stopPropagation()}>
          <label htmlFor={`status-${project.id}`}>Change Status:</label>
          <select
            id={`status-${project.id}`}
            className="status-dropdown"
            value={project.status}
            onChange={handleChange}
          >
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planning">Planning</option>
            <option value="Ideating">Ideating</option>
          </select>
        </div>
      </details>
    </div>
  );
}
