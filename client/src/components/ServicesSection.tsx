import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { services } from "@/lib/services";
import { useState } from "react";
import { 
  FaSearchengin, 
  FaPaintBrush, 
  FaSitemap, 
  FaLayerGroup, 
  FaFingerprint,
  FaMobileAlt 
} from "react-icons/fa";

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Map of icon components by name
  const iconComponents = {
    FaSearchengin,
    FaPaintBrush,
    FaSitemap,
    FaLayerGroup,
    FaFingerprint,
    FaMobileAlt
  };

  // Gradient background classes for each service
  const gradientClasses = [
    "bg-gradient-to-tr from-blue-500 to-indigo-600",
    "bg-gradient-to-tr from-purple-500 to-pink-600",
    "bg-gradient-to-tr from-green-500 to-teal-600",
    "bg-gradient-to-tr from-yellow-500 to-orange-600",
    "bg-gradient-to-tr from-red-500 to-rose-600",
    "bg-gradient-to-tr from-cyan-500 to-blue-600",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const openModal = (serviceId: number) => {
    setActiveModal(serviceId);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <section id="services" className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={sectionRef}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive UX design solutions tailored to your specific needs and goals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            // Get the icon component dynamically
            const IconComponent = iconComponents[service.iconName as keyof typeof iconComponents];
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="service-card bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${gradientClasses[index]} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button
                  onClick={() => openModal(service.id)}
                  className="text-primary font-medium flex items-center group"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Service Detail Modals */}
      {activeModal !== null && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white rounded-xl w-full max-w-3xl shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {services.map((service, index) => {
              if (service.id !== activeModal) return null;
              
              const IconComponent = iconComponents[service.iconName as keyof typeof iconComponents];
              
              return (
                <div key={`modal-${service.id}`}>
                  <div className="p-5 flex justify-between items-center border-b">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${gradientClasses[index]} rounded-xl flex items-center justify-center mr-3 text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-gray-600 mb-5">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <h4 className="font-semibold text-base mb-3">What we offer:</h4>
                        <ul className="space-y-1.5">
                          {getServiceDetails(service.id).map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-base mb-3">Why it matters</h4>
                        <p className="text-gray-600 text-sm">{getServiceBenefits(service.id)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-base mb-3">Our Process</h4>
                      <div className="relative">
                        {/* Process timeline line */}
                        <div className="absolute left-4 top-2 bottom-0 w-0.5 bg-gray-200"></div>
                        
                        <div className="space-y-3">
                          {getServiceProcess(service.id).map((step, i) => (
                            <div key={i} className="flex items-start">
                              <div className={`flex-shrink-0 z-10 ${gradientClasses[index]} text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm`}>
                                {i + 1}
                              </div>
                              <div>
                                <div className="font-medium text-base">{step.title}</div>
                                <div className="text-gray-600 text-sm">{step.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t flex justify-end">
                    <button 
                      onClick={closeModal}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg mr-2 hover:bg-gray-100 transition-colors text-sm"
                    >
                      Close
                    </button>
                    <a 
                      href="#contact" 
                      onClick={closeModal}
                      className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// Helper functions to provide additional content for each service

function getServiceDetails(serviceId: number): string[] {
  switch (serviceId) {
    case 1: // UX Research
      return [
        "User interviews and contextual inquiry",
        "Usability testing and evaluation",
        "Survey design and analysis",
        "Competitive analysis",
        "Heuristic evaluation"
      ];
    case 2: // UI Design
      return [
        "Visual design for web and mobile",
        "Responsive design across devices",
        "Interactive prototypes",
        "Design system implementation",
        "Animation and micro-interactions"
      ];
    case 3: // Product Strategy
      return [
        "Product vision workshops",
        "User journey mapping",
        "Feature prioritization",
        "MVP definition",
        "Roadmap planning"
      ];
    case 4: // Design Systems
      return [
        "Component library creation",
        "Design tokens and guidelines",
        "Documentation and governance",
        "Adoption strategy",
        "Maintenance and evolution"
      ];
    case 5: // Brand Identity
      return [
        "Logo design and visual identity",
        "Brand guidelines and style guides",
        "Brand voice and messaging",
        "Visual storytelling",
        "Brand consistency across touchpoints"
      ];
    case 6: // Prototyping
      return [
        "Low to high-fidelity prototypes",
        "Interactive prototypes for testing",
        "User flow validation",
        "Visual concept exploration",
        "Developer handoff and specifications"
      ];
    default:
      return [];
  }
}

function getServiceBenefits(serviceId: number): string {
  switch (serviceId) {
    case 1: // UX Research
      return "Research ensures your products are built on real user insights rather than assumptions, dramatically increasing your chances of market success and reducing costly revisions.";
    case 2: // UI Design
      return "Thoughtful UI design creates positive first impressions, builds trust with users, and differentiates your product in a crowded marketplace while supporting your business goals.";
    case 3: // Product Strategy
      return "Strategic planning aligns business objectives with user needs, creating a clear direction for development that maximizes resources and minimizes waste.";
    case 4: // Design Systems
      return "A comprehensive design system accelerates development, ensures consistency across products, reduces design debt, and enables teams to focus on solving unique problems.";
    case 5: // Brand Identity
      return "Strong brand identity establishes emotional connections with users, builds recognition, and creates a foundation for all your marketing and product efforts.";
    case 6: // Prototyping
      return "Prototyping validates concepts early, reduces development costs, aligns stakeholders, and ensures the final product meets user expectations before significant investment.";
    default:
      return "";
  }
}

function getServiceProcess(serviceId: number): Array<{title: string, description: string}> {
  switch (serviceId) {
    case 1: // UX Research
      return [
        { title: "Discovery", description: "Define research goals and questions" },
        { title: "Planning", description: "Design research methodology and recruit participants" },
        { title: "Execution", description: "Conduct research activities and gather data" },
        { title: "Analysis", description: "Analyze findings and identify patterns" },
        { title: "Recommendations", description: "Translate insights into actionable recommendations" }
      ];
    case 2: // UI Design
      return [
        { title: "Exploration", description: "Explore visual concepts and directions" },
        { title: "Wireframing", description: "Create structural layouts of key screens" },
        { title: "Visual Design", description: "Apply brand identity and visual elements" },
        { title: "Refinement", description: "Iterate based on feedback and testing" },
        { title: "Delivery", description: "Prepare final designs for development" }
      ];
    case 3: // Product Strategy
      return [
        { title: "Discovery", description: "Understand business goals and market landscape" },
        { title: "User Research", description: "Gather insights about user needs and behaviors" },
        { title: "Opportunity Mapping", description: "Identify key opportunities and challenges" },
        { title: "Roadmap Creation", description: "Define features and prioritize development" },
        { title: "Validation", description: "Test assumptions and refine strategy" }
      ];
    case 4: // Design Systems
      return [
        { title: "Audit", description: "Review existing design patterns and inconsistencies" },
        { title: "Architecture", description: "Define system structure and component hierarchy" },
        { title: "Creation", description: "Build and document core components" },
        { title: "Implementation", description: "Deploy system and train teams" },
        { title: "Maintenance", description: "Establish processes for updates and improvements" }
      ];
    case 5: // Brand Identity
      return [
        { title: "Research", description: "Understand brand values, audience, and competitors" },
        { title: "Concept Development", description: "Explore visual directions and themes" },
        { title: "Design", description: "Create logo, color palette, typography, and elements" },
        { title: "Guidelines", description: "Document usage rules and applications" },
        { title: "Implementation", description: "Apply identity across touchpoints" }
      ];
    case 6: // Prototyping
      return [
        { title: "Concept Sketching", description: "Quickly visualize ideas and solutions" },
        { title: "Low-fidelity Prototyping", description: "Create basic interactive wireframes" },
        { title: "High-fidelity Design", description: "Develop detailed visual mockups" },
        { title: "Interactive Prototyping", description: "Build functional prototypes for testing" },
        { title: "Validation", description: "Test with users and refine based on feedback" }
      ];
    default:
      return [];
  }
}
