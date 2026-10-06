import { useState } from 'react'
import { motion } from 'framer-motion'

// -----------------------------------------------------------------------
// LandingEnvelope.jsx  (Reference: Image 1 / Image 5 "open me!" envelope)
//
// Minimal cream landing screen. Clicking the envelope:
//   1st click -> plays the "opening" animation (flap opens, two polaroids
//                slide up out of the envelope)
//   2nd click (or auto-advance after a delay) -> calls onContinue() which
//                moves the app to step 2 (GreetingHero)
//
// ASSET SLOTS (drop your own files into /public/assets):
//   /assets/envelope-body.png  - the envelope body/pocket illustration
//   /assets/envelope-flap.png  - the triangular flap + wax seal, layered
//                                 on top so it can rotate open independently
//   /assets/polaroid-1.jpg     - first photo peeking out of the envelope
//   /assets/polaroid-2.jpg     - second photo peeking out of the envelope
// -----------------------------------------------------------------------

export default function LandingEnvelope({ onContinue }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      onContinue()
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cream px-6">
      {/* "open me!" handwritten label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 -rotate-3 font-hand text-3xl text-mauve-dark sm:text-4xl"
      >
        open me!
      </motion.p>

      {/* Envelope, clickable */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={isOpen ? 'Continue to your card' : 'Open the envelope'}
        className="relative h-56 w-72 cursor-pointer select-none sm:h-64 sm:w-80"
      >
        {/* Two polaroids that slide out from behind the flap.
            Replace the placeholder <div>s below with your own <img> tags
            once you have real photos, e.g.:
            <img src="/assets/polaroid-1.jpg" className="h-full w-full object-cover" /> */}
        <motion.div
          className="absolute left-6 top-0 h-32 w-24 -rotate-6 rounded-sm border-4 border-white bg-blush shadow-polaroid sm:h-36 sm:w-28"
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: -60, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* EDIT: swap for <img src="/assets/polaroid-1.jpg" .../> */}
        </motion.div>

        <motion.div
          className="absolute right-6 top-0 h-32 w-24 rotate-6 rounded-sm border-4 border-white bg-blush shadow-polaroid sm:h-36 sm:w-28"
          initial={{ y: 20, opacity: 0 }}
          animate={isOpen ? { y: -50, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {/* EDIT: swap for <img src="/assets/polaroid-2.jpg" .../> */}
        </motion.div>

        {/* Envelope body/pocket */}
        <div className="absolute inset-0 flex items-end justify-center">
          {/* EDIT: replace with <img src="/assets/envelope-body.png" className="h-full w-full object-contain" /> */}
          <div className="h-40 w-72 rounded-md bg-blush/80 shadow-lg sm:h-44 sm:w-80" />
        </div>

        {/* Envelope flap + wax seal, rotates open on click */}
        <motion.div
          className="absolute left-0 top-0 h-32 w-72 origin-top sm:w-80"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* EDIT: replace with <img src="/assets/envelope-flap.png" className="h-full w-full object-contain" /> */}
          <div className="h-full w-full [clip-path:polygon(0_0,100%_0,50%_75%)] bg-mauve" />
          {/* Wax seal */}
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mauve-dark shadow-md" />
        </motion.div>
      </button>

      {isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 font-hand text-xl text-mauve-dark"
        >
          tap again to continue
        </motion.p>
      )}
    </div>
  )
}
