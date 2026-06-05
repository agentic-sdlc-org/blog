import Link from "next/link";

export function Intro() {
  return (
    <div className="bg-black text-white -mx-5 px-5 mb-12">
      {/* Top nav */}
      <div className="flex items-center justify-between py-3 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
        <div className="w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer">
          <span className="block w-5 h-px bg-white" />
          <span className="block w-5 h-px bg-white" />
          <span className="block w-5 h-px bg-white" />
        </div>
        <div />
        <a
          href="#"
          className="border border-white text-white text-xs font-medium px-4 py-1.5 hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Subscribe
        </a>
      </div>

      {/* Logo with horizontal rules */}
      <div className="flex items-center py-4">
        <div className="flex-1 h-px bg-white opacity-30" />
        <Link href="/" className="px-8">
          <h1
            className="text-5xl md:text-7xl font-normal tracking-wide text-white text-center"
            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.1em' }}
          >
            BLOG
          </h1>
        </Link>
        <div className="flex-1 h-px bg-white opacity-30" />
      </div>

      <div className="h-6" />
    </div>
  );
}
