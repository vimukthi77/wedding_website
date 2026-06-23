'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const WEDDING_DATE = new Date('2026-07-23T09:00:00');

interface TimeUnit {
  value: number;
  label: string;
}

const useCountdown = (targetDate: Date): TimeUnit[] => {
  const getTimeLeft = () => {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) return [
      { value: 0, label: 'Days' },
      { value: 0, label: 'Hours' },
      { value: 0, label: 'Minutes' },
      { value: 0, label: 'Seconds' },
    ];
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return [
      { value: days, label: 'Days' },
      { value: hours, label: 'Hours' },
      { value: minutes, label: 'Minutes' },
      { value: seconds, label: 'Seconds' },
    ];
  };

  const [time, setTime] = useState<TimeUnit[]>(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
};

const CountdownCard: React.FC<{ value: number; label: string; delay: number; inView: boolean }> = ({
  value, label, delay, inView,
}) => {
  const prev = useRef(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
      prev.current = value;
    }
  }, [value]);

  const displayValue = String(value).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center"
    >
      {/* Card */}
      <motion.div
        className="relative"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(230,183,169,0.2), rgba(212,175,55,0.3))',
            filter: 'blur(8px)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />

        {/* Glass card */}
        <div
          className="relative w-[68px] h-[68px] sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'rgba(255,253,247,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 8px 40px rgba(212,175,55,0.1), 0 2px 10px rgba(122,62,72,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          {/* Inner shimmer */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)',
            }}
          />

          {/* Gold corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L1 5 M1 1L5 1" stroke="rgba(212,175,55,0.5)" strokeWidth="1"/>
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-3 h-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M11 1L11 5 M11 1L7 1" stroke="rgba(212,175,55,0.5)" strokeWidth="1"/>
            </svg>
          </div>
          <div className="absolute bottom-2 left-2 w-3 h-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L1 7 M1 11L5 11" stroke="rgba(212,175,55,0.5)" strokeWidth="1"/>
            </svg>
          </div>
          <div className="absolute bottom-2 right-2 w-3 h-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M11 11L11 7 M11 11L7 11" stroke="rgba(212,175,55,0.5)" strokeWidth="1"/>
            </svg>
          </div>

          {/* Number */}
          <div className="relative overflow-hidden h-8 sm:h-10 flex items-center justify-center">
            <motion.span
              key={displayValue}
              initial={{ y: animate ? -30 : 0, opacity: animate ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="font-serif-luxury font-light text-2xl sm:text-4xl"
              style={{ color: '#7A3E48' }}
            >
              {displayValue}
            </motion.span>
          </div>

          {/* Separator line */}
          <div className="w-8 h-px mt-1 mb-1" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)' }} />
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.4 }}
        className="mt-3 font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase"
        style={{ color: '#B08D57' }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const CountdownSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const timeUnits = useCountdown(WEDDING_DATE);

  return (
    <section
      ref={ref}
      id="countdown"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF7 0%, #F8E7E7 30%, #F7E8D0 60%, #F8E7E7 80%, #FFFDF7 100%)',
      }}
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(230,183,169,0.15) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Orbiting elements */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: 500,
            height: 500,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: 'rgba(212,175,55,0.1)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{ top: '2px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(212,175,55,0.4)' }}
          />
        </motion.div>
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: 700,
            height: 700,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: 'rgba(230,183,169,0.08)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + (i / 12) * 80}%`,
            top: `${20 + Math.sin(i) * 40}%`,
          }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0], rotate: [0, 180] }}
          transition={{
            duration: 2.5,
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path d="M12 1L14 9L22 12L14 15L12 23L10 15L2 12L10 9L12 1Z" fill="rgba(212,175,55,0.6)"/>
          </svg>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B08D57' }}>
            ✦ &nbsp; Counting Down &nbsp; ✦
          </p>
          <h2
            className="font-script mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#7A3E48' }}
          >
            Until We Say I Do
          </h2>
          <p
            className="font-garamond italic text-sm md:text-base"
            style={{ color: '#C9A9A6' }}
          >
            23 July 2026 &nbsp;·&nbsp; Hotel Sesatha, Matale
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(212,175,55,0.6)' }} />
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </motion.div>

        {/* Countdown Cards */}
        <div className="flex items-start justify-center gap-2.5 sm:gap-6 md:gap-8">
          {timeUnits.map((unit, i) => (
            <React.Fragment key={unit.label}>
              <CountdownCard
                value={unit.value}
                label={unit.label}
                delay={0.1 + i * 0.15}
                inView={inView}
              />
              {i < timeUnits.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="hidden sm:flex flex-col gap-2 mt-6"
                >
                  <motion.span
                    className="font-script text-2xl"
                    style={{ color: 'rgba(212,175,55,0.7)' }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    :
                  </motion.span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Decorative bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-14"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(255,253,247,0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="rgba(230,183,169,0.7)"/>
            </svg>
            <p className="font-cinzel text-xs tracking-[0.2em]" style={{ color: '#B08D57' }}>
              Save The Date
            </p>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="rgba(230,183,169,0.7)"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;
