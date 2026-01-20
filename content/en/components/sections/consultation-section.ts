export const consultationSectionContent = {
  sectionId: "consultation",
  
  status: "Available for Consultations",
  
  title: {
    freeConsultation: "Free Consultation",
    forYourTechProject: "For Your Tech Project",
    mainTitle: "Start Your Consultation Now"
  },
  
  description: {
    chooseMethod: "Choose the communication method that suits you and start the journey of turning your idea into a successful project"
  },
  
  labels: {
    name: "Full Name *",
    phone: "Phone Number *",
    email: "Email Address *",
    consultationType: "Consultation Type",
    preferredTime: "Preferred Contact Time",
    message: "Tell me about your project *"
  },
  
  placeholders: {
    name: "What should I call you?",
    phone: "+20 123 456 7890",
    email: "example@domain.com",
    message: "What is your project idea? What do you want to achieve? Any problems you face?",
    time: "Choose preferred time"
  },
  
  consultationTypes: [
    {
      value: "general",
      label: "General Consultation",
      icon: "💡",
      desc: "Discuss your project idea"
    },
    {
      value: "technical",
      label: "Technical Consultation",
      icon: "⚙️",
      desc: "Technical feasibility assessment"
    },
    {
      value: "strategy",
      label: "Strategy Consultation",
      icon: "🎯",
      desc: "Project roadmap planning"
    },
    {
      value: "review",
      label: "Project Review",
      icon: "🔍",
      desc: "Review of an existing project"
    }
  ],
  
  preferredTimes: [
    { value: "", label: "Choose preferred time" },
    { value: "morning", label: "Morning (9 AM - 12 PM)" },
    { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
    { value: "evening", label: "Evening (4 PM - 8 PM)" }
  ],
  
  buttons: {
    startConsultation: "Start Your Free Consultation",
    whatsapp: "Send via WhatsApp Now",
    phone: "Call Me Now",
    submitting: "Sending...",
    anotherConsultation: "Request Another Consultation"
  },
  
  successMessages: {
    title: "Consultation Requested Successfully!",
    whatsapp: "WhatsApp opened, you can start the conversation now",
    phone: "Redirecting you to phone call...",
    default: "Thank you for your trust! I will contact you within 24 hours to schedule the consultation."
  },
  
  steps: [
    { icon: "📧", text: "Confirmation to your email" },
    { icon: "📞", text: "Call on your number" },
    { icon: "🗓️", text: "Schedule appointment" }
  ],
  
  additionalTexts: {
    free30Minutes: "30 Minutes Free Consultation",
    chooseMethodAndFill: "Choose the appropriate communication method and fill out the form to start your free consultation now",
    dontHesitate: "Don't hesitate!",
    free30MinutesHighlight: "30 free minutes",
    turningPoint: "might be the turning point for your project",
    chooseMethodAndStart: "Choose the method that suits you and start your project's success journey today"
  }
};