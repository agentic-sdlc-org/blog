import { getAllPosts } from "@/lib/api";
import Header from "@/app/_components/header";
import Container from "@/app/_components/container";
import Link from "next/link";

export const metadata = {
  title: "Contributors | Agentic-SDLC.org",
};

export default function ContributorsPage() {
  const posts = getAllPosts();

  // Dedupe authors by name, preserving first occurrence
  const seen = new Set<string>();
  const contributors = posts
    .map((p) => p.author)
    .filter((a) => {
      if (seen.has(a.name)) return false;
      seen.add(a.name);
      return true;
    });

  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Container>
        <Header dark />

        <div style={{ paddingBottom: "80px" }}>
          {/* Section heading */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 400,
              color: "#fff",
              marginBottom: "24px",
            }}
          >
            Our{" "}
            <em style={{ fontStyle: "italic" }}>Contributors</em>
          </h2>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", marginBottom: "32px" }} />

          {/* Grid */}
          <div className="contributors-grid">
            {contributors.map((author) => (
              <Link
                key={author.name}
                href={`/posts?author=${encodeURIComponent(author.name)}`}
                className="contributor-card"
                style={{ display: "block", textDecoration: "none" }}
              >
                {/* Portrait */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    marginBottom: "16px",
                    backgroundColor: "#1a1a1a",
                  }}
                >
                  <img
                    src={author.picture}
                    alt={author.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                    fontWeight: 400,
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  {author.name}
                </h3>

                {/* Post count */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    paddingTop: "10px",
                  }}
                >
                  {posts.filter((p) => p.author.name === author.name).length}{" "}
                  {posts.filter((p) => p.author.name === author.name).length === 1 ? "post" : "posts"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .contributors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 24px;
        }
        @media (min-width: 640px) {
          .contributors-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .contributors-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .contributor-card {
          cursor: pointer;
          opacity: 1;
          transition: opacity 0.2s ease;
        }
        .contributor-card:hover {
          opacity: 0.75;
        }
      `}</style>
    </main>
  );
}
