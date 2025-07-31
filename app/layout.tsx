"use client";
import React, { useEffect } from 'react';
import '../components/css/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      import('eruda').then((eruda) => (eruda as any).default.init());
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Your App Title</title>
        <meta name="description" content="Your app description" />
        {/* Add other head elements here */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 