"use client";

import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import posthog from "posthog-js";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <section className="mb-12 pb-12" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="md:grid md:grid-cols-3 md:gap-8 items-start">
        {/* Left: meta */}
        <div className="mb-4 md:mb-0">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            Featured
          </p>
          <h3
            className="text-3xl font-normal leading-snug mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            <Link
              href={`/posts/${slug}`}
              className="hover:underline"
              onClick={() =>
                posthog.capture("hero_post_clicked", {
                  post_title: title,
                  post_slug: slug,
                })
              }
            >
              {title}
            </Link>
          </h3>
          <p className="text-sm mb-3" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            <DateFormatter dateString={date} />
          </p>
          <div className="flex items-center gap-2">
            <img src={author.picture} alt={author.name} className="w-6 h-6 rounded-full" />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
              {author.name}
            </span>
          </div>
        </div>

        {/* Right: cover image + excerpt */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <CoverImage title={title} src={coverImage} slug={slug} />
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-body)', fontFamily: 'var(--font-sans)' }}>
            {excerpt}
          </p>
        </div>
      </div>
    </section>
  );
}
