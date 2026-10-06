import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= SOUND SYNTHESIZER FOR REALISTIC PAGE FLIP =================
function playPageFlipSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 1.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    // Graceful fallback
  }
}

// ================= 22 PHOTOS ARRAY (p1.jpg to p22.jpg) =================
const ALL_PHOTOS = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  src: `/images/p${i + 1}.jpg`,
}));

// ================= 12 SPREADS (1 Cover + 11 Photo Spreads) =================
const SPREADS = [
  // Spread 0: Cover
  {
    type: 'cover',
  },
  // Spread 1..11: p1 to p22 (2 photos per spread)
  ...Array.from({ length: 11 }, (_, i) => {
    const pLeft = i * 2 + 1; // 1, 3, 5, ... 21
    const pRight = i * 2 + 2; // 2, 4, 6, ... 22
    const isLastSpread = i === 10;
    return {
      type: 'photos',
      left: {
        src: `/images/p${pLeft}.jpg`,
        rotation: (i % 2 === 0 ? -2 : -1.5),
      },
      right: {
        src: `/images/p${pRight}.jpg`,
        rotation: (i % 2 === 0 ? 2 : 1.5),
      },
      pageNumberLeft: pLeft,
      pageNumberRight: pRight,
      spreadIndex: i + 1,
      isLastSpread,
    };
  }),
];

