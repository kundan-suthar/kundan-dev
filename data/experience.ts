export type Experience = {
  company: string;
  mobileCompany?: string;
  role: string;
  mobileRole?: string;
  start: string;
  end: string;
  location: string;
  logo?: string;
  groups: { project?: string; bullets: string[] }[];
};

export const experience: Experience[] = [
  {
    company: "Capfront Technologies",
    mobileCompany: "Capfront Tech",
    role: "Software Engineer / AI Full Stack Developer",
    mobileRole: "AI Full Stack Engineer",
    start: "November 2025",
    end: "Present",
    location: "Bengaluru, Karnataka",
    logo: "/capfrontlo.png",
    groups: [
      {
        bullets: [
          "Improved React application load times by ==~30%== through memoization and lazy loading.",
          "Built asynchronous FastAPI REST services to support high-concurrency requests.",
          "Developed LLM-powered chat, summarization, and content-generation features using OpenAI APIs and Hugging Face.",
          "Created RAG pipelines with FAISS and Pinecone for domain-specific question answering.",
          "Integrated React and FastAPI services for real-time AI interactions, document ingestion, and semantic search.",
        ],
      },
    ],
  },
  {
    company: "New Era Tech",
    role: "AI Full Stack Engineer",
    start: "May 2023",
    end: "November 2025",
    location: "Pune, Maharashtra",
    logo: "/newera-favicon.webp",
    groups: [
      {
        bullets: [
          "Reduced initial page load time by ==~35%== using Next.js server-side rendering, static generation, and route-based code splitting.",
          "Translated ==15+== Figma screens into responsive, mobile-first interfaces with Tailwind CSS and Material UI.",
          "Reduced prop drilling and improved data flow across large component trees with Redux Toolkit and Zustand.",
          "Improved Lighthouse performance scores with memoization, lazy loading, and virtualized tables.",
          "Built REST API integrations with React Query for caching, loading, and error-state management.",
          "Created reusable component libraries with CSS Modules and Styled Components.",
          "Integrated Gemini AI, LLaMA, and LangChain features, including chatbot interfaces and real-time streaming UX.",
          "Collaborated with designers and backend engineers in agile sprints, code reviews, and coding standards work.",
          "Deployed React applications on AWS using CI/CD pipelines.",
        ],
      },
    ],
  },
];
