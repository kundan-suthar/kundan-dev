import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
export const metadata: Metadata = { title: "Resume", description: "Resume of Kundan Suthar, Software Engineer." };
export default function ResumePage() { return <main className="container subpage"><Link className="back-link" href="/">← Home</Link><h1>Resume</h1><p className="muted">{site.name} · {site.headline}</p><p><a className="text-link" href={site.resume}>Download resume (PDF) ↗</a></p><iframe className="resume-frame" src={site.resume} title="Kundan Suthar resume" /></main>; }
