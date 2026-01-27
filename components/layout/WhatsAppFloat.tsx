"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { useState, useEffect } from "react";

interface WhatsAppFloatProps {
  locale: string;
}

export default function WhatsAppFloat({ locale }: WhatsAppFloatProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const phoneNumber = "+201011501249";
  const message =
    locale === "ar"
      ? "👋 مرحباً، أود الاستفسار عن خدماتكم"
      : "👋 Hello, I would like to inquire about your services";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const positionClass =
    locale === "ar" ? "left-4 md:left-6" : "right-4 md:right-6";

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const wobbleAnimation = {
    y: [0, -5, 5, -3, 3, 0],
    rotate: [0, -2, 2, -1, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 5,
    },
  };

  const magneticAnimation = {
    x: isHovered ? [0, 5, -5, 0] : 0,
    y: isHovered ? [0, -5, 5, 0] : 0,
    scale: isHovered ? 1.15 : 1,
    transition: {
      x: {
        duration: 0.6,
        ease: "easeInOut" as Easing,
        type: "keyframes" as const,
      },
      y: {
        duration: 0.6,
        ease: "easeInOut" as Easing,
        type: "keyframes" as const,
      },
      scale: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 50,
      }}
      transition={{
        duration: 0.5,
        delay: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className={`fixed bottom-4 md:bottom-6 ${positionClass} z-50`}
    >
      {/* Notification Badge */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 -top-20 md:-top-24"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-2 h-6 bg-linear-to-b from-green-900 to-transparent"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-linear-to-r from-green-900 to-emerald-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-green-700/50 backdrop-blur-sm max-w-xs relative mt-1"
              >
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-900 rotate-45 border-r border-b border-green-700/50"></div>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping absolute"></div>
                    <FaWhatsapp className="text-green-300 text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold whitespace-nowrap">
                      {locale === "ar"
                        ? "تواصل معنا الآن! ⚡"
                        : "Chat with us now! ⚡"}
                    </span>
                    <span className="text-xs text-green-200 opacity-80">
                      {locale === "ar" ? "متاح 24/7" : "Available 24/7"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2, type: "spring" }}
            className={`absolute ${
              locale === "ar" ? "right-full mr-3" : "left-full ml-3"
            } bottom-1/2 transform translate-y-1/2`}
          >
            <div className="relative">
              <div className="bg-linear-to-r from-gray-900 to-black text-white px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border border-gray-700/80 backdrop-blur-xl whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="text-green-400" />
                  <span>
                    {locale === "ar"
                      ? "تواصل معنا عبر واتساب"
                      : "Contact us on WhatsApp"}
                  </span>
                </div>
              </div>
              {/* Tooltip Arrow */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 ${
                  locale === "ar"
                    ? "right-0 translate-x-1/2 border-l-gray-900"
                    : "left-0 -translate-x-1/2 border-r-gray-900"
                } border-t-8 border-b-8 border-t-transparent border-b-transparent`}
              ></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover="hover"
        whileTap="tap"
        aria-label="Contact us on WhatsApp"
      >
        {/* Glow Effect */}
        <motion.div
          animate={isHovered ? wobbleAnimation : {}}
          className="absolute inset-0 bg-linear-to-r from-green-500/30 via-emerald-400/20 to-green-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(37, 211, 102, 0.4), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Main Button */}
        <motion.div
          animate={magneticAnimation}
          className="relative flex items-center justify-center w-16 h-16 md:w-18 md:h-18 rounded-full shadow-2xl overflow-hidden cursor-pointer group"
          style={{
            background:
              "linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)",
            boxShadow:
              "0 10px 30px -5px rgba(37, 211, 102, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Inner Glow */}
          <div className="absolute inset-2 bg-linear-to-br from-white/20 to-transparent rounded-full blur-md"></div>

          {/* Shine Effect */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-linear-to-br from-white/40 to-transparent rounded-tl-full"></div>

          {/* Icon */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2,
              type: "keyframes" as const,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <FaWhatsapp className="text-white text-3xl md:text-3xl drop-shadow-lg" />
          </motion.div>

          {/* Pulse Ring Effect */}
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 border-2 border-green-300/50 rounded-full"
          />

          {/* Micro-interaction Bubbles */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      scale: 0,
                      opacity: 0,
                      x: Math.cos(i * 120 * (Math.PI / 180)) * 10,
                      y: Math.sin(i * 120 * (Math.PI / 180)) * 10,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                      x: Math.cos(i * 120 * (Math.PI / 180)) * 30,
                      y: Math.sin(i * 120 * (Math.PI / 180)) * 30,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.a>

      {/* Floating Particles Background */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-full -z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.cos(i * 45 * (Math.PI / 180)) * 40,
                  y: Math.sin(i * 45 * (Math.PI / 180)) * 40,
                  scale: [0, 1, 0],
                  opacity: [0, 0.3, 0],
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
