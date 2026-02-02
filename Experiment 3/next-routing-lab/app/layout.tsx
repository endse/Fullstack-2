import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Next Routing Lab",
  description: "SPA Routing using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={bodyStyle}>
        <Navbar />
        <div style={contentWrapper}>{children}</div>
      </body>
    </html>
  );
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "Segoe UI, sans-serif",
  background: "#0f172a",
  color: "#e5e7eb",
  minHeight: "100vh",
};

const contentWrapper: React.CSSProperties = {
  padding: "30px",
};
