'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  {
    year: '329',    era: 'Mil. Avv.',
    title: 'Aleksandrning Kelishi',
    desc: "Makedoniyalik Aleksandr Maroqandni egallab, Sharq va G'arb o'rtasidagi asrlik madaniy almashinuvni boshlab berdi.",
    align: 'left' as const,
  },
  {
    year: 'VI–VII', era: 'Asrlar',
    title: "Ipak Yo'lining Oltin Davri",
    desc: "Buxoro, Samarqand va Toshkent Buyuk Ipak yo'lining eng muhim bekatlariga aylanib, savdo, ilm va san'at markazlariga aylandi.",
    align: 'right' as const,
  },
  {
    year: 'IX–X',   era: 'Asrlar',
    title: "Islom Uyg'onish Davri",
    desc: "Al-Xorazmiy (algebra yaratuvchisi), Al-Beruniy va Ibn Sino — bu zamindan chiqqan allomalar matematika va tibbiyotni abadiy o'zgartirdi.",
    align: 'left' as const,
  },
  {
    year: 'XIV',    era: 'Asr',
    title: 'Temuriylar Imperiyasi',
    desc: "Amir Temur Samarqanddan turib ulkan imperiyasini qurdi. Registon, Bibixonim masjidi — me'morlik mo'jizalari.",
    align: 'right' as const,
  },
  {
    year: 'XV',     era: 'Asr',
    title: "Ulug'bek Rasadxonasi",
    desc: "Temurning nabirasi Ulug'bek 1000 dan ortiq yulduz xaritasini tuzdi — zamonasining eng yirik rasadxonasidan.",
    align: 'left' as const,
  },
  {
    year: '1991',   era: '',
    title: "Mustaqil O'zbekiston",
    desc: "Suveren davlat sifatida yangi davr boshlandi. Qadimiy an'analar zamonaviy maqsadlar bilan uyg'unlashdi.",
    align: 'right' as const,
  },
];

export default function HistorySection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.08 });

  return (
    <section
      ref={ref}
      data-section="5"
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center"
      style={{ background: '#000000', isolation: 'isolate' }}
    >
      {/* ── Background rasm ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/history-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
          initial={{ scale: 1.05 }}
          animate={inView ? { scale: 1 } : { scale: 1.05 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Qoraytirgich */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
        {/* Yuqori so'nish */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)' }}
        />
        {/* Pastki so'nish */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }}
        />
      </div>

      {/* Yuqori chiziq */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] origin-left"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">

        {/* ── Sarlavha — markazda ── */}
        <div className="text-center mb-20 w-full">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.9 }}
          >
            <div className="w-6 h-[1px]" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Tarix
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
            Sivilizatsiya
            <br />Beshigi
          </motion.h2>

          <motion.div
            className="h-[1px] w-16 mx-auto mt-8"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* ── Vaqt chizig'i ── */}
        <div className="relative w-full">

          {/* Markaziy vertikal chiziq */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] hidden md:block"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 2.2, delay: 0.5, ease: 'easeOut' }}
          />

          {/* Mobil chiziq */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-[1px] md:hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 2.2, delay: 0.5, ease: 'easeOut' }}
          />

          {events.map((ev, i) => (
            <motion.div
              key={ev.year}
              className={`relative mb-16 flex flex-col md:flex-row items-start gap-0 ${
                ev.align === 'right' ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 1.0, delay: 0.5 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ── Kontent tomoni ── */}
              <div
                className={`md:w-[46%] pl-10 md:pl-0 ${
                  ev.align === 'left'
                    ? 'md:pr-14 md:text-right'
                    : 'md:pl-14 md:text-left'
                }`}
              >
                {/* Yil — katta, engil */}
                <div
                  className="leading-none mb-2 font-light"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {ev.year}
                  {ev.era && (
                    <span
                      className="align-middle ml-2"
                      style={{
                        fontSize: '0.5rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.22)',
                      }}
                    >
                      {ev.era}
                    </span>
                  )}
                </div>

                {/* Sarlavha */}
                <h3
                  className="mb-3 font-light text-white"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {ev.title}
                </h3>

                {/* Tavsif */}
                <p
                  className="text-[0.65rem] leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.38)',
                    maxWidth: '22rem',
                    marginLeft: ev.align === 'left' ? 'auto' : undefined,
                  }}
                >
                  {ev.desc}
                </p>

                {/* Nozik chiziq */}
                <div
                  className={`mt-5 h-[1px] w-8 ${ev.align === 'left' ? 'md:ml-auto' : ''}`}
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                />
              </div>

              {/* ── Markaziy belgi ── */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1">
                <motion.div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: '#000000',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                  whileInView={{ borderColor: 'rgba(255,255,255,0.4)' }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.13 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                  />
                </motion.div>
              </div>

              {/* Bo'sh chap/o'ng tomon (tartib uchun) */}
              <div className="hidden md:block md:w-[46%]" />
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
