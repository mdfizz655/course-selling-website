"use client";
import React from 'react';
import { Star, ArrowRight, Clock, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CourseCard = ({ course }: { course: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }} 
      className="bg-white rounded-[35px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 overflow-hidden flex flex-col h-full group"
    >
      {/* Course Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest">
          {course.category}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg">
            <Star size={14} fill="currentColor"/> 4.8
          </div>
          <span className="text-xl font-black text-blue-600">${course.price}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase mb-6 pt-4 border-t border-gray-50">
           <div className="flex items-center gap-1"><Users size={14} /> 12k Students</div>
           <div className="flex items-center gap-1"><Clock size={14} /> 15h 30m</div>
        </div>

        {/* View Details Button - ID Fix Here */}
        <Link 
          href={`/courses/${course._id}`} // মঙ্গোডিবির _id ব্যবহার করা হয়েছে
          className="mt-auto w-full py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;