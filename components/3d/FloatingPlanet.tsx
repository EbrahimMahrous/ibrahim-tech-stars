"use client";

import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export default function FloatingPlanet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!planetRef.current || !ringRef.current || !glowRef.current) return;
    planetRef.current.rotation.y +=
      (mouse.x * 0.3 - planetRef.current.rotation.y * 0.5) * 0.03;
    planetRef.current.rotation.x +=
      (mouse.y * 0.2 - planetRef.current.rotation.x * 0.5) * 0.03;

    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    ringRef.current.rotation.y += 0.002;
    const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + 0.9;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color="#00ff99"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      <Float speed={2} floatIntensity={0.5} rotationIntensity={0.5}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#00ff99"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#0099ff"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.sin(Date.now() * 0.001 + i * 2) * 3,
            Math.cos(Date.now() * 0.001 + i * 2) * 2,
            Math.sin(Date.now() * 0.001 + i) * 3,
          ]}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={i === 0 ? "#ff6b6b" : i === 1 ? "#4ecdc4" : "#45b7d1"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
