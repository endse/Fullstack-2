"use client";

export default function AboutComponent() {
  return (
    <div
      style={{
        marginTop: 30,
        padding: 30,
        borderRadius: 16,
        background: "rgba(0,150,255,0.15)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <h2>📦 About Module</h2>
      <p>
        This component demonstrates performance optimization using
        Next.js dynamic imports.
      </p>
    </div>
  );
}