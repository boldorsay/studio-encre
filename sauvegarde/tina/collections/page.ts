import type { Collection } from "tinacms";
import { accordionBlocks } from "@/components/blocks/accordion";

export const PageCollection: Collection = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "presentation",
      label: "Section Présentation",
      type: "object",
      fields: [
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "title",
          label: "Titre",
          type: "string",
        },
        {
          name: "content",
          label: "Contenu",
          type: "rich-text",
        },
        {
          name: "imagePosition",
          label: "Position de l'image",
          type: "string",
          options: [
            { label: "Gauche", value: "left" },
            { label: "Droite", value: "right" },
          ],
        },
      ],
    },
    {
      name: "services",
      label: "Services",
      type: "object",
      list: true,
      templates: [
        {
          name: "service",
          label: "Service",
          fields: [
            {
              name: "serviceTitle",
              label: "Titre du Service",
              type: "string",
            },
            {
              name: "image",
              label: "Image",
              type: "image",
            },
            {
              name: "description",
              label: "Description",
              type: "rich-text",
            },
          ],
        },
      ],
    },
    {
      name: "contactLinks",
      label: "Section Contact",
      type: "object",
      fields: [
        {
          name: "contactTitle",
          label: "Titre de la section Contact",
          type: "string",
          description: "Le titre principal de la section contact (ex: Contact)"
        },
        {
          name: "contactDescription",
          label: "Description Contact",
          type: "rich-text",
          description: "Texte d'introduction sous le titre de la section contact."
        },
        {
          name: "links",
          label: "Liens de Contact",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.linkText || "Nouveau lien",
            }),
          },
          fields: [
            {
              name: "linkText",
              label: "Texte du lien",
              type: "string",
            },
            {
              name: "linkUrl",
              label: "URL du lien",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "accordion",
      label: "Accordéon",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Titre de la section",
          type: "string",
        },
        {
          name: "introText",
          label: "Texte intro",
          type: "rich-text"
        },
        {
          name: "items",
          label: "Items",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Nouvel élément",
            }),
          },
          fields: [
            {
              name: "title",
              label: "Titre",
              type: "string",
              required: false,
            },
            {
              name: "image",
              label: "Image",
              type: "image",
            },
            {
              name: "content",
              label: "Contenu",
              type: "rich-text",
            }
          ]
        }
      ]
    },
  ],
};











