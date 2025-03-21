import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/lib/projects";
import { FaEye, FaCode } from "react-icons/fa";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from "react";

export default function ProjectsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="projects" className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight relative inline-block">
            Our Projects
            <motion.span 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
            ></motion.span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 font-light">
            Explore our portfolio of impactful digital experiences.
          </p>
        </motion.div>

        <div className="relative px-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3 pt-2 pb-4"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <motion.div 
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-white rounded-xl overflow-hidden shadow-md hover:drop-shadow-xl transition-all duration-300 h-full flex flex-col isolate"
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      zIndex: hoverIndex === index ? 10 : 1
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: hoverIndex === index ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                        className="aspect-video"
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoverIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: hoverIndex === index ? 1 : 0, y: hoverIndex === index ? 0 : 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4"
                      >
                        <button className="bg-white/90 text-blue-600 p-3 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-300">
                          <FaEye className="h-5 w-5" />
                        </button>
                        <button className="bg-white/90 text-blue-600 p-3 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-300">
                          <FaCode className="h-5 w-5" />
                        </button>
                      </motion.div>
                    </div>
                    <div className="p-7 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{project.title}</h3>
                      <p className="text-gray-600 mb-6 text-base font-normal leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center mt-12 gap-4">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              <HiArrowSmLeft className="h-5 w-5 text-blue-600" />
            </motion.button>
            
            <div className="flex gap-2 items-center justify-center">
              {projects.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => scrollTo(index)}
                  className={`relative w-10 h-1 rounded-full overflow-hidden transition-all duration-300 ${selectedIndex === index ? 'bg-blue-600 w-16' : 'bg-gray-200'}`}
                >
                  {selectedIndex === index && (
                    <motion.span 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-16 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}
                </button>
              ))}
            </div>
            
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              <HiArrowSmRight className="h-5 w-5 text-blue-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
