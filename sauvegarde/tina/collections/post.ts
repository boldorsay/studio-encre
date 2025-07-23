import type { Collection } from "tinacms";
/**
 * @type {import('tinacms').Collection}
 */
export const PostCollection: Collection = {
  label: "Projets de Portfolio",
  name: "post",
  path: "content/posts",
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Titre du projet",
      type: "string",
      required: true,
    },
    {
      name: "client",
      label: "Client",
      type: "string",
    },
    {
      name: "date",
      label: "Date de publication",
      type: "datetime",
      required: true,
    },
    {
      name: "images",
      label: "Images du projet",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title || "Image" }
        },
      },
      fields: [
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "title",
          label: "Titre de l'image",
          type: "string",
        }
      ],
    },
    {
      name: "body",
      label: "Contenu",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/blog/${document._sys.filename}`;
    },
  },
};
