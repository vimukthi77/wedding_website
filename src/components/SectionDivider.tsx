'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'floral' | 'gold' | 'simple';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'floral' }) => {
  if (variant === 'simple') {
    return (
      <div className="flex items-center justify-center py-4 px-8">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3))' }} />
        <div className="mx-4 w-2 h-2 rotate-45" style={{ background: 'rgba(212,175,55,0.4)' }} />
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.3))' }} />
      </div>
    );
  }

  if (variant === 'gold') {
    return (
      <div className="flex items-center justify-center py-6 px-8 overflow-hidden">
        <motion.div
          className="flex items-center gap-3 w-full max-w-2xl"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
          {/* Gold ornament */}
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path d="M0 10 L25 10" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8"/>
            <path d="M35 10 L60 10" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8"/>
            <circle cx="30" cy="10" r="3" fill="rgba(212,175,55,0.5)"/>
            <polygon points="30,4 32,8 30,12 28,8" fill="rgba(212,175,55,0.4)"/>
            <circle cx="20" cy="10" r="1.5" fill="rgba(212,175,55,0.3)"/>
            <circle cx="40" cy="10" r="1.5" fill="rgba(212,175,55,0.3)"/>
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
        </motion.div>
      </div>
    );
  }

  // Floral variant
  return (
    <div className="relative flex items-center justify-center py-6 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="flex items-center gap-3 w-full max-w-3xl"
      >
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
        <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
          {/* Left flower */}
          <circle cx="20" cy="15" r="5" fill="rgba(248,231,231,0.7)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"/>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx={20 + 8 * Math.cos(deg * Math.PI / 180)}
              cy={15 + 8 * Math.sin(deg * Math.PI / 180)}
              rx="4"
              ry="2"
              fill="rgba(248,231,231,0.6)"
              stroke="rgba(212,175,55,0.2)"
              strokeWidth="0.3"
              transform={`rotate(${deg}, ${20 + 8 * Math.cos(deg * Math.PI / 180)}, ${15 + 8 * Math.sin(deg * Math.PI / 180)})`}
            />
          ))}
          <circle cx="20" cy="15" r="2.5" fill="rgba(212,175,55,0.5)"/>
          
          {/* Center ornament */}
          <path d="M50 15 L60 8 L70 15 L60 22 Z" fill="rgba(212,175,55,0.3)"/>
          <circle cx="60" cy="15" r="3" fill="rgba(212,175,55,0.5)"/>
          
          {/* Right flower */}
          <circle cx="100" cy="15" r="5" fill="rgba(232,215,185,0.7)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"/>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx={100 + 8 * Math.cos(deg * Math.PI / 180)}
              cy={15 + 8 * Math.sin(deg * Math.PI / 180)}
              rx="4"
              ry="2"
              fill="rgba(232,215,185,0.6)"
              stroke="rgba(212,175,55,0.2)"
              strokeWidth="0.3"
              transform={`rotate(${deg}, ${100 + 8 * Math.cos(deg * Math.PI / 180)}, ${15 + 8 * Math.sin(deg * Math.PI / 180)})`}
            />
          ))}
          <circle cx="100" cy="15" r="2.5" fill="rgba(212,175,55,0.5)"/>
          
          {/* Connecting lines */}
          <path d="M28 15 Q40 10 50 15" stroke="rgba(212,175,55,0.3)" strokeWidth="0.6" fill="none"/>
          <path d="M70 15 Q80 20 92 15" stroke="rgba(212,175,55,0.3)" strokeWidth="0.6" fill="none"/>
        </svg>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
