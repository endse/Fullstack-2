"use client";

import { useEffect, useState } from "react";

export default function ThemeTogglePage(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);

  // Ensure client-only execution (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme AFTER hydration
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark, mounted]);

  // Prevent SSR / CSR mismatch
  if (!mounted) return null;

  return (
    <>
      <style>{css}</style>

      <main className="container">
        <section className="card">
          <h1>Theme Toggle</h1>
          <p>Click the button to switch theme</p>

          <button
            className="toggle"
            onClick={() => setDark((prev) => !prev)}
          >
            Switch to {dark ? "Light" : "Dark"} Mode
          </button>
        </section>
      </main>
    </>
  );
}

/* ---------- INLINE CSS ---------- */

const css = `
* {
  box-sizing: border-box;
}

:root {
  --bg: #f4f6f8;
  --text: #0f172a;
  --card: #ffffff;
  --primary: #2563eb;
  --border: #e5e7eb;
}

.dark {
  --bg: #020617;
  --text: #e5e7eb;
  --card: #020617;
  --primary: #38bdf8;
  --border: #1e293b;
}

html,
body {
  margin: 0;
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 20px;
}

.card {
  background: var(--card);
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 32px;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}

.toggle {
  margin-top: 20px;
  padding: 12px 22px;
  border-radius: 999px;
  border: none;
  background: var(--primary);
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.toggle:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}
`;
