# Girlfriend Day — Digital Greeting Card

A 4-step animated greeting card built with Vite + React + Tailwind CSS + Framer Motion.

## Setup

```bash
npm install
npm run dev
```

## Flow

1. **LandingEnvelope** — cream screen, click the envelope to open it (two-click flow: 1st click opens it, 2nd click continues).
2. **GreetingHero** — dark mauve hero with the recipient's name and an "I LOVE U" button.
3. **VideoAndLetter** — video player + vintage lace-bordered letter.
4. **PhotoCollage** — scattered polaroid grid, with a "Read it again" button that loops back to step 1.

## Where to drop your own assets

All placeholders live under `public/assets` and `public/videos` and are referenced by absolute path
(e.g. `/assets/photo1.jpg`) so you can just add files with matching names — no code changes needed
unless you rename something.

| File | Used in | Notes |
|---|---|---|
| `public/assets/envelope-body.png` | LandingEnvelope | envelope pocket illustration |
| `public/assets/envelope-flap.png` | LandingEnvelope | flap + wax seal, layered separately so it can rotate open |
| `public/assets/envelope-open.png` | GreetingHero | open envelope behind the polaroids |
| `public/assets/floral-border-left.png` | GreetingHero, VideoAndLetter, PhotoCollage | tall vertical floral illustration |
| `public/assets/floral-border-right.png` | GreetingHero, VideoAndLetter, PhotoCollage | mirrored version of the left border |
| `public/assets/lace-border.png` | VideoAndLetter | vintage lace frame behind the letter text |
| `public/assets/video-poster.jpg` | VideoAndLetter | video thumbnail before playback |
| `public/videos/girlfriend-day.mp4` | VideoAndLetter | your video file |
| `public/assets/polaroid-1.jpg`, `polaroid-2.jpg` | LandingEnvelope, GreetingHero | photos peeking out of the envelope |
| `public/assets/photo1.jpg` – `photo6.jpg` | PhotoCollage | final collage photos |

Each component also has a `// EDIT:` comment right above the placeholder `<div>`/`<img>` telling you
exactly what to swap in.

## Customizing

- Change the recipient's name in `src/App.jsx` (`RECIPIENT_NAME` constant).
- Edit the letter's message directly inside `src/components/VideoAndLetter.jsx`.
- Adjust colors/fonts in `tailwind.config.js` — the palette is centered on `mauve` (#965b79) and `cream` (#fbf6ec).
- Photo rotation/scatter pattern is controlled by the `PHOTOS` array at the top of `PhotoCollage.jsx`.
