"use client";
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <h1 className="text-4xl font-black text-gray-900">Get in Touch</h1>
            <p className="text-gray-500 font-medium">Have questions? We are here to help you 24/7.</p>
            
            <div className="space-y-6">
              {[
                { icon: <Mail className="text-blue-600" />, title: "Email Us", info: "support@skillup.com" },
                { icon: <Phone className="text-blue-600" />, title: "Call Us", info: "+880 1234 567 890" },
                { icon: <MapPin className="text-blue-600" />, title: "Visit Us", info: "Dhaka, Bangladesh" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="bg-blue-50 p-3 rounded-xl">{c.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{c.title}</p>
                    <p className="text-sm font-black text-gray-900">{c.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <input type="email" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" placeholder="How can we help?" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition" placeholder="Write your message here..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition flex items-center justify-center gap-3">
                  Send Message <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;