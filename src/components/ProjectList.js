import React from "react";
import ProjectCard from "./ProjectCard";
import Projects from "../data/projects";

const ProjectList = ({ projects, updateStatus, onSelect }) => {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          updateStatus={updateStatus}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProjectList;
