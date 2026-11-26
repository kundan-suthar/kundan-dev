import type { Metadata } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: { default: `${site.name} · ${site.headline}`, template: `%s · ${site.name}` },
  description: site.intro,
  openGraph: { type: "website", title: `${site.name} · ${site.headline}`, description: site.intro, siteName: site.name },
  twitter: { card: "summary", title: site.name, description: site.intro },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
