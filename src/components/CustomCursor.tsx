'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let x = -100, y = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      if (el) {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
      rafId = requestAnimationFrame(render);
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] select-none"
      style={{
        top: 0,
        left: 0,
        width: '60px',
        height: '60px',
        transform: 'translate(-100px, -100px)',
        willChange: 'transform',
        marginLeft: '-30px',
        marginTop: '-30px',
      }}
    >
      <img
        src="/doppi.png"
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  );
}
