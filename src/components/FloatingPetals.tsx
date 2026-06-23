'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  driftX: number;
  rotations: number;
}

const PETAL_COLORS = [
  'linear-gradient(135deg, #F8E7E7, #E6B7A9)',
  'linear-gradient(135deg, #F4C2C2, #F8E7E7)',
  'linear-gradient(135deg, #E8D7B9, #F7E8D0)',
  'linear-gradient(135deg, #F8E7E7, #C9A9A6)',
  'linear-gradient(135deg, #F9F6F2, #F8E7E7)',
];

const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Fewer petals on mobile for smoother performance
    const count = isMobile ? 8 : 15;
    const initialPetals: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: i * 0.6,
      duration: 8 + Math.random() * 6,
      size: 7 + Math.random() * 10,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      driftX: (Math.random() - 0.5) * 120,
      rotations: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360),
    }));
    setPetals(initialPetals);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.left}%`, top: '-30px' }}
          animate={{
            y: ['0px', '110vh'],
            x: [0, petal.driftX / 2, petal.driftX, petal.driftX / 2, 0],
            rotate: [0, petal.rotations],
            opacity: [0, 0.6, 0.5, 0.4, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: Math.random() * 5,
          }}
        >
          <div
            className="petal"
            style={{
              width: petal.size,
              height: petal.size * 1.35,
              background: petal.color,
              filter: 'blur(0.3px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;
