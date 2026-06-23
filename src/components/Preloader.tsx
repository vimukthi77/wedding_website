"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setPhase("reveal"), 350);
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1700);
          return 100;
        }
        const increment = prev < 55 ? 2.4 : prev < 85 ? 1.3 : 0.6;
        return Math.min(100, prev + increment);
      });
    }, 38);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  // Circular progress ring geometry
  const R = 78;
  const CIRC = 2 * Math.PI * R;
  const dash = CIRC * (1 - progress / 100);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #fffdf7 0%, #f9f6f2 45%, #f7e8d0 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Soft ambient glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 520,
              height: 520,
              background:
                "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle drifting dots (kept light for mobile) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 4,
                height: 4,
                left: `${12 + i * 10}%`,
                top: `${20 + ((i * 37) % 60)}%`,
                background: "rgba(212,175,55,0.5)",
              }}
              animate={{ y: [0, -18, 0], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 3 + (i % 4),
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Center stack */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Ring + monogram */}
            <div className="relative flex items-center justify-center mb-8">
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                {/* track */}
                <circle
                  cx="90"
                  cy="90"
                  r={R}
                  stroke="rgba(212,175,55,0.15)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* progress */}
                <circle
                  cx="90"
                  cy="90"
                  r={R}
                  stroke="url(#preloaderGold)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={dash}
                  transform="rotate(-90 90 90)"
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
                <defs>
                  <linearGradient id="preloaderGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#b08d57" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#e6b7a9" />
                  </linearGradient>
                </defs>
              </svg>

              {/* rotating accent dot riding the ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    top: 8,
                    width: 6,
                    height: 6,
                    background: "#d4af37",
                    boxShadow: "0 0 10px rgba(212,175,55,0.8)",
                  }}
                />
              </motion.div>

              {/* monogram */}
              <motion.div
                className="absolute flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 90 }}
              >
                <span
                  className="font-script select-none leading-none"
                  style={{ fontSize: "3rem", color: "#d4af37" }}
                >
                  M&amp;S
                </span>
                <span
                  className="font-cinzel mt-1"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.25em",
                    color: "rgba(176,141,87,0.8)",
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </motion.div>
            </div>

            {/* Label */}
            <motion.p
              className="font-cinzel uppercase mb-3"
              style={{ fontSize: 11, letterSpacing: "0.4em", color: "#b08d57" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Wedding Invitation
            </motion.p>

            {/* Names */}
            <motion.h1
              className="font-script leading-none"
              style={{ fontSize: "clamp(2.5rem, 9vw, 4rem)", color: "#7a3e48" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65 }}
            >
              Madushika
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-3 my-1"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(212,175,55,0.6))",
                }}
              />
              <span className="font-script text-2xl" style={{ color: "#d4af37" }}>
                &amp;
              </span>
              <div
                className="h-px w-10"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(212,175,55,0.6))",
                }}
              />
            </motion.div>

            <motion.h1
              className="font-script leading-none"
              style={{ fontSize: "clamp(2.5rem, 9vw, 4rem)", color: "#7a3e48" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
            >
              Sachithra
            </motion.h1>

            <motion.p
              className="font-cinzel mt-5"
              style={{ fontSize: 12, letterSpacing: "0.3em", color: "#b08d57" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              23 · 07 · 2026
            </motion.p>
          </div>

          {/* Elegant double-curtain reveal */}
          <AnimatePresence>
            {phase === "reveal" && (
              <>
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{ background: "#fffdf7", transformOrigin: "top" }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
