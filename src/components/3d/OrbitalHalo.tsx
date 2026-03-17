import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitalRing() {
  const ringRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    // Create particles pour effet orbital
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 80;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    if (pointsRef.current) {
      pointsRef.current.geometry = geometry;
    }
  }, []);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002;
      ringRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={ringRef}>
      {/* Torus outer ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[80, 4, 32, 100]} />
        <meshStandardMaterial
          color={0x0ea5e9}
          emissive={0x0ea5e9}
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Smaller torus */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[60, 2, 32, 100]} />
        <meshStandardMaterial
          color={0xd946ef}
          emissive={0xd946ef}
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          size={2}
          color={0x06b6d4}
          sizeAttenuation
          transparent={true}
          opacity={0.6}
        />
      </points>
    </group>
  );
}

export function OrbitalHalo() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 200], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} intensity={1} />
        <pointLight position={[-100, -100, -100]} intensity={0.5} />
        <OrbitalRing />
      </Canvas>
    </div>
  );
}
