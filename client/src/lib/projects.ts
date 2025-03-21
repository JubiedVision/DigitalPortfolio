export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Finance Dashboard",
    description: "A comprehensive financial management platform with intuitive data visualization.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["UX Research", "UI Design"],
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A modern shopping experience with personalized recommendations and seamless checkout.",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["User Testing", "UX/UI Design"],
  },
  {
    id: 3,
    title: "Health Tracking App",
    description: "A comprehensive health monitoring application with personalized insights and goals.",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Product Strategy", "Mobile Design"],
  },
];
