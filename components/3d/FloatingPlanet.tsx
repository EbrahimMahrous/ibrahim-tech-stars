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
  const [colors, setColors] = useState({
    primary: "#10b981",
    primaryLight: "#34d399",
    secondary: "#06b6d4",
    secondaryLight: "#22d3ee",
    accent: "#8b5cf6",
    accentLight: "#a78bfa",
    neonGreen: "#00ff99",
    neonCyan: "#00ffff",
    neonPurple: "#bf00ff",
    neonPink: "#ff00ff",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  });

  // Function to read CSS Custom Properties
  const getCSSVariable = (variableName: string) => {
    if (typeof window === "undefined") return "";
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  };

  // Loading colors from CSS Variables
  useEffect(() => {
    const loadColors = () => {
      setColors({
        primary: getCSSVariable("--color-primary") || "#10b981",
        primaryLight: getCSSVariable("--color-primary-light") || "#34d399",
        secondary: getCSSVariable("--color-secondary") || "#06b6d4",
        secondaryLight: getCSSVariable("--color-secondary-light") || "#22d3ee",
        accent: getCSSVariable("--color-accent") || "#8b5cf6",
        accentLight: getCSSVariable("--color-accent-light") || "#a78bfa",
        neonGreen: getCSSVariable("--color-neon-green") || "#00ff99",
        neonCyan: getCSSVariable("--color-neon-cyan") || "#00ffff",
        neonPurple: getCSSVariable("--color-neon-purple") || "#bf00ff",
        neonPink: getCSSVariable("--color-neon-pink") || "#ff00ff",
        danger: getCSSVariable("--color-danger") || "#ef4444",
        warning: getCSSVariable("--color-warning") || "#f59e0b",
        info: getCSSVariable("--color-info") || "#3b82f6",
      });
    };

    loadColors();

    // Colors are reloaded when changing mode (dark/light)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          loadColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

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
      {/* external glow */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color={colors.neonGreen}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main planet */}
      <Float speed={2} floatIntensity={0.5} rotationIntensity={0.5}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color={colors.primaryLight}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Episode */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={colors.secondaryLight}
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={2}
        />
      </mesh>

      {/* Little moons */}
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
            color={
              i === 0
                ? colors.neonPink
                : i === 1
                  ? colors.neonCyan
                  : colors.neonPurple
            }
            metalness={0.8}
            roughness={0.2}
            emissive={
              i === 0
                ? colors.neonPink
                : i === 1
                  ? colors.neonCyan
                  : colors.neonPurple
            }
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Additional particles */}
      {[3, 4, 5].map((i) => (
        <mesh
          key={`small-${i}`}
          position={[
            Math.sin(Date.now() * 0.001 + i * 1.5) * 4,
            Math.cos(Date.now() * 0.001 + i * 1.5) * 3,
            Math.cos(Date.now() * 0.001 + i) * 4,
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={
              i === 3
                ? colors.accentLight
                : i === 4
                  ? colors.info
                  : colors.warning
            }
            metalness={0.7}
            roughness={0.3}
            emissive={
              i === 3
                ? colors.accentLight
                : i === 4
                  ? colors.info
                  : colors.warning
            }
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
