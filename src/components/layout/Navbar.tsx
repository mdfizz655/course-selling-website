"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  Menu, X, BookOpen, LogOut, LayoutDashboard, PlusCircle, 
  User, Search, Home, Info, PhoneCall, Settings 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth(); 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- রুট লজিক (অ্যাডমিন এবং ইউজারের জন্য আলাদা ৫টি রুট) ---
  const getRoutes = () => {
    if (!isLoggedIn) {
      return [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Explore", path: "/courses", icon: <Search size={18} /> },
        { name: "About Us", path: "/about", icon: <Info size={18} /> },
        { name: "Contact", path: "/contact", icon: <PhoneCall size={18} /> },
      ];
    }

    if (user?.role === "admin") {
      return [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Explore", path: "/courses", icon: <Search size={18} /> },
        { name: "Add Course", path: "/items/add", icon: <PlusCircle size={18} /> },
        { name: "Manage Courses", path: "/items/manage", icon: <Settings size={18} /> },
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        
      ];
    }

    // সাধারণ স্টুডেন্ট ইউজার
    return [
      { name: "Home", path: "/", icon: <Home size={18} /> },
      { name: "Explore", path: "/courses", icon: <Search size={18} /> },
      { name: "My Profile", path: "/profile", icon: <User size={18} /> },
      { name: "Support", path: "/contact", icon: <PhoneCall size={18} /> },
     
       { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    ];
  };

  const routes = getRoutes();

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-white py-5 shadow-sm"}`}>
      <nav className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-all shadow-md shadow-blue-200">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black text-gray-900">SKILL<span className="text-blue-600">UP</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {routes.map((route) => (
            <Link key={route.path} href={route.path} className={`text-[14px] font-bold transition-all ${pathname === route.path ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
              {route.name}
              {pathname === route.path && <motion.div layoutId="nav-line" className="h-0.5 w-full bg-blue-600 mt-0.5 rounded-full" />}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden lg:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-blue-600 transition">Sign In</Link>
              <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1 active:scale-95 border border-blue-600">Join Now</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 leading-none">{user?.name}</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 tracking-tighter">{user?.role}</p>
              </div>
              <button onClick={logout} className="flex items-center gap-2 text-sm font-bold text-red-500 bg-red-50 border border-red-100 px-5 py-2.5 rounded-xl hover:bg-red-100 transition active:scale-95">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden bg-white border-t p-6 flex flex-col gap-5 shadow-2xl absolute w-full">
            {routes.map((route) => (
              <Link key={route.path} href={route.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-4 text-lg font-bold p-2 rounded-lg ${pathname === route.path ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}>
                {route.icon} {route.name}
              </Link>
            ))}
            {!isLoggedIn ? <Link href="/register" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white text-center py-4 rounded-2xl font-black shadow-lg">Join Now</Link> : <button onClick={logout} className="text-red-500 font-bold bg-red-50 py-4 rounded-2xl border border-red-100">Logout</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;