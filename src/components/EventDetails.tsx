'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, MapPin, Sunrise } from 'lucide-react';

const DetailCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  main: string;
  sub?: string;
  delay: number;
  inView: boolean;
  color?: string;
}> = ({ icon, title, main, sub, delay, inView, color = '#7A3E48' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(212,175,55,0.15)' }}
    className="relative group"
    style={{ transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
  >
    <div
      className="relative overflow-hidden rounded-sm p-6 md:p-8 flex flex-col items-center text-center h-full"
      style={{
        background: 'rgba(255,253,247,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,175,55,0.2)',
        boxShadow: '0 8px 40px rgba(122,62,72,0.06), 0 2px 10px rgba(212,175,55,0.05)',
      }}
    >
      {/* Background shimmer on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.04) 0%, rgba(230,183,169,0.04) 100%)',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 opacity-50">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1L1 7 M1 1L7 1" stroke="rgba(212,175,55,0.7)" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute top-3 right-3 opacity-50">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15 1L15 7 M15 1L9 1" stroke="rgba(212,175,55,0.7)" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 opacity-50">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 15L1 9 M1 15L7 15" stroke="rgba(212,175,55,0.7)" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute bottom-3 right-3 opacity-50">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15 15L15 9 M15 15L9 15" stroke="rgba(212,175,55,0.7)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Icon container */}
      <motion.div
        className="relative mb-4 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(230,183,169,0.1))',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: 'rgba(212,175,55,0.3)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay }}
        />
        <span style={{ color: '#D4AF37' }}>{icon}</span>
      </motion.div>

      {/* Title */}
      <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#B08D57' }}>
        {title}
      </p>

      {/* Gold separator */}
      <div className="flex items-center gap-1 mb-3">
        <div className="h-px w-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
        <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(212,175,55,0.5)' }} />
        <div className="h-px w-6" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
      </div>

      {/* Main text */}
      <h3
        className="font-display-luxury font-medium mb-2"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color,
          lineHeight: 1.2,
        }}
      >
        {main}
      </h3>

      {/* Sub text */}
      {sub && (
        <p className="font-garamond italic text-sm" style={{ color: '#C9A9A6' }}>
          {sub}
        </p>
      )}
    </div>
  </motion.div>
);

const ScheduleItem: React.FC<{
  time: string;
  event: string;
  isHighlight?: boolean;
  delay: number;
  inView: boolean;
}> = ({ time, event, isHighlight = false, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay }}
    className="flex items-center gap-3 py-3 border-b last:border-0"
    style={{ borderColor: 'rgba(212,175,55,0.15)' }}
  >
    {/* Time indicator */}
    <div className="flex-shrink-0 flex items-center gap-2">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{
          background: isHighlight
            ? 'linear-gradient(135deg, #D4AF37, #B08D57)'
            : 'rgba(212,175,55,0.4)',
          boxShadow: isHighlight ? '0 0 8px rgba(212,175,55,0.5)' : 'none',
        }}
      />
      <span
        className="font-cinzel text-xs md:text-sm font-medium whitespace-nowrap min-w-[74px] md:min-w-[110px]"
        style={{ color: isHighlight ? '#B08D57' : '#C9A9A6' }}
      >
        {time}
      </span>
    </div>

    {/* Dashed line (hidden on small screens to save room) */}
    <div className="hidden sm:block flex-1 h-px border-t border-dashed" style={{ borderColor: 'rgba(212,175,55,0.2)' }} />

    {/* Event */}
    <span
      className={`font-garamond text-sm md:text-base ml-auto text-right ${isHighlight ? 'font-medium' : ''}`}
      style={{ color: isHighlight ? '#7A3E48' : '#5C3D2E' }}
    >
      {isHighlight && <span className="mr-1" style={{ color: '#D4AF37' }}>✦</span>}
      {event}
    </span>
  </motion.div>
);

const EventDetails: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const schedule = [
    { time: '09:00 AM', event: 'Guests Arrival', isHighlight: false },
    { time: '09:30 AM', event: 'Auspicious Time Begins', isHighlight: false },
    { time: '10:05 AM', event: 'Poruwa Ceremony', isHighlight: true },
    { time: '11:00 AM', event: 'Traditional Rituals', isHighlight: false },
    { time: '12:00 PM', event: 'Lunch Reception', isHighlight: false },
    { time: '01:00 PM', event: 'Photo Session', isHighlight: false },
    { time: '04:00 PM', event: 'Celebration Ends', isHighlight: false },
  ];

  return (
    <section
      ref={ref}
      id="details"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #F9F6F2 50%, #FFFDF7 100%)' }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-64 h-64"
          style={{
            background: 'radial-gradient(circle, rgba(248,231,231,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64"
          style={{
            background: 'radial-gradient(circle, rgba(232,215,185,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating petals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none petal"
          style={{
            width: 10,
            height: 14,
            background: 'linear-gradient(135deg, #F8E7E7, #E6B7A9)',
            left: `${10 + i * 11}%`,
            top: -20,
          }}
          animate={{
            y: ['0px', '100vh'],
            rotate: [0, 720],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + i * 0.5,
            delay: i * 1.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B08D57' }}>
            ✦ &nbsp; The Celebration &nbsp; ✦
          </p>
          <h2
            className="font-script mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#7A3E48' }}
          >
            Event Details
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12 2L14 9L21 9L15.5 13.5L17.5 20.5L12 16L6.5 20.5L8.5 13.5L3 9L10 9Z" fill="rgba(212,175,55,0.6)"/>
            </svg>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          <DetailCard
            icon={<Calendar size={20} />}
            title="Wedding Date"
            main="Thursday, 23rd July 2026"
            sub="A day to remember forever"
            delay={0.1}
            inView={inView}
          />
          <DetailCard
            icon={<Clock size={20} />}
            title="Ceremony Time"
            main="09:00 AM — 04:00 PM"
            sub="Reception all afternoon"
            delay={0.2}
            inView={inView}
          />
          <DetailCard
            icon={<Sunrise size={20} />}
            title="Poruwa Ceremony"
            main="10:05 AM"
            sub="Auspicious commencement"
            delay={0.3}
            inView={inView}
            color="#7A3E48"
          />
          <DetailCard
            icon={<MapPin size={20} />}
            title="Venue"
            main="Hotel Sesatha"
            sub="Matale, Sri Lanka"
            delay={0.4}
            inView={inView}
          />
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <div
            className="relative overflow-hidden rounded-sm p-6 md:p-10"
            style={{
              background: 'rgba(255,253,247,0.9)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 10px 50px rgba(122,62,72,0.06)',
            }}
          >
            {/* Corner ornaments */}
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
              <div key={i} className={`absolute ${pos}`} style={{ opacity: 0.5 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d={i === 0 ? "M2 2L2 8 M2 2L8 2" :
                       i === 1 ? "M18 2L18 8 M18 2L12 2" :
                       i === 2 ? "M2 18L2 12 M2 18L8 18" :
                       "M18 18L18 12 M18 18L12 18"}
                    stroke="rgba(212,175,55,0.7)"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            ))}

            <h3
              className="font-cinzel text-center text-sm tracking-[0.25em] uppercase mb-6"
              style={{ color: '#B08D57' }}
            >
              Day Schedule
            </h3>

            <div className="space-y-1">
              {schedule.map((item, i) => (
                <ScheduleItem
                  key={i}
                  time={item.time}
                  event={item.event}
                  isHighlight={item.isHighlight}
                  delay={0.6 + i * 0.1}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
