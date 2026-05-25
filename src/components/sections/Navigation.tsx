'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/*
  Bo'limlar tartibi (data-section = DOM index):
  0 Hero | 1 Stats | 2 Identity | 3 Landmarks | 4 Culture | 5 History | 6 Final

  Oq fon bo'limlari: 3 (Landmarks), 5 (History)
  Qora fon bo'limlari: 0, 1 (Stats — endi qora), 2, 4, 6
*/

export default function Navigation({ activeSection }: { activeSection: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* Barcha sectionlar endi qora fon */
  const isLight = false;

  const navItems = [
    { label: 'Bosh Sahifa', idx: 0 },
    { label: 'Hududlar',    idx: 2 },
    { label: 'Joylar',      idx: 3 },
    { label: 'Madaniyat',   idx: 4 },
    { label: 'Tarix',       idx: 5 },
  ];

  const scrollTo = (i: number) => {
    document.querySelectorAll('[data-section]')[i]?.scrollIntoView({ behavior: 'smooth' });
  };

  const textActive  = isLight ? '#000000' : '#ffffff';
  const textMuted   = isLight ? 'rgba(0,0,0,0.38)'  : 'rgba(255,255,255,0.35)';
  const textHover   = isLight ? 'rgba(0,0,0,0.75)'  : 'rgba(255,255,255,0.75)';

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? `nav-glass ${isLight ? 'on-light' : 'on-dark'}` : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1], delay: 0.8 }}
    >
      <div className="w-full px-16 md:px-24 lg:px-32 py-5 flex items-center justify-between">

        {/* Logo */}
        <motion.button
          className="text-[0.7rem] font-medium tracking-[0.28em] uppercase transition-colors duration-500 ml-6"
          style={{ color: textActive, background: 'none', border: 'none', cursor: 'pointer' }}
          whileHover={{ scale: 1.02 }}
          onClick={() => scrollTo(0)}
        >
          O&apos;zbekiston
        </motion.button>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => {
            const active = activeSection === item.idx;
            return (
              <motion.button
                key={item.label}
                onClick={() => scrollTo(item.idx)}
                className="relative py-2 text-[0.65rem] tracking-[0.22em] uppercase font-medium transition-colors duration-500"
                style={{ color: active ? textActive : textMuted, background: 'none', border: 'none', cursor: 'pointer' }}
                whileHover={{ color: textHover }}
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.08, duration: 0.7 }}
              >
                {item.label}
                {active && (
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-[1px]"
                    style={{ background: textActive }}
                    layoutId="navUnderline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
