import Link from "next/link";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { getBlogPosts } from "@/lib/blog";
import { ExperienceItem, PostItem, ProjectItem, Section, SocialLinks } from "@/components/portfolio";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const latestPosts = getBlogPosts().slice(0, 3);
  return <><a className="skip-link" href="#main">Skip to content</a><main id="main" className="container"><header className="site-header"><div className="header-top"><h1>{site.name}</h1><ThemeToggle /></div><p className="intro">{site.introSegments.map((part, index) => "strong" in part && part.strong ? <strong key={index}>{part.text}</strong> : <span key={index}>{part.text}</span>)}</p><SocialLinks /></header>
    <Section title="Experience">{experience.map((item) => <ExperienceItem item={item} key={item.company} />)}</Section>
    <Section title="Projects">{projects.map((project) => <ProjectItem project={project} key={project.slug} />)}</Section>
    <Section title="Blog"><div className="section-heading"><p className="muted">{site.blogIntro}</p><Link href="/blog" className="text-link">See all →</Link></div>{latestPosts.length ? latestPosts.map((post) => <PostItem post={post} key={post.slug} />) : <p className="todo-note">TODO: Add blog posts in <code>/content/blog</code>.</p>}</Section>
    <Section title="Skills"><div className="skills-list">{site.skills.map((group) => <p key={group.category}><strong>{group.category}</strong><span>{group.items.join(", ")}</span></p>)}</div></Section>
    <Section title="Education">{site.education.map((item) => <div className="education-item" key={item.qualification}><h3>{item.qualification}</h3><p className="muted">{item.institution} · {item.location} · {item.year}</p></div>)}</Section>
    <Section title="Let’s talk"><p className="contact-line"><strong>{site.contactPrompt}</strong><a className="text-link" href={`mailto:${site.email}`}>Get in touch ↗</a></p></Section>
    <footer className="site-footer"><SocialLinks footer /><p>© 2026 {site.name}</p><Link className="text-link" href="/resume">Resume</Link></footer>
  </main></>;
}
