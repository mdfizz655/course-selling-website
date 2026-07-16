"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight, Star, Users, CheckCircle } from "lucide-react";

const Hero: React.FC = () => {
  return (
    // Hero.tsx এর প্রথম অংশটি এভাবে পরিবর্তন করুন:
<section className="relative min-h-[80vh] flex items-center bg-white overflow-hidden pt-32 pb-10">
  {/* বাকি কোড আগের মতোই থাকবে... */}
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* --- Left Content --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-wider">New Courses are Live!</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
            Master Your Future <br />
            <span className="text-blue-600 relative">
              With Expert Skills
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C118.957 4.46351 239.428 3.24291 355 7" stroke="#2563EB" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Experience world-class learning with industry experts. Join 12,000+ students and start your journey towards a professional career today.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link 
              href="/courses" 
              className="group bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95"
            >
              Explore Courses 
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </Link>

            <button className="flex items-center gap-3 text-gray-700 font-bold hover:text-blue-600 transition-colors group">
              <div className="bg-white p-3 rounded-full shadow-lg group-hover:bg-blue-50 transition-colors">
                <PlayCircle className="text-blue-600" size={28} />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-gray-500 font-medium">4.9/5 from 2,000+ reviews</p>
            </div>
          </div>
        </motion.div>

        {/* --- Right Content (Hero Image & Floating Cards) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Main Image Container */}
          <div className="relative z-10 w-[500px] h-[550px] ml-auto">
            <div className="absolute inset-0 bg-blue-600 rounded-[40px] rotate-6 -z-10 opacity-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000" 
              alt="Learning" 
              className="w-full h-full object-cover rounded-[40px] shadow-2xl border-8 border-white"
            />

            {/* Floating Card 1: Students Count */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-16 top-1/4 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4 z-20"
            >
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900">12k+</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Active Students</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Certificate Badge */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -right-8 bottom-1/4 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4 z-20"
            >
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Certified Mentors</p>
                <p className="text-xs text-gray-500 font-medium">Verify Skills Globally</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;