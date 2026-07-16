"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit3, Eye, Search } from 'lucide-react';
import Link from 'next/link';

const ManageCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const API_URL = "http://localhost:5001/api/courses";

  const fetchCourses = async () => {
    const res = await axios.get(API_URL);
    setCourses(res.data);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchCourses();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-10">Manage Published Courses</h1>
        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 font-black text-gray-400 text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-8 py-6">Course Title</th>
                <th className="px-6 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {courses.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <img src={c.thumbnail} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <span className="font-bold text-gray-900">{c.title}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center gap-3">
                      {/* View Button */}
                      <Link href={`/courses/${c._id}`} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm">
                        <Eye size={18}/>
                      </Link>
                      {/* Edit Button */}
                      <Link href={`/items/edit/${c._id}`} className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition shadow-sm">
                        <Edit3 size={18}/>
                      </Link>
                      {/* Delete Button */}
                      <button onClick={() => handleDelete(c._id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
export default ManageCourses;