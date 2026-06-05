import Link from "next/link";
import { NavDrawer } from "./nav-drawer";

const Header = () => {
  return (
    <div className="-mx-5 px-5 mb-10" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between py-3">
        <NavDrawer />
        <div />
        <a
          href="#"
          className="border text-xs font-medium px-4 py-1.5 transition-colors hover:bg-black hover:text-white"
          style={{
            borderColor: 'var(--color-ink)',
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-sans)',
            backgroundColor: 'var(--color-accent)',
          }}
        >
          Subscribe
        </a>
      </div>
      <div className="flex items-center py-3">
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        <Link href="/" className="px-8">
          <span
            className="text-3xl md:text-4xl font-normal tracking-widest"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            BLOG
          </span>
        </Link>
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
      </div>
    </div>
  );
};

export default Header;
