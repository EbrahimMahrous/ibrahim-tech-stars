"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCode } from "react-icons/fi";
import {
  FloatingPlanet,
  SpaceParticles,
  Stars,
  Sparkles,
} from "@/components/3d";
import { usePathname } from "next/navigation";

export default function HeroSection() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(
          `@/content/${locale}/components/sections/hero-section`
        );
        setContent(module.heroSectionContent);
      } catch (error) {
        console.error("Error loading hero section content:", error);
        const fallback = await import(
          `@/content/ar/components/sections/hero-section`
        );
        setContent(fallback.heroSectionContent);
      }
    };

    loadContent();
  }, [locale]);

  if (!content) {
    return (
      <section className="min-h-screen relative py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center">
          <div className="text-center">
            {/* Loading indicator with line next to circle */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                {/* Animated circle */}
                <div className="relative flex items-center">
                  <span className="absolute w-2 h-2 bg-gray-800/60 rounded-full animate-ping" />
                  <span className="w-2 h-2 bg-gray-800/60 rounded-full relative" />
                </div>
                {/* Line next to circle */}
                <div className="h-2 w-16 bg-linear-to-r bg-gray-800/60 rounded-full ml-1" />
              </div>
            </div>

            {/* Title skeleton */}
            <div className="mb-10">
              <div className="h-9 md:h-11 lg:h-14 bg-gray-800/80 rounded-md max-w-2xl mx-auto mb-4 animate-pulse" />
              <div className="h-6 md:h-8 bg-gray-800/60 rounded-md max-w-xl mx-auto animate-pulse" />
            </div>

            {/* Description text skeleton */}
            <div className="max-w-xl mx-auto mb-12 space-y-2.5">
              <div className="h-3 bg-gray-800/70 rounded-full animate-pulse" />
              <div className="h-3 bg-gray-800/70 rounded-full w-10/12 mx-auto animate-pulse" />
              <div className="h-3 bg-gray-800/70 rounded-full w-9/12 mx-auto animate-pulse" />
              <div className="h-3 bg-gray-800/70 rounded-full w-8/12 mx-auto animate-pulse" />
            </div>

            {/* Button skeletons */}
            <div className="flex gap-3 justify-center">
              <div className="w-36 h-10 bg-linear-to-r from-gray-700/70 to-gray-600/70 rounded-full animate-pulse" />
              <div className="w-36 h-10 bg-gray-800/50 rounded-full border border-gray-700/50 animate-pulse" />
            </div>
          </div>

          {/* Scroll indicator skeleton */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              {/* Animated arrow */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-5 h-8 border border-gray-700 rounded-full flex justify-center relative"
              >
                {/* Vertical line */}
                <div className="absolute top-2 w-px h-3 bg-linear-to-b from-gray-600 to-gray-800" />
                {/* Right diagonal line */}
                <div className="absolute bottom-2 right-1 w-px h-2 bg-gray-600 transform rotate-45" />
                {/* Left diagonal line */}
                <div className="absolute bottom-2 left-1 w-px h-2 bg-gray-600 transform -rotate-45" />
              </motion.div>
            </div>
          </div>

          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-800/5 rounded-full blur-xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-800/5 rounded-full blur-xl" />
            {/* Dynamic background lines */}
            <div className="absolute top-1/3 left-1/3 w-1 h-20 bg-linear-to-b from-transparent via-gray-800/20 to-transparent" />
            <div className="absolute bottom-1/3 right-1/3 w-1 h-16 bg-linear-to-b from-transparent via-gray-800/20 to-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={content.elements.heroId}
      className="min-h-screen relative py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="cursor-pointer"
        >
          <Suspense fallback={null}>
            <SpaceParticles count={1500} />
            <ambientLight intensity={0.3} color="#001122" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.8}
              color="#0099ff"
            />
            <directionalLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#00ff99"
            />
            <FloatingPlanet />
            <Sparkles />
            <Environment preset="night" />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              minDistance={5}
              maxDistance={15}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-green-400">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm md:text-base">{content.status}</span>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block bg-linear-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient">
              {content.title.welcome}
            </span>
            <span className="block text-white mt-4 text-3xl md:text-5xl">
              {content.title.journey}
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {content.description.part1}{" "}
            <span className="text-cyan-400 font-semibold">
              {content.description.name}
            </span>
            {content.description.part2}{" "}
            <span className="text-green-400">{content.description.vision}</span>{" "}
            {content.description.part3}
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 rounded-full bg-linear-to-r from-green-500 to-cyan-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById(content.elements.contactSectionId)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiMail /> {content.buttons.startProject.text}
            </motion.button>

            <motion.button
              className="px-8 py-3 rounded-full text-white border border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById(content.elements.projectsSectionId)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiCode /> {content.buttons.viewProjects.text}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-sm mb-2">{content.scrollIndicator}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gray-500 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
