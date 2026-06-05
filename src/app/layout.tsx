import Footer from "@/app/_components/footer";
import { PostHogProvider } from "@/app/_components/posthog-provider";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `Agentic-SDLC.org`,
  description: `A statically generated blog using Next.js.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body>
        <PostHogProvider>
          <div className="min-h-screen">{children}</div>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
