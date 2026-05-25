'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat { val: number; suf: string; label: string; sub: string; }

const stats: Stat[] = [
  { val: 36,   suf: 'M+', label: 'Aholi',   sub: "Markaziy Osiyoning eng ko'p aholiga ega davlati"       },
  { val: 449,  suf: 'K',  label: 'km²',     sub: 'Maydoni — Frantsiyadek katta, lekin yanada boy'        },
  { val: 14,   suf: '',   label: 'Viloyat',  sub: "O'zbekiston ma'muriy hududlari va 1 respublika"        },
  { val: 2750, suf: '+',  label: 'Yil',      sub: "Samarqand — dunyodagi eng qadimiy shaharlardan biri"  },
  { val: 5,    suf: '',   label: 'UNESCO',   sub: "Jahon merosi ro'yxatidagi ob'yektlar soni"             },
  { val: 130,  suf: '+',  label: 'Millat',   sub: "Bir asrdan ortiq tinch yashab kelayotgan xalqlar"     },
];

function Counter({ val, suf, active }: { val: number; suf: string; active: boolean }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    if (!active) { setCur(0); return; }
    const dur = 2200;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setCur(Math.round(e * val));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [active, val]);
  return <>{cur.toLocaleString()}{suf}</>;
}

export default function StatisticsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <section
      ref={ref}
      data-section="1"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* ── ORQA FON: Sketchfab 3D O'zbekiston xaritasi ── */}
      <div className="absolute inset-0 z-0">
        <iframe
          title="Uzbekistan Map 3D"
          src="https://sketchfab.com/models/85faf3d5f38e44b28889fe699b29942d/embed?autostart=1&ui_hint=0&dnt=1&ui_infos=0&ui_watermark=0&ui_stop=0"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="w-full h-full"
          style={{ opacity: 0.65, pointerEvents: 'none', filter: 'brightness(1.6) contrast(0.88) saturate(1.1)' }}
        />

        {/* Chap tomon gradient — matn o'qilsin */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg,' +
              'rgba(0,0,0,0.94) 0%,' +
              'rgba(0,0,0,0.80) 32%,' +
              'rgba(0,0,0,0.38) 60%,' +
              'rgba(0,0,0,0.04) 100%)',
          }}
        />
        {/* Yuqori so'nish */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom,' +
              'rgba(0,0,0,0.65) 0%, transparent 16%,' +
              'transparent 54%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,1) 78%)',
          }}
        />
        {/* Pastki qoplama — Sketchfab "click & hold" UI ni to'liq yashiradi */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '30%', background: '#000000' }}
        />
      </div>

      {/* ── KONTENT QATLAMI ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-24 px-6">
        <div className="w-full max-w-3xl">

          {/* Yuqori yorliq */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-[1px]" style={{ background: 'rgba(255,255,255,0.22)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>
              O&apos;zbekiston · Statistika
            </span>
          </motion.div>

          {/* Asosiy sarlavha */}
          <motion.h2
            className="heading-section mb-14 text-white"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Raqamlarda
          </motion.h2>

          {/* Raqamlar tarmog'i */}
          <div
            className="grid grid-cols-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="relative py-8 pr-6"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.9, delay: 0.07 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Hover accent chiziq */}
                <motion.div
                  className="absolute top-0 left-0 w-[2px] h-0 bg-white"
                  whileHover={{ height: '100%' }}
                  transition={{ duration: 0.5 }}
                />

                {/* Katta raqam */}
                <div
                  className="leading-none mb-3 text-white"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
                    fontWeight: '200',
                    letterSpacing: '-0.025em',
                  }}
                >
                  <Counter val={s.val} suf={s.suf} active={inView} />
                </div>

                {/* Yorliq */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-[1px]" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  <span
                    className="text-[0.58rem] font-semibold tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Tavsif */}
                <p
                  className="text-[0.62rem] leading-relaxed max-w-[190px]"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
