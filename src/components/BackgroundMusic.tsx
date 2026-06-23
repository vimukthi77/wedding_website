"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX } from "lucide-react";

const VOLUME = 0.90;

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const unlockedRef = useRef(false);

  // Attempt playback; resolves whether it succeeded.
  const tryPlay = async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.volume = VOLUME;
      await audio.play();
      setIsPlaying(true);
      unlockedRef.current = true;
      return true;
    } catch {
      return false;
    }
  };

  // 1) Try immediate (mostly works on desktop), 2) unlock on first gesture (mobile/iOS).
  useEffect(() => {
    const t = setTimeout(tryPlay, 800);

    const handleInteraction = () => {
      if (unlockedRef.current) return;
      tryPlay();
    };

    // pointerdown / touchstart / click / keydown cover all platforms incl. iOS Safari
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
      "scroll",
    ];
    events.forEach((e) =>
      document.addEventListener(e, handleInteraction, { passive: true })
    );

    return () => {
      clearTimeout(t);
      events.forEach((e) => document.removeEventListener(e, handleInteraction));
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await tryPlay();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        playsInline
        preload="auto"
        src="/images/bgsound.mpeg"
        style={{ display: "none" }}
      />

      <motion.button
        onClick={toggle}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[110] w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255,253,247,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(212,175,55,0.35)",
          boxShadow: "0 6px 24px rgba(122,62,72,0.12)",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 8px 30px rgba(212,175,55,0.25)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* pulsing ring when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(212,175,55,0.5)" }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {isPlaying ? (
          // Animated equalizer to signal music is on
          <div className="flex items-end gap-[3px] h-4" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full"
                style={{ background: "#b08d57" }}
                animate={{ height: ["35%", "100%", "45%", "85%", "35%"] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ) : (
          <VolumeX size={18} style={{ color: "rgba(176,141,87,0.85)" }} />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;
