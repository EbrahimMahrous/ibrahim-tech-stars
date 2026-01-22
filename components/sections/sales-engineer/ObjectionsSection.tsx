"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaChevronDown,
  FaLightbulb,
  FaChartLine,
  FaHandshake,
  FaEye,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// ===== Types =====
interface Objection {
  objection: string;
  icon: string;
  analysis: string;
  strategy: string[];
  gradient: string;
  color: "blue" | "purple" | "cyan" | "pink" | "green";
  stats: string;
}

interface Principle {
  icon: string;
  text: string;
  details: string;
}

interface ObjectionsContent {
  header: {
    tagline: string;
    title: string;
    highlightedTitle: string;
    description: string;
    commonPhrases: {
      price: string;
      time: string;
      provider: string;
    };
    explanation: string;
  };
  story: {
    title: string;
    paragraphs: string[];
    insight: {
      title: string;
      content: string;
    };
    examples: {
      thinking: string;
      meaning: string;
      provider: string;
      meaning2: string;
    };
  };
  objections: Objection[];
  principles: Principle[];
  uiText: {
    clickToShow: string;
    clickToHide: string;
    whatBehind: string;
    whatToDo: string;
    example: string;
    remember: string;
    secret: string;
  };
}

// ===== Main Component =====
export default function ObjectionsSection() {
  const pathname = usePathname();
  const [content, setContent] = useState<ObjectionsContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const locale = pathname.split("/")[1] || "ar";

      try {
        const module = await import(
          `@/content/${locale}/components/sections/sales-engineer/objections-section`
        );
        setContent(module.objectionsContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(
          `@/content/ar/components/sections/sales-engineer/objections-section`
        );
        setContent(fallback.objectionsContent as ObjectionsContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [pathname]);

  const getColorClasses = (color: Objection["color"]) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-500",
          text: "text-blue-400",
          light: "bg-blue-400/10",
          border: "border-blue-400/30",
          gradient: "from-blue-500/20 via-blue-400/10 to-blue-500/5",
        };
      case "purple":
        return {
          bg: "bg-purple-500",
          text: "text-purple-400",
          light: "bg-purple-400/10",
          border: "border-purple-400/30",
          gradient: "from-purple-500/20 via-purple-400/10 to-purple-500/5",
        };
      case "cyan":
        return {
          bg: "bg-cyan-500",
          text: "text-cyan-400",
          light: "bg-cyan-400/10",
          border: "border-cyan-400/30",
          gradient: "from-cyan-500/20 via-cyan-400/10 to-cyan-500/5",
        };
      case "pink":
        return {
          bg: "bg-pink-500",
          text: "text-pink-400",
          light: "bg-pink-400/10",
          border: "border-pink-400/30",
          gradient: "from-pink-500/20 via-pink-400/10 to-pink-500/5",
        };
      case "green":
        return {
          bg: "bg-green-500",
          text: "text-green-400",
          light: "bg-green-400/10",
          border: "border-green-400/30",
          gradient: "from-green-500/20 via-green-400/10 to-green-500/5",
        };
    }
  };

  if (isLoading || !content) {
    return (
      <section className="relative overflow-hidden py-20 bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="container relative mx-auto px-4 max-w-6xl flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </section>
    );
  }

  const isArabic = pathname.split("/")[1] === "ar";

  return (
    <section className="relative overflow-hidden py-20 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-400/30 mb-8 backdrop-blur-sm"
          >
            <FaBrain className="text-purple-400 text-xl" />
            <span className="text-purple-400 font-semibold">
              {content.header.tagline}
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {content.header.title}{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl opacity-30"></span>
              <span className="relative bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {content.header.highlightedTitle}
              </span>
            </span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              {content.header.description}
              <span className="text-blue-400 font-medium">
                {" "}
                "{content.header.commonPhrases.price}"
              </span>
              ،
              <span className="text-purple-400 font-medium">
                {" "}
                "{content.header.commonPhrases.time}"
              </span>
              ،
              <span className="text-pink-400 font-medium">
                {" "}
                "{content.header.commonPhrases.provider}"
              </span>
              .
            </p>
            <p className="text-gray-400">{content.header.explanation}</p>
          </div>
        </motion.div>

        {/* Main Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative backdrop-blur-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="relative p-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                {content.story.title}
              </h2>

              <div className="space-y-6">
                {content.story.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="relative backdrop-blur-md bg-linear-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-400/20 my-6">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl"></div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-blue-400 mb-3">
                      {content.story.insight.title}
                    </h3>
                    <p className="text-cyan-300">
                      {content.story.insight.content}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {content.story.examples.thinking}
                  <span className="text-purple-400 font-medium">
                    {" "}
                    "{content.story.examples.meaning}"
                  </span>{" "}
                  {content.story.examples.provider}
                  <span className="text-pink-400 font-medium">
                    {" "}
                    "{content.story.examples.meaning2}"
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Practical Guide */}
        <div className="mb-20">
          <div className="space-y-8">
            {content.objections.map((item, index) => {
              const colors = getColorClasses(item.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden border ${
                    activeIndex === index
                      ? `border-blue-400/50 shadow-lg shadow-blue-500/20`
                      : "border-gray-700/50 hover:border-gray-600/50"
                  } backdrop-blur-sm bg-linear-to-br from-gray-900/40 to-gray-900/20`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-gray-900/60 to-gray-900/30"></div>

                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? -1 : index)
                    }
                    className="relative w-full p-6 text-right flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    aria-expanded={activeIndex === index}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg bg-linear-to-br ${item.gradient}/20 border ${colors.border}`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {item.objection}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {activeIndex === index
                            ? content.uiText.clickToHide
                            : content.uiText.clickToShow}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${colors.light} ${colors.text} border ${colors.border}`}
                      >
                        {item.stats}
                      </span>
                      <FaChevronDown
                        className={`text-gray-400 transition-transform duration-300 ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative px-6 pb-6 border-t border-gray-700/50">
                          <div className="grid md:grid-cols-2 gap-8 pt-6">
                            {/* What's Behind */}
                            <div>
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className={`${colors.text}`}>🤔</span>{" "}
                                {content.uiText.whatBehind}
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {item.analysis}
                              </p>

                              <div className="mt-4 p-4 rounded-lg bg-linear-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                                <p className="text-sm text-gray-400">
                                  <strong className="text-white">
                                    {content.uiText.remember}:
                                  </strong>{" "}
                                  {content.uiText.secret}
                                </p>
                              </div>
                            </div>

                            {/* What to Do */}
                            <div>
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className={`${colors.text}`}>🚀</span>{" "}
                                {content.uiText.whatToDo}
                              </h4>

                              <div className="space-y-3">
                                {item.strategy.map((step, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 rounded-lg backdrop-blur-sm bg-linear-to-r from-blue-500/10 via-purple-500/5 to-pink-500/5 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                                  >
                                    <span
                                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${colors.light} ${colors.text}`}
                                    >
                                      {i + 1}
                                    </span>
                                    <p className="text-gray-300">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Simple Example */}
                          <div className="mt-8 pt-6 border-t border-gray-700/50">
                            <h5 className="font-bold text-white mb-3">
                              {content.uiText.example}:
                            </h5>
                            <div className="relative backdrop-blur-sm bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-gray-700/30">
                              <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg"></div>
                              <div className="relative">
                                <p className="text-gray-300">
                                  {isArabic
                                    ? `إذا قال العميل: "${item.objection}"، قل: `
                                    : `If the client says: "${item.objection}", say: `}
                                  <span
                                    className={`${colors.text} font-medium`}
                                  >
                                    {isArabic
                                      ? "أتفهم. دعني أوضح لك كيف سيرجع لك هذا الاستثمار خلال ٣ أشهر..."
                                      : "I understand. Let me show you how this investment will return in 3 months..."}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
