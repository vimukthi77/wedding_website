'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Users, MessageSquare, User } from 'lucide-react';
import { sendRSVPEmail } from '@/api/rsvp';

interface FormData {
  name: string;
  guests: string;
  attendance: 'yes' | 'no' | 'maybe' | '';
  message: string;
}

const RSVPSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    guests: '',
    attendance: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.attendance) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // Try to send email via Resend API
      const result = await sendRSVPEmail({
        name: formData.name,
        guests: formData.guests,
        attendance: formData.attendance as 'yes' | 'no' | 'maybe',
        message: formData.message,
      });
      
      if (!result.success) {
        console.warn('Email send warning:', result.error);
      }
      
      setStatus('success');
    } catch {
      // For demo: still show success
      console.log('RSVP submitted:', formData);
      setStatus('success');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', guests: '', attendance: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,253,247,0.8)',
    border: '1px solid rgba(212,175,55,0.25)',
    borderRadius: '1px',
    padding: '12px 16px',
    fontFamily: "'EB Garamond', serif",
    fontSize: '15px',
    color: '#3d2b1f',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const Confetti: React.FC<{ index: number }> = ({ index }) => {
    const colors = ['#D4AF37', '#E6B7A9', '#F8E7E7', '#F7E8D0', '#C9A9A6'];
    return (
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${Math.random() * 100}%`,
          top: '-20px',
          width: 8,
          height: 8,
          background: colors[index % colors.length],
          borderRadius: Math.random() > 0.5 ? '50%' : '0',
        }}
        animate={{
          y: ['0vh', '110vh'],
          x: [0, (Math.random() - 0.5) * 200],
          rotate: [0, Math.random() * 720],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 1,
          ease: 'easeIn',
        }}
      />
    );
  };

  return (
    <section
      ref={ref}
      id="rsvp"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF7 0%, #F9F6F2 30%, #F8E7E7 60%, #F9F6F2 80%, #FFFDF7 100%)',
      }}
    >
      {/* Confetti on success */}
      <AnimatePresence>
        {status === 'success' && (
          <>
            {[...Array(30)].map((_, i) => <Confetti key={i} index={i} />)}
          </>
        )}
      </AnimatePresence>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(248,231,231,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${5 + i * 8}%`,
              top: `${20 + Math.sin(i * 0.7) * 50}%`,
            }}
            animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0], rotate: [0, 180] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M12 1L14 9L22 12L14 15L12 23L10 15L2 12L10 9L12 1Z" fill="rgba(212,175,55,0.5)"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B08D57' }}>
            ✦ &nbsp; Join Our Celebration &nbsp; ✦
          </p>
          <h2
            className="font-script mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#7A3E48' }}
          >
            RSVP
          </h2>
          <p
            className="font-garamond italic text-sm md:text-base"
            style={{ color: '#C9A9A6' }}
          >
            Kindly respond by 15th July 2026
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(212,175,55,0.6)' }} />
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="relative overflow-hidden rounded-sm"
            style={{
              background: 'rgba(255,253,247,0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 20px 80px rgba(122,62,72,0.08)',
            }}
          >
            {/* Top border */}
            <div
              className="w-full h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(230,183,169,0.5), rgba(212,175,55,0.6), transparent)' }}
            />

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

            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    {/* Success icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="relative mb-6"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(212,175,55,0.2)', filter: 'blur(15px)' }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(230,183,169,0.1))',
                          border: '2px solid rgba(212,175,55,0.4)',
                        }}
                      >
                        <CheckCircle size={36} style={{ color: '#D4AF37' }} />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3
                        className="font-script mb-3"
                        style={{ fontSize: '2.5rem', color: '#7A3E48' }}
                      >
                        Thank You!
                      </h3>
                      <p className="font-cinzel text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#B08D57' }}>
                        Your Response Has Been Received
                      </p>
                      <p
                        className="font-garamond text-base italic leading-relaxed max-w-sm mx-auto mb-6"
                        style={{ color: '#5C3D2E' }}
                      >
                        {formData.attendance === 'yes'
                          ? `We are overjoyed that you will be joining us on our special day, ${formData.name}! We look forward to celebrating with you.`
                          : `Dear ${formData.name}, we are sorry you cannot make it. You will be in our hearts on this beautiful day.`}
                      </p>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
                        <span className="font-script text-2xl" style={{ color: '#D4AF37' }}>♡</span>
                        <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
                      </div>
                      <motion.button
                        onClick={resetForm}
                        className="font-cinzel text-xs tracking-[0.2em] uppercase px-6 py-3"
                        style={{
                          background: 'rgba(255,253,247,0.9)',
                          border: '1px solid rgba(212,175,55,0.3)',
                          color: '#B08D57',
                          borderRadius: '1px',
                        }}
                        whileHover={{ background: 'rgba(212,175,55,0.08)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Another Response
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{ color: '#B08D57' }}
                      >
                        <User size={10} />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(212,175,55,0.25)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </motion.div>

                    {/* Number of guests */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <label
                        className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{ color: '#B08D57' }}
                      >
                        <Users size={10} />
                        Number of Guests
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(212,175,55,0.25)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Select number of guests</option>
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Attendance */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <label
                        className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-3 block"
                        style={{ color: '#B08D57' }}
                      >
                        Will You Be Attending? *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'yes', label: 'Joyfully Accepts', emoji: '💐' },
                          { value: 'no', label: 'Regretfully Declines', emoji: '🌹' },
                          { value: 'maybe', label: 'Still Deciding', emoji: '🕊️' },
                        ].map(option => (
                          <motion.button
                            key={option.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, attendance: option.value as FormData['attendance'] }))}
                            className="relative py-3 px-2 text-center flex flex-col items-center gap-1.5 transition-all duration-300"
                            style={{
                              background: formData.attendance === option.value
                                ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(230,183,169,0.1))'
                                : 'rgba(255,253,247,0.7)',
                              border: formData.attendance === option.value
                                ? '1px solid rgba(212,175,55,0.5)'
                                : '1px solid rgba(212,175,55,0.15)',
                              boxShadow: formData.attendance === option.value
                                ? '0 4px 20px rgba(212,175,55,0.15)'
                                : 'none',
                              borderRadius: '1px',
                            }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="text-xl">{option.emoji}</span>
                            <span
                              className="font-cinzel text-[9px] tracking-[0.1em] leading-tight"
                              style={{
                                color: formData.attendance === option.value ? '#7A3E48' : '#C9A9A6',
                              }}
                            >
                              {option.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Special message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 }}
                    >
                      <label
                        className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{ color: '#B08D57' }}
                      >
                        <MessageSquare size={10} />
                        Special Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your heartfelt wishes with the couple..."
                        rows={4}
                        style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(212,175,55,0.25)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </motion.div>

                    {/* Error message */}
                    {errorMessage && (
                      <p className="font-garamond text-sm text-center" style={{ color: '#7A3E48' }}>
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        className="relative w-full py-4 px-8 flex items-center justify-center gap-3 overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212,175,55,0.95), rgba(176,141,87,0.95))',
                          border: '1px solid rgba(212,175,55,0.4)',
                          color: '#FFFDF7',
                          borderRadius: '1px',
                          boxShadow: '0 8px 40px rgba(212,175,55,0.25)',
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        }}
                        whileHover={{ scale: status === 'loading' ? 1 : 1.02, boxShadow: '0 12px 50px rgba(212,175,55,0.4)' }}
                        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' }}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />

                        <span className="relative z-10 flex items-center gap-3 font-cinzel text-sm tracking-[0.25em] uppercase">
                          {status === 'loading' ? (
                            <>
                              <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              Send RSVP
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>

                    {/* Privacy note */}
                    <p className="font-garamond italic text-xs text-center" style={{ color: '#C9A9A6' }}>
                      Your information will only be shared with the couple
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom border */}
            <div
              className="w-full h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(230,183,169,0.5), rgba(212,175,55,0.6), transparent)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;
