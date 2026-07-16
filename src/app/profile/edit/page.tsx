"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const EditProfilePage = () => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // পেজ লোড হলে ইউজারের বর্তমান নাম সেট করা
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Name cannot be empty");

    setLoading(true);
    try {
      const res = await axios.put("http://localhost:5001/api/auth/update-profile", {
        name,
        email: user?.email
      });

      if (res.data.success) {
        // ১. ব্রাউজারের লোকাল স্টোরেজ আপডেট
        const updatedUser = { ...user, name: res.data.user.name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        alert("Success! Your profile name has been updated.");
        
        // ২. সরাসরি প্রোফাইল পেজে পাঠিয়ে দেওয়া এবং রিফ্রেশ করা
        window.location.href = "/profile"; 
      }
    } catch (error) {
      alert("Failed to update profile. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-gray-50 pt-40 pb-20 px-6">
      <div className="max-w-md mx-auto bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        
        {/* Back Button */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 font-bold mb-6 hover:text-blue-600 transition">
          <ArrowLeft size={18}/> Back to Profile
        </button>

        <h1 className="text-2xl font-black text-gray-900 mb-2">Edit Name</h1>
        <p className="text-gray-400 text-sm mb-8">Update your public display name</p>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-1 tracking-widest">Your Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition font-bold text-gray-700"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="space-y-2 opacity-60">
            <label className="text-xs font-black uppercase text-gray-400 ml-1 tracking-widest">Email (Cannot be changed)</label>
            <input 
              value={user?.email} 
              disabled 
              className="w-full p-5 bg-gray-100 border border-gray-100 rounded-2xl cursor-not-allowed font-medium text-gray-500" 
            />
          </div>

          <button 
            disabled={loading} 
            type="submit" 
            className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95 disabled:bg-gray-300"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={20}/> Save Changes</>}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;