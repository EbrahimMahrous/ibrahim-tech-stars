"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SimpleConsultationPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<{
    title: string;
    description: string;
    ctaButton: string;
    whatsappNumber: string;
    whatsappMessage: string;
  } | null>(null);
  
  const locale = pathname.split('/')[1] || 'ar';
  const isArabic = locale === 'ar';

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(`@/content/${locale}/consultation`);
        setContent(module.consultationContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(`@/content/ar/consultation`);
        setContent(fallback.consultationContent);
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

  const whatsappLink = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(content.whatsappMessage)}`;
  
  return (
    <section
      id="consultation"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-linear-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white"
      >
        {content.title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl"
      >
        {content.description}
      </motion.p>

      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg hover:shadow-xl transition-all duration-300"
      >
        <FaWhatsapp className="text-2xl" />
        {content.ctaButton}
      </motion.a>
    </section>
  );
}