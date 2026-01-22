"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaChartLine,
  FaUsers,
  FaStar,
  FaCommentDots,
  FaShareAlt,
  FaQuoteRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

// ===== Types =====
interface StatType {
  value: string;
  label: string;
  iconName: string;
}

interface RealStoryType {
  name: string;
  role: string;
  quote: string;
  impact: string;
}

interface InsightType {
  id: number;
  title: string;
  content: string;
  icon: string;
  color: string;
  borderColor: string;
}

interface CustomerServicesContent {
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    description: string;
  };
  stats: StatType[];
  insights: InsightType[];
  realStories: RealStoryType[];
  uiText: {
    directImpact: string;
    facts: string;
    happyCustomer: string;
    customerInsights: string;
  };
}

// ===== Icon Mapping =====
const iconComponents: Record<string, React.ReactNode> = {
  FaUsers: <FaUsers className="text-3xl" />,
  FaChartLine: <FaChartLine className="text-3xl" />,
  FaShareAlt: <FaShareAlt className="text-3xl" />,
  FaStar: <FaStar className="text-3xl" />,
};

// ===== Main Component =====
export default function CustomerServicesPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<CustomerServicesContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const locale = pathname?.split("/")[1] ?? "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const module = await import(`@/content/${locale}/customer-services`);
        setContent(module.customerServicesContent);
      } catch (error) {
        console.error("Error loading content, falling back to Arabic:", error);
        const fallback = await import(`@/content/ar/customer-services`);
        setContent(fallback.customerServicesContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [locale]);

  const nextInsight = () => {
    if (content) {
      setCurrentInsightIndex((prev) => (prev + 1) % content.insights.length);
    }
  };

  const prevInsight = () => {
    if (content) {
      setCurrentInsightIndex(
        (prev) =>
          (prev - 1 + content.insights.length) % content.insights.length,
      );
    }
  };

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </section>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden min-h-screen py-32 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
            <FaHeart className="text-2xl text-pink-400" />
            <span className="text-pink-400 text-lg font-semibold">
              {content.hero.tagline}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              {content.hero.title}
            </span>
            <span className="block text-2xl md:text-3xl text-gray-300 mt-6">
              {content.hero.subtitle}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {content.hero.description}
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="relative backdrop-blur-sm bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="text-cyan-400 mb-4 flex justify-center">
                {iconComponents[stat.iconName]}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Insights Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mb-20"
        >
          <div className="relative backdrop-blur-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
            <div className="h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="hidden md:block">
                  <div className="p-4 rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <FaCommentDots className="text-4xl text-cyan-400" />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    {content.uiText.facts}
                  </h2>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentInsightIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`p-6 rounded-2xl bg-linear-to-r ${content.insights[currentInsightIndex].color} border ${content.insights[currentInsightIndex].borderColor}`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-3xl">
                            {content.insights[currentInsightIndex].icon}
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {content.insights[currentInsightIndex].title}
                          </h3>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {content.insights[currentInsightIndex].content}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation and Indicators */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={prevInsight}
                      className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
                      aria-label="Previous"
                    >
                      <FaArrowLeft className="text-gray-300" />
                    </button>

                    <div className="flex gap-2">
                      {content.insights.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentInsightIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentInsightIndex
                              ? "bg-linear-to-r from-cyan-500 to-purple-500 w-8"
                              : "bg-gray-600 hover:bg-gray-400"
                          }`}
                          aria-label={`Go to insight ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextInsight}
                      className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
                      aria-label="Next"
                    >
                      <FaArrowRight className="text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real Stories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.realStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ y: -10 }}
                className="relative backdrop-blur-sm bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <FaQuoteRight className="text-white" />
                </div>

                <div className="mb-6">
                  <div className="text-lg font-bold text-white mb-1">
                    {story.name}
                  </div>
                  <div className="text-gray-400 text-sm">{story.role}</div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{story.quote}"
                </p>

                <div className="pt-6 border-t border-gray-700/30">
                  <div className="text-sm text-gray-400">
                    {content.uiText.directImpact}:
                  </div>
                  <div className="text-green-400 font-bold">{story.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
