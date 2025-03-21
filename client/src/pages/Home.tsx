import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
