"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const HeavyComponent = dynamic(
  () => import("../components/HeavyComponent"),
  {
    loading: () => <p>Loading Heavy Component...</p>,
  }
);

const AboutComponent = dynamic(
  () => import("../components/AboutComponent"),
  {
    loading: () => <p>Loading About Component...</p>,
  }
);

export default function Home() {
  const [showHeavy, setShowHeavy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main style={{ padding: "80px 40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: 20 }}>
        ⚡ Lazy Loading Performance Lab
      </h1>

      <p style={{ opacity: 0.8 }}>
        Optimizing frontend performance using dynamic imports.
      </p>

      <div style={{ marginTop: 40 }}>
        <button
          onClick={() => setShowHeavy(true)}
          style={buttonStyle}
        >
          Load Heavy Module
        </button>

        <button
          onClick={() => setShowAbout(true)}
          style={{ ...buttonStyle, marginLeft: 20 }}
        >
          Load About Module
        </button>
      </div>

      {showHeavy && <HeavyComponent />}
      {showAbout && <AboutComponent />}
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "12px 24px",
  fontSize: "1rem",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  background: "#00c6ff",
  color: "black",
  fontWeight: "bold",
};