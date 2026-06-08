"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MemoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Dynamic back navigation overlay */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 left-4 z-[200] pointer-events-auto"
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md text-gray-700 hover:text-rose-600 font-medium rounded-full shadow-md border border-gray-100 transition text-sm group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">⬅</span> 
          Back to Vault
        </Link>
      </motion.div>

      {/* Render the specific page content */}
      {children}
    </div>
  );
}