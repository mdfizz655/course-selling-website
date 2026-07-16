import { Course } from "@/types";

export const courses: Course[] = [
  {
    id: "1",
    title: "Mastering Next.js with TypeScript",
    instructor: "Anisul Islam",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
    description: "Learn to build production-ready applications with Next.js 14 and TypeScript from scratch.",
    price: 49.99,
    rating: 4.8,
    totalStudents: 1250,
    category: "Web Development",
    duration: "12h 30m",
    lessons: 45
  },
  {
    id: "2",
    title: "Advanced UI/UX Design Mastery",
    instructor: "Sarah Khan",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800",
    description: "Master modern design tools and principles to create stunning user interfaces and experiences.",
    price: 59.00,
    rating: 4.9,
    totalStudents: 850,
    category: "Design",
    duration: "10h 15m",
    lessons: 38
  },
  // আরও অন্তত ৪-৫টি কোর্স অ্যাড করুন এখানে
];