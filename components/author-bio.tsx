import { PortableText } from "next-sanity";
import type { FIRST_POST_QUERY_RESULT } from "@/sanity/sanity.types";
import SanityImage from "./sanity-image";
import { Eyebrow } from "./typography";

export default function AuthorBio({
  author,
}: {
  author: NonNullable<FIRST_POST_QUERY_RESULT>["author"];
}) {
  if (!author?.bio?.length) return null;

  return (
    <aside className="mt-12 border-t border-border pt-5">
      <Eyebrow className="mb-4">About the author</Eyebrow>
      <div className="flex items-start gap-4">
        {author.image ? (
          <SanityImage
            image={author.image}
            width={96}
            height={96}
            alt=""
            className="size-12 shrink-0 rounded-full bg-tint shadow-inner"
          />
        ) : null}
        <div className="space-y-2 text-sm leading-relaxed text-muted italic">
          <PortableText value={author.bio} />
        </div>
      </div>
    </aside>
  );
}
