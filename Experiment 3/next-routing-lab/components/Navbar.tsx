"use client";

import Link from "next/link";

export default function Navbar(): JSX.Element {
  return (
    <aside style={sidebar}>
      <h2 style={logo}>NextLab</h2>

      <nav style={navLinks}>
        <Link href="/" style={linkStyle}>
          Dashboard
        </Link>
        <Link href="/about" style={linkStyle}>
          Analytics
        </Link>
        <Link href="/contact" style={linkStyle}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}

const sidebar: React.CSSProperties = {
  width: 230,
  background: "#020617",
  padding: 25,
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  borderRight: "1px solid #1e293b",
};

const logo: React.CSSProperties = {
  fontSize: 22,
  marginBottom: 40,
  color: "#38bdf8",
};

const navLinks: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#cbd5f5",
  fontSize: 15,
};
