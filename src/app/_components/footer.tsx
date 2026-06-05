import Container from "@/app/_components/container";
import Image from "next/image";

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-cream)' }}>
      <Container>
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/robot.png"
              alt="Agentic-SDLC"
              width={40}
              height={40}
              className="opacity-80"
            />
            <span
              className="text-lg font-normal tracking-widest"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              Agentic-SDLC.org
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            Powered by Next.js
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
