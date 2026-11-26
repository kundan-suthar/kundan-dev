import Link from "next/link";
import type { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { site } from "@/data/site";
import type { Experience } from "@/data/experience";
import type { Project } from "@/data/projects";

export function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="section" id={id}>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function Highlight({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/==(.*?)==/g)
        .map((part, index) =>
          index % 2 ? <strong key={index}>{part}</strong> : part,
        )}
    </>
  );
}

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="experience-item">
      <div className="company-mark" aria-hidden="true">
        {item.logo ? <img src={item.logo} alt="" /> : item.company.slice(0, 1)}
      </div>
      <details className="experience-details">
        <summary className="experience-heading">
          <span className="experience-heading-main">
            <h3>
              {item.mobileCompany ? (
                <>
                  <span className="experience-desktop-label">
                    {item.company}
                  </span>
                  <span className="experience-mobile-label">
                    {item.mobileCompany}
                  </span>
                </>
              ) : (
                item.company
              )}
            </h3>
            <span className="muted">
              {item.mobileRole ? (
                <>
                  <span className="experience-desktop-label">{item.role}</span>
                  <span className="experience-mobile-label">
                    {item.mobileRole}
                  </span>
                </>
              ) : (
                item.role
              )}
            </span>
          </span>
          <span className="experience-heading-side">
            <span className="date">
              {item.start} – {item.end}
            </span>
            <span className="experience-arrow" aria-hidden="true">
              ›
            </span>
          </span>
        </summary>
        <div className="experience-content">
          <p className="location muted">{item.location}</p>
          {item.groups.map((group, index) => (
            <div className="experience-group" key={index}>
              {group.project && <h4>{group.project}</h4>}
              <ul>
                {group.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Highlight text={bullet} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </article>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-item"
      aria-label={`View ${project.title} project`}
    >
      <article>
        <div className="project-title-row">
          <span className="item-link">{project.title}</span>
          {project.status && <span className="badge">{project.status}</span>}
        </div>
        <p className="muted">{project.description}</p>
      </article>
    </Link>
  );
}

import type { BlogPost } from "@/lib/blog";
export function PostItem({ post }: { post: BlogPost }) {
  return (
    <Link className="post-item" href={`/blog/${post.slug}`}>
      <span>{post.title}</span>
      <time dateTime={post.date}>
        {new Date(`${post.date}T12:00:00`).toLocaleDateString("en", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </time>
    </Link>
  );
}

const socials = [
  { label: "LinkedIn", href: site.links.linkedin, icon: <FaLinkedin /> },
  { label: "GitHub", href: site.links.github, icon: <FaGithub /> },
  { label: "Email", href: `mailto:${site.email}`, icon: <MdEmail /> },
  { label: "Resume", href: site.resume, icon: <IoDocumentTextSharp /> },
];
export function SocialLinks({ footer = false }: { footer?: boolean }) {
  return (
    <nav
      className={footer ? "social-links footer-socials" : "social-links"}
      aria-label={footer ? "Social links" : "Contact links"}
    >
      {socials.map((item) =>
        item.href.startsWith("TODO") ? (
          <span
            key={item.label}
            aria-label={`${item.label} link TODO`}
            title={`${item.label} URL TODO`}
            className="social-link social-placeholder"
          >
            <span aria-hidden="true">{item.icon}</span>
          </span>
        ) : (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            className="social-link"
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
          </a>
        ),
      )}
    </nav>
  );
}
