"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, Suspense } from "react";
import { HiOutlineUser, HiOutlineSparkles } from "react-icons/hi";

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
import { SpaceParticles, Stars } from "../3d";
import { Canvas } from "@react-three/fiber";

interface ArabCountry {
  code: string;
  name: string;
  Flag: React.ComponentType<{ className?: string }>;
  greeting: string;
}

const arabCountries: ArabCountry[] = [
  {
    code: "DZ",
    name: "الجزائر",
    Flag: DZ,
    greeting: "أهلاً بك من أرض المليون ونصف شهيد! تشرفت بخدمتك الان ",
  },
  {
    code: "BH",
    name: "البحرين",
    Flag: BH,
    greeting: "أهلاً بك من جزر اللؤلؤ! تشرفت بخدمتك الان",
  },
  {
    code: "EG",
    name: "مصر",
    Flag: EG,
    greeting: "أهلاً بيك من أرض الكنانة! تشرفت بخدمتك يا باشا الان",
  },
  {
    code: "IQ",
    name: "العراق",
    Flag: IQ,
    greeting: "أهلاً وسهلاً من أرض الرافدين! تشرفت بخدمتك الان",
  },
  {
    code: "JO",
    name: "الأردن",
    Flag: JO,
    greeting: "أهلاً بك من أرض البتراء! تشرفت بخدمتك الان",
  },
  {
    code: "KW",
    name: "الكويت",
    Flag: KW,
    greeting: "أهلاً بك من ديرة العز! تشرفت بخدمتك الان",
  },
  {
    code: "LB",
    name: "لبنان",
    Flag: LB,
    greeting: "أهلاً بك من أرض الأرز! تشرفت بخدمتك الان",
  },
  {
    code: "LY",
    name: "ليبيا",
    Flag: LY,
    greeting: "أهلاً بك من أرض الصحراء الذهبية! تشرفت بخدمتك الان",
  },
  {
    code: "MA",
    name: "المغرب",
    Flag: MA,
    greeting: "أهلاً بك من أرض الجمال! تشرفت بخدمتك الان",
  },
  {
    code: "OM",
    name: "عُمان",
    Flag: OM,
    greeting: "أهلاً بك من أرض الجبال الشامخة! تشرفت بخدمتك الان",
  },
  {
    code: "PS",
    name: "فلسطين",
    Flag: PS,
    greeting: "أهلاً بك من أرض السلام! تشرفت بخدمتك الان",
  },
  {
    code: "QA",
    name: "قطر",
    Flag: QA,
    greeting: "أهلاً بك من أرض الكرم! تشرفت بخدمتك الان",
  },
  {
    code: "SA",
    name: "السعودية",
    Flag: SA,
    greeting: "أهلاً وسهلاً من أرض الحرمين! تشرفت بخدمتك الان",
  },
  {
    code: "SD",
    name: "السودان",
    Flag: SD,
    greeting: " أهلاً بك من أرض النيل! تشرفت بخدمتك الان",
  },
  {
    code: "SY",
    name: "سوريا",
    Flag: SY,
    greeting: "أهلاً بك من أرض التاريخ العريق! تشرفت بخدمتك الان",
  },
  {
    code: "TN",
    name: "تونس",
    Flag: TN,
    greeting: "أهلاً بك من أرض الياسمين! تشرفت بخدمتك الان",
  },
  {
    code: "AE",
    name: "الإمارات",
    Flag: AE,
    greeting: "أهلاً بك من أرض الطموح! تشرفت بخدمتك الان",
  },
  {
    code: "YE",
    name: "اليمن",
    Flag: YE,
    greeting: "أهلاً بك من أرض الجبال الخضراء! تشرفت بخدمتك الان",
  },
];

const loop: ArabCountry[] = [...arabCountries, ...arabCountries];

interface CountryCardProps {
  country: ArabCountry;
  onSelect: (country: ArabCountry) => void;
  isSelected: boolean;
}

