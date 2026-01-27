"use client";

import { useEffect, useState, useRef, JSX } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaTimes,
  FaMobileAlt,
  FaChartLine,
  FaPalette,
  FaCheckCircle,
  FaWordpress,
  FaShopify,
  FaReact,
  FaShieldAlt,
  FaBolt,
  FaSearch,
  FaCog,
  FaImage,
  FaGlobe,
  FaServer,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
} from "react-icons/si";
import CTASection from "@/components/UI/CTASection";

export default function WebSolutionsPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  const iconMap: { [key: string]: JSX.Element } = {
    FaReact: <FaReact className="text-blue-500" />,
    SiNextdotjs: <SiNextdotjs className="text-black dark:text-white" />,
    SiTypescript: <SiTypescript className="text-blue-600" />,
    SiTailwindcss: <SiTailwindcss className="text-cyan-500" />,
    FaWordpress: <FaWordpress className="text-blue-700" />,
    FaShopify: <FaShopify className="text-green-600" />,
    SiNodedotjs: <SiNodedotjs className="text-green-500" />,
    SiExpress: <SiExpress className="text-gray-400" />,
    SiMongodb: <SiMongodb className="text-green-700" />,
    FaBolt: <FaBolt className="text-yellow-500" />,
    FaShieldAlt: <FaShieldAlt className="text-red-500" />,
    FaSearch: <FaSearch className="text-purple-500" />,
    FaPalette: <FaPalette className="text-pink-500" />,
    FaMobileAlt: <FaMobileAlt className="text-green-400" />,
    FaChartLine: <FaChartLine className="text-orange-500" />,
    FaCog: <FaCog />,
    FaImage: <FaImage />,
    FaGlobe: <FaGlobe />,
    FaServer: <FaServer />,
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(`@/content/${locale}/web-solutions`);
        const contentData = module.webSolutionsContent;

        const skillsWithIcons = contentData.skills.map((skill: any) => ({
          ...skill,
          icon: iconMap[skill.iconName] || (
            <FaReact className="text-blue-500" />
          ),
        }));

        const servicesWithIcons = contentData.optimizationServices.map(
          (service: any) => ({
            ...service,
            icon: iconMap[service.iconName] || <FaCog />,
          }),
        );

        setContent({
          ...contentData,
          skills: skillsWithIcons,
          optimizationServices: servicesWithIcons,
        });
      } catch (error) {
        console.error("Error loading content:", error);
        const module = await import(`@/content/ar/web-solutions`);
        const contentData = module.webSolutionsContent;

        const skillsWithIcons = contentData.skills.map((skill: any) => ({
          ...skill,
          icon: iconMap[skill.iconName] || (
            <FaReact className="text-blue-500" />
          ),
        }));

        const servicesWithIcons = contentData.optimizationServices.map(
          (service: any) => ({
            ...service,
            icon: iconMap[service.iconName] || <FaCog />,
          }),
        );

        setContent({
          ...contentData,
          skills: skillsWithIcons,
          optimizationServices: servicesWithIcons,
        });
      }
    };

    loadContent();
  }, [locale]);
  useEffect(() => {
    const container = skillsContainerRef.current;
    if (!container || !content?.skills) return;

    const scrollWidth = container.scrollWidth / 2;
    const clientWidth = container.clientWidth;
    let scrollPos = 0;
    let animationId: number;

    const animate = () => {
      if (!container) return;
      scrollPos += 0.5;
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
      }

      container.style.transform = `translateX(-${scrollPos}px)`;
      animationId = requestAnimationFrame(animate);
    };

    const startTimeout = setTimeout(() => {
      container.style.transition = "transform 0.1s linear";
      animationId = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [content]);

  const nextSlide = () => {
    if (!content?.projects) return;
    setCurrentSlide((prev) =>
      prev === content.projects.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    if (!content?.projects) return;
    setCurrentSlide((prev) =>
      prev === 0 ? content.projects.length - 1 : prev - 1,
    );
  };

  const openVideoModal = (id: number) => {
    setSelectedVideo(id);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const selectedProject = content?.projects?.find(
    (p: any) => p.id === selectedVideo,
  );

  if (!content) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </section>
    );
  }

  return (
    <section
      className="pt-32 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {content.heroDescription || content.description}
          </p>
        </motion.div>

        {/* Skills Infinite Scroll - إجبار الاتجاه LTR فقط هنا */}
        <div className="mb-16 relative overflow-hidden" dir="ltr">
          <div className="absolute bg-linear-to-r from-gray-900 via-transparent to-gray-900 z-10 pointer-events-none" />
          <div
            ref={skillsContainerRef}
            className="flex gap-8 py-4"
            style={{ width: "fit-content" }}
          >
            {content.skills &&
              [...content.skills, ...content.skills, ...content.skills].map(
                (skill: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (index % (content.skills?.length || 1)) * 0.1,
                    }}
                    className="shrink-0 flex flex-col items-center justify-center bg-gray-800/30 px-6 py-4 rounded-xl backdrop-blur-sm border border-gray-700 min-w-35"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-3xl mb-2">{skill.icon}</div>
                    <span className="font-medium text-sm text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ),
              )}
          </div>
        </div>

        {/* Projects Carousel Section */}
        <div className="mb-20">
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {content.projects?.map((project: any) => (
                  <div key={project.id} className="w-full shrink-0 px-4">
                    <div
                      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 h-full cursor-pointer"
                      onClick={() => openVideoModal(project.id)}
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
                        {project.youtubeId ? (
                          <img
                            src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 rounded-full bg-linear-to-r from-green-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                                <FaPlay className="text-white text-2xl ml-1" />
                              </div>
                              <p className="text-gray-400 text-sm">
                                {content.watchDemo || "Watch Demo"}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm z-20">
                          {project.duration}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-linear-to-r from-green-500 to-cyan-500 px-3 py-1 rounded-full text-sm font-medium z-20">
                          {project.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4 hover:text-green-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-6">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <button className="px-6 py-3 bg-linear-to-r from-green-600 to-cyan-600 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-2">
                            <FaPlay /> {content.viewProject || "View Project"}
                          </button>
                          <span className="text-gray-500 group-hover:text-cyan-400 transition-colors">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Navigation */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all z-20"
            >
              {isArabic ? (
                <FaChevronRight className="text-white text-xl" />
              ) : (
                <FaChevronLeft className="text-white text-xl" />
              )}
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all z-20"
            >
              {isArabic ? (
                <FaChevronLeft className="text-white text-xl" />
              ) : (
                <FaChevronRight className="text-white text-xl" />
              )}
            </button>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {content.projects?.map(
                (_: any, index: number): JSX.Element => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-linear-to-r from-green-500 to-cyan-500 w-8"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* Optimization Services Accordion */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {content.optimizationTitle ||
              "Website Optimization and Maintenance Services"}
          </h2>

          <div className="max-w-4xl mx-auto">
            {content.optimizationServices?.map((service: any) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-xl transition-all duration-300 ${
                    openAccordion === service.id
                      ? `bg-linear-to-r ${service.color} text-white`
                      : "bg-gray-800/50 hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl" dir="ltr">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-right">
                      {service.category}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openAccordion === service.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openAccordion === service.id ? (
                      <FaChevronUp className="text-xl" />
                    ) : (
                      <FaChevronDown className="text-xl" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openAccordion === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-gray-800/30 rounded-b-xl border border-gray-700 border-t-0">
                        <ul className="space-y-4">
                          {service.items.map((item: string, index: number) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-linear-to-r from-green-500 to-cyan-500 mt-2 shrink-0" />
                              <span className="text-gray-300">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {content.ctaTitle && (
          <CTASection
            title={content.ctaTitle}
            description={content.ctaDescription}
            buttons={[
              {
                text: content.ctaButton1,
                variant: "primary" as const,
                href: "/consultation",
              },
              {
                text: content.ctaButton2,
                variant: "outline" as const,
                whatsapp: true,
              },
            ]}
            direction={isArabic ? "rtl" : "ltr"}
            showBackground={false}
            showGradientTitle={true}
            className="mt-12"
          />
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <FaTimes className="text-white text-xl" />
              </button>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                {selectedProject.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-linear-to-r from-green-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                        <FaPlay className="text-white text-2xl ml-1" />
                      </div>
                      <p className="text-gray-400">
                        {content.watchDemo || "Watch Demo"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <h3 className="text-2xl font-bold">
                    {selectedProject.title}
                  </h3>
                  <span className="px-4 py-2 bg-linear-to-r from-green-500 to-cyan-500 rounded-full text-sm font-medium whitespace-nowrap">
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-gray-300 mb-6">
                  {selectedProject.description}
                </p>

                {/* Features */}
                {selectedProject.features && (
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3 text-green-400">
                      {content.mainFeatures || "Main Features:"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map(
                        (feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500 shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {selectedProject.technologies && (
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3 text-cyan-400">
                      {content.technologiesUsed || "Technologies Used:"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(
                        (tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gray-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveUrl &&
                    selectedProject.liveUrl !== "#" && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-linear-to-r from-green-600 to-green-800 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-2"
                      >
                        <FaGlobe /> {content.viewLiveSite || "View Live Site"}
                      </a>
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
