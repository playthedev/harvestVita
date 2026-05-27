'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 280;

// Tiny seeded PRNG (mulberry32) — deterministic and pure, unlike Math.random().
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ color = '#C9A84C', accent = '#F5F0E8' }: { color?: string; accent?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const { positions, speeds, phases } = useMemo(() => {
    const rnd = mulberry32(42);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (rnd() - 0.5) * 14;
      positions[i * 3 + 1] = (rnd() - 0.5) * 10;
      positions[i * 3 + 2] = (rnd() - 0.5) * 8;
      speeds[i] = rnd() * 0.18 + 0.04;
      phases[i] = rnd() * Math.PI * 2;
    }

    return { positions, speeds, phases };
  }, []);

  const colors = useMemo(() => {
    const rnd = mulberry32(99);
    const c = new Float32Array(PARTICLE_COUNT * 3);
    const gold = new THREE.Color(color);
    const cream = new THREE.Color(accent);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = rnd() > 0.75 ? cream : gold;
      c[i * 3 + 0] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return c;
  }, [color, accent]);

  // Initial geometry — recomputed only when seed arrays change.
  // Per-frame mutation happens via pointsRef.current.geometry below, never
  // via this memoized value directly.
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  // Clean mouse listener with proper cleanup
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [size.width, size.height]);

  // Dispose geometry when it changes / on unmount.
  useEffect(() => {
    return () => {
      geo.dispose();
    };
  }, [geo]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    // Mutate through the live three.js object exposed by the rendered ref,
    // not through the memoized geometry directly.
    const points = pointsRef.current;
    if (!points) return;
    const t = clock.getElapsedTime();
    const positionAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const pos = positionAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phase = phases[i];
      const speed = speeds[i];
      pos[i * 3 + 0] = positions[i * 3 + 0] + Math.sin(t * speed + phase) * 0.35;
      pos[i * 3 + 1] = positions[i * 3 + 1] + Math.cos(t * speed * 0.7 + phase) * 0.25;
      pos[i * 3 + 2] = positions[i * 3 + 2] + Math.sin(t * speed * 0.5 + phase * 1.3) * 0.2;
    }
    positionAttr.needsUpdate = true;

    points.rotation.y = THREE.MathUtils.lerp(
      points.rotation.y,
      mouse.current.x * 0.12,
      0.03
    );
    points.rotation.x = THREE.MathUtils.lerp(
      points.rotation.x,
      -mouse.current.y * 0.08,
      0.03
    );
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

function GlowOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 0.4 + position[0]) * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2.2, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.04} depthWrite={false} />
    </mesh>
  );
}

export default function FloatingGeometry({
  color = '#C9A84C',
}: {
  geometry?: string;
  color?: string;
  scale?: number;
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
        }}
      >
        <ambientLight intensity={0.15} />
        <ParticleField color={color} accent="#F5F0E8" />
        <GlowOrb position={[-3, 1.5, -3]} color={color} />
        <GlowOrb position={[3, -1, -4]} color="#F5F0E8" />
      </Canvas>
    </div>
  );
}