// ================= CLEAN LIGHTBOX MODAL (NO TEXT / FULLSCREEN ZOOM) =================
function PhotoLightbox({ activePhotoIndex, onClose, onPrev, onNext }) {
  if (activePhotoIndex === null || activePhotoIndex < 0 || activePhotoIndex >= ALL_PHOTOS.length) {
    return null;
  }

  const currentPhoto = ALL_PHOTOS[activePhotoIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 select-none"
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-11 h-11 rounded-full bg-[#58323E] text-[#f3e3ce] font-bold text-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-[#f3e3ce]/30 hover:bg-[#43232E]"
          >
            ✕
          </button>
        </div>

        {/* Previous photo button in lightbox */}
        {activePhotoIndex > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous Photo"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#58323E]/90 text-[#f3e3ce] flex items-center justify-center shadow-2xl border border-[#f3e3ce]/30 hover:bg-[#43232E] hover:scale-110 transition-all"
          >
            <svg className="w-6 h-6 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Next photo button in lightbox */}
        {activePhotoIndex < ALL_PHOTOS.length - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next Photo"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#58323E]/90 text-[#f3e3ce] flex items-center justify-center shadow-2xl border border-[#f3e3ce]/30 hover:bg-[#43232E] hover:scale-110 transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Photo Container */}
        <motion.div
          key={currentPhoto.id}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl max-h-[86vh] w-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] border-4 border-[#58323E]/30 flex flex-col items-center justify-center"
        >
          <img
            src={currentPhoto.src}
            alt=""
            className="max-h-[76vh] max-w-full w-auto object-contain rounded-xl shadow-inner"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ================= BOOK PHOTO CARD (CLEAN / NO TEXT) =================
function BookPhotoCard({ photoSrc, rotation = 0, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative cursor-pointer bg-white p-2 sm:p-3 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.18)] border border-amber-900/10 transition-all hover:shadow-2xl flex flex-col items-center justify-center max-w-[270px] sm:max-w-[310px] w-full mx-auto"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Decorative Washi Tape */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 bg-amber-100/80 backdrop-blur-sm shadow-sm -rotate-1 z-10 border-t border-b border-amber-200/50 opacity-90"
        style={{ clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)' }}
      ></div>

      {/* Image Frame */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-stone-100 shadow-inner">
        <img
          src={photoSrc}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-amber-500/5 mix-blend-multiply pointer-events-none"></div>

        {/* Hover zoom icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/95 text-[#43232E] flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ================= MAIN PHOTO BOOK ALBUM COMPONENT =================
export default function PhotoBookAlbum({ onBackToLetter, onRestartAll, onGoToVideo2 }) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Swipe gesture support
  const [touchStartX, setTouchStartX] = useState(null);

  const totalSpreads = SPREADS.length; // 12 spreads (0 to 11)
  const isLastSpread = currentSpread === totalSpreads - 1;

  const goToSpread = useCallback(
    (newIndex) => {
      if (newIndex >= 0 && newIndex < totalSpreads) {
        setDirection(newIndex > currentSpread ? 1 : -1);
        setCurrentSpread(newIndex);
        if (soundEnabled) {
          playPageFlipSound();
        }
      }
    },
    [currentSpread, totalSpreads, soundEnabled]
  );

  const nextSpread = useCallback(() => {
    if (currentSpread < totalSpreads - 1) {
      goToSpread(currentSpread + 1);
    } else if (isLastSpread && onGoToVideo2) {
      onGoToVideo2();
    }
  }, [currentSpread, totalSpreads, goToSpread, isLastSpread, onGoToVideo2]);

  const prevSpread = useCallback(() => {
    if (currentSpread > 0) {
      goToSpread(currentSpread - 1);
    }
  }, [currentSpread, goToSpread]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe Left -> Next
        nextSpread();
      } else {
        // Swipe Right -> Prev
        prevSpread();
      }
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex !== null) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          if (activePhotoIndex < ALL_PHOTOS.length - 1) setActivePhotoIndex((i) => i + 1);
        } else if (e.key === 'ArrowLeft') {
          if (activePhotoIndex > 0) setActivePhotoIndex((i) => i - 1);
        } else if (e.key === 'Escape') {
          setActivePhotoIndex(null);
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSpread();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSpread, prevSpread, activePhotoIndex]);

  const currentData = SPREADS[currentSpread];

  const handleOpenPhoto = (src) => {
    const index = ALL_PHOTOS.findIndex((p) => p.src === src);
    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full bg-[#8c657a] text-white flex flex-col justify-between py-4 sm:py-6 px-2 sm:px-6 overflow-x-hidden select-none"
    >
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
      <header className="relative z-30 flex items-center justify-between max-w-5xl mx-auto w-full mb-2 sm:mb-4 px-2">
        <motion.button
          type="button"
          onClick={onBackToLetter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-full bg-[#58323E]/90 text-[#f3e3ce] px-4 py-2 text-xs sm:text-sm font-serif tracking-wide shadow-md border border-[#f3e3ce]/30 backdrop-blur-sm transition-colors hover:bg-[#43232E]"
        >
          <span>←</span>
          <span>Back</span>
        </motion.button>

        {/* Center Title */}
        <div className="text-center">
          <h2 className="font-script text-3xl sm:text-4xl text-[#f3e3ce] drop-shadow-md">
            Maloka
          </h2>
        </div>

        {/* Sound toggle button */}
        <motion.button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          className="w-9 h-9 rounded-full bg-[#58323E]/90 text-[#f3e3ce] flex items-center justify-center text-sm shadow-md border border-[#f3e3ce]/30 hover:bg-[#43232E]"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </motion.button>
      </header>

      {/* ================= THE BOOK SPREAD ================= */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto w-full max-w-5xl mx-auto py-2">
        
        {/* Left Arrow Button (Flip Left / Previous) */}
        {currentSpread > 0 && (
          <motion.button
            type="button"
            onClick={prevSpread}
            whileHover={{ scale: 1.12, x: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous Page"
            className="absolute left-1 sm:left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#58323E]/95 text-[#f3e3ce] flex items-center justify-center shadow-2xl border-2 border-[#f3e3ce]/40 hover:bg-[#43232E] transition-all"
          >
            <svg className="w-6 h-6 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}

        {/* Right Arrow Button (Flip Right / Next or Go to Video) */}
        <motion.button
          type="button"
          onClick={nextSpread}
          whileHover={{ scale: 1.12, x: 3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isLastSpread ? 'Watch Video' : 'Next Page'}
          className={`absolute right-1 sm:right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all ${
            isLastSpread
              ? 'bg-gradient-to-r from-amber-200 to-amber-100 text-[#43232E] border-white shadow-amber-900/40 animate-pulse'
              : 'bg-[#58323E]/95 text-[#f3e3ce] border-[#f3e3ce]/40 hover:bg-[#43232E]'
          }`}
        >
          {isLastSpread ? (
            <span className="text-lg">🎬</span>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>

        {/* 3D BOOK SPREAD ANIMATION */}
        <div
          className="relative w-full max-w-4xl"
          style={{ perspective: '1600px' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSpread}
              custom={direction}
              initial={{
                opacity: 0,
                rotateY: direction > 0 ? 30 : -30,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotateY: direction > 0 ? -30 : 30,
                scale: 0.95,
              }}
              transition={{
                duration: 0.45,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="relative w-full rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* SPREAD 0: COVER */}
              {currentData.type === 'cover' && (
                <div
                  onClick={nextSpread}
                  className="relative cursor-pointer w-full min-h-[440px] sm:min-h-[520px] bg-gradient-to-br from-[#58323E] via-[#43232E] to-[#2e141e] text-[#f3e3ce] p-6 sm:p-12 rounded-2xl border-4 border-[#dcc6ad]/40 flex flex-col items-center justify-between text-center shadow-2xl overflow-hidden group"
                >
                  {/* Gold Corner Filigrees */}
                  <div className="absolute top-3 left-3 w-16 h-16 border-t-2 border-l-2 border-[#dcc6ad]/60 rounded-tl-lg pointer-events-none"></div>
                  <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-[#dcc6ad]/60 rounded-tr-lg pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-[#dcc6ad]/60 rounded-bl-lg pointer-events-none"></div>
                  <div className="absolute bottom-3 right-3 w-16 h-16 border-b-2 border-r-2 border-[#dcc6ad]/60 rounded-br-lg pointer-events-none"></div>

                  {/* Leather Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-black/40 via-black/15 to-transparent border-r border-[#dcc6ad]/20 pointer-events-none"></div>

                  <div className="z-10 mt-6">
                    <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.3em] text-[#dcc6ad]">
                      ✨ Photo Album ✨
                    </p>
                  </div>

                  <div className="z-10 my-auto flex flex-col items-center">
                    <div className="w-16 h-0.5 bg-[#dcc6ad]/50 mb-4"></div>
                    <h1 className="font-script text-7xl sm:text-9xl text-[#f3e3ce] drop-shadow-lg leading-tight group-hover:scale-105 transition-transform duration-500">
                      Maloka
                    </h1>
                    <div className="w-16 h-0.5 bg-[#dcc6ad]/50 mt-4"></div>
                  </div>

                  {/* Open Button */}
                  <div className="z-10 flex flex-col items-center gap-3 mb-4">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#f3e3ce] text-[#43232E] px-8 py-3 font-serif text-sm uppercase font-bold tracking-widest shadow-xl group-hover:bg-white"
                    >
                      <span>Open Album</span>
                      <span>➔</span>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* SPREAD 1..11: PURE PHOTOS (p1 to p22) */}
              {currentData.type === 'photos' && (
                <div className="relative w-full min-h-[480px] sm:min-h-[540px] bg-[#fbf6ec] rounded-2xl flex flex-col md:flex-row border-4 border-[#58323E]/30 shadow-2xl overflow-hidden">
                  
                  {/* Book Spine Crease in Middle */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-black/10 via-black/25 to-black/10 pointer-events-none z-30 shadow-inner"></div>

                  {/* LEFT PAGE PHOTO */}
                  <div
                    onClick={(e) => {
                      if (e.target === e.currentTarget) prevSpread();
                    }}
                    className="relative flex-1 p-5 sm:p-7 flex flex-col justify-center items-center bg-[#fdfbf7] border-b md:border-b-0 md:border-r border-amber-900/10"
                  >
                    <BookPhotoCard
                      photoSrc={currentData.left.src}
                      rotation={currentData.left.rotation}
                      onClick={() => handleOpenPhoto(currentData.left.src)}
                    />
                    
                    {/* Page number */}
                    <div className="font-letter italic text-xs text-amber-900/50 mt-3">
                      {currentData.pageNumberLeft}
                    </div>
                  </div>

                  {/* RIGHT PAGE PHOTO */}
                  <div
                    onClick={(e) => {
                      if (e.target === e.currentTarget) nextSpread();
                    }}
                    className="relative flex-1 p-5 sm:p-7 flex flex-col justify-center items-center bg-[#faf6ef]"
                  >
                    <BookPhotoCard
                      photoSrc={currentData.right.src}
                      rotation={currentData.right.rotation}
                      onClick={() => handleOpenPhoto(currentData.right.src)}
                    />

                    {/* Page number */}
                    <div className="font-letter italic text-xs text-amber-900/50 mt-3">
                      {currentData.pageNumberRight}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= CALL-TO-ACTION BUTTON AT END OF ALBUM ================= */}
        {isLastSpread && onGoToVideo2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 z-30"
          >
            <motion.button
              type="button"
              onClick={onGoToVideo2}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-[#f3e3ce] via-amber-100 to-[#dcc6ad] px-8 sm:px-12 py-3.5 font-serif text-xs sm:text-sm uppercase tracking-widest text-[#43232E] font-bold shadow-[0_8px_30px_rgba(243,227,206,0.5)] border-2 border-white flex items-center gap-3 hover:shadow-2xl transition-all"
            >
              <span>🎬 Watch Video Tape</span>
              <span>➔</span>
            </motion.button>
          </motion.div>
        )}

      </main>

      {/* ================= BOTTOM PAGINATION & DIRECT JUMP ================= */}
      <footer className="relative z-30 max-w-lg mx-auto w-full mt-2 sm:mt-3 flex flex-col items-center gap-2">
        
        {/* Mobile Left / Right Buttons */}
        <div className="flex sm:hidden items-center justify-between w-full px-3">
          <button
            type="button"
            onClick={prevSpread}
            disabled={currentSpread === 0}
            className={`px-5 py-2 rounded-full font-serif text-xs tracking-wider uppercase bg-[#58323E] text-[#f3e3ce] shadow-md ${
              currentSpread === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#43232E]'
            }`}
          >
            ← Prev
          </button>

          <span className="font-serif text-xs text-[#f3e3ce] font-bold">
            {currentSpread === 0 ? 'Cover' : `${currentData.pageNumberLeft}-${currentData.pageNumberRight} / 22`}
          </span>

          <button
            type="button"
            onClick={nextSpread}
            className={`px-5 py-2 rounded-full font-serif text-xs tracking-wider uppercase shadow-md transition-all ${
              isLastSpread
                ? 'bg-gradient-to-r from-amber-200 to-amber-100 text-[#43232E] font-bold animate-pulse'
                : 'bg-[#58323E] text-[#f3e3ce] hover:bg-[#43232E]'
            }`}
          >
            {isLastSpread ? 'Video 🎬 ➔' : 'Next →'}
          </button>
        </div>

        {/* Thumbnail Dots Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#58323E]/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-[#f3e3ce]/20 shadow-lg max-w-full overflow-x-auto">
          {SPREADS.map((spread, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSpread(idx)}
              aria-label={`Spread ${idx}`}
              className={`transition-all duration-300 rounded-full flex-shrink-0 ${
                currentSpread === idx
                  ? 'w-6 sm:w-7 h-2 sm:h-2.5 bg-[#f3e3ce]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#f3e3ce]/40 hover:bg-[#f3e3ce]/70'
              }`}
            />
          ))}
        </div>

        <p className="font-sans text-[11px] text-[#f3e3ce]/70 tracking-wide text-center">
          {isLastSpread
            ? 'End of Album • Tap button above to watch video tape 🎬'
            : 'Tap any photo to zoom • Flip pages with arrows or swipe 📖'}
        </p>
      </footer>

      {/* Clean Fullscreen Photo Lightbox */}
      <PhotoLightbox
        activePhotoIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onPrev={() => {
          if (activePhotoIndex > 0) setActivePhotoIndex((i) => i - 1);
        }}
        onNext={() => {
          if (activePhotoIndex < ALL_PHOTOS.length - 1) setActivePhotoIndex((i) => i + 1);
        }}
      />
    </div>
  );
}
