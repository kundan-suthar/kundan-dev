export const site = {
  name: "Kundan Suthar",
  headline: "Software Engineer | Full Stack & AI Applications",
  location: "Pune, Maharashtra, India",
  intro: "I’m a software engineer with 3+ years of experience building full-stack web applications and AI-powered products. I work across React, Next.js, TypeScript, Python, and FastAPI, with a focus on reusable architecture, reliable APIs, and practical AI features.",
  introSegments: [
    { text: "A " }, { text: "software engineer", strong: true }, { text: " with " }, { text: "3+ years of experience", strong: true },
    { text: " building full-stack applications and AI features. Based in " }, { text: "Pune, Maharashtra, India", strong: true },
    { text: ". Focused on thoughtful interfaces, dependable APIs, and useful AI." },
  ],
  blogIntro: "Writing on software and AI",
  contactPrompt: "Have a project or opportunity in mind?",
  email: "kundanss22@gmail.com",
  phone: "+91 9762611679",
  links: {
    linkedin: "TODO: Add LinkedIn profile URL",
    github: "TODO: Add GitHub profile URL",
    portfolio: "TODO: Add preferred portfolio domain",
    booking: "mailto:kundanss22@gmail.com",
  },
  resume: "/resume.pdf",
  skills: [
    { category: "Frontend", items: ["React", "Functional components", "Hooks", "Lifecycle", "Next.js", "SSR", "SSG", "API routes", "Routing", "TypeScript", "Tailwind CSS", "Material UI", "CSS Modules", "Styled Components"] },
    { category: "State & performance", items: ["Redux Toolkit", "Zustand", "Context API", "React Query", "Memoization", "Lazy loading", "Code splitting", "Virtualized tables", "Re-render minimization"] },
    { category: "Backend & APIs", items: ["Python", "FastAPI", "Node.js", "Express.js", "REST APIs", "JWT", "OAuth"] },
    { category: "AI", items: ["Generative AI", "OpenAI API", "Hugging Face", "LangChain", "LangGraph", "RAG", "FAISS", "Vector databases", "Pinecone"] },
    { category: "Data & cloud", items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker (basic)", "CI/CD"] },
    { category: "Tools", items: ["Vite", "Webpack", "Monorepo setups", "Alembic"] },
  ],
  education: [{ qualification: "Diploma in Information Technology", institution: "Dr. D. Y. Patil Polytechnic", location: "Pune, Maharashtra", year: "2015" }],
} as const;


