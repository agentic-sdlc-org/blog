"use client";

type RepublishedLink = {
  label: string;
  url: string;
};

type Props = {
  links: RepublishedLink[];
};

export function PostRepublished({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        marginTop: "64px",
        paddingTop: "32px",
        maxWidth: "720px",
        marginLeft: "auto",
        marginRight: "auto",
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
        Also published on
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              color: "var(--color-muted)",
              border: "1px solid var(--color-border)",
              borderRadius: "2px",
              padding: "8px 16px",
              textDecoration: "none",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-ink)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
            }}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
