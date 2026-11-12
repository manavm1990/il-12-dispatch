import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineType } from "sanity";
import { actionBoxType } from "./action-box";
import { factBoxType } from "./fact-box";
import { pullQuoteType } from "./pull-quote";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",

      /**
       * Styles define the different block types that can be used in the editor.
       * The post's main title is its own field, not a body style, so the
       * only heading level bodies need is one section divider — kept to two
       * styles total so the picker stays simple for non-technical editors.
       */
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Section Heading", value: "h2" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],

        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),

    /**
     * Additional types.
     *
     * * Can't use primitive types like 'string' or 'number' in
     * the same array as a block type,
     * so we define an image type here to allow for
     *  image blocks within the content.
     */
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Shown under the image, e.g. a source credit.",
        },
      ],
    }),
    defineArrayMember({ type: actionBoxType.name }),
    defineArrayMember({ type: factBoxType.name }),
    defineArrayMember({ type: pullQuoteType.name }),
  ],
});
