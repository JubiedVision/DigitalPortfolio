import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { services } from "@/lib/services";

export default function ServicesSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="service-card bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={service.icon}
                  />
                </svg>
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
