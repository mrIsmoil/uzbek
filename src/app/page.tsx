'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation        from '@/components/sections/Navigation';
import HeroSection       from '@/components/sections/HeroSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import IdentitySection   from '@/components/sections/IdentitySection';
import LandmarksSection  from '@/components/sections/LandmarksSection';
import CultureSection    from '@/components/sections/CultureSection';
import HistorySection    from '@/components/sections/HistorySection';
import FinalSection      from '@/components/sections/FinalSection';

const Scene = lazy(() => import('@/components/three/Scene'));

/* ── Premium yuklash ekrani ── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(id); setTimeout(onComplete, 800); return 100; }
        return Math.min(p + Math.random() * 5 + 2, 100);
      });
    }, 45);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: '#000000' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Lagan — aylanib turadi */}
      <motion.img
        src="/lagan.png"
        alt=""
        className="select-none pointer-events-none"
        style={{
          width: '240px',
          height: '240px',
          objectFit: 'contain',
          marginBottom: '2rem',
          filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 0 28px rgba(100,140,255,0.25))',
        }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{
          opacity:  { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          scale:    { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          rotate:   { duration: 8, ease: 'linear', repeat: Infinity },
        }}
      />

      {/* Foiz */}
      <motion.span
        className="text-[0.52rem] tracking-[0.55em] uppercase font-light"
        style={{ color: 'rgba(255,255,255,0.35)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {Math.round(pct)} %
      </motion.span>
    </motion.div>
  );
}

/* ── Asosiy sahifa ── */
export default function Home() {
  const [loaded,   setLoaded]   = useState(false);
  const [scroll,   setScroll]   = useState(0);
  const [section,  setSection]  = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  /* 3D modelni loading screen paytida keshga yuklab olish */
  useEffect(() => {
    fetch('/models/timor_statue.glb', { cache: 'force-cache' }).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? top / max : 0);

      document.querySelectorAll('[data-section]').forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.52 && r.bottom >= window.innerHeight * 0.28) {
          setSection(i);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Barcha sectionlar endi qora fon */
  const isLightSection = false;

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && <Navigation activeSection={section} />}

      {loaded && (
        <Suspense fallback={null}>
          <Scene scrollProgress={scroll} activeSection={section} />
        </Suspense>
      )}

      <main ref={mainRef} className="relative z-10">
        <HeroSection      />
        <StatisticsSection />
        <IdentitySection  />
        <LandmarksSection />
        <CultureSection   />
        <HistorySection   />
        <FinalSection     />
      </main>

      {/* Scroll progress — mix-blend-mode:difference → har fonda ko'rinadi */}
      {loaded && (
        <div
          className="fixed top-0 left-0 right-0 h-[1px] z-[60] pointer-events-none"
          style={{ mixBlendMode: 'difference' }}
        >
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${scroll * 100}%` }}
          />
        </div>
      )}
    </>
  );
}
