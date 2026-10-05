import type { FIRST_POST_QUERY_RESULT } from "@/sanity/sanity.types";
import Categories from "./categories";
import { OpinionBadge } from "./typography";

type PostKickerProps = {
  categories:
    | NonNullable<FIRST_POST_QUERY_RESULT>["categories"]
    | null
    | undefined;
  postType: NonNullable<FIRST_POST_QUERY_RESULT>["postType"] | null | undefined;
};

export default function PostKicker({ categories, postType }: PostKickerProps) {
  const list = categories ?? [];
  const showOpinion = postType === "editorial";

  if (!list.length && !showOpinion) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Categories categories={list} />
      {showOpinion ? <OpinionBadge /> : null}
    </div>
  );
}
