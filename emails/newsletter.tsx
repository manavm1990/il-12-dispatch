import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import {
  EDITOR_EMAIL,
  SITE_NAME,
  SITE_POSTAL_ADDRESS,
  SITE_TAGLINE,
} from "@/lib/site-info";

export type NewsletterEmailProps = {
  /** Inbox preview + usually mirrors the subject line theme. */
  previewText: string;
  /** "Dispatch" | "Opinion" | similar short label. */
  kicker: string;
  title: string;
  /** Short email-only intro (often the dek). */
  intro: string;
  ctaUrl: string;
  ctaLabel?: string;
  /** e.g. "Issue No. 14" — shown under the masthead. */
  issueLabel?: string;
  /** Optional second beat or bullets as plain lines. */
  notes?: string[];
  siteUrl: string;
  /** CAN-SPAM / footer postal line when you have one. */
  postalAddress?: string;
  /** Per-recipient unsub URL. Defaults to Resend Broadcast merge tag. */
  unsubscribeUrl?: string;
};

/** Resend replaces this when sending a Broadcast to a Segment. */
const RESEND_UNSUBSCRIBE_MERGE_TAG = "{{{RESEND_UNSUBSCRIBE_URL}}}";

const PREVIEW_DEFAULTS = {
  previewText: "IL-12 Dispatch: Why the district needs a real town hall",
  kicker: "Dispatch",
  title: "Why the district needs a real town hall",
  intro:
    "Last month's closed-door briefing left more questions than answers. Constituents deserve an unscripted forum before the next vote.",
  ctaUrl: "https://il12dispatch.org/posts/your-slug",
  ctaLabel: "Read the full piece",
  issueLabel: "Issue No. 14",
  notes: [
    "What was promised vs what was delivered",
    "How to push for a public date on the calendar",
  ],
  siteUrl: "https://il12dispatch.org",
  postalAddress: SITE_POSTAL_ADDRESS || undefined,
  unsubscribeUrl: RESEND_UNSUBSCRIBE_MERGE_TAG,
} satisfies NewsletterEmailProps;

export default function NewsletterEmail({
  previewText,
  kicker,
  title,
  intro,
  ctaUrl,
  ctaLabel = "Read the full piece",
  issueLabel,
  notes,
  siteUrl,
  postalAddress = SITE_POSTAL_ADDRESS || undefined,
  unsubscribeUrl = RESEND_UNSUBSCRIBE_MERGE_TAG,
}: NewsletterEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={masthead}>{SITE_NAME}</Text>
          {issueLabel ? <Text style={issue}>{issueLabel}</Text> : null}
          <Text style={tagline}>{SITE_TAGLINE}</Text>

          <Hr style={hr} />

          <Text style={kickerStyle}>{kicker}</Text>
          <Heading style={heading}>{title}</Heading>
          <Text style={text}>{intro}</Text>

          {notes?.length ? (
            <Section style={notesSection}>
              {notes.map((note) => (
                <Text key={note} style={noteLine}>
                  • {note}
                </Text>
              ))}
            </Section>
          ) : null}

          <Section style={ctaSection}>
            <Button href={ctaUrl} style={button}>
              {ctaLabel}
            </Button>
          </Section>

          <Text style={textMuted}>
            Or open:{" "}
            <Link href={ctaUrl} style={link}>
              {ctaUrl}
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            You&apos;re receiving this because you signed up for {SITE_NAME}{" "}
            updates.{" "}
            <Link href={unsubscribeUrl} style={link}>
              Unsubscribe
            </Link>
            .
          </Text>
          <Text style={footer}>
            {SITE_NAME}
            <br />
            <Link href={`mailto:${EDITOR_EMAIL}`} style={link}>
              {EDITOR_EMAIL}
            </Link>
            <br />
            <Link href={siteUrl} style={link}>
              {siteUrl}
            </Link>
            {postalAddress ? (
              <>
                <br />
                {postalAddress}
              </>
            ) : null}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

NewsletterEmail.PreviewProps = PREVIEW_DEFAULTS;

const main = {
  backgroundColor: "#f6f6f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "560px",
  border: "1px solid #e5e5e0",
};

const masthead = {
  color: "#111111",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const issue = {
  color: "#737373",
  fontSize: "12px",
  margin: "0 0 4px",
};

const tagline = {
  color: "#737373",
  fontSize: "12px",
  fontStyle: "italic" as const,
  margin: "0 0 8px",
};

const kickerStyle = {
  color: "#b45309",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0 0 12px",
};

const heading = {
  color: "#111111",
  fontSize: "22px",
  fontWeight: 800,
  lineHeight: "1.3",
  margin: "0 0 16px",
};

const text = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "1.55",
  margin: "0 0 14px",
};

const textMuted = {
  color: "#737373",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px",
  wordBreak: "break-all" as const,
};

const notesSection = {
  margin: "0 0 8px",
};

const noteLine = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "1.45",
  margin: "0 0 6px",
};

const ctaSection = {
  margin: "20px 0 16px",
};

const button = {
  backgroundColor: "#a83a2e",
  borderRadius: "2px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  padding: "12px 20px",
  textDecoration: "none",
  textTransform: "uppercase" as const,
};

const link = {
  color: "#b45309",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e5e5e0",
  margin: "20px 0",
};

const footer = {
  color: "#737373",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 12px",
};
