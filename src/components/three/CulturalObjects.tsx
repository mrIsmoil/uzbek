'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
   1. DO'PPI — yangi model, intro spin animatsiyasi bilan
   ======================================================
   Animatsiyalar:
   • Kirish (0–2.2 s): pastdan ko'tarilib, 360° aylanib kiradi
   • Doimiy: sekin aylanish + sinusoidal suzish + sichqon paralaksi
   • Scroll: kichrayib, yuqoriga ko'tarilib ketadi
═══════════════════════════════════════════════════════════ */
export function Doppi({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  scrollProgress = 0,
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const startRef  = useRef<number | null>(null);
  const { scene } = useGLTF('/models/uzbek_doppi.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      const enhance = (mat: THREE.Material) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;
        mat.roughness    = 0.68;
        mat.metalness    = 0.08;
        mat.needsUpdate  = true;
      };
      Array.isArray(mesh.material)
        ? mesh.material.forEach(enhance)
        : enhance(mesh.material);
    });
    return clone;
  }, [scene]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    /* ── Intro vaqtini boshlash ── */
    if (startRef.current === null) startRef.current = t;
    const lt    = t - startRef.current;
    const INTRO = 5.0;                        /* 5s — sekin, majestic kirish */
    const p     = Math.min(lt / INTRO, 1);
    /* ease-out quart */
    const e     = 1 - Math.pow(1 - p, 4);

    /* ── SCALE: 0 → normal (model doim markazda, faqat o'sib chiqadi) ── */
    if (p < 1) {
      groupRef.current.scale.setScalar(Math.max(scale * e, 0.001));
    } else {
      const targetS = scale * (1 - Math.min(scrollProgress * 1.8, 0.88));
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, Math.max(targetS, 0.001), 0.07)
      );
    }

    /* ── POSITION Y: suzish + scroll (intro Y offseti yo'q!) ── */
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.38) * 0.06 + scrollProgress * 2.8;

    /* ── ROTATION Y: intro da juda sekin — 180° qo'shimcha, 5s da tugaydi ── */
    const introSpin = (1 - e) * Math.PI * 1.0;   /* 180° extra, sekin decay */
    groupRef.current.rotation.y = t * 0.08 + scrollProgress * Math.PI * 4 + introSpin;

    /* ── MOUSE TILT: intro tugagach to'la ishlaydi ── */
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.09 * e + scrollProgress * 0.2,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -pointer.x * 0.09 * e,
      0.04
    );
  });

  /* scale={[0.001,...]} — birinchi kadrda ko'rinmas, useFrame to'g'rilaydi */
  return (
    <group position={position} ref={groupRef} scale={[0.001, 0.001, 0.001]}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/models/uzbek_doppi.glb');

/* ═══════════════════════════════════════════════════════════
   1b. TEMUR HAYKAL — Samarqanddagi taxt haykali
   ======================================================
   • BBox: X[-6.64,7.75] Y[-10.5,-2.42] Z[-7.09,7.91] → max dim 15
   • useMemo ichida Box3 bilan markazlaymiz
   • Intro: scale 0 → target (ease-out quart), 1× aylantirish
   • Doimiy: juda sekin aylanish + suzish + sichqon paralaksi
═══════════════════════════════════════════════════════════ */
export function TimorStatue({
  position = [0, 0.35, 0] as [number, number, number],
  scale    = 0.18,
  scrollProgress = 0,
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const startRef  = useRef<number | null>(null);
  const { scene } = useGLTF('/models/timor_statue.glb');

  const centeredScene = useMemo(() => {
    const clone = scene.clone(true);

    /* Root matrix transformi hisobga olingan haqiqiy world BBox markazi:
       X=0.166, Y=6.479, Z=-0.883  →  offset = -center
       (avvalgi -Y emas, +Y edi chunki root matritsa Y o'qini teskari buradi) */
    clone.position.set(-0.166, -6.479, 0.883);

    /* Material yaxshilash */
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      const fix = (mat: THREE.Material) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;
        mat.roughness   = 0.42;
        mat.metalness   = 0.18;
        mat.needsUpdate = true;
      };
      Array.isArray(mesh.material) ? mesh.material.forEach(fix) : fix(mesh.material);
    });
    return clone;
  }, [scene]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    if (startRef.current === null) startRef.current = t;
    const lt    = t - startRef.current;
    const INTRO = 2.8;
    const p     = Math.min(lt / INTRO, 1);
    const e     = 1 - Math.pow(1 - p, 4);        // ease-out quart

    /* SCALE: 50% dan boshlanib to'la hajmga yetadi (darhol ko'rinadi) */
    const minS = scale * 0.5;
    if (p < 1) {
      groupRef.current.scale.setScalar(minS + (scale - minS) * e);
    } else {
      const tgt = scale * (1 - Math.min(scrollProgress * 1.8, 0.88));
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, Math.max(tgt, 0.001), 0.06)
      );
    }

    /* Y: nozik suzish */
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.32) * 0.035;

    /* ROTATION Y: +Math.PI → old tomoni kameraga, nozik kirish aylanishi */
    const introSpin = (1 - e) * Math.PI * 0.18;   /* faqat 32° — sekin va majestic */
    groupRef.current.rotation.y = Math.PI + t * 0.018 + introSpin;

    /* MOUSE TILT — nozik parallaks */
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, pointer.y * 0.055 * e, 0.035);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z, -pointer.x * 0.055 * e, 0.035);
  });

  /* Boshlang'ich scale: target ning 50% — darhol ko'rinadigan */
  const initS = scale * 0.5;
  return (
    <group position={position} ref={groupRef} scale={[initS, initS, initS]}>
      <primitive object={centeredScene} />
    </group>
  );
}

