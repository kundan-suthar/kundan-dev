import type { Metadata } from "next";
import Link from "next/link";
import { PostItem, Section } from "@/components/portfolio";
import { getBlogPosts } from "@/lib/blog";
export const metadata: Metadata = { title: "Blog", description: "Writing by Kundan Suthar about software engineering and AI." };
export default function BlogPage() { const posts = getBlogPosts(); return <main className="container subpage"><Link className="back-link" href="/">← Home</Link><h1>Blog</h1><Section title="Articles">{posts.length ? posts.map((post) => <PostItem post={post} key={post.slug} />) : <p className="todo-note">TODO: Add MDX articles to <code>/content/blog</code> to publish them here.</p>}</Section></main>; }
