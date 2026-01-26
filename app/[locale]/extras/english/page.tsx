"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaTimes,
  FaCheckCircle,
  FaCircle,
  FaFlagCheckered,
  FaYoutube,
  FaClock,
  FaMicrophone,
  FaCalendar,
  FaChevronDown,
  FaVolumeUp,
  FaBrain,
  FaChild,
  FaGraduationCap,
  FaSpinner,
} from "react-icons/fa";

// ==================== MAIN PAGE COMPONENT ====================
export default function EnglishPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const locale = pathname.split("/")[1] || "en";
  const isArabic = locale === "ar";

  // Load content based on locale
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const module = await import(`@/content/${locale}/extras/english`);
        setContent(module.englishContent);
      } catch (error) {
        console.error("Error loading content:", error);
        // Fallback to English
        const fallback = await import(`@/content/en/extras/english`);
        setContent(fallback.englishContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [locale]);

  // Open video modal
  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = "hidden";
  };

  // Close video modal
  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // Toggle accordion
  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">
            {isArabic
              ? content?.labels?.loadingText || "جاري التحميل..."
              : content?.labels?.loadingPortfolio || "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <p className="text-red-400">
            {isArabic
              ? content?.labels?.failedToLoad || "فشل تحميل المحتوى"
              : content?.labels?.failedToLoad || "Failed to load content"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen pt-20 md:pt-32 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white overflow-x-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ==================== LANGUAGE JOURNEY SECTION ==================== */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-green-400">
              {content.journey.title}
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {content.journey.description}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 right-4 md:left-1/2 md:right-1/2 h-1 bg-linear-to-r from-blue-500 via-green-500 to-purple-500 top-8" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {content.journey.levels.map((level: any, index: number) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`relative group ${index === 2 ? "scale-105" : ""}`}
                  >
                    <div
                      className={`
                      p-6 rounded-xl border-2 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm shadow-sm
                      ${
                        level.status === "completed"
                          ? "border-green-500/50 hover:border-green-400 bg-green-900/10"
                          : level.status === "current"
                            ? "border-blue-500/50 hover:border-blue-400 shadow-md shadow-blue-500/20 bg-blue-900/20"
                            : "border-gray-600/50 hover:border-gray-400 bg-gray-800/20"
                      }
                      group-hover:shadow-lg
                    `}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`
                          w-12 h-12 rounded-full flex items-center justify-center shadow-md
                          ${
                            level.status === "completed"
                              ? "bg-green-900 border-2 border-green-400"
                              : level.status === "current"
                                ? "bg-blue-900 border-2 border-blue-400"
                                : "bg-gray-800 border-2 border-gray-400"
                          }
                        `}
                        >
                          {level.status === "completed" ? (
                            <FaCheckCircle className="text-green-400 text-xl" />
                          ) : level.status === "current" ? (
                            <div className="relative">
                              <FaCircle className="text-blue-400 text-2xl" />
                            </div>
                          ) : (
                            <FaFlagCheckered className="text-gray-400 text-xl" />
                          )}
                        </div>
                      </div>

                      <div className="pt-6 text-center">
                        <h3
                          className={`text-lg font-bold mb-2 ${
                            level.status === "current"
                              ? "text-blue-300"
                              : "text-gray-300"
                          }`}
                        >
                          {level.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700/50">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">
                {content.journey.currentLevel}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURED VIDEO SECTION ==================== */}
      <section className="py-12 md:py-20 container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-pink-400">
              {content.featuredVideo.title}
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-2">
            {content.featuredVideo.subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-800/30 backdrop-blur-sm shadow-xl border border-gray-700">
              <div className="aspect-video relative overflow-hidden bg-linear-to-br from-blue-900/20 to-purple-900/20">
                {/* YouTube thumbnail */}
                <div
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => openVideoModal(content.featuredVideo.id)}
                >
                  <div className="text-center p-4 md:p-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                      <FaPlay className="text-white text-xl md:text-2xl ml-0.5 md:ml-1" />
                    </div>
                    {/* <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white px-2">
                      {content.featuredVideo.videoTitle}
                    </h3> */}
                    <p className="text-gray-300 mb-4 md:mb-6 max-w-md text-sm md:text-base px-2">
                      {content.featuredVideo.videoDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                      <span className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-900/50 text-blue-300 rounded-full text-xs md:text-sm flex items-center justify-center gap-1">
                        <FaYoutube className="text-xs" />{" "}
                        {content.featuredVideo.videoType}
                      </span>
                      {/* <span className="px-2 md:px-3 py-1 md:py-1.5 bg-green-900/50 text-green-300 rounded-full text-xs md:text-sm flex items-center justify-center gap-1">
                        <FaMicrophone className="text-xs" />{" "}
                        {content.featuredVideo.level}
                      </span> */}
                      {/* <span className="px-2 md:px-3 py-1 md:py-1.5 bg-purple-900/50 text-purple-300 rounded-full text-xs md:text-sm flex items-center justify-center gap-1">
                        <FaClock className="text-xs" />{" "}
                        {content.featuredVideo.duration}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 text-blue-400 flex items-center gap-2">
                      <FaBrain className="text-sm" />{" "}
                      {content.featuredVideo.sections.goal.title}
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base">
                      {content.featuredVideo.sections.goal.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 text-teal-400 flex items-center gap-2">
                      <FaChild className="text-sm" />{" "}
                      {content.featuredVideo.sections.topic.title}
                    </h4>
                    <div className="space-y-3 md:space-y-4">
                      <div className="bg-gray-800/40 p-3 md:p-4 rounded-lg">
                        <p className="text-xs md:text-sm text-gray-300">
                          <span className="font-medium text-white">
                            {content.featuredVideo.sections.topic.contentLabel}
                            :{" "}
                          </span>
                          {content.featuredVideo.sections.topic.content}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {content.featuredVideo.sections.topic.tags.map(
                          (tag: string, i: number) => (
                            <span
                              key={tag}
                              className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-800/50 rounded-full text-xs md:text-sm border border-gray-700 hover:border-blue-500/50 transition-colors"
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-r from-blue-500 to-teal-500 flex items-center justify-center shadow-md">
                        <span className="font-bold text-white text-sm md:text-base">
                          B1
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm md:text-base">
                          {content.featuredVideo.demoType}
                        </p>
                        <p className="text-xs md:text-sm text-gray-400">
                          {content.featuredVideo.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="hidden sm:block px-3 md:px-4 py-1.5 md:py-2 bg-linear-to-r from-pink-600 to-purple-600 text-white rounded-full text-xs md:text-sm font-medium">
                        {content.featuredVideo.hashtags[0]}
                      </span>
                      <button
                        onClick={() => openVideoModal(content.featuredVideo.id)}
                        className="px-4 md:px-6 py-2 md:py-3 bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium flex items-center gap-2 text-sm md:text-base"
                      >
                        <FaPlay className="text-xs" />{" "}
                        {content.featuredVideo.watchButton}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-8 text-center"
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {content.featuredVideo.hashtags.map((tag: string, i: number) => (
                <span
                  key={tag}
                  className="px-3 md:px-4 py-1 md:py-2 bg-gray-800/40 rounded-full text-xs md:text-sm text-gray-300 border border-gray-700 hover:border-blue-500/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ACCORDION SECTION ==================== */}
      <section className="py-12 md:py-20 container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-green-400 to-teal-400">
              {content.faqs.title}
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-2">
            {content.faqs.description}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {content.faqs.items.map((faq: any, index: number) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-3 md:mb-4"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className={`w-full flex items-center justify-between p-4 md:p-6 rounded-lg md:rounded-xl transition-all duration-300 text-left ${
                  openAccordion === faq.id
                    ? "bg-linear-to-r from-blue-900/50 to-teal-900/50 border-2 border-blue-700 text-blue-300"
                    : "bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700 text-gray-300"
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mt-0.5 ${
                      openAccordion === faq.id
                        ? "bg-blue-900/50 text-blue-400"
                        : "bg-gray-700/50 text-gray-400"
                    }`}
                  >
                    {faq.icon === "graduation" && (
                      <FaGraduationCap className="text-sm md:text-base" />
                    )}
                    {faq.icon === "volume" && (
                      <FaVolumeUp className="text-sm md:text-base" />
                    )}
                    {faq.icon === "brain" && (
                      <FaBrain className="text-sm md:text-base" />
                    )}
                    {faq.icon === "flag" && (
                      <FaFlagCheckered className="text-sm md:text-base" />
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold pr-2">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openAccordion === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${openAccordion === faq.id ? "text-blue-400" : "text-gray-400"}`}
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {openAccordion === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 bg-gray-800/20 rounded-b-lg md:rounded-b-xl border border-gray-700 border-t-0">
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== VIDEO MODAL (Responsive) ==================== */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
              >
                <FaTimes className="text-white text-lg sm:text-xl" />
              </button>

              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={content.featuredVideo.videoTitle}
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                      {content.featuredVideo.videoTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <FaYoutube className="text-xs" />{" "}
                        {content.featuredVideo.videoType}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />{" "}
                        {content.featuredVideo.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-xs" />{" "}
                        {content.featuredVideo.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMicrophone className="text-xs" />{" "}
                        {content.featuredVideo.level}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                    {content.featuredVideo.modalTag}
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-400">
                      {content.featuredVideo.modalSections.description.title}
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {content.featuredVideo.modalSections.description.content}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-teal-400">
                      {content.featuredVideo.modalSections.notes.title}
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {content.featuredVideo.modalSections.notes.content}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-800">
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-pink-400">
                      {content.featuredVideo.modalSections.hashtags.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {content.featuredVideo.modalSections.hashtags.tags.map(
                        (tag: string, i: number) => (
                          <span
                            key={tag}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800/50 rounded-full text-xs sm:text-sm border border-gray-700"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
