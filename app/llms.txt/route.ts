import { site } from "@/data/site";
import { projects } from "@/data/projects";
export function GET() { const text = `# ${site.name}\n\n${site.headline}\n\n${site.intro}\n\nLocation: ${site.location}\nEmail: ${site.email}\n\n## Projects\n${projects.map((project) => `- [${project.title}](/projects/${project.slug}): ${project.description}`).join("\n")}\n`; return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
