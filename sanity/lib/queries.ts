import { defineQuery } from "next-sanity";

const POSTS_PER_PAGE = 12;

/**
 * _` prefaced fields are meant to distinguish between
 * Sanity system fields and user-defined fields.
 */

export const ALL_POST_SLUGS =
  defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`);

export const FIRST_POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  dek,
  postType,
  body,
  "excerpt": pt::text(body),
  mainImage,
  publishedAt,
  issueLabel,
  sources,
  _updatedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  "author": coalesce(
    author->{
      name,
      image
    },
    *[_id == "author-the-dispatch"][0]{
      name,
      image
    }
  )
}`);

/** List card fields only — full body is reserved for the post detail query. */
export const PAGINATED_POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...${POSTS_PER_PAGE}]{
  _id,
  title,
  dek,
  postType,
  slug,
  publishedAt,
  issueLabel,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  )
}`);
