"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
export interface CTAButton {
  text: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  whatsapp?: boolean;
  external?: boolean;
}
export interface CTAFeature {
  icon: ReactNode;
  text: string;
}
export interface CTASectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  buttons: CTAButton[];
  features?: CTAFeature[];
  footerText?: string;
  className?: string;
  direction?: "rtl" | "ltr";
  animationDelay?: number;
  showGradientTitle?: boolean;
  showBackground?: boolean;
  showBorder?: boolean;
  showFooter?: boolean;
  whatsappNumber?: string;
}
const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  icon,
  buttons,
  features,
  footerText,
  className = "",
  direction = "ltr",
  animationDelay = 0,
  showGradientTitle = true,
  showBackground = true,
  showBorder = false,
  showFooter = false,
  whatsappNumber = "+201011501249",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const directionClass = direction === "rtl" ? "rtl" : "ltr";
  const textAlignClass = direction === "rtl" ? "text-right" : "text-left";

  const getCurrentLocale = () => {
    const segments = pathname.split("/");
    return segments[1] || "ar";
  };

  const handleButtonClick = (button: CTAButton) => {
    if (button.onClick) {
      button.onClick();
      return;
    }
    if (button.whatsapp) {
      const phone = whatsappNumber;
      const message =
        direction === "rtl"
          ? "مرحباً، أود الحصول على مزيد من المعلومات حول خدماتكم"
          : "Hello, I would like to get more information about your services";

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (button.href) {
      if (button.external || button.href.startsWith("http")) {
        window.open(button.href, "_blank", "noopener,noreferrer");
      } else {
        let finalHref = button.href;
        if (
          !button.href.startsWith(`/${getCurrentLocale()}`) &&
          button.href.startsWith("/")
        ) {
          finalHref = `/${getCurrentLocale()}${button.href}`;
        }
        router.push(finalHref);
      }
      return;
    }
    console.warn("Button clicked but no action specified");
  };

  const renderSmartButton = (button: CTAButton, index: number) => {
    const buttonClasses = `px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all text-lg flex items-center gap-2 ${
      button.variant === "primary"
        ? "bg-linear-to-r from-green-500 to-cyan-500 text-white hover:shadow-cyan-500/30"
        : button.variant === "secondary"
          ? "bg-linear-to-r from-blue-500 to-purple-500 text-white hover:shadow-blue-500/30"
          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
    } ${button.className || ""}`;

    if (button.href && (button.external || button.href.startsWith("http"))) {
      return (
        <motion.a
          key={index}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={buttonClasses}
        >
          {button.icon && <span>{button.icon}</span>}
          {button.text}
        </motion.a>
      );
    }
    return (
      <motion.button
        key={index}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleButtonClick(button)}
        className={buttonClasses}
      >
        {button.icon && <span>{button.icon}</span>}
        {button.text}
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: animationDelay }}
      className={`py-20 ${showBackground ? "bg-linear-to-b from-gray-900 via-black to-gray-900" : ""} ${className}`}
      dir={directionClass}
    >
      <div className="mx-auto px-4">
        <div className={`${features ? "max-w-6xl" : "max-w-4xl"} mx-auto`}>
          {/* Icon and Title Section */}
          {icon && (
            <div className="flex justify-center mb-6">
              <div className="text-5xl mb-6">{icon}</div>
            </div>
          )}

          {/* Features Section */}
          {features && features.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 ${textAlignClass} p-4 rounded-xl bg-gray-800/30 border border-gray-700/50`}
                  >
                    <div className="text-xl text-green-400">{feature.icon}</div>
                    <span className="text-gray-300 text-sm md:text-base">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`text-center ${features ? "mt-8" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {showGradientTitle ? (
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-cyan-400 to-blue-400">
                  {title}
                </span>
              ) : (
                <span className="text-white">{title}</span>
              )}
            </h2>

            {description && (
              <p
                className={`text-xl text-gray-300 mb-10 max-w-3xl mx-auto text-center`}
              >
                {description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {buttons.map((button, index) => renderSmartButton(button, index))}
            </div>

            {/* Footer Text */}
            {showFooter && footerText && (
              <p className="text-gray-400 mt-8 text-sm">{footerText}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CTASection;
