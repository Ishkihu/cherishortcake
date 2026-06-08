"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MEMORY_ARCHIVES = [
  {
    id: "valentines",
    title: "The Valentine Charter",
    description: "An interactive incantation of affection and history.",
    date: "XIV February, MMXXVI",
    path: "/memories/valentines",
    tomeVolume: "Vol. I",
    color: "hover:bg-[#1a2c4c]/80 border-[#b08d57]/40 text-[#b08d57]", 
  },
];

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

export default function RavenclawVault() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [flashes, setFlashes] = useState<LumosFlash[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean up old drawn trail points periodically
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

    // Trigger Reverted Lumos Flash
    setFlashes((prev) => [...prev, { x, y, id: newId }]);

    // Instantly remove flash from DOM once animation wraps up
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
    
    // Limit total active path size to avoid dragging lag
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
      className="min-h-screen w-full relative flex justify-center items-center p-4 md:p-6 xl:p-8 text-[#e2e8f0] overflow-x-hidden select-none selection:bg-[#b08d57] selection:text-white bg-[#02050a]"
    >
      {/* IMPORT HARRY POTTER STYLE FONTS & INJECT GLOBAL CURSOR */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&display=swap');
        
        * {
          cursor: url('https://cdn.cursors-4u.net/previews/harry-potter-magical-wand-ef2c54d6-32.webp') 32 32, auto !important;
          font-family: 'Cinzel', serif;
        }
        
        .magic-title {
          font-family: 'Cinzel Decorative', serif;
        }
      `}</style>
      
      {/* ---------------- EASTER EGG: SPELL CASTING LAYERS ---------------- */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Lumos Click Flashes (Reduced Radius & Faster Fading) */}
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

        {/* Dynamic Continuous Drawing Wand Line */}
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
              style={{ transition: "stroke-dasharray 0.1s ease" }}
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

      {/* ---------------- BACKGROUND ASSET LAYERS ---------------- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 z-10"
          style={{ backgroundImage: `url('/assets/hogwarts.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-[#091326]/90 to-[#112240]/70 mix-blend-multiply z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02050a]/50 via-transparent to-[#02050a] z-20" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none z-30"
          src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-clouds-in-a-blue-sky-40432-large.mp4"
        />
      </div>

      {/* ---------------- THE EXPANSIVE 12-COLUMN SCREEN GRID ---------------- */}
      <div className="relative z-40 w-full max-w-[95rem] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-2 xl:gap-4">
        
        {/* ================= FAR LEFT: FULL-SIZED CREST ================= */}
        <div className="hidden lg:flex justify-center items-center lg:col-span-2 px-4 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-[180px] aspect-[3/4] relative"
          >
            <img 
              src="/assets/ravenclaw-logo.png" 
              alt="Ravenclaw House Crest Left" 
              className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_20px_rgba(28,53,94,0.6)]"
            />
          </motion.div>
        </div>

        {/* ================= CENTRAL INTERFACE CORE ================= */}
        <div className="col-span-1 lg:col-span-8 w-full flex items-center justify-center gap-4 xl:gap-6">
          
          {/* LEFT PILLAR */}
          <div className="hidden sm:flex flex-col items-center justify-between h-[68vh] w-8 bg-gradient-to-b from-[#0d1b33]/40 via-[#050c17]/60 to-[#02050a]/90 border-x border-[#b08d57]/25 rounded-t-full relative shrink-0 pointer-events-none">
            <div className="w-full h-4 border-b border-[#b08d57]/30 bg-[#b08d57]/5 rounded-t-full" />
            <div className="text-[8px] tracking-[0.6em] text-[#b08d57]/25 font-serif uppercase [writing-mode:vertical-lr] my-auto select-none font-semibold">
              R A V E N C L A W
            </div>
            <div className="w-full h-8 border-t border-[#b08d57]/30 bg-gradient-to-t from-black to-transparent" />
          </div>

          {/* BROAD PANEL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-grow w-full backdrop-blur-xl bg-[#070d1a]/85 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.98)] rounded-xl border-2 border-[#b08d57]/40 overflow-hidden ring-1 ring-white/10"
          >
            <header className="px-8 py-10 text-center relative overflow-hidden border-b-2 border-[#b08d57]/30 bg-[#0a1426]/60 pointer-events-none">
              <h1 className="text-2xl sm:text-3xl md:text-4xl magic-title text-[#d4af37] tracking-wider font-bold filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Cheery's Memory Vault
              </h1>
              
              <div className="flex items-center justify-center gap-4 mt-3 text-[#94a3b8]">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b08d57]/50" />
                <p className="italic tracking-widest text-xs font-medium text-slate-400">
                  "Wit beyond measure is man's greatest treasure."
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#b08d57]/50" />
              </div>
            </header>

            <div className="p-6 md:p-8 space-y-5 bg-[#050912]/50">
              {MEMORY_ARCHIVES.map((archive) => (
                <div key={archive.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#b08d57]/0 via-[#b08d57]/15 to-[#b08d57]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  
                  <Link href={archive.path} className="block relative z-10">
                    <div className={`flex items-center p-5 rounded-lg border bg-[#0b1426]/95 border-[#b08d57]/20 backdrop-blur-md transition-all duration-300 shadow-xl ${archive.color}`}>
                      
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#b08d57]/40 bg-gradient-to-br from-[#1c355e] to-[#040811] flex items-center justify-center text-lg text-[#d4af37] font-bold shadow-inner">
                        I
                      </div>

                      <div className="flex-grow ml-5 border-l border-[#b08d57]/20 pl-5 grid grid-cols-12 items-center gap-4">
                        <div className="col-span-12 md:col-span-8 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                            <h2 className="text-base md:text-xl font-bold text-slate-200 tracking-wide group-hover:text-[#d4af37] transition-colors truncate">
                              {archive.title}
                            </h2>
                            <span className="italic text-[10px] text-[#b08d57] shrink-0 border border-[#b08d57]/20 px-2.5 py-0.5 rounded-full bg-[#050a14] font-medium tracking-wide">
                              {archive.tomeVolume}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-[#829bb8] mt-1.5 font-light tracking-wide truncate">
                            {archive.description}
                          </p>
                        </div>

                        <div className="col-span-12 md:col-span-4 flex items-center justify-end gap-4 text-right">
                          <span className="text-xs tracking-wider hidden sm:block opacity-70 font-sans font-medium text-[#64748b] whitespace-nowrap">
                            {archive.date}
                          </span>
                          <span className="text-2xl text-[#b08d57] transform group-hover:translate-x-2 transition-transform duration-300 shrink-0 select-none">
                            ⟶
                          </span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
              ))}

              <div className="flex items-center p-5 rounded-lg border border-gray-800/40 bg-[#060b14]/40 opacity-35 select-none">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-700/30 bg-[#0a1122] flex items-center justify-center text-base text-gray-500">
                  II
                </div>
                <div className="flex-grow ml-5 border-l border-gray-800/30 pl-5">
                  <h2 className="text-sm tracking-widest text-gray-400 uppercase font-bold">
                    Sealed Record
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-light italic">
                    Awaiting active timeline manifestation...
                  </p>
                </div>
              </div>
            </div>

            <footer className="bg-[#050a14] border-t border-[#b08d57]/20 p-4 text-center flex justify-between px-6 text-[9px] uppercase tracking-[0.25em] text-[#576880] pointer-events-none">
              <span>Hogwarts Archive Div. III</span>
              <span>Clearance: Raven-2026</span>
            </footer>
          </motion.div>

          {/* RIGHT PILLAR */}
          <div className="hidden sm:flex flex-col items-center justify-between h-[68vh] w-8 bg-gradient-to-b from-[#0d1b33]/40 via-[#050c17]/60 to-[#02050a]/90 border-x border-[#b08d57]/25 rounded-t-full relative shrink-0 pointer-events-none">
            <div className="w-full h-4 border-b border-[#b08d57]/30 bg-[#b08d57]/5 rounded-t-full" />
            <div className="text-[8px] tracking-[0.6em] text-[#b08d57]/25 font-serif uppercase [writing-mode:vertical-lr] my-auto select-none font-semibold">
              R A V E N C L A W
            </div>
            <div className="w-full h-8 border-t border-[#b08d57]/30 bg-gradient-to-t from-black to-transparent" />
          </div>

        </div>

        {/* ================= FAR RIGHT: MATCHING SYMMETRIC CREST ================= */}
        <div className="hidden lg:flex justify-center items-center lg:col-span-2 px-4 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="w-full max-w-[180px] aspect-[3/4] relative"
          >
            <img 
              src="/assets/ravenclaw-logo.png" 
              alt="Ravenclaw House Crest Right" 
              className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_20px_rgba(28,53,94,0.6)]"
            />
          </motion.div>
        </div>

      </div>
    </main>
  );
}