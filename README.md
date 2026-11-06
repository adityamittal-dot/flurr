# flurr

Single-page site for flurr, handmade crochet by samiksha garg (@flurr_co). Built with Vite, React, TypeScript, Tailwind v4 and motion.

## Setup

```
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
npm run preview  # serve the built site
```

## Config

Edit `src/config.ts`:

- `INSTAGRAM_HANDLE` drives the profile and DM links.
- `WHATSAPP_NUMBER` (international format, digits only, for example `919876543210`). While it is empty, no WhatsApp option is shown anywhere.

## Swapping photos

Photos live in `public/makes/` as `.webp`. To replace one, overwrite the file with the same name and update `width` and `height` in `src/data/makes.ts` so the layout keeps the right aspect ratio. To add a piece, add the image and a new entry in `makes` with a descriptive `alt`. The rapunzel back photo and the yarn photo are defined at the bottom of the same file.

## Structure

```
src/config.ts        links and WhatsApp number
src/data/makes.ts    the catalogue
src/components/      one file per section
src/index.css        design tokens (light and dark) and Tailwind theme
research.md          competitor scan and positioning notes
```
