"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaQuoteRight,
  FaArrowRight,
  FaArrowLeft,
  FaBuilding,
  FaChartLine,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// ============= (Types) =============
type StoryType = {
  id: number;
  company: string;
  challenge: string;
  solution: string;
  result: string;
  icon: string;
  color: string;
  borderColor: string;
  quote: string;
  sector: string;
  duration: string;
  clientType: string;
};

type CircularItemType = {
  id: number;
  text: string;
  description: string;
  icon: string;
  rotation: number;
  delay: number;
};

type StatsType = {
  value: string;
  label: string;
  icon: string;
};

type HeroContentType = {
  tagline: string;
  title: {
    highlighted: string;
    normal: string;
  };
  stories: StoryType[];
  circularItems: CircularItemType[];
  stats: StatsType[];
  sections: {
    client: string;
    challenge: string;
    solution: string;
    result: string;
    storyNumber: (num: number) => string;
    realExperience: string;
    quote: string;
    sector: string;
    duration: string;
    clientType: string;
  };
  buttons: {
    prev: string;
    next: string;
  };
  moreStories: string;
  readMore: string;
};

// =============  (Main Component) =============
export default function HeroSection() {
  const pathname = usePathname();
  const [currentStory, setCurrentStory] = useState(0);
  const [content, setContent] = useState<HeroContentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const locale = pathname.split("/")[1] || "ar";
      
      try {
        const module = await import(
          `@/content/${locale}/components/sections/sales-engineer/hero-section`
        );
        setContent(module.heroContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(
          `@/content/ar/components/sections/sales-engineer/hero-section`
        );
        setContent(fallback.heroContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [pathname]);

  const nextStory = () => {
    if (content) {
      setCurrentStory((prev) => (prev + 1) % content.stories.length);
    }
  };

  const prevStory = () => {
    if (content) {
      setCurrentStory(
        (prev) => (prev - 1 + content.stories.length) % content.stories.length,
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextStory();
    }, 15000);
    return () => clearInterval(interval);
  }, [content]);

  if (isLoading || !content) {
    return (
      <section className="relative overflow-hidden pt-32 pb-16 bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </section>
    );
  }

  const isArabic = pathname.split("/")[1] === "ar";

  return (
    <section className="relative overflow-hidden pt-32 pb-16 bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm mb-5">
            <FaBrain className="text-xl text-purple-400" />
            <span className="text-purple-400 text-base font-semibold">
              {content.tagline}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 mb-1">
              {content.title.highlighted}
            </span>
            <span className="block text-xl md:text-2xl text-gray-300 mt-3">
              {content.title.normal}
            </span>
          </h1>
        </motion.div>

        {/* Central Section - Stories + Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Left column: True stories */}
          <div className="relative">
            <div className="relative backdrop-blur-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
              <div className="h-2 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"></div>

              <div className="p-6">
                {/* Title of the current story */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-linear-to-br ${content.stories[currentStory].color} border border-white/10`}
                    >
                      <span className="text-xl">
                        {content.stories[currentStory].icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {content.sections.storyNumber(currentStory + 1)}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {content.sections.realExperience}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={prevStory}
                      className="p-2 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
                      aria-label={content.buttons.prev}
                    >
                      <FaArrowLeft className="text-gray-300" />
                    </button>
                    <button
                      onClick={nextStory}
                      className="p-2 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
                      aria-label={content.buttons.next}
                    >
                      <FaArrowRight className="text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Story details */}
                <div className="space-y-4 mb-6">
                  {/* Customer */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaBuilding className="text-cyan-400 text-sm" />
                      <h4 className="text-base font-bold text-white">
                        {content.sections.client}:
                      </h4>
                    </div>
                    <p className="text-cyan-300 text-lg font-semibold">
                      {content.stories[currentStory].company}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-2 py-1 text-xs bg-gray-800/50 rounded-full border border-gray-700">
                        {content.stories[currentStory].sector}
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-800/50 rounded-full border border-gray-700">
                        {content.stories[currentStory].duration}
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-800/50 rounded-full border border-gray-700">
                        {content.stories[currentStory].clientType}
                      </span>
                    </div>
                  </div>

                  {/* challenge */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaChartLine className="text-red-400 text-sm" />
                      <h4 className="text-base font-bold text-white">
                        {content.sections.challenge}:
                      </h4>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {content.stories[currentStory].challenge}
                    </p>
                  </div>

                  {/* solution */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaLightbulb className="text-green-400 text-sm" />
                      <h4 className="text-base font-bold text-white">
                        {content.sections.solution}:
                      </h4>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {content.stories[currentStory].solution}
                    </p>
                  </div>

                  {/* Result */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaTrophy className="text-purple-400 text-sm" />
                      <h4 className="text-base font-bold text-white">
                        {content.sections.result}:
                      </h4>
                    </div>
                    <div className="p-3 rounded-xl bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <p className="text-green-300 text-lg font-bold">
                        {content.stories[currentStory].result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer quote */}
                <div className="relative p-4 rounded-xl bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="absolute top-3 left-3 text-purple-400 text-2xl opacity-30">
                    <FaQuoteRight />
                  </div>
                  <p className="text-gray-300 text-base italic text-center relative z-10">
                    "{content.stories[currentStory].quote}"
                  </p>
                  <div className="flex justify-center mt-3">
                    <div className="flex gap-1">
                      {content.stories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStory(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStory
                              ? "bg-linear-to-r from-cyan-500 to-purple-500 w-6"
                              : "bg-gray-600 hover:bg-gray-400"
                          }`}
                          aria-label={`Go to story ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick statistics */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {content.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-3 rounded-xl bg-gray-900/30 border border-gray-700/50"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-lg">{stat.icon}</span>
                    <div className="text-xl text-cyan-400 font-bold">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </div>

          {/* Right column: Image with circular elements */}
          <div className="relative h-125 md:h-137.5"> 
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96"> 
                {/* Circle lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient-circle)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-circle"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                      <stop
                        offset="50%"
                        stopColor="#06B6D4"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor="#10B981"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                  </defs>
                </svg>

                {/* The image is in the middle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="absolute inset-0 m-auto w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl" /* تكبير الصورة */
                >
                  <Image
                    src="/IbrahimMahrous.png"
                    alt="إبراهيم محروس - مهندس مبيعات تقني"
                    width={288}
                    height={288}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {/* Glow effect around the image */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-pulse"></div>
                </motion.div>

                {/* Surrounding circular elements */}
                {content.circularItems.map((item) => {
                  const radius = 160;
                  const angle = (item.rotation * Math.PI) / 180;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: x,
                        y: y,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: item.delay,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute left-1/2 top-1/2 w-32 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ x: x, y: y }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="mx-auto mb-1 w-12 h-12 rounded-full bg-linear-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xl shadow-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {item.icon}
                        </motion.div>
                        <h3 className="text-sm font-bold text-white mb-1">
                          {item.text}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel section for bonus stories */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {content.moreStories || (isArabic ? "المزيد من قصص النجاح" : "More Success Stories")}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevStory}
                className="p-2 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
                aria-label={content.buttons.prev}
              >
                <FaArrowLeft className="text-gray-300" />
              </button>
              <button
                onClick={nextStory}
                className="p-2 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
                aria-label={content.buttons.next}
              >
                <FaArrowRight className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* The carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {content.stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`shrink-0 w-72 rounded-xl border ${story.borderColor
                    } overflow-hidden backdrop-blur-sm ${index === currentStory
                      ? "ring-2 ring-purple-500/50"
                      : "border-gray-700/50"
                    }`}
                  onClick={() => setCurrentStory(index)}
                >
                  <div className={`h-2 ${story.color}`}></div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{story.icon}</div>
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          {story.company}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {story.sector} • {story.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {story.challenge}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold text-sm">
                        {story.result.split(" ")[0]}
                      </span>
                      <button className="text-purple-400 text-xs hover:text-purple-300 transition-colors">
                        {content.readMore || (isArabic ? "قراءة المزيد" : "Read More")} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {content.stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentStory
                      ? "bg-linear-to-r from-cyan-500 to-purple-500 w-8"
                      : "bg-gray-600 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}