"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Edit, Save, ArrowLeft } from 'lucide-react';

const EditCourse = () => {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const API_URL = "http://localhost:5001/api/courses";

  useEffect(() => {
    // পুরনো ডাটা ফেচ করে ফর্মে বসানো
    axios.get(`${API_URL}/${id}`).then(res => {
      const course = res.data;
      setValue("title", course.title);
      setValue("category", course.category);
      setValue("price", course.price);
      setValue("thumbnail", course.thumbnail);
      setValue("videoUrl", course.videoUrl);
      setValue("description", course.description);
    });
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      if (res.data.success) {
        alert("Course Updated Successfully!");
        router.push("/items/manage");
      }
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 font-bold mb-6 hover:text-blue-600 transition">
          <ArrowLeft size={18}/> Back to Manage
        </button>
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <Edit className="text-blue-600" /> Edit Course Information
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input {...register("title")} placeholder="Title" className="p-4 bg-gray-50 border rounded-2xl outline-none" />
            <select {...register("category")} className="p-4 bg-gray-50 border rounded-2xl outline-none font-bold">
              <option>Web Development</option>
              <option>UI/UX Design</option>
              <option>Marketing</option>
            </select>
            <input {...register("price")} type="number" placeholder="Price" className="p-4 bg-gray-50 border rounded-2xl outline-none" />
            <input {...register("thumbnail")} placeholder="Thumbnail URL" className="p-4 bg-gray-50 border rounded-2xl outline-none" />
          </div>
          <input {...register("videoUrl")} placeholder="Video URL" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" />
          <textarea {...register("description")} rows={4} className="w-full p-4 bg-gray-50 border rounded-2xl outline-none"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition">
            <Save /> Save Changes
          </button>
        </form>
      </div>
    </main>
  );
};
export default EditCourse;