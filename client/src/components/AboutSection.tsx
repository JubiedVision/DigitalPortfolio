import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { team } from "@/lib/team";
import { FaUsers, FaLightbulb, FaStar } from "react-icons/fa";

export default function AboutSection() {
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
    <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={sectionRef}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            About Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary to-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8">
            We're a team of passionate designers and strategists dedicated to creating exceptional user experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-primary to-indigo-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
              <FaLightbulb className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We believe that great design starts with understanding the user. Our human-centered approach combines research, strategy, and design to create products that people love to use.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By focusing on the intersection of user needs, business goals, and technical feasibility, we create solutions that are not only beautiful but also effective and practical.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
              <FaStar className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <p className="text-gray-600"><span className="font-semibold">Innovation</span> - We push boundaries and embrace new technologies</p>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <p className="text-gray-600"><span className="font-semibold">Quality</span> - We're committed to excellence in everything we do</p>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <p className="text-gray-600"><span className="font-semibold">Collaboration</span> - We believe in the power of teamwork</p>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-4 relative inline-block">
            Our Team
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-indigo-600 rounded-full"></span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Meet the talented individuals who make our vision come to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden ring-4 ring-gray-100">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold mb-2">{member.name}</h4>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <div className="flex justify-center space-x-3 mt-4">
                <a href="#" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                  </svg>
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
