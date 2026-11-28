export type Project = {
  id: ProjectId;
  title: string;
  description: string;
  status?: "In Progress";
  liveUrl?: string;
  repoUrl?: string;
  details: string[];
  stack?: string[];
};

export type ProjectId = "ai_interview" | "sequence_crm" | "pdf_chatbot";

export const projects: Project[] = [
  {
    id: "ai_interview",
    title: "AI Interview App",
    description:
      "Upload a resume and job description, run a 2-minute AI interview, and get a report.",
    liveUrl: "https://interview-app-frontend-ten.vercel.app/",
    details: [
      "Upload a resume and job description to prepare for a role-specific interview.",
      "Complete a 2-minute AI-led interview.",
      "Review a generated interview report.",
    ],
    stack: ["React", "Tailwind CSS", "Context API", "Vercel", "CI/CD"],
  },
  {
    id: "sequence_crm",
    title: "Sequence CRM",
    description:
      "Track leads with role-based access control (RBAC) and generate AI meeting reports with positive, negative, or neutral sentiment.",
    liveUrl: "https://sequence-crm.vercel.app/",
    details: [
      "Track leads with role-based access control (RBAC).",
      "Generate AI meeting reports classified as positive, negative, or neutral.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
      "Docker Compose",
    ],
  },
  {
    id: "pdf_chatbot",
    title: "PDF Chatbot",
    description:
      "Upload a PDF and chat with its content using retrieval-augmented generation (RAG).",
    liveUrl: "https://rag-pdf-client.vercel.app/",
    details: [
      "Upload a PDF document.",
      "Ask questions and chat with the document's content using RAG.",
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.id === slug);
