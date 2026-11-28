# Kundan Suthar — Developer Portfolio

A personal portfolio for presenting software engineering experience, selected projects, technical skills, education, and a downloadable resume. It also includes a live Flagsmith experiment that tests which featured project visitors open.

The site is built as a small, content-driven Next.js application: portfolio content lives in TypeScript data files, project pages are generated from that data, and there is no application database or custom backend service.

## What’s here

- **Professional profile:** introduction, social links, expandable work history, grouped skills, and education.
- **Project showcase:** AI Interview App, Sequence CRM, and PDF Chatbot, each with a detail page and available live-demo links.
- **Resume:** an in-browser PDF view and download using `public/resume.pdf`.
- **Blog foundation:** `/blog` and article routes read post files from `content/blog`. The homepage blog section is currently disabled, and the repository only contains an article template.
- **Comfort and accessibility:** light/dark theme toggle, responsive layouts, reduced-motion support, and a skip-to-content link.
- **Experimentation:** Flagsmith assigns a featured-project variation and records exposures and visitor interactions.
- **Search and sharing metadata:** page metadata, Open Graph/Twitter cards, `robots.txt`, and a generated sitemap.

## Featured-project experiment

The homepage experiment uses the multivariate Flagsmith feature `featured_project`. Its values must match the project IDs below:

| Variation value | Project shown first |
| --- | --- |
| `ai_interview` | AI Interview App (control) |
| `sequence_crm` | Sequence CRM |
| `pdf_chatbot` | PDF Chatbot |

The selected project moves to the front of the project list; all cards retain the same layout and styling. In a normal visit, the browser creates and stores a random visitor ID so the assignment can remain associated with that visitor. The UI records `project_opened`, `project_opened_<project-id>`, `live_demo_clicked`, and `contact_clicked` events where applicable.

Add `?preview` to any page URL to preview the control layout without initializing Flagsmith or recording exposures and events.

### Configure Flagsmith

1. Create or select a Flagsmith environment and configure the `featured_project` multivariate feature with the three values in the table.
2. Set the environment's **client-side environment ID** in `.env.local`:

   ```dotenv
   NEXT_PUBLIC_FLAGSMITH_ENV_ID=your_client_side_environment_id
   ```

3. Restart the development server after changing environment variables.

The browser environment ID is intentionally public. Do not put a server-side SDK key in a `NEXT_PUBLIC_` variable.

## Run locally

### Requirements

- Node.js compatible with the installed Next.js version
- npm
- A Flagsmith environment ID if you want to exercise the live experiment; the rest of the portfolio can be developed without configuring the optional simulator key

### Install and start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site uses Next.js App Router and Turbopack for local development.

### Common commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build (run `npm run build` first) |

## Simulated experiment traffic

`scripts/simulate-traffic.mjs` is an optional Node.js ESM script for sending **simulated** traffic to the configured Flagsmith environment. It uses deterministic identities (`sim_00000`, `sim_00001`, ...) and illustrative conversion probabilities so results can be compared with the experiment dashboard. This is test data, not real visitor behavior.

The script needs a **server-side environment key** in `.env`:

```dotenv
FLAGSMITH_ENV_KEY=your_server_side_environment_key
```

Keep this key private and never commit it. Environment files are ignored by Git. `NEXT_PUBLIC_FLAGSMITH_ENV_ID` is not a substitute for this server-side key.

Run the script with Node (not Python):

```bash
node scripts/simulate-traffic.mjs --count 450 --start 0 --seed 42
```

| Option | Default | Meaning |
| --- | ---: | --- |
| `--count` | `450` | Number of simulated identities |
| `--start` | `0` | First identity index; useful for running another non-overlapping range |
| `--seed` | `42` | Seed for repeatable conversion decisions |

The script first evaluates the experiment for each identity, flushes exposure events, and waits five seconds for ingestion. It then generates conversion events using made-up illustrative rates: `ai_interview` 30%, `sequence_crm` 38%, `pdf_chatbot` 46%. Converted identities may also emit `live_demo_clicked` (35%) and `contact_clicked` (8%) events. Calls are paced, events are flushed before exit, and a summary reports identities served, conversions, conversion rate, and errors by variation.

Traffic is sent live and is not backdated. Use a test Flagsmith environment if you do not want simulator events mixed with production analytics.

## Updating portfolio content

- **Profile, skills, education, links, and site metadata:** edit `data/site.ts`.
- **Work history:** edit `data/experience.ts`.
- **Projects and experiment variation IDs:** edit `data/projects.ts`. Keep project IDs in sync with the `featured_project` values configured in Flagsmith.
- **Resume PDF:** replace `public/resume.pdf` with the intended document.
- **Blog posts:** copy `content/blog/_template.mdx` to a new `.mdx` file and fill in `title`, `date` (`YYYY-MM-DD`), and `description` front matter. Separate body paragraphs with blank lines. The current blog renderer displays paragraphs; it does not provide full MDX component rendering.
- **Site URL for canonical metadata and sitemap:** set `NEXT_PUBLIC_SITE_URL` in the deployment environment. Until set, the app uses `https://example.com` as its fallback.

## Project structure

```text
app/                    App Router pages, metadata, sitemap, robots
components/             Portfolio sections, theme, tracking, Flagsmith UI
content/blog/           Blog article files and starter template
data/                   Portfolio, experience, and project content
lib/blog.ts             Blog file loading and front matter parsing
public/                 Images, logos, and resume PDF
scripts/                Local developer utilities, including traffic simulation
```

## Technology

- Next.js App Router, React, and TypeScript
- Tailwind CSS toolchain and custom CSS
- Flagsmith browser SDK for experiment assignment and event tracking
- Flagsmith Node.js SDK and `dotenv` for the optional traffic simulator

## Deployment notes

Deploy as a Node-compatible Next.js application. Configure `NEXT_PUBLIC_FLAGSMITH_ENV_ID` and `NEXT_PUBLIC_SITE_URL` in the deployment environment. The traffic simulator is a developer utility and does not need to be deployed with the site; keep `FLAGSMITH_ENV_KEY` server-side and out of client bundles.
