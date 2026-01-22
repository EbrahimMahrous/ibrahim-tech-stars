"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

export default function SpaceParticles({ count = 1000 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const [colorsConfig, setColorsConfig] = useState({
    primary: "#10b981",
    secondary: "#06b6d4",
    accent: "#8b5cf6",
    neonGreen: "#00ff99",
    neonCyan: "#00ffff",
    neonPurple: "#bf00ff",
    neonPink: "#ff00ff",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  });

  // Function to read CSS Custom Properties
  const getCSSVariable = (variableName: string, defaultValue: string) => {
    if (typeof window === "undefined") return defaultValue;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    return value || defaultValue;
  };

  // Loading color settings from CSS Variables
  useEffect(() => {
    const loadColorsConfig = () => {
      setColorsConfig({
        primary: getCSSVariable("--color-primary", "#10b981"),
        secondary: getCSSVariable("--color-secondary", "#06b6d4"),
        accent: getCSSVariable("--color-accent", "#8b5cf6"),
        neonGreen: getCSSVariable("--color-neon-green", "#00ff99"),
        neonCyan: getCSSVariable("--color-neon-cyan", "#00ffff"),
        neonPurple: getCSSVariable("--color-neon-purple", "#bf00ff"),
        neonPink: getCSSVariable("--color-neon-pink", "#ff00ff"),
        danger: getCSSVariable("--color-danger", "#ef4444"),
        warning: getCSSVariable("--color-warning", "#f59e0b"),
        info: getCSSVariable("--color-info", "#3b82f6"),
      });
    };

    loadColorsConfig();

    // Colors are reloaded when changing mode (dark/light)
    const observer = new MutationObserver(() => {
      loadColorsConfig();
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  // Creating Geometry using useMemo
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // Create a color palette from the settings
    const colorPalette = [
      new THREE.Color(colorsConfig.neonGreen),
      new THREE.Color(colorsConfig.neonCyan),
      new THREE.Color(colorsConfig.neonPurple),
      new THREE.Color(colorsConfig.neonPink),
      new THREE.Color(colorsConfig.primary),
      new THREE.Color(colorsConfig.secondary),
      new THREE.Color(colorsConfig.accent),
      new THREE.Color(colorsConfig.info),
    ];

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 0.1 + 0.05;

      // Choose a random color from the palette
      const baseColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];

      // Adding color variety
      const variedColor = new THREE.Color(baseColor);
      const hsl = { h: 0, s: 0, l: 0 };
      variedColor.getHSL(hsl);

      hsl.h = (hsl.h + (Math.random() - 0.5) * 0.2 + 1) % 1;
      hsl.s = Math.max(0.2, Math.min(1, hsl.s + (Math.random() - 0.5) * 0.3));
      hsl.l = Math.max(0.3, Math.min(0.9, hsl.l + (Math.random() - 0.5) * 0.3));

      variedColor.setHSL(hsl.h, hsl.s, hsl.l);

      colors[i * 3] = variedColor.r;
      colors[i * 3 + 1] = variedColor.g;
      colors[i * 3 + 2] = variedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, [count, colorsConfig]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
