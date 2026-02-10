"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- PHOTO EXPLOSION & FLOAT COMPONENT ---------------- */
const PhotoExplosion = ({ isOpen }: { isOpen: boolean }) => {
  // 9 Total slots for memories
  const photos = [
    "assets/testimage.jpg",
    "https://picsum.photos/seed/love2/300/300",
    "https://picsum.photos/seed/love3/300/300",
    "https://picsum.photos/seed/love4/300/300",
    "https://picsum.photos/seed/love5/300/300",
    "https://picsum.photos/seed/love6/300/300",
    "https://picsum.photos/seed/love7/300/300", // Added 1
    "https://picsum.photos/seed/love8/300/300", // Added 2
    "https://picsum.photos/seed/love9/300/300", // Added 3
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-[80] flex items-center justify-center">
          {photos.map((src, i) => {
            const angle = (i / photos.length) * Math.PI * 2;
            // Increased distance to ensure they float in the "surroundings" and not behind the text
            const distance = 320 + Math.random() * 80; 
            const xDest = Math.cos(angle) * distance;
            const yDest = Math.sin(angle) * distance;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{
                  scale: 1,
                  x: [xDest, xDest + 15, xDest - 15, xDest], // Floating loop
                  y: [yDest, yDest - 20, yDest + 20, yDest], // Floating loop
                  rotate: [Math.random() * 20, -Math.random() * 20, Math.random() * 10],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  // The explosion (first movement)
                  x: { type: "spring", damping: 20, stiffness: 70, delay: 0.6 + i * 0.05 },
                  y: { type: "spring", damping: 20, stiffness: 70, delay: 0.6 + i * 0.05 },
                  scale: { delay: 0.6 + i * 0.05 },
                  // The slow floating (infinite loop)
                  rotate: { repeat: Infinity, duration: 5 + Math.random() * 5, ease: "easeInOut" },
                  x: { repeat: Infinity, duration: 6 + Math.random() * 4, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 7 + Math.random() * 3, ease: "easeInOut" },
                }}
                className="absolute w-28 h-28 md:w-40 md:h-40 p-1.5 bg-white shadow-xl border border-rose-100 rounded-sm"
              >
                <div className="w-full h-full overflow-hidden rounded-xs border border-gray-100">
                  <img src={src} alt="memory" className="w-full h-full object-cover" />
                </div>
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
      {Array.from({ length: 45 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
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

export default function ValentineFinal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfurled, setIsUnfurled] = useState(false);
  const tipDepth = "65%";

  const handleClose = () => {
    setIsUnfurled(false);
    setIsOpen(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(circle,_#ffffff_0%,_#fff0f3_100%)]">
      <BackgroundDecor />
      
      {/* PHOTOS LAYER (Behind Letter, in front of Envelope) */}
      <PhotoExplosion isOpen={isOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-rose-950/30 backdrop-blur-md cursor-zoom-out"
          />
        )}
      </AnimatePresence>

      <div className="relative z-[70] w-full flex items-center justify-center">
        <motion.div
          className="relative w-[90vw] max-w-[500px] aspect-[5/3.2] cursor-pointer"
          style={{ perspective: "2000px" }}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* TOP FLAP */}
          <motion.div
            animate={{ rotateX: isOpen ? 180 : 0, y: isOpen ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.45, 0.05, 0.55, 0.95] }}
            className="absolute top-0 left-0 w-full origin-top z-40"
            style={{ height: tipDepth, transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-white shadow-sm" style={{ backfaceVisibility: "hidden", clipPath: "polygon(0 0, 100% 0, 50% 100%)", backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
            <div className="absolute inset-0 bg-[#f1949a]" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg) rotateZ(180deg)", clipPath: "polygon(0 0, 100% 0, 50% 100%)", backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')", backgroundSize: "15px" }} />
          </motion.div>

          {/* THE LETTER (Top Layer) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-20%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", top: "50%", left: "50%" }}
                exit={{ opacity: 0, scale: 0.5, y: 100 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => setIsUnfurled(true)}
                className="fixed z-[100] w-[95vw] max-w-[420px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#faf9f6] shadow-[0_50px_100px_-12px_rgba(0,0,0,0.5)] border border-rose-100 rounded-lg overflow-hidden">
                  <div className="p-8 pb-4 text-center">
                    <h2 className="text-[#be123c] font-serif text-3xl md:text-5xl italic">My Dearest,</h2>
                    <p className="text-[10px] text-gray-400 tracking-widest uppercase">Valentine's Day 2026</p>
                  </div>
                  <motion.div animate={{ height: isUnfurled ? "auto" : 0 }} className="overflow-hidden px-8 py-4 border-y border-rose-100">
                    <div className="py-6 text-center space-y-6">
                      <p className="text-gray-700 italic text-xl md:text-2xl leading-relaxed font-medium">
                        "You make every single day feel as special as Valentine's Day. I'm so lucky to have you!"
                      </p>
                      <div className="text-5xl md:text-6xl animate-bounce">🧸❤️🌸</div>
                    </div>
                  </motion.div>
                  <div className="p-8 text-center">
                    <button onClick={() => alert("❤️")} className="bg-[#be123c] text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl active:scale-95 hover:bg-[#9f1239] transition">
                      YES!
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ENVELOPE BODY */}
          <div className="absolute inset-0 z-30 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 bg-white shadow-inner" style={{ clipPath: `polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% ${tipDepth})`, backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
          </div>
          <div className="absolute inset-0 z-10 bg-[#f4a7ae] rounded-b-xl shadow-xl" />

          {/* WAX SEAL */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute left-1/2 z-50 origin-center"
                style={{ top: tipDepth }}
                animate={{ x: "-50%", y: "-50%" }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#be123c] rounded-full shadow-2xl flex items-center justify-center border-4 md:border-8 border-[#9f1239]">
                  <span className="text-white text-[10px] md:text-xs font-black tracking-widest animate-pulse">OPEN</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}