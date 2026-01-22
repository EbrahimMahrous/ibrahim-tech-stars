"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/sales-engineer/HeroSection";
import ObjectionsSection from "@/components/sections/sales-engineer/ObjectionsSection";

// ===== Types =====
interface SalesEngineerContent {
  ctaSection: {
    title: string;
    description: string;
    buttons: {
      schedule: string;
      request: string;
    };
    footer: string;
  };
}

export default function SalesEngineerPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<SalesEngineerContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const module = await import(`@/content/${locale}/sales-engineer`);
        setContent(module.salesEngineerContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(`@/content/ar/sales-engineer`);
        setContent(fallback.salesEngineerContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [locale]);

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <HeroSection />
      <ObjectionsSection />

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-cyan-400 to-blue-400">
              {content.ctaSection.title}
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {content.ctaSection.description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-linear-to-r from-green-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-lg"
            >
              {content.ctaSection.buttons.schedule}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20 text-lg"
            >
              {content.ctaSection.buttons.request}
            </motion.button>
          </div>

          <p className="text-gray-400 mt-8 text-sm">
            {content.ctaSection.footer}
          </p>
        </div>
      </motion.div>
    </section>
  );
}