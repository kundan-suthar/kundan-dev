import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { TrackedLink } from "@/components/tracked-link";
export function generateStaticParams() {
  return projects.map(({ id }) => ({ slug: id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? {
        title: project.title,
        description: project.description,
        openGraph: { title: project.title, description: project.description },
      }
    : {};
}
export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="container subpage">
      <Link className="back-link" href="/">
        ← Home
      </Link>
      <Suspense
        fallback={
          <article>
            <p className="muted">Loading project...</p>
          </article>
        }
      >
        <ProjectContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProjectContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <article>
      <h1>{project.title}</h1>
      <p className="article-description">{project.description}</p>
      <ul className="detail-list">
        {project.details.map((detail) => (
          <li key={detail}>
            {detail
              .split(/==(.*?)==/g)
              .map((part, index) =>
                index % 2 ? <strong key={index}>{part}</strong> : part,
              )}
          </li>
        ))}
      </ul>
      {project.stack && (
        <>
          <h2 className="section-title">Tools used</h2>
          <p className="muted">{project.stack.join(" · ")}</p>
        </>
      )}
      <p className="project-links">
        {project.liveUrl?.startsWith("http") && (
          <TrackedLink
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            eventName="live_demo_clicked"
          >
            Live project ↗
          </TrackedLink>
        )}
        {project.repoUrl?.startsWith("http") && (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Source code ↗
          </a>
        )}
      </p>
      <TrackedLink
        className="text-link"
        href={`mailto:${site.email}`}
        target="_blank"
        eventName="contact_clicked"
      >
        Ask me about this project ↗
      </TrackedLink>
    </article>
  );
}
