"use client";

import { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaCertificate,
  FaBuilding,
  FaCalendar,
  FaClock,
  FaStar,
  FaBookOpen,
  FaDownload,
  FaTimes,
  FaExternalLinkAlt,
  FaRegCalendarAlt,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";

interface CertificatesSectionProps {
  content: {
    categories: Array<{ id: string; name: string }>;
    certificates: Array<{
      id: number;
      title: string;
      image: string;
      issuer: string;
      category: string;
      date: string;
      duration: string;
      score: string;
      description: string;
      skills: string[];
      details: Record<string, any>;
    }>;
    labels: Record<string, string>;
  };
  getCategoryIcon: (categoryId: string) => JSX.Element;
  getCategoryColor: (categoryId: string) => string;
}

export default function CertificatesSection({
  content,
  getCategoryIcon,
  getCategoryColor,
}: CertificatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const categories = [
    { id: "all", name: content.labels.allCertificates },
    { id: "technical", name: content.labels.technical },
    { id: "soft", name: content.labels.soft },
    { id: "design", name: content.labels.design },
    { id: "business", name: content.labels.business },
    { id: "development", name: content.labels.development },
  ];

  const filteredCertificates =
    selectedCategory === "all"
      ? content.certificates
      : content.certificates.filter(
          (cert: any) => cert.category === selectedCategory,
        );

  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) =>
      prev === filteredCertificates.length - 1 ? 0 : prev + 1,
    );
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) =>
      prev === 0 ? filteredCertificates.length - 1 : prev - 1,
    );
  };

  const openCertificateModal = (certificate: any) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = "hidden";
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "auto";
  };

  const translateDetailKey = (key: string): string => {
    return content.labels[key] || key;
  };

  const getCategoryName = (categoryId: string): string => {
    const category = content.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Certificate Modal Component
  const CertificateModal = ({
    certificate,
    onClose,
  }: {
    certificate: any;
    onClose: () => void;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl bg-linear-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all shadow-lg border border-gray-700"
          >
            <FaTimes className="text-white text-xl" />
          </button>

          <div className="p-6 md:p-8">
            {/* Modal Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`px-3 py-1.5 rounded-lg bg-linear-to-r ${getCategoryColor(certificate.category)}/20 backdrop-blur-sm border border-${certificate.category}-500/30`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    {getCategoryIcon(certificate.category)}
                    {getCategoryName(certificate.category)}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {content.labels.certificateNumber.replace(
                    "{number}",
                    certificate.id.toString().padStart(2, "0"),
                  )}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
                {certificate.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
                  <FaBuilding className="text-blue-400" />
                  <span className="font-medium">{certificate.issuer}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
                  <FaRegCalendarAlt className="text-green-400" />
                  <span>{certificate.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-linear-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-500/30">
                  <FaAward className="text-amber-400" />
                  <span className="font-semibold text-amber-300">
                    {certificate.score}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Certificate Image */}
              <div className="space-y-6">
                {/* Certificate Image */}
                <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                  <div className="relative aspect-4/3 md:aspect-square bg-linear-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
                    {certificate.image && (
                      <Image
                        src={`/extras/certificates/${certificate.image}`}
                        alt={certificate.title}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    )}
                  </div>
                  <div className="p-6 bg-linear-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">
                          {certificate.issuer}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {certificate.date}
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold text-white">
                        {certificate.score}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-4 border border-blue-700/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {certificate.duration.includes("+")
                          ? certificate.duration
                          : certificate.duration.split(" ")[0]}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {content.labels.duration}
                      </div>
                    </div>
                  </div>
                  <div className="bg-linear-to-br from-green-900/30 to-emerald-800/20 backdrop-blur-sm rounded-xl p-4 border border-green-700/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {certificate.skills.length}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {content.labels.skills}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Certificate Details */}
              <div className="space-y-8">
                {/* Skills Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                      <FaGraduationCap className="text-blue-400 text-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {content.labels.acquiredSkills}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {certificate.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-linear-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-full text-sm border border-gray-700 hover:border-blue-500/50 hover:bg-blue-900/20 transition-all duration-300 hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program Details */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-green-500/20 to-emerald-600/20 flex items-center justify-center">
                      <FaBookOpen className="text-green-400 text-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {content.labels.programDetails}
                    </h3>
                  </div>
                  <div className="space-y-4 bg-linear-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    {Object.entries(certificate.details).map(
                      ([key, value]: [string, any]) => (
                        <div key={key} className="flex items-start gap-4">
                          <div className="w-32 shrink-0">
                            <span className="text-gray-400 font-medium text-sm">
                              {translateDetailKey(key)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-300 text-sm">
                              {Array.isArray(value) ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {value.map((item: string, idx: number) => (
                                    <li key={idx} className="text-gray-300">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                value
                              )}
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    {content.labels.certificateDescription}
                  </h4>
                  <p className="text-gray-300 leading-relaxed bg-linear-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
                    {certificate.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-800">
              <button className="flex-1 px-6 py-3 bg-linear-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-3 border border-gray-700 hover:border-gray-600 hover:scale-[1.02]">
                <FaDownload />
                {content.labels.downloadCertificate}
              </button>
              <button className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium flex items-center justify-center gap-3 hover:scale-[1.02]">
                <FaExternalLinkAlt />
                {content.labels.verifyCertificate}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {/* ==================== CATEGORIES FILTER ==================== */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 font-medium ${
                selectedCategory === category.id
                  ? `bg-linear-to-r ${getCategoryColor(category.id)} text-white shadow-lg scale-105 shadow-${category.id}-500/30`
                  : "bg-linear-to-br from-gray-800/50 to-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700"
              }`}
            >
              {getCategoryIcon(category.id)}
              {category.name}
            </button>
          ))}
        </div>

        <div className="text-center text-gray-400 text-sm mb-12">
          {content.labels.showingXofY
            .replace("{count}", filteredCertificates.length.toString())
            .replace("{total}", content.certificates.length.toString())}
        </div>
      </section>

      {/* ==================== CERTIFICATES CAROUSEL ==================== */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Carousel Navigation Buttons */}
            <button
              onClick={prevCarousel}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all shadow-xl border border-gray-700 hover:scale-110 hover:shadow-2xl"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>

            <button
              onClick={nextCarousel}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all shadow-xl border border-gray-700 hover:scale-110 hover:shadow-2xl"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>

            {/* Main Carousel */}
            <div className="overflow-hidden">
              {filteredCertificates.map(
                (certificate: any, index: number) =>
                  index === currentCarouselIndex && (
                    <motion.div
                      key={certificate.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-linear-to-br from-gray-800/30 via-gray-900/40 to-gray-950/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl"
                    >
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Certificate Icon */}
                        <div className="shrink-0">
                          <div
                            className={`w-48 h-48 rounded-2xl bg-linear-to-r ${getCategoryColor(certificate.category)} flex flex-col items-center justify-center shadow-2xl relative overflow-hidden`}
                          >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                            </div>

                            {/* Icon Container */}
                            <div className="relative z-10 flex flex-col items-center justify-center">
                              <FaCertificate className="text-white text-8xl mb-4 drop-shadow-lg" />
                              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                                <span className="text-white font-bold text-lg">
                                  {certificate.score}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Details */}
                        <div className="flex-1">
                          <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                              <span
                                className={`px-4 py-2 rounded-full text-sm bg-linear-to-r ${getCategoryColor(certificate.category)}/20 backdrop-blur-sm text-${certificate.category}-300 font-medium border border-${certificate.category}-500/30`}
                              >
                                {getCategoryName(certificate.category)}
                              </span>
                              <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                {content.labels.certificateNumber.replace(
                                  "{number}",
                                  certificate.id.toString().padStart(2, "0"),
                                )}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white leading-tight">
                              {certificate.title}
                            </h3>

                            <div className="space-y-4 mb-6">
                              <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                                  <FaBuilding className="text-blue-400" />
                                </div>
                                <div>
                                  <span className="font-medium block">
                                    {certificate.issuer}
                                  </span>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <div className="flex items-center gap-2 text-blue-300">
                                      <FaCalendar />
                                      <span className="text-sm">
                                        {certificate.date}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-300">
                                      <FaClock />
                                      <span className="text-sm">
                                        {certificate.duration}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-amber-300">
                                      <FaStar />
                                      <span className="text-sm font-semibold">
                                        {certificate.score}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed bg-linear-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
                              {certificate.description}
                            </p>

                            {/* Skills Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                              {certificate.skills.map(
                                (skill: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1.5 bg-linear-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-full text-sm border border-gray-700 hover:border-blue-500/50 hover:scale-105 transition-all duration-300"
                                  >
                                    {skill}
                                  </span>
                                ),
                              )}
                            </div>

                            <div className="flex gap-4">
                              <button
                                onClick={() =>
                                  openCertificateModal(certificate)
                                }
                                className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium flex items-center justify-center gap-3 hover:scale-[1.02]"
                              >
                                <FaBookOpen />
                                {content.labels.viewFullDetails}
                              </button>

                              <button className="flex-1 px-6 py-3 bg-linear-to-br from-gray-800 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-3 border border-gray-700 hover:border-gray-600 hover:scale-[1.02]">
                                <FaDownload />
                                {content.labels.downloadCertificate}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {filteredCertificates.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCarouselIndex
                      ? `bg-linear-to-r ${getCategoryColor(selectedCategory === "all" ? "technical" : selectedCategory)} scale-125 shadow-lg`
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={closeCertificateModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
