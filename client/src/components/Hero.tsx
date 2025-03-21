import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroTexts = [
  "Designing experiences that people love",
  "Creating interfaces that inspire",
  "Building digital products that matter",
  "Transforming ideas into reality",
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
        setVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 md:py-40 px-6 bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 h-[80px] md:h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {heroTexts[textIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We are a UX design agency focused on creating digital products that are intuitive, engaging, and impactful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Start a project
            </a>
            <a
              href="#services"
              className="bg-gray-100 text-dark px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-all"
            >
              Explore our services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
