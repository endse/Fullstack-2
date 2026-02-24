"use client";

export default function HeavyComponent() {
  return (
    <div
      style={{
        marginTop: 30,
        padding: 30,
        borderRadius: 16,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <h2>🚀 Heavy Component Loaded</h2>
      <p>
        This module was dynamically imported. It was not included in the
        initial JavaScript bundle.
      </p>
    </div>
  );
}