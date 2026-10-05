import Link from "next/link";
import FooterNewsletter from "@/components/footer-newsletter.client";
import { EDITOR_EMAIL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-info";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="container mx-auto space-y-8 px-6 py-8">
        <FooterNewsletter />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold tracking-wide text-brand-tint">
              {SITE_NAME}
            </p>
            <p className="text-xs">
              <Link
                className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-brand-tint hover:decoration-brand-tint"
                href="/about"
              >
                About
              </Link>
              <span className="mx-2 text-slate-600" aria-hidden>
                ·
              </span>
              <a
                className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-brand-tint hover:decoration-brand-tint"
                href={`mailto:${EDITOR_EMAIL}`}
              >
                {EDITOR_EMAIL}
              </a>
            </p>
          </div>
          <p className="text-xs">{SITE_DESCRIPTION}</p>
        </div>
      </div>
    </footer>
  );
}
