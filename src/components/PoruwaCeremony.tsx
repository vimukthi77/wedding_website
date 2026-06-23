'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const SriLankanMotif: React.FC<{ x: number; y: number; size?: number; opacity?: number }> = ({
  x, y, size = 60, opacity = 0.3
}) => (
  <svg
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', opacity }}
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
  >
    <circle cx="30" cy="30" r="28" stroke="rgba(212,175,55,0.6)" strokeWidth="0.5" strokeDasharray="2,4"/>
    <circle cx="30" cy="30" r="20" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5"/>
    <path d="M30 4 L34 26 L56 30 L34 34 L30 56 L26 34 L4 30 L26 26 Z" fill="rgba(212,175,55,0.3)"/>
    <circle cx="30" cy="30" r="4" fill="rgba(212,175,55,0.5)"/>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <ellipse
        key={deg}
        cx={30 + 14 * Math.cos(deg * Math.PI / 180)}
        cy={30 + 14 * Math.sin(deg * Math.PI / 180)}
        rx="3"
        ry="5"
        fill="rgba(212,175,55,0.25)"
        transform={`rotate(${deg}, ${30 + 14 * Math.cos(deg * Math.PI / 180)}, ${30 + 14 * Math.sin(deg * Math.PI / 180)})`}
      />
    ))}
  </svg>
);

const LotusFlower: React.FC = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    {/* Petals */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
      <ellipse
        key={i}
        cx={60 + 25 * Math.cos(deg * Math.PI / 180)}
        cy={40 + 15 * Math.sin(deg * Math.PI / 180)}
        rx="12"
        ry="6"
        fill={i % 2 === 0 ? 'rgba(248,231,231,0.8)' : 'rgba(255,255,255,0.6)'}
        stroke="rgba(212,175,55,0.4)"
        strokeWidth="0.5"
        transform={`rotate(${deg}, ${60 + 25 * Math.cos(deg * Math.PI / 180)}, ${40 + 15 * Math.sin(deg * Math.PI / 180)})`}
      />
    ))}
    <circle cx="60" cy="40" r="12" fill="rgba(212,175,55,0.3)" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8"/>
    <circle cx="60" cy="40" r="6" fill="rgba(212,175,55,0.5)"/>
  </svg>
);

const OilLampIcon: React.FC = () => (
  <svg width="50" height="80" viewBox="0 0 50 80" fill="none">
    {/* Flame */}
    <motion.path
      d="M25 15 Q20 10 22 5 Q25 2 28 5 Q30 10 25 15Z"
      fill="rgba(255,180,50,0.8)"
      animate={{
        d: [
          "M25 15 Q20 10 22 5 Q25 2 28 5 Q30 10 25 15Z",
          "M25 15 Q18 8 21 4 Q25 1 29 4 Q32 8 25 15Z",
          "M25 15 Q22 10 24 5 Q25 2 26 5 Q28 10 25 15Z",
        ]
      }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Inner flame */}
    <motion.path
      d="M25 14 Q23 11 24 8 Q25 6 26 8 Q27 11 25 14Z"
      fill="rgba(255,220,100,0.9)"
      animate={{
        d: [
          "M25 14 Q23 11 24 8 Q25 6 26 8 Q27 11 25 14Z",
          "M25 14 Q22 10 23 7 Q25 5 27 7 Q28 10 25 14Z",
        ]
      }}
      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Lamp body */}
    <path d="M20 20 Q15 22 15 28 L18 45 L32 45 L35 28 Q35 22 30 20 Z" fill="rgba(212,175,55,0.7)" stroke="rgba(176,141,87,0.8)" strokeWidth="0.8"/>
    <path d="M17 45 L15 55 L35 55 L33 45 Z" fill="rgba(212,175,55,0.8)" stroke="rgba(176,141,87,0.8)" strokeWidth="0.8"/>
    {/* Base */}
    <rect x="10" y="55" width="30" height="5" rx="2" fill="rgba(176,141,87,0.8)"/>
    <rect x="8" y="60" width="34" height="4" rx="1" fill="rgba(212,175,55,0.6)"/>
    {/* Stand */}
    <rect x="23" y="64" width="4" height="10" fill="rgba(176,141,87,0.7)"/>
    <rect x="16" y="74" width="18" height="4" rx="1" fill="rgba(212,175,55,0.7)"/>
    {/* Decorative band */}
    <rect x="16" y="30" width="18" height="3" rx="1" fill="rgba(255,253,247,0.5)"/>
    {/* Glow */}
    <ellipse cx="25" cy="10" rx="8" ry="6" fill="rgba(255,200,50,0.2)" />
  </svg>
);

