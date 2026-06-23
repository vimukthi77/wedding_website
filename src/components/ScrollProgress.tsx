"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A slim, modern scroll-progress bar pinned to the very top of the page.
 */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[120] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #b08d57, #d4af37, #e6b7a9, #d4af37, #b08d57)",
        boxShadow: "0 1px 8px rgba(212,175,55,0.45)",
      }}
    />
  );
};

export default ScrollProgress;
