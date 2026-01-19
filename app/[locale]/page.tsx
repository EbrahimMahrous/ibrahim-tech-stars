"use client";

import HeroSection from "@/components/sections/HeroSection";
import ArabCountriesSection from "@/components/sections/ArabCountriesSection";
import SkillsSection from "@/components/sections/ServicesSection";
import ConsultationSection from "@/components/sections/ConsultationSection";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <main>
        <HeroSection />
        <ArabCountriesSection />
        <SkillsSection />
        <ConsultationSection />
      </main>
    </div>
  );
}
