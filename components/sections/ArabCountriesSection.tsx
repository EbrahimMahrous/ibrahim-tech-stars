"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { HiOutlineUser, HiOutlineSparkles } from "react-icons/hi";
import { usePathname } from "next/navigation";

import {
  DZ,
  BH,
  EG,
  IQ,
  JO,
  KW,
  LB,
  LY,
  MA,
  OM,
  PS,
  QA,
  SA,
  SD,
  SY,
  TN,
  AE,
  YE,
} from "country-flag-icons/react/3x2";

interface ArabCountry {
  code: string;
  name: string;
  Flag: React.ComponentType<{ className?: string }>;
  greeting: string;
}

const flagComponents: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  DZ: DZ,
  BH: BH,
  EG: EG,
  IQ: IQ,
  JO: JO,
  KW: KW,
  LB: LB,
  LY: LY,
  MA: MA,
  OM: OM,
  PS: PS,
  QA: QA,
  SA: SA,
  SD: SD,
  SY: SY,
  TN: TN,
  AE: AE,
  YE: YE,
};

// ========================= Greeting Message Component =========================
interface GreetingMessageProps {
  country: ArabCountry;
  typedText: string;
  isGreetingExiting: boolean;
  greetingTimer: string;
  showGreeting: boolean;
}

