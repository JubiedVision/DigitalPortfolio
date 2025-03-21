export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export const team: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead UX Designer",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UX Researcher",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UI Designer",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
];
