import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lazy Loading Performance Demo",
  description: "Next.js Dynamic Import & Suspense Optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
          color: "white",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}