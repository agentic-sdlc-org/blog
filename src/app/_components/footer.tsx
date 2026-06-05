import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-cream)' }}>
      <Container>
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-lg font-normal tracking-widest"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            BLOG
          </span>
          <p className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            Powered by Next.js
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