const PoruwaCeremony: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={ref}
      id="poruwa"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF7 0%, #F7E8D0 20%, #F9F6F2 50%, #F7E8D0 80%, #FFFDF7 100%)',
      }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url(/images/poruwa-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,253,247,0.92) 0%, rgba(247,232,208,0.88) 50%, rgba(255,253,247,0.92) 100%)',
          }}
        />
      </motion.div>

      {/* Sri Lankan Motifs */}
      <SriLankanMotif x={5} y={20} size={80} opacity={0.2} />
      <SriLankanMotif x={95} y={20} size={80} opacity={0.2} />
      <SriLankanMotif x={5} y={75} size={60} opacity={0.15} />
      <SriLankanMotif x={95} y={75} size={60} opacity={0.15} />
      <SriLankanMotif x={50} y={10} size={50} opacity={0.12} />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: i % 3 === 0 ? 'rgba(212,175,55,0.6)' : i % 3 === 1 ? 'rgba(230,183,169,0.6)' : 'rgba(248,231,231,0.8)' }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B08D57' }}>
            ✦ &nbsp; Sacred Tradition &nbsp; ✦
          </p>
          <h2
            className="font-script mb-2"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#7A3E48' }}
          >
            Poruwa Ceremony
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(212,175,55,0.6)' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative"
        >
          <div
            className="relative overflow-hidden rounded-sm"
            style={{
              background: 'rgba(255,253,247,0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 20px 80px rgba(122,62,72,0.1), 0 0 0 1px rgba(255,255,255,0.5)',
            }}
          >
            {/* Decorative top border */}
            <div
              className="w-full h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(230,183,169,0.5), rgba(212,175,55,0.5), transparent)',
              }}
            />

            <div className="p-8 md:p-12">
              {/* Top decorative row */}
              <div className="flex justify-center items-center gap-3 sm:gap-8 mb-8">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <OilLampIcon />
                </motion.div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <LotusFlower />
                  </div>
                  <p className="font-cinzel text-xs tracking-[0.25em] uppercase" style={{ color: '#B08D57' }}>
                    Auspicious Beginning
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  style={{ transform: 'scaleX(-1)' }}
                >
                  <OilLampIcon />
                </motion.div>
              </div>

              {/* Time Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-center mb-8"
              >
                <div className="inline-flex flex-col items-center">
                  {/* Outer glow */}
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div
                      className="px-10 py-6 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(230,183,169,0.08))',
                        border: '1px solid rgba(212,175,55,0.3)',
                      }}
                    >
                      {/* Corner jewels */}
                      {[
                        { pos: '-top-2 -left-2' },
                        { pos: '-top-2 -right-2' },
                        { pos: '-bottom-2 -left-2' },
                        { pos: '-bottom-2 -right-2' },
                      ].map((c, i) => (
                        <div key={i} className={`absolute ${c.pos} w-4 h-4 flex items-center justify-center`}>
                          <div className="w-2 h-2 rotate-45" style={{ background: 'rgba(212,175,55,0.8)' }} />
                        </div>
                      ))}

                      <p className="font-cinzel text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#B08D57' }}>
                        Ceremony Commences
                      </p>
                      <motion.h3
                        className="font-display-luxury font-light"
                        style={{
                          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                          background: 'linear-gradient(135deg, #B08D57, #D4AF37, #E6B7A9, #D4AF37)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          lineHeight: 1,
                        }}
                        animate={{
                          backgroundPosition: ['0%', '100%', '0%'],
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        10:05 AM
                      </motion.h3>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="rgba(212,175,55,0.5)"/>
                </svg>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-center space-y-4"
              >
                <p
                  className="font-garamond text-base md:text-lg leading-relaxed max-w-lg mx-auto"
                  style={{ color: '#5C3D2E', letterSpacing: '0.02em' }}
                >
                  The sacred Poruwa ceremony is the heart of our traditional Sri Lankan wedding celebration, where two families unite under one auspicious platform.
                </p>
                <p
                  className="font-garamond italic text-sm"
                  style={{ color: '#C9A9A6' }}
                >
                  "A moment blessed by the stars, celebrated by our families"
                </p>
              </motion.div>

              {/* Cultural elements row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-8 mt-8"
              >
                {[
                  { emoji: '🌸', label: 'Jasmine' },
                  { emoji: '🕯️', label: 'Oil Lamps' },
                  { emoji: '🌺', label: 'Nelum' },
                  { emoji: '✨', label: 'Blessings' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center gap-1"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase" style={{ color: '#C9A9A6' }}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Decorative bottom border */}
            <div
              className="w-full h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(230,183,169,0.5), rgba(212,175,55,0.5), transparent)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PoruwaCeremony;
