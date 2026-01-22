"use client";

import { Sparkles as DreiSparkles } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Sparkles() {
  const [colorsConfig, setColorsConfig] = useState({
    neonGreen: "#00ff99",
    neonCyan: "#00ffff",
    neonPurple: "#bf00ff",
    neonPink: "#ff00ff",
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
        neonGreen: getCSSVariable("--color-neon-green", "#00ff99"),
        neonCyan: getCSSVariable("--color-neon-cyan", "#00ffff"),
        neonPurple: getCSSVariable("--color-neon-purple", "#bf00ff"),
        neonPink: getCSSVariable("--color-neon-pink", "#ff00ff"),
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

  return (
    <DreiSparkles
      count={100}
      scale={20}
      size={1}
      speed={0.3}
      color={colorsConfig.neonGreen}
    />
  );
}
