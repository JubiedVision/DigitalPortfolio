import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  project: z.string().min(10, "Please provide more details about your project"),
  services: z.array(z.string()).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Function to handle form submission
async function handleFormSubmission(formData: ContactFormValues) {
  // Encode form data for Netlify
  const formDataToSend = new FormData();
  
  // Add form-name field which Netlify requires
  formDataToSend.append("form-name", "contact");
  
  // Add all form fields
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  if (formData.company) formDataToSend.append("company", formData.company);
  formDataToSend.append("project", formData.project);
  
  // Handle services array
  if (formData.services && formData.services.length > 0) {
    formData.services.forEach(service => {
      formDataToSend.append("services[]", service);
    });
  }
  
  // Submit the form data to Netlify
  try {
    const response = await fetch("/", {
      method: "POST",
      body: formDataToSend,
    });
    
    if (!response.ok) {
      throw new Error(`Form submission failed: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error submitting to Netlify:", error);
    throw error;
  }
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      project: "",
      services: [],
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await handleFormSubmission(data);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
            ref={ref}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to create exceptional user experiences? Get in touch with us today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-md"
          >
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/" 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              {/* Netlify Form Detection */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field to prevent spam */}
              <div className="hidden">
                <input name="bot-field" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name")}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email")}
                    placeholder="Your email"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  {...register("company")}
                  placeholder="Your company"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <textarea
                  id="project"
                  name="project"
                  {...register("project")}
                  rows={4}
                  placeholder="Tell us about your project"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.project ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.project && (
                  <p className="mt-1 text-sm text-red-500">{errors.project.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Services you're interested in
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="services[]"
                      value="ux-research"
                      {...register("services")}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2">UX Research</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="services[]"
                      value="ui-design"
                      {...register("services")}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2">UI Design</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="services[]"
                      value="product-strategy"
                      {...register("services")}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2">Product Strategy</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="services[]"
                      value="design-systems"
                      {...register("services")}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2">Design Systems</span>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-6 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
