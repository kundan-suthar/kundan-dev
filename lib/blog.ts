import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  body: string;
};
const blogDirectory = join(process.cwd(), "content", "blog");

export function getBlogPosts(): BlogPost[] {
  return readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const source = readFileSync(join(blogDirectory, file), "utf8");
      const match = source.match(
        /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/,
      );
      if (!match) throw new Error(`Missing front matter in ${file}`);
      const fields = Object.fromEntries(
        match[1].split(/\r?\n/).map((line) => {
          const separator = line.indexOf(":");
          return separator < 0
            ? [line.trim(), ""]
            : [
                line.slice(0, separator).trim(),
                line
                  .slice(separator + 1)
                  .trim()
                  .replace(/^['"]|['"]$/g, ""),
              ];
        }),
      );
      if (!fields.title || !fields.date || !fields.description)
        throw new Error(`Blog post ${file} needs title, date, and description`);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: fields.title,
        date: fields.date,
        description: fields.description,
        body: match[2].trim(),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
