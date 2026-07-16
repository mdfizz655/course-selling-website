"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const success = await registerUser(data);
    setLoading(false);
    if (success) router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-32 pb-20">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 text-center mb-2">Join SkillUp</h1>
        <p className="text-gray-500 font-medium text-center mb-10">Start your career journey today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input {...register("name", { required: true })} type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input {...register("email", { required: true })} type="email" placeholder="example@mail.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
            </div>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Create Account"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8">
          <button onClick={() => alert("Google Sign up currently in demo mode.")} className="w-full flex items-center justify-center gap-4 border-2 border-gray-100 py-4 rounded-2xl font-bold hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="" />
            Sign up with Google
          </button>
        </div>
        <p className="mt-10 text-center text-sm font-medium text-gray-500">Already have an account? <Link href="/login" className="text-blue-600 font-black hover:underline">Sign In</Link></p>
      </motion.div>
    </main>
  );
};
export default RegisterPage;