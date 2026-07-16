"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Zap, ArrowRight, Loader2, Lock } from 'lucide-react';

const CheckoutPage = () => {
  const { id } = useParams();
  const { user, syncUser, isLoggedIn } = useAuth() as any;
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
    axios.get(`http://localhost:5001/api/courses/${id}`).then(res => setCourse(res.data));
  }, [id, isLoggedIn]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentData = {
        userEmail: user?.email,
        userName: user?.name,
        courseTitle: course?.title,
        courseId: id,
        amount: course?.price
      };

      const res = await axios.post("http://localhost:5001/api/payments/checkout", paymentData);
      
      if (res.data.success) {
        syncUser(id); 
        alert("Payment Successful! Your course has been unlocked.");
        router.push("/dashboard");
      }
    } catch (err) {
      alert("Payment Error. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <div className="pt-40 text-center font-black animate-pulse text-blue-600">Initialing Secure Checkout...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl grid lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
           <h2 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-2"><Lock className="text-blue-600" size={24}/> Order Summary</h2>
           <img src={course.thumbnail} className="rounded-3xl mb-6 h-48 w-full object-cover shadow-sm" alt="" />
           <h3 className="text-xl font-bold text-gray-800 leading-tight mb-4">{course.title}</h3>
           <p className="text-gray-400 text-sm mb-6">Lifetime access to all lectures, resources, and expert support community.</p>
           <div className="mt-8 pt-8 border-t flex justify-between items-center">
              <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Total Amount:</span>
              <span className="text-4xl font-black text-blue-600">${course.price}</span>
           </div>
        </div>

        {/* Secure Payment UI */}
        <div className="flex flex-col justify-center space-y-8">
           <div className="bg-blue-600 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-4">Instant Enrollment</h2>
                <p className="opacity-80 text-sm font-medium mb-8 leading-relaxed">This is a secure demo payment. Clicking the button below will instantly unlock your course and add it to your learning dashboard.</p>
                <button 
                    onClick={handlePayment} 
                    disabled={loading}
                    className="w-full bg-white text-blue-600 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl active:scale-95"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Zap fill="#2563eb" /> Unlock This Course</>}
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 text-green-600 font-bold text-xs uppercase tracking-widest justify-center shadow-sm">
              <ShieldCheck size={20} /> 256-bit AES Secure Checkout
           </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;