useGLTF.preload('/models/timor_statue.glb');

/* ═══════════════════════════════════════════════════════════
   2. DOPPI HALO HALQALARI — do'ppi atrofida nozik oq halqalar
   ======================================================
   • Ichki halqa: pulsatsiya qiladi
   • O'rta halqa: sekin aylanadi
   • Tashqi halqa: boshqa burchakda aylanadi
═══════════════════════════════════════════════════════════ */
export function DoppiRings({ scrollProgress }: { scrollProgress: number }) {
  const r1Ref = useRef<THREE.Mesh>(null);
  const r2Ref = useRef<THREE.Mesh>(null);
  const r3Ref = useRef<THREE.Mesh>(null);

  const { geo1, geo2, geo3, mat1, mat2, mat3 } = useMemo(() => {
    return {
      geo1: new THREE.TorusGeometry(1.70, 0.006, 6, 128),
      geo2: new THREE.TorusGeometry(2.35, 0.004, 6, 128),
      geo3: new THREE.TorusGeometry(3.10, 0.003, 6, 160),
      mat1: new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.14, depthWrite: false }),
      mat2: new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.07, depthWrite: false }),
      mat3: new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.04, depthWrite: false }),
    };
  }, []);

  useEffect(() => () => {
    [geo1, geo2, geo3, mat1, mat2, mat3].forEach(o => o.dispose());
  }, [geo1, geo2, geo3, mat1, mat2, mat3]);

  useFrame(({ clock }) => {
    const t    = clock.elapsedTime;
    const fade = Math.max(0, 1 - scrollProgress * 4.5);

    /* Ichki: pulsatsiya */
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);
    if (r1Ref.current) r1Ref.current.scale.setScalar(1 + pulse * 0.07);
    mat1.opacity = (0.09 + pulse * 0.05) * fade;

    /* O'rta: sekin aylana */
    if (r2Ref.current) {
      r2Ref.current.rotation.y = t * 0.2;
      r2Ref.current.rotation.z = Math.sin(t * 0.12) * 0.22;
    }
    mat2.opacity = 0.06 * fade;

    /* Tashqi: boshqa o'qda aylana */
    if (r3Ref.current) {
      r3Ref.current.rotation.x = t * 0.12;
      r3Ref.current.rotation.y = -t * 0.08;
    }
    mat3.opacity = 0.035 * fade;
  });

  return (
    <group>
      <mesh ref={r1Ref} geometry={geo1} material={mat1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh ref={r2Ref} geometry={geo2} material={mat2} rotation={[Math.PI / 3, 0, 0]} />
      <mesh ref={r3Ref} geometry={geo3} material={mat3} rotation={[Math.PI / 5, 0, 0]} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. ISLAMIY PANJARA — wireframe geodezik gumbaz
═══════════════════════════════════════════════════════════ */
export function IslamicLattice({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.LineSegments>(null);
  const { geo, mat } = useMemo(() => ({
    geo: new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.4, 3)),
    mat: new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.1 }),
  }), []);

  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.07;
    ref.current.rotation.y = t * 0.11;
    mat.opacity = Math.max(0, 0.1 - scrollProgress * 0.55);
  });

  return (
    <lineSegments
      ref={ref} geometry={geo} material={mat}
      position={[3.8, -0.2, -1.5]} scale={1.6}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   4. ULUG'BEK YULDUZ XARITASI — Fibonacci sferasi
═══════════════════════════════════════════════════════════ */
export function ConstellationMap({ scrollProgress }: { scrollProgress: number }) {
  const ptsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(380 * 3);
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < 380; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / 380);
      const angle = 2 * Math.PI * i / phi;
      const r     = 4 + Math.random() * 0.8;
      pos[i * 3]     = r * Math.sin(theta) * Math.cos(angle);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(angle);
      pos[i * 3 + 2] = r * Math.cos(theta);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (!ptsRef.current || !matRef.current) return;
    ptsRef.current.rotation.y = clock.elapsedTime * 0.016;
    ptsRef.current.rotation.x = clock.elapsedTime * 0.008;
    matRef.current.opacity = Math.max(0, 0.45 - scrollProgress * 2.2);
  });

  return (
    <points ref={ptsRef} geometry={geo}>
      <pointsMaterial ref={matRef} size={0.055} color="#ffffff"
        transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. IPAK YO'LI TASMASI — parametrik egri chiziq
═══════════════════════════════════════════════════════════ */
export function SilkRibbon({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null);

  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6,  0.4, -2),
      new THREE.Vector3(-3.5, 1.1, -0.5),
      new THREE.Vector3(-1.5, -0.4, -1.2),
      new THREE.Vector3(0,    0.6, -1.8),
      new THREE.Vector3(1.5, -0.2, -0.8),
      new THREE.Vector3(3.5,  0.9, -1),
      new THREE.Vector3(6,    0.3, -2),
    ]);
    return new THREE.TubeGeometry(curve, 240, 0.028, 7, false);
  }, []);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.28) * 0.12;
    matRef.current.opacity = Math.max(0, 0.32 - scrollProgress * 2.2);
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial ref={matRef}
        color="#ffffff" transparent opacity={0.32}
        roughness={0.15} metalness={0.85} depthWrite={false} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. ISLAMIY YULDUZLAR — oq, orbitada
