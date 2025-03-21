import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { services } from "@/lib/services";
import { 
  FaSearchengin, 
  FaPaintBrush, 
  FaSitemap, 
  FaLayerGroup, 
  FaFingerprint,
  FaMobileAlt 
} from "react-icons/fa";

export default function ServicesSection() {
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
                <a
                  href="#"
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
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
