"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

interface LumosFlash {
  x: number;
  y: number;
  id: number;
}

export default function AnniversaryPage() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [flashes, setFlashes] = useState<LumosFlash[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const newId = Date.now();

    setFlashes((prev) => [...prev, { x, y, id: newId }]);

    setTimeout(() => {
      setFlashes((prev) => prev.filter((f) => f.id !== newId));
    }, 600);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setTrail((prev) => [...prev, { x, y, id: Math.random() }]);
    
    if (trail.length > 40) {
      setTrail((prev) => prev.slice(1));
    }
  };

  return (
    <main 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: `url('https://cdn.cursors-4u.net/previews/harry-potter-magical-wand-ef2c54d6-32.webp') 32 32, auto`
      }}
      className="min-h-screen w-full relative flex flex-col justify-between p-6 md:p-12 text-[#e2e8f0] overflow-x-hidden select-none bg-[#02050a]"
    >
      {/* Safe Font Injection */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&display=swap" />

      {/* ---------------- INTERACTIVE SPELL LAYERS ---------------- */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {flashes.map((flash) => (
            <motion.div
              key={flash.id}
              initial={{ scale: 0.1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: flash.x - 15,
                top: flash.y - 15,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(191,219,254,1) 0%, rgba(37,99,235,0.7) 45%, rgba(0,0,0,0) 70%)",
                mixBlendMode: "screen",
                boxShadow: "0 0 20px rgba(59,130,246,0.9), 0 0 40px rgba(147,197,253,0.7)",
              }}
            />
          ))}
        </AnimatePresence>

        <svg className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none">
          <filter id="wand-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {trail.length > 1 && (
            <path
              d={`M ${trail[0].x} ${trail[0].y} ` + trail.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")}
              fill="none"
              stroke="url(#magicGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wand-glow)"
            />
          )}
          <defs>
            <linearGradient id="magicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ---------------- BACKGROUND GRAPHICS ---------------- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02050a] via-[#050c18]/95 to-[#02050a] z-10" />
      </div>

      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <header style={{ fontFamily: "'Cinzel', serif" }} className="relative z-40 w-full max-w-6xl mx-auto flex justify-between items-center border-b border-[#b08d57]/20 pb-4">
        <Link 
          href="/" 
          className="text-xs tracking-[0.3em] text-[#b08d57] hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">⟵</span> Return to Vault
        </Link>
        <span className="text-[10px] tracking-[0.4em] text-slate-500 uppercase">Volume II</span>
      </header>

      {/* ---------------- MAIN PLACEHOLDER CANVAS ---------------- */}
      <div style={{ fontFamily: "'Cinzel', serif" }} className="relative z-40 my-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <span className="text-4xl inline-block filter drop-shadow-[0_0_15px_rgba(176,141,87,0.4)]">⏳</span>
          
          <h1 
            style={{ fontFamily: "'Cinzel Decorative', serif" }} 
            className="text-3xl sm:text-4xl text-[#d4af37] tracking-widest font-bold"
          >
            The Anniversary Archive
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-slate-500">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#b08d57]/30" />
            <p className="italic text-xs tracking-widest text-[#b08d57]/70">
              {/* Safely wrapped quotes to survive Vercel / Next linting */}
              {"Sealed by ancient timeline protective charms."}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#b08d57]/30" />
          </div>

          <p className="text-sm text-slate-400 font-light max-w-md mx-auto leading-relaxed tracking-wide">
            This sector of the vault remains tightly sealed under ministerial protocol. Its layout configuration parameters are staging for dynamic chronomancy invocation.
          </p>
        </motion.div>
      </div>

      {/* ---------------- FOOTER METADATA ---------------- */}
      <footer style={{ fontFamily: "'Cinzel', serif" }} className="relative z-40 w-full max-w-6xl mx-auto border-t border-[#b08d57]/10 pt-4 text-center sm:flex sm:justify-between text-[9px] tracking-[0.3em] text-slate-600 uppercase space-y-2 sm:space-y-0">
        <span>Status: Awaiting Manifestation</span>
        <span>Classification: Restricted Restricted</span>
      </footer>
    </main>
  );
}