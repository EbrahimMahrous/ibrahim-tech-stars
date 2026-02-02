"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaSun, FaMoon, FaGlobe, FaChevronDown, FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";
import LanguageSwitcher from "../navigation/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  const [content, setContent] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(
          `@/content/${locale}/components/layout/header`
        );
        setContent(module.headerContent);
      } catch (error) {
        console.error("Error loading header content:", error);
        const fallback = await import(`@/content/ar/components/layout/header`);
        setContent(fallback.headerContent);
      }
    };

    loadContent();
  }, [locale]);

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

  const navItems = useMemo(() => {
    if (!content) return [];

    return [
      {
        href: `/${locale}`,
        label: content.navItems.home.label,
        title: content.navItems.home.title,
        ariaLabel: content.navItems.home.ariaLabel,
      },
      {
        href: `/${locale}/web-solutions`,
        label: content.navItems.webSolutions.label,
        title: content.navItems.webSolutions.title,
        ariaLabel: content.navItems.webSolutions.ariaLabel,
        badge: isArabic ? "الأكثر طلبًا" : "Most Requested",
      },
      {
        href: `/${locale}/sales-engineer`,
        label: content.navItems.salesEngineer.label,
        title: content.navItems.salesEngineer.title,
        ariaLabel: content.navItems.salesEngineer.ariaLabel,
        keywords: content.navItems.salesEngineer.keywords,
      },
      {
        href: `/${locale}/customer-services`,
        label: content.navItems.customerServices.label,
        title: content.navItems.customerServices.title,
        ariaLabel: content.navItems.customerServices.ariaLabel,
        keywords: content.navItems.customerServices.keywords,
      },
      {
        href: `/${locale}/personal-assistant`,
        label: content.navItems.personalAssistant.label,
        title: content.navItems.personalAssistant.title,
        ariaLabel: content.navItems.personalAssistant.ariaLabel,
        keywords: content.navItems.personalAssistant.keywords,
      },
      {
        type: "dropdown" as const,
        key: "extras",
        label: content.navItems.extras.label,
        title: content.navItems.extras.title,
        ariaLabel: content.navItems.extras.ariaLabel,
        items: [
          {
            href: `/${locale}/extras/english`,
            label: content.navItems.extras.items.english.label,
            title: content.navItems.extras.items.english.title,
            keywords: content.navItems.extras.items.english.keywords,
          },
          {
            href: `/${locale}/extras/certificates`,
            label: content.navItems.extras.items.certificates.label,
            title: content.navItems.extras.items.certificates.title,
            keywords: content.navItems.extras.items.certificates.keywords,
          },
          {
            href: `/${locale}/extras/awards`,
            label: content.navItems.extras.items.awards.label,
            title: content.navItems.extras.items.awards.title,
            keywords: content.navItems.extras.items.awards.keywords,
          },
          {
            href: `/${locale}/extras/proud-beginnings`,
            label: content.navItems.extras.items.proudBeginnings.label,
            title: content.navItems.extras.items.proudBeginnings.title,
            keywords: content.navItems.extras.items.proudBeginnings.keywords,
          },
        ],
      },
    ];
  }, [content, locale, isArabic]);

  const switchLanguage = isArabic ? "en" : "ar";
  const switchedPath = pathname.replace(`/${locale}`, `/${switchLanguage}`);

  if (!content) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo skeleton */}
          <div className="group relative flex items-center">
            <div className="w-32 h-10 bg-gray-800/70 rounded-lg animate-pulse" />
          </div>

          {/* Desktop Navigation skeleton - Centered */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 gap-4 lg:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="relative group">
                <div className="w-20 h-4 bg-gray-800/60 rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gray-700" />
              </div>
            ))}
          </nav>

          {/* Right Side Controls skeleton */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <div className="w-9 h-9 bg-gray-800/60 rounded-full animate-pulse" />

            {/* Language Switch */}
            <div className="w-20 h-10 bg-gray-800/60 rounded-full animate-pulse" />

            {/* CTA Button */}
            <div className="w-32 h-10 bg-gray-800/70 rounded-full animate-pulse" />
          </div>

          {/* Mobile Burger & Controls skeleton */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <div className="w-9 h-9 bg-gray-800/60 rounded-full animate-pulse" />

            {/* Language Switch */}
            <div className="w-9 h-9 bg-gray-800/60 rounded-full animate-pulse" />

            {/* Mobile Menu Button */}
            <div className="w-10 h-10 bg-gray-800/70 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Progress Bar skeleton */}
        <div className="overflow-hidden bg-gray-800">
          <div className="h-px bg-gray-700 w-1/3" />
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-800"
          : "bg-gray-900/90 backdrop-blur-lg"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
      role="banner"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="absolute inset-0 bg-linear-to-b from-gray-800/30 to-transparent" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between relative">
        {/* Logo with SEO */}
        <Link
          href={`/${locale}`}
          aria-label={content.logo.ariaLabel}
          title={content.logo.title}
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
              alt={content.logo.alt}
              width={140}
              height={40}
              priority
              className="object-contain brightness-110"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation - Centered (hidden on screens < 1024px) */}
        <nav
          className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 gap-4 lg:gap-6 text-sm"
          aria-label={content.navigation.mainNav}
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
                    className="cursor-pointer px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1"
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
                    className="absolute top-full mt-1 right-0 hidden group-hover:flex flex-col bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl w-48 p-2 space-y-1 border border-gray-700"
                    role="menu"
                    aria-label={content.navigation.servicesMenu}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-cyan-400 transition-all text-right text-gray-300"
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

            const isActive = pathname === item.href;
            
            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                itemScope
                itemType="https://schema.org/Service"
                className="relative group/nav-item"
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 transition-all duration-300 group-hover/nav-item:text-cyan-400 flex items-center gap-2 ${
                    isActive
                      ? "text-cyan-400 font-bold"
                      : "text-gray-300"
                  }`}
                  aria-label={item.ariaLabel}
                  title={item.title}
                  itemProp="url"
                >
                  <span 
                    itemProp="name" 
                    className={`relative inline-block transition-all duration-300 ${isActive ? 'font-bold' : 'group-hover/nav-item:font-medium'}`}
                  >
                    {item.label}
                    {/* Underline with smooth transition */}
                    <span 
                      className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-l from-green-400 to-cyan-400 transition-all duration-500 ease-out ${
                        isActive 
                          ? 'w-full opacity-100' 
                          : 'w-0 opacity-0 group-hover/nav-item:w-full group-hover/nav-item:opacity-100'
                      }`}
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right Side Controls (hidden on screens < 1024px) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={content.buttons.darkMode.toggle}
            title={content.buttons.darkMode.switchTheme}
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-300" />
            )}
          </motion.button>

          {/* Language Switch with Icon */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={switchedPath}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-800 transition-all text-gray-300"
              aria-label={
                isArabic
                  ? content.buttons.languageSwitch.switchToArabic
                  : content.buttons.languageSwitch.switchToEnglish
              }
              title={
                isArabic
                  ? content.buttons.languageSwitch.switchToEnglish
                  : content.buttons.languageSwitch.switchToArabic
              }
              rel="alternate"
              hrefLang={switchLanguage}
            >
              <FaGlobe className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">
                {isArabic
                  ? content.buttons.languageSwitch.english
                  : content.buttons.languageSwitch.arabic}
              </span>
            </Link>
          </motion.div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/${locale}/consultation`}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-green-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300"
              aria-label={content.buttons.consultation.ariaLabel}
              title={content.buttons.consultation.title}
              itemProp="url"
            >
              {content.buttons.consultation.label}
            </Link>
          </motion.div>
        </div>

        {/* Mobile Burger & Controls (visible on screens < 1024px) */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2"
            whileTap={{ scale: 0.95 }}
            aria-label={content.buttons.darkMode.toggle}
            title={content.buttons.darkMode.toggleMobile}
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-300" />
            )}
          </motion.button>

          {/* Language Switch */}
          <LanguageSwitcher
            isArabic={isArabic}
            switchedPath={switchedPath}
            switchLanguage={switchLanguage}
          />

          {/* Burger Menu Button for screens < 1024px */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative p-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={menuOpen ? content.buttons.mobileMenu.close : content.buttons.mobileMenu.open}
            aria-expanded={menuOpen}
            title={menuOpen ? content.buttons.mobileMenu.closeMenu : content.buttons.mobileMenu.showMenu}
          >
            {menuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-300" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay (for screens < 1024px) */}
      <motion.div
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel (for screens < 1024px) */}
      <motion.nav
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { 
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          },
          closed: { 
            x: isArabic ? "-100%" : "100%",
            opacity: 0,
            transition: { duration: 0.2 }
          },
        }}
        className={`fixed top-0 ${isArabic ? "left-0" : "right-0"} h-full w-80 max-w-full bg-gray-900/95 backdrop-blur-xl border-l border-gray-800 z-50 lg:hidden overflow-y-auto`}
        dir={isArabic ? "rtl" : "ltr"}
        aria-label={content.navigation.mobileNav}
        role="navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        {/* Mobile Menu Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            onClick={() => setMenuOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/logo/logo-ibrahim-tr.png"
              alt={content.logo.alt}
              width={120}
              height={35}
              className="object-contain"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-full"
            aria-label={content.buttons.mobileMenu.close}
          >
            <FaTimes className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-4">
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              const isDropdownOpen = openDropdown === item.key;
              const isActive = item.items.some(subItem => pathname === subItem.href);
              
              return (
                <div
                  key={item.key}
                  className="mb-2"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      isActive || isDropdownOpen
                        ? "bg-gray-800 text-cyan-400 font-bold"
                        : "text-gray-300 hover:bg-gray-800 hover:text-cyan-400"
                    }`}
                    aria-label={item.ariaLabel}
                    title={item.title}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    <span 
                      className="text-left relative inline-block" 
                      itemProp="name"
                    >
                      {item.label}
                      {(isActive || isDropdownOpen) && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-l from-green-400 to-cyan-400 transition-all duration-500 ease-out" />
                      )}
                    </span>
                    <motion.span
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-xs"
                    >
                      <FaChevronDown />
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={isDropdownOpen ? "open" : "closed"}
                    variants={{
                      open: {
                        opacity: 1,
                        height: "auto",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      },
                      closed: {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        transition: {
                          duration: 0.3,
                          ease: "easeInOut"
                        }
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className={`flex flex-col ${isArabic ? 'pr-4' : 'pl-4'} gap-1`}>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-4 py-2 rounded transition-all duration-300 ${
                              isSubActive
                                ? "bg-gray-700 text-cyan-400 font-bold"
                                : "text-gray-300 hover:bg-gray-700 hover:text-cyan-400"
                            }`}
                            aria-label={subItem.title}
                            title={subItem.title}
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            itemProp="url"
                          >
                            <span 
                              itemProp="name"
                              className="relative inline-block"
                            >
                              {subItem.label}
                              {isSubActive && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-l from-green-400 to-cyan-400 transition-all duration-500 ease-out" />
                              )}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              );
            }

            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg mb-2 transition-all duration-300 relative group/mobile-item ${
                  isActive
                    ? "bg-gray-800 text-cyan-400 font-bold"
                    : "text-gray-300 hover:bg-gray-800 hover:text-cyan-400"
                }`}
                aria-label={item.ariaLabel}
                title={item.title}
                onClick={() => setMenuOpen(false)}
                itemProp="url"
              >
                <div className="flex items-center justify-between">
                  <span 
                    itemProp="name"
                    className="relative inline-block transition-all duration-300"
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-l from-green-400 to-cyan-400 transition-all duration-500 ease-out" />
                    )}
                  </span>
                  
                  {item.badge && (
                    <span className="text-xs font-bold bg-linear-to-r from-green-500 to-cyan-500 text-white px-2 py-1 rounded-full transition-all duration-300 hover:scale-105">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Mobile CTA Button */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <Link
              href={`/${locale}/consultation`}
              className="block w-full px-4 py-3 rounded-full bg-linear-to-r from-green-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 text-center hover:scale-[1.02] active:scale-[0.98]"
              aria-label={content.buttons.consultation.ariaLabel}
              title={content.buttons.consultation.title}
              onClick={() => setMenuOpen(false)}
              itemProp="url"
            >
              {content.buttons.consultation.label}
            </Link>
          </div>

          {/* Mobile Theme Toggle and Language Switch */}
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-gray-300"
              aria-label={content.buttons.darkMode.toggle}
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-500 transition-all duration-300" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-300 transition-all duration-300" />
              )}
              <span className="transition-all duration-300">
                {darkMode ? content.buttons.darkMode.light : content.buttons.darkMode.dark}
              </span>
            </button>

            <Link
              href={switchedPath}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:scale-[1.02]"
              aria-label={
                isArabic
                  ? content.buttons.languageSwitch.switchToArabic
                  : content.buttons.languageSwitch.switchToEnglish
              }
              onClick={() => setMenuOpen(false)}
            >
              <FaGlobe className="w-4 h-4 text-green-500 transition-all duration-300" />
              <span className="transition-all duration-300">
                {isArabic
                  ? content.buttons.languageSwitch.english
                  : content.buttons.languageSwitch.arabic}
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Progress Bar */}
      <motion.div
        className="overflow-hidden bg-gray-800"
        style={{
          height: scaleX.get() === 0 ? 0 : 1,
        }}
      >
        <motion.div
          className="h-px bg-linear-to-l from-green-400 to-cyan-500 origin-right"
          style={{ scaleX }}
        />
      </motion.div>
    </header>
  );
}