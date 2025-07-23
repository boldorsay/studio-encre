import React from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <ClientPage {...data} />
  );
}
