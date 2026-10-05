import Link from "next/link";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portable-text-components";
import type { FIRST_POST_QUERY_RESULT } from "@/sanity/sanity.types";
import Author from "./author";
import PostKicker from "./post-kicker";
import Published from "./published";
import SanityImage from "./sanity-image";
import SharePost from "./share-post.client";
import { Eyebrow, H1, Lead, P } from "./typography";

export default function Post({
  title,
  dek,
  author,
  mainImage,
  body,
  publishedAt,
  issueLabel,
  categories,
  postType,
  sources,
  shareUrl,
  shareText,
}: NonNullable<FIRST_POST_QUERY_RESULT> & {
  shareUrl: string;
  shareText?: string;
}) {
  return (
    <article className="mx-auto max-w-190">
      <header className="mb-8 border-b-2 border-heading pb-5">
        <PostKicker categories={categories} postType={postType} />
        <H1 className="mt-3.5 text-3xl leading-[1.15] font-extrabold md:text-[38px]">
          {title}
        </H1>
        {dek ? (
          <Lead className="mt-4 font-serif text-[19px] leading-[1.55] text-dek italic">
            {dek}
          </Lead>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Published
            publishedAt={publishedAt}
            issueLabel={issueLabel}
            className="text-[13px] font-bold text-muted"
          />
          <Author author={author} />
        </div>
      </header>

      {postType === "editorial" ? (
        <div className="mb-8 border-l-4 border-brand bg-tint px-5 py-4">
          <P className="mt-0 text-sm text-tint-text">
            This is a Reader Editorial. It reflects the views of its author, not
            the Dispatch, and isn't held to our reporting's verification
            standard.{" "}
            <Link
              href="/editorials"
              className="font-bold text-brand underline underline-offset-2"
            >
              Read our submission guide
            </Link>
            .
          </P>
        </div>
      ) : null}

      {mainImage ? (
        <figure className="mb-8">
          <SanityImage
            image={mainImage}
            width={760}
            height={400}
            alt={mainImage.alt || title || ""}
            className="h-auto w-full rounded-lg"
          />
        </figure>
      ) : null}

      {body ? (
        <section className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-sans prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-body">
          <PortableText value={body} components={components} />
        </section>
      ) : null}

      {sources?.length ? (
        <footer className="mt-12 border-t border-border pt-5">
          <Eyebrow className="mb-4">Sources</Eyebrow>
          <div className="space-y-2.5 text-[13px] leading-relaxed text-muted">
            {sources.map((source) => (
              <p key={source._key}>
                <strong className="text-dek">{source.label}:</strong>{" "}
                {source.citation}
              </p>
            ))}
          </div>
        </footer>
      ) : null}

      {title ? (
        <SharePost
          className="mt-12"
          url={shareUrl}
          title={title}
          text={shareText ?? dek ?? undefined}
        />
      ) : null}
    </article>
  );
}
