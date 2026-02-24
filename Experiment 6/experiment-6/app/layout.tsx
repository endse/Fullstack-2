import "./globals.css";
import React from 'react';

export const metadata = {
  title: "Experiment 6 - Professional Validator",
  description: "Enterprise state management and validation engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
