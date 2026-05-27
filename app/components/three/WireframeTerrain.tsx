'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const initialPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 80, 80);
    return geo.attributes.position.array.slice();
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !geometryRef.current) return;
    const time = clock.getElapsedTime() * 0.25;
    const positions = geometryRef.current.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = initialPositions[i];
      const y = initialPositions[i + 1];
      const wave1 = Math.sin(x * 0.12 + time) * 0.9;
      const wave2 = Math.cos(y * 0.12 + time * 0.75) * 0.9;
      const wave3 = Math.sin((x + y) * 0.09 + time * 1.1) * 0.45;
      positions[i + 2] = wave1 + wave2 + wave3;
    }
    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
    meshRef.current.rotation.z = Math.sin(time * 0.08) * 0.04;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry ref={geometryRef} args={[60, 60, 80, 80]} />
      <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.28} />
    </mesh>
  );
}

/* Sun / seed-ring — concentric torus rings representing the sun or a seed cross-section */
function SunRing({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = t * speed * 0.15;
    groupRef.current.rotation.x = t * speed * 0.08;
    groupRef.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.35;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <torusGeometry args={[1, 0.04, 6, 32]} />
        <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.65, 0.04, 6, 24]} />
        <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.04, 6, 32]} />
        <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* Seed pod — an icosahedron with low detail, olive colour, like a spice pod */
function SeedPod({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed * 0.4;
    meshRef.current.rotation.y = t * speed * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t * speed * 0.6) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#2D4A2D" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

/* Leaf diamond — a flattened octahedron that looks like a stylised leaf or grain */
function LeafDiamond({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * speed * 0.5;
    meshRef.current.rotation.z = t * speed * 0.2;
    meshRef.current.position.y = position[1] + Math.cos(t * speed * 0.4) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale * 0.7, scale * 1.6, scale * 0.4]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#4A2545" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <Terrain />
      {/* Sun ring top-left */}
      <SunRing position={[-6, 2.5, -2]} scale={1.1} speed={0.5} />
      {/* Seed pods */}
      <SeedPod position={[5.5, 3, -3]} scale={0.9} speed={0.45} />
      <SeedPod position={[-4, -1.5, 2]} scale={0.55} speed={0.7} />
      {/* Leaf/grain diamonds */}
      <LeafDiamond position={[3.5, -0.5, 1]} scale={0.9} speed={0.6} />
      <LeafDiamond position={[-2, 1.5, -1]} scale={0.55} speed={0.8} />
      {/* Small sun ring bottom-right */}
      <SunRing position={[6, -2, -1]} scale={0.6} speed={0.65} />
    </>
  );
}

export default function WireframeTerrain() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 4, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
