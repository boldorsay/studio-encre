import React, { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="overflow-x-hidden pt-20">
      {children}
    </main>
  );
}
