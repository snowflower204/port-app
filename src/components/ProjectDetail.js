import React, { useState } from "react";

function ProjectDetail({ project, updateStatus, onBack }) {
  // Add local state for toast
  const [statusUpdated, setStatusUpdated] = useState(false);

  // Safety in case project is missing
  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>
        <button className="btn-primary" onClick={onBack}>
          Back to Projects
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "#10b981";
      case "In Progress": return "#f59e0b";
      case "Planning": return "#6366f1";
      case "Ideating": return "#a855f7";
      default: return "#6b7280";
    }
  };

  // Wrap status change to trigger toast
  const handleStatusChange = (e) => {
    updateStatus(project.id, e.target.value);
    setStatusUpdated(true);
    setTimeout(() => setStatusUpdated(false), 1500); // auto-hide after 1.5s
  };

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Projects
      </button>

      <div className="detail-card">
        <div className="detail-content">
          <div className="detail-header">
            <h1 className="detail-title">{project.title}</h1>
            <span
              className="status-badge-large"
              style={{ backgroundColor: getStatusColor(project.status) }}
            >
              {project.status}
            </span>
          </div>

          <p className="detail-description">{project.description}</p>

          {/* Status update dropdown */}
          <div className="detail-section">
            <h3>Update Status</h3>
            <select
              className="status-dropdown"
              value={project.status}
              onChange={handleStatusChange}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planning">Planning</option>
              <option value="Ideating">Ideating</option>
            </select>

            {/* Toast message */}
            {statusUpdated && (
              <div className="status-toast">Status updated </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
