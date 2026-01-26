"use client";

import { motion } from "framer-motion";
import {
  FaCertificate,
  FaClock,
  FaBuilding,
  FaChartLine
} from "react-icons/fa";

interface HeroSectionProps {
  content: {
    hero: {
      title: string;
      description: string;
    };
    stats: {
      totalCertificates: number;
      totalHours: number;
      organizations: number;
      successRate: string;
    };
    labels: {
      certificates: string;
      trainingHours: string;
      organizations: string;
      successRate: string;
    };
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
          {content.hero.title}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          {content.hero.description}
        </p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-linear-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30">
            <div className="flex items-center justify-center gap-3">
              <FaCertificate className="text-3xl text-blue-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {content.stats.totalCertificates}
                </div>
                <div className="text-sm text-gray-300">
                  {content.labels.certificates}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-900/30 to-emerald-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-700/30">
            <div className="flex items-center justify-center gap-3">
              <FaClock className="text-3xl text-green-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {content.stats.totalHours}+
                </div>
                <div className="text-sm text-gray-300">
                  {content.labels.trainingHours}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-900/30 to-pink-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30">
            <div className="flex items-center justify-center gap-3">
              <FaBuilding className="text-3xl text-purple-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {content.stats.organizations}
                </div>
                <div className="text-sm text-gray-300">
                  {content.labels.organizations}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-amber-900/30 to-orange-800/20 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30">
            <div className="flex items-center justify-center gap-3">
              <FaChartLine className="text-3xl text-amber-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {content.stats.successRate}
                </div>
                <div className="text-sm text-gray-300">
                  {content.labels.successRate}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}