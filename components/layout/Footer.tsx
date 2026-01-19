"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
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

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const [email, setEmail] = useState("");

  const webSolutions = [
    {
      name: "تطوير مواقع الويب",
      href: "/services/web-development",
    },
    {
      name: "تطوير ووردبريس",
      href: "/services/wordpress",
    },
    {
      name: "منصة سلة",
      href: "/services/salla",
    },
    {
      name: "منصة شوبيفاي",
      href: "/services/shopify",
    },
    {
      name: "منصة زد",
      href: "/services/zid",
    },
  ];

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

  const premiumServices = [
    {
      name: "مهندس مبيعات رقمي",
      desc: "حلول مبيعات تقنية متكاملة",
    },
    {
      name: "خدمة عملاء احترافية",
      desc: "دعم عملاء 24/7 بأعلى معايير",
    },
    {
      name: "مساعد شخصي افتراضي",
      desc: "تنظيم وإدارة المهام اليومية",
    },
  ];

  const businessSkills = [
    { name: "مهارة البيع", level: "متقدم" },
    { name: "مهارة التفاوض", level: "متقدم" },
    { name: "حل مشاكل العملاء", level: "متخصص" },
    { name: "مهارة التنظيم", level: "احترافي" },
  ];

  const achievements = [
    { name: "مهارة الإنجليزية", badge: "مهارة" },
    { name: "شهادات معتمدة", badge: "اعتماد" },
    { name: "تكريمات", badge: "تكريم" },
    { name: "بدايات أفتخر بها", badge: "بداية" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com" },
    { icon: <FaLinkedin />, url: "https://linkedin.com" },
    { icon: <FaWhatsapp />, url: "https://wa.me/201011501249" },
    { icon: <FaTelegram />, url: "https://t.me" },
    { icon: <FaInstagram />, url: "https://instagram.com" },
    { icon: <FaYoutube />, url: "https://youtube.com" },
  ];

  const contactInfo = [
    {
      icon: <FiMail />,
      text: "ebraheemalimahrous000@gmail.com",
      href: "mailto:ebraheemalimahrous000@gmail.com",
      label: "أرسل بريد إلكتروني",
    },
    {
      icon: <FaWhatsapp />,
      text: "واتساب للاستشارات",
      href: "https://wa.me/201011501249",
      label: "راسلني على واتساب",
    },
    {
      icon: <FiMapPin />,
      text: "مصر - خدمات أونلاين عالمية",
      href: "https://maps.google.com/?q=Cairo,Egypt",
      label: "موقعي الجغرافي",
    },
  ];

  const legalLinks = [
    { name: "سياسة الخصوصية", onClick: () => setShowPrivacyModal(true) },
    { name: "شروط الخدمة", onClick: () => setShowTermsModal(true) },
    { name: "سياسة الكوكيز", onClick: () => setShowCookiesModal(true) },
    { name: "إخلاء المسؤولية", href: "/disclaimer" },
    { name: "خريطة الموقع", href: "/sitemap.xml" },
    { name: "ملف robots.txt", href: "/robots.txt" },
  ];

  const stats = [
    { number: "50+", label: "مشروع ناجح" },
    { number: "95%", label: "رضا العملاء" },
    { number: "24/7", label: "دعم فني" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`شكراً للاشتراك! ستصل التحديثات إلى: ${email}`);
      setEmail("");
    }
  };

  return (
    <>
      <footer
        className="relative bg-linear-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
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
                    إبراهيم.dev
                  </span>
                </h2>
                <div className="mt-2 text-lg font-medium text-cyan-300">
                  مطور ويب وتجارة إلكترونية
                </div>
              </div>

              <p className="text-gray-300 mb-6 text-right leading-relaxed">
                مطور ويب وتجارة إلكترونية محترف مع أكثر من 5 سنوات خبرة في بناء
                حلول رقمية متكاملة. أتخصص في تطوير مواقع الويب، متاجر التجارة
                الإلكترونية، وحلول الأعمال التقنية التي تحقق نتائج ملموسة
                لعملائي.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {stats.map((stat, idx) => (
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
                  حلول الويب
                </h3>
                <div className="space-y-2">
                  {webSolutions.map((service, idx) => (
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
                  التقنيات الأساسية
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
                  خدمات مميزة
                </h3>
                <div className="space-y-4">
                  {premiumServices.map((service, idx) => (
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
                  مهارات الأعمال
                </h3>
                <div className="space-y-3">
                  {businessSkills.map((skill, idx) => (
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
                  إنجازات
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, idx) => (
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
                  النشرة الإخبارية
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <FaNewspaper className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="بريدك الإلكتروني"
                      className="w-full pr-10 pl-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    اشترك الآن
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
              تواصل معي الآن
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="text-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                    {info.icon}
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
              {legalLinks.map((link, idx) =>
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
                    onClick={link.onClick}
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
              {currentYear} © <span className="text-white">إبراهيم</span>— كل
              الحقوق محفوظة
            </p>
            <p className="text-gray-500 text-sm mt-2">
              مصمم ومطور بقلب عربي وروح عالمية
            </p>
          </div>
        </div>
      </footer>

      {showPrivacyModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-br from-gray-900 to-black border border-cyan-400/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-white">
                  سياسة الخصوصية
                </h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-400 hover:text-white text-2xl p-2"
                >
                  ×
                </button>
              </div>

              <div className="text-gray-300 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">مقدمة</h4>
                  <p>
                    نحن في إبراهيم.dev نعمل على حماية خصوصية زوارنا وعملائنا.
                    تشرح سياسة الخصوصية هذه كيفية جمع واستخدام ومشاركة معلوماتك
                    الشخصية عندما تزور موقعنا أو تستخدم خدماتنا.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    المعلومات التي نجمعها
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>
                      المعلومات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف
                    </li>
                    <li>
                      معلومات المشروع: متطلبات المشروع، الميزانية، الجدول الزمني
                    </li>
                    <li>بيانات التواصل: المراسلات والمكالمات والاجتماعات</li>
                    <li>
                      المعلومات التقنية: عنوان IP، نوع المتصفح، نظام التشغيل
                    </li>
                    <li>بيانات الاستخدام: الصفحات التي تزورها، وقت الزيارة</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    كيف نستخدم معلوماتك
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>توفير الخدمات المطلوبة وتنفيذ المشاريع</li>
                    <li>الاتصال بك بشأن تحديثات المشروع أو العروض</li>
                    <li>تحسين خدماتنا وتجربة المستخدم</li>
                    <li>الامتثال للقوانين واللوائح المعمول بها</li>
                    <li>حماية حقوقنا القانونية والملكية</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    حماية المعلومات
                  </h4>
                  <p>
                    نستخدم تدابير أمنية تقنية وإدارية مناسبة لحماية معلوماتك
                    الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو
                    التدمير. وتشمل هذه التدابير تشفير البيانات، ومراقبة الوصول،
                    وتدريب الموظفين.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    الاحتفاظ بالبيانات
                  </h4>
                  <p>
                    نحتفظ بمعلوماتك الشخصية فقط طالما كان ذلك ضروريًا لتحقيق
                    الأغراض التي تم جمعها من أجلها، بما في ذلك تلبية المتطلبات
                    القانونية أو المحاسبية أو الإبلاغ.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">حقوقك</h4>
                  <p>
                    لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها
                    أو تقييد معالجتها. يمكنك ممارسة هذه الحقوق من خلال الاتصال
                    بنا على البريد الإلكتروني المذكور في هذه السياسة.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    آخر تحديث: {new Date().toLocaleDateString("ar-EG")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {showTermsModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-br from-gray-900 to-black border border-green-400/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-white">شروط الخدمة</h3>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-400 hover:text-white text-2xl p-2"
                >
                  ×
                </button>
              </div>

              <div className="text-gray-300 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">القبول</h4>
                  <p>
                    باستخدامك لهذا الموقع أو خدماتنا، فإنك توافق على الالتكام
                    بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، فيرجى عدم
                    استخدام موقعنا أو خدماتنا.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    الخدمات المقدمة
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>تطوير وتصميم مواقع الويب</li>
                    <li>تطوير متاجر التجارة الإلكترونية</li>
                    <li>استشارات تقنية وتطوير الأعمال</li>
                    <li>تحسين محركات البحث (SEO)</li>
                    <li>خدمات الدعم والصيانة</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    التعويضات والدفعات
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>يتم تحديد الأسعار بناءً على متطلبات المشروع</li>
                    <li>يتم دفع 50% مقدماً و 50% عند التسليم</li>
                    <li>يتم إصدار فواتير شهرية للمشاريع طويلة الأجل</li>
                    <li>يجب سداد جميع الفواتير خلال 7 أيام من الإصدار</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    الملكية الفكرية
                  </h4>
                  <p>
                    جميع الحقوق الفكرية المتعلقة بالمشاريع المكتملة تنتقل إلى
                    العميل بعد سداد كامل المبلغ. نحتفظ بحق عرض المشروع في
                    محفظتنا الشخصية ما لم يتم الاتفاق على خلاف ذلك.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    المسؤولية والضمان
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>نضمن عمل المشروع حسب المواصفات المتفق عليها</li>
                    <li>نوفر دعم فني لمدة 30 يوم بعد التسليم</li>
                    <li>نحن غير مسؤولين عن الخسائر غير المباشرة</li>
                    <li>المسؤولية القصوى محدودة بقيمة المشروع</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    إنهاء الخدمة
                  </h4>
                  <p>
                    يحق لأي من الطرفين إنهاء الخدمة بإشعار خطي قبل 30 يوم. في
                    حالة الإنهاء، يحق لنا الحصول على تعويض عن العمل المنجز حتى
                    تاريخ الإنهاء.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    التعديلات
                  </h4>
                  <p>
                    نحتفظ بالحق في تعديل شروط الخدمة هذه في أي وقت. سيتم إشعار
                    المستخدمين بأي تغييرات جوهرية عبر البريد الإلكتروني أو
                    الإعلان على الموقع.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    السارية من: {new Date().toLocaleDateString("ar-EG")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {showCookiesModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-br from-gray-900 to-black border border-purple-400/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-white">سياسة الكوكيز</h3>
                <button
                  onClick={() => setShowCookiesModal(false)}
                  className="text-gray-400 hover:text-white text-2xl p-2"
                >
                  ×
                </button>
              </div>

              <div className="text-gray-300 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    ما هي ملفات الكوكيز؟
                  </h4>
                  <p>
                    ملفات الكوكيز هي ملفات نصية صغيرة يتم تخزينها على جهازك عند
                    زيارة مواقع الويب. تُستخدم لتحسين تجربة المستخدم وجعل
                    المواقع تعمل بشكل أكثر كفاءة.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    أنواع الكوكيز التي نستخدمها
                  </h4>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <h5 className="font-bold text-white mb-2">
                        ١. الكوكيز الأساسية
                      </h5>
                      <p className="text-sm text-gray-400">
                        ضرورية لعمل الموقع بشكل صحيح، مثل تذكر إعداداتك الأساسية
                        والحفاظ على جلسة تسجيل الدخول.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5">
                      <h5 className="font-bold text-white mb-2">
                        ٢. كوكيز الأداء
                      </h5>
                      <p className="text-sm text-gray-400">
                        تجمع معلومات مجهولة الهوية حول كيفية استخدام الزوار
                        للموقع، مما يساعدنا على تحسين أدائه.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5">
                      <h5 className="font-bold text-white mb-2">
                        ٣. كوكيز الوظائف
                      </h5>
                      <p className="text-sm text-gray-400">
                        تذكر خياراتك وتفضيلاتك لتخصيص تجربتك، مثل اللغة أو
                        المنطقة أو إعدادات التخطيط.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5">
                      <h5 className="font-bold text-white mb-2">
                        ٤. كوكيز التسويق
                      </h5>
                      <p className="text-sm text-gray-400">
                        تُستخدم لتتبع زياراتك عبر الإنترنت وعرض الإعلانات ذات
                        الصلة باهتماماتك.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    إدارة الكوكيز
                  </h4>
                  <p>
                    يمكنك التحكم في إعدادات الكوكيز من خلال متصفح الويب الخاص
                    بك. يمكنك حذف ملفات الكوكيز الموجودة أو رفض قبول الكوكيز
                    الجديدة. يرجى ملاحظة أن تعطيل بعض الكوكيز قد يؤثر على وظائف
                    الموقع.
                  </p>

                  <div className="mt-4 p-4 rounded-lg bg-white/5">
                    <h5 className="font-bold text-white mb-2">
                      كيفية إدارة الكوكيز في المتصفحات الشائعة:
                    </h5>
                    <ul className="list-disc pr-6 space-y-1 text-sm text-gray-400">
                      <li>
                        Google Chrome: الإعدادات ← الخصوصية والأمان ← الكوكيز
                      </li>
                      <li>Firefox: الخيارات ← الخصوصية والأمان ← الكوكيز</li>
                      <li>
                        Safari: التفضيلات ← الخصوصية ← إدارة بيانات الموقع
                      </li>
                      <li>Edge: الإعدادات ← الكوكيز وأذونات الموقع</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    كوكيز الطرف الثالث
                  </h4>
                  <p>
                    قد تستخدم بعض أدوات الطرف الثالث مثل Google Analytics ملفات
                    كوكيز لجمع معلومات إحصائية. لا نتحكم في هذه الكوكيز وننصحك
                    بمراجعة سياسات الخصوصية الخاصة بهذه الخدمات.
                  </p>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setShowCookiesModal(false)}
                    className="flex-1 py-3 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold"
                  >
                    قبول الكل
                  </button>
                  <button
                    onClick={() => setShowCookiesModal(false)}
                    className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10"
                  >
                    إدارة التفضيلات
                  </button>
                  <button
                    onClick={() => setShowCookiesModal(false)}
                    className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10"
                  >
                    رفض الكل
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
