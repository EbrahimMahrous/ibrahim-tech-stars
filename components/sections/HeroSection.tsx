"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCode } from "react-icons/fi";
import {
  FloatingPlanet,
  SpaceParticles,
  Stars,
  Sparkles,
} from "@/components/3d";

export default function HeroSection() {
  return (
    <section
      id="الرئيسية"
      className="min-h-screen relative py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="cursor-pointer"
        >
          <Suspense fallback={null}>
            {/* <Stars /> */}
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
        {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" /> */}
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
            <span className="text-sm md:text-base">جاهز لمشاريعكم الجديدة</span>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block bg-linear-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient">
              أهلاً وسهلاً
            </span>
            <span className="block text-white mt-4 text-3xl md:text-5xl">
              في رحلتكم الرقمية نحو التميز
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            أنا <span className="text-cyan-400 font-semibold">إبراهيم</span>،
            فريلانسر متخصص في بناء منصات رقمية مبتكرة تلبي رؤية{" "}
            <span className="text-green-400">2030</span> مع تركيز على تقديم حلول
            تقنية عالية الجودة تناسب السوق الخليجي والعربي وفق معايير عالمية
            وأداء فائق
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
                  .getElementById("التواصل")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiMail /> نبدأ مشروعكم
            </motion.button>

            <motion.button
              className="px-8 py-3 rounded-full text-white border border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("المشاريع")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiCode /> معرض أعمالي
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
          <span className="text-sm mb-2">استمر في التصفح</span>
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
