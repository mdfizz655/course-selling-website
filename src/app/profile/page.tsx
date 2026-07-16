"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Shield, BookOpen, Award, Clock, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left: User Info Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-100 border border-gray-100 p-8 text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-5xl font-black shadow-xl border-4 border-white">
                {user?.name?.charAt(0)}
              </div>
              <h2 className="text-2xl font-black text-gray-900">{user?.name}</h2>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">{user?.role} Account</p>
              
              <div className="mt-8 space-y-4 text-left border-t border-gray-50 pt-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">Verified Student</span>
                </div>
              </div>

              <button className="w-full mt-10 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition">
                <Edit3 size={18} /> Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Right: Learning Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Enrolled", val: "12", icon: <BookOpen />, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Completed", val: "08", icon: <Award />, color: "text-green-600", bg: "bg-green-50" },
                { label: "Study Hours", val: "145h", icon: <Clock />, color: "text-purple-600", bg: "bg-purple-50" },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm flex flex-col items-center">
                  <div className={`${s.bg} ${s.color} p-4 rounded-2xl mb-4`}>{s.icon}</div>
                  <h3 className="text-2xl font-black text-gray-900">{s.val}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-6">About Student</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Passionate learner currently focusing on mastering Web Development and UI/UX Design. Always looking for new challenges and real-world projects to improve skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;