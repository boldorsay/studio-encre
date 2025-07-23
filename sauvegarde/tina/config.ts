import { defineConfig } from "tinacms";
import { PageCollection } from "./collections/page";
import { PostCollection } from "./collections/post";

export default defineConfig({
  // Supprime ou commente cette ligne :
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,

  branch: "main",

  contentApiUrlOverride: "/api/tina/gql",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.CloudinaryMediaStore;
    },
  },
  schema: {
    collections: [PageCollection, PostCollection],
  },
})

console.log(">>> DEBUG: Tina config chargée avec isLocal =", process.env.TINA_PUBLIC_IS_LOCAL);