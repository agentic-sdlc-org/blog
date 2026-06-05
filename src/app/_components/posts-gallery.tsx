"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { type Post } from "@/interfaces/post";

const PAGE_SIZE = 12;

// Fixed aspect ratio for all cards (height = 75% of column width)
const CARD_ASPECT_RATIO = 0.75;

type Props = {
  posts: Post[];
};

export function PostsGallery({ posts }: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (visible >= posts.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE_SIZE, posts.length));
        }
      },
      { rootMargin: "200px" }
    );
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [visible, posts.length]);

  const shown = posts.slice(0, visible);

  return (
    <div style={{ backgroundColor: "var(--color-cream)" }}>
      {/* Grid */}
      <div className="posts-grid">
        {shown.map((post) => (
          <GalleryCard key={post.slug} post={post} aspectRatio={CARD_ASPECT_RATIO} />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      {visible < posts.length && (
        <div ref={sentinelRef} style={{ height: 1 }} />
      )}

      <style>{`
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 10px;
        }
        @media (min-width: 768px) {
          .posts-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 12px; }
        }
      `}</style>
    </div>
  );
}

function GalleryCard({ post, aspectRatio }: { post: Post; aspectRatio: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/posts/${post.slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          paddingTop: `${aspectRatio * 100}%`,
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: "#1a1a1a",
          display: "block",
        }}
      >
        {/* Absolute inner wrapper */}
        <div style={{ position: "absolute", inset: 0 }}>

        {/* Cover image */}
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

          {/* Always-on gradient at bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%)",
            }}
          />

          {/* Hover scrim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Title */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "12px 14px",
              transform: hovered ? "translateY(0)" : "translateY(4px)",
              transition: "transform 0.3s ease",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.9rem",
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
                margin: "4px 0 0",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {post.author?.name}
            </p>
          </div>
        </div> {/* end absolute inner wrapper */}
      </div>
    </Link>
  );
}
