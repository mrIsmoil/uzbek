'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


export default function FinalSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section
      ref={ref}
      data-section="6"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* ── Markaziy radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Pastki naqsh ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '55%',
          backgroundImage: 'url(/naqsh.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0,
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.8) 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.8) 70%, transparent 100%)',
        }}
        animate={inView ? { opacity: 0.45 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
      />

      {/* ── Vertikal dekorativ chiziqlar ── */}
      {[-42, -21, 0, 21, 42].map((x, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-[1px] pointer-events-none"
          style={{ left: `calc(50% + ${x * 1.4}vw)`, background: 'rgba(255,255,255,0.025)' }}
          initial={{ scaleY: 0, originY: 0.5 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* ── Yuqori corner ornamentlar ── */}
      <motion.div
        className="absolute top-10 left-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <svg width="40" height="40" fill="none">
          <path d="M0 40 L0 0 L40 0" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg width="40" height="40" fill="none">
          <path d="M40 40 L40 0 L0 0" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <svg width="40" height="40" fill="none">
          <path d="M0 0 L0 40 L40 40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <svg width="40" height="40" fill="none">
          <path d="M40 0 L40 40 L0 40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        </svg>
      </motion.div>

      {/* ── Asosiy kontent ── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center">

        {/* Yorliq */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="w-8 h-[1px]" style={{ background: 'rgba(255,255,255,0.18)' }} />
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Kelajak Sari
          </span>
          <div className="w-8 h-[1px]" style={{ background: 'rgba(255,255,255,0.18)' }} />
        </motion.div>

        {/* Asosiy sarlavha */}
        <div style={{ perspective: '1200px' }} className="mb-10">
          {["Sharqning", 'Oltin', "Durdonasi"].map((line, i) => (
            <motion.div
              key={i}
              style={{ display: 'block', transformOrigin: '50% 100%' }}
              initial={{ opacity: 0, y: 56, rotateX: -45 }}
              animate={inView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 56, rotateX: -45 }}
              transition={{ duration: 1.3, delay: 0.4 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="heading-section leading-tight block"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '-0.03em',
                  color: i === 1 ? 'rgba(255,255,255,0.2)' : '#ffffff',
                }}
              >
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Ornament */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          <div className="w-12 h-[1px]" style={{ background: 'rgba(255,255,255,0.14)' }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <polygon points="5,0 10,5 5,10 0,5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none"/>
          </svg>
          <div className="w-12 h-[1px]" style={{ background: 'rgba(255,255,255,0.14)' }} />
        </motion.div>

        {/* Tavsif */}
        <motion.p
          className="text-sm leading-relaxed max-w-sm mb-14"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          O&apos;zbekiston har doim sivilizatsiyalar chorrahasi bo&apos;lgan —
          o&apos;zining bebaho madaniyati va mehmondo&apos;stligini dunyo bilan baham ko&apos;rishga tayyor.
        </motion.p>

        {/* CTA tugma */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: 1.55 }}
        >
          <button
            className="group inline-flex items-center gap-5 cursor-pointer"
            style={{ background: 'none', border: 'none' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Chap chiziq — hover da uzayadi */}
            <span
              className="block h-[1px] w-8 group-hover:w-16 transition-all duration-500"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />

            {/* Matn + ustki chiziq hover da chiqadi */}
            <span className="relative">
              <span
                className="text-[0.58rem] tracking-[0.38em] uppercase font-medium group-hover:text-white transition-colors duration-400"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                Boshiga Qaytish
              </span>
              {/* Pastki underline hover da chiqadi */}
              <span
                className="absolute -bottom-1.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.5)' }}
              />
            </span>

            {/* O'ng chiziq — hover da uzayadi */}
            <span
              className="block h-[1px] w-8 group-hover:w-16 transition-all duration-500"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />
          </button>
        </motion.div>

      </div>

      {/* Footer yozuvi */}
      <motion.p
        className="absolute bottom-8 text-[0.48rem] tracking-[0.3em] uppercase"
        style={{ color: 'rgba(255,255,255,0.1)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        O&apos;zbekiston zaminiga, xalqiga va ruhiga bag&apos;ishlanadi
      </motion.p>
    </section>
  );
}
