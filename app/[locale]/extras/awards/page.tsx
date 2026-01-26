"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaAward,
  FaCertificate,
  FaPlay,
  FaTimes,
  FaYoutube,
  FaCalendar,
  FaUniversity,
  FaMedal,
  FaArrowDown,
  FaDownload,
  FaUserGraduate,
  FaSignature,
} from "react-icons/fa";

export default function AwardsPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<boolean>(false);
  const [certificateImage] = useState<string>(
    "/extras/awards/AwardCertificateFourth.jpeg",
  );
  const [isLoading, setIsLoading] = useState(true);

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const module = await import(`@/content/${locale}/extras/awards`);
        setContent(module.awardsContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(`@/content/ar/extras/awards`);
        setContent(fallback.awardsContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [locale]);

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  const openCertificateModal = () => {
    setSelectedCertificate(true);
    document.body.style.overflow = "hidden";
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(false);
    document.body.style.overflow = "auto";
  };

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">
            {isArabic
              ? content?.labels?.loadingText || "جاري التحميل..."
              : content?.labels?.loadingAwards || "Loading..."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <main
      className="min-h-screen pt-32 md:pt-32 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ==================== HERO SECTION ==================== */}
      <section className="pt-8 md:pt-16 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400 px-2">
            {content.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3">
            {content.hero.subtitle}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {content.hero.description}
          </p>
        </motion.div>
      </section>

      {/* ==================== HIGHLIGHT ACHIEVEMENT ==================== */}
      <section className="py-12 container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Trophy Icon */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-linear-to-r from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-r from-yellow-600 to-amber-600 flex items-center justify-center shadow-lg">
                      <FaTrophy className="text-white text-3xl sm:text-4xl" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-linear-to-r from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      4
                    </span>
                  </div>
                </div>

                {/* Achievement Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
                      {content.achievement.rank}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mb-2">
                      <FaUniversity className="text-sm sm:text-base" />
                      <span className="font-medium text-sm sm:text-base">
                        {content.achievement.institution}
                      </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-teal-400 text-sm sm:text-base">
                      <FaUserGraduate />
                      <span>{content.achievement.context}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base mb-4">
                    {content.achievement.description}
                  </p>

                  <div className="mt-4 p-3 sm:p-4 bg-linear-to-r from-blue-900/20 to-teal-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaMedal className="text-yellow-400 text-sm sm:text-base" />
                      <p className="text-xs sm:text-sm text-gray-300">
                        {content.labels.recipientLabel}
                        <span className="text-white font-medium">
                          {content.certificate.recipient}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== VIDEO SECTION ==================== */}
      <section className="py-12 container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-pointer"
            onClick={() => openVideoModal(content.video.id)}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-gray-700">
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-blue-900/30 to-purple-900/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 sm:p-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <FaPlay className="text-white text-xl sm:text-2xl ml-1" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
                      {content.video.caption}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-300 text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <FaAward className="text-sm" />
                        <span>{content.video.rank}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-sm" />
                        <span>{content.video.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaYoutube className="text-sm" />
                        <span>{content.labels.youtubeShortLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connection Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center my-8 sm:my-12"
          >
            <div className="flex flex-col items-center gap-2">
              <FaArrowDown className="text-teal-400 text-xl sm:text-2xl animate-bounce" />
              <p className="text-gray-400 text-xs sm:text-sm italic text-center px-4">
                {content.connectionText}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CERTIFICATE SECTION ==================== */}
      <section className="py-12 container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-pointer"
            onClick={openCertificateModal}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-amber-900/20 to-yellow-900/20 backdrop-blur-sm border border-gray-700">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-linear-to-r from-amber-600 to-yellow-600 flex items-center justify-center shadow-lg">
                      <FaCertificate className="text-white text-4xl sm:text-6xl" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-3">
                      {content.certificate.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                      {content.certificate.description}
                    </p>
                    <div className="mb-4 p-3 bg-linear-to-r from-amber-900/20 to-yellow-900/20 rounded-lg">
                      <p className="text-xs sm:text-sm text-amber-300">
                        <span className="font-medium">
                          {content.labels.recipientLabel}
                        </span>
                        {content.certificate.recipient}
                      </p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 text-sm sm:text-base">
                      <FaDownload />
                      <span>{content.labels.clickToView}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
              className="relative w-full max-w-3xl bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
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
                  title={content.modal.videoTitle}
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                      {content.modal.videoTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <FaYoutube className="text-xs" />{" "}
                        {content.labels.youtubeShortLabel}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-xs" /> {content.video.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaAward className="text-xs" /> {content.video.rank}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-green-600 to-teal-600 text-white rounded-full text-xs sm:text-sm font-medium">
                    {content.video.event}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== CERTIFICATE MODAL (Responsive) ==================== */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeCertificateModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
              >
                <FaTimes className="text-white text-lg sm:text-xl" />
              </button>

              <div className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                      {content.modal.certificateTitle}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {content.certificate.description}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-amber-600 to-yellow-600 text-white rounded-full text-xs sm:text-sm font-medium">
                    {content.achievement.rank}
                  </span>
                </div>

                <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
                  {/* Certificate Design */}
                  <div className="text-center border-2 sm:border-4 border-amber-600 p-4 sm:p-6 md:p-8 rounded-lg">
                    {/* Certificate Header */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                      <div className="flex justify-center mb-2 sm:mb-4">
                        <FaCertificate className="text-amber-600 text-3xl sm:text-4xl md:text-5xl" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                        {content.certificate.details.title}
                      </h1>
                      <div className="h-0.5 sm:h-1 w-24 sm:w-32 bg-amber-600 mx-auto mb-4 sm:mb-6"></div>
                    </div>

                    {/* Presented To */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                      <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-1 sm:mb-2">
                        {content.certificate.details.presentedTo}
                      </h2>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                        {content.certificate.details.recipientName}
                      </h3>
                    </div>

                    {/* Certificate Body */}
                    <div className="mb-6 sm:mb-8 md:mb-12">
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                        {content.certificate.details.body}
                      </p>
                    </div>

                    {/* Signatures */}
                    <div className="flex flex-col md:flex-row justify-between items-end mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-amber-300">
                      <div className="text-center mb-6 md:mb-0">
                        <div className="mb-2 sm:mb-4">
                          <FaSignature className="text-amber-600 text-xl sm:text-2xl md:text-3xl mx-auto mb-1 sm:mb-2" />
                          <div className="h-px w-32 sm:w-48 bg-gray-400 mx-auto"></div>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                          {content.certificate.details.signatures.dean.name}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {content.certificate.details.signatures.dean.title}
                        </p>
                      </div>

                      <div className="text-center mt-6 md:mt-0">
                        <div className="mb-2 sm:mb-4">
                          <FaSignature className="text-amber-600 text-xl sm:text-2xl md:text-3xl mx-auto mb-1 sm:mb-2" />
                          <div className="h-px w-32 sm:w-48 bg-gray-400 mx-auto"></div>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                          {content.certificate.details.signatures.viceDean.name}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {
                            content.certificate.details.signatures.viceDean
                              .title
                          }
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 sm:mt-8 md:mt-12 pt-4 sm:pt-6 border-t border-amber-200">
                      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                        <FaUniversity className="text-amber-600 text-sm" />
                        <p className="text-gray-700 font-medium text-xs sm:text-sm">
                          {content.achievement.institution}
                        </p>
                        <FaCalendar className="text-amber-600 text-sm" />
                        <p className="text-gray-700 text-xs sm:text-sm">
                          {content.video.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                    {content.connectionText}
                  </div>
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = certificateImage;
                      link.download = content.labels.certificateOfAppreciation;
                      link.click();
                    }}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FaDownload /> {content.labels.downloadCertificate}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
