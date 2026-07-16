"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Star, Users, Clock, Award, CheckCircle2, ArrowRight } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-40 text-center font-black animate-pulse">Fetching Course Data...</div>;
  if (!course) return <div className="pt-40 text-center text-red-500 font-bold">Course Not Found!</div>;

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <span className="bg-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase">{course.category}</span>
            <h1 className="text-4xl lg:text-6xl font-black">{course.title}</h1>
            <p className="text-gray-400 text-lg max-w-2xl">{course.description.substring(0, 160)}...</p>
            <div className="flex gap-8 items-center pt-4 font-bold">
              <div className="flex items-center gap-2 text-amber-400"><Star fill="currentColor" size={20}/> 4.9 Rating</div>
              <div className="flex items-center gap-2"><Users className="text-blue-500" size={20}/> Professional Training</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12 -mt-16">
        <div className="lg:col-span-2 space-y-12 pt-24">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black mb-6">What you will master</h3>
            <div className="grid md:grid-cols-2 gap-4">
               {["Industry leading techniques", "Hands-on project experience", "Expert mentorship", "Certification readiness"].map((item, i) => (
                 <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500" size={20} />
                    <span className="text-gray-600 font-bold text-sm">{item}</span>
                 </div>
               ))}
            </div>
          </div>
          <div>
             <h3 className="text-2xl font-black mb-6">Full Overview</h3>
             <p className="text-gray-600 leading-relaxed font-medium">{course.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white border border-gray-100 rounded-[40px] shadow-2xl p-8 space-y-8">
            <img src={course.thumbnail} className="w-full h-48 object-cover rounded-3xl" alt="" />
            <div className="flex items-center gap-4">
               <span className="text-5xl font-black text-gray-900">${course.price}</span>
               <span className="text-gray-400 line-through font-bold">$99.99</span>
            </div>
            <Link href={`/checkout/${course._id}`} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-center text-lg shadow-xl hover:bg-blue-700 transition block">
              Enroll Now <ArrowRight className="inline ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default CourseDetails;