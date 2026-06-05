import Link from "next/link";
import { NavDrawer } from "./nav-drawer";

const Header = ({ dark = false }: { dark?: boolean }) => {
  const borderColor = dark ? "rgba(255,255,255,0.15)" : "var(--color-border)";
  const textColor = dark ? "#fff" : "var(--color-ink)";

  return (
    <div className="-mx-5 px-5 mb-10" style={{ borderBottom: `1px solid ${borderColor}` }}>
      <div className="flex items-center justify-between py-3">
        <NavDrawer />
        <div />
      </div>
      <div className="flex items-center py-3">
        <div className="flex-1 h-px" style={{ backgroundColor: borderColor }} />
        <Link href="/" className="px-8">
          <span
            className="text-3xl md:text-4xl font-normal tracking-widest"
            style={{ fontFamily: "var(--font-serif)", color: textColor }}
          >
            Agentic-SDLC.org
          </span>
        </Link>
        <div className="flex-1 h-px" style={{ backgroundColor: borderColor }} />
      </div>
    </div>
  );
};

export default Header;
