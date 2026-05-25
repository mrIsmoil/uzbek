'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

function TraditionIcon({ type }: {
  type: 'silk' | 'pottery' | 'miniature' | 'music' | 'embroidery' | 'calligraphy'
}) {
  const icons = {
    silk: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M2 16 Q8 4 16 16 Q24 28 30 16" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8"/>
        <path d="M2 20 Q8 8 16 20 Q24 32 30 20" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.4"/>
      </svg>
    ),
    pottery: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M11 4 Q8 8 8 14 Q8 26 16 28 Q24 26 24 14 Q24 8 21 4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8"/>
        <line x1="9" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
        <circle cx="16" cy="28" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5"/>
      </svg>
    ),
    miniature: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8"/>
        <rect x="8" y="8" width="16" height="16" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.4"/>
        <rect x="12" y="12" width="8" height="8" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
      </svg>
    ),
    music: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M2 16 Q5 8 8 16 Q11 24 14 16 Q17 8 20 16 Q23 24 26 16 Q29 8 30 16"
          stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8"/>
        <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="0.4" opacity="0.25"/>
      </svg>
    ),
    embroidery: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
        <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
        <line x1="6" y1="6" x2="26" y2="26" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="26" y1="6" x2="6" y2="26" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.7"/>
        <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    calligraphy: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M4 24 Q10 4 20 12 Q28 18 28 8" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8" strokeLinecap="round"/>
        <path d="M8 28 Q14 20 22 26" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
        <circle cx="28" cy="8" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  };
  return icons[type];
}

const traditions = [
  { icon: 'silk'        as const, title: 'Ipakchilik',     year: 'III Asr',  img: '/ipakchilik.jpg',
    desc: "Asrlar davomida o'zbek ustalari dunyodagi eng nafis ipak matolarni yaratib kelishgan. Har bir naqsh — bir tarix." },
  { icon: 'pottery'     as const, title: 'Kulolchilik',    year: 'IX Asr',   img: '/kulolchilik.jpg',
    desc: "Rishton va G'ijduvonning moviy keramika an'analari san'at va hayotning mukammal uyg'unligini ifodalaydi." },
  { icon: 'miniature'   as const, title: 'Miniatyura',     year: 'XV Asr',   img: '/miniatyura.jpg',
    desc: "Buxoro va Samarqandning miniatyura maktablari butun islom dunyosi san'atiga ta'sir ko'rsatgan." },
  { icon: 'music'       as const, title: 'Musiqa va Raqs', year: 'Qadim',    img: '/musiqa-va-raqs.jpg',
    desc: "Dutor va rubobning sehrli sadolari hamda an'anaviy raqs Markaziy Osiyoga xos betakror ruhni yaratadi." },
  { icon: 'embroidery'  as const, title: 'Kashtachilik',   year: 'XVIII Asr',img: '/kashtachilik.jpg',
    desc: "So'zana — osmon jismlari va tabiat naqshlarini mujassam etgan, o'zbek ayollarining mehnati va orzusi." },
  { icon: 'calligraphy' as const, title: 'Xattotlik',      year: 'VII Asr',  img: '/xattotlik.jpg',
    desc: "Masjid devorlarida sof tasviriy she'riyatga aylangan arab yozuvi — matematika va go'zallik uyg'unligi." },
];

const wrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardV: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function CultureSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section
      ref={ref}
      data-section="4"
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center"
      style={{ background: '#000000' }}
    >
      {/* Yuqori chiziq */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] origin-left"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">

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
              Madaniyat · San&apos;at
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
            Jonli
            <br />Meros
          </motion.h2>

          <motion.div
            className="h-[1px] w-16 mx-auto mt-8"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* ── 3×2 Kartalar tarmog'i ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full"
          style={{ background: 'transparent' }}
          variants={wrap}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {traditions.map((t, i) => (
            <motion.div
              key={t.title}
              className="group relative flex flex-col justify-between min-h-[240px] p-8 cursor-default overflow-hidden"
              style={{ background: '#000000' }}
              variants={cardV}
            >
              {/* Background rasm */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${t.img})`, opacity: 0.45 }}
              />
              {/* Qoraytirgich */}
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.52)' }} />
              {/* Hover: rasm yorqinlashadi, overlay yengillashadi */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(0,0,0,0.18)' }} />

              {/* Hover: yuqori oq chiziq */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] w-0 bg-white z-20"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              />

              {/* Ikonka + yil */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="text-white">
                  <TraditionIcon type={t.icon} />
                </div>
                <span
                  className="text-[0.48rem] tracking-[0.32em] uppercase font-medium"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {t.year}
                </span>
              </div>

              {/* Nom + ajratgich + tavsif */}
              <div className="relative z-10">
                <div
                  className="w-6 h-[1px] mb-4"
                  style={{ background: 'rgba(255,255,255,0.35)' }}
                />
                <h3
                  className="mb-3 font-light text-white"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-[0.63rem] leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {t.desc}
                </p>
              </div>

              {/* Tartib raqami — ornament */}
              <span
                className="absolute bottom-4 right-5 font-light pointer-events-none"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '2.5rem',
                  color: 'rgba(255,255,255,0.07)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pastki chiziq */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      />
    </section>
  );
}
