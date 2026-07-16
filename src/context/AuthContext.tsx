"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// --- TypeScript Interfaces ---
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  enrolledCourses: string[]; // কেনা কোর্সের আইডিগুলো এখানে থাকবে
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  registerUser: (data: any) => Promise<boolean>;
  logout: () => void;
  syncUser: (courseId: string) => void; // পেমেন্ট সফল হওয়ার পর স্টেট আপডেট করার জন্য
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ব্যাকএন্ড এপিআই ইউআরএল (Port 5001)
const API_URL = "http://localhost:5001/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // পেজ রিফ্রেশ দিলেও যাতে লগইন থাকে তার জন্য useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // ১. লগইন ফাংশন (ব্যাকএন্ড কানেকশনসহ)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      if (res.data.success) {
        const userData = res.data.user;
        const token = res.data.token;

        setUser(userData);
        setIsLoggedIn(true);

        // ব্রাউজারে ডাটা সেভ করে রাখা
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || "Invalid Email or Password!";
      alert(message); // ভুল ডাটা দিলে ইউজারকে মেসেজ দিবে
      return false;
    }
  };

  // ২. রেজিস্ট্রেশন ফাংশন
  const registerUser = async (data: any): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      if (res.data.success) {
        alert("Account Created Successfully! Now you can Sign In.");
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed!";
      alert(message);
      return false;
    }
  };

  // ৩. পেমেন্টের পর ইউজারের কোর্স লিস্ট আপডেট করার লজিক (syncUser)
  const syncUser = (courseId: string) => {
    if (user) {
      // বর্তমান লিস্টের সাথে নতুন কোর্স আইডি যোগ করা
      const updatedEnrolled = [...(user.enrolledCourses || []), courseId];
      const updatedUser = { ...user, enrolledCourses: updatedEnrolled };
      
      setUser(updatedUser); // স্টেট আপডেট
      localStorage.setItem("user", JSON.stringify(updatedUser)); // লোকাল স্টোরেজ আপডেট
    }
  };

  // ৪. লগআউট ফাংশন
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.clear(); // সব ডাটা মুছে ফেলা
    window.location.href = "/login"; // লগইন পেজে পাঠিয়ে দেওয়া
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, registerUser, logout, syncUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// কাস্টম হুক যাতে অন্য পেজে সহজে ব্যবহার করা যায়
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};