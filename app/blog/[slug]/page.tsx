import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/blog";
export function generateStaticParams() { const posts = getBlogPosts(); return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "_todo" }]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const post = getBlogPosts().find((item) => item.slug === slug); return post ? { title: post.title, description: post.description, openGraph: { title: post.title, description: post.description, type: "article" } } : {}; }
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = getBlogPosts().find((item) => item.slug === slug); if (!post) notFound(); return <main className="container subpage"><Link className="back-link" href="/blog">← Blog</Link><article><h1>{post.title}</h1><time className="muted" dateTime={post.date}>{post.date}</time><p className="article-description">{post.description}</p><div className="article-body">{post.body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article></main>; }
