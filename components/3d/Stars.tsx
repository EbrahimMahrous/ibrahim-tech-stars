"use client";

import { Stars as DreiStars } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Stars() {
  const [colorsConfig, setColorsConfig] = useState({
    starColor: "#ffffff",
    neonCyan: "#00ffff",
    neonGreen: "#00ff99",
    primary: "#10b981",
    secondary: "#06b6d4",
  });

  const [starsConfig, setStarsConfig] = useState({
    radius: 100,
    depth: 50,
    count: 5000,
    factor: 4,
    saturation: 0,
    speed: 0.5,
  });

  // Function to read CSS Custom Properties
  const getCSSVariable = (variableName: string, defaultValue: string) => {
    if (typeof window === "undefined") return defaultValue;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    return value || defaultValue;
  };

  // A function to read numerical values ​​from CSS Variables
  const getCSSNumber = (variableName: string, defaultValue: number) => {
    if (typeof window === "undefined") return defaultValue;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    return value ? parseFloat(value) : defaultValue;
  };

  // Loading settings from CSS Variables
  useEffect(() => {
    const loadConfig = () => {
      setColorsConfig({
        starColor: getCSSVariable("--star-color", "#ffffff"),
        neonCyan: getCSSVariable("--color-neon-cyan", "#00ffff"),
        neonGreen: getCSSVariable("--color-neon-green", "#00ff99"),
        primary: getCSSVariable("--color-primary", "#10b981"),
        secondary: getCSSVariable("--color-secondary", "#06b6d4"),
      });

      setStarsConfig({
        radius: getCSSNumber("--stars-radius", 100),
        depth: getCSSNumber("--stars-depth", 50),
        count: getCSSNumber("--stars-count", 5000),
        factor: getCSSNumber("--stars-factor", 4),
        saturation: getCSSNumber("--stars-saturation", 0),
        speed: getCSSNumber("--stars-speed", 0.5),
      });
    };

    loadConfig();

    // Reload settings when changing mode (dark/light)
    const observer = new MutationObserver(() => {
      loadConfig();
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <DreiStars
      radius={starsConfig.radius}
      depth={starsConfig.depth}
      count={starsConfig.count}
      factor={starsConfig.factor}
      saturation={starsConfig.saturation}
      fade
      speed={starsConfig.speed}
    />
  );
}
