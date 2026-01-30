"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect, useMemo } from "react";
import { SpaceParticles, Stars } from "../3d";
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

const ClientParticles = () => {
  const particleCount = 20;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
    }));
  }, [particleCount]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-px h-px bg-cyan-400/30 rounded-full"
          initial={{
            x: `${particle.initialX}vw`,
            y: `${particle.initialY}vh`,
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </>
  );
};

const ClientCanvas = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" />
    );
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="cursor-pointer"
      >
        <Suspense fallback={null}>
          <SpaceParticles />
          <ambientLight intensity={0.3} color="#001122" />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            color="#0099ff"
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default function ConsultationSection() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "general",
    preferredTime: "",
    message: "",
    contactMethod: "free_consultation",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeContactMethod, setActiveContactMethod] =
    useState("free_consultation");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(
          `@/content/${locale}/components/sections/consultation-section`
        );
        setContent(module.consultationSectionContent);
      } catch (error) {
        console.error("Error loading consultation section content:", error);
        const fallback = await import(
          `@/content/ar/components/sections/consultation-section`
        );
        setContent(fallback.consultationSectionContent);
      }
    };

    loadContent();
  }, [locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (activeContactMethod === "whatsapp") {
      const whatsappMessage = isArabic
        ? `مرحباً، أنا ${formData.name}%0Aأريد استشارة حول: ${formData.message}%0Aرقم هاتفي: ${formData.phone}%0Aبريدي: ${formData.email}%0Aالوقت المناسب: ${formData.preferredTime}`
        : `Hello, I'm ${formData.name}%0AI want a consultation about: ${formData.message}%0AMy phone: ${formData.phone}%0AMy email: ${formData.email}%0APreferred time: ${formData.preferredTime}`;
      window.open(
        `https://wa.me/201234567890?text=${whatsappMessage}`,
        "_blank",
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
    } else if (activeContactMethod === "phone") {
      window.open("tel:+201234567890", "_self");
      setIsSubmitting(false);
      setIsSubmitted(true);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Consultation request submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "general",
        preferredTime: "",
        message: "",
        contactMethod: "free_consultation",
      });
    }, 3000);
  };

  if (!content) {
    return (
      <section
        id="consultation"
        className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Loading indicator */}
        <div className="container relative mx-auto px-4 sm:px-6">
          {/* Header section skeleton */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-800/40 border border-gray-700/50 mb-8 animate-pulse">
              <div className="w-5 h-5 bg-gray-700/60 rounded-full" />
              <div className="h-3 w-32 bg-gray-700/60 rounded-full" />
            </div>

            {/* Title */}
            <div className="mb-6">
              <div className="h-8 sm:h-10 md:h-12 bg-gray-800/70 rounded-lg max-w-3xl mx-auto mb-4 animate-pulse" />
              <div className="h-6 sm:h-7 md:h-8 bg-gray-800/60 rounded-lg max-w-2xl mx-auto animate-pulse" />
            </div>

            {/* Description */}
            <div className="h-4 bg-gray-800/60 rounded-full max-w-xl mx-auto animate-pulse" />
          </div>

          {/* Form container skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="relative backdrop-blur-xl bg-gray-900/30 rounded-3xl border border-gray-700/50 overflow-hidden animate-pulse">
              {/* Top gradient bar */}
              <div className="h-2 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700" />

              {/* Form content */}
              <div className="p-6 sm:p-8 md:p-10">
                {/* Form title */}
                <div className="text-center mb-8">
                  <div className="h-6 sm:h-7 bg-gray-800/70 rounded-full max-w-md mx-auto mb-3" />
                  <div className="h-3 bg-gray-800/60 rounded-full max-w-sm mx-auto" />
                </div>

                {/* Form fields grid */}
                <div className="space-y-6">
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="h-3 w-16 bg-gray-700/60 rounded-full mb-3" />
                      <div className="h-12 bg-gray-800/40 border border-gray-700/50 rounded-xl" />
                    </div>
                    <div>
                      <div className="h-3 w-16 bg-gray-700/60 rounded-full mb-3" />
                      <div className="h-12 bg-gray-800/40 border border-gray-700/50 rounded-xl" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="h-3 w-16 bg-gray-700/60 rounded-full mb-3" />
                    <div className="h-12 bg-gray-800/40 border border-gray-700/50 rounded-xl" />
                  </div>

                  {/* Consultation Type */}
                  <div>
                    <div className="h-3 w-24 bg-gray-700/60 rounded-full mb-3" />
                    <div className="h-12 bg-gray-800/40 border border-gray-700/50 rounded-xl" />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <div className="h-3 w-24 bg-gray-700/60 rounded-full mb-3" />
                    <div className="h-12 bg-gray-800/40 border border-gray-700/50 rounded-xl" />
                  </div>

                  {/* Message */}
                  <div>
                    <div className="h-3 w-16 bg-gray-700/60 rounded-full mb-3" />
                    <div className="h-32 bg-gray-800/40 border border-gray-700/50 rounded-xl" />
                  </div>

                  {/* Submit Button */}
                  <div className="h-14 bg-linear-to-r from-gray-700 to-gray-600 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom message skeleton */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gray-800/30 border border-gray-700/40 animate-pulse">
              <div className="w-5 h-5 bg-gray-700/60 rounded-full" />
              <div className="h-3 w-64 bg-gray-700/60 rounded-full" />
            </div>
            <div className="h-3 w-48 bg-gray-800/50 rounded-full mx-auto mt-4 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={content.sectionId}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          <ClientParticles />
        </div>
      )}
      <div className="absolute inset-0">
        <ClientCanvas />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-400/30 mb-8 backdrop-blur-sm"
          >
            <SparkleIcon className="text-purple-400 w-5 h-5" />
            <span className="text-purple-400 font-medium text-sm">
              {content.additionalTexts.free30Minutes}
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl opacity-30"></span>
              <span className="relative bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {content.title.freeConsultation}
              </span>
            </span>
            <br />
            <span className="text-white mt-2 block">
              {content.title.forYourTechProject}
            </span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {content.description.chooseMethod}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl"></div>

            <div className="relative backdrop-blur-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
              <div className="h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              <div className="p-6 sm:p-8 md:p-10">
                {isSubmitted ? (
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-linear-to-r from-green-400 to-cyan-400 rounded-full blur-xl opacity-50"></div>
                      <div className="relative text-6xl sm:text-7xl">✨</div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {content.successMessages.title}
                    </h3>

                    <div className="max-w-md mx-auto mb-8">
                      <p className="text-gray-300 text-lg mb-6">
                        {activeContactMethod === "whatsapp"
                          ? content.successMessages.whatsapp
                          : activeContactMethod === "phone"
                            ? content.successMessages.phone
                            : content.successMessages.default}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {content.steps.map((step: any, index: number) => (
                          <div
                            key={index}
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                          >
                            <div className="text-2xl mb-2">{step.icon}</div>
                            <p className="text-sm text-gray-300">{step.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300 font-medium"
                    >
                      {content.buttons.anotherConsultation}
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {content.title.mainTitle}
                      </h3>
                      <p className="text-gray-400">
                        {content.additionalTexts.chooseMethodAndFill}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            className="block text-gray-300 mb-3 text-sm font-medium"
                            style={{ textAlign: isArabic ? "right" : "left" }}
                          >
                            {content.labels.name}
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                            style={{ textAlign: isArabic ? "right" : "left" }}
                            placeholder={content.placeholders.name}
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label
                            className="block text-gray-300 mb-3 text-sm font-medium"
                            style={{ textAlign: isArabic ? "right" : "left" }}
                          >
                            {content.labels.phone}
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                            style={{ textAlign: isArabic ? "right" : "left" }}
                            placeholder={content.placeholders.phone}
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-gray-300 mb-3 text-sm font-medium"
                          style={{ textAlign: isArabic ? "right" : "left" }}
                        >
                          {content.labels.email}
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                          style={{ textAlign: isArabic ? "right" : "left" }}
                          placeholder={content.placeholders.email}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label
                          className="block text-gray-300 mb-3 text-sm font-medium"
                          style={{ textAlign: isArabic ? "right" : "left" }}
                        >
                          {content.labels.consultationType}
                        </label>
                        <select
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                          style={{
                            textAlign: isArabic ? "right" : "left",
                            backgroundPosition: isArabic
                              ? "left 1rem center"
                              : "right 1rem center",
                          }}
                          value={formData.consultationType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consultationType: e.target.value,
                            })
                          }
                        >
                          {content.consultationTypes.map((type: any) => (
                            <option
                              key={type.value}
                              value={type.value}
                              className="bg-gray-900"
                              style={{ textAlign: isArabic ? "right" : "left" }}
                            >
                              {type.icon} {type.label} - {type.desc}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-gray-300 mb-3 text-sm font-medium"
                          style={{ textAlign: isArabic ? "right" : "left" }}
                        >
                          {content.labels.preferredTime}
                        </label>
                        <select
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                          style={{
                            textAlign: isArabic ? "right" : "left",
                            backgroundPosition: isArabic
                              ? "left 1rem center"
                              : "right 1rem center",
                          }}
                          value={formData.preferredTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredTime: e.target.value,
                            })
                          }
                        >
                          {content.preferredTimes.map((time: any) => (
                            <option
                              key={time.value}
                              value={time.value}
                              className="bg-gray-900"
                              style={{ textAlign: isArabic ? "right" : "left" }}
                            >
                              {time.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-gray-300 mb-3 text-sm font-medium"
                          style={{ textAlign: isArabic ? "right" : "left" }}
                        >
                          {content.labels.message}
                        </label>
                        <textarea
                          required
                          rows={4}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                          style={{ textAlign: isArabic ? "right" : "left" }}
                          placeholder={content.placeholders.message}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 text-lg overflow-hidden group ${
                          activeContactMethod === "whatsapp"
                            ? "bg-linear-to-r from-green-400 to-emerald-500 hover:shadow-green-500/30"
                            : activeContactMethod === "phone"
                              ? "bg-linear-to-r from-cyan-500 to-blue-500 hover:shadow-cyan-500/30"
                              : "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-purple-500/30"
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>

                        <span className="relative">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                              {content.buttons.submitting}
                            </>
                          ) : (
                            <>
                              <SendIcon className="w-5 h-5 inline-block ml-2" />
                              {activeContactMethod === "whatsapp"
                                ? content.buttons.whatsapp
                                : activeContactMethod === "phone"
                                  ? content.buttons.phone
                                  : content.buttons.startConsultation}
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
            <div className="text-blue-400 animate-pulse">🚀</div>
            <p className="text-gray-300">
              {content.additionalTexts.dontHesitate}{" "}
              <span className="text-blue-400 font-bold">
                {content.additionalTexts.free30MinutesHighlight}
              </span>{" "}
              {content.additionalTexts.turningPoint}
            </p>
          </div>
          <p className="text-gray-500 mt-4">
            {content.additionalTexts.chooseMethodAndStart}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