export default function ArabCountriesCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<ArabCountry | null>(
    null
  );
  const [showGreeting, setShowGreeting] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const [isGreetingExiting, setIsGreetingExiting] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

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

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
    >
      <div className="absolute inset-0">
        {/* <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="cursor-pointer"
        >
          <Suspense fallback={null}>
            <Stars />
            <SpaceParticles count={1500} />
            <ambientLight intensity={0.3} color="#001122" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.8}
              color="#0099ff"
            />
          </Suspense>
        </Canvas> */}
        {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" /> */}
      </div>

      {/* Heading */}
      <motion.div
        style={{ y: parallaxY }}
        className="relative z-10 text-center mb-12 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-linear-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            أخدم الوطن العربي بالكامل
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          تعاونت مع عملاء من مختلف الدول العربية، مع فهم عميق لطبيعة كل سوق
          محلي، واحتياجات الجمهور المستهدف، مما يضمن تقديم حلول رقمية مخصصة تحقق
          أفضل نتائج في كل دولة.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-2xl px-6 py-4 mb-6"
        >
          <HiOutlineUser className="text-2xl text-cyan-400" />
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">
              من أي دولة عربية أنت؟
            </h3>
            <p className="text-gray-300 text-sm">
              اختر دولتك وشوف رسالة ترحيبية خاصة
            </p>
          </div>
          <HiOutlineSparkles className="text-2xl text-green-400 animate-pulse" />
        </motion.div>
        {showGreeting && selectedCountry && (
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
            className="mt-6 mb-8"
          >
            <div className="inline-flex items-center gap-4 bg-linear-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/50 rounded-2xl px-6 py-4 backdrop-blur-xl max-w-md mx-auto">
              <div className="w-14 h-10 rounded-lg overflow-hidden border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)] shrink-0">
                <selectedCountry.Flag className="w-full h-full object-cover" />
              </div>
              <div className="text-right flex-1">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-lg font-bold text-white">
                    {selectedCountry.name}
                  </span>
                  <span className="text-xs px-2 py-1 bg-cyan-500/30 text-cyan-300 rounded-full">
                    {selectedCountry.code}
                  </span>
                </div>
                <p className="text-gray-200 text-base font-arabic typing-animation min-h-6">
                  {typedText}
                  {/* تم إزالة المؤشر السماوي */}
                </p>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
              className="text-cyan-300/70 text-sm mt-2"
            >
              ✓ الرسالة ستظهر لمدة 6 ثوانٍ
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {/* ROW 1 */}
      <div
        className="relative overflow-hidden mb-10"
        onMouseEnter={() => !showGreeting && setPaused(true)}
        onMouseLeave={() => !showGreeting && setPaused(false)}
      >
        <motion.div
          className="flex gap-6 w-max"
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
          className="flex gap-6 w-max"
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
            />
          ))}
        </motion.div>
      </div>

      {/* Fade edges with gradient */}
      {/* <div className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-linear-to-r from-black via-black/95 to-transparent z-10" /> */}
      {/* <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-linear-to-l from-black via-black/95 to-transparent z-10" /> */}

      {/* إضافة الأنماط CSS */}
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

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .typing-animation {
          overflow: hidden;
          white-space: nowrap;
          direction: rtl;
          text-align: right;
          /* تم إزالة border-right والوميض */
        }

        .font-arabic {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 500;
          line-height: 1.6;
        }

        /* حل مشكلة overflow */
        .overflow-visible {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}

/* =========================
   Country Card (Magnetic)
========================= */

function CountryCard({ country, onSelect, isSelected }: CountryCardProps) {
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
        min-w-40 p-5 rounded-2xl
        backdrop-blur-xl
        bg-linear-to-br from-white/5 to-white/2
        border border-white/10
        hover:border-cyan-400/50
        hover:bg-linear-to-br hover:from-cyan-500/10 hover:to-green-500/5
        hover:shadow-[0_0_30px_-8px_rgba(0,255,255,0.3)]
        flex flex-col items-center justify-center
        cursor-pointer
        relative
        overflow-visible
        ${
          isSelected
            ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-950"
            : ""
        }
      `}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-cyan-500/0 to-green-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-green-500/5 transition-all duration-500 rounded-2xl" />

      {/* Flag container */}
      <div
        className="
        relative z-10
        w-14 h-10
        mb-3
        rounded-lg
        overflow-hidden
        border border-white/20
        group-hover:border-cyan-400/40
        group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]
        transition-all duration-300
      "
      >
        <Flag className="w-full h-full object-cover" />
      </div>

      {/* Country name */}
      <span className="relative z-10 text-base font-bold text-white mb-1">
        {country.name}
      </span>

      {/* Country code */}
      <span className="relative z-10 text-xs font-medium text-gray-400 group-hover:text-cyan-300 transition-colors">
        {country.code}
      </span>

      {/* Click me hint */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
      >
        <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          اضغط للترحيب 👆
        </span>
      </motion.div>

      {/* Hover indicator */}
      <div
        className="
        absolute bottom-0 left-1/2 transform -translate-x-1/2
        w-0 group-hover:w-12
        h-0.5
        bg-linear-to-r from-transparent via-cyan-400 to-transparent
        transition-all duration-300
      "
      />
    </motion.div>
  );
}
