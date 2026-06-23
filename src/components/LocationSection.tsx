'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const VENUE_LAT = 7.4675;
const VENUE_LNG = 80.6234;
const MAPS_URL = `https://www.google.com/maps/search/Hotel+Sesatha+Matale+Sri+Lanka`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=Hotel+Sesatha+Matale+Sri+Lanka`;

const LocationSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="location"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF7 0%, #F8E7E7 30%, #F7E8D0 60%, #FFFDF7 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: '10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(232,215,185,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            bottom: '10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(248,231,231,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B08D57' }}>
            ✦ &nbsp; Find Us &nbsp; ✦
          </p>
          <h2
            className="font-script mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#7A3E48' }}
          >
            Venue & Location
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <MapPin size={16} style={{ color: 'rgba(212,175,55,0.7)' }} />
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Venue Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div
              className="relative overflow-hidden rounded-sm h-full"
              style={{
                background: 'rgba(255,253,247,0.9)',
                border: '1px solid rgba(212,175,55,0.2)',
                boxShadow: '0 10px 50px rgba(122,62,72,0.07)',
              }}
            >
              {/* Corner ornaments */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                <div key={i} className={`absolute ${pos}`}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d={i === 0 ? "M2 2L2 7 M2 2L7 2" : i === 1 ? "M16 2L16 7 M16 2L11 2" :
                         i === 2 ? "M2 16L2 11 M2 16L7 16" : "M16 16L16 11 M16 16L11 16"}
                      stroke="rgba(212,175,55,0.5)"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
              ))}

              <div className="p-8">
                {/* Venue image */}
                <motion.div
                  className="relative overflow-hidden rounded-sm mb-6"
                  style={{
                    height: 200,
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/images/venue-hotel.jpg"
                    alt="Hotel Sesatha, Matale"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ filter: 'brightness(1.05) saturate(1.1)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(122,62,72,0.3) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="font-cinzel text-xs tracking-[0.2em]" style={{ color: 'rgba(255,253,247,0.9)' }}>
                      Hotel Sesatha
                    </span>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h3
                      className="font-display-luxury font-medium mb-1"
                      style={{ fontSize: '1.5rem', color: '#7A3E48' }}
                    >
                      Hotel Sesatha
                    </h3>
                    <p className="font-garamond italic text-sm" style={{ color: '#C9A9A6' }}>
                      Matale, Sri Lanka
                    </p>
                  </div>

                  <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.3), transparent)' }} />

                  {/* Details */}
                  <div className="space-y-3">
                    {[
                      {
                        icon: <MapPin size={14} />,
                        label: 'Address',
                        value: 'Matale, Central Province, Sri Lanka',
                      },
                      {
                        icon: <Clock14 />,
                        label: 'Event Time',
                        value: '09:00 AM — 04:00 PM',
                      },
                      {
                        icon: <Navigation size={14} />,
                        label: 'Poruwa',
                        value: '10:05 AM — Auspicious Ceremony',
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            background: 'rgba(212,175,55,0.1)',
                            border: '1px solid rgba(212,175,55,0.25)',
                            color: '#D4AF37',
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-cinzel text-[9px] tracking-[0.2em] uppercase mb-0.5" style={{ color: '#B08D57' }}>
                            {item.label}
                          </p>
                          <p className="font-garamond text-sm" style={{ color: '#5C3D2E' }}>
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.3), transparent)' }} />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-center font-cinzel text-xs tracking-[0.2em] uppercase"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(176,141,87,0.9))',
                        color: '#FFFDF7',
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: '1px',
                        boxShadow: '0 4px 20px rgba(212,175,55,0.2)',
                      }}
                      whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(212,175,55,0.35)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={12} />
                      Open Maps
                    </motion.a>
                    <motion.a
                      href={DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-center font-cinzel text-xs tracking-[0.2em] uppercase"
                      style={{
                        background: 'rgba(255,253,247,0.9)',
                        color: '#B08D57',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: '1px',
                      }}
                      whileHover={{ scale: 1.03, background: 'rgba(212,175,55,0.08)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Navigation size={12} />
                      Directions
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                border: '1px solid rgba(212,175,55,0.25)',
                boxShadow: '0 10px 50px rgba(122,62,72,0.07)',
              }}
            >
              {/* Map frame header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  background: 'rgba(255,253,247,0.95)',
                  borderBottom: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: '#D4AF37' }} />
                  <span className="font-cinzel text-xs tracking-[0.2em] uppercase" style={{ color: '#B08D57' }}>
                    Hotel Sesatha, Matale
                  </span>
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'rgba(212,175,55,0.8)' }}
                />
              </div>

              {/* Embedded map */}
              <div className="relative" style={{ height: 400 }}>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31675.48!2d${VENUE_LNG}!3d${VENUE_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33e20847f8d7b%3A0x7f2bc5c9c3b10cf0!2sMatale%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1`}
                  width="100%"
                  height="400"
                  style={{ border: 0, filter: 'saturate(0.9) brightness(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Sesatha Location Map"
                />
                {/* Map overlay for luxury feel */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 80%, rgba(255,253,247,0.3) 100%)',
                  }}
                />
              </div>

              {/* Map footer */}
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{
                  background: 'rgba(255,253,247,0.95)',
                  borderTop: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                <p className="font-garamond italic text-xs" style={{ color: '#C9A9A6' }}>
                  Matale, Central Province, Sri Lanka
                </p>
                <motion.a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-cinzel text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: '#B08D57' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Navigation size={10} />
                  Get Directions
                </motion.a>
              </div>
            </div>

            {/* Extra info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-4 p-4 rounded-sm"
              style={{
                background: 'rgba(255,253,247,0.8)',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
            >
              <p className="font-garamond text-sm text-center" style={{ color: '#5C3D2E' }}>
                <span style={{ color: '#D4AF37' }}>✦</span>
                &nbsp; We kindly request guests to arrive by <strong>09:00 AM</strong> to be seated before the auspicious Poruwa Ceremony commences. &nbsp;
                <span style={{ color: '#D4AF37' }}>✦</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Small clock icon component
const Clock14: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default LocationSection;
