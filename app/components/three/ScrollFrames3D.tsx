'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Tiny seeded PRNG (mulberry32) for stable particle positions across renders.
// Using Math.random() during render is impure and trips React 19 strict-mode
// (and the react-hooks/purity lint rule).
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

/* ─────────────────────────────────────────────────────────────
 * Scroll progress is forwarded via a ref from the parent.
 * Each scene is a small farm/food-themed 3D arrangement;
 * the parent wraps the canvas in a sticky pinned container,
 * and the canvas reads scroll progress (0..1) to:
 *   - rotate the world
 *   - morph between scenes via opacity + position interpolation
 *   - animate accent particles (seeds / pollen / grain dust)
 * ────────────────────────────────────────────────────────── */

const GOLD = '#C9A84C';
const OLIVE = '#2D4A2D';
const PLUM = '#4A2545';
const CREAM = '#F5F0E8';

/* Smoothstep helper */
const smooth = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/* Frame visibility: fades each scene in within its slice of progress */
function frameAlpha(progress: number, start: number, end: number) {
  const fadeIn = 0.08;
  const a = smooth(start - fadeIn, start + fadeIn, progress);
  const b = 1 - smooth(end - fadeIn, end + fadeIn, progress);
  return Math.max(0, Math.min(1, a * b));
}

/* ── FRAME 1: A single seed germinating (sphere + emerging sprout) ── */
function SeedFrame({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const sproutRef = useRef<THREE.Mesh>(null);
  const seedRef = useRef<THREE.Mesh>(null);
  const matRefs = useRef<THREE.Material[]>([]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const a = frameAlpha(p, 0, 0.28);
    const t = clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.visible = a > 0.01;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;

    // sprout grows with local scroll progress
    const local = smooth(0, 0.28, p);
    if (sproutRef.current) {
      sproutRef.current.scale.y = 0.05 + local * 1.6;
      sproutRef.current.position.y = local * 0.7;
    }
    if (seedRef.current) {
      seedRef.current.rotation.y = t * 0.4;
    }

    matRefs.current.forEach((m) => {
      if (m) (m as THREE.Material & { opacity: number }).opacity = a * (m.userData?.maxOpacity ?? 0.7);
    });
  });

  const registerMat = (m: THREE.Material | null, maxOp = 0.7) => {
    if (m && !matRefs.current.includes(m)) {
      m.userData = { maxOpacity: maxOp };
      matRefs.current.push(m);
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Seed — icosahedron */}
      <mesh ref={seedRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.85)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Soil ring under seed */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
        <torusGeometry args={[1.4, 0.04, 6, 48]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.45)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
        <torusGeometry args={[2.0, 0.03, 6, 48]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.25)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
      {/* Sprout — a tall cone growing upward */}
      <mesh ref={sproutRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.18, 1.6, 4, 1, true]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.7)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
      {/* Two leaves at sprout tip */}
      <mesh position={[0.35, 1.1, 0]} rotation={[0, 0, -0.6]}>
        <sphereGeometry args={[0.35, 8, 4]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.55)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
      <mesh position={[-0.35, 0.95, 0]} rotation={[0, 0, 0.6]}>
        <sphereGeometry args={[0.3, 8, 4]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.55)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
    </group>
  );
}

/* ── FRAME 2: Wheat stalk — central stem with grain pods ── */
function WheatFrame({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRefs = useRef<THREE.Material[]>([]);

  const grains = useMemo(() => {
    const rnd = mulberry32(1234);
    const arr: { y: number; side: 1 | -1; r: number }[] = [];
    for (let i = 0; i < 7; i++) {
      arr.push({ y: 0.2 + i * 0.35, side: 1, r: 0.2 + rnd() * 0.05 });
      arr.push({ y: 0.05 + i * 0.35, side: -1, r: 0.2 + rnd() * 0.05 });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const a = frameAlpha(p, 0.22, 0.52);
    const t = clock.getElapsedTime();

    groupRef.current.visible = a > 0.01;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.25 + t * 0.04;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    groupRef.current.position.y = -1.6 + Math.sin(t * 0.6) * 0.1;

    matRefs.current.forEach((m) => {
      if (m) (m as THREE.Material & { opacity: number }).opacity = a * (m.userData?.maxOpacity ?? 0.7);
    });
  });

  const registerMat = (m: THREE.Material | null, maxOp = 0.7) => {
    if (m && !matRefs.current.includes(m)) {
      m.userData = { maxOpacity: maxOp };
      matRefs.current.push(m);
    }
  };

  return (
    <group ref={groupRef}>
      {/* Central stalk */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.025, 0.04, 3.4, 6]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.8)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Grain pods on both sides */}
      {grains.map((g, i) => (
        <mesh
          key={i}
          position={[g.side * 0.32, 1.6 + g.y, 0]}
          rotation={[0, 0, g.side * -0.35]}
        >
          <sphereGeometry args={[g.r, 6, 4]} />
          <meshBasicMaterial
            ref={(m) => registerMat(m, 0.85)}
            color={GOLD}
            wireframe
            transparent
          />
        </mesh>
      ))}
      {/* Top grain */}
      <mesh position={[0, 1.6 + 7 * 0.35 + 0.2, 0]}>
        <sphereGeometry args={[0.18, 6, 4]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.9)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Leaves */}
      <mesh position={[0.7, 1.4, 0]} rotation={[0, 0, -0.9]}>
        <coneGeometry args={[0.18, 1.4, 4]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.5)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
      <mesh position={[-0.7, 1.0, 0]} rotation={[0, 0, 0.9]}>
        <coneGeometry args={[0.16, 1.2, 4]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.5)}
          color={OLIVE}
          wireframe
          transparent
        />
      </mesh>
    </group>
  );
}

