"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function WordPressPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(
          `@/content/${locale}/web-solutions/wordpress`
        );
        setContent(module.wordPressContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(`@/content/ar/web-solutions/wordpress`);
        setContent(fallback.wordPressContent);
      }
    };

    loadContent();
  }, [locale]);

  if (!content) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center bg-linear-to-b from-gray-900 via-black to-gray-900 text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        {content.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gray-300"
      >
        {content.description}
      </motion.p>
    </section>
  );
}
