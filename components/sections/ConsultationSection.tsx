"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect, useMemo } from "react";
import { SpaceParticles, Stars } from "../3d";

// SVG Icons - Custom components
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
          {/* <Stars /> */}
          <SpaceParticles />
          <ambientLight intensity={0.3} color="#001122" />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            color="#0099ff"
          />
        </Suspense>
      </Canvas>
      {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" /> */}
    </>
  );
};

export default function ConsultationSection() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (activeContactMethod === "whatsapp") {
      const whatsappMessage = `مرحباً، أنا ${formData.name}%0Aأريد استشارة حول: ${formData.message}%0Aرقم هاتفي: ${formData.phone}%0Aبريدي: ${formData.email}%0Aالوقت المناسب: ${formData.preferredTime}`;
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

  const consultationTypes = [
    {
      value: "general",
      label: "استشارة عامة",
      icon: "💡",
      desc: "مناقشة فكرة مشروعك",
    },
    {
      value: "technical",
      label: "استشارة تقنية",
      icon: "⚙️",
      desc: "تقييم الجدوى التقنية",
    },
    {
      value: "strategy",
      label: "استشارة استراتيجية",
      icon: "🎯",
      desc: "تخطيط لمسار المشروع",
    },
    {
      value: "review",
      label: "مراجعة مشروع",
      icon: "🔍",
      desc: "مراجعة مشروع قائم",
    },
  ];

  return (
    <section
      id="الاستشارة"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
      dir="rtl"
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
              استشارة مجانية 30 دقيقة
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl opacity-30"></span>
              <span className="relative bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                استشارة مجانية
              </span>
            </span>
            <br />
            <span className="text-white mt-2 block">لمشروعك التقني </span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            اختر طريقة التواصل المناسبة لك وابدأ رحلة تحويل فكرتك إلى مشروع ناجح
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
                      تم طلب الاستشارة بنجاح!
                    </h3>

                    <div className="max-w-md mx-auto mb-8">
                      <p className="text-gray-300 text-lg mb-6">
                        {activeContactMethod === "whatsapp"
                          ? "تم فتح واتساب، يمكنك بدء المحادثة الآن"
                          : activeContactMethod === "phone"
                            ? "جاري تحويلك للاتصال الهاتفي..."
                            : "شكراً لثقتك! سأتواصل معك خلال 24 ساعة لتحديد موعد الاستشارة."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="text-cyan-400 text-2xl mb-2">📧</div>
                          <p className="text-sm text-gray-300">
                            تأكيد على بريدك
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="text-green-400 text-2xl mb-2">📞</div>
                          <p className="text-sm text-gray-300">
                            اتصال على رقمك
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="text-purple-400 text-2xl mb-2">
                            🗓️
                          </div>
                          <p className="text-sm text-gray-300">تحديد الموعد</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300 font-medium"
                    >
                      طلب استشارة أخرى
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        ابدأ استشارتك الآن
                      </h3>
                      <p className="text-gray-400">
                        اختر طريقة التواصل المناسبة واملأ النموذج لبدء استشارتك
                        المجانية الان
                      </p>
                    </div>
                    {/* نموذج البيانات */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-300 mb-3 text-right text-sm font-medium">
                            الاسم الكامل *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-right"
                            placeholder="كيف يمكنني مناداتك؟"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-3 text-right text-sm font-medium">
                            رقم الهاتف *
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-right"
                            placeholder="+20 123 456 7890"
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
                        <label className="block text-gray-300 mb-3 text-right text-sm font-medium">
                          البريد الإلكتروني *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-right"
                          placeholder="example@domain.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-3 text-right text-sm font-medium">
                          نوع الاستشارة المطلوبة
                        </label>
                        <select
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-right appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA5TDEyIDE1TDE4IDkiIHN0cm9rZT0iIzlDQTREQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-position-[left_1rem_center]"
                          value={formData.consultationType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consultationType: e.target.value,
                            })
                          }
                        >
                          {consultationTypes.map((type) => (
                            <option
                              key={type.value}
                              value={type.value}
                              className="bg-gray-900 text-right"
                            >
                              {type.label} - {type.desc}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-3 text-right text-sm font-medium">
                          الوقت المناسب للاتصال
                        </label>
                        <select
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-right appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA5TDEyIDE1TDE4IDkiIHN0cm9rZT0iIzlDQTREQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-position-[left_1rem_center]"
                          value={formData.preferredTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredTime: e.target.value,
                            })
                          }
                        >
                          <option value="" className="bg-gray-900 text-right">
                            اختر الوقت المناسب
                          </option>
                          <option
                            value="morning"
                            className="bg-gray-900 text-right"
                          >
                            الصباح (9 ص - 12 م)
                          </option>
                          <option
                            value="afternoon"
                            className="bg-gray-900 text-right"
                          >
                            الظهر (12 م - 4 م)
                          </option>
                          <option
                            value="evening"
                            className="bg-gray-900 text-right"
                          >
                            المساء (4 م - 8 م)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-3 text-right text-sm font-medium">
                          اخبرني عن مشروعك *
                        </label>
                        <textarea
                          required
                          rows={4}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none text-right"
                          placeholder="ما هي فكرة مشروعك؟ ما الذي تريد تحقيقه؟ أي مشاكل تواجهها؟"
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
                        {/* تأثير تألق */}
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>

                        <span className="relative">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                              جاري الإرسال...
                            </>
                          ) : (
                            <>
                              <SendIcon className="w-5 h-5 inline-block ml-2" />
                              {activeContactMethod === "whatsapp"
                                ? "ارسل عبر واتساب الآن"
                                : activeContactMethod === "phone"
                                  ? "اتصل بي الآن"
                                  : "ابدأ استشارتك المجانية"}
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
              لا تتردد!{" "}
              <span className="text-blue-400 font-bold">30 دقيقة مجانية</span>{" "}
              قد تكون نقطة التحول لمشروعك
            </p>
          </div>
          <p className="text-gray-500 mt-4">
            اختر الطريقة المناسبة لك وابدأ رحلة نجاح مشروعك اليوم
          </p>
        </motion.div>
      </div>
    </section>
  );
}
