'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Couple', href: '#couple' },
  { label: 'Countdown', href: '#countdown' },
  { label: 'Details', href: '#details' },
  { label: 'Ceremony', href: '#poruwa' },
  { label: 'Location', href: '#location' },
  { label: 'RSVP', href: '#rsvp' },
];

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        style={{
          background: scrolled
            ? 'rgba(255,253,247,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => handleNav('#hero')}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
            >
              <span className="font-script text-2xl" style={{ color: '#D4AF37' }}>M</span>
              <span className="font-script text-lg" style={{ color: 'rgba(212,175,55,0.5)' }}>&amp;</span>
              <span className="font-script text-2xl" style={{ color: '#D4AF37' }}>S</span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="font-cinzel text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: scrolled ? '#B08D57' : 'rgba(122,62,72,0.8)' }}
                  whileHover={{ color: '#D4AF37' }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-5 h-px"
                  style={{ background: '#B08D57' }}
                  animate={mobileOpen ? {
                    rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                    y: i === 0 ? 6 : i === 2 ? -6 : 0,
                    opacity: i === 1 ? 0 : 1,
                  } : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(255,253,247,0.97)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {/* Monogram */}
              <div className="mb-4">
                <span className="font-script text-5xl" style={{ color: '#D4AF37' }}>M&S</span>
              </div>

              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="font-cinzel text-sm tracking-[0.3em] uppercase"
                  style={{ color: '#B08D57' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ color: '#7A3E48', scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(212,175,55,0.5)' }} />
                <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
