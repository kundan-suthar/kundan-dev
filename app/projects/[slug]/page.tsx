import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? {
        title: project.title,
        description: project.description,
        openGraph: { title: project.title, description: project.description },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main className="container subpage">
      <Link className="back-link" href="/">
        ← Home
      </Link>
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
        <h2 className="section-title">Tools used</h2>
        <p className="muted">{project.stack.join(" · ")}</p>
        <p className="project-links">
          {project.liveUrl?.startsWith("http") && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live project ↗
            </a>
          )}
          {project.repoUrl?.startsWith("http") && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Source code ↗
            </a>
          )}
        </p>
        <p className="todo-note">
          TODO: Add verified live and repository links.
        </p>
        <a className="text-link" href={`mailto:${site.email}`}>
          Ask me about this project ↗
        </a>
      </article>
    </main>
  );
}
