"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Playbook", href: "/playbook" },
  { label: "Posts", href: "/posts" },
  { label: "Contributors", href: "/contributors" },
];

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://twitter.com/Verusen_AI",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/verusen",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => {
          setOpen(true);
          posthog.capture("nav_drawer_opened");
        }}
        aria-label="Open menu"
        className="flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
      >
        <span className="block w-5 h-px bg-current" />
        <span className="block w-5 h-px bg-current" />
        <span className="block w-5 h-px bg-current" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full z-50 flex flex-col"
        style={{
          width: 240,
          backgroundColor: "#000",
          color: "#fff",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="text-white p-5 self-start text-xl leading-none"
        >
          ✕
        </button>

        {/* Primary nav */}
        <nav className="flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false);
                posthog.capture("nav_link_clicked", {
                  link_label: link.label,
                  link_href: link.href,
                });
              }}
              className="px-5 py-3 text-sm text-white hover:text-white/70 transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="mt-auto px-5 pb-8">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Follow us
          </p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-white hover:text-white/60 transition-colors"
                onClick={() =>
                  posthog.capture("social_link_clicked", {
                    platform: s.label,
                    href: s.href,
                  })
                }
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Logo at bottom */}
        <div className="px-5 pb-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-xl font-normal tracking-widest text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Agentic-SDLC.org
          </Link>
        </div>
      </div>
    </>
  );
}
