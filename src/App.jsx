import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoBookAlbum from './components/PhotoBookAlbum';
import FilmStripVideo from './components/FilmStripVideo';

// ================= 1. CUSTOM VIDEO PLAYER =================
function CustomVideoPlayer({ src, poster }) {
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
    <div className="relative w-full max-w-lg sm:max-w-xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black z-20 flex items-center justify-center border-2 border-[#58323E]/40">
      <video
        ref={videoRef}
        className="w-full max-h-[75vh] object-contain cursor-pointer block"
        poster={poster}
        controls={isPlaying}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer z-20"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#58323E]/90 text-[#f3e3ce] shadow-2xl border-2 border-[#f3e3ce]/40 backdrop-blur-md transition-all group-hover:bg-[#43232E]"
              aria-label="Play Video"
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-current text-[#f3e3ce] drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= 2. MAIN APP COMPONENT =================
export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'album' | 'video2'

  const videoSectionRef = useRef(null);

  const scrollToVideo = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAlbum = () => {
    setCurrentView('album');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToLetter = () => {
    setCurrentView('main');
    setTimeout(() => {
      if (videoSectionRef.current) {
        videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGoToVideo2 = () => {
    setCurrentView('video2');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToAlbum = () => {
    setCurrentView('album');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleRestartAll = () => {
    setCurrentView('main');
    setIsEnvelopeOpened(false);
    setShowMain(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="w-full bg-[#8c657a] text-white min-h-screen">
      
      {/* ================= SECTION 1: THE ENVELOPE ================= */}
      <AnimatePresence>
        {!showMain && (
          <motion.section
            key="envelope-screen"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#8c657a]"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 sm:mb-12 -rotate-6 font-hand text-3xl sm:text-4xl text-[#f3e3ce] relative right-12 sm:right-16 drop-shadow-md z-30"
            >
              open me!
            </motion.p>

            <div 
              className="relative flex items-center justify-center w-full max-w-sm cursor-pointer mt-6"
              onClick={() => setIsEnvelopeOpened(true)}
            >
              <motion.img 
                src="/images/envelope-closed.png"
                alt="Closed Envelope"
                className="relative z-20 w-72 sm:w-80 object-contain drop-shadow-2xl"
                animate={isEnvelopeOpened ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1, rotate: -6 }}
                transition={{ duration: 0.8 }}
                onAnimationComplete={() => {
                  if (isEnvelopeOpened) {
                    setShowMain(true);
                  }
                }}
                whileHover={!isEnvelopeOpened ? { scale: 1.05 } : {}}
                whileTap={!isEnvelopeOpened ? { scale: 0.95 } : {}}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ================= VIEW SWITCHER: MAIN vs ALBUM vs VIDEO 2 ================= */}
      <AnimatePresence mode="wait">
        {showMain && currentView === 'main' && (
          <motion.div
            key="main-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-y-auto"
          >
            {/* ================= SECTION 2: GREETING HERO ================= */}
            <section id="hero-section" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden py-10">
              <div 
                className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
                style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
              ></div>
              <div 
                className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
                style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
              ></div>

              <p className="z-10 mt-8 font-serif text-sm uppercase tracking-[0.15em] text-[#f3e3ce] drop-shadow-sm max-w-xs sm:max-w-md">
                To the most beautiful girl!
              </p>
              
              <h1 className="z-10 my-2 font-script text-[6.5rem] leading-none text-[#f3e3ce] drop-shadow-md sm:text-[9rem]">
                Maloka
              </h1>
              
              <p className="z-10 font-serif text-sm uppercase tracking-[0.2em] text-[#f3e3ce] drop-shadow-sm">
                Happy birthday, love
              </p>

              <div className="relative z-10 mt-10 h-64 w-[310px] sm:h-80 sm:w-[420px] flex items-end justify-center">
                <div className="absolute bottom-0 h-44 w-full bg-[#dcc6ad] rounded-md shadow-inner sm:h-56"></div>
                
                <div className="absolute bottom-28 left-4 z-10 h-44 w-32 -rotate-12 bg-white p-2 shadow-polaroid sm:bottom-36 sm:left-6 sm:h-56 sm:w-40">
                  <img src="/images/photo2.jpg" className="h-full w-full object-cover" alt="Pic 1" />
                </div>
                <div className="absolute bottom-24 right-4 z-10 h-44 w-32 rotate-12 bg-white p-2 shadow-polaroid sm:bottom-32 sm:right-6 sm:h-56 sm:w-40">
                  <img src="/images/photo1.jpg" className="h-full w-full object-cover" alt="Pic 2" />
                </div>

                <div 
                  className="relative z-20 h-32 w-full bg-[#f3e3ce] shadow-[-2px_-4px_12px_rgba(0,0,0,0.08)] rounded-b-md sm:h-40"
                  style={{ clipPath: 'polygon(0 0, 50% 15%, 100% 0, 100% 100%, 0 100%)' }}
                ></div>
              </div>

              <motion.button
                type="button"
                onClick={scrollToVideo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="z-10 mt-16 mb-8 rounded-full bg-[#58323E] px-14 py-3.5 font-serif text-sm uppercase tracking-[0.3em] text-[#f3e3ce] shadow-xl transition-transform cursor-pointer border border-[#f3e3ce]/20"
              >
                I love u ↓
              </motion.button>
            </section>

            {/* ================= SECTION 3: VIDEO & LETTER ================= */}
            <section ref={videoSectionRef} className="relative flex min-h-screen flex-col items-center justify-start sm:justify-center py-20 px-4 overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
                style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
              ></div>
              <div 
                className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
                style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
              ></div>

              <div className="z-10 w-full px-2 max-w-4xl">
                <CustomVideoPlayer 
                  src="/images/video.mp4" 
                  poster="/images/poster.jpg"
                />
              </div>

              {/* Lace Paper Letter */}
              <div 
                className="z-10 mt-16 sm:mt-24 relative w-[95%] sm:w-[85%] max-w-[700px] mx-auto drop-shadow-2xl flex flex-col items-center justify-center text-center"
                style={{
                  backgroundImage: "url('/images/lace paper.png')",
                  backgroundSize: '150% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height:'800px'
                }}
              >
                <div className="w-full pt-[24%] pb-[28%] px-[18%] sm:pt-[22%] sm:pb-[26%] sm:px-[22%]">
                  <p className="font-letter text-[16px] sm:text-2xl lg:text-3xl font-bold text-[#4a362f] mb-3 sm:mb-5">
                    To my favorite person, Maloka
                  </p>
                  <p className="font-letter text-[11.5px] sm:text-[15px] lg:text-[17px] leading-[1.9] sm:leading-[2.2] font-bold text-[#4a362f]">
                    Happy birthday to the most beautiful girl, my beautiful Maloka!
                    Thank you for all the happiness, comfort, and laughter you’ve brought into my life. 
                    Having you by my side is truly one of the most beautiful things in my life, 
                    and I’m grateful for you every single day. For all years, you’ve been my everything,
                    my best friend, and the person I can tell all my secrets to.
                    No one has ever been loved by me the way you are, and no one ever will.
                    I love you so much, habibty.
                    I don't imagine my life without you. You are my sweetheart!
                  </p>
                </div>
              </div>

              {/* ================= DEDICATED INVITATION CARD TO PHOTO ALBUM ================= */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-20 mt-14 max-w-xl w-full mx-auto px-4 text-center"
              >
                <div className="relative rounded-3xl bg-gradient-to-b from-[#58323E]/95 to-[#43232E]/95 p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-2 border-[#f3e3ce]/30 backdrop-blur-md flex flex-col items-center">
                  
                  {/* Floating mini polaroid preview teaser */}
                  <div className="relative h-28 w-48 mb-6 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [-8, -5, -8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -left-2 w-20 h-24 bg-white p-1 rounded shadow-lg -rotate-12"
                    >
                      <img src="/images/p1.jpg" alt="Preview 1" className="w-full h-full object-cover rounded" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [8, 5, 8] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -right-2 w-20 h-24 bg-white p-1 rounded shadow-lg rotate-12 z-10"
                    >
                      <img src="/images/p2.jpg" alt="Preview 2" className="w-full h-full object-cover rounded" />
                    </motion.div>
                    <div className="relative z-20 w-12 h-12 rounded-full bg-[#f3e3ce] text-[#58323E] flex items-center justify-center text-xl shadow-md border border-[#58323E]/30">
                      📖
                    </div>
                  </div>

                  <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#dcc6ad] mb-2 font-semibold">
                    ✨ Surprise for Maloka ✨
                  </span>

                  <h3 className="font-script text-4xl sm:text-5xl text-[#f3e3ce] drop-shadow-md mb-2">
                    Our Memory Album
                  </h3>

                  <p className="font-letter text-sm sm:text-base text-[#f3e3ce]/90 max-w-md leading-relaxed mb-6">
                    I made a special interactive photo book containing all my favorite pictures and moments of you. Flip through the pages to see them!
                  </p>

                  {/* The Big Navigation Button */}
                  <motion.button
                    type="button"
                    onClick={handleOpenAlbum}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative group rounded-full bg-gradient-to-r from-[#f3e3ce] to-[#dcc6ad] px-8 sm:px-12 py-4 font-serif text-sm sm:text-base uppercase tracking-widest text-[#43232E] font-bold shadow-[0_8px_25px_rgba(243,227,206,0.3)] hover:shadow-[0_10px_35px_rgba(243,227,206,0.5)] transition-all flex items-center gap-3 border-2 border-white/50"
                  >
                    <span>📖 Open Photo Album</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Restart Button */}
              <div className="relative z-20 mt-12 pb-8 flex justify-center">
                <motion.button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-[#58323e]/60 hover:bg-[#58323e] px-8 py-2.5 font-serif text-xs uppercase tracking-widest text-[#f3e3ce] shadow-md border border-[#f3e3ce]/20 backdrop-blur-sm transition-colors"
                >
                  ↑ Back to Top
                </motion.button>
              </div>

            </section>
          </motion.div>
        )}

        {/* ================= VIEW 2: PHOTO BOOK ALBUM PAGE ================= */}
        {showMain && currentView === 'album' && (
          <motion.div
            key="album-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <PhotoBookAlbum
              onBackToLetter={handleBackToLetter}
              onRestartAll={handleRestartAll}
              onGoToVideo2={handleGoToVideo2}
            />
          </motion.div>
        )}

        {/* ================= VIEW 3: FILM STRIP VIDEO PAGE (video2) ================= */}
        {showMain && currentView === 'video2' && (
          <motion.div
            key="video2-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <FilmStripVideo
              onBackToAlbum={handleBackToAlbum}
              onBackToHome={handleRestartAll}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}