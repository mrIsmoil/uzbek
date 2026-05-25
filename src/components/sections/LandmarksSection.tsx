'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function ArchIcon({ type }: { type: 'arch' | 'fortress' | 'minaret' | 'corridor' }) {
  const icons = {
    arch: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M4 40 L4 20 Q4 8 12 8 Q20 8 20 20 L20 40" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5"/>
        <path d="M16 40 L16 20 Q16 10 24 10 Q32 10 32 20 L32 40" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.9"/>
        <path d="M28 40 L28 20 Q28 8 36 8 Q44 8 44 20 L44 40" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5"/>
        <line x1="0" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      </svg>
    ),
    fortress: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="28" width="40" height="14" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.7"/>
        <rect x="4"  y="22" width="7" height="10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <rect x="14" y="22" width="7" height="10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <rect x="27" y="22" width="7" height="10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <rect x="37" y="22" width="7" height="10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <line x1="0" y1="42" x2="48" y2="42" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      </svg>
    ),
    minaret: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M20 44 L20 18 L18 12 L24 4 L30 12 L28 18 L28 44" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.8"/>
        <line x1="17" y1="26" x2="31" y2="26" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
        <line x1="17" y1="32" x2="31" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
        <line x1="18" y1="38" x2="30" y2="38" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
        <line x1="0"  y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      </svg>
    ),
    corridor: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M8 44 L8 20 Q8 12 16 12 Q24 12 24 20 L24 44"  stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.8"/>
        <path d="M18 44 L18 24 Q18 16 24 16 Q30 16 30 24 L30 44" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M26 44 L26 28 Q26 22 31 22 Q36 22 36 28 L36 44" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <line x1="0" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      </svg>
    ),
  };
  return icons[type];
}

const landmarks = [
  {
    num: 'I',   name: 'Registon',     city: 'Samarqand', year: '1370–1660',
    tag: 'UNESCO', icon: 'arch'     as const,
    img: '/landmark-registon.jpg',
    desc: "Temuriylar me'morligining eng ulug'vor durdonasi — uchta madrasaning muhtasham ansamblida qolib ketasiz.",
  },
  {
    num: 'II',  name: "Ark Qal'asi",  city: 'Buxoro',    year: 'V Asr – Hozir',
    tag: 'UNESCO', icon: 'fortress' as const,
    img: '/landmark-ark.jpg',
    desc: "1500 yillik qo'rg'on-qal'a. Buxoro amirlarining azaliy makoni — shahar hayotining qoqidir.",
  },
  {
    num: 'III', name: "Ichan-Qal'a",  city: 'Xiva',      year: 'X Asr',
    tag: 'UNESCO', icon: 'minaret'  as const,
    img: '/landmark-ichan.jpg',
    desc: "Devor ichidagi butun shahar UNESCO ro'yxatiga kiritilgan — o'rta asr Markaziy Osiyosining jonli surati.",
  },
  {
    num: 'IV',  name: 'Shohizinda',   city: 'Samarqand', year: 'XI–XV Asr',
    tag: 'Tarix',  icon: 'corridor' as const,
    img: '/landmark-shohizinda.jpg',
    desc: "Maqbaralar yo'lagi — islom me'morlik san'atining nozik durdonalari. Ko'k va oq rang mozaikalari nafas oldiradi.",
  },
];

export default function LandmarksSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section
      ref={ref}
      data-section="3"
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center justify-start"
      style={{ background: '#000000' }}
    >
      {/* Yuqori chiziq */}
      <motion.div
        className="absolute top-0 left-16 right-16 h-[1px] origin-left"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">

        {/* ── Sarlavha — markazda ── */}
        <div className="text-center mb-16 w-full">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.9 }}
          >
            <div className="w-6 h-[1px]" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Me&apos;morlik Merosi
            </span>
            <div className="w-6 h-[1px]" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </motion.div>

          <motion.h2
            className="heading-section text-white"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={inView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 30, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Tarixiy
            <br />Manzillar
          </motion.h2>

          <motion.div
            className="h-[1px] w-16 mx-auto mt-8 origin-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>

        {/* ── 2×2 Kartalar tarmog'i ── */}
        <div
          className="grid grid-cols-2 gap-[1px] w-full mx-auto"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          {landmarks.map((lm, i) => (
            <motion.div
              key={lm.name}
              className="group relative flex flex-col items-center justify-center text-center min-h-[260px] p-8 cursor-default overflow-hidden"
              style={{ background: '#000000' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background rasm — tiniq */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                style={{ backgroundImage: `url(${lm.img})`, opacity: 0.5 }}
              />

              {/* Hover: rasm yanada yorqinlashadi */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.25] transition-opacity duration-700"
                style={{ backgroundImage: `url(${lm.img})` }}
              />

              {/* Qoraytirgich — yengil */}
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.48)' }} />
              <div
                className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                style={{ background: 'rgba(0,0,0,0.15)' }}
              />

              {/* Hover: yuqori oq chiziq */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] w-0 bg-white"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              />

              {/* Ikona */}
              <div className="relative z-10 mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <ArchIcon type={lm.icon} />
              </div>

              {/* Tag + shahar */}
              <div className="relative z-10 flex items-center justify-center gap-3 mb-3">
                <span
                  className="text-[0.44rem] tracking-[0.3em] uppercase border px-2 py-[3px]"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)' }}
                >
                  {lm.tag}
                </span>
                <span
                  className="text-[0.48rem] tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {lm.city} · {lm.year}
                </span>
              </div>

              {/* Nom */}
              <h3
                className="relative z-10 mb-3 text-white font-light"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {lm.name}
              </h3>

              {/* Tavsif */}
              <p
                className="relative z-10 text-[0.62rem] leading-relaxed max-w-[240px]"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {lm.desc}
              </p>

              {/* Roman raqam ornament */}
              <span
                className="absolute bottom-3 right-4 font-light leading-none pointer-events-none"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '2rem',
                  color: 'rgba(255,255,255,0.08)',
                  letterSpacing: '-0.04em',
                }}
              >
                {lm.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pastki chiziq */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      />
    </section>
  );
}
