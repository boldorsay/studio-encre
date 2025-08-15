"use client";
import React, { useEffect } from 'react';
import '../components/css/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Studio encré</title>
        <meta name="description" content="Your app description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Add other head elements here */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 