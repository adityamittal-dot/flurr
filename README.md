# flurr

A production-quality, responsive static site for **flurr** — a handmade
crochet brand by samiksha garg (amigurumi plushies and crochet flowers,
made to order). Plain HTML/CSS/vanilla JS, no build step, no framework.

```
index.html      – all markup / content
styles.css      – all styling (design tokens at the top of the file)
main.js         – WhatsApp link wiring, image fallback, filter, scroll motion
research.md     – competitor scan + positioning notes (internal, not shipped UI)
assets/         – icons, textures, and placeholder illustrations (see below)
```

Open `index.html` directly in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```

## TODO before launch (read this first)

1. **Set the real WhatsApp number.** Open `main.js` and replace:
   ```js
   const WHATSAPP_NUMBER = "91XXXXXXXXXX";
   ```
   with flurr's real WhatsApp Business number, international format, digits
   only (e.g. `"919876543210"`). Every "order on whatsapp" link on the site
   is generated from this single constant — there is nowhere else to edit.
   Until this is set, the WhatsApp buttons link to a placeholder number and
   will not deliver real messages.

2. **Confirm the Instagram handle.** The site links to
   `https://instagram.com/flurr_co` throughout (header, hero, footer,
   ordering section). Update every occurrence if the handle changes.

3. **Replace Samiksha's bio.** `index.html`, the `#about` section, has
   placeholder copy (an HTML comment above it says so) describing
   samiksha garg and the founding of flurr. It's written to be plausible
   and on-brand but is **not a real biography** — swap it for her own
   words before launch.

4. **Drop in real photography.** Nothing on the site is a stock photo —
   every product/hero/about image is a hand-made SVG illustration
   standing in for a real photo, clearly watermarked "flurr · sample
   image" in the corner. The site is wired so a real photo silently
   replaces the illustration the moment it exists at the right filename
   — no code changes needed. Drop JPGs (or PNGs) at these **exact paths**:

   | Replace this file | With a photo of |
   |---|---|
   | `assets/hero-yarn.jpg` | The hero shot — yarn, hook, or a flat-lay on linen |
   | `assets/gigi-giraffe.jpg` | GIGI the Giraffe |
   | `assets/wren-lamb.jpg` | WREN the Lamb |
   | `assets/marigold-posy.jpg` | The Marigold Posy |
   | `assets/sage-blush-bouquet.jpg` | The Sage & Blush Bouquet |
   | `assets/sunday-daisy-bunch.jpg` | The Sunday Daisy Bunch |
   | `assets/samiksha-at-work.jpg` | Samiksha / the studio, for the About section |

   How it works: each `<img>` points at the `.jpg` path above. If that
   file 404s (because it doesn't exist yet), an `onerror` handler swaps
   the `src` to the matching hand-drawn SVG in `assets/placeholders/`.
   Once you add the real `.jpg`, the fallback never fires and the real
   photo shows automatically. Square (1:1) images, at least 1200×1200px,
   work best — every image slot on the site is a square crop.

5. **Replace the Open Graph / favicon images (optional but recommended).**
   `assets/og-image.png` and `assets/favicon.svg` /
   `assets/apple-touch-icon.png` are generated placeholders (sage band +
   the wordmark). Fine to ship, but swap for real brand artwork when
   available. Source files (`assets/og-image-source.svg`,
   `assets/favicon.svg`) are included if you want to re-export them.

6. **Products have no prices.** This is intentional — flurr has none
   published yet, and the brief was explicit not to invent any. Do not
   add prices without checking with the team first; ordering stays
   DM/WhatsApp-first with no cart.

## What's real vs. placeholder, at a glance

- **Real / confirmed:** brand name, tagline, founder name, GIGI the
  Giraffe's description, sage/linen palette, Instagram handle, "no cart,
  made to order" model.
- **Placeholder, needs replacing:** WhatsApp number, Samiksha's bio
  paragraph, all product/hero/about photography, the four extra named
  pieces (WREN the Lamb, the Marigold Posy, the Sage & Blush Bouquet, the
  Sunday Daisy Bunch — invented to fill out "meet the makes" per the
  brief; keep, rename, or replace with real pieces as the catalogue
  grows), OG image/favicon artwork.

## Design notes

- Fonts: **Italiana** (display/wordmark) + **Mulish** (body), loaded from
  Google Fonts.
- Palette tokens live at the top of `styles.css` (`:root`): sage, linen,
  cream, and a warm yarn-yellow accent pulled from GIGI's chenille.
- The linen background is a real generated texture
  (`assets/texture-linen.svg`, built with SVG `feTurbulence`/`feBlend`),
  tiled under the whole page, plus a second fixed grain layer
  (`assets/texture-grain.svg`) for extra tactility.
- The one authored motion moment: the stitched thread line under "how
  ordering works" draws itself in on scroll (`main.js`,
  `initThreadDrawIn`). Respects `prefers-reduced-motion`.
- Verified responsive at 375px, 390px, 768px, and 1440px widths with no
  horizontal overflow; contrast-checked (WCAG AA) for every text/background
  pairing in the palette.

## Deployment

Static files only — works on GitHub Pages, Netlify, Vercel, Cloudflare
Pages, or any plain web host. No build step, no environment variables
other than the WhatsApp number above.
