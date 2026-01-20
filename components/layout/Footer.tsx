"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect } from "react";
import {
  FaReact,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaWordpress,
  FaShopify,
  FaChartLine,
  FaNewspaper,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiSalla } from "react-icons/si";
import {
  FiMail,
  FiMapPin,
  FiTrendingUp,
  FiMessageSquare,
} from "react-icons/fi";
import { Canvas } from "@react-three/fiber";
import Stars from "../3d/Stars";
import SpaceParticles from "../3d/SpaceParticles";
import { usePathname } from "next/navigation";

const coreTechnologies = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "SEO", icon: <FiTrendingUp /> },
  { name: "Node.js", icon: <FaChartLine /> },
  { name: "WordPress", icon: <FaWordpress /> },
  { name: "Salla", icon: <SiSalla /> },
  { name: "Shopify", icon: <FaShopify /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
];

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com" },
  { icon: <FaLinkedin />, url: "https://linkedin.com" },
  { icon: <FaWhatsapp />, url: "https://wa.me/201011501249" },
  { icon: <FaTelegram />, url: "https://t.me" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaYoutube />, url: "https://youtube.com" },
];

export default function Footer() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const [locale, setLocale] = useState<string>("ar");
  const currentYear = new Date().getFullYear();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // استخراج اللغة من المسار
    const pathLocale = pathname.split('/')[1] || 'ar';
    setLocale(pathLocale);
    
    const loadContent = async () => {
      try {
        const module = await import(`@/content/${pathLocale}/components/layout/footer`);
        setContent(module.footerContent);
      } catch (error) {
        console.error("Error loading footer content:", error);
        // استخدام المحتوى العربي كخيار احتياطي
        const fallback = await import(`@/content/ar/components/layout/footer`);
        setContent(fallback.footerContent);
      }
    };

    loadContent();
  }, [pathname]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`شكراً للاشتراك! ستصل التحديثات إلى: ${email}`);
      setEmail("");
    }
  };

  if (!content) {
    return (
      <footer className="relative bg-linear-to-b from-gray-900 via-black to-gray-900 overflow-hidden py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </footer>
    );
  }

  const isArabic = locale === "ar";
  const copyrightText = content.copyright.replace("{{year}}", currentYear);

  return (
    <>
      <footer
        className="relative bg-linear-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
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
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" />
        </div>

        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
          {/* Four Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column one */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold">
                  <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {content.title}
                  </span>
                </h2>
                <div className="mt-2 text-lg font-medium text-cyan-300">
                  {content.subtitle}
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {content.description}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {content.stats.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className="text-center p-3 bg-white/5 rounded-lg"
                  >
                    <div className="text-xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column Two */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {content.webSolutionsTitle}
                </h3>
                <div className="space-y-2">
                  {content.webSolutions.map((service: any, idx: number) => (
                    <div
                      key={idx}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {service.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {content.technologiesTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {coreTechnologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5"
                    >
                      <span className="text-cyan-400">{tech.icon}</span>
                      <span className="text-sm text-gray-300">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column Three */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {content.servicesTitle}
                </h3>
                <div className="space-y-4">
                  {content.services.map((service: any, idx: number) => (
                    <div
                      key={idx}
                      className="pb-4 border-b border-white/5 last:border-0"
                    >
                      <div className="text-gray-300 font-medium mb-1">
                        {service.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {service.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {content.skillsTitle}
                </h3>
                <div className="space-y-3">
                  {content.skills.map((skill: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-400">{skill.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column Four */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {content.achievementsTitle}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {content.achievements.map((achievement: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/5 text-center"
                    >
                      <div className="text-gray-300 text-sm mb-1">
                        {achievement.name}
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 inline-block">
                        {achievement.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">
                  {content.newsletterTitle}
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <FaNewspaper className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.newsletterPlaceholder}
                      className="w-full pr-10 pl-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    {content.newsletterButton}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-gray-900/40 to-gray-900/20 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {content.contactTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.contactInfo.map((info: any, idx: number) => (
                <a
                  key={idx}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="text-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                    {info.icon === "FiMail" ? <FiMail /> : 
                     info.icon === "FaWhatsapp" ? <FaWhatsapp /> : 
                     <FiMapPin />}
                  </div>
                  <div>
                    <div className="text-gray-300 group-hover:text-white font-medium">
                      {info.text}
                    </div>
                    <div className="text-sm text-gray-500">{info.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
          <div className="border-t border-white/10 pt-8 mb-6">
            <div className="flex flex-wrap justify-center gap-6">
              {content.legalLinks.map((link: any, idx: number) =>
                link.href ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (link.name === content.legalLinks[0].name) setShowPrivacyModal(true);
                      else if (link.name === content.legalLinks[1].name) setShowTermsModal(true);
                      else if (link.name === content.legalLinks[2].name) setShowCookiesModal(true);
                    }}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="text-center pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              {copyrightText}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {content.tagline}
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPrivacyModal && (
        <PrivacyModal content={content} onClose={() => setShowPrivacyModal(false)} />
      )}
      {showTermsModal && (
        <TermsModal content={content} onClose={() => setShowTermsModal(false)} />
      )}
      {showCookiesModal && (
        <CookiesModal content={content} onClose={() => setShowCookiesModal(false)} />
      )}
    </>
  );
}

function PrivacyModal({ content, onClose }: { content: any, onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      dir={content.locale === "ar" ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-br from-gray-900 to-black border border-cyan-400/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white">
              {content.privacyTitle}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl p-2"
            >
              ×
            </button>
          </div>

          <div className="text-gray-300 space-y-6">
            {Object.entries(content.privacySections).map(([key, section]: [string, any]) => (
              <div key={key}>
                <h4 className="text-xl font-bold text-white mb-3">
                  {section.title}
                </h4>
                {section.content ? (
                  <p>{section.content}</p>
                ) : section.items ? (
                  <ul className="list-disc pr-6 space-y-2">
                    {section.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400">
                آخر تحديث: {new Date().toLocaleDateString(content.locale === "ar" ? "ar-EG" : "en-US")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TermsModal({ content, onClose }: { content: any, onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      dir={content.locale === "ar" ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-br from-gray-900 to-black border border-green-400/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white">
              {content.termsTitle}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl p-2"
            >
              ×
            </button>
          </div>

          <div className="text-gray-300 space-y-6">
            {Object.entries(content.termsSections).map(([key, section]: [string, any]) => (
              <div key={key}>
                <h4 className="text-xl font-bold text-white mb-3">
                  {section.title}
                </h4>
                {section.content ? (
                  <p>{section.content}</p>
                ) : section.items ? (
                  <ul className="list-disc pr-6 space-y-2">
                    {section.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400">
                السارية من: {new Date().toLocaleDateString(content.locale === "ar" ? "ar-EG" : "en-US")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CookiesModal({ content, onClose }: { content: any, onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      dir={content.locale === "ar" ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-br from-gray-900 to-black border border-purple-400/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white">
              {content.cookiesTitle}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl p-2"
            >
              ×
            </button>
          </div>

          <div className="text-gray-300 space-y-6">
            {Object.entries(content.cookiesSections).map(([key, section]: [string, any]) => {
              if (key === 'cookieTypes') {
                return (
                  <div key={key}>
                    <h4 className="text-xl font-bold text-white mb-3">
                      {section.title}
                    </h4>
                    <div className="space-y-4">
                      {section.types.map((type: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-lg bg-white/5">
                          <h5 className="font-bold text-white mb-2">
                            {idx + 1}. {type.name}
                          </h5>
                          <p className="text-sm text-gray-400">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              } else if (key === 'cookieManagement') {
                return (
                  <div key={key}>
                    <h4 className="text-xl font-bold text-white mb-3">
                      {section.title}
                    </h4>
                    <p>{section.content}</p>
                    <div className="mt-4 p-4 rounded-lg bg-white/5">
                      <h5 className="font-bold text-white mb-2">
                        كيفية إدارة الكوكيز في المتصفحات الشائعة:
                      </h5>
                      <ul className="list-disc pr-6 space-y-1 text-sm text-gray-400">
                        {section.browsers.map((browser: string, idx: number) => (
                          <li key={idx}>{browser}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              } else if (key === 'cookieButtons') {
                return (
                  <div key={key} className="flex gap-4 pt-6 border-t border-white/10">
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold"
                    >
                      {section.acceptAll}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10"
                    >
                      {section.managePreferences}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10"
                    >
                      {section.rejectAll}
                    </button>
                  </div>
                );
              } else {
                return (
                  <div key={key}>
                    <h4 className="text-xl font-bold text-white mb-3">
                      {section.title}
                    </h4>
                    <p>{section.content}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}