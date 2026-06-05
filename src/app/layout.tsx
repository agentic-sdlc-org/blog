import Footer from "@/app/_components/footer";
import { PostHogProvider } from "@/app/_components/posthog-provider";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agentic-sdlc.org"),
  title: `Agentic-SDLC.org`,
  description: `Journaling the journey to agentic software development — the challenges, the wins, and the patterns that work.`,
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
