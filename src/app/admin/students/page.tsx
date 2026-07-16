"use client";
import React from 'react';
import { Users, Trash2, Mail, ShieldCheck, Search, Filter } from 'lucide-react';

const StudentManagement = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Student Management</h1>
            <p className="text-gray-500 font-medium">Total Active Students: 12,450</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search student..." className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none" />
            </div>
            <button className="bg-white p-3 rounded-2xl border border-gray-100 text-gray-600"><Filter size={20}/></button>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-sm font-black text-gray-700">Student Name</th>
                <th className="px-6 py-5 text-sm font-black text-gray-700">Email</th>
                <th className="px-6 py-5 text-sm font-black text-gray-700">Courses</th>
                <th className="px-6 py-5 text-sm font-black text-gray-700">Status</th>
                <th className="px-6 py-5 text-sm font-black text-gray-700 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">S</div>
                    <span className="font-bold text-gray-900">Student Name {i}</span>
                  </td>
                  <td className="px-6 py-6 text-sm text-gray-600 font-medium">student{i}@mail.com</td>
                  <td className="px-6 py-6 text-sm font-black text-blue-600">{i+2} Enrolled</td>
                  <td className="px-6 py-6">
                    <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition"><Mail size={16}/></button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition"><Trash2 size={16}/></button>
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

export default StudentManagement;