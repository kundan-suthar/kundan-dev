import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getBlogPosts } from "@/lib/blog";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: base }, { url: `${base}/blog` }, { url: `${base}/resume` }, ...projects.map((item) => ({ url: `${base}/projects/${item.slug}` })), ...getBlogPosts().map((item) => ({ url: `${base}/blog/${item.slug}` }))]; }
