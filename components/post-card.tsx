import Link from "next/link";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";
import PostKicker from "./post-kicker";
import Published from "./published";
import { H1, H2, Lead } from "./typography";

type PostCardProps = PAGINATED_POSTS_QUERY_RESULT[0] & {
  variant?: "lead" | "list";
};

export default function PostCard({
  slug,
  title,
  dek,
  publishedAt,
  issueLabel,
  categories,
  postType,
  variant = "list",
}: PostCardProps) {
  if (variant === "lead") {
    return (
      <Link
        href={`/posts/${slug?.current}`}
        className="mb-10 block border-b border-border pb-9"
      >
        <PostKicker categories={categories} postType={postType} />
        <H1 className="mt-3.5 text-4xl leading-tight font-extrabold tracking-tight md:text-[44px]">
          {title}
        </H1>
        {dek ? (
          <Lead className="mt-4 max-w-3xl font-serif text-lg italic md:text-xl">
            {dek}
          </Lead>
        ) : null}
        <Published
          publishedAt={publishedAt}
          issueLabel={issueLabel}
          className="mt-4 text-[13px] font-bold text-muted"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/posts/${slug?.current}`}
      className="group block border-b border-border py-7"
    >
      <article className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-8">
        <div>
          <PostKicker categories={categories} postType={postType} />
          <Published
            publishedAt={publishedAt}
            issueLabel={issueLabel}
            className="mt-1.5 block text-xs font-semibold text-muted-2"
          />
        </div>
        <div>
          <H2 className="text-2xl font-bold transition-colors group-hover:text-brand">
            {title}
          </H2>
          {dek ? (
            <p className="mt-2 max-w-2xl text-[15px] text-muted">{dek}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
