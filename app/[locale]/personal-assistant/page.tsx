"use client";

import { JSX, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaBriefcase,
  FaBullseye,
  FaChartLine,
  FaCheckSquare,
  FaCalendar,
  FaComments,
  FaEnvelope,
  FaUsers,
  FaClock,
  FaDollarSign,
  FaHeart,
  FaTasks,
  FaPlane,
  FaFileAlt,
  FaPhoneAlt,
  FaShareAlt,
  FaUserTie,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";

// ============= (Types) =============
type SkillItem = {
  title: string;
  items: string[];
};

type RoleContent = {
  title: string;
  description: string;
  points: string[];
};

type TargetAudience = {
  group: string;
  benefits: string[];
};

type ImportanceContent = {
  title: string;
  targetAudiences: TargetAudience[];
};

type PersonalAssistantContent = {
  title: string;
  description: string;
  skills: SkillItem;
  tools: SkillItem;
  role: RoleContent;
  importance: ImportanceContent;
};

type TabType = "skills" | "tools" | "role" | "importance";

// =============  (Main Component) =============
export default function PersonalAssistantPage() {
  const pathname = usePathname();
  const [content, setContent] = useState<PersonalAssistantContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("skills");

  const locale = pathname.split("/")[1] || "ar";
  const isArabic = locale === "ar";

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const module = await import(`@/content/${locale}/personal-assistant`);
        setContent(module.personalAssistantContent);
      } catch (error) {
        console.error("Error loading content, falling back to Arabic:", error);
        const fallback = await import(`@/content/ar/personal-assistant`);
        setContent(fallback.personalAssistantContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [locale]);

  const skillIcons = [
    <FaCalendar key="calendar" className="text-green-400" />,
    <FaComments key="comments" className="text-green-400" />,
    <FaTasks key="tasks" className="text-green-400" />,
    <FaEnvelope key="envelope" className="text-green-400" />,
    <FaPlane key="plane" className="text-green-400" />,
    <FaFileAlt key="file" className="text-green-400" />,
    <FaShareAlt key="share" className="text-green-400" />,
    <FaPhoneAlt key="phone" className="text-green-400" />,
  ];

  const sectionIcons: Record<TabType, JSX.Element> = {
    skills: <FaBolt className="w-5 h-5 md:w-6 md:h-6" />,
    tools: <FaBriefcase className="w-5 h-5 md:w-6 md:h-6" />,
    role: <FaBullseye className="w-5 h-5 md:w-6 md:h-6" />,
    importance: <FaChartLine className="w-5 h-5 md:w-6 md:h-6" />,
  };

  const audienceIcons = [
    <FaRocket key="rocket" className="text-green-300 text-xl" />,
    <FaUsers key="users" className="text-blue-300 text-xl" />,
    <FaUserTie key="user-tie" className="text-purple-300 text-xl" />,
  ];

  const tabs: TabType[] = ["skills", "tools", "role", "importance"];

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </section>
    );
  }

  return (
    <section
      className="min-h-screen py-32 px-4 bg-linear-to-b from-gray-900 via-black to-gray-900 text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Main Title - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          {content.description}
        </p>
      </motion.div>

      {/* Tabs - Centered for all devices */}
      <div className="mb-8 px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                activeTab === tab
                  ? "bg-linear-to-r from-green-600 to-blue-600 text-white shadow-lg shadow-green-500/25"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
              }`}
            >
              {sectionIcons[tab]}
              <span className="font-medium">{content[tab]?.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto">
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 md:mb-8 border border-gray-700/50">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 justify-center">
                <FaBolt className="text-green-400" />
                {content.skills.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.skills.items.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 md:p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors hover:border hover:border-green-500/30"
                  >
                    <div className="text-green-400 shrink-0">
                      {skillIcons[index] || <FaCheckSquare />}
                    </div>
                    <span className="text-sm md:text-base">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "tools" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 md:mb-8 border border-gray-700/50">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 justify-center">
                <FaBriefcase className="text-blue-400" />
                {content.tools.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {content.tools.items.map((tool, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-full border border-blue-700/50 hover:border-blue-500 transition-colors text-xs md:text-sm"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "role" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 md:mb-8 border border-gray-700/50">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 justify-center">
                <FaBullseye className="text-yellow-400" />
                {content.role.title}
              </h2>
              <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed text-center">
                {content.role.description}
              </p>
              <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto">
                {content.role.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0" />
                    <span className="text-gray-200 text-sm md:text-base">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "importance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 justify-center">
                <FaChartLine className="text-purple-400" />
                {content.importance.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {content.importance.targetAudiences.map((audience, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-linear-to-b from-gray-900/50 to-black/50 p-5 md:p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 mb-4 justify-center">
                      {audienceIcons[index]}
                      <h3 className="text-lg md:text-xl font-bold text-green-300 text-center">
                        {audience.group}
                      </h3>
                    </div>
                    <ul className="space-y-2 md:space-y-3">
                      {audience.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-2"
                        >
                          <FaHeart className="w-3 h-3 md:w-4 md:h-4 text-red-400 mt-1 shrink-0" />
                          <span className="text-gray-300 text-xs md:text-sm">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Call for Work Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-12 px-4 max-w-4xl mx-auto"
      >
        <div className="bg-linear-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-6 md:p-8 border border-green-700/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div
              className={`${isArabic ? "text-right" : "text-left"} md:w-2/3`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                <span className="text-green-400">
                  {isArabic ? "مستعد" : "Ready"}
                </span>{" "}
                {isArabic
                  ? "لتحرير وقتك وزيادة إنتاجيتك؟"
                  : "to free up your time and increase productivity?"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                {isArabic
                  ? "دعني أتولى المهام الروتينية والإدارية بينما تركز أنت على "
                  : "Let me handle routine and administrative tasks while you focus on "}
                <span className="text-yellow-300">
                  {isArabic ? "النمو والابتكار" : "growth and innovation"}
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-linear-to-r from-green-500 to-blue-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:opacity-90 transition-opacity text-sm md:text-base flex items-center gap-2">
                <FaHandshake className="text-white" />
                {isArabic ? "ابدأ الآن مجاناً" : "Start Free Now"}
              </button>
              <button className="border border-green-500 text-green-400 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold hover:bg-green-500/10 transition-colors text-sm md:text-base">
                {isArabic ? "تواصل معي" : "Contact Me"}
              </button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <FaClock className="text-green-400" />
                <span>
                  {isArabic
                    ? "توفير +20 ساعة أسبوعياً"
                    : "Save +20 hours weekly"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign className="text-green-400" />
                <span>
                  {isArabic
                    ? "تخفيض التكاليف التشغيلية"
                    : "Reduce operational costs"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaChartLine className="text-green-400" />
                <span>
                  {isArabic
                    ? "زيادة الإنتاجية بنسبة 40%"
                    : "Increase productivity by 40%"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
