import { motion } from 'framer-motion'

// -----------------------------------------------------------------------
// GreetingHero.jsx  (Reference: Image 4)
//
// Dark mauve hero screen with floral border placeholders, the recipient's
// name in a large script font, and an "I LOVE U" CTA that advances to
// step 3 (VideoAndLetter).
//
// ASSET SLOTS:
//   /assets/floral-border-left.png   - vertical floral illustration, left edge
//   /assets/floral-border-right.png  - vertical floral illustration, right edge
//   /assets/envelope-open.png        - open envelope illustration behind the photos
//   /assets/polaroid-1.jpg           - left polaroid peeking out of the envelope
//   /assets/polaroid-2.jpg           - right polaroid peeking out of the envelope
// -----------------------------------------------------------------------

export default function GreetingHero({ name = 'Maloka', onContinue }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-mauve px-6 py-16 text-center">
      {/* Floral border - left. EDIT: replace src with your own PNG */}
      <img
        src="/assets/floral-border-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-16 object-cover object-left opacity-90 sm:w-28 md:w-36"
      />
      {/* Floral border - right. EDIT: replace src with your own PNG */}
      <img
        src="/assets/floral-border-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-16 object-cover object-right opacity-90 sm:w-28 md:w-36"
      />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md font-serif text-sm uppercase tracking-widest text-cream sm:text-base"
      >
        To my favorite hello and my hardest goodbye!
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 my-4 font-script text-7xl text-cream sm:text-8xl"
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 font-serif text-sm uppercase tracking-[0.2em] text-cream sm:text-base"
      >
        Happy Girlfriend Day, love
      </motion.p>

      {/* Open envelope with two polaroids sticking out */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="relative z-10 mt-8 flex h-48 w-64 items-end justify-center sm:h-56 sm:w-72"
      >
        {/* EDIT: replace with <img src="/assets/envelope-open.png" .../> as the base layer */}
        <div className="absolute bottom-0 h-32 w-full rounded-b-xl bg-cream/95 shadow-xl" />

        <div className="relative z-10 mb-6 flex -space-x-4">
          <div className="h-28 w-20 -rotate-6 rounded-sm border-4 border-white bg-blush shadow-polaroid sm:h-32 sm:w-24">
            {/* EDIT: replace with <img src="/assets/polaroid-1.jpg" className="h-full w-full object-cover" /> */}
          </div>
          <div className="h-28 w-20 rotate-6 rounded-sm border-4 border-white bg-blush shadow-polaroid sm:h-32 sm:w-24">
            {/* EDIT: replace with <img src="/assets/polaroid-2.jpg" className="h-full w-full object-cover" /> */}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        type="button"
        onClick={onContinue}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative z-10 mt-10 rounded-full bg-mauve-dark px-10 py-3 font-serif text-sm uppercase tracking-widest text-cream shadow-lg"
      >
        I love u
      </motion.button>
    </div>
  )
}
