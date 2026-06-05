import Link from "next/link";
import Image from "next/image";
import { NavDrawer } from "./nav-drawer";

export function Intro() {
  return (
    <div className="bg-black text-white -mx-5 px-5 mb-12">
      {/* Top nav */}
      <div className="flex items-center justify-between py-3 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
        <NavDrawer />
        <div />
      </div>

      {/* Logo with robot + wordmark */}
      <div className="flex items-center py-6">
        <div className="flex-1 h-px bg-white opacity-30" />
        <Link href="/" className="px-8 flex flex-col items-center gap-4">
          <Image
            src="/assets/robot.png"
            alt="Agentic-SDLC"
            width={180}
            height={180}
            className="drop-shadow-[0_0_24px_rgba(100,180,255,0.4)]"
            priority
          />
          <h1
            className="text-4xl md:text-6xl font-normal tracking-wide text-white text-center"
            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.05em' }}
          >
            Agentic-SDLC.org
          </h1>
        </Link>
        <div className="flex-1 h-px bg-white opacity-30" />
      </div>

      <div className="h-6" />
    </div>
  );
}
