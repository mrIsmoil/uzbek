'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const facts = [
  { label: 'Joylashuv',           val: 'Markaziy Osiyo',      note: "Osiyo qit'asining aynan markazida" },
  { label: "Qo'shni davlatlar",   val: '5 davlat',            note: "Qozog'iston, Qirg'iziston, Tojikiston, Afg'oniston, Turkmaniston" },
  { label: 'Yirik daryolar',      val: 'Amudaryo · Sirdaryo', note: "Ipak Yo'li sivilizatsiyasini asrlar boyi ta'minlagan" },
  { label: 'Poytaxt',             val: 'Toshkent',            note: "2200 yillik tarix, 2,5 mln aholli zamonaviy metropolis" },
];

export default function IdentitySection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.12 });

  return (
    <section
      ref={ref}
      data-section="2"
      className="relative min-h-screen flex items-center py-28 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* ── FULL BACKGROUND: Bayroq videosi ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        >
          <source src="/uzbekistan-flag.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Qoraytirgich overlay — o'qilish uchun */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0,0,0,0.55)' }} />

      {/* Chap qorayish — matn tomoni aniqroq ko'rinsin */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg,' +
            'rgba(0,0,0,0.82) 0%,' +
            'rgba(0,0,0,0.6) 35%,' +
            'rgba(0,0,0,0.2) 65%,' +
            'rgba(0,0,0,0.0) 100%)',
        }}
      />

      {/* Yuqori / pastki so'nish */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom,' +
            'rgba(0,0,0,0.7) 0%, transparent 18%,' +
            'transparent 80%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ── KONTENT ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">

        {/* Yorliq */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.9 }}
        >
          <div className="w-6 h-[1px]" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Geografiya
          </span>
          <div className="w-6 h-[1px]" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </motion.div>

        {/* Sarlavha */}
        <motion.h2
          className="heading-section mb-8 text-white"
          initial={{ opacity: 0, y: 35, filter: 'blur(12px)' }}
          animate={inView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 35, filter: 'blur(12px)' }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Markaziy
          <br />Osiyo Yuragi
        </motion.h2>

        {/* Ajratuvchi chiziq */}
        <motion.div
          className="mb-8 h-[1px] w-16 mx-auto"
          style={{ background: 'rgba(255,255,255,0.25)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        />

        {/* Tavsif */}
        <motion.p
          className="mb-14 max-w-lg text-sm leading-relaxed mx-auto"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Ming yillik tarixga ega mintaqa — Sharq va G&apos;arbni tutashtirgan
          Buyuk Ipak Yo&apos;li chorrahasi. Ilm-fan, savdo va madaniyatning azaliy markazi.
        </motion.p>

        {/* Faktlar */}
        <div
          className="w-full max-w-xl mx-auto divide-y"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              className="py-5 grid grid-cols-[1fr_auto] items-start gap-4"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.8, delay: 0.55 + i * 0.1 }}
              style={{ borderColor: 'rgba(255,255,255,0.10)' }}
            >
              <div>
                <span
                  className="text-[0.5rem] tracking-[0.38em] uppercase block mb-2 font-medium"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                >
                  {f.label}
                </span>
                <span
                  className="block mb-1.5 text-white font-light"
                  style={{ fontSize: '0.92rem', letterSpacing: '0.01em' }}
                >
                  {f.val}
                </span>
                <span
                  className="text-[0.6rem] leading-relaxed block"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {f.note}
                </span>
              </div>
              <span
                className="text-[0.48rem] tracking-[0.3em] uppercase mt-1"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
