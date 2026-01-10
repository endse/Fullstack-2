// app/page.tsx
"use client";

import { motion } from "framer-motion";

const blocks = [
  { id: 1, color: "#FF6B6B", text: "Block 1" },
  { id: 2, color: "#6BCB77", text: "Block 2" },
  { id: 3, color: "#4D96FF", text: "Block 3" },
  { id: 4, color: "#FFD93D", text: "Block 4" },
];

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: "100vh",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        style={{ fontSize: "2.5rem", color: "#0070f3" }}
      >
        Animated Blocks
      </motion.h1>

      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "800px",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{
              backgroundColor: block.color,
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1.2rem",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {block.text}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
