'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const FloralAccent: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <svg
    width="160"
    height="300"
    viewBox="0 0 160 300"
    fill="none"
    style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none', opacity: 0.6 }}
  >
    <path d="M80 10 Q30 50 20 100 Q10 150 40 180 Q70 210 80 250 Q90 280 80 300" stroke="rgba(212,175,55,0.4)" strokeWidth="1" fill="none"/>
    <path d="M80 50 Q50 40 35 60 Q20 80 40 90 Q60 100 80 80 Q100 60 80 50Z" fill="rgba(248,231,231,0.7)" />
    <path d="M80 50 Q110 40 125 60 Q140 80 120 90 Q100 100 80 80Z" fill="rgba(232,215,185,0.6)" />
    <path d="M60 120 Q30 110 25 135 Q20 160 45 162 Q70 164 72 140 Q74 116 60 120Z" fill="rgba(230,183,169,0.5)" />
    <path d="M100 120 Q130 110 135 135 Q140 160 115 162 Q90 164 88 140 Q86 116 100 120Z" fill="rgba(248,231,231,0.6)" />
    <path d="M75 185 Q45 175 40 200 Q35 225 60 227 Q85 229 87 205 Q89 181 75 185Z" fill="rgba(232,215,185,0.5)" />
    <circle cx="80" cy="50" r="5" fill="rgba(212,175,55,0.4)" />
    <circle cx="55" cy="135" r="3.5" fill="rgba(212,175,55,0.3)" />
    <circle cx="105" cy="135" r="3.5" fill="rgba(212,175,55,0.3)" />
    <circle cx="80" cy="200" r="4" fill="rgba(212,175,55,0.35)" />
    <path d="M65 75 Q80 60 95 75" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" fill="none"/>
    <path d="M50 155 Q60 140 70 155" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8" fill="none"/>
    {[...Array(8)].map((_, i) => (
      <circle
        key={i}
        cx={60 + Math.sin(i * 45 * Math.PI / 180) * 20}
        cy={250 + Math.cos(i * 45 * Math.PI / 180) * 20}
        r="2"
        fill="rgba(212,175,55,0.3)"
      />
    ))}
  </svg>
);

const PersonCard: React.FC<{
  name: string;
  parents: string;
  role: 'Bride' | 'Groom';
  delay?: number;
}> = ({ name, parents, role, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay }}
      className="flex flex-col items-center text-center relative px-4 py-8"
    >
      {/* Role Label */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="mb-4"
      >
        <p
          className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] uppercase"
          style={{ color: '#B08D57' }}
        >
          {role === 'Bride' ? '✦ The Bride ✦' : '✦ The Groom ✦'}
        </p>
      </motion.div>

      {/* Name */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: delay + 0.3 }}
        className="font-script mb-3"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
          color: '#7A3E48',
          lineHeight: 1,
        }}
      >
        {name}
      </motion.h2>

      {/* Gold divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6))' }} />
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="rgba(212,175,55,0.7)"/>
        </svg>
        <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.6))' }} />
      </motion.div>

      {/* Parent info */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.6 }}
        className="space-y-1"
      >
        <p
          className="font-garamond text-xs md:text-sm italic"
          style={{ color: '#C9A9A6', letterSpacing: '0.05em' }}
        >
          {role === 'Bride' ? 'Daughter of' : 'Son of'}
        </p>
        <p
          className="font-garamond text-sm md:text-base"
          style={{ color: '#5C3D2E', letterSpacing: '0.05em' }}
        >
          {parents}
        </p>
      </motion.div>

      {/* Floating small petals decoration */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: 8,
            height: 11,
            background: 'linear-gradient(135deg, #F8E7E7, #E6B7A9)',
            borderRadius: '150% 0 150% 0',
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </motion.div>
  );
};

const CoupleSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-50px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="couple"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #F9F6F2 30%, #F7E8D0 60%, #F9F6F2 80%, #FFFDF7 100%)' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-32"
          style={{ background: 'linear-gradient(to bottom, #FFFDF7, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-32"
          style={{ background: 'linear-gradient(to top, #FFFDF7, transparent)' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(248,231,231,0.4) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B08D57' }}>
            ✦ &nbsp; With Love &amp; Joy &nbsp; ✦
          </p>
          <h2
            className="font-script mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#7A3E48' }}
          >
            Meet the Couple
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                fill="rgba(230,183,169,0.7)" />
            </svg>
            <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </motion.div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Desktop: Three-column layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 items-center">
          {/* Bride Info */}
          <div className="relative">
            <div className="absolute top-0 right-0 opacity-40">
              <FloralAccent side="right" />
            </div>
            <PersonCard
              name="Madushika"
              parents="Mr. & Mrs. Kapila Rathne"
              role="Bride"
              delay={0.2}
            />
          </div>

          {/* Center Photo */}
          <motion.div
            ref={imageRef}
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <motion.div style={{ y: imageY }} className="relative">
              {/* Outer gold frame */}
              <div
                className="relative"
                style={{
                  padding: '6px',
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.6), rgba(230,183,169,0.4), rgba(212,175,55,0.6))',
                  borderRadius: '2px',
                  boxShadow: '0 20px 80px rgba(122,62,72,0.15), 0 40px 120px rgba(212,175,55,0.1)',
                }}
              >
                {/* Inner cream border */}
                <div style={{ padding: '4px', background: '#FFFDF7', borderRadius: '1px' }}>
                  {/* Image container */}
                  <motion.div
                    className="relative overflow-hidden"
                    style={{
                      width: 320,
                      height: 420,
                      borderRadius: '1px',
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="/images/couple.jpeg"
                      alt="Madushika & Sachithra"
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      style={{ filter: 'brightness(1.03) saturate(1.05) contrast(1.02)' }}
                    />
                    {/* Premium overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 50%, rgba(230,183,169,0.06) 100%)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Corner ornaments on frame */}
                {[
                  { top: -6, left: -6 },
                  { top: -6, right: -6 },
                  { bottom: -6, left: -6 },
                  { bottom: -6, right: -6 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 flex items-center justify-center"
                    style={{ ...pos }}
                  >
                    <div
                      className="w-2 h-2 rotate-45"
                      style={{ background: 'rgba(212,175,55,0.8)' }}
                    />
                  </div>
                ))}
              </div>

              {/* Monogram badge */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B08D57)',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="font-script text-lg" style={{ color: '#FFFDF7' }}>M&S</span>
              </motion.div>
            </motion.div>

            {/* Photo caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-10 text-center"
            >
              <p className="font-garamond text-xs italic" style={{ color: '#C9A9A6', letterSpacing: '0.1em' }}>
                23 · July · 2026
              </p>
            </motion.div>
          </motion.div>

          {/* Groom Info */}
          <div className="relative">
            <div className="absolute top-0 left-0 opacity-40">
              <FloralAccent side="left" />
            </div>
            <PersonCard
              name="Sachithra"
              parents="Mr. & Mrs. Sarath Jayaweera"
              role="Groom"
              delay={0.3}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center gap-12">
          {/* Bride */}
          <PersonCard
            name="Madushika"
            parents="Mr. & Mrs. Kapila Rathne"
            role="Bride"
            delay={0.1}
          />

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div
              style={{
                padding: '5px',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.6), rgba(230,183,169,0.4), rgba(212,175,55,0.6))',
                borderRadius: '2px',
                boxShadow: '0 15px 50px rgba(122,62,72,0.12)',
              }}
            >
              <div style={{ padding: '3px', background: '#FFFDF7' }}>
                <div
                  className="relative"
                  style={{
                    width: 'min(280px, 78vw)',
                    aspectRatio: '280 / 360',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/images/couple.jpeg"
                    alt="Madushika & Sachithra"
                    fill
                    sizes="(max-width: 768px) 78vw, 280px"
                    className="object-cover"
                    style={{ filter: 'brightness(1.03) saturate(1.05)' }}
                  />
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D57)', boxShadow: '0 4px 15px rgba(212,175,55,0.4)' }}
            >
              <span className="font-script text-sm" style={{ color: '#FFFDF7' }}>M&S</span>
            </motion.div>
          </motion.div>

          {/* Groom */}
          <PersonCard
            name="Sachithra"
            parents="Mr. & Mrs. Sarath Jayaweera"
            role="Groom"
            delay={0.2}
          />
        </div>
      </div>

      {/* Bottom Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 text-center mt-20 px-4"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
              fill="rgba(230,183,169,0.6)"/>
          </svg>
          <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
        </div>
        <p
          className="font-garamond italic text-base md:text-lg max-w-xl mx-auto"
          style={{ color: '#5C3D2E', opacity: 0.7, letterSpacing: '0.05em' }}
        >
          "Two souls, one heart — beginning their forever together"
        </p>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
