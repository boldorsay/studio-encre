"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-background/50 border-t">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center space-x-2">

            <span className="text-sm text-muted-foreground">
              © 2024 Tina Starter. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/tinacms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-foreground">
            </a>
            <a
              href="https://github.com/tinacms/tinacms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-foreground">

            </a>
            <a
              href="https://www.youtube.com/@TinaCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-foreground">

            </a>
            <a
              href="https://x.com/TinaCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-foreground">

            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
