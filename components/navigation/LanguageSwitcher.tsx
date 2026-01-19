"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGlobe } from "react-icons/fa";

interface LanguageSwitcherProps {
  isArabic: boolean;
  switchedPath: string;
  switchLanguage: "en" | "ar";
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  isArabic,
  switchedPath,
  switchLanguage,
}) => {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Link
        href={switchedPath}
        className="text-xs text-white px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
        aria-label={isArabic ? "تبديل اللغة" : "Switch language"}
        title={isArabic ? "English Version" : "النسخة العربية"}
        rel="alternate"
        hrefLang={switchLanguage}
      >
        <FaGlobe className="w-3 h-3 text-green-500" />
        {isArabic ? "EN" : "AR"}
      </Link>
    </motion.div>
  );
};

export default LanguageSwitcher;
