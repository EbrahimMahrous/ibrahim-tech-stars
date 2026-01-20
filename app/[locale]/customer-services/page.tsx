"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type ContentType = {
  title: string;
  description: string;
};

export default function CustomerServicesPage() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] ?? "ar";
  const isArabic = locale === "ar";

  const [content, setContent] = useState<ContentType | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(`@/content/${locale}/customer-services`);
        setContent(module.customerServicesContent);
      } catch (error) {
        console.error("Error loading content, falling back to Arabic:", error);
        const fallback = await import(`@/content/ar/customer-services`);
        setContent(fallback.customerServicesContent);
      }
    };

    loadContent();
  }, [locale]);

  if (!content) {
    // Loading state
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </section>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col justify-center items-center text-center bg-linear-to-b from-gray-900 via-black to-gray-900 text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        {content.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-300 text-lg max-w-2xl"
      >
        {content.description}
      </motion.p>
    </section>
  );
}
