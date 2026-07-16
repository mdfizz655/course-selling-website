"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  LayoutDashboard, Users, CreditCard, MessageSquare, 
  ArrowRight, TrendingUp, BookOpen, DollarSign, 
  PlayCircle, Bell, Video, Clock, CheckCircle 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [usersList, setUsersList] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const API_URL = "http://localhost:5001/api";

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
    
    // ডাটাবেজ থেকে কোর্স আনা
    axios.get(`${API_URL}/courses`).then(res => setDbCourses(res.data)).catch(err => console.log(err));

    if (user?.role === "admin") {
      axios.get(`${API_URL}/auth/users`).then(res => setUsersList(res.data));
      axios.get(`${API_URL}/payments/all`).then(res => setPaymentsList(res.data));
    }
  }, [isLoggedIn, user?.role, activeTab]);

  if (!isLoggedIn) return null;

  // --- ADMIN VIEW ---
  if (user?.role === "admin") {
    return (
      <main className="min-h-screen bg-white flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-100 hidden lg:flex flex-col p-6 fixed h-full left-0">
          <div className="space-y-2">
            {[
              { id: "overview", name: "System Overview", icon: <LayoutDashboard size={20}/> },
              { id: "users", name: "User Management", icon: <Users size={20}/> },
              { id: "payments", name: "Revenue Logs", icon: <CreditCard size={20}/> },
              { id: "support", name: "Student Support", icon: <MessageSquare size={20}/> },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === item.id ? "bg-blue-600 text-white shadow-xl shadow-blue-200" : "text-gray-500 hover:bg-white"}`}>
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Admin Content Area */}
        <section className="flex-1 lg:ml-64 p-10 bg-white">
          <h2 className="text-3xl font-black text-gray-900 mb-10 capitalize">{activeTab.replace("-", " ")}</h2>

          {activeTab === "overview" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Learners" val={usersList.length} icon={<Users/>} color="blue" />
                <StatCard label="Platform Revenue" val={`$${paymentsList.reduce((acc:any, curr:any) => acc + curr.amount, 0)}`} icon={<DollarSign/>} color="green" />
                <StatCard label="Live Courses" val={dbCourses.length} icon={<BookOpen/>} color="purple" />
              </div>
              <div className="bg-gray-50 p-8 rounded-[40px] h-[400px] border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 mb-6">User Acquisition Trends</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{n:'Jan', s:400},{n:'Feb', s:900},{n:'Mar', s:700},{n:'Apr', s:1500}]}>
                    <Area type="monotone" dataKey="s" stroke="#2563eb" fill="#dbeafe" strokeWidth={4} />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-[35px] shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b font-black text-gray-400 text-[10px] uppercase tracking-widest">
                  <tr><th className="px-8 py-5">Full Name & Email</th><th className="px-6 py-5">Access Level</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {usersList.map((u: any) => (
                    <tr key={u._id} className="hover:bg-gray-50 transition"><td className="px-8 py-6 font-bold text-gray-800">{u.name} <p className="text-xs text-gray-400 font-medium">{u.email}</p></td><td className="px-6 py-6 font-black text-[10px] text-blue-600 uppercase tracking-tighter">{u.role}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-white rounded-[35px] shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b font-black text-gray-400 text-[10px] uppercase tracking-widest">
                  <tr><th className="px-8 py-5">Learner</th><th className="px-6 py-5">Course Title</th><th className="px-6 py-5">Amount</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-bold text-sm">
                  {paymentsList.map((p: any) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition text-gray-700">
                      <td className="px-8 py-5">{p.userName} <p className="text-[10px] text-gray-400">{p.userEmail}</p></td>
                      <td className="px-6 py-5 text-gray-500 font-medium">{p.courseTitle}</td>
                      <td className="px-6 py-5 text-blue-600 font-black">${p.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "support" && (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-4 font-black text-[10px] uppercase tracking-[0.2em] text-blue-600">
                    <span>Priority Support</span><span>Recent</span>
                  </div>
                  <p className="font-bold text-gray-900 mb-2">Student Inquiry #{i+102}</p>
                  <p className="text-sm text-gray-500 italic leading-relaxed">"Hello Admin, I have successfully paid for the Web Development course but it's not showing in my dashboard."</p>
                  <button className="text-blue-600 font-black text-xs mt-6 flex items-center gap-2">Respond To Learner <ArrowRight size={14}/></button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }

  // --- STUDENT VIEW ---
  // মঙ্গোডিবির _id ব্যবহার করে ফিল্টার করা
  const myEnrolledCourses = dbCourses.filter((c: any) => user?.enrolledCourses?.includes(c._id));

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto space-y-12">
        <div className="flex justify-between items-end">
           <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Personal Learning Dashboard</h1>
              <p className="text-gray-500 font-medium">Monitoring progress for {user?.name}</p>
           </div>
           <div className="hidden md:block bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm font-bold text-gray-700 text-sm">🔥 12 Day Learning Streak</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Animated Live Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <div className="bg-red-500 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase animate-pulse">Live Workshop</div>
                  <h2 className="text-2xl font-black">Building Full-Stack Apps with Next.js 15</h2>
                  <p className="opacity-80 text-sm font-medium">A live interactive session with menter is starting today at 8:00 PM.</p>
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">Join Zoom Meeting</button>
               </div>
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Enrolled Courses Grid */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2"><PlayCircle className="text-blue-600" /> My Current Courses ({myEnrolledCourses.length})</h3>
              {myEnrolledCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {myEnrolledCourses.map((c: any) => (
                    <div key={c._id} className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
                       <img src={c.thumbnail} className="h-40 w-full object-cover rounded-2xl mb-4 group-hover:scale-[1.02] transition" />
                       <h4 className="font-bold text-gray-900 mb-4 line-clamp-1">{c.title}</h4>
                       <div className="w-full bg-gray-100 h-2 rounded-full mb-4 overflow-hidden"><div className="bg-blue-600 h-full w-[45%] rounded-full"></div></div>
                       <Link href={c.videoUrl} target="_blank" className="w-full block text-center py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-xs uppercase hover:bg-blue-600 hover:text-white transition">Continue Lesson</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                   <p className="text-gray-400 font-bold mb-4 italic text-sm">Your learning list is currently empty.</p>
                   <Link href="/courses" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl inline-block shadow-blue-200">Explore All Courses</Link>
                </div>
              )}
            </div>
          </div>

          {/* Notice & Technical Help */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="font-black text-gray-900 mb-6 flex items-center gap-2"><Bell className="text-blue-600" size={20}/> Platform Notices</h3>
                <div className="space-y-4">
                   <div className="p-4 bg-blue-50 rounded-2xl text-[11px] font-bold text-blue-800 border-l-4 border-blue-600 leading-relaxed uppercase">Update: New resources added to React course module 4.</div>
                   <div className="p-4 bg-amber-50 rounded-2xl text-[11px] font-bold text-amber-800 border-l-4 border-amber-600 leading-relaxed uppercase">Warning: System maintenance tomorrow at 2:00 AM.</div>
                </div>
             </div>
             <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl">
                <h3 className="font-black text-xl mb-4">Technical Help?</h3>
                <p className="text-gray-400 text-xs mb-6 font-medium italic">Our expert technical support team is active 24/7 to solve your course related issues.</p>
                <Link href="/contact" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition">Contact Support Team <MessageSquare size={16}/></Link>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ label, val, icon, color }: any) => (
  <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm flex items-center gap-6">
    <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600 shadow-sm`}>{icon}</div>
    <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p><h3 className="text-2xl font-black text-gray-900 tracking-tight">{val}</h3></div>
  </div>
);

export default Dashboard;