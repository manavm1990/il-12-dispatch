import dayjs from "dayjs";
import { cn } from "@/lib/utils";

type PublishedProps = {
  // Detail query still allows null; list query filters to defined(publishedAt).
  publishedAt: string | null;
  issueLabel?: string | null;
  className?: string;
};

export default function Published({
  publishedAt,
  issueLabel,
  className,
}: PublishedProps) {
  if (!publishedAt) return null;

  return (
    <p className={cn("text-base text-body", className)}>
      <time dateTime={publishedAt}>
        {dayjs(publishedAt).format("MMMM D, YYYY").toUpperCase()}
      </time>
      {issueLabel ? (
        <>
          <span className="mx-1.5">&middot;</span>
          <span className="uppercase">{issueLabel}</span>
        </>
      ) : null}
    </p>
  );
}
