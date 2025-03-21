import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    // Pause autoplay for a while when manually changing slides
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${i < rating ? "text-primary" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from the companies we've helped to create exceptional user experiences.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="px-4"
              >
                <div className="bg-gray-100 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
                      <img
                        src={testimonials[activeIndex].imageUrl}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex mb-4">
                        {renderStars(testimonials[activeIndex].rating)}
                      </div>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed italic">
                        "{testimonials[activeIndex].quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                        <p className="text-gray-500">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
