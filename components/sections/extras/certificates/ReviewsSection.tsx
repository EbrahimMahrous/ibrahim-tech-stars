"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaCheckCircle,
  FaMicrophone,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

interface ReviewsSectionProps {
  content: {
    reviews: Array<{
      id: number;
      client: string;
      project: string;
      duration: string;
      rating: number;
      categories: {
        professionalism: number;
        communication: number;
        quality: number;
        expertise: number;
        delivery: number;
        collaboration: number;
      };
      comment: string;
      response: string;
      image: string;
      link: string;
      verified: boolean;
    }>;
    labels: {
      sectionTitle: string;
      sectionDescription: string;
      clientReview: string;
      myResponse: string;
      responseLabel: string;
      ratingBreakdown: string;
      viewOriginalReview: string;
      viewOriginal: string;
      originalReviewImage: string;
      platformName: string;
      categoryLabels: {
        professionalism: string;
        communication: string;
        quality: string;
        expertise: string;
        delivery: string;
        collaboration: string;
      };
    };
  };
}

export default function ReviewsSection({ content }: ReviewsSectionProps) {
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const openReviewModal = (review: any) => {
    setSelectedReview(review);
    document.body.style.overflow = "hidden";
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    document.body.style.overflow = "auto";
  };

  // Review Modal Component
  const ReviewModal = ({
    review,
    onClose,
  }: {
    review: any;
    onClose: () => void;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-linear-to-br from-gray-900 to-gray-950 rounded-xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all shadow-lg border border-gray-700"
          >
            <FaTimes className="text-white text-lg sm:text-xl" />
          </button>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 md:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {review.client}
                  </h3>
                  {review.verified && (
                    <FaCheckCircle className="text-green-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm sm:text-base">
                  {review.project}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {review.duration}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                ))}
              </div>
            </div>

            {/* Review Image */}
            {review.image && (
              <div className="mb-6 md:mb-8">
                <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
                  <div className="relative aspect-video w-full bg-linear-to-br from-gray-800 to-gray-900">
                    <Image
                      src={review.image}
                      alt={`تقييم ${review.client} - ${review.project}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority
                    />
                  </div>
                  <div className="p-4 bg-linear-to-r from-gray-800/80 to-gray-900/80 border-t border-gray-700">
                    <p className="text-center text-xs sm:text-sm text-gray-400">
                      {content.labels.originalReviewImage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Full Review */}
            <div className="space-y-4 sm:space-y-6">
              {/* Client Review */}
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-400">
                  {content.labels.clientReview}
                </h4>
                <div className="bg-linear-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
                  <div className="flex items-start gap-2 sm:gap-2 mb-3 sm:mb-4">
                    <FaQuoteLeft className="text-gray-500 text-lg sm:text-xl shrink-0 mt-0.5" />
                    <p className="text-gray-300 italic text-sm sm:text-base leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <FaQuoteRight className="text-gray-500 text-lg sm:text-xl" />
                  </div>
                </div>
              </div>

              {/* My Response */}
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-green-400">
                  {content.labels.myResponse}
                </h4>
                <div className="bg-linear-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-700/30">
                  <div className="flex items-center gap-2 sm:gap-2 mb-2 sm:mb-3">
                    <FaMicrophone className="text-green-400 text-sm sm:text-base" />
                    <span className="text-green-300 font-medium text-sm sm:text-base">
                      {content.labels.responseLabel}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {review.response}
                  </p>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-amber-400">
                  {content.labels.ratingBreakdown}
                </h4>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                  {Object.entries(review.categories).map(
                    ([key, value]: [string, any]) => (
                      <div 
                        key={key} 
                        className="bg-linear-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-xs sm:text-sm">
                            {content.labels.categoryLabels[key as keyof typeof content.labels.categoryLabels]}
                          </span>
                          <span className="text-white font-bold text-sm sm:text-base">
                            {value}/5
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                          <div
                            className="bg-linear-to-r from-green-500 to-emerald-500 h-1.5 sm:h-2 rounded-full"
                            style={{ width: `${(value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* View Original Button */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
              <a
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaExternalLinkAlt />
                {content.labels.viewOriginalReview}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-green-400 to-teal-400">
              {content.labels.sectionTitle}
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base px-2">
            {content.labels.sectionDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {content.reviews.map((review: any, index: number) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10"
            >
              {/* Review Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <h4 className="font-bold text-base sm:text-lg text-white">
                      {review.client}
                    </h4>
                    {review.verified && (
                      <FaCheckCircle className="text-green-400 text-xs sm:text-sm" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">
                    {review.project}
                  </p>
                  <p className="text-xs text-gray-500">{review.duration}</p>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 self-start">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
                  ))}
                </div>
              </div>

              {/* Rating Categories */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {Object.entries(review.categories).map(
                  ([key, value]: [string, any]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="text-gray-400 truncate">
                        {content.labels.categoryLabels[key as keyof typeof content.labels.categoryLabels]}
                      </span>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
                        <span className="text-white font-medium">{value}/5</span>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Client Comment */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start gap-1.5 sm:gap-2 mb-2">
                  <FaQuoteLeft className="text-gray-500 text-xs sm:text-sm shrink-0 mt-0.5" />
                  <p className="text-gray-300 italic text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {review.comment}
                  </p>
                </div>
                <div className="flex justify-end">
                  <FaQuoteRight className="text-gray-500 text-xs sm:text-sm" />
                </div>
              </div>

              {/* My Response */}
              <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <FaMicrophone className="text-blue-400 text-xs sm:text-sm" />
                  <span className="text-xs sm:text-sm text-gray-400">
                    {content.labels.responseLabel}
                  </span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {review.response}
                </p>
              </div>

              {/* Review Actions */}
              <div className="flex flex-col xs:flex-row justify-between items-center gap-2 sm:gap-0">
                <button
                  onClick={() => openReviewModal(review)}
                  className="w-full xs:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-blue-600/20 to-purple-600/20 text-gray-300 hover:text-white hover:shadow-lg transition-all font-medium flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaExternalLinkAlt className="text-xs sm:text-sm" />
                  {content.labels.viewOriginal}
                </button>
                <span className="text-[10px] xs:text-xs text-gray-500">
                  {content.labels.platformName}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <ReviewModal review={selectedReview} onClose={closeReviewModal} />
        )}
      </AnimatePresence>
    </>
  );
}