function GreetingMessage({
  country,
  typedText,
  isGreetingExiting,
  greetingTimer,
  showGreeting,
}: GreetingMessageProps) {
  if (!showGreeting) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{
        opacity: isGreetingExiting ? 0 : 1,
        scale: isGreetingExiting ? 0.9 : 1,
        y: isGreetingExiting ? 20 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: isGreetingExiting ? "easeIn" : "easeOut",
      }}
      className="mt-6 mb-8 px-4 w-full"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-linear-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/50 rounded-2xl px-4 sm:px-6 py-4 backdrop-blur-xl max-w-full sm:max-w-md mx-auto w-full">
        {/* Flag */}
        <div className="w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)] shrink-0">
          <country.Flag className="w-full h-full object-cover" />
        </div>

        {/* Country Info */}
        <div className="text-center sm:text-left flex-1 w-full">
          {/* Country Name & Code */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="text-lg md:text-xl font-bold text-white">
              {country.name}
            </span>
            <span className="text-xs px-2 py-1 bg-cyan-500/30 text-cyan-300 rounded-full mt-1 sm:mt-0">
              {country.code}
            </span>
          </div>

          {/* Greeting Text */}
          <p className="text-gray-200 text-base md:text-lg min-h-6 w-full">
            <span className="inline-block max-w-full wrap-break-word text-center sm:text-left">
              {typedText}
            </span>
          </p>
        </div>
      </div>

      {/* Timer Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="text-cyan-300/70 text-sm md:text-base mt-2 text-center"
      >
        {greetingTimer}
      </motion.p>
    </motion.div>
  );
}

export default function ArabCountriesCarousel() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<ArabCountry | null>(
    null,
  );
  const [showGreeting, setShowGreeting] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const [isGreetingExiting, setIsGreetingExiting] = useState<boolean>(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(
          `@/content/${locale}/components/sections/arab-countries-section`
        );
        setContent(module.arabCountriesSectionContent || module.default);
      } catch (error) {
        console.error("Error loading arab countries section content:", error);
        try {
          const fallback = await import(
            `@/content/ar/components/sections/arab-countries-section`
          );
          setContent(fallback.arabCountriesSectionContent);
        } catch (fallbackError) {
          console.error("Error loading fallback content:", fallbackError);
        }
      }
    };

    loadContent();
  }, [locale]);

  const arabCountries = useMemo(() => {
    if (!content || !content.countries) return [];

    return content.countries.map((country: any) => ({
      ...country,
      Flag: flagComponents[country.code] || DZ,
    })) as ArabCountry[];
  }, [content]);

  const loop = useMemo(() => {
    return [...arabCountries, ...arabCountries];
  }, [arabCountries]);

  const handleCountrySelect = (country: ArabCountry): void => {
    setSelectedCountry(country);
    setShowGreeting(true);
    setIsGreetingExiting(false);
    setPaused(true);
    setTimeout(() => {
      setIsGreetingExiting(true);
      setTimeout(() => {
        setShowGreeting(false);
        setPaused(false);
        setTypedText("");
      }, 500);
    }, 5500);
  };

  useEffect(() => {
    if (showGreeting && selectedCountry) {
      setTypedText("");
      const text = selectedCountry.greeting;
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i <= text.length) {
          setTypedText(text.substring(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [showGreeting, selectedCountry]);

  if (!content) {
    return (
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="relative z-10 container mx-auto px-6">
          {/* Title skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 md:h-12 lg:h-14 bg-gray-800/70 rounded-lg max-w-3xl mx-auto mb-6 animate-pulse" />
            <div className="h-4 bg-gray-800/60 rounded-full max-w-2xl mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-800/60 rounded-full max-w-xl mx-auto animate-pulse" />
          </div>
          {/* User selection box skeleton */}
          <div className="flex items-center justify-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 bg-gray-800/40 border border-gray-700/50 rounded-2xl px-6 py-4 w-full max-w-md animate-pulse">
              <div className="w-8 h-8 bg-gray-700/60 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700/60 rounded-full w-3/4 mx-auto" />
                <div className="h-3 bg-gray-700/60 rounded-full w-1/2 mx-auto" />
              </div>
              <div className="w-8 h-8 bg-gray-700/60 rounded-full" />
            </div>
          </div>
          {/* Country cards row 1 skeleton - Full width */}
          <div className="relative overflow-hidden mb-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] -ml-6 sm:-ml-8 md:-ml-12">
            <div className="flex gap-4 sm:gap-6 md:gap-8 px-6 sm:px-8 md:px-12">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-35 sm:min-w-40 md:min-w-45 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-800/30 border border-gray-700/40 flex flex-col items-center justify-center animate-pulse shrink-0"
                >
                  <div className="w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12 bg-gray-700/50 rounded-lg mb-2 sm:mb-3" />
                  <div className="h-3 sm:h-4 bg-gray-700/50 rounded-full w-16 sm:w-20 mb-1 sm:mb-2" />
                  <div className="h-2 sm:h-3 bg-gray-700/50 rounded-full w-10 sm:w-12" />
                </div>
              ))}
            </div>
          </div>
          {/* Country cards row 2 skeleton - Full width */}
          <div className="relative overflow-hidden w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] -ml-6 sm:-ml-8 md:-ml-12">
            <div className="flex gap-4 sm:gap-6 md:gap-8 px-6 sm:px-8 md:px-12">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-35 sm:min-w-40 md:min-w-45 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-800/30 border border-gray-700/40 flex flex-col items-center justify-center animate-pulse shrink-0"
                >
                  <div className="w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12 bg-gray-700/50 rounded-lg mb-2 sm:mb-3" />
                  <div className="h-3 sm:h-4 bg-gray-700/50 rounded-full w-16 sm:w-20 mb-1 sm:mb-2" />
                  <div className="h-2 sm:h-3 bg-gray-700/50 rounded-full w-10 sm:w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-b from-gray-900 via-black to-gray-900"
      dir="ltr"
    >
      {/* Heading */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-12 px-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-linear-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            {content.title}
          </span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mb-8">
          {content.description}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center gap-3 bg-linear-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-2xl px-6 py-4 mb-6"
        >
          <HiOutlineUser className="text-2xl md:text-3xl text-cyan-400" />
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              {content.selectCountry.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              {content.selectCountry.subtitle}
            </p>
          </div>
          <HiOutlineSparkles className="text-2xl md:text-3xl text-green-400 animate-pulse" />
        </motion.div>

        {/* Use GreetingMessage Component */}
        {showGreeting && selectedCountry && (
          <GreetingMessage
            country={selectedCountry}
            typedText={typedText}
            isGreetingExiting={isGreetingExiting}
            greetingTimer={content.greetingTimer}
            showGreeting={showGreeting}
          />
        )}
      </motion.div>

      {/* ROW 1 */}
      <div
        className="relative overflow-hidden mb-10 lg:mb-12"
        onMouseEnter={() => !showGreeting && setPaused(true)}
        onMouseLeave={() => !showGreeting && setPaused(false)}
      >
        <motion.div
          className="flex gap-6 md:gap-8 lg:gap-10 w-max"
          animate={{
            x: paused || showGreeting ? undefined : ["0%", "-50%"],
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loop.map((country, i) => (
            <CountryCard
              key={i}
              country={country}
              onSelect={handleCountrySelect}
              isSelected={selectedCountry?.code === country.code}
              clickHint={content.clickHint}
            />
          ))}
        </motion.div>
      </div>

      {/* ROW 2 */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => !showGreeting && setPaused(true)}
        onMouseLeave={() => !showGreeting && setPaused(false)}
      >
        <motion.div
          className="flex gap-6 md:gap-8 lg:gap-10 w-max"
          animate={{
            x: paused || showGreeting ? undefined : ["-50%", "0%"],
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loop.map((country, i) => (
            <CountryCard
              key={i}
              country={country}
              onSelect={handleCountrySelect}
              isSelected={selectedCountry?.code === country.code}
              clickHint={content.clickHint}
            />
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .overflow-visible {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}

/* ========================= Country Card (Magnetic) ========================= */

function CountryCard({
  country,
  onSelect,
  isSelected,
  clickHint,
}: {
  country: ArabCountry;
  onSelect: (country: ArabCountry) => void;
  isSelected: boolean;
  clickHint: string;
}) {
  const { Flag } = country;

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        rotateZ: 0.5,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(country)}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`
        group
        min-w-32 sm:min-w-40 md:min-w-48 lg:min-w-56 xl:min-w-64
        p-4 sm:p-5 md:p-6 lg:p-7
        rounded-2xl md:rounded-3xl
        backdrop-blur-xl
        bg-linear-to-br from-white/5 to-white/2
        border border-white/10
        hover:border-cyan-400/50
        hover:bg-linear-to-br hover:from-cyan-500/10 hover:to-green-500/5
        hover:shadow-[0_0_30px_-8px_rgba(0,255,255,0.3)]
        md:hover:shadow-[0_0_40px_-10px_rgba(0,255,255,0.4)]
        flex flex-col items-center justify-center
        cursor-pointer
        relative
        overflow-visible
        ${
          isSelected
            ? "ring-2 md:ring-3 ring-cyan-400 ring-offset-2 md:ring-offset-3 ring-offset-gray-950"
            : ""
        }
      `}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-cyan-500/0 to-green-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-green-500/5 transition-all duration-500 rounded-2xl md:rounded-3xl" />

      {/* Flag container */}
      <div
        className="
        relative z-10
        w-12 h-8 sm:w-14 sm:h-10 md:w-16 md:h-12 lg:w-20 lg:h-14
        mb-2 sm:mb-3 md:mb-4 lg:mb-5
        rounded-lg md:rounded-xl
        overflow-hidden
        border border-white/20
        group-hover:border-cyan-400/40
        group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]
        md:group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
        transition-all duration-300
      "
      >
        <Flag className="w-full h-full object-cover" />
      </div>

      {/* Country name */}
      <span className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 text-center">
        {country.name}
      </span>

      {/* Country code */}
      <span className="relative z-10 text-xs md:text-sm font-medium text-gray-400 group-hover:text-cyan-300 transition-colors">
        {country.code}
      </span>

      {/* Click me hint */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap hidden sm:block"
      >
        <span className="text-xs md:text-sm px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {clickHint}
        </span>
      </motion.div>

      {/* Hover indicator */}
      <div
        className="
        absolute bottom-0 left-1/2 transform -translate-x-1/2
        w-0 group-hover:w-8 sm:group-hover:w-12 md:group-hover:w-16
        h-0.5 md:h-1
        bg-linear-to-r from-transparent via-cyan-400 to-transparent
        transition-all duration-300
      "
      />
    </motion.div>
  );
}
