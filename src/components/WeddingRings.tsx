'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WeddingRings: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 100 60"
        fill="none"
      >
        {/* Left ring */}
        <circle
          cx="35"
          cy="30"
          r="22"
          stroke="url(#goldGrad1)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right ring */}
        <circle
          cx="65"
          cy="30"
          r="22"
          stroke="url(#goldGrad2)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Diamond on left ring */}
        <polygon
          points="35,4 38,11 35,18 32,11"
          fill="url(#diamondGrad)"
          opacity="0.9"
        />
        {/* Diamond on right ring */}
        <polygon
          points="65,4 68,11 65,18 62,11"
          fill="url(#diamondGrad)"
          opacity="0.9"
        />
        {/* Sparkle on left diamond */}
        <motion.g
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <line x1="35" y1="0" x2="35" y2="4" stroke="rgba(212,175,55,0.8)" strokeWidth="1.5"/>
          <line x1="31" y1="2" x2="34" y2="4" stroke="rgba(212,175,55,0.6)" strokeWidth="1"/>
          <line x1="39" y1="2" x2="36" y2="4" stroke="rgba(212,175,55,0.6)" strokeWidth="1"/>
        </motion.g>
        {/* Sparkle on right diamond */}
        <motion.g
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        >
          <line x1="65" y1="0" x2="65" y2="4" stroke="rgba(212,175,55,0.8)" strokeWidth="1.5"/>
          <line x1="61" y1="2" x2="64" y2="4" stroke="rgba(212,175,55,0.6)" strokeWidth="1"/>
          <line x1="69" y1="2" x2="66" y2="4" stroke="rgba(212,175,55,0.6)" strokeWidth="1"/>
        </motion.g>
        {/* Shared area glow */}
        <ellipse
          cx="50"
          cy="30"
          rx="12"
          ry="15"
          fill="rgba(212,175,55,0.06)"
        />
        {/* Gradient defs */}
        <defs>
          <linearGradient id="goldGrad1" x1="13" y1="8" x2="57" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9"/>
            <stop offset="40%" stopColor="#F5E6A3" stopOpacity="1"/>
            <stop offset="70%" stopColor="#B08D57" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="goldGrad2" x1="43" y1="8" x2="87" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E6B7A9" stopOpacity="0.8"/>
            <stop offset="40%" stopColor="#D4AF37" stopOpacity="1"/>
            <stop offset="70%" stopColor="#F5E6A3" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="diamondGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5F5FF" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#E8DFF5" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default WeddingRings;
