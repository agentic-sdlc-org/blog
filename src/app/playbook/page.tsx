import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export const metadata = {
  title: "Agentic SDLC Playbook",
  description:
    "A living guide to building software in the age of agents — patterns, practices, and hard-won lessons from the field.",
};

const sections = [
  {
    number: "01",
    title: "The Five-Stage Agentic SDLC",
    description:
      "Define, Shape, Build, Validate, Run. How the software delivery lifecycle changes when agents own execution and humans own intent.",
  },
  {
    number: "02",
    title: "Specification-Driven Development",
    description:
      "When code generation is instantaneous, ambiguity compiles into production. Requirements must be detailed enough to drive implementation without continuous intervention.",
  },
  {
    number: "03",
    title: "Coaching Agents",
    description:
      "Curating coding standards, data models, business rules, and guardrails so agents produce contextually appropriate code — not just syntactically correct code.",
  },
  {
    number: "04",
    title: "Quality Gates",
    description:
      "Structural checkpoints replacing informal practices: spec completeness, architecture review, test coverage, security scanning, and release readiness.",
  },
  {
    number: "05",
    title: "New Roles & the Agent Bench",
    description:
      "Agentic Architect, Agent Coach, Agentic Validation Architect. A curated bench of specialized agent configurations becomes institutional capability.",
  },
  {
    number: "06",
    title: "Maturity Progression",
    description:
      "Five levels from non-adoption to agent-native. A 30-60-90 day implementation path following natural group dynamics: norming, storming, performing.",
  },
];

export default function PlaybookPage() {
  return (
    <main style={{ backgroundColor: "var(--color-cream)", paddingBottom: "100px" }}>
      <Container>
        <Header />

        {/* ── Hero ── */}
        <section
          style={{
            padding: "80px 0 64px",
            maxWidth: "680px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginBottom: "20px",
            }}
          >
            Open-Source Playbook
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 400,
              color: "var(--color-ink)",
              lineHeight: 1.15,
              marginBottom: "28px",
            }}
          >
            The Agentic Development Playbook
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--color-muted)",
              marginBottom: "40px",
              maxWidth: "560px",
            }}
          >
            AI has compressed the build step from days to hours. Coding is no
            longer the bottleneck — requirements clarity, problem decomposition,
            and quality validation are. This playbook is a living guide to
            restructuring how engineering organizations deliver software in that
            world.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="https://docs.google.com/document/d/1UqRBG_OlTacgPAlV3-4P-6uiwicKyKGt0RTzQiVcwds/edit"
              target="_blank"
              rel="noopener noreferrer"
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
              }}
            >
              Read the Playbook →
            </a>
            <a
              href="https://docs.google.com/document/d/1UqRBG_OlTacgPAlV3-4P-6uiwicKyKGt0RTzQiVcwds/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                padding: "14px 28px",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              Download PDF ↓
            </a>
          </div>
        </section>

        {/* ── Divider ── */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            marginBottom: "72px",
          }}
        />

        {/* ── What's Inside ── */}
        <section style={{ marginBottom: "80px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginBottom: "40px",
            }}
          >
            What's Inside
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              gap: "1px",
              backgroundColor: "var(--color-border)",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {sections.map((s) => (
              <div
                key={s.number}
                style={{
                  backgroundColor: "var(--color-cream)",
                  padding: "32px 36px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: "var(--color-accent)",
                    filter: "saturate(2) brightness(0.7)",
                    marginBottom: "12px",
                  }}
                >
                  {s.number}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    color: "var(--color-ink)",
                    marginBottom: "10px",
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    color: "var(--color-muted)",
                    margin: 0,
                  }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Living Document Note ── */}
        <section style={{ marginBottom: "80px", maxWidth: "620px" }}>
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
            A Living Document
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--color-muted)",
            }}
          >
            This playbook evolves with our practice. The articles on this site
            are the journal; the playbook is where patterns graduate into
            durable guidance. If something is wrong, incomplete, or missing —
            we want to know.
          </p>
        </section>

        {/* ── CTA Banner ── */}
        <section
          style={{
            backgroundColor: "var(--color-ink)",
            borderRadius: "4px",
            padding: "48px 56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 400,
                color: "#fff",
                marginBottom: "10px",
                lineHeight: 1.25,
              }}
            >
              Ready to restructure for agents?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
                maxWidth: "440px",
                margin: 0,
              }}
            >
              The full playbook is free and open. No registration, no paywall —
              just the patterns that are working.
            </p>
          </div>
          <a
            href="https://docs.google.com/document/d/1UqRBG_OlTacgPAlV3-4P-6uiwicKyKGt0RTzQiVcwds/edit"
            target="_blank"
            rel="noopener noreferrer"
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
    </main>
  );
}
