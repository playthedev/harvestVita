'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  // Pre-compute initial vertex positions for noise
  const { initialPositions, simplex } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 80, 80);
    const positions = geo.attributes.position.array.slice();
    return { initialPositions: positions, simplex: null };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !geometryRef.current) return;
    const time = clock.getElapsedTime() * 0.3;
    const positions = geometryRef.current.attributes.position
      .array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = initialPositions[i];
      const y = initialPositions[i + 1];
      // Layered sine-based noise for organic terrain undulation
      const wave1 = Math.sin(x * 0.15 + time) * 0.8;
      const wave2 = Math.cos(y * 0.15 + time * 0.8) * 0.8;
      const wave3 = Math.sin((x + y) * 0.1 + time * 1.2) * 0.4;
      positions[i + 2] = wave1 + wave2 + wave3;
    }
    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.computeVertexNormals();

    // Slow rotation for added depth
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -3, 0]}
    >
      <planeGeometry ref={geometryRef} args={[60, 60, 80, 80]} />
      <meshBasicMaterial
        color="#C9A84C"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function FloatingShape({
  position,
  scale,
  geometry,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  geometry: 'icosahedron' | 'octahedron' | 'torus';
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.y = t * speed * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.3, 8, 16]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <Terrain />
      <FloatingShape
        position={[-6, 2, -2]}
        scale={0.8}
        geometry="icosahedron"
        speed={0.6}
        color="#C9A84C"
      />
      <FloatingShape
        position={[5, 3, -3]}
        scale={1.1}
        geometry="octahedron"
        speed={0.4}
        color="#4A2545"
      />
      <FloatingShape
        position={[3, -1, 1]}
        scale={0.6}
        geometry="torus"
        speed={0.8}
        color="#C9A84C"
      />
      <FloatingShape
        position={[-4, -1.5, 2]}
        scale={0.5}
        geometry="icosahedron"
        speed={0.7}
        color="#2D4A2D"
      />
    </>
  );
}

export default function WireframeTerrain() {
  return (
    <Canvas
      camera={{ position: [0, 4, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
