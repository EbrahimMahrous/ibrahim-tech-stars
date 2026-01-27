"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CTASection from "@/components/UI/CTASection";
import HeroSection from "@/components/sections/sales-engineer/HeroSection";
import ObjectionsSection from "@/components/sections/sales-engineer/ObjectionsSection";

interface SalesEngineerContent {
  ctaSection: {
    title: string;
    description: string;
    buttons: {
      schedule: string;
      request: string;
    };
    footer: string;
  };
}

export default function SalesEngineerPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<SalesEngineerContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const module = await import(`@/content/${locale}/sales-engineer`);
        setContent(module.salesEngineerContent);
      } catch (error) {
        console.error("Error loading content:", error);
        const fallback = await import(`@/content/ar/sales-engineer`);
        setContent(fallback.salesEngineerContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [locale]);

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <HeroSection />
      <ObjectionsSection />
      
      <CTASection
        title={content.ctaSection.title}
        description={content.ctaSection.description}
        buttons={[
          {
            text: content.ctaSection.buttons.schedule,
            variant: "primary",
            href: "/consultation",
          },
          {
            text: content.ctaSection.buttons.request,
            variant: "outline",
            whatsapp: true,
          },
        ]}
        direction={isArabic ? "rtl" : "ltr"}
        showBackground={true}
        showGradientTitle={true}
        showFooter={true}
        footerText={content.ctaSection.footer}
      />
    </section>
  );
}
