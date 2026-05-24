'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingShape({
  geometry,
  color,
  scale = 1,
}: {
  geometry: 'icosahedron' | 'dodecahedron' | 'torus-knot' | 'octahedron';
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (groupRef.current) {
      // Follow mouse subtly
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1.5, 1]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1.5, 0]} />}
        {geometry === 'torus-knot' && <torusKnotGeometry args={[1, 0.35, 100, 16]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
      </mesh>
      {/* Inner glow shape */}
      <mesh scale={scale * 0.6}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1.5, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1.5, 0]} />}
        {geometry === 'torus-knot' && <torusKnotGeometry args={[1, 0.2, 60, 8]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function FloatingGeometry({
  geometry = 'icosahedron',
  color = '#C9A84C',
  scale = 1,
}: {
  geometry?: 'icosahedron' | 'dodecahedron' | 'torus-knot' | 'octahedron';
  color?: string;
  scale?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <RotatingShape geometry={geometry} color={color} scale={scale} />
    </Canvas>
  );
}