/* ── FRAME 3: Oil droplet — a teardrop sphere with concentric ripples ── */
function OilDropFrame({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const dropRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const matRefs = useRef<THREE.Material[]>([]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const a = frameAlpha(p, 0.46, 0.76);
    const t = clock.getElapsedTime();

    groupRef.current.visible = a > 0.01;
    groupRef.current.rotation.y = t * 0.18;

    if (dropRef.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.04;
      dropRef.current.scale.set(pulse, pulse * 1.2, pulse);
      dropRef.current.position.y = 0.3 + Math.sin(t * 0.8) * 0.15;
    }
    // ripple expansion
    const r1 = 1 + ((t * 0.6) % 2);
    const r2 = 1 + ((t * 0.6 + 0.66) % 2);
    const r3 = 1 + ((t * 0.6 + 1.33) % 2);
    if (ring1Ref.current) ring1Ref.current.scale.setScalar(r1);
    if (ring2Ref.current) ring2Ref.current.scale.setScalar(r2);
    if (ring3Ref.current) ring3Ref.current.scale.setScalar(r3);

    matRefs.current.forEach((m, idx) => {
      // ripples fade as they expand
      let alpha = a * (m.userData?.maxOpacity ?? 0.7);
      if (idx >= 1 && idx <= 3) {
        const scales = [r1, r2, r3];
        const s = scales[idx - 1];
        alpha *= Math.max(0, 1 - (s - 1) / 2);
      }
      (m as THREE.Material & { opacity: number }).opacity = alpha;
    });
  });

  const registerMat = (m: THREE.Material | null, maxOp = 0.7) => {
    if (m && !matRefs.current.includes(m)) {
      m.userData = { maxOpacity: maxOp };
      matRefs.current.push(m);
    }
  };

  return (
    <group ref={groupRef}>
      {/* Droplet body */}
      <mesh ref={dropRef}>
        <sphereGeometry args={[0.9, 16, 12]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.85)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Three expanding rings (pond ripples) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, 0, 0]} position={[0, -0.6, 0]}>
        <torusGeometry args={[1.0, 0.025, 4, 48]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.7)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.2, 0, 0]} position={[0, -0.6, 0]}>
        <torusGeometry args={[1.0, 0.025, 4, 48]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.55)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 2.2, 0, 0]} position={[0, -0.6, 0]}>
        <torusGeometry args={[1.0, 0.025, 4, 48]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.4)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Inner glow */}
      <mesh scale={0.55}>
        <sphereGeometry args={[0.9, 12, 8]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.3)}
          color={CREAM}
          wireframe
          transparent
        />
      </mesh>
    </group>
  );
}

/* ── FRAME 4: Spice jar — a hexagonal jar with floating spice particles ── */
function SpiceJarFrame({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const matRefs = useRef<THREE.Material[]>([]);

  const particlePositions = useMemo(() => {
    const rnd = mulberry32(5678);
    const arr = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      const r = 0.6 + rnd() * 1.4;
      const theta = rnd() * Math.PI * 2;
      const y = (rnd() - 0.3) * 2.8;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const a = frameAlpha(p, 0.7, 1.0);
    const t = clock.getElapsedTime();

    groupRef.current.visible = a > 0.01;
    groupRef.current.rotation.y = t * 0.15;

    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += 0.005 + Math.sin(t + i) * 0.001;
        if (pos[i + 1] > 1.6) pos[i + 1] = -1.4;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    matRefs.current.forEach((m) => {
      if (m) (m as THREE.Material & { opacity: number }).opacity = a * (m.userData?.maxOpacity ?? 0.7);
    });
  });

  const registerMat = (m: THREE.Material | null, maxOp = 0.7) => {
    if (m && !matRefs.current.includes(m)) {
      m.userData = { maxOpacity: maxOp };
      matRefs.current.push(m);
    }
  };

  return (
    <group ref={groupRef}>
      {/* Jar body — hexagonal cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 2.2, 6]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.7)}
          color={PLUM}
          wireframe
          transparent
        />
      </mesh>
      {/* Jar lid */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.25, 6]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.85)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Jar base ring */}
      <mesh position={[0, -1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.05, 4, 24]} />
        <meshBasicMaterial
          ref={(m) => registerMat(m, 0.6)}
          color={GOLD}
          wireframe
          transparent
        />
      </mesh>
      {/* Spice particles floating around */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={(m) => registerMat(m, 0.9)}
          color={GOLD}
          size={0.05}
          transparent
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ── Ambient field of slow-drifting golden specks (pollen / grain dust) ── */
function AmbientDust({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rnd = mulberry32(9012);
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      arr[i * 3] = (rnd() - 0.5) * 14;
      arr[i * 3 + 1] = (rnd() - 0.5) * 8;
      arr[i * 3 + 2] = (rnd() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] += 0.004;
      pos[i] += Math.sin(t * 0.4 + i) * 0.002;
      if (pos[i + 1] > 4) pos[i + 1] = -4;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = scrollRef.current * 0.4;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.04} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ── Camera rig — orbits gently around the centre based on scroll ── */
function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  useFrame(({ camera, clock }) => {
    const p = scrollRef.current;
    const t = clock.getElapsedTime();
    const angle = p * Math.PI * 0.6 + Math.sin(t * 0.15) * 0.05;
    const radius = 6 + Math.sin(t * 0.2) * 0.4;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = 0.5 + Math.sin(t * 0.25) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ScrollFrames3D({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
        }}
      >
        <CameraRig scrollRef={scrollRef} />
        <AmbientDust scrollRef={scrollRef} />
        <SeedFrame scrollRef={scrollRef} />
        <WheatFrame scrollRef={scrollRef} />
        <OilDropFrame scrollRef={scrollRef} />
        <SpiceJarFrame scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
