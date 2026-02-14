"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", opacity: 0, x: `${Math.random() * 100}vw` }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          className="absolute text-red-400/40 text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
