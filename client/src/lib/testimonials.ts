export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  imageUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Miller",
    role: "CEO",
    company: "TechSolutions",
    quote: "UX Centerd completely transformed our product. Their research-driven approach uncovered insights we had missed for years. The redesign not only looks beautiful but has increased our conversion rate by 40%.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 2,
    name: "Rebecca Thompson",
    role: "Founder",
    company: "HealthHub",
    quote: "Working with UX Centerd was a game-changer for our startup. Their strategic approach helped us focus on the right features and create an experience our users love. The design system they developed has made our development process much more efficient.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Product Director",
    company: "InnovateTech",
    quote: "The UX Centerd team brought incredible expertise and creativity to our project. They took the time to understand our business goals and user needs, resulting in a design that exceeded our expectations. Their attention to detail and commitment to quality was outstanding.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  }
];
