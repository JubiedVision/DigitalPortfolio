import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { team } from "@/lib/team";

export default function AboutSection() {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
            ref={aboutRef}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're a team of passionate designers and strategists dedicated to creating exceptional user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe that great design starts with understanding the user. Our human-centered approach combines research, strategy, and design to create products that people love to use.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              By focusing on the intersection of user needs, business goals, and technical feasibility, we create solutions that are not only beautiful but also effective and practical.
            </p>
          </motion.div>

          <div ref={teamRef}>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6"
            >
              Our Team
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-center"
                >
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold">{member.name}</h4>
                  <p className="text-gray-500">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
