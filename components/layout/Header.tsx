"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaSun, FaMoon, FaGlobe, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import LanguageSwitcher from "../navigation/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  const switchLanguage = isArabic ? "en" : "ar";
  const switchedPath = pathname.replace(`/${locale}`, `/${switchLanguage}`);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // SEO Optimized Navigation Items with Arabic and English Keywords
  const navItems = [
    {
      href: `/${locale}`,
      label: isArabic ? "الرئيسية" : "Home",
      title: isArabic ? "الصفحة الرئيسية - ابراهيم ديف" : "Home - Ibrahim Dev",
      ariaLabel: isArabic
        ? "الانتقال إلى الصفحة الرئيسية"
        : "Navigate to home page",
    },
    {
      type: "dropdown" as const,
      key: "web-solutions",
      label: isArabic ? "حلول الويب" : "Web Solutions",
      title: isArabic ? "حلول وتطوير مواقع الويب" : "Web Development Solutions",
      ariaLabel: isArabic
        ? "عرض خدمات تطوير الويب"
        : "View web development services",
      items: [
        {
          href: `/${locale}/web-solutions/frontend-developer`,
          label: isArabic
            ? "مطور ويب احترافي"
            : "Professional Frontend Developer",
          title: isArabic
            ? "تطوير واجهات مواقع الويب"
            : "Frontend Website Development",
          keywords: isArabic
            ? ["مطور ويب", "تطوير مواقع", "برمجة واجهات"]
            : ["web developer", "frontend development", "website coding"],
        },
        {
          href: `/${locale}/web-solutions/wordpress`,
          label: isArabic ? "تطوير ووردبريس" : "WordPress Development",
          title: isArabic
            ? "تصميم وتطوير مواقع ووردبريس"
            : "WordPress Website Design & Development",
          keywords: isArabic
            ? ["وردبريس", "مواقع ووردبريس", "قوالب ووردبريس"]
            : ["wordpress", "wordpress websites", "wordpress themes"],
        },
        {
          href: `/${locale}/web-solutions/shopify`,
          label: isArabic ? "متاجر شوبيفاي" : "Shopify Stores",
          title: isArabic
            ? "تصميم متاجر شوبيفاي الإلكترونية"
            : "Shopify E-commerce Store Design",
          keywords: isArabic
            ? ["متجر الكتروني", "شوبيفاي", "تجارة الكترونية"]
            : ["online store", "shopify", "e-commerce"],
        },
        {
          href: `/${locale}/web-solutions/zid`,
          label: isArabic ? "منصة زد للتجارة" : "Zid E-commerce Platform",
          title: isArabic
            ? "تطوير متاجر على منصة زد"
            : "Zid E-commerce Platform Development",
          keywords: isArabic
            ? ["متجر زد", "منصة زد", "تجارة الكترونية سعودية"]
            : ["zid store", "zid platform", "saudi e-commerce"],
        },
        {
          href: `/${locale}/web-solutions/salla`,
          label: isArabic ? "متاجر سلة" : "Salla Stores",
          title: isArabic
            ? "تطوير متاجر على منصة سلة"
            : "Salla E-commerce Store Development",
          keywords: isArabic
            ? ["متجر سلة", "منصة سلة", "تجارة الكترونية"]
            : ["salla store", "salla platform", "online shopping"],
        },
      ],
    },
    {
      href: `/${locale}/sales-engineer`,
      label: "خبير مبيعات",
      title: isArabic
        ? "مهندس مبيعات حلول تقنية"
        : "Technical Sales Engineer Solutions",
      ariaLabel: isArabic
        ? "خدمات مهندس المبيعات التقنية"
        : "Technical sales engineer services",
      keywords: isArabic
        ? ["مهندس مبيعات", "حلول تقنية", "استشارات مبيعات"]
        : ["sales engineer", "technical solutions", "sales consulting"],
    },
    {
      href: `/${locale}/customer-services`,
      label: isArabic ? "خدمة عملاء" : "Professional Customer Service",
      title: isArabic ? "خدمة ودعم العملاء" : "Customer Support & Service",
      ariaLabel: isArabic ? "خدمات دعم العملاء" : "Customer support services",
      keywords: isArabic
        ? ["خدمة عملاء", "دعم فني", "مساعدة عملاء"]
        : ["customer service", "technical support", "client assistance"],
    },
    {
      href: `/${locale}/personal-assistant`,
      label: isArabic ? "مساعد شخصي" : "Virtual Personal Assistant",
      title: isArabic
        ? "خدمات المساعد الشخصي الافتراضي"
        : "Virtual Personal Assistant Services",
      ariaLabel: isArabic
        ? "خدمات المساعدة الشخصية"
        : "Personal assistance services",
      keywords: isArabic
        ? ["مساعد شخصي", "مساعدة افتراضية", "تنظيم المهام"]
        : ["personal assistant", "virtual assistant", "task management"],
    },
    {
      type: "dropdown" as const,
      key: "extras",
      label: isArabic ? "المزيد" : "More",
      title: isArabic ? "خدمات ومهارات إضافية" : "Additional Services & Skills",
      ariaLabel: isArabic ? "عرض خدمات إضافية" : "View additional services",
      items: [
        {
          href: `/${locale}/extras/english`,
          label: isArabic ? "دروس الإنجليزية" : "English Lessons",
          title: isArabic
            ? "تعلم اللغة الإنجليزية"
            : "English Language Learning",
          keywords: isArabic
            ? ["دروس انجليزية", "تعلم اللغة", "مهارات لغوية"]
            : ["english lessons", "language learning", "language skills"],
        },
        {
          href: `/${locale}/extras/certificates`,
          label: isArabic ? "شهادات معتمدة" : "Professional Certificates",
          title: isArabic
            ? "الشهادات المهنية المعتمدة"
            : "Professional Accredited Certificates",
          keywords: isArabic
            ? ["شهادات مهنية", "اعتمادات", "تدريب معتمد"]
            : [
                "professional certificates",
                "accreditations",
                "certified training",
              ],
        },
        {
          href: `/${locale}/extras/awards`,
          label: isArabic ? "جوائز وتكريمات" : "Awards & Recognition",
          title: isArabic
            ? "الجوائز والإنجازات المهنية"
            : "Professional Awards & Achievements",
          keywords: isArabic
            ? ["جوائز", "تكريمات", "انجازات مهنية"]
            : ["awards", "recognition", "professional achievements"],
        },
        {
          href: `/${locale}/extras/proud-beginnings`,
          label: isArabic ? "البدايات والخبرات" : "Career Journey & Experience",
          title: isArabic
            ? "رحلة العمل والخبرات المهنية"
            : "Professional Career Journey & Experience",
          keywords: isArabic
            ? ["البدايات", "خبرات عمل", "رحلة مهنية"]
            : ["career beginnings", "work experience", "professional journey"],
        },
      ],
    },
  ];

  return (
    <header
      className={` fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
      role="banner"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="absolute inset-0 bg-linear-to-b from-gray-100/30 dark:from-gray-800/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative">
        {/* Logo with SEO */}
        <Link
          href={`/${locale}`}
          aria-label={isArabic ? "إبراهيم - الرئيسية" : "Ibrahim - Home"}
          title={
            isArabic
              ? "إبراهيم - حلول رقمية مبتكرة لرؤية 2030"
              : "Ibrahim - Innovative Digital Solutions for Vision 2030"
          }
          className="group relative flex items-center"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-2"
            itemProp="logo"
          >
            <Image
              src="/logo/logo-ibrahim-tr.png"
              alt={
                isArabic
                  ? "شعار إبراهيم - حلول رقمية مبتكرة"
                  : "Ibrahim Logo - Innovative Digital Solutions"
              }
              width={140}
              height={40}
              priority
              className="object-contain dark:brightness-110"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav
          className="text-white hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 gap-4 lg:gap-6 text-sm"
          aria-label={isArabic ? "القائمة الرئيسية" : "Main Navigation"}
          role="navigation"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              return (
                <div
                  key={item.key}
                  className="relative group"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <motion.div
                    className="cursor-pointer px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    aria-label={item.ariaLabel}
                    title={item.title}
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}
                    itemProp="name"
                  >
                    <span itemProp="description">{item.label}</span>
                    <motion.span className="text-[10px] mt-1">
                      <FaChevronDown />
                    </motion.span>
                  </motion.div>
                  <div
                    className="absolute top-full mt-1 right-0 hidden group-hover:flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl w-48 p-2 space-y-1 border border-gray-200 dark:border-gray-700"
                    role="menu"
                    aria-label={isArabic ? "قائمة الخدمات" : "Services Menu"}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-cyan-400 transition-all text-right"
                        aria-label={subItem.title}
                        title={subItem.title}
                        role="menuitem"
                        itemProp="url"
                      >
                        <span itemProp="name">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                itemScope
                itemType="https://schema.org/Service"
              >
                <Link
                  href={item.href}
                  className="relative px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-cyan-400 transition-colors duration-300 group"
                  aria-label={item.ariaLabel}
                  title={item.title}
                  itemProp="url"
                >
                  <span itemProp="name">{item.label}</span>
                  <span className="absolute bottom-0 right-1/2 w-0 h-px bg-linear-to-l from-green-400 to-cyan-400 group-hover:w-full group-hover:right-0 transition-all duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isArabic ? "تبديل الوضع الداكن" : "Toggle dark mode"}
            title={
              isArabic
                ? "تبديل وضع الليل والنهار"
                : "Switch between dark and light mode"
            }
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>

          {/* Language Switch with Icon */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={switchedPath}
              className="text-white flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label={
                isArabic
                  ? "تبديل اللغة إلى الإنجليزية"
                  : "Switch language to Arabic"
              }
              title={
                isArabic
                  ? "English version of the website"
                  : "النسخة العربية من الموقع"
              }
              rel="alternate"
              hrefLang={switchLanguage}
            >
              <FaGlobe className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">
                {isArabic ? "English" : "العربية"}
              </span>
            </Link>
          </motion.div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/${locale}/consultation`}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-green-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300"
              aria-label={
                isArabic ? "احصل على استشارة مجانية" : "Get a free consultation"
              }
              title={
                isArabic
                  ? "استشارة مجانية في تطوير الويب"
                  : "Free web development consultation"
              }
              itemProp="url"
            >
              {isArabic ? "استشارة مجانية" : "Free Consultation"}
            </Link>
          </motion.div>
        </div>

        {/* Mobile Burger & Controls */}
        <div className="md:hidden flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2"
            whileTap={{ scale: 0.95 }}
            aria-label={isArabic ? "تبديل الوضع الداكن" : "Toggle dark mode"}
            title={isArabic ? "تبديل وضع التصميم" : "Toggle theme"}
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>

          {/* Language Switch */}
          <LanguageSwitcher
            isArabic={isArabic}
            switchedPath={switchedPath}
            switchLanguage={switchLanguage}
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex flex-col justify-center items-center w-10 h-10 group"
            aria-label={isArabic ? "فتح القائمة الرئيسية" : "Open main menu"}
            aria-expanded={menuOpen}
            title={isArabic ? "عرض قائمة الموقع" : "Show website menu"}
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 mt-1 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 mt-1 ${
                menuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            />

            <div
              className={`absolute inset-0 rounded-full bg-green-500/20 blur transition-all duration-300 ${
                menuOpen ? "scale-100" : "scale-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.nav
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, display: "flex" },
          closed: {
            opacity: 0,
            y: -20,
            transitionEnd: { display: "none" },
          },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4 flex-col gap-2"
        dir={isArabic ? "rtl" : "ltr"}
        aria-label={isArabic ? "القائمة المتنقلة" : "Mobile Navigation"}
        role="navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        {navItems.map((item) => {
          if (item.type === "dropdown") {
            return (
              <div
                key={item.key}
                className="w-full"
                itemScope
                itemType="https://schema.org/Service"
              >
                <button
                  onClick={() => toggleDropdown(item.key)}
                  className="w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-cyan-400 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-600 flex items-center justify-between"
                  aria-label={item.ariaLabel}
                  title={item.title}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.key}
                  role="button"
                  itemProp="name"
                >
                  <span className="font-medium">{item.label}</span>
                  <motion.span
                    animate={{ rotate: openDropdown === item.key ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs"
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={openDropdown === item.key ? "open" : "closed"}
                  variants={{
                    open: {
                      opacity: 1,
                      height: "auto",
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                    },
                    closed: {
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    },
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  role="menu"
                  aria-label={isArabic ? "خدمات فرعية" : "Sub Services"}
                >
                  <div className="flex flex-col pr-4 gap-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-cyan-400 transition-all"
                        aria-label={subItem.title}
                        title={subItem.title}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        role="menuitem"
                        itemProp="url"
                      >
                        <span itemProp="name">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-cyan-400 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-600 font-medium"
              aria-label={item.ariaLabel}
              title={item.title}
              onClick={() => setMenuOpen(false)}
              itemProp="url"
            >
              <span itemProp="name">{item.label}</span>
            </Link>
          );
        })}

        {/* Mobile CTA Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <Link
            href={`/${locale}/consultation`}
            className="block w-full px-4 py-3 rounded-full bg-linear-to-r from-green-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/40 transition-all text-center"
            aria-label={
              isArabic ? "احصل على استشارة مجانية" : "Get a free consultation"
            }
            title={isArabic ? "استشارة ويب مجانية" : "Free web consultation"}
            onClick={() => setMenuOpen(false)}
            itemProp="url"
          >
            {isArabic ? "استشارة مجانية" : "Free Consultation"}
          </Link>
        </motion.div>

        {/* Mobile Language Switch Full */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={switchedPath}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-medium"
            aria-label={
              isArabic
                ? "النسخة الإنجليزية من الموقع"
                : "Arabic version of the website"
            }
            title={
              isArabic ? "English Website Version" : "النسخة العربية للموقع"
            }
            onClick={() => setMenuOpen(false)}
            rel="alternate"
            hrefLang={switchLanguage}
          >
            <FaGlobe className="w-4 h-4 text-green-500" />
            <span>{isArabic ? "English Version" : "النسخة العربية"}</span>
          </Link>
        </div>
      </motion.nav>

      {/* Progress Bar */}
      <div
        className="h-px bg-gray-200 dark:bg-gray-800 overflow-hidden"
        role="presentation"
      >
        <motion.div
          className="h-full bg-linear-to-l from-green-400 to-cyan-500 origin-right"
          style={{ scaleX }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
