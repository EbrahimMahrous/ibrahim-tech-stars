"use client";

import { Sparkles as DreiSparkles } from "@react-three/drei";

export default function Sparkles() {
  return (
    <DreiSparkles
      count={100}
      scale={20}
      size={1}
      speed={0.3}
      color="#00ff99"
    />
  );
}