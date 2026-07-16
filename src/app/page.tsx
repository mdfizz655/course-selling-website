"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from "@/components/home/Hero";
import CourseCard from "@/components/shared/CourseCard";
import { ArrowRight, Sparkles, Target, ShieldCheck, Users, PlayCircle, Mail } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const API_URL = "http://localhost:5001/api/courses";

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const res = await axios.get(API_URL);
        setCourses(res.data.slice(0, 4)); // প্রথম ৪টি কোর্স দেখাবে
      } catch (error) {
        console.error("Home Data Fetch Error:", error);
      }
    };
    fetchFeaturedCourses();
  }, []);

  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Statistics Section */}
      <section className="bg-blue-600 py-16 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center relative z-10">
          {[
            { label: "Active Students", val: "12,000+", icon: <Users /> },
            { label: "Expert Mentors", val: "50+", icon: <Target /> },
            { label: "Premium Courses", val: "200+", icon: <PlayCircle /> },
            { label: "Success Rate", val: "99%", icon: <ShieldCheck /> },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
               <div className="flex justify-center mb-2 opacity-50">{stat.icon}</div>
               <h3 className="text-4xl font-black">{stat.val}</h3>
               <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </section>

      {/* 3. Featured Courses (Dynamic from DB) */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs tracking-[0.2em]">
              <Sparkles size={18} /> Top Picks
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Master New Skills with <br /> Our <span className="text-blue-600">Featured</span> Courses
            </h2>
          </div>
          <Link href="/courses" className="bg-blue-50 text-blue-600 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
            View All Courses <ArrowRight size={20} />
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">No dynamic courses found. Please add from Admin Panel.</p>
          </div>
        )}
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-20 bg-gray-50">
         <div className="container mx-auto px-6 text-center max-w-3xl mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 text-center">Why SkillUp is Better?</h2>
            <p className="text-gray-500 font-medium">We provide more than just videos. We provide a complete career path.</p>
         </div>
         <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
            {[
              { t: "Lifetime Access", d: "Learn at your own pace with forever access.", c: "bg-blue-100 text-blue-600" },
              { t: "Expert Support", d: "Get your doubts cleared by industry pros.", c: "bg-purple-100 text-purple-600" },
              { t: "Certifications", d: "Earn recognized certificates upon completion.", c: "bg-green-100 text-green-600" },
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-transform">
                <div className={`w-16 h-16 ${f.c} rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl`}>{i+1}</div>
                <h4 className="text-xl font-black mb-4">{f.t}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 5. Newsletter Section */}
      <section className="py-24 container mx-auto px-6">
         <div className="bg-gray-900 rounded-[50px] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-white">Join 5,000+ Students Getting Weekly Career Tips</h2>
               <div className="flex flex-col md:flex-row gap-4">
                  <input type="email" placeholder="Enter your email" className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-600" />
                  <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-900/20">Subscribe Now</button>
               </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
         </div>
      </section>
    </main>
  );
}