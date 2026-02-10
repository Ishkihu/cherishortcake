"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- BACKGROUND DECOR ---------------- */
const BackgroundDecor = () => {
  const items = ["🧸", "❤️", "🌹", "🌸", "💖", "✨"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#f1bfcc]">
      {Array.from({ length: 45 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "-20vh",
            rotate: 720,
            opacity: [0, 0.4, 0.4, 0],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
          }}
          transition={{
            duration: Math.random() * 10 + 3,
            repeat: Infinity,
            ease: "easeIn",
            delay: Math.random() * 10,
          }}
          className="absolute select-none text-2xl md:text-3xl"
        >
          {items[i % items.length]}
        </motion.div>
      ))}
    </div>
  );
};


// ... (BackgroundDecor remains the same)

export default function ValentineFinal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfurled, setIsUnfurled] = useState(false);

  const tipDepth = "65%"; // This is the height of the flap

  const handleClose = () => {
    setIsUnfurled(false);
    setIsOpen(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(circle,_#ffffff_0%,_#fff0f3_100%)]">
      <BackgroundDecor />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-rose-950/20 backdrop-blur-md cursor-zoom-out"
          />
        )}
      </AnimatePresence>

      <div className="relative z-[70] w-full flex items-center justify-center">
        <motion.div
          className="relative w-[90vw] max-w-[500px] aspect-[5/3.2] cursor-pointer"
          style={{ perspective: "2000px" }}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* ---------------- TOP FLAP (FIXED) ---------------- */}
          <motion.div
            animate={{
              rotateX: isOpen ? 180 : 0,
              y: isOpen ? 1 : 0, // Bridges the sub-pixel gap when open
            }}
            transition={{
              duration: 1.2,
              ease: [0.45, 0.05, 0.55, 0.95],
            }}
            className="absolute top-0 left-0 w-full origin-top z-40"
            style={{
              height: tipDepth,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front (Pointing Down when closed) */}
            <div
              className="absolute inset-0 bg-white shadow-sm"
              style={{
                backfaceVisibility: "hidden",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
              }}
            >
              {/* Flap Outer Shadow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
            </div>

            {/* Back (Pointing UP when open) */}
            <div
              className="absolute inset-0 bg-[#f1949a]"
              style={{
                backfaceVisibility: "hidden",
                // Rotate 180 on X to flip over, and 180 on Z to keep triangle pointing "up" relative to the envelope
                transform: "rotateX(180deg) rotateZ(180deg)", 
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')",
                backgroundSize: "15px",
              }}
            >
              {/* Depth shadow for the inside flap */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </motion.div>

          {/* ---------------- LETTER ---------------- */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-20%" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                  top: "50%",
                  left: "50%",
                }}
                exit={{ opacity: 0, scale: 0.5, y: 100 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => setIsUnfurled(true)}
                className="fixed z-[100] w-[95vw] max-w-[420px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* ... (Letter Content remains the same) ... */}
                <div className="bg-[#faf9f6] shadow-2xl border border-black/5 rounded-lg overflow-hidden">
                  <div className="p-8 pb-4 text-center">
                    <h2 className="text-[#be123c] font-serif text-3xl md:text-5xl italic">My Dearest,</h2>
                    <p className="text-[10px] text-gray-400 tracking-widest uppercase">Valentine's Day 2026</p>
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isUnfurled ? "auto" : 0 }}
                    className="overflow-y-auto px-8 py-4 border-y border-rose-100"
                    style={{ maxHeight: "40vh" }}
                  >
                    <div className="py-6 text-center space-y-6">
                      <p className="text-gray-700 italic text-xl md:text-2xl leading-relaxed">
                        "You make every single day feel as special as Valentine's Day. I am so lucky to have you in my life!"
                      </p>
                      <div className="text-5xl md:text-6xl animate-bounce">🧸❤️🌸</div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: isUnfurled ? 1 : 0 }} className="p-8 text-center">
                    <button onClick={() => alert("She said yes! ❤️")} className="bg-[#be123c] text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-[#9f1239] active:scale-95 transition">
                      YES!
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---------------- ENVELOPE BODY ---------------- */}
          <div className="absolute inset-0 z-30 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div
              className="absolute inset-0 bg-white shadow-inner"
              style={{
                clipPath: `polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% ${tipDepth})`,
                backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
              }}
            />
          </div>

          {/* ---------------- BACK ---------------- */}
          <div className="absolute inset-0 z-10 bg-[#f4a7ae] rounded-b-xl shadow-xl" />

          {/* ---------------- WAX SEAL (STABILIZED) ---------------- */}
          {!isOpen && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              initial={{ x: "-50%", y: "-50%" }}
              className="absolute left-1/2 z-50 origin-center"
              style={{
                top: tipDepth,
              }}
              // Force x/y to stay centered regardless of other animations
              animate={{ x: "-50%", y: "-50%" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#be123c] rounded-full shadow-2xl flex items-center justify-center border-4 md:border-8 border-[#9f1239]">
                <span className="text-white text-[10px] md:text-xs font-black tracking-widest animate-pulse">
                  OPEN
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}