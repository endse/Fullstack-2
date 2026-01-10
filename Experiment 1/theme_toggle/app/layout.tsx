import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
