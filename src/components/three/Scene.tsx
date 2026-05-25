'use client';

import { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { TimorStatue } from './CulturalObjects';

/* ── Sinematik kamera boshqaruvchisi ── */
function CinematicCamera({
  scrollProgress,
  activeSection,
}: {
  scrollProgress: number;
  activeSection: number;
}) {
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    /* Hero: kamera yuqoridan 22° burchak, do'ppini tepadan ko'rsatadi */
    let tx = 0, ty = 2.2, tz = 4.5, lookY = 0.35;

    if (activeSection === 0) {
      tx = pointer.x * 0.22;
      ty = 2.2 + pointer.y * 0.10;
    } else {
      const p = Math.min(scrollProgress * 3.0, 1);
      ty    = 2.2 + p * 13;
      tz    = 4.5 + p * 8;
      lookY = 0.35 - p * 3.5;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.034);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.034);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz, 0.034);
    camera.lookAt(0, lookY, 0);
  });

  return null;
}

/* ── Sahna ichidagi barcha elementlar ── */
function SceneContent({
  scrollProgress,
  activeSection,
}: {
  scrollProgress: number;
  activeSection: number;
}) {
  return (
    <>
      {/* ═══════════════ STUDIO YORUG'LIKLARI ═══════════════
          Do'ppini muzey spotlight uslubida ko'rsatadi.
          Qora-oq — rang yo'q, faqat sof oq.
      ═══════════════════════════════════════════════════════ */}

      {/* Minimal ambient — qora fon, studio muhit */}
      <ambientLight intensity={0.025} color="#ffffff" />

      {/* KEY LIGHT — asosiy, yuqori-o'ngdan, keskin muzey spotlight */}
      <spotLight
        position={[2.5, 10, 5.5]}
        intensity={10.0}
        color="#ffffff"
        penumbra={0.15}
        angle={Math.PI / 6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* RIM LIGHT — orqa-chapdan, keskin oq, do'ppini fondan ajratadi */}
      <spotLight
        position={[-4.5, 3, -9]}
        intensity={13.0}
        color="#ffffff"
        penumbra={0.38}
        angle={Math.PI / 4}
      />

      {/* FILL — old-chapdan yumshoq to'ldiruvchi */}
      <directionalLight
        position={[-5, 7, 5]}
        intensity={0.65}
        color="#f0f0f0"
      />

      {/* BOUNCE — pastdan aks, do'ppi pastki qismini ko'rsatadi */}
      <pointLight
        position={[0, -4.5, 1.5]}
        intensity={1.1}
        color="#ffffff"
        distance={12}
        decay={2}
      />

      {/* TOP ACCENT — to'g'ridan yuqoridan nozik */}
      <pointLight
        position={[0, 8, 0]}
        intensity={0.5}
        color="#ffffff"
        distance={14}
        decay={2}
      />

      {/* ═══════════════ 3D OB'YEKTLAR ═══════════════ */}

      <CinematicCamera scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* ★ TEMUR HAYKALI ★ — Suspense ichida, model yuklanguncha kutadi */}
      <Suspense fallback={null}>
        <Float speed={0.45} rotationIntensity={0.008} floatIntensity={0.05}>
          <TimorStatue
            position={[0, 0.35, 0]}
            scale={0.18}
            scrollProgress={scrollProgress}
          />
        </Float>
      </Suspense>
    </>
  );
}

interface SceneProps {
  scrollProgress: number;
  activeSection: number;
}

export default function Scene({ scrollProgress, activeSection }: SceneProps) {
  return (
    <div className="canvas-container interactive" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 2.2, 4.5], fov: 38, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        style={{ background: 'transparent' }}
      >
        <SceneContent scrollProgress={scrollProgress} activeSection={activeSection} />
      </Canvas>
    </div>
  );
}
