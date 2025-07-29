import React from 'react';
import '../components/css/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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