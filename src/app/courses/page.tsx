"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '@/components/shared/CourseCard';
import CourseSkeleton from '@/components/shared/CourseSkeleton';
import { Search, LayoutGrid } from 'lucide-react';

const ExploreCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  
  const API_URL = "http://localhost:5001/api/courses";

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(API_URL);
        setCourses(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Explore Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchAllCourses();
  }, []);

  // Filtering Logic
  const filteredCourses = courses.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Explore Professional Courses</h1>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-[30px] shadow-xl shadow-blue-100 border border-gray-100 mb-12 flex flex-col lg:flex-row gap-4 items-center">
           <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by title..." 
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 w-full lg:w-auto">
              <LayoutGrid size={18} className="text-blue-600" />
              <select 
                className="bg-transparent font-bold text-gray-600 outline-none cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option>Web Development</option>
                <option>UI/UX Design</option>
                <option>Marketing</option>
              </select>
           </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => <CourseSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course: any) => (
              <CourseCard key={course._id} course={course} /> // key তে _id ব্যবহার করা হয়েছে
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ExploreCourses;