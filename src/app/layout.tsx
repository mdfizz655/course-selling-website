"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // যে পেজগুলোতে ফুটার দেখাবে না (Dashboard এবং Checkout)
  const hideFooterRoutes = ["/dashboard", "/checkout", "/items/manage", "/items/add"];
  const shouldHideFooter = hideFooterRoutes.some((route) => pathname.startsWith(route));

  return (
    <html lang="en">
      <head>
        <title>SkillUp - Professional Learning Platform</title>
        <meta name="description" content="Master new skills with industry experts" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          
          {/* Main content area */}
          <main className="min-h-screen bg-white">
            {children}
          </main>

          {/* Conditional Footer Rendering */}
          {!shouldHideFooter && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}