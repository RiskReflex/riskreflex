'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Floating Dark Energy Core
function DarkEnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05;
      coreRef.current.rotation.z -= delta * 0.02;

      // Heavy breathing pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={coreRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color="#050505"       
        emissive="#111111"    
        distort={0.4}         
        speed={2}             
        roughness={1}         
        metalness={0}         
      />
    </Sphere>
  );
}

// 2. Inner floating energy particles (Charcoal dots swirling inside)
function InnerEnergyParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <sphereGeometry args={[1.35, 32, 32]} />
      <pointsMaterial 
        color="#333333" 
        size={0.02} 
        transparent 
        opacity={0.8} 
      />
    </points>
  );
}

// 3. NEW: Venting Energy Sparks (Shoots out during exhale)
function EnergySparks() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state, delta) => {
    if (pointsRef.current && materialRef.current) {
      // Slowly rotate the spark cloud
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.z += delta * 0.02;

      // Tap into the exact same heartbeat as the core
      const breath = Math.sin(state.clock.elapsedTime * 2);

      // Only vent particles outward when exhaling (breath > 0)
      const scale = 1.4 + (breath > 0 ? breath * 0.8 : 0);
      pointsRef.current.scale.set(scale, scale, scale);

      // Fade opacity as they travel outward, vanish when inhaling
      materialRef.current.opacity = breath > 0 ? breath * 0.3 : 0;
    }
  });

  return (
    <points ref={pointsRef}>
      {/* A very sparse geometry so it's just a "few particles" as requested */}
      <sphereGeometry args={[1.5, 16, 16]} />
      <pointsMaterial
        ref={materialRef}
        color="#00F0FF" // Cyan energy to match the outer glow
        size={0.025}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function CentralOrb() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        
        <EnergySparks />
        <InnerEnergyParticles />
        <DarkEnergyCore />
        
      </Canvas>
    </div>
  );
}