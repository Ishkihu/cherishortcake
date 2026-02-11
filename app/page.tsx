"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- PHOTO EXPLOSION ---------------- */
const PhotoExplosion = ({ isVisible }: { isVisible: boolean }) => {
  // 1. List your 8 specific paths here
  const myPhotos = [
    "assets/phuto1.jpg",
    "assets/phuto2.jpg",
    "assets/phuto3.jpg",
    "assets/phuto4.jpg",
    "assets/phuto5.jpg",
    "assets/phuto6.jpg",
    "assets/phuto7.jpg",
    "assets/phuto8.jpg",
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[110] flex items-center justify-center">
          {myPhotos.map((src, i) => {
            // Adjust math for 8 items instead of 9
            const angle = (i / myPhotos.length) * Math.PI * 2; 
            const distance = 400 + Math.random() * 200; 
            const xDest = Math.cos(angle) * distance;
            const yDest = Math.sin(angle) * distance;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{
                  scale: 1,
                  x: [xDest, xDest + 10, xDest],
                  y: [yDest, yDest - 10, yDest],
                  // Added a bit of random tilt to the final position
                  rotate: [0, 10, -10, (Math.random() - 0.5) * 20],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.08, // Staggered entry
                  rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                className="absolute w-40 h-40 md:w-64 md:h-64 p-2 bg-white shadow-2xl border border-rose-100 rounded-sm"
              >
                <img 
                  src={src} 
                  alt={`memory-${i}`} 
                  className="w-full h-full object-cover rounded-xs" 
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

/* ---------------- BACKGROUND DECOR ---------------- */
const BackgroundDecor = () => {
  const items = ["🧸", "❤️", "🌹", "🌸", "💖", "✨"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#f1bfcc]">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{ y: "-20vh", rotate: 360, opacity: [0, 0.4, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: Math.random() * 10 }}
          className="absolute text-2xl"
        >
          {items[i % items.length]}
        </motion.div>
      ))}
    </div>
  );
};

export default function ValentineFinal() {
  const [status, setStatus] = useState<"idle" | "asking" | "accepted">("idle");
  const [isUnfurled, setIsUnfurled] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    setNoButtonPos({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
    });
  };

  const reset = () => {
    setStatus("idle");
    setIsUnfurled(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(circle,_#ffffff_0%,_#fff0f3_100%)]">
      <BackgroundDecor />

      {/* 1. MINI-GAME OVERLAY */}
      <AnimatePresence>
        {status === "asking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-rose-100/80 p-4"
          >
            <div className="text-center p-8 bg-white rounded-3xl shadow-2xl border-4 border-rose-200 w-full max-w-sm">
              <h2 className="text-3xl font-serif text-rose-600 mb-8 italic">Will you be my Valentine? ❤️</h2>
              <div className="flex flex-col gap-4 items-center justify-center relative h-32">
                <button
                  onClick={() => setStatus("accepted")}
                  className="bg-green-500 text-white px-10 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-green-600 active:scale-90 z-10"
                >
                  YES!
                </button>
                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onMouseEnter={handleNoHover}
                  className="bg-red-400 text-white px-8 py-2 rounded-full text-lg font-medium"
                >
                  No
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE LETTER & CELEBRATION */}
      <PhotoExplosion isVisible={status === "accepted"} />
      
      <AnimatePresence>
        {status === "accepted" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={reset}
              className="fixed inset-0 z-[100] bg-rose-950/40 cursor-pointer"
            />
            
            <div className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", damping: 15 }}
                onAnimationComplete={() => setIsUnfurled(true)}
                className="w-full max-w-[420px] pointer-events-auto shadow-2xl"
              >
                <div className="bg-[#faf9f6] border border-rose-100 rounded-lg overflow-hidden">
                  <div className="p-8 pb-4 text-center">
                    <h2 className="text-[#be123c] font-serif text-3xl md:text-5xl italic">My Cheri,</h2>
                    <p className="text-[13px] text-gray-400 tracking-widest uppercase mt-2">Valentines Letter</p>
                  </div>
                  
                  <motion.div
                    animate={{ height: isUnfurled ? "auto" : 0 }}
                    className="overflow-hidden px-8 border-y border-rose-50"
                  >
                    <div className="py-8 text-center space-y-6">
                      <p className="text-gray-700 italic text-xl md:text-2xl leading-relaxed">
                        "YAYY! This is for you, my babi, the sweetest person I have ever met. The woman who never fails to make me feel loved, the one who cherishes me as much as I do and more. Happy Valentine's Day My Babi!"
                      </p>
                      <div className="text-3xl animate-bounce">🧸❤️🌸</div>
                    </div>
                  </motion.div>

                  <div className="p-8 text-center">
                    <button 
                      onClick={() => alert("Forever Yours! ❤️")}
                      className="bg-[#be123c] text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-[#9f1239] transition active:scale-95"
                    >
                      I LOVE YOU!
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 3. ENVELOPE (UI) */}
      <div className="relative z-[70] w-full flex items-center justify-center">
        <motion.div
          className="relative w-[90vw] max-w-[500px] aspect-[5/3.2] cursor-pointer"
          style={{ perspective: "2000px" }}
          onClick={() => status === "idle" && setStatus("asking")}
        >
        {/* --- TOP FLAP (FIXED) --- */}
        <motion.div
          initial={false}
          animate={{ 
            rotateX: status === "accepted" ? 180 : 0,
            zIndex: status === "accepted" ? 20 : 40 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full origin-top"
          style={{ 
            height: "65%", 
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Side (The triangle you see when closed) */}
          <div 
            className="absolute inset-0 bg-white" 
            style={{ 
              backfaceVisibility: "hidden", 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)", // Points DOWN
              boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.05)"
            }} 
          />

          {/* Back Side (The triangle you see when opened) */}
          <div 
            className="absolute inset-0 bg-[#f1949a]" 
            style={{ 
              backfaceVisibility: "hidden", 
              transform: "rotateX(180deg)", 
              /* FIXED: We change the polygon so the tip points UP before the 180-flip, 
                which makes it point DOWN after the flip. */
              clipPath: "polygon(0 100%, 100% 100%, 50% 0)" 
            }} 
          />
        </motion.div>

          {/* Envelope Body Overlay (Front Pocket) */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <div className="absolute inset-0 bg-white" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 65%)" }} />
          </div>

          {/* Envelope Background (Inside Back) */}
          <div className="absolute inset-0 z-10 bg-[#f4a7ae] rounded-b-xl shadow-xl" />

          {/* Wax Seal */}
          {status === "idle" && (
            <motion.div
              exit={{ scale: 0, opacity: 0 }}
              className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#be123c] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#9f1239]">
                <span className="text-white text-xs font-black animate-pulse">OPEN</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}