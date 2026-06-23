'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const quotes = [
  { text: "Two hearts, one love", lang: "English" },
  { text: "23 July 2026", lang: "Date" },
  { text: "Hotel Sesatha · Matale", lang: "Venue" },
];

const LoveStoryBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F7E8D0 0%, #F8E7E7 50%, #F7E8D0 100%)',
      }}
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(230,183,169,0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Top and bottom borders */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }}
      />

      {/* Scrolling quote ticker */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...quotes, ...quotes, ...quotes, ...quotes].map((q, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path d="M12 2L14 9L21 9L15.5 13.5L17.5 20.5L12 16L6.5 20.5L8.5 13.5L3 9L10 9Z" fill="rgba(212,175,55,0.5)"/>
                </svg>
                <span
                  className="font-script text-xl"
                  style={{ color: '#7A3E48' }}
                >
                  {q.text}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Center hero text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 text-center mt-8 px-4"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <p className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase" style={{ color: '#B08D57' }}>
              Madushika
            </p>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                fill="rgba(230,183,169,0.8)"/>
            </svg>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <p className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase" style={{ color: '#B08D57' }}>
              Sachithra
            </p>
            <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveStoryBanner;
