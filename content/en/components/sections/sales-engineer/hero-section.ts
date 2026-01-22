export const heroContent = {
  tagline: "Real Stories from the Field",
  title: {
    highlighted: "How I Turned Challenges into Successes",
    normal: "Real Experiences in Selling Technical Solutions",
  },
  stories: [
    {
      id: 1,
      company: "Tech Startup in Riyadh",
      challenge:
        "Innovative product but weak sales due to difficulty explaining value to traditional clients",
      solution:
        "Transforming complex technical language into tangible and clear business benefits",
      result: "300% increase in sales within just 6 months",
      icon: "🚀",
      color: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
      quote:
        "Ibrahim transformed our complex technical product into a simple sales story understood by all clients",
      sector: "Emerging Technology",
      duration: "6 months",
      clientType: "Tech Startup",
    },
    {
      id: 2,
      company: "Major Commercial Institution in Dubai",
      challenge:
        "Frequent rejection of offers due to high price compared to competitors",
      solution:
        "Building a comprehensive ROI model showing investment return within just 3 months",
      result: "Closing a deal worth one million dirhams after only 3 meetings",
      icon: "💰",
      color: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      quote:
        "We weren't selling a product, we were selling a solution that tangibly doubled their monthly profits",
      sector: "E-commerce",
      duration: "3 months",
      clientType: "Large Institution",
    },
    {
      id: 3,
      company: "Global SaaS Company in Local Market",
      challenge:
        "Clients refusing to change from current provider due to technical concerns",
      solution:
        "Analyzing current challenges and presenting customized solutions with a smooth transition plan",
      result:
        "Replacing 5 major competitors in the local market within one year",
      icon: "🔄",
      color: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      quote:
        "Clients don't mind change if they see real, practical value that addresses their needs",
      sector: "Business Software",
      duration: "12 months",
      clientType: "Global Company",
    },
    {
      id: 4,
      company: "Specialized Private Hospital in Cairo",
      challenge:
        "Limited budget with urgent need for integrated management system",
      solution:
        "Dividing the project into stages starting with priorities with flexible scheduling",
      result:
        "Complete system implementation within 12 months without any financial pressure on the client",
      icon: "🏥",
      color: "bg-gradient-to-r from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
      quote:
        "Deep understanding of healthcare sector needs and challenges was key to this project's success",
      sector: "Healthcare",
      duration: "12 months",
      clientType: "Healthcare Institution",
    },
    {
      id: 5,
      company: "Manufacturing Factory in Jubail Industrial City",
      challenge:
        "Resistance to change from veteran employees to the new system",
      solution:
        "Intensive training program with direct and continuous support during transition period",
      result:
        "Increased production efficiency by 40% with 70% reduction in errors",
      icon: "🏭",
      color: "bg-gradient-to-r from-red-500/20 to-rose-500/20",
      borderColor: "border-red-500/30",
      quote:
        "Technology alone is not enough, understanding people and processes is what makes the real difference",
      sector: "Manufacturing",
      duration: "8 months",
      clientType: "Factory",
    },
  ],
  circularItems: [
    {
      id: 1,
      text: "I Don't Sell Products",
      description: "I understand and solve problems",
      icon: "🚫",
      rotation: 0,
      delay: 0,
    },
    {
      id: 2,
      text: "Sales Engineer Mindset",
      description: "Combining technology and commerce",
      icon: "🧠",
      rotation: 72,
      delay: 0.1,
    },
    {
      id: 3,
      text: "Consultative Selling",
      description: "I ask more than I talk",
      icon: "🤔",
      rotation: 144,
      delay: 0.2,
    },
    {
      id: 4,
      text: "Value Translation",
      description: "Technology into business language",
      icon: "💎",
      rotation: 216,
      delay: 0.3,
    },
    {
      id: 5,
      text: "Building Partnership",
      description: "Long-term trust",
      icon: "🤝",
      rotation: 288,
      delay: 0.4,
    },
  ],
  stats: [
    { value: "45+", label: "Successful Projects", icon: "" },
    { value: "98%", label: "Customer Satisfaction", icon: "" },
    { value: "100+", label: "Success Stories", icon: "" },
    { value: "30+", label: "Different Sectors", icon: "" },
  ],
  sections: {
    client: "Client",
    challenge: "Challenge",
    solution: "Solution",
    result: "Result",
    storyNumber: (num: number) => `Real Story #${num}`,
    realExperience: "Real Experience from the Field",
    quote: "Client's Words",
    sector: "Sector",
    duration: "Duration",
    clientType: "Client Type",
  },
  buttons: {
    prev: "Previous",
    next: "Next",
  },
  moreStories: "More Success Stories",
  readMore: "Read More",
};