═══════════════════════════════════════════════════════════ */
function createIslamicStar(outerR: number, innerR: number, depth: number) {
  const shape = new THREE.Shape();
  const pts = 8;
  for (let i = 0; i <= pts * 2; i++) {
    const angle = (i / (pts * 2)) * Math.PI * 2 - Math.PI / pts;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) shape.moveTo(Math.sin(angle) * r, Math.cos(angle) * r);
    else         shape.lineTo(Math.sin(angle) * r, Math.cos(angle) * r);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true,
    bevelThickness: 0.005, bevelSize: 0.004, bevelSegments: 2,
  });
}

function IslamicStar({
  scale, speed, orbitRadius, orbitOffset, heightOffset,
}: {
  scale: number; speed: number;
  orbitRadius: number; orbitOffset: number; heightOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => createIslamicStar(1, 0.42, 0.1), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffffff', metalness: 0.8, roughness: 0.18,
    transparent: true, opacity: 0.62,
  }), []);

  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.position.x = Math.cos(t * speed + orbitOffset) * orbitRadius;
    meshRef.current.position.z = Math.sin(t * speed + orbitOffset) * orbitRadius;
    meshRef.current.position.y = heightOffset + Math.sin(t * speed * 0.6 + orbitOffset) * 0.25;
    meshRef.current.rotation.z = t * speed * 0.4;
  });

  return <mesh ref={meshRef} geometry={geo} material={mat} scale={scale} />;
}

export function FloatingIslamicStars({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const configs = [
    { scale: 0.12, speed: 0.26, orbitRadius: 2.2, orbitOffset: 0,              heightOffset: 0.55 },
    { scale: 0.08, speed: 0.17, orbitRadius: 3.0, orbitOffset: Math.PI / 3,    heightOffset: 0.2  },
    { scale: 0.07, speed: 0.38, orbitRadius: 1.8, orbitOffset: Math.PI * 2/3,  heightOffset: 0.8  },
    { scale: 0.10, speed: 0.21, orbitRadius: 2.7, orbitOffset: Math.PI,        heightOffset: 0.0  },
    { scale: 0.06, speed: 0.44, orbitRadius: 2.0, orbitOffset: Math.PI * 4/3,  heightOffset: 0.6  },
    { scale: 0.08, speed: 0.14, orbitRadius: 3.4, orbitOffset: Math.PI * 5/3,  heightOffset: 0.3  },
  ];

  useFrame(() => {
    if (!groupRef.current) return;
    const fade = Math.max(0, 1 - scrollProgress * 5);
    groupRef.current.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m) m.opacity = fade * 0.62;
    });
  });

  return (
    <group ref={groupRef}>
      {configs.map((cfg, i) => <IslamicStar key={i} {...cfg} />)}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. YULDUZ MAYDONI — orqa fon
═══════════════════════════════════════════════════════════ */
export function StarField() {
  const ptsRef = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 9 + Math.random() * 4;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (!ptsRef.current) return;
    ptsRef.current.rotation.y = clock.elapsedTime * 0.006;
    ptsRef.current.rotation.x = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ptsRef} geometry={geo}>
      <pointsMaterial size={0.05} color="#ffffff"
        transparent opacity={0.48} sizeAttenuation depthWrite={false} />
    </points>
  );
}
