'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const RosePetal: React.FC<{
  style: React.CSSProperties;
  animDelay: number;
  duration: number;
  leftStart: string;
}> = ({ animDelay, duration, leftStart }) => {
  const colors = [
    'linear-gradient(135deg, #F8E7E7, #E6B7A9)',
    'linear-gradient(135deg, #F4C2C2, #F8E7E7)',
    'linear-gradient(135deg, #E8D7B9, #F7E8D0)',
    'linear-gradient(135deg, #F8E7E7, #C9A9A6)',
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 8 + Math.random() * 14;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: leftStart, top: '-30px', zIndex: 5 }}
      animate={{
        y: ['0px', '110vh'],
        x: [0, Math.random() > 0.5 ? 100 : -100, Math.random() > 0.5 ? 50 : -50],
        rotate: [0, 360, 720, 1080],
        opacity: [0, 0.8, 0.6, 0.3, 0],
      }}
      transition={{
        duration,
        delay: animDelay,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: Math.random() * 2,
      }}
    >
      <div
        className="petal"
        style={{
          width: size,
          height: size * 1.4,
          background: color,
        }}
      />
    </motion.div>
  );
};

const Butterfly: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, zIndex: 4 }}
    animate={{
      x: [0, 80, 40, 120, 60, 0],
      y: [0, -40, -80, -30, -60, 0],
      opacity: [0, 0.6, 0.8, 0.6, 0.8, 0],
    }}
    transition={{ duration: 12, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <motion.div
      animate={{ scaleX: [1, 0.3, 1, 0.3, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="text-2xl"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.3))' }}
    >
      🦋
    </motion.div>
  </motion.div>
);

const GoldSparkle: React.FC<{ x: number; y: number; delay: number; size?: number }> = ({
  x, y, delay, size = 16
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, zIndex: 4 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" fill="#D4AF37" opacity="0.8"/>
    </svg>
  </motion.div>
);

const FloralDecoration: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const transforms: Record<string, string> = {
    tl: 'none',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1, -1)',
  };
  const posStyles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  };

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ ...posStyles[position], transform: transforms[position] }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 1.5 }}
    >
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none" opacity="0.7">
        <path d="M10 10 Q40 5 60 30 Q80 55 50 70 Q20 85 10 60 Q0 35 10 10Z" fill="rgba(232,215,185,0.4)" />
        <path d="M10 10 Q5 40 30 60 Q55 80 70 50 Q85 20 60 10 Q35 0 10 10Z" fill="rgba(248,231,231,0.5)" />
        <path d="M60 30 Q90 10 100 50 Q110 90 75 95 Q40 100 35 70 Q30 40 60 30Z" fill="rgba(212,175,55,0.15)" />
        <path d="M5 5 L5 40" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" />
        <path d="M5 5 L40 5" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" />
        <circle cx="5" cy="5" r="2" fill="rgba(212,175,55,0.6)" />
        <path d="M25 25 Q30 18 38 22 Q45 26 40 33 Q35 40 28 36 Q21 32 25 25Z" fill="rgba(230,183,169,0.5)" />
        <path d="M50 15 Q55 8 63 12 Q70 16 65 23 Q60 30 53 26 Q46 22 50 15Z" fill="rgba(232,215,185,0.6)" />
        <path d="M15 50 Q20 43 28 47 Q35 51 30 58 Q25 65 18 61 Q11 57 15 50Z" fill="rgba(248,231,231,0.7)" />
        <path d="M70 70 Q80 55 95 65 Q110 75 100 90 Q90 105 75 95 Q60 85 70 70Z" fill="rgba(212,175,55,0.12)" />
        <circle cx="38" cy="38" r="2" fill="rgba(212,175,55,0.5)" />
        <circle cx="55" cy="20" r="1.5" fill="rgba(230,183,169,0.6)" />
        <circle cx="20" cy="55" r="1.5" fill="rgba(230,183,169,0.6)" />
      </svg>
    </motion.div>
  );
};

