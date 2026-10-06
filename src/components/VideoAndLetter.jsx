import { motion } from 'framer-motion'

// -----------------------------------------------------------------------
// VideoAndLetter.jsx  (Reference: Image 2 / Image 3)
//
// Dark mauve background with floral borders. Contains:
//   1. A responsive HTML5 <video> player up top.
//   2. A vintage-styled letter below, with a lace border image and a
//      cream paper background, holding the heartfelt message.
// A small "continue" button/arrow at the bottom advances to step 4
// (PhotoCollage).
//
// ASSET SLOTS:
//   /assets/floral-border-left.png   - vertical floral illustration, left edge
//   /assets/floral-border-right.png  - vertical floral illustration, right edge
//   /videos/girlfriend-day.mp4       - your video file (EDIT the <source> src)
//   /assets/video-poster.jpg         - poster/thumbnail shown before playback
//   /assets/lace-border.png          - the ornate vintage lace frame graphic
// -----------------------------------------------------------------------

export default function VideoAndLetter({ onContinue }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-mauve px-4 py-14 sm:px-8">
      {/* Floral borders */}
      <img
        src="/assets/floral-border-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-12 object-cover object-left opacity-90 sm:w-24 md:w-32"
      />
      <img
        src="/assets/floral-border-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-12 object-cover object-right opacity-90 sm:w-24 md:w-32"
      />

      {/* "I LOVE U" pill label, matches the visual rhythm of step 2 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 rounded-full bg-mauve-dark px-8 py-2 font-serif text-sm uppercase tracking-widest text-cream shadow-md"
      >
        I love u
      </motion.div>

      {/* ---------------- Video player ---------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-lg shadow-2xl"
      >
        {/* EDIT: point src at your own video file in /public/videos/ */}
        <video
          className="aspect-[9/16] w-full bg-black object-cover"
          controls
          playsInline
          poster="/assets/video-poster.jpg"
        >
          <source src="/videos/girlfriend-day.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* ---------------- The letter ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-10 w-full max-w-md"
      >
        <div className="relative rounded-md p-3">
          {/* Lace border frame, sits behind the cream paper.
              EDIT: replace with your own transparent lace PNG */}
          <img
            src="/assets/lace-border.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-fill opacity-95"
          />

          <div className="relative z-10 mx-auto max-w-sm bg-cream/95 px-6 py-10 text-center shadow-inner sm:px-10">
            <p className="font-letter text-lg text-mauve-dark sm:text-xl">
              To my favorite person,
            </p>

            <p className="mt-6 font-letter text-base leading-relaxed text-mauve-dark sm:text-lg">
              {/* EDIT: personalize this message however you like */}
              Happy Girlfriend Day! Thank you for bringing so much
              happiness, comfort, and laughter into my life. Being with you
              is one of my favorite things, and I&apos;m grateful for you
              every single day.
            </p>

            <p className="mt-6 font-letter italic text-base text-mauve-dark sm:text-lg">
              I love you, today and always.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Continue to the photo collage */}
      <motion.button
        type="button"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="See our photos"
        className="relative z-10 mt-10 rounded-full bg-mauve-dark px-8 py-3 font-serif text-sm uppercase tracking-widest text-cream shadow-lg"
      >
        See our photos ↓
      </motion.button>
    </div>
  )
}
