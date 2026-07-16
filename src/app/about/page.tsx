"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="container mx-auto">
        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4">Our Story</h2>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Empowering Minds <br /> Worldwide
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              SkillUp was founded with a simple mission: to provide world-class education that is accessible, affordable, and practical. We believe that everyone should have the chance to master the skills needed for the modern workforce.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" size={24} />
                <span className="font-bold text-gray-700">Expert Mentors</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" size={24} />
                <span className="font-bold text-gray-700">Lifetime Access</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" alt="Team" className="rounded-[40px] shadow-2xl" />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[30px] shadow-xl border border-gray-100 hidden md:block">
              <p className="text-4xl font-black text-blue-600">10+</p>
              <p className="text-sm font-bold text-gray-500">Years of Excellence</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-[50px] p-12 md:p-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: "Students", val: "12K+", icon: <Users size={32} /> },
            { label: "Courses", val: "500+", icon: <Award size={32} /> },
            { label: "Countries", val: "45+", icon: <Globe size={32} /> },
            { label: "Instructors", val: "80+", icon: <Users size={32} /> },
          ].map((s, i) => (
            <div key={i} className="text-white space-y-3">
              <div className="text-blue-500 flex justify-center">{s.icon}</div>
              <h3 className="text-4xl font-black">{s.val}</h3>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutPage;