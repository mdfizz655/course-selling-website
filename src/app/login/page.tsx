"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Copy, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const success = await login(data.email, data.password);
    setLoading(false);
    if (success) router.push("/dashboard");
  };

  const handleDemoFill = (email: string, pass: string, type: string) => {
    setValue("email", email);
    setValue("password", pass);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleGoogleLogin = () => {
    alert("Connecting to Google Services... Please wait.");
    // ডেমো পপ-আপ সিমুলেশন
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-32 pb-20">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-500 font-medium mb-10">Access your professional learning hub</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input {...register("email", { required: true })} type="email" placeholder="admin@skillup.com" className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input {...register("password", { required: true })} type="password" placeholder="••••••••" className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : "Login Now"} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8">
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-4 border-2 border-gray-100 py-4 rounded-2xl font-bold hover:bg-gray-50 transition active:scale-95">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="" />
              Continue with Google
            </button>
          </div>
        </motion.div>

        {/* Demo Box */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl font-black mb-8 relative z-10 text-white">Demo Credentials</h2>
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                <p className="text-[10px] font-black uppercase text-blue-200 mb-4 tracking-widest">Admin</p>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>admin@skillup.com</span>
                  <button onClick={() => handleDemoFill("admin@skillup.com", "admin12345", "ae")}>{copied === "ae" ? <CheckCircle2 size={18}/> : <Copy size={18}/>}</button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                <p className="text-[10px] font-black uppercase text-blue-200 mb-4 tracking-widest">Student</p>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>student@skillup.com</span>
                  <button onClick={() => handleDemoFill("student@skillup.com", "user12345", "ue")}>{copied === "ue" ? <CheckCircle2 size={18}/> : <Copy size={18}/>}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-[40px] text-center shadow-lg"><p className="text-gray-500 font-bold mb-2">New here?</p><Link href="/register" className="text-blue-600 font-black text-2xl hover:underline">Create Account</Link></div>
        </motion.div>
      </div>
    </main>
  );
};
export default LoginPage;