// Animated hero name: letters reveal one-by-one (handwriting feel) and sit on a
// soft cream halo so the script stays crisp over the busy floral background.
const AnimatedName: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const letters = Array.from(text);
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {/* legibility halo */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '124%',
          height: '160%',
          background:
            'radial-gradient(ellipse at center, rgba(255,253,247,0.97) 0%, rgba(255,253,247,0.8) 38%, rgba(255,253,247,0.35) 60%, transparent 75%)',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      />
      {/* periodic shine sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="absolute top-0 bottom-0"
          style={{
            width: '40%',
            background:
              'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
          }}
          initial={{ left: '-45%' }}
          animate={{ left: '115%' }}
          transition={{
            duration: 2,
            delay: delay + 1.4,
            repeat: Infinity,
            repeatDelay: 4.5,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      <h1
        className="font-script leading-none select-none"
        style={{ fontSize: 'clamp(3rem, 12vw, 8.5rem)' }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{
              color: '#561F2A',
              textShadow:
                '0 1px 1px rgba(255,253,247,1), 0 0 10px rgba(255,253,247,0.9), 0 2px 2px rgba(86,31,42,0.25), 0 12px 38px rgba(122,62,72,0.32)',
            }}
            initial={{ opacity: 0, y: 50, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
};

// A gold flourish that draws itself in beneath a name.
const Flourish: React.FC<{ delay: number }> = ({ delay }) => (
  <svg
    width="240"
    height="22"
    viewBox="0 0 240 22"
    fill="none"
    className="mx-auto mt-2"
    style={{ maxWidth: '70vw' }}
  >
    <motion.path
      d="M15 12 Q70 0 120 11 Q170 22 225 11"
      stroke="rgba(212,175,55,0.7)"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: 'easeInOut' }}
    />
    <motion.circle
      cx="120"
      cy="11"
      r="2.6"
      fill="rgba(212,175,55,0.85)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: delay + 0.8, type: 'spring', stiffness: 200 }}
    />
  </svg>
);

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  // Lighter particle load on phones for smooth scrolling
  const petalCount = isMobile ? 10 : 20;
  const sparkleCount = isMobile ? 10 : 20;

  const petals = Array.from({ length: petalCount }, (_, i) => ({
    leftStart: `${(i / petalCount) * 100}%`,
    animDelay: i * 0.8,
    duration: 6 + Math.random() * 5,
    style: {} as React.CSSProperties,
  }));

  const butterflies = isMobile
    ? [{ x: 80, y: 15, delay: 4 }]
    : [
        { x: 10, y: 20, delay: 2 },
        { x: 80, y: 15, delay: 5 },
        { x: 60, y: 60, delay: 8 },
      ];

  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.4,
    size: 10 + Math.random() * 14,
  }));

  const scrollToNext = () => {
    const nextSection = document.getElementById('couple');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFFDF7 0%, #F9F6F2 25%, #F7E8D0 50%, #F8E7E7 75%, #FFFDF7 100%)' }}
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url('/images/hero-floral.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Near-white ivory wash so the dark script names stand out clearly */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,253,247,0.93) 0%, rgba(255,253,247,0.9) 35%, rgba(255,252,246,0.92) 65%, rgba(255,253,247,0.98) 100%)',
          }}
        />
        {/* Extra white glow through the centre behind the names */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at center, rgba(255,253,247,0.9) 0%, rgba(255,253,247,0.5) 45%, rgba(255,253,247,0) 80%)',
          }}
        />
      </motion.div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: '10%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: '20%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(230,183,169,0.1) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Floral corner decorations */}
      <FloralDecoration position="tl" />
      <FloralDecoration position="tr" />
      <FloralDecoration position="bl" />
      <FloralDecoration position="br" />

      {/* Falling Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        {petals.map((p, i) => <RosePetal key={i} {...p} />)}
      </div>

      {/* Butterflies */}
      {mounted && butterflies.map((b, i) => <Butterfly key={i} {...b} />)}

      {/* Gold Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-[6]">
        {sparkles.map((s, i) => <GoldSparkle key={i} {...s} />)}
      </div>

      {/* Decorative gold frame */}
      <motion.div
        className="absolute inset-8 md:inset-16 pointer-events-none z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          {/* Top-left corner */}
          <path d="M3 3 L3 15 M3 3 L15 3" stroke="rgba(212,175,55,0.4)" strokeWidth="0.3" />
          <path d="M3 3 Q9 3 9 9" stroke="rgba(212,175,55,0.3)" strokeWidth="0.2" fill="none" />
          {/* Top-right corner */}
          <path d="M97 3 L97 15 M97 3 L85 3" stroke="rgba(212,175,55,0.4)" strokeWidth="0.3" />
          <path d="M97 3 Q91 3 91 9" stroke="rgba(212,175,55,0.3)" strokeWidth="0.2" fill="none" />
          {/* Bottom-left corner */}
          <path d="M3 97 L3 85 M3 97 L15 97" stroke="rgba(212,175,55,0.4)" strokeWidth="0.3" />
          <path d="M3 97 Q9 97 9 91" stroke="rgba(212,175,55,0.3)" strokeWidth="0.2" fill="none" />
          {/* Bottom-right corner */}
          <path d="M97 97 L97 85 M97 97 L85 97" stroke="rgba(212,175,55,0.4)" strokeWidth="0.3" />
          <path d="M97 97 Q91 97 91 91" stroke="rgba(212,175,55,0.3)" strokeWidth="0.2" fill="none" />
          {/* Center decorative diamonds */}
          <polygon points="50,1.5 51,2.5 50,3.5 49,2.5" fill="rgba(212,175,55,0.5)" />
          <polygon points="50,96.5 51,97.5 50,98.5 49,97.5" fill="rgba(212,175,55,0.5)" />
          <polygon points="1.5,50 2.5,51 3.5,50 2.5,49" fill="rgba(212,175,55,0.5)" />
          <polygon points="96.5,50 97.5,51 98.5,50 97.5,49" fill="rgba(212,175,55,0.5)" />
        </svg>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        {/* Pre-header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6))' }} />
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2L14 9L21 9L15.5 13.5L17.5 20.5L12 16L6.5 20.5L8.5 13.5L3 9L10 9Z" fill="rgba(212,175,55,0.7)"/></svg>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.6))' }} />
          </div>
          <p
            className="font-cinzel text-xs tracking-[0.4em] uppercase"
            style={{ color: '#B08D57' }}
          >
            Together With Their Families
          </p>
        </motion.div>

        {/* Bride Name */}
        <AnimatedName text="Madushika" delay={0.5} />

        {/* Animated Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.9, type: 'spring', stiffness: 80 }}
          className="my-2 relative"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Rose petal decorations around & */}
            <div className="relative flex items-center justify-center">
              <motion.span
                className="font-script"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                  background: 'linear-gradient(135deg, #B08D57, #D4AF37, #E6B7A9, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 15px rgba(212,175,55,0.4))',
                }}
              >
                &amp;
              </motion.span>
              {/* Small sparkles around & */}
              {[
                { x: -30, y: -20 }, { x: 30, y: -20 },
                { x: -35, y: 15 }, { x: 35, y: 15 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatDelay: 1 }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24">
                    <path d="M12 1L14 9L22 12L14 15L12 23L10 15L2 12L10 9L12 1Z" fill="#D4AF37"/>
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Groom Name */}
        <AnimatedName text="Sachithra" delay={1.0} />
        <Flourish delay={1.9} />

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 mb-10"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6))' }} />
            <div className="text-center">
              <p
                className="font-cinzel text-sm md:text-base tracking-[0.3em] uppercase"
                style={{ color: '#B08D57' }}
              >
                23 July 2026
              </p>
              <p
                className="font-garamond text-sm md:text-base tracking-widest mt-1 italic"
                style={{ color: '#C9A9A6' }}
              >
                Hotel Sesatha · Matale · Sri Lanka
              </p>
            </div>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.6))' }} />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative inline-flex"
        >
          {/* breathing glow */}
          <motion.span
            className="absolute inset-0 rounded-[1px] pointer-events-none"
            style={{ background: 'rgba(212,175,55,0.45)', filter: 'blur(22px)' }}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.button
            onClick={scrollToNext}
            className="relative group overflow-hidden px-12 py-4 font-cinzel text-sm tracking-[0.3em] uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(176,141,87,0.9))',
              color: '#FFFDF7',
              border: '1px solid rgba(212,175,55,0.5)',
              borderRadius: '1px',
              boxShadow: '0 8px 40px rgba(212,175,55,0.25), 0 2px 10px rgba(122,62,72,0.1)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 50px rgba(212,175,55,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Open Invitation</span>
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)' }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
            <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={scrollToNext}
      >
        <span className="font-cinzel text-[10px] tracking-[0.3em]" style={{ color: 'rgba(176,141,87,0.6)' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} style={{ color: 'rgba(212,175,55,0.6)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
