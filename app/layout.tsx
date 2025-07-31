"use client";
import React, { useEffect } from 'react';
import '../components/css/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('eruda').then((eruda) => (eruda as any).default.init());
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Studio encré</title>
        <meta name="description" content="Your app description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Add other head elements here */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 