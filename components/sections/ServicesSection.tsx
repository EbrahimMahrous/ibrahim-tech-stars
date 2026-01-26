"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiUsers,
  FiMessageSquare,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiGlobe,
  FiSmartphone,
  FiHelpCircle,
  FiTarget,
  FiHeadphones,
} from "react-icons/fi";
import {
  FaShopify,
  FaRocket,
  FaChartLine,
  FaLock,
  FaSearch,
  FaUserTie,
  FaHandsHelping,
} from "react-icons/fa";
import { SiWordpress } from "react-icons/si";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbBuildingStore, TbDeviceAnalytics } from "react-icons/tb";
import { usePathname } from "next/navigation";

const SendIcon = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const SparkleIcon = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

export default function ServicesSection() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  const [draggedSkill, setDraggedSkill] = useState<string | null>(null);
  const [skillStack, setSkillStack] = useState<string[]>([]);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(
          `@/content/${locale}/components/sections/services-section`
        );
        setContent(module.servicesSectionContent);
      } catch (error) {
        console.error("Error loading services section content:", error);
        const fallback = await import(
          `@/content/ar/components/sections/services-section`
        );
        setContent(fallback.servicesSectionContent);
      }
    };

    loadContent();
  }, [locale]);

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(
          (prev) => (prev + 1) % (content?.services?.length || 1),
        );
      }, 60000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, content]);

  const handleDragStart = (skillName: string) => {
    setDraggedSkill(skillName);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (draggedSkill && !skillStack.includes(draggedSkill)) {
      setSkillStack([...skillStack, draggedSkill]);
    }
    setDraggedSkill(null);
  };

  const removeFromStack = (skillName: string) => {
    setSkillStack(skillStack.filter((skill) => skill !== skillName));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (content?.services?.length || 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + (content?.services?.length || 1)) %
        (content?.services?.length || 1),
    );
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (content?.services?.length || 1));
    }, 5000);
  };

  const getIconComponent = (iconString: string, className = "") => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "🚀": <FaRocket className={className} />,
      "🖥️": <SiWordpress className={className} />,
      "🛒": <RiShoppingCartLine className={className} />,
      "🏪": <FaShopify className={className} />,
      "🏬": <TbBuildingStore className={className} />,
      "🤝": <FiUsers className={className} />,
      "📅": <FiCalendar className={className} />,
      "🎧": <FiHeadphones className={className} />,
      "📱": <FiSmartphone className={className} />,
      "📊": <FaChartLine className={className} />,
      "🔒": <FaLock className={className} />,
      "🔍": <FaSearch className={className} />,
      "👔": <FaUserTie className={className} />,
      "🛠️": <FaHandsHelping className={className} />,
      "📞": <FiHeadphones className={className} />,
      "💬": <FiMessageSquare className={className} />,
      "🎯": <FiTarget className={className} />,
      "⚠️": <FiHelpCircle className={className} />,
      "✅": <FiCheckCircle className={className} />,
      "⏰": <FiClock className={className} />,
      "📈": <FiTrendingUp className={className} />,
      "🌍": <FiGlobe className={className} />,
      "✈️": <FiGlobe className={className} />,
      "📋": <FiCheckCircle className={className} />,
      "👥": <FiUsers className={className} />,
      "🎓": <FiUsers className={className} />,
      "🛍️": <RiShoppingCartLine className={className} />,
      "💳": <RiShoppingCartLine className={className} />,
      "📦": <TbBuildingStore className={className} />,
      "🔎": <FaSearch className={className} />,
      "🛡️": <FaLock className={className} />,
      "🎨": <SiWordpress className={className} />,
      "⚡": <FaRocket className={className} />,
      "☁️": <FiGlobe className={className} />,
      "👨‍🏫": <FaUserTie className={className} />,
      "⚙️": <FaShopify className={className} />,
    };

    return (
      iconMap[iconString] || <span className={className}>{iconString}</span>
    );
  };

  if (!content) {
    return (
      <section
        id="services"
        className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6 text-cyan-400">
              <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm md:text-base">
                {isArabic ? "جاري التحميل..." : "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={content.sectionId}
      className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
      dir={isArabic ? "rtl" : "ltr"}
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-6 animate-pulse">
            <span className="text-cyan-400 text-lg">
              {content.status.badge}
            </span>
            <span className="text-cyan-400 font-medium text-sm sm:text-base">
              {content.status.text}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span
              className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient"
              itemProp="name"
            >
              {content.title}
            </span>
          </h1>

          <motion.p
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span itemProp="description">{content.description}</span>
          </motion.p>

          {/* Organized data for SEO improvement */}
          <div className="hidden">
            <meta itemProp="provider" content={content.meta.provider} />
            <meta itemProp="serviceType" content={content.meta.serviceType} />
            <link itemProp="url" href={content.meta.url} />
            {content.services.map((service: any) => (
              <div
                key={service.id}
                itemProp="hasOfferCatalog"
                itemScope
                itemType="https://schema.org/OfferCatalog"
              >
                <meta itemProp="name" content={service.name} />
                <meta itemProp="description" content={service.shortDesc} />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                {isArabic
                  ? "خدماتي الاحترافية (8 خدمات متكاملة)"
                  : "My Professional Services (8 Integrated Services)"}
                <span className="text-sm text-gray-400 font-normal">
                  {content.ui.carousel.autoSlideInfo}
                </span>
              </h2>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    autoPlay
                      ? "bg-green-500/20 text-green-400 border border-green-400/30"
                      : "bg-red-500/20 text-red-400 border border-red-400/30"
                  }`}
                >
                  {autoPlay
                    ? `⏸️ ${content.ui.carousel.stop}`
                    : `▶️ ${content.ui.carousel.play}`}
                </button>
                <span className="text-sm text-gray-400 hidden sm:block">
                  {content.ui.carousel.dragInstruction}
                </span>
              </div>
            </div>
            <div className="relative group">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-400 hover:from-cyan-500/10 hover:to-transparent transition-all duration-300 transform hover:scale-110"
                  aria-label={content.ui.carousel.previous}
                >
                  {isArabic ? (
                    <FiChevronRight className="w-6 h-6" />
                  ) : (
                    <FiChevronLeft className="w-6 h-6" />
                  )}
                </button>

                <div className="flex flex-col items-center">
                  <div className="text-cyan-400 text-sm mb-1">
                    {content.ui.carousel.currentService}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">
                      {currentSlide + 1}
                    </span>
                    <span className="text-gray-400">
                      {content.ui.carousel.of}
                    </span>
                    <span className="text-gray-400">
                      {content.services.length}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {content.services[currentSlide].name}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-400 hover:from-cyan-500/10 hover:to-transparent transition-all duration-300 transform hover:scale-110"
                  aria-label={content.ui.carousel.next}
                >
                  {isArabic ? (
                    <FiChevronLeft className="w-6 h-6" />
                  ) : (
                    <FiChevronRight className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-slow"></div>

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-4 rounded-2xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${content.services[currentSlide].color}20, ${content.services[currentSlide].color}40)`,
                          border: `2px solid ${content.services[currentSlide].color}40`,
                        }}
                      >
                        <div
                          style={{
                            color: content.services[currentSlide].color,
                          }}
                        >
                          {getIconComponent(
                            content.services[currentSlide].icon,
                            "text-3xl sm:text-4xl",
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {content.services[currentSlide].name}
                        </h3>
                        <p className="text-cyan-300 text-lg">
                          {content.services[currentSlide].shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {content.services[currentSlide].confidence}%
                        </div>
                        <div className="text-sm text-gray-400">
                          {content.ui.carousel.mastery}
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-xl ${
                              i <
                              Math.floor(
                                content.services[currentSlide].confidence / 20,
                              )
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* الجانب الأيسر - الوصف والميزات */}
                    <div>
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-green-400">📋</span>
                          {content.ui.sections.overview}
                        </h4>
                        <p
                          className="text-gray-300 text-lg leading-relaxed"
                          itemProp="description"
                        >
                          {content.services[currentSlide].fullDesc}
                        </p>
                        <p className="text-gray-400 mt-4 text-sm">
                          {content.services[currentSlide].seoContent}
                        </p>
                      </div>

                      <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
                        <h5 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-cyan-400">⚡</span>
                          {content.ui.sections.features}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {content.services[currentSlide].features.map(
                            (feature: any, i: number) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                              >
                                <div className="text-cyan-400 text-xl">
                                  {getIconComponent(feature.icon, "text-xl")}
                                </div>
                                <span className="text-gray-300">
                                  {feature.text}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* الجانب الأيمن - الإحصائيات والتوسيع */}
                    <div>
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-purple-400">📊</span>
                          {content.ui.sections.statistics}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {content.services[currentSlide].stats.map(
                            (stat: any, i: number) => (
                              <div
                                key={i}
                                className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 text-center"
                              >
                                <div className="text-2xl font-bold text-white mb-1">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {stat.label}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* تفاصيل إضافية */}
                      {expandedSkill === content.services[currentSlide].id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mb-8 bg-linear-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-400/20"
                        >
                          <h5 className="text-xl font-bold text-white mb-4">
                            {content.ui.carousel.technicalDetails}
                          </h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {content.services[currentSlide].tags.map(
                              (tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-4 py-2 rounded-full text-sm bg-linear-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30"
                                >
                                  {tag}
                                </span>
                              ),
                            )}
                          </div>
                          <div className="text-gray-300">
                            <p className="mb-3">
                              <strong>{content.ui.carousel.keywords}:</strong>{" "}
                              {content.services[currentSlide].seoKeywords.join(
                                isArabic ? "، " : ", ",
                              )}
                            </p>
                            <p>
                              <strong>
                                {content.ui.carousel.serviceLevel}:
                              </strong>{" "}
                              {content.services[currentSlide].level}{" "}
                              {isArabic
                                ? "مع ضمان الجودة"
                                : "with quality guarantee"}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* أزرار التحكم */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() =>
                            setExpandedSkill(
                              expandedSkill ===
                                content.services[currentSlide].id
                                ? null
                                : content.services[currentSlide].id,
                            )
                          }
                          className="flex-1 py-4 px-6 rounded-xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-400 font-bold hover:border-cyan-400/50 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          {expandedSkill ===
                          content.services[currentSlide].id ? (
                            <>
                              <FiChevronUp />
                              {content.ui.carousel.hideTechnicalDetails}
                            </>
                          ) : (
                            <>
                              <FiChevronDown />
                              {content.ui.carousel.showTechnicalDetails}
                            </>
                          )}
                        </button>

                        <button
                          draggable
                          onDragStart={() =>
                            handleDragStart(content.services[currentSlide].name)
                          }
                          className="flex-1 py-4 px-6 rounded-xl bg-linear-to-r from-green-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                        >
                          <span>🚀</span>
                          {content.ui.carousel.addToProject}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${
                        ((currentSlide + 1) / content.services.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {content.services.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-linear-to-r from-cyan-500 to-purple-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-400"
                    }`}
                    aria-label={`${content.ui.carousel.service} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <div
                className="p-6 sm:p-8 backdrop-blur-xl bg-linear-to-br from-gray-900/80 to-black/80 rounded-3xl border border-gray-700 shadow-2xl shadow-purple-500/10 h-full"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400 animate-bounce">🎯</span>
                  {content.ui.projectBuilder.title}
                </h3>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  {content.ui.projectBuilder.description}
                </p>

                {/* Projection area*/}
                <div
                  className="min-h-87.5 p-6 border-2 border-dashed border-cyan-400/30 rounded-2xl mb-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 bg-linear-to-b from-gray-900/50 to-transparent"
                  aria-label={content.ui.projectBuilder.dragArea.dropHere}
                >
                  {skillStack.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-5xl mb-6 text-cyan-400"
                      >
                        📥
                      </motion.div>
                      <p className="text-gray-300 mb-3 font-bold text-xl">
                        {content.ui.projectBuilder.dragArea.dropHere}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {content.ui.projectBuilder.dragArea.instruction}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-400">
                          <span className="text-cyan-400 font-bold text-xl">
                            {skillStack.length}
                          </span>{" "}
                          {skillStack.length === 1
                            ? content.ui.projectBuilder.selected
                            : content.ui.projectBuilder.selectedServices}
                        </div>
                        <button
                          onClick={() => setSkillStack([])}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          {content.ui.projectBuilder.clearAll}
                        </button>
                      </div>

                      {skillStack.map((skillName, index) => {
                        const skill = content.services.find(
                          (s: any) => s.name === skillName,
                        );
                        return (
                          <motion.div
                            key={skillName}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between p-4 bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="p-3 rounded-lg"
                                style={{
                                  background: `linear-gradient(135deg, ${skill?.color}20, ${skill?.color}40)`,
                                }}
                              >
                                <div style={{ color: skill?.color }}>
                                  {skill &&
                                    getIconComponent(skill.icon, "text-2xl")}
                                </div>
                              </div>
                              <div>
                                <div className="text-white font-bold group-hover:text-cyan-300 transition-colors">
                                  {skillName}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {skill?.shortDesc}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromStack(skillName)}
                              className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:scale-125"
                              aria-label={`${content.ui.projectBuilder.remove} ${skillName}`}
                            >
                              <span className="text-xl">×</span>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Apply button*/}
                {skillStack.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-5 rounded-xl bg-linear-to-r from-green-500 via-cyan-500 to-blue-500 text-white font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 text-lg transform hover:scale-[1.02] mb-6"
                    onClick={() => {
                      if (skillStack.length > 0) {
                        const skillNames = skillStack;
                        alert(
                          isArabic
                            ? `شكراً لك! تم إرسال مكدس الخدمات:\n\n${skillNames.join(" + ")}\n\nسأتصل بك خلال 24 ساعة لمناقشة تفاصيل مشروعك وتقديم عرض سعر مفصل!`
                            : `Thank you! Service stack sent:\n\n${skillNames.join(" + ")}\n\nI will contact you within 24 hours to discuss your project details and provide a detailed quote!`,
                        );
                        setSkillStack([]);
                      }
                    }}
                  >
                    {content.ui.projectBuilder.quote}
                  </motion.button>
                )}

                {/* statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-linear-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-cyan-400">
                      {content.services.length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {content.ui.projectBuilder.servicesAvailable}
                    </div>
                  </div>
                  <div className="p-4 bg-linear-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {skillStack.length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {content.ui.projectBuilder.servicesSelected}
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-linear-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-400/20">
                  <p className="text-gray-300 text-center text-sm">
                    {content.ui.projectBuilder.note}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
