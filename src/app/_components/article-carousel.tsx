"use client";

import { useState } from "react";
import Link from "next/link";
import { type Post } from "@/interfaces/post";

const PAGE_SIZE = 3;

type Props = {
  posts: Post[];
};

export function ArticleCarousel({ posts }: Props) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const slice = posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section style={{ padding: "64px 0 80px" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: "8px",
          }}
        >
          Latest Writing
        </p>
        <div
          style={{
            width: "32px",
            height: "1px",
            backgroundColor: "var(--color-border)",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
        className="carousel-grid"
      >
        {slice.map((post) => (
          <CarouselCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: page === 0 ? "var(--color-border)" : "var(--color-ink)",
              background: "none",
              border: "none",
              cursor: page === 0 ? "default" : "pointer",
              padding: "4px 8px",
            }}
          >
            ← Older
          </button>

          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
            }}
          >
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:
                page === totalPages - 1
                  ? "var(--color-border)"
                  : "var(--color-ink)",
              background: "none",
              border: "none",
              cursor: page === totalPages - 1 ? "default" : "pointer",
              padding: "4px 8px",
            }}
          >
            Newer →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .carousel-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .carousel-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function CarouselCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/posts/${post.slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          paddingTop: "75%",
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: "#1a1a1a",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "14px 16px",
              transform: hovered ? "translateY(0)" : "translateY(4px)",
              transition: "transform 0.3s ease",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.95rem",
                lineHeight: 1.3,
                color: "#fff",
                margin: 0,
              }}
            >
              {post.title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.6)",
                margin: "5px 0 0",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {post.author?.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
