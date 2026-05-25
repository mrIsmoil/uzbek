'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function SilkRoadModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/silk-road-monument.glb');

  const centered = useMemo(() => {
    const clone = scene.clone(true);

    // BBox markazini hisoblash
    const box = new THREE.Box3();
    clone.updateMatrixWorld(true);
    box.setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    // Material sozlash
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const fix = (mat: THREE.Material) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;
        mat.roughness    = 0.55;
        mat.metalness    = 0.25;
        mat.needsUpdate  = true;
      };
      Array.isArray(mesh.material)
        ? mesh.material.forEach(fix)
        : fix(mesh.material as THREE.Material);
    });

    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Sekin aylanish — Y o'qi bo'yicha
    groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      <primitive object={centered} />
    </group>
  );
}

// Model hajmini dinamik topib, kameraga mos scale
function AutoScaledModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/silk-road-monument.glb');

  const { clone, scale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    // Eng uzun o'lchamni 6 birlikka moslash
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale  = maxDim > 0 ? 6 / maxDim : 1;

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const fix = (mat: THREE.Material) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;
        mat.roughness   = 0.6;
        mat.metalness   = 0.2;
        mat.needsUpdate = true;
      };
      Array.isArray(mesh.material)
        ? mesh.material.forEach(fix)
        : fix(mesh.material as THREE.Material);
    });

    return { clone, scale };
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive object={clone} />
    </group>
  );
}

export default function SilkRoadScene() {
  return (
    <Canvas
      camera={{
        position: [0, 12, 14],
        fov: 42,
        near: 0.1,
        far: 500,
      }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
      style={{ width: '100%', height: '100%', minHeight: '100vh', display: 'block', background: 'transparent' }}
    >
      {/* Minimal ambient */}
      <ambientLight intensity={0.08} color="#ffffff" />

      {/* Key light — yuqori o'ngdan */}
      <spotLight
        position={[8, 18, 10]}
        intensity={6}
        color="#ffffff"
        penumbra={0.3}
        angle={Math.PI / 5}
        castShadow={false}
      />

      {/* Rim light — orqa chapdan */}
      <spotLight
        position={[-10, 6, -12]}
        intensity={4}
        color="#ffffff"
        penumbra={0.5}
        angle={Math.PI / 4}
      />

      {/* Fill light — olddan */}
      <directionalLight
        position={[-4, 8, 8]}
        intensity={0.5}
        color="#e8e8f0"
      />

      <AutoScaledModel />
    </Canvas>
  );
}

useGLTF.preload('/models/silk-road-monument.glb');
