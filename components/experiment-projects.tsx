"use client";

import Link from "next/link";
import { useExperiment, useFlagsmith } from "@flagsmith/flagsmith/react";
import { projects, type ProjectId } from "@/data/projects";
import { useFlagsmithRuntime } from "@/components/flagsmith-provider";

const CONTROL_PROJECT: ProjectId = "ai_interview";

export function ExperimentProjects() {
  const runtime = useFlagsmithRuntime();

  if (!runtime.ready) {
    return <ProjectSkeleton />;
  }

  if (runtime.preview) {
    return <ProjectCards firstProjectId={CONTROL_PROJECT} />;
  }

  return <FlaggedProjects />;
}

function FlaggedProjects() {
  const experiment = useExperiment("featured_project");
  const flagsmith = useFlagsmith();

  if (experiment === null) {
    return <ProjectSkeleton />;
  }

  const selectedProject =
    typeof experiment.value === "string"
      ? projects.find((project) => project.id === experiment.value)
      : undefined;

  return (
    <ProjectCards
      firstProjectId={selectedProject?.id ?? CONTROL_PROJECT}
      onProjectOpen={(projectId) => {
        flagsmith.trackEvent("project_opened");
        flagsmith.trackEvent(`project_opened_${projectId}`);
      }}
    />
  );
}

function ProjectCards({
  firstProjectId,
  onProjectOpen,
}: {
  firstProjectId: ProjectId;
  onProjectOpen?: (projectId: ProjectId) => void;
}) {
  const orderedProjects = [
    ...projects.filter((project) => project.id === firstProjectId),
    ...projects.filter((project) => project.id !== firstProjectId),
  ];

  return (
    <section className="section" id="projects">
      <h2 className="section-title">Projects</h2>
      {orderedProjects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="project-item"
          aria-label={`View ${project.title} project`}
          onClick={() => onProjectOpen?.(project.id)}
        >
          <article>
            <div className="project-title-row">
              <span className="item-link">{project.title}</span>
              {project.status && (
                <span className="badge">{project.status}</span>
              )}
            </div>
            <p className="muted">{project.description}</p>
          </article>
        </Link>
      ))}
    </section>
  );
}

function ProjectSkeleton() {
  return (
    <section className="section" id="projects" aria-busy="true">
      <h2 className="section-title">Projects</h2>
      <div className="project-skeleton project-skeleton--large" />
      <div className="project-skeleton" />
      <div className="project-skeleton" />
    </section>
  );
}
