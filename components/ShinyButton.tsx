"use client";
import { motion } from "framer-motion";

export const ShinyButton = ({ onClick, children, className = "" }: any) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.5)",
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold text-xl transition-colors shadow-lg ${className}`}
    >
      {children}
    </motion.button>
  );
};
