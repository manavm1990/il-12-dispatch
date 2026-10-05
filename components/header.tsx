import Link from "next/link";
import NavLink from "@/components/nav-link.client";
import ThemeToggle from "@/components/theme-toggle.client";
import { DISTRICT_NAME, SITE_NAME, SITE_TAGLINE } from "@/lib/site-info";

const navItems = [
  { href: "/", label: "Posts" },
  { href: "/editorials", label: "Editorials" },
  { href: "/about", label: "About" },
  { href: "/subscribe", label: "Subscribe" },
] as const;

export default function Header() {
  return (
    <>
      <div className="bg-ink text-brand-tint">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-2">
          <span className="text-[11px] font-bold tracking-wider uppercase">
            {DISTRICT_NAME}
          </span>
          <span className="hidden text-[11px] text-brand-tint/70 italic sm:inline">
            {SITE_TAGLINE}
          </span>
        </div>
      </div>
      <header className="border-b-[6px] border-brand bg-paper">
        <div className="container mx-auto flex flex-wrap items-end justify-between gap-6 px-6 py-6">
          <Link
            href="/"
            className="font-serif text-3xl font-extrabold tracking-tight text-heading md:text-4xl"
          >
            {SITE_NAME}
          </Link>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-7 pb-1">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <NavLink href={href}>{label}</NavLink>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
