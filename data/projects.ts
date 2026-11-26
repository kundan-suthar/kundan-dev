export type Project = { slug: string; title: string; description: string; status?: "In Progress"; liveUrl?: string; repoUrl?: string; details: string[]; stack: string[] };

export const projects: Project[] = [
  {
    slug: "sequence-crm", title: "Sequence CRM App", description: "A full-stack CRM for managing customer workflows with AI-powered insights.",
    liveUrl: "TODO: Add live project URL", repoUrl: "TODO: Add GitHub repository URL",
    details: [
      "Built a responsive CRM workflow interface with Next.js, React, and TypeScript, backed by FastAPI.",
      "Designed an asynchronous FastAPI backend with SQLAlchemy 2, PostgreSQL, and Redis, including JWT authentication, structured API layers, Alembic migrations, and reusable business logic.",
      "Integrated the OpenAI API for AI-powered CRM insights and used Docker Compose for the frontend, backend, PostgreSQL, and Redis services.",
    ], stack: ["Next.js", "React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "OpenAI API", "Docker Compose"],
  },
  {
    slug: "ai-interview-bot", title: "AI Interview Bot", description: "A mobile-first app for role-specific interview practice and mock interviews.",
    liveUrl: "TODO: Add live project URL", repoUrl: "TODO: Add GitHub repository URL",
    details: [
      "Built role-specific question generation for frontend, full-stack, and MERN interview preparation, plus mock interview simulations.",
      "Created interactive React components with Tailwind CSS and Context API, then deployed on Vercel with CI/CD.",
      "Designed a reusable component architecture that reduced code duplication by ==~40%== across interview tracks.",
    ], stack: ["React", "Tailwind CSS", "Context API", "Vercel", "CI/CD"],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
