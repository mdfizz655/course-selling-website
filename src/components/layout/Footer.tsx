"use client";
import React from 'react';
import Link from 'next/link';
// শুধু একদম সাধারণ আইকনগুলো ইমপোর্ট করা হয়েছে যা সব ভার্সনে কাজ করবে
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Globe, 
  Shield, 
  Layers
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-20 pb-10 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                SKILL<span className="text-blue-600">UP</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering learners worldwide with expert-led courses and practical skills. Join our community and start your journey today.
            </p>
            <div className="flex gap-4">
              {/* সোশ্যাল আইকন এরর এড়াতে জেনেরিক আইকন ব্যবহার করা হয়েছে */}
              {[Globe, Shield, Layers, Mail].map((Icon, i) => (
                <div key={i} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/courses" className="hover:text-blue-500 transition">Browse Courses</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 transition">About SkillUp</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-500 transition">Instructor Dashboard</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-blue-500 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-2">Subscribe</h4>
            <p className="text-sm">Get the latest updates directly in your inbox.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full bg-gray-800 border-none rounded-2xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-blue-600 outline-none text-white" 
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition">
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs">
                <Phone size={14} className="text-blue-600" /> +880 1234 567 890
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Mail size={14} className="text-blue-600" /> support@skillup.com
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-[10px] font-bold uppercase tracking-widest opacity-50">
          <p>© {new Date().getFullYear()} SKILLUP PLATFORM. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;