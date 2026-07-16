"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PlusCircle, Layout, Tag, DollarSign, Image, Video, FileText, ArrowRight } from 'lucide-react';

const AddCourse = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${API_URL}/courses/add`, data);
      if (res.data.success) {
        alert("Course Published Successfully!");
        router.push("/items/manage");
      }
    } catch (error) {
      alert("Error adding course. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-3">
          <PlusCircle className="text-blue-600" /> Create New Course
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input {...register("title", { required: true })} placeholder="Course Title" className="p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-600" />
            <select {...register("category", { required: true })} className="p-4 bg-gray-50 border rounded-2xl font-bold">
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
            <input {...register("price", { required: true })} type="number" placeholder="Price ($)" className="p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-600" />
            <input {...register("thumbnail", { required: true })} placeholder="Thumbnail URL" className="p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <input {...register("videoUrl", { required: true })} placeholder="YouTube Playlist URL" className="w-full p-4 bg-red-50 border border-red-100 rounded-2xl outline-none" />
          <textarea {...register("description", { required: true })} rows={4} placeholder="Full Description" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:bg-blue-700 transition">Publish Course</button>
        </form>
      </div>
    </main>
  );
};
export default AddCourse;