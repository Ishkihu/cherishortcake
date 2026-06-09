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
    isNew: false,
  },
  {
    id: "anniversary",
    title: "The Anniversary Archive",
    description: "Unlocking a milestone forged within the timeless chronologies.",
    date: "Awaiting Date, MMXXVI",
    path: "/memories/anniversary",
    tomeVolume: "Vol. II",
    color: "hover:bg-[#1e3a5f]/80 border-[#d4af37]/60 text-[#d4af37]",
    isNew: true,
  }
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

const getRomanNumeral = (index: number) => {
  const numerals = ["I", "II", "III", "IV", "V", "VI"];
  return numerals[index] || (index + 1).toString();
};

export default function RavenclawVault() {
  const [hasEntered, setHasEntered] = useState(false); // Controls the hero page overlay status
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
      
      {/* ---------------- ANCIENT CINEMATIC HERO ENTRANCE GATE ---------------- */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -100, // Slides upward like a secret corridor gate rising
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
            className="absolute inset-0 z-[100] flex flex-col justify-center items-center bg-[#030710] px-4 overflow-hidden"
          >
            {/* Background Atmosphere Layer inside Hero gate */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 filter mix-blend-color-dodge grayscale"
              style={{ backgroundImage: `url('/assets/hogwarts.jpeg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030710]/80 to-[#030710]" />

            {/* Glowing Rune Ambient Accents */}
            <div className="absolute w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            {/* Hero Main Content Block */}
            <div className="relative text-center max-w-2xl space-y-8 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="mx-auto w-24 h-24 mb-2 drop-shadow-[0_0_20px_rgba(176,141,87,0.3)]"
              >
                <img 
                  src="/assets/ravenclaw-logo.png" 
                  alt="Hogwarts House Crest Entrance" 
                  className="w-full h-full object-contain filter brightness-90 opacity-80"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-4"
              >
                <span className="text-[10px] tracking-[0.5em] text-[#b08d57] uppercase font-bold block">
                  Hogwarts Archives Division
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl magic-title text-[#d4af37] tracking-widest font-bold filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  The Forbidden Vault
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-xs sm:text-sm text-slate-400 italic max-w-md mx-auto leading-relaxed tracking-wider font-light"
              >
                "An interactive sanctuary compiled under high clearance parameters, safeguarding designated collection records."
              </motion.p>

              {/* CAST SPELL GATEWAY ACTION BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="pt-6"
              >
                <button
                  onClick={() => setHasEntered(true)}
                  className="group relative px-8 py-3.5 rounded-md border border-[#d4af37]/50 bg-[#091224]/80 text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:border-[#d4af37] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:text-white"
                >
                  {/* Internal ambient button lighting flare effect */}
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Cast Alohomora <span>✨</span>
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Base micro-script footer tag */}
            <div className="absolute bottom-6 text-[8px] uppercase tracking-[0.4em] text-slate-600 font-medium">
              Awaiting Incantation Sign-off
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- EASTER EGG: SPELL CASTING LAYERS ---------------- */}
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

      {/* ---------------- THE MAIN EXPANSIVE DASHBOARD WORKSPACE ---------------- */}
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

          {/* BROAD PANEL CONTAINER */}
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

            {/* List Renderer Container */}
            <div className="p-6 md:p-8 space-y-5 bg-[#050912]/50">
              {MEMORY_ARCHIVES.map((archive, index) => (
                <div key={archive.id} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                    archive.isNew 
                      ? 'from-[#d4af37]/25 via-[#b08d57]/15 to-[#d4af37]/5' 
                      : 'from-[#b08d57]/0 via-[#b08d57]/15 to-[#b08d57]/0'
                  } rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500`} />
                  
                  <Link href={archive.path} className="block relative z-10">
                    <div className={`flex items-center p-5 rounded-lg border backdrop-blur-md transition-all duration-300 shadow-xl ${
                      archive.isNew 
                        ? "bg-[#0c1a30]/95 border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.08)]" 
                        : `bg-[#0b1426]/95 border-[#b08d57]/20 ${archive.color}`
                    }`}>
                      
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center text-lg font-bold shadow-inner transition-all duration-300 ${
                        archive.isNew 
                          ? "border-[#d4af37] bg-gradient-to-br from-[#1b345c] to-[#040812] text-[#fff] drop-shadow-[0_0_6px_rgba(212,175,55,0.35)]" 
                          : "border-[#b08d57]/40 bg-gradient-to-br from-[#1c355e] to-[#040811] text-[#d4af37]"
                      }`}>
                        {getRomanNumeral(index)}
                      </div>

                      <div className="flex-grow ml-5 border-l border-[#b08d57]/20 pl-5 grid grid-cols-12 items-center gap-4">
                        <div className="col-span-12 md:col-span-8 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                            <h2 className={`text-base md:text-xl font-bold tracking-wide transition-colors truncate ${
                              archive.isNew ? "text-white group-hover:text-[#d4af37]" : "text-slate-200 group-hover:text-[#d4af37]"
                            }`}>
                              {archive.title}
                            </h2>
                            <span className="italic text-[10px] text-[#b08d57] shrink-0 border border-[#b08d57]/20 px-2.5 py-0.5 rounded-full bg-[#050a14] font-medium tracking-wide">
                              {archive.tomeVolume}
                            </span>

                            {archive.isNew && (
                              <motion.span 
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="text-[9px] font-sans font-bold tracking-[0.15em] uppercase text-[#02050a] bg-[#d4af37] px-2 py-0.5 rounded shadow-[0_0_10px_rgba(212,175,55,0.4)] shrink-0"
                              >
                                New
                              </motion.span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-[#829bb8] mt-1.5 font-light tracking-wide truncate">
                            {archive.description}
                          </p>
                        </div>

                        <div className="col-span-12 md:col-span-4 flex items-center justify-end gap-4 text-right">
                          <span className="text-xs tracking-wider hidden sm:block opacity-70 font-sans font-medium text-[#64748b] whitespace-nowrap">
                            {archive.date}
                          </span>
                          <span className={`text-2xl transform group-hover:translate-x-2 transition-transform duration-300 shrink-0 select-none ${
                            archive.isNew ? "text-[#d4af37]" : "text-[#b08d57]"
                          }`}>
                            ⟶
                          </span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
              ))}
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