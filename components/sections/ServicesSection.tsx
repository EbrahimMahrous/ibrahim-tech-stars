"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiUsers,
  FiMessageSquare,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiGlobe,
  FiSmartphone,
  FiHelpCircle,
  FiTarget,
  FiHeadphones,
} from "react-icons/fi";
import {
  FaShopify,
  FaRocket,
  FaChartLine,
  FaLock,
  FaSearch,
  FaUserTie,
  FaHandsHelping,
} from "react-icons/fa";
import { SiWordpress } from "react-icons/si";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbBuildingStore, TbDeviceAnalytics } from "react-icons/tb";

export default function ServicesSection() {
  const [draggedSkill, setDraggedSkill] = useState<string | null>(null);
  const [skillStack, setSkillStack] = useState<string[]>([]);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const technicalSkills = [
    {
      id: "web-development",
      icon: <FaRocket className="text-3xl sm:text-4xl" />,
      name: "تطوير وتصميم مواقع الويب المتكاملة",
      color: "#0ea5e9",
      shortDesc: "حلول ويب احترافية وشاملة",
      fullDesc:
        "أتخصص في تطوير وتصميم مواقع الويب المتكاملة باستخدام أحدث التقنيات مثل Next.js و React و Node.js. أقدم حلول ويب متكاملة تشمل واجهات مستخدم تفاعلية، واجهات برمجة تطبيقات (APIs) آمنة، وقواعد بيانات متقدمة. كل موقع ويب أصممه يكون متجاوباً مع جميع الأجهزة، سريع التحميل (تحميل أقل من 3 ثوانٍ)، ومحسّناً لمحركات البحث (SEO Optimization) لضمان أفضل ظهور في نتائج جوجل.",
      level: "متقدم",
      tags: [
        "تطوير Frontend",
        "تطوير Backend",
        "Next.js",
        "React.js",
        "Node.js",
        "واجهات API",
      ],
      confidence: 95,
      seoKeywords: [
        "تطوير المواقع الإلكترونية",
        "برمجة الويب",
        "تصميم مواقع احترافية",
        "تطبيقات ويب متقدمة",
      ],
      features: [
        { icon: <FiSmartphone />, text: "تصميم متجاوب مع جميع الأجهزة" },
        { icon: <FaRocket />, text: "تحميل فائق السرعة (أقل من 3 ثوانٍ)" },
        { icon: <FaSearch />, text: "تحسين SEO لمحركات البحث" },
        { icon: <FaLock />, text: "حماية وأمان عالي المستوى" },
        { icon: <FiTrendingUp />, text: "تحليلات أداء متقدمة" },
        { icon: <FiGlobe />, text: "استضافة وإدارة سحابية" },
      ],
      stats: [
        { value: "+95%", label: "رضا العملاء" },
        { value: "+50", label: "مشروع ناجح" },
        { value: "<3s", label: "سرعة التحميل" },
        { value: "24/7", label: "دعم فني" },
      ],
      seoContent:
        "كمطور ويب محترف، أقدم خدمات تصميم وتطوير المواقع الإلكترونية المتكاملة التي تضمن ظهورك في النتائج الأولى لمحركات البحث وتحسن تجربة المستخدم بشكل كامل.",
    },
    {
      id: "wordpress-development",
      icon: <SiWordpress className="text-3xl sm:text-4xl" />,
      name: "تطوير مواقع ووردبريس احترافية",
      color: "#21759b",
      shortDesc: "منصة إدارة محتوى متقدمة",
      fullDesc:
        "أقدم خدمات تطوير ووردبريس شاملة تشمل تصميم وتطوير قوالب مخصصة (Custom Themes)، بناء إضافات متقدمة (Premium Plugins)، وتحسين أداء وأمان مواقع ووردبريس. خبرتي في نظام إدارة المحتوى ووردبريس تمكنني من إنشاء مواقع سريعة (أقل من 2 ثانية تحميل)، آمنة، وسهلة الإدارة مع واجهة تحكم مبسطة للعملاء. تشمل خدماتي تكامل أنظمة الدفع الإلكتروني، تحسين محركات البحث (WordPress SEO)، وتطوير حلول إدارة المحتوى المتقدمة.",
      level: "متقدم",
      tags: [
        "قوالب مخصصة",
        "إضافات متقدمة",
        "تحسين أداء",
        "أمان",
        "WordPress SEO",
        "إدارة محتوى",
      ],
      confidence: 92,
      seoKeywords: [
        "موقع ووردبريس احترافي",
        "قوالب ووردبريس مخصصة",
        "إضافات ووردبريس متقدمة",
        "تطوير CMS",
      ],
      features: [
        { icon: <SiWordpress />, text: "قوالب ووردبريس مخصصة بالكامل" },
        { icon: <FaChartLine />, text: "تحسين أداء وسرعة الموقع" },
        { icon: <FaLock />, text: "حماية متقدمة من الاختراقات" },
        { icon: <FaSearch />, text: "تحسين SEO محرك بحث داخلي" },
        { icon: <FiClock />, text: "صيانة وتحديثات مستمرة" },
        { icon: <FiTrendingUp />, text: "تحليلات زوار تفصيلية" },
      ],
      stats: [
        { value: "+90%", label: "سرعة محسنة" },
        { value: "+40", label: "موقع ووردبريس" },
        { value: "99.9%", label: "وقت تشغيل" },
        { value: "A+", label: "تصنيف أمان" },
      ],
      seoContent:
        "طورت أكثر من 40 موقع ووردبريس بنجاح مع ضمان تحميل سريع وحماية متقدمة وواجهة إدارة سهلة للعملاء.",
    },
    {
      id: "salla-stores",
      icon: <RiShoppingCartLine className="text-3xl sm:text-4xl" />,
      name: "متاجر Salla الإلكترونية المتكاملة",
      color: "#ff6b35",
      shortDesc: "منصة بيع إلكتروني عربية",
      fullDesc:
        "متخصص في بناء وتطوير متاجر Salla الإلكترونية المتكاملة مع أنظمة الدفع الإلكتروني (مدى، سداد، PayPal)، إدارة المخزون المتقدمة، وأنظمة الشحن الذكية. أصمم تجربة تسوق إلكتروني سلسة للمستخدمين مع لوحة تحكم قوية لأصحاب المتاجر. كل متجر Salla يتم تطويره يكون محسّناً لتحويل الزوار إلى عملاء (Conversion Rate Optimization) وسهل الإدارة مع تقارير تحليلية متقدمة لمتابعة المبيعات والأرباح.",
      level: "متقدم",
      tags: [
        "متاجر Salla",
        "دفع إلكتروني",
        "إدارة مخزون",
        "أنظمة شحن",
        "تحسين تحويلات",
        "تقارير متقدمة",
      ],
      confidence: 88,
      seoKeywords: [
        "متجر Salla إلكتروني",
        "تسوق إلكتروني عربي",
        "منصات بيع سعودية",
        "متاجر عربية متكاملة",
      ],
      features: [
        { icon: <RiShoppingCartLine />, text: "تصميم متاجر Salla متكاملة" },
        { icon: <FaChartLine />, text: "تكامل أنظمة الدفع الإلكتروني" },
        { icon: <TbBuildingStore />, text: "إدارة مخزون ذكية وتلقائية" },
        { icon: <FiTrendingUp />, text: "تحليل أداء ومتابعة مبيعات" },
        { icon: <FiSmartphone />, text: "تجربة مستخدم محسنة للجوال" },
        { icon: <FaLock />, text: "حماية بيانات العملاء والمعاملات" },
      ],
      stats: [
        { value: "+75%", label: "زيادة مبيعات" },
        { value: "+30", label: "متجر Salla" },
        { value: "4.8/5", label: "تقييم العملاء" },
        { value: "-40%", label: "معدل ارتداد" },
      ],
      seoContent:
        "متاجر Salla الإلكترونية التي أصممها تحقق زيادة في المبيعات بنسبة 75% في المتوسط بفضل تحسين تجربة المستخدم وأنظمة الدفع المتكاملة.",
    },
    {
      id: "shopify-stores",
      icon: <FaShopify className="text-3xl sm:text-4xl" />,
      name: "متاجر Shopify العالمية الاحترافية",
      color: "#95bf46",
      shortDesc: "منصة تجارة إلكترونية عالمية",
      fullDesc:
        "متخصص في تطوير متاجر Shopify العالمية مع تكامل قنوات البيع المتعددة والتسويق الرقمي المتقدم. أصمم متاجر تتوافق مع المعايير الدولية مع دعم متعدد اللغات والعملات. خبرتي تشمل تطوير قوالب Shopify مخصصة، إضافات خاصة، وتحسين أداء المتاجر لزيادة المبيعات وتحسين تجربة التسوق العالمية. كل متجر يتم تطويره يكون متوافقاً مع سياسات Shopify ويحقق أعلى معدلات تحويل.",
      level: "متقدم",
      tags: [
        "متاجر Shopify",
        "قنوات بيع متعددة",
        "تسويق رقمي",
        "دعم لغات",
        "معايير دولية",
        "تجارة عالمية",
      ],
      confidence: 85,
      seoKeywords: [
        "متجر Shopify احترافي",
        "تجارة إلكترونية عالمية",
        "بيع دولي عبر الإنترنت",
        "تسويق إلكتروني",
      ],
      features: [
        { icon: <FaShopify />, text: "تصميم متاجر Shopify مخصصة" },
        { icon: <FiGlobe />, text: "دعم 100+ عملة ولغة" },
        { icon: <FaChartLine />, text: "تكامل مع قنوات البيع العالمية" },
        { icon: <FaSearch />, text: "تحسين SEO للتسويق الدولي" },
        { icon: <FaLock />, text: "حماية متقدمة للمعاملات" },
        { icon: <FiTrendingUp />, text: "تحليلات مبيعات دولية" },
      ],
      stats: [
        { value: "+60%", label: "مبيعات دولية" },
        { value: "+25", label: "متجر Shopify" },
        { value: "200+", label: "دولة مستهدفة" },
        { value: "30%", label: "تحويل أفضل" },
      ],
      seoContent:
        "متاجر Shopify العالمية التي أصممها تصل إلى أكثر من 200 دولة وتحقق معدلات تحويل أعلى بنسبة 30% من المتوسط العالمي.",
    },
    {
      id: "zid-stores",
      icon: <TbBuildingStore className="text-3xl sm:text-4xl" />,
      name: "تطوير متاجر Zid المتقدمة",
      color: "#00a8ff",
      shortDesc: "منصة التجارة الإلكترونية الرائدة",
      fullDesc:
        "أطور متاجر Zid الإلكترونية المتكاملة مع تركيز خاص على تجربة المستخدم (User Experience) وتحويل الزوار إلى عملاء. خبرتي تشمل تكامل أنظمة الدفع المختلفة (مدى، سداد، PayPal)، إدارة الطلبات المتقدمة، وتحليل بيانات المبيعات الشاملة. كل متجر Zid يصمم ليكون سهل التصفح، سريع الأداء (تحميل أقل من 2.5 ثانية)، وآمن مع دعم متعدد اللغات والعملات لتعزيز المبيعات عبر الحدود.",
      level: "متقدم",
      tags: [
        "منصة Zid",
        "تجارة إلكترونية",
        "تكامل دفع",
        "إدارة طلبات",
        "تحليل مبيعات",
        "دعم متعدد",
      ],
      confidence: 87,
      seoKeywords: [
        "متجر Zid متكامل",
        "منصات البيع الإلكتروني",
        "تطوير متاجر Zid",
        "حلول التجارة الإلكترونية",
        "سوق إلكتروني عربي",
      ],
      features: [
        { icon: <TbBuildingStore />, text: "تصميم متاجر Zid متكاملة" },
        { icon: <FaChartLine />, text: "تكامل مع جميع أنظمة الدفع السعودية" },
        { icon: <FiTarget />, text: "تحسين معدلات التحويل والبيع" },
        { icon: <FiSmartphone />, text: "واجهة مستخدم متجاوبة مع الجوال" },
        { icon: <FaLock />, text: "حماية متقدمة للمعاملات والبيانات" },
        { icon: <FiTrendingUp />, text: "تقارير تحليلية شاملة للمبيعات" },
      ],
      stats: [
        { value: "+70%", label: "زيادة مبيعات" },
        { value: "+35", label: "متجر Zid" },
        { value: "<2.5s", label: "سرعة تحميل" },
        { value: "99.5%", label: "استقرار النظام" },
      ],
      seoContent:
        "متاجر Zid التي طورتها حققت زيادة في المبيعات بنسبة 70% في المتوسط بفضل تحسين تجربة المستخدم والتكامل المتقدم مع أنظمة الدفع السعودية.",
    },
    {
      id: "technical-sales",
      icon: <FiUsers className="text-3xl sm:text-4xl" />,
      name: "هندسة مبيعات تقنية متقدمة",
      color: "#2563eb",
      shortDesc: "زيادة الإيرادات عبر حلول تقنية",
      fullDesc:
        "أقدم خدمات هندسة المبيعات التقنية التي تجمع بين المعرفة التقنية العميقة ومهارات المبيعات المتقدمة. أقوم بفهم المنتجات التقنية بعمق، شرح ميزاتها للعملاء المحتملين، تقديم عروض تقنية مقنعة، وإغلاق الصفقات المعقدة. الخدمة تشمل تحليل احتياجات العميل، تصميم حلول تقنية مناسبة، وإعداد عروض فنية مفصلة تبرز قيمة المنتج وتزيد من معدلات التحويل.",
      level: "متقدم",
      tags: [
        "هندسة مبيعات",
        "عروض تقنية",
        "تحليل احتياجات",
        "إغلاق صفقات",
        "تدريب فرق",
        "استشارات مبيعات",
      ],
      confidence: 90,
      seoKeywords: [
        "مهندس مبيعات تقني",
        "زيادة مبيعات المنتجات التقنية",
        "عروض مبيعات فنية",
        "استشارات تسويقية",
      ],
      features: [
        { icon: <FiUsers />, text: "تحليل احتياجات العملاء التقنية" },
        { icon: <FaChartLine />, text: "إعداد عروض مبيعات تقنية متقدمة" },
        { icon: <FiTrendingUp />, text: "تدريب فرق المبيعات على المنتجات" },
        { icon: <FiCheckCircle />, text: "متابعة ما بعد البيع ودعم تقني" },
        {
          icon: <TbDeviceAnalytics />,
          text: "تحليل المنافسة واستراتيجيات التسعير",
        },
        { icon: <FiMessageSquare />, text: "تقديم استشارات مبيعات تقنية" },
      ],
      stats: [
        { value: "+80%", label: "زيادة مبيعات" },
        { value: "+100", label: "عميل تقني" },
        { value: "95%", label: "رضا عملاء" },
        { value: "40%", label: "تقليل وقت مبيعات" },
      ],
      seoContent:
        "خدمات هندسة المبيعات التقنية التي أقدمها ساعدت أكثر من 100 عميل في زيادة مبيعاتهم بنسبة 80% في المتوسط.",
    },
    {
      id: "virtual-assistant",
      icon: <FiCalendar className="text-3xl sm:text-4xl" />,
      name: "مساعد شخصي افتراضي محترف",
      color: "#8b5cf6",
      shortDesc: "إدارة وتنظيم شامل للأعمال",
      fullDesc:
        "أقدم خدمات المساعد الشخصي الافتراضي المحترف التي تساعدك في إدارة وتنظيم عملك وحياتك الشخصية بفعالية عالية. تشمل الخدمة جدولة المواعيد، إدارة البريد الإلكتروني، تنظيم المهام والمشاريع، إعداد التقارير، وحجز السفر والمواعيد. أعمل كشريك تنظيمي يساعدك على زيادة إنتاجيتك بنسبة تصل إلى 40%، تقليل الضغط، والتركيز على المهام ذات الأولوية العالية من خلال إدارة فعالة للوقت والموارد.",
      level: "متقدم",
      tags: [
        "مساعد افتراضي",
        "إدارة وقت",
        "تنظيم مواعيد",
        "إدارة مهام",
        "زيادة إنتاجية",
        "تنظيم أعمال",
      ],
      confidence: 88,
      seoKeywords: [
        "مساعد شخصي افتراضي",
        "إدارة الوقت والمهام",
        "تنظيم المواعيد",
        "مساعد تنفيذي",
        "زيادة الإنتاجية",
      ],
      features: [
        { icon: <FiCalendar />, text: "جدولة وإدارة المواعيد تلقائياً" },
        { icon: <FaUserTie />, text: "تنظيم البريد الإلكتروني والمهام" },
        { icon: <FiTarget />, text: "إدارة المشاريع والمهام اليومية" },
        { icon: <FiGlobe />, text: "حجز تذاكر سفر وترتيبات" },
        { icon: <FiCheckCircle />, text: "إعداد تقارير أداء أسبوعية" },
        { icon: <FiClock />, text: "متابعة المهام وتذكير بالمواعيد" },
      ],
      stats: [
        { value: "+40%", label: "زيادة إنتاجية" },
        { value: "+200", label: "عميل راضٍ" },
        { value: "24/7", label: "دعم مستمر" },
        { value: "100%", label: "تسليم في الوقت" },
      ],
      seoContent:
        "خدمات المساعد الافتراضي التي أقدمها ساعدت العملاء على زيادة إنتاجيتهم بنسبة 40% وتنظيم أعمالهم بشكل محترف.",
    },
    {
      id: "customer-service",
      icon: <FiHeadphones className="text-3xl sm:text-4xl" />,
      name: "خدمة عملاء احترافية متكاملة",
      color: "#10b981",
      shortDesc: "دعم عملاء واستشارات متخصصة",
      fullDesc:
        "أقدم خدمات دعم العملاء الاحترافية المتكاملة التي تركز على بناء تجربة عملاء استثنائية وزيادة ولاء العملاء. تشمل الخدمة الرد على استفسارات العملاء، حل المشكلات بفعالية، إدارة شكاوى العملاء، وتقديم دعم فني متخصص. أقوم بتطوير استراتيجيات لزيادة رضا العملاء، بناء الولاء للعلامة التجارية، وتحويل العملاء إلى سفراء للعلامة التجارية من خلال تجارب إيجابية لا تنسى.",
      level: "متقدم",
      tags: [
        "خدمة عملاء",
        "دعم فني",
        "حل مشكلات",
        "إدارة شكاوى",
        "ولاء عملاء",
        "استشارات عملاء",
      ],
      confidence: 93,
      seoKeywords: [
        "خدمة عملاء احترافية",
        "دعم فني للعملاء",
        "حل مشكلات العملاء",
        "إدارة شكاوى العملاء",
        "بناء ولاء العملاء",
      ],
      features: [
        {
          icon: <FiHeadphones />,
          text: "دعم عملاء متعدد القنوات (هاتف، واتساب، إيميل)",
        },
        { icon: <FaHandsHelping />, text: "حل المشكلات الفنية بشكل فوري" },
        { icon: <FiMessageSquare />, text: "رد سريع على استفسارات العملاء" },
        { icon: <FiHelpCircle />, text: "إدارة شكاوى العملاء وتحويلها لفرص" },
        { icon: <FiTarget />, text: "بناء استراتيجيات ولاء العملاء" },
        { icon: <FiCheckCircle />, text: "تدريب فرق خدمة العملاء" },
      ],
      stats: [
        { value: "98%", label: "رضا العملاء" },
        { value: "<5m", label: "زمن رد" },
        { value: "+50", label: "شركة خدمت" },
        { value: "4.9/5", label: "تقييم الخدمة" },
      ],
      seoContent:
        "خدمات دعم العملاء التي أقدمها حققت 98% رضا عملاء مع زمن رد أقل من 5 دقائق، مما عزز ولاء العملاء وزيادة المبيعات المتكررة.",
    },
  ];

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % technicalSkills.length);
      }, 5000); // تغيير كل 5 ثواني
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, technicalSkills.length]);

  const handleDragStart = (skillName: string) => {
    setDraggedSkill(skillName);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (draggedSkill && !skillStack.includes(draggedSkill)) {
      setSkillStack([...skillStack, draggedSkill]);
    }
    setDraggedSkill(null);
  };

  const removeFromStack = (skillName: string) => {
    setSkillStack(skillStack.filter((skill) => skill !== skillName));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % technicalSkills.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + technicalSkills.length) % technicalSkills.length,
    );
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % technicalSkills.length);
    }, 5000);
  };

  return (
    <section
      id="المهارات"
      className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-900 via-black to-gray-900"
      dir="rtl"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-6 animate-pulse">
            <span className="text-cyan-400 text-lg">🚀</span>
            <span className="text-cyan-400 font-medium text-sm sm:text-base">
              حلول رقمية متكاملة لتحويل أفكارك إلى واقع
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span
              className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient"
              itemProp="name"
            >
              خدمات تطوير الويب والتجارة الإلكترونية
            </span>
          </h1>

          <motion.p
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span itemProp="description">
              كمطور ويب وتجارة إلكترونية محترف مع أكثر من 5 سنوات خبرة، أقدم 8
              خدمات متكاملة تجمع بين أحدث تقنيات التطوير وتحسين محركات البحث
              (SEO) لتحقيق أقصى استفادة من وجودك الرقمي.
            </span>
          </motion.p>

          {/* بيانات منظمة لتحسين SEO */}
          <div className="hidden">
            <meta itemProp="provider" content="مطور ويب محترف" />
            <meta
              itemProp="serviceType"
              content="تطوير الويب, التجارة الإلكترونية, SEO, دعم عملاء, مساعدة افتراضية"
            />
            <link itemProp="url" href="https://yourdomain.com/services" />
            {technicalSkills.map((skill) => (
              <div
                key={skill.id}
                itemProp="hasOfferCatalog"
                itemScope
                itemType="https://schema.org/OfferCatalog"
              >
                <meta itemProp="name" content={skill.name} />
                <meta itemProp="description" content={skill.shortDesc} />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                خدماتي الاحترافية (8 خدمات متكاملة)
                <span className="text-sm text-gray-400 font-normal">
                  (تتحرك تلقائياً كل 5 ثوانٍ)
                </span>
              </h2>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    autoPlay
                      ? "bg-green-500/20 text-green-400 border border-green-400/30"
                      : "bg-red-500/20 text-red-400 border border-red-400/30"
                  }`}
                >
                  {autoPlay ? "⏸️ إيقاف" : "▶️ تشغيل"}
                </button>
                <span className="text-sm text-gray-400 hidden sm:block">
                  اسحب الخدمة لإضافتها لمشروعك
                </span>
              </div>
            </div>
            <div className="relative group">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-400 hover:from-cyan-500/10 hover:to-transparent transition-all duration-300 transform hover:scale-110"
                  aria-label="الخدمة السابقة"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center">
                  <div className="text-cyan-400 text-sm mb-1">
                    الخدمة الحالية
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">
                      {currentSlide + 1}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-400">
                      {technicalSkills.length}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {technicalSkills[currentSlide].name}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-400 hover:from-cyan-500/10 hover:to-transparent transition-all duration-300 transform hover:scale-110"
                  aria-label="الخدمة التالية"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-slow"></div>

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-4 rounded-2xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${technicalSkills[currentSlide].color}20, ${technicalSkills[currentSlide].color}40)`,
                          border: `2px solid ${technicalSkills[currentSlide].color}40`,
                        }}
                      >
                        <div
                          style={{ color: technicalSkills[currentSlide].color }}
                        >
                          {technicalSkills[currentSlide].icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {technicalSkills[currentSlide].name}
                        </h3>
                        <p className="text-cyan-300 text-lg">
                          {technicalSkills[currentSlide].shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {technicalSkills[currentSlide].confidence}%
                        </div>
                        <div className="text-sm text-gray-400">
                          مستوى الإتقان
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-xl ${
                              i <
                              Math.floor(
                                technicalSkills[currentSlide].confidence / 20,
                              )
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* الجانب الأيسر - الوصف والميزات */}
                    <div>
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-green-400">📋</span>
                          نظرة عامة على الخدمة
                        </h4>
                        <p
                          className="text-gray-300 text-lg leading-relaxed"
                          itemProp="description"
                        >
                          {technicalSkills[currentSlide].fullDesc}
                        </p>
                        <p className="text-gray-400 mt-4 text-sm">
                          {technicalSkills[currentSlide].seoContent}
                        </p>
                      </div>

                      <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
                        <h5 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-cyan-400">⚡</span>
                          الميزات الرئيسية
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {technicalSkills[currentSlide].features.map(
                            (feature, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                              >
                                <div className="text-cyan-400 text-xl">
                                  {feature.icon}
                                </div>
                                <span className="text-gray-300">
                                  {feature.text}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* الجانب الأيمن - الإحصائيات والتوسيع */}
                    <div>
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-purple-400">📊</span>
                          إحصائيات الخدمة
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {technicalSkills[currentSlide].stats.map(
                            (stat, i) => (
                              <div
                                key={i}
                                className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 text-center"
                              >
                                <div className="text-2xl font-bold text-white mb-1">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {stat.label}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* تفاصيل إضافية */}
                      {expandedSkill === technicalSkills[currentSlide].id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mb-8 bg-linear-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-400/20"
                        >
                          <h5 className="text-xl font-bold text-white mb-4">
                            معلومات تقنية إضافية
                          </h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {technicalSkills[currentSlide].tags.map(
                              (tag, i) => (
                                <span
                                  key={i}
                                  className="px-4 py-2 rounded-full text-sm bg-linear-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30"
                                >
                                  {tag}
                                </span>
                              ),
                            )}
                          </div>
                          <div className="text-gray-300">
                            <p className="mb-3">
                              <strong>كلمات مفتاحية لتحسين SEO:</strong>{" "}
                              {technicalSkills[currentSlide].seoKeywords.join(
                                "، ",
                              )}
                            </p>
                            <p>
                              <strong>مستوى الخدمة:</strong>{" "}
                              {technicalSkills[currentSlide].level} مع ضمان
                              الجودة
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* أزرار التحكم */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() =>
                            setExpandedSkill(
                              expandedSkill === technicalSkills[currentSlide].id
                                ? null
                                : technicalSkills[currentSlide].id,
                            )
                          }
                          className="flex-1 py-4 px-6 rounded-xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-400 font-bold hover:border-cyan-400/50 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          {expandedSkill ===
                          technicalSkills[currentSlide].id ? (
                            <>
                              <FiChevronUp />
                              إخفاء التفاصيل التقنية
                            </>
                          ) : (
                            <>
                              <FiChevronDown />
                              عرض التفاصيل التقنية
                            </>
                          )}
                        </button>

                        <button
                          draggable
                          onDragStart={() =>
                            handleDragStart(technicalSkills[currentSlide].name)
                          }
                          className="flex-1 py-4 px-6 rounded-xl bg-linear-to-r from-green-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                        >
                          <span>🚀</span>
                          اسحب لإضافة للمشروع
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${
                        ((currentSlide + 1) / technicalSkills.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {technicalSkills.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-linear-to-r from-cyan-500 to-purple-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-400"
                    }`}
                    aria-label={`الانتقال إلى الخدمة ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <div
                className="p-6 sm:p-8 backdrop-blur-xl bg-linear-to-br from-gray-900/80 to-black/80 rounded-3xl border border-gray-700 shadow-2xl shadow-purple-500/10 h-full"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400 animate-bounce">🎯</span>
                  صمم مشروعك المثالي
                </h3>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  اختر الخدمات التي تحتاجها من الكاروسول واسحبها هنا لبناء مكدس
                  تقني متكامل. سأقوم بتحليل احتياجاتك واقتراح أفضل الحلول
                  التقنية المناسبة لمشروعك.
                </p>

                {/* منطقة الإسقاط */}
                <div
                  className="min-h-87.5 p-6 border-2 border-dashed border-cyan-400/30 rounded-2xl mb-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 bg-linear-to-b from-gray-900/50 to-transparent"
                  aria-label="منطقة سحب الخدمات لبناء المشروع"
                >
                  {skillStack.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-5xl mb-6 text-cyan-400"
                      >
                        📥
                      </motion.div>
                      <p className="text-gray-300 mb-3 font-bold text-xl">
                        اسحب الخدمات هنا
                      </p>
                      <p className="text-gray-400 text-sm">
                        اختر الخدمات المناسبة من الكاروسول واسحبها إلى هذه
                        المنطقة لبدء بناء مشروعك التقني المتكامل
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-400">
                          <span className="text-cyan-400 font-bold text-xl">
                            {skillStack.length}
                          </span>{" "}
                          خدمة مختارة
                        </div>
                        <button
                          onClick={() => setSkillStack([])}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          مسح الكل
                        </button>
                      </div>

                      {skillStack.map((skillName, index) => {
                        const skill = technicalSkills.find(
                          (s) => s.name === skillName,
                        );
                        return (
                          <motion.div
                            key={skillName}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between p-4 bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="p-3 rounded-lg"
                                style={{
                                  background: `linear-gradient(135deg, ${skill?.color}20, ${skill?.color}40)`,
                                }}
                              >
                                <div style={{ color: skill?.color }}>
                                  {skill?.icon}
                                </div>
                              </div>
                              <div>
                                <div className="text-white font-bold group-hover:text-cyan-300 transition-colors">
                                  {skillName}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {skill?.shortDesc}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromStack(skillName)}
                              className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:scale-125"
                              aria-label={`إزالة ${skillName} من المكدس`}
                            >
                              <span className="text-xl">×</span>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* زر التقديم */}
                {skillStack.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-5 rounded-xl bg-linear-to-r from-green-500 via-cyan-500 to-blue-500 text-white font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 text-lg transform hover:scale-[1.02] mb-6"
                    onClick={() => {
                      if (skillStack.length > 0) {
                        const skillNames = skillStack;
                        alert(
                          `شكراً لك! تم إرسال مكدس الخدمات:\n\n${skillNames.join(
                            " + ",
                          )}\n\nسأتصل بك خلال 24 ساعة لمناقشة تفاصيل مشروعك وتقديم عرض سعر مفصل!`,
                        );
                        setSkillStack([]);
                      }
                    }}
                  >
                    🚀 اطلب عرض سعر للمشروع
                  </motion.button>
                )}

                {/* إحصائيات */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-linear-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-cyan-400">
                      {technicalSkills.length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">خدمة متاحة</div>
                  </div>
                  <div className="p-4 bg-linear-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {skillStack.length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      خدمات مختارة
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-linear-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-400/20">
                  <p className="text-gray-300 text-center text-sm">
                    <span className="text-cyan-400">💡</span> كل مشروع يتم
                    دراسته بعناية وتقديم أفضل الحلول التقنية المناسبة لميزانيتك
                    وأهدافك مع ضمان الجودة والسرعة في التنفيذ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
