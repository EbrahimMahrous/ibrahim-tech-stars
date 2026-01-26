"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaCode,
  FaUsers,
  FaPaintBrush,
  FaBriefcase,
  FaLaptopCode,
  FaBookOpen,
} from "react-icons/fa";

import HeroSection from "@/components/sections/extras/certificates/HeroSection";
import CertificatesSection from "@/components/sections/extras/certificates/CertificatesSection";
import ReviewsSection from "@/components/sections/extras/certificates/ReviewsSection";

export default function CertificatesPage() {
  const pathname = usePathname();
  const [heroContent, setHeroContent] = useState<any>(null);
  const [certificatesContent, setCertificatesContent] = useState<any>(null);
  const [reviewsContent, setReviewsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadAllContent = async () => {
      try {
        setLoading(true);
        const [heroModule, certificatesModule, reviewsModule] =
          await Promise.all([
            import(`@/content/${locale}/extras/certificates/HeroSection`),
            import(
              `@/content/${locale}/extras/certificates/CertificatesSection`
            ),
            import(`@/content/${locale}/extras/certificates/ReviewsSection`),
          ]);

        setHeroContent(heroModule.heroContent);
        setCertificatesContent(certificatesModule.certificatesContent);
        setReviewsContent(reviewsModule.reviewsContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallbackHero = await import(
          `@/content/ar/extras/certificates/HeroSection`
        );
        const fallbackCertificates = await import(
          `@/content/ar/extras/certificates/CertificatesSection`
        );
        const fallbackReviews = await import(
          `@/content/ar/extras/certificates/ReviewsSection`
        );

        setHeroContent(fallbackHero.heroContent);
        setCertificatesContent(fallbackCertificates.certificatesContent);
        setReviewsContent(fallbackReviews.reviewsContent);
      } finally {
        setLoading(false);
      }
    };

    loadAllContent();
  }, [locale]);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "technical":
        return <FaCode />;
      case "soft":
        return <FaUsers />;
      case "design":
        return <FaPaintBrush />;
      case "business":
        return <FaBriefcase />;
      case "development":
        return <FaLaptopCode />;
      default:
        return <FaBookOpen />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case "technical":
        return "from-blue-500 to-cyan-500";
      case "soft":
        return "from-green-500 to-emerald-500";
      case "design":
        return "from-purple-500 to-pink-500";
      case "business":
        return "from-amber-500 to-orange-500";
      case "development":
        return "from-teal-500 to-cyan-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">
            {isArabic ? "جاري تحميل الشهادات..." : "Loading Certificates..."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <main
      className="min-h-screen pt-32 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      {heroContent && <HeroSection content={heroContent} />}

      {/* Certificates Section */}
      {certificatesContent && (
        <CertificatesSection
          content={certificatesContent}
          getCategoryIcon={getCategoryIcon}
          getCategoryColor={getCategoryColor}
        />
      )}

      {/* Reviews Section */}
      {reviewsContent && <ReviewsSection content={reviewsContent} />}
    </main>
  );
}
