import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilmStripVideo({ onBackToAlbum, onBackToHome }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#8c657a] text-white flex flex-col justify-between py-6 sm:py-8 px-3 sm:px-6 overflow-x-hidden select-none">
      
      {/* Floral side borders */}
      <div
        className="fixed left-0 top-0 h-full w-16 sm:w-32 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: "url('/images/flowers-left.png')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto',
          backgroundPosition: 'left top',
        }}
      ></div>
      <div
        className="fixed right-0 top-0 h-full w-16 sm:w-32 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: "url('/images/flowers-right.png')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto',
          backgroundPosition: 'right top',
        }}
      ></div>

      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="relative z-30 flex items-center justify-between max-w-4xl mx-auto w-full mb-4 px-2">
        <motion.button
          type="button"
          onClick={onBackToAlbum}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-full bg-[#58323E]/90 text-[#f3e3ce] px-4 py-2 text-xs sm:text-sm font-serif tracking-wide shadow-md border border-[#f3e3ce]/30 backdrop-blur-sm transition-colors hover:bg-[#43232E]"
        >
          <span>←</span>
          <span>Back to Album</span>
        </motion.button>

        <div className="text-center">
          <h2 className="font-script text-3xl sm:text-4xl text-[#f3e3ce] drop-shadow-md">
            Maloka
          </h2>
        </div>

        <motion.button
          type="button"
          onClick={onBackToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-full bg-[#58323E]/90 text-[#f3e3ce] px-4 py-2 text-xs sm:text-sm font-serif tracking-wide shadow-md border border-[#f3e3ce]/30 backdrop-blur-sm transition-colors hover:bg-[#43232E]"
        >
          <span>✉️</span>
          <span>Home</span>
        </motion.button>
      </header>

      {/* ================= MAIN FILM STRIP CONTAINER ================= */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto w-full max-w-4xl mx-auto py-2">
        
        {/* Film Strip Header Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.3em] text-[#f3e3ce]/80">
            🎞️ Special Memory Tape 🎞️
          </p>
        </motion.div>

        {/* ================= REALISTIC VINTAGE FILM STRIP (FULL SIZE) ================= */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', damping: 25 }}
          className="relative w-full max-w-2xl lg:max-w-3xl bg-[#1a1518] p-3 sm:p-5 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] border-4 border-[#58323E]/60 flex flex-col items-center"
        >
          
          {/* TOP SPROCKET HOLES (ثقوب شريط الفيلم العلوية) */}
          <div className="w-full flex items-center justify-between px-2 pb-2.5 border-b border-white/10 mb-2 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-4 sm:w-4 sm:h-5 rounded bg-[#f3e3ce]/20 border border-[#f3e3ce]/30 shadow-inner flex-shrink-0 mx-1"
              ></div>
            ))}
          </div>

          {/* FILM MARKINGS */}
          <div className="w-full flex justify-between items-center px-3 mb-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#f3e3ce]/70 uppercase">
            <span>▶ 35mm MEMORIES</span>
            <span>MALOKA • 06</span>
            <span>KODAK PORTRA 400</span>
          </div>

          {/* FULL SIZE VIDEO CONTAINER (بدون قص وبكامل حجمه الطبيعي) */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-[#58323E]/50 flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full max-h-[72vh] object-contain cursor-pointer block"
              controls={isPlaying}
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              playsInline
            >
              <source src="/images/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                  onClick={togglePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer z-20"
                >
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#58323E]/95 text-[#f3e3ce] shadow-2xl border-2 border-[#f3e3ce]/50 backdrop-blur-md transition-all hover:bg-[#43232E]"
                    aria-label="Play Video"
                  >
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 ml-1.5 fill-current text-[#f3e3ce] drop-shadow-md"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FILM MARKINGS BOTTOM */}
          <div className="w-full flex justify-between items-center px-3 mt-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#f3e3ce]/70 uppercase">
            <span>● REC</span>
            <span>FOR MY SWEETHEART MALOKA</span>
            <span>FULL TAPE</span>
          </div>

          {/* BOTTOM SPROCKET HOLES (ثقوب شريط الفيلم السفلية) */}
          <div className="w-full flex items-center justify-between px-2 pt-2.5 border-t border-white/10 mt-2 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-4 sm:w-4 sm:h-5 rounded bg-[#f3e3ce]/20 border border-[#f3e3ce]/30 shadow-inner flex-shrink-0 mx-1"
              ></div>
            ))}
          </div>

        </motion.div>

        {/* Action Buttons Below Film */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 z-30">
          <motion.button
            type="button"
            onClick={onBackToAlbum}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-[#58323E] px-6 py-3 font-serif text-xs sm:text-sm uppercase tracking-wider text-[#f3e3ce] shadow-xl border border-[#f3e3ce]/20 hover:bg-[#43232E]"
          >
            📖 Back to Photo Album
          </motion.button>

          <motion.button
            type="button"
            onClick={onBackToHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-[#f3e3ce] to-[#dcc6ad] px-6 py-3 font-serif text-xs sm:text-sm uppercase tracking-wider text-[#43232E] font-bold shadow-xl border border-white/40 hover:scale-105 transition-transform"
          >
            ✉️ Replay from Beginning
          </motion.button>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-30 text-center py-2">
        <p className="font-serif text-xs text-[#f3e3ce]/70 tracking-widest uppercase">
          Happy Birthday Maloka ❤️
        </p>
      </footer>

    </div>
  );
}
