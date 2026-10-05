import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

type CategoryList =
  | NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["categories"]
  | null
  | undefined;

export default function Categories({
  categories,
}: {
  categories: CategoryList;
}) {
  const list = categories ?? [];
  if (!list.length) return null;

  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-[10px] font-extrabold tracking-wide text-brand uppercase">
      {list.map((category, i) => (
        <li key={category._id} className="flex items-center gap-2">
          {i > 0 ? (
            <span className="text-muted-2" aria-hidden="true">
              |
            </span>
          ) : null}
          <span>{category.title}</span>
        </li>
      ))}
    </ul>
  );
}
