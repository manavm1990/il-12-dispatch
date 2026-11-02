import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  /** Paths to bust, e.g. ["/", "/posts/my-slug"] */
  paths?: string[];
  /** Convenience when the webhook projects a single post slug. */
  slug?: string | null;
  _type?: string;
};

/**
 * Sanity → Vercel on-demand revalidation.
 *
 * Wire a Sanity GROQ webhook (document create/update/delete) to:
 *   POST https://www.il12dispatch.org/api/revalidate/path
 * Secret must match SANITY_REVALIDATE_SECRET (Vercel + Sanity webhook).
 *
 * Filter: `_type in ["post", "category", "author"]`
 * Projection:
 * ```
 * {
 *   _type,
 *   "slug": slug.current,
 *   "paths": ["/", select(_type == "post" && defined(slug.current) => "/posts/" + slug.current)]
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    // waitForContentLakeEventualConsistency: give CDN a beat before Next refetches
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body) {
      return new Response("Missing body", { status: 400 });
    }

    const paths = new Set<string>();
    paths.add("/");

    if (Array.isArray(body.paths)) {
      for (const path of body.paths) {
        if (typeof path === "string" && path.startsWith("/")) paths.add(path);
      }
    }

    if (typeof body.slug === "string" && body.slug.length > 0) {
      paths.add(`/posts/${body.slug}`);
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: [...paths],
      type: body._type ?? null,
      now: Date.now(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
