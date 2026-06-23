'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FloralFooterDecoration: React.FC = () => (
  <svg className="w-full" viewBox="0 0 800 120" fill="none" preserveAspectRatio="none">
    {/* Main curved branch */}
    <path d="M0 80 Q100 40 200 70 Q300 100 400 50 Q500 0 600 40 Q700 80 800 60" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8" fill="none"/>
    {/* Leaves and petals */}
    {[80, 200, 320, 400, 520, 640, 760].map((x, i) => (
      <g key={i}>
        <ellipse
          cx={x}
          cy={60 + Math.sin(i) * 20}
          rx="15"
          ry="8"
          fill={i % 2 === 0 ? 'rgba(248,231,231,0.6)' : 'rgba(232,215,185,0.5)'}
          transform={`rotate(${i * 30}, ${x}, ${60 + Math.sin(i) * 20})`}
        />
        <circle
          cx={x}
          cy={60 + Math.sin(i) * 20}
          r="3"
          fill="rgba(212,175,55,0.4)"
        />
      </g>
    ))}
    {/* Small sparkle stars */}
    {[150, 350, 550, 700].map((x, i) => (
      <path
        key={`star-${i}`}
        d={`M${x} ${30 + i * 5} L${x + 4} ${38 + i * 5} L${x + 8} ${30 + i * 5} L${x + 4} ${22 + i * 5} Z`}
        fill="rgba(212,175,55,0.3)"
      />
    ))}
  </svg>
);

const Footer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const quickLinks = [
    { label: 'Couple', href: '#couple' },
    { label: 'Details', href: '#details' },
    { label: 'Ceremony', href: '#poruwa' },
    { label: 'Location', href: '#location' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF7 0%, #F7E8D0 30%, #F9F6F2 60%, #F7E8D0 85%, #FFFDF7 100%)',
      }}
    >
      {/* Top floral decoration */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <FloralFooterDecoration />
        </motion.div>
      </div>

      {/* Decorative gold divider */}
      <div className="flex items-center justify-center gap-4 mb-0">
        <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14 9L21 9L15.5 13.5L17.5 20.5L12 16L6.5 20.5L8.5 13.5L3 9L10 9Z" fill="rgba(212,175,55,0.5)"/>
        </svg>
        <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Central couple display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          {/* Floating petals decoration */}
          <div className="relative inline-block">
            {/* Small decorative petals */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none petal"
                style={{
                  width: 8,
                  height: 11,
                  background: 'linear-gradient(135deg, #F8E7E7, #E6B7A9)',
                  left: `${-20 + i * 45}px`,
                  top: `${-10 + Math.sin(i) * 15}px`,
                  opacity: 0.6,
                }}
                animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}

            <p
              className="font-cinzel text-[10px] tracking-[0.4em] uppercase mb-5"
              style={{ color: '#B08D57' }}
            >
              ✦ &nbsp; Forever Together &nbsp; ✦
            </p>

            <h2
              className="font-script leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: '#7A3E48' }}
            >
              Madushika
            </h2>

            {/* Elegant & separator */}
            <motion.div
              className="flex items-center justify-center gap-4 my-3"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
              <div className="relative flex items-center justify-center">
                {/* Sparkles around & */}
                {[
                  { x: -20, y: -15 }, { x: 20, y: -15 },
                  { x: -22, y: 10 }, { x: 22, y: 10 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <svg width="6" height="6" viewBox="0 0 24 24">
                      <path d="M12 1L14 9L22 12L14 15L12 23L10 15L2 12L10 9L12 1Z" fill="#D4AF37"/>
                    </svg>
                  </motion.div>
                ))}
                <span
                  className="font-script"
                  style={{
                    fontSize: '3.5rem',
                    background: 'linear-gradient(135deg, #B08D57, #D4AF37, #E6B7A9)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  &amp;
                </span>
              </div>
              <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
            </motion.div>

            <h2
              className="font-script leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: '#7A3E48' }}
            >
              Sachithra
            </h2>

            {/* Date */}
            <div className="mt-6 mb-8">
              <p
                className="font-cinzel text-sm md:text-base tracking-[0.3em]"
                style={{ color: '#B08D57' }}
              >
                23 · July · 2026
              </p>
              <p
                className="font-garamond italic text-sm mt-1"
                style={{ color: '#C9A9A6' }}
              >
                Hotel Sesatha · Matale · Sri Lanka
              </p>
            </div>

            {/* Main message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="relative max-w-lg mx-auto"
            >
              <div
                className="px-8 py-5 relative"
                style={{
                  background: 'rgba(255,253,247,0.7)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                {/* Corner ornaments */}
                {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d={i === 0 ? "M1 1L1 5 M1 1L5 1" : i === 1 ? "M13 1L13 5 M13 1L9 1" :
                           i === 2 ? "M1 13L1 9 M1 13L5 13" : "M13 13L13 9 M13 13L9 13"}
                        stroke="rgba(212,175,55,0.4)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                ))}
                <p
                  className="font-garamond italic text-base md:text-lg"
                  style={{ color: '#5C3D2E', letterSpacing: '0.03em', lineHeight: 1.6 }}
                >
                  "We Look Forward To Celebrating With You"
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35))' }} />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: 'rgba(212,175,55,0.4)' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.35))' }} />
        </motion.div>

        {/* Quick Links & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {quickLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="font-cinzel text-[10px] tracking-[0.25em] uppercase"
                style={{ color: '#C9A9A6' }}
                whileHover={{ color: '#B08D57' }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Date badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255,253,247,0.7)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                fill="rgba(230,183,169,0.7)" />
            </svg>
            <span className="font-cinzel text-[10px] tracking-[0.2em]" style={{ color: '#B08D57' }}>
              23.07.2026
            </span>
          </div>
        </motion.div>

        {/* Bottom copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center mt-10 pt-6"
          style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
        >
          <p className="font-garamond  italic text-xs" style={{ color: 'rgba(9, 9, 9, 0.5)' }}>
            Crafted with love for a once-in-a-lifetime celebration
          </p>
        </motion.div>
      </div>

      {/* Bottom sparkle row */}
      <div className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(230,183,169,0.3), rgba(212,175,55,0.3), transparent)' }}
      />
    </footer>
  );
};

export default Footer;
