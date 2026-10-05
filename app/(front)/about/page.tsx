import type { Metadata } from "next";
import Link from "next/link";
import {
  H1,
  Kicker,
  Lead,
  List,
  P,
  SectionHeading,
} from "@/components/typography";
import {
  EDITOR_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site-info";

export const metadata: Metadata = {
  title: "About",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 pt-11 pb-24">
      <div className="mx-auto max-w-190">
        <Kicker section="About" />
        <H1 className="mt-3.5 font-extrabold">Who we are</H1>
        <Lead className="mt-4">{SITE_DESCRIPTION}</Lead>

        <div className="my-8 border-l-4 border-brand bg-tint px-6 py-5">
          <P className="mt-0 font-serif text-lg leading-relaxed text-tint-text italic">
            {SITE_TAGLINE}
          </P>
        </div>

        <SectionHeading className="mt-12">The beat</SectionHeading>
        <P className="mt-0">
          IL-12 is Southern Illinois: towns, farms, factories, and the people
          who live here. {SITE_NAME} covers the votes, records, and decisions
          that affect this district—and the officials who serve it, including
          Rep. Mike Bost.
        </P>
        <P>
          Not a party organ. Not a campaign. A local outlet that follows the
          public record.
        </P>

        <SectionHeading>What we publish</SectionHeading>
        <List>
          <li>
            <strong className="text-heading">Reporting</strong> — votes, local
            impact, checkable claims
          </li>
          <li>
            <strong className="text-heading">Reader editorials</strong> —
            opinion from the district, reviewed for sourcing and libel exposure;
            the author&apos;s view, not ours
          </li>
          <li>
            <strong className="text-heading">A newsletter</strong> — when we
            publish. No daily spam
          </li>
        </List>
        <P>Reporting and opinion stay in separate sections on purpose.</P>

        <SectionHeading>How we work</SectionHeading>
        <P className="mt-0">
          Plain language. One clear point at a time. Sources you can open
          yourself. We&apos;d rather be specific and dull than loud and thin.
        </P>
        <P>
          We&apos;re a small volunteer team. We choose what runs. Publication
          isn&apos;t guaranteed—accuracy is.
        </P>

        <SectionHeading>Get involved</SectionHeading>
        <List>
          <li>
            <Link
              href="/subscribe"
              className="font-bold text-brand underline underline-offset-2"
            >
              Subscribe
            </Link>{" "}
            for new reporting and selected editorials
          </li>
          <li>
            <Link
              href="/editorials"
              className="font-bold text-brand underline underline-offset-2"
            >
              Write a reader editorial
            </Link>{" "}
            if you have one point and the sources to back it
          </li>
          <li>
            Tips and corrections:{" "}
            <a
              href={`mailto:${EDITOR_EMAIL}`}
              className="font-bold text-brand underline underline-offset-2"
            >
              {EDITOR_EMAIL}
            </a>
          </li>
        </List>
      </div>
    </main>
  );
}
