export interface Service {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "UX Research",
    description: "Discover insights about your users through interviews, usability testing, and data analysis.",
    iconName: "FaSearchengin",
  },
  {
    id: 2,
    title: "UI Design",
    description: "Create beautiful, intuitive interfaces that align with your brand and delight your users.",
    iconName: "FaPaintBrush",
  },
  {
    id: 3,
    title: "Product Strategy",
    description: "Develop a roadmap for your digital product that aligns business goals with user needs.",
    iconName: "FaSitemap",
  },
  {
    id: 4,
    title: "Design Systems",
    description: "Build scalable design systems that ensure consistency and efficiency across your products.",
    iconName: "FaLayerGroup",
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Develop a distinct visual identity that communicates your brand values and resonates with users.",
    iconName: "FaFingerprint",
  },
  {
    id: 6,
    title: "Prototyping",
    description: "Create interactive prototypes to test and validate your ideas before development.",
    iconName: "FaMobileAlt",
  },
];
