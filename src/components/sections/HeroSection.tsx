'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* Har bir harf alohida animatsiyalanadi */
function AnimatedTitle({ text }: { text: string }) {
  const chars = text.split('');
  return (
    <span style={{ display: 'inline-block', perspective: '1000px' }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
          initial={{ opacity: 0, y: 80, rotateX: -75 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.6 + i * 0.045,
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* Nozik geometrik ornament (SVG) */
function HeroOrnament() {
  return (
    <svg width="2" height="80" viewBox="0 0 2 80" fill="none">
      <motion.line
        x1="1" y1="0" x2="1" y2="80"
        stroke="white"
        strokeWidth="1"
        opacity={0.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 2.2, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.55], [0, -80]);

  return (
    <section
      ref={ref}
      data-section="0"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Markaziy matn bloki */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center pointer-events-none px-6"
        style={{ opacity, y }}
      >
        {/* Ustki yorliq */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-6 h-[1px] bg-white opacity-20" />
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Markaziy Osiyo · 1991
          </span>
          <div className="w-6 h-[1px] bg-white opacity-20" />
        </motion.div>

        {/* Asosiy sarlavha — harfma-harf animatsiya */}
        <h1
          className="heading-display text-white leading-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          <AnimatedTitle text="O'ZBEKISTON" />
        </h1>

        {/* Taglik shior */}
        <motion.p
          className="mt-10 text-[0.68rem] tracking-[0.45em] uppercase font-light"
          style={{ color: '#ffffff' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          Bir xalq &nbsp;·&nbsp; Bir tarix &nbsp;·&nbsp; Bir kelajak
        </motion.p>
      </motion.div>

      {/* Pastdagi scroll ko'rsatkichi */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <HeroOrnament />
        <motion.div
          className="w-1 h-1 rounded-full bg-white opacity-35"
          animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Pastki nozik chiziq */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />
    </section>
  );
}
