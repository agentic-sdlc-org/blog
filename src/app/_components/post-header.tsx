"use client";

import { type JSX } from "react";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { type Author } from "@/interfaces/author";

type RepublishedLink = {
  label: string;
  url: string;
};

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  republishedAt?: RepublishedLink[];
};

const PLATFORM_ICONS: Record<string, JSX.Element> = {
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  X: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="X">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Substack: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="Substack">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  ),
};

export function PostHeader({ title, coverImage, date, author, republishedAt }: Props) {
  return (
    <>
      {/* Full-width cover image */}
      <div className="mb-8 -mx-5">
        <CoverImage title={title} src={coverImage} />
      </div>

      {/* Two-column: author sidebar + article meta */}
      <div className="flex gap-12 mb-8">
        {/* Left: author */}
        <div className="hidden md:block w-48 flex-shrink-0">
          <img
            src={author.picture}
            alt={author.name}
            className="w-10 h-10 rounded-full mb-3"
          />
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            BY {author.name}
          </p>
        </div>

        {/* Right: title + date + republish logos */}
        <div className="flex-1">
          <h1
            className="text-4xl md:text-5xl font-normal leading-tight mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {title}
          </h1>

          {/* Date + republish icons on same row */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
              <DateFormatter dateString={date} />
            </span>
            {republishedAt && republishedAt.length > 0 && (
              <div className="flex items-center gap-2">
                {republishedAt.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Read on ${link.label}`}
                    style={{ color: 'var(--color-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
                  >
                    {PLATFORM_ICONS[link.label] ?? (
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem' }}>{link.label}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div
            className="w-full h-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>
      </div>

      {/* Mobile author */}
      <div className="flex items-center gap-3 mb-6 md:hidden">
        <img src={author.picture} alt={author.name} className="w-8 h-8 rounded-full" />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          {author.name}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          · <DateFormatter dateString={date} />
        </span>
        {republishedAt && republishedAt.length > 0 && (
          <div className="flex items-center gap-2 ml-1">
            {republishedAt.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Read on ${link.label}`}
                style={{ color: 'var(--color-muted)' }}
              >
                {PLATFORM_ICONS[link.label] ?? (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem' }}>{link.label}</span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
