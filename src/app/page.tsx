"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import EventDetails from "@/components/EventDetails";
import PoruwaCeremony from "@/components/PoruwaCeremony";
import LocationSection from "@/components/LocationSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import FloatingPetals from "@/components/FloatingPetals";
import BackgroundMusic from "@/components/BackgroundMusic";
import LoveStoryBanner from "@/components/LoveStoryBanner";
import ScrollProgress from "@/components/ScrollProgress";

// Subtle global ambience — fewer particles on mobile for performance
const GlobalParticles: React.FC = () => {
  const isMobile = useIsMobile();
  const count = isMobile ? 10 : 24;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
    type: i % 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [0, 0.4, 0],
            rotate: p.type === 2 ? [0, 360] : [0, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.type === 0 ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24">
              <path
                d="M12 1L14 9L22 12L14 15L12 23L10 15L2 12L10 9L12 1Z"
                fill="rgba(212,175,55,0.5)"
              />
            </svg>
          ) : p.type === 1 ? (
            <div
              className="rounded-full"
              style={{
                width: p.size / 2,
                height: p.size / 2,
                background: "rgba(230,183,169,0.4)",
              }}
            />
          ) : (
            <div
              className="petal"
              style={{
                width: p.size,
                height: p.size * 1.3,
                background:
                  "linear-gradient(135deg, rgba(248,231,231,0.4), rgba(230,183,169,0.3))",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    setTimeout(() => setContentVisible(true), 100);
  }, []);

  // Lock scroll during preloader
  useEffect(() => {
    document.body.style.overflow = preloaderDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [preloaderDone]);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#FFFDF7", fontFamily: "'Lato', sans-serif" }}
    >
      <Preloader onComplete={handlePreloaderComplete} />

      {contentVisible && <ScrollProgress />}
      {contentVisible && <GlobalParticles />}
      {contentVisible && <FloatingPetals />}
      {contentVisible && <BackgroundMusic />}

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10"
          >
            <Navigation />

            <main>
              <Hero />
              <SectionDivider variant="floral" />
              <CoupleSection />
              <SectionDivider variant="gold" />
              <CountdownSection />
              <SectionDivider variant="floral" />
              <LoveStoryBanner />
              <SectionDivider variant="gold" />
              <EventDetails />
              <SectionDivider variant="gold" />
              <PoruwaCeremony />
              <SectionDivider variant="floral" />
              <LocationSection />
              <SectionDivider variant="floral" />
              <RSVPSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
