import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { ArticleCarousel } from "@/app/_components/article-carousel";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main style={{ backgroundColor: "var(--color-cream)" }}>
      <Container>
        <Intro />

        {/* ── Mission ── */}
        <section style={{ textAlign: "center", padding: "0 0 72px" }}>
          {/* Why paragraph */}
          <div
            style={{
              maxWidth: "620px",
              margin: "0 auto 40px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "var(--color-muted)",
              }}
            >
              Like every technology organization, we&rsquo;re on a journey to
              redefine ourselves for the age of agents. We&rsquo;re journaling
              that journey in the open — the challenges, the wins, the dead
              ends, and the musings along the way — all rolling up into an
              evergreen, open-source playbook for building software in this new
              world.
            </p>
          </div>

          {/* Floating definition box */}
          <div
            style={{
              display: "inline-block",
              maxWidth: "720px",
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid var(--color-border)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
              borderRadius: "4px",
              padding: "40px 48px",
              textAlign: "left",
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "16px",
              }}
            >
              Definition
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                color: "var(--color-ink)",
                marginBottom: "6px",
                lineHeight: 1.2,
              }}
            >
              Agentic SDLC{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontSize: "0.6em",
                  color: "var(--color-muted)",
                  fontWeight: 400,
                }}
              >
                (n.)
              </span>
            </h2>
            <div
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: "var(--color-accent)",
                marginBottom: "20px",
                opacity: 0.8,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                fontStyle: "italic",
                lineHeight: 1.75,
                color: "var(--color-body)",
                margin: 0,
              }}
            >
              A software development lifecycle in which AI coding agents, not
              humans, produce most production code. The build step compresses
              from days to hours, shifting engineering effort to the activities
              that surround it: requirements specification, problem
              decomposition, and validation through testing and quality gates.
            </p>
          </div>

        </section>

        {/* ── Playbook Banner ── */}
        <section
          style={{
            backgroundColor: "var(--color-ink)",
            borderRadius: "4px",
            padding: "48px 56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            marginBottom: "0",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "10px",
              }}
            >
              Open-Source Playbook
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 400,
                color: "#fff",
                marginBottom: "10px",
                lineHeight: 1.25,
              }}
            >
              Agentic SDLC Playbook
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
                maxWidth: "460px",
                margin: 0,
              }}
            >
              A living guide to building software in the age of agents —
              patterns, pitfalls, and practices from the field.
            </p>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              backgroundColor: "var(--color-accent)",
              padding: "14px 28px",
              borderRadius: "2px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Read the Playbook →
          </a>
        </section>
      </Container>

      {/* ── Article Carousel ── */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          marginTop: "80px",
          backgroundColor: "var(--color-cream)",
        }}
      >
        <Container>
          <ArticleCarousel posts={allPosts} />
        </Container>
      </div>
    </main>
  );
}
