import type { PortableTextComponents } from "next-sanity";
import SanityImage from "@/components/sanity-image";
import {
  ActionBox,
  FactBox,
  PullQuote,
  SectionHeading,
} from "@/components/typography";
import { imageDimensions } from "@/sanity/lib/image-dimensions";

type BoxItem = { label?: string | null; text: string };

function BoxItems({ items }: { items: BoxItem[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: items have no stable id
        <li key={i}>
          {item.label ? <strong>{item.label}:</strong> : null} {item.text}
        </li>
      ))}
    </ul>
  );
}

export const components: PortableTextComponents = {
  block: {
    /** Quote style → branded pull quote (no attribution field on block styles). */
    blockquote: ({ children }) => <PullQuote>{children}</PullQuote>,
    /** H2 style → bold uppercase section divider used throughout post bodies. */
    h2: ({ children }) => (
      <SectionHeading className="not-prose">{children}</SectionHeading>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value) return null;

      // Keep the asset's own aspect ratio so maps and charts aren't cropped.
      const dimensions = imageDimensions(value.asset?._ref);
      const width = 760;
      const height = dimensions
        ? Math.round((width * dimensions.height) / dimensions.width)
        : 664;

      return (
        // w-fit shrink-wraps the figure to the image so the caption lines up with it.
        <figure className="not-prose mx-auto my-8 grid w-fit max-w-full">
          <SanityImage
            // The height cap keeps tall images (maps) from filling the screen.
            className="h-auto max-h-[70vh] w-auto max-w-full rounded-lg border border-border"
            image={value}
            alt={value.alt || ""}
            width={width}
            height={height}
            sizes="(max-width: 640px) 100vw, 480px"
            quality={80}
          />
          {value.caption ? (
            // w-0 + min-w-full: the caption wraps to the image width instead of widening the figure.
            <figcaption className="mt-2 w-0 min-w-full text-[13px] leading-snug text-muted">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    actionBox: ({ value }) => {
      if (!value?.items?.length) return null;

      return (
        <ActionBox title={value.title || undefined} className="not-prose">
          <BoxItems items={value.items} />
        </ActionBox>
      );
    },
    factBox: ({ value }) => {
      if (!value?.items?.length) return null;

      return (
        <FactBox title={value.title || undefined} className="not-prose">
          <BoxItems items={value.items} />
        </FactBox>
      );
    },
    pullQuote: ({ value }) => {
      if (!value?.text) return null;

      return (
        <PullQuote
          attribution={value.attribution || undefined}
          className="not-prose"
        >
          {value.text}
        </PullQuote>
      );
    },
  },
};
