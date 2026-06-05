"use client";

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import CoverImage from "./cover-image";
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

export function PostPreview({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <div className="pb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="mb-4">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3
        className="text-xl font-normal leading-snug mb-2"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        <Link
          href={`/posts/${slug}`}
          className="hover:underline"
          onClick={() =>
            posthog.capture("post_preview_clicked", {
              post_title: title,
              post_slug: slug,
            })
          }
        >
          {title}
        </Link>
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
        <DateFormatter dateString={date} />
      </p>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-body)', fontFamily: 'var(--font-sans)' }}>
        {excerpt}
      </p>
      <div className="flex items-center gap-2">
        <img src={author.picture} alt={author.name} className="w-5 h-5 rounded-full" />
        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          {author.name}
        </span>
      </div>
    </div>
  );
}
