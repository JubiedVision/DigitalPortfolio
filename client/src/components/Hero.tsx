import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroTexts = [
  "Designing experiences that people love",
  "Creating interfaces that inspire",
  "Building digital products that matter",
  "Transforming ideas into reality",
];

// Animation variants for decorative elements
const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 0.8,
    scale: 1,
    transition: {
      delay: 0.2 * i,
      duration: 0.8,
    }
  }),
  floating: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      delay: 0.1 * i,
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  })
};

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
    <section className="pt-32 pb-20 md:py-40 px-6 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circle */}
        <motion.div 
          className="absolute top-[10%] right-[15%] bg-primary/10 rounded-full w-64 h-64 md:w-96 md:h-96"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={shapeVariants}
        />
        
        {/* Smaller circles */}
        <motion.div 
          className="absolute bottom-[15%] left-[10%] bg-primary/20 rounded-full w-20 h-20 md:w-40 md:h-40"
          initial="hidden"
          animate={["visible", "floating"]}
          custom={1}
          variants={shapeVariants}
        />
        
        <motion.div 
          className="absolute top-[40%] left-[5%] bg-gray-200 rounded-full w-16 h-16 md:w-32 md:h-32"
          initial="hidden"
          animate={["visible", "floating"]}
          custom={2}
          variants={shapeVariants}
        />
        
        {/* Rectangle */}
        <motion.div 
          className="absolute bottom-[30%] right-[5%] bg-gray-100 rounded-lg w-40 h-24 md:w-64 md:h-32 rotate-12"
          initial="hidden"
          animate="visible"
          custom={3}
          variants={shapeVariants}
        />
        
        {/* Dotted pattern */}
        <div className="absolute inset-0 grid grid-cols-12 gap-8 opacity-30 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={i}
              className="flex flex-col gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.05 * i, duration: 0.5 }}
            >
              {Array.from({ length: 12 }).map((_, j) => (
                <motion.div 
                  key={j}
                  className="w-2 h-2 rounded-full bg-gray-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.01 * (i + j), duration: 0.5 }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block">
              Digital Design Agency
            </span>
          </motion.div>
          
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
          
          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: "10+", label: "Years Experience" },
              { value: "200+", label: "Projects Completed" },
              { value: "50+", label: "Happy Clients" },
              { value: "15+", label: "Design Awards" },
            ].map((stat, index) => (
              <div key={index} className="p-4 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="text-primary text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
