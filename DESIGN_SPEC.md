# flurr redesign spec

Single-page brand site for flurr, handmade crochet by samiksha garg (@flurr_co). No cart, no prices: ordering is a conversation.

## Stack
Vite + React + strict TypeScript, Tailwind v4 (`@tailwindcss/vite`), `motion` (import from `motion/react`), `@phosphor-icons/react`, self-hosted `@fontsource-variable/fraunces` (display) and `@fontsource-variable/figtree` (body). No GSAP. Must pass `npm run build` and `tsc --noEmit`. Use relative `base: './'`.

Remove old `index.html`, `main.js`, `styles.css`, `assets/placeholders`, `assets/hero-yarn.svg`, `assets/texture-*`. Move favicons and og-image into `public/`. Keep `research.md`. Rewrite README (setup, config, swapping photos). No Claude/AI attribution anywhere. Do not commit.

## Tokens (CSS variables, Tailwind @theme)
Colours are sampled from the logo. Light: bg `#FAFAF5`, surface `#FFFFFF`, ink `#2C3327`, ink-soft `#596250`, moss (deep sage) `#55624A`, sage `#828C74`, accent mustard `#DCAA4C` (text on it is ink).
Light only: the logo sits on white, so there is no dark theme.
Texture: `public/braid.webp` (the logo braid, unrolled), a faint knit-stitch page background, running-stitch panel edges. Logo files in `public/` come from the owner's logo; do not redraw or recolour them.
Shape rule: interactive = full pill; images/panels = 28px. Tinted shadows only. Fixed pointer-events-none subtle grain is optional.

## Copy rules
Sentence case is fine; lowercase brand name "flurr". ZERO em or en dashes. No emoji. No invented numbers, prices, reviews, follower claims, or delivery times. Max 1 uppercase-tracking eyebrow on the page. No labels on top of images, no scroll cues, no "Step 1". Primary CTA label is always "Order on Instagram".

## Config: `src/config.ts`
`INSTAGRAM_HANDLE='flurr_co'`, `WHATSAPP_NUMBER=''`. Links: profile `https://instagram.com/flurr_co`, DM `https://ig.me/m/flurr_co`. WhatsApp options render only when the number is set, with a prefilled `wa.me` text. Never ship a fake number.

## Data: `src/data/makes.ts` (typed; images in `public/makes/*.webp`, referenced relative)
Real pieces from Instagram. Do not add others:
- gigi: "Gigi the giraffe", plushie, gigi.webp. Yellow chenille giraffe with cocoa spots and a cream muzzle.
- rapunzel: "Rapunzel", plushie, rapunzel.webp. Doll with long yellow braids, tiny flowers, pink bodice and a purple skirt.
- uni: "Uni the unicorn", plushie, uni.webp. Cream unicorn with curly blue mane, mint hooves and an orange horn.
- tortoise: "Your tiny bestie", plushie, tortoise.webp. Palm-sized green tortoise with a yellow-stitched shell.
- sunny: "Sunny the bouquet", flowers, sunny.webp. Two sunflowers with lilac and blue tulips, wrapped in black with a yellow ribbon.
- keychain: "Sunflower keychain", accessories, keychain.webp. Single sunflower and leaf on a keyring.
- bloom: "Bloom the clips", accessories, bloom.webp. Hair clips topped with flowers, hearts and stars.
Alt text must describe each photo. Store intrinsic aspect via CSS `aspect-ratio` to prevent CLS (all portrait).

## Sections, in order; each a different layout
Anchor ids: `makes`, `ordering`, `custom`, `about`.
1. **Nav**: sticky floating pill, single line: flurr wordmark, the makes, ordering, custom, about, primary CTA. Under 768px show wordmark + CTA + menu button opening a full panel. Height under 72px.
2. **Hero** (asymmetric split, min-h 100dvh, fits a 1366x700 viewport): left H1 "Made with love, one stitch at a time." using display 800 weight; subtext "Handmade crochet plushies and flowers by samiksha garg. Tell us what you love and we'll make it." CTAs: "Order on Instagram" and "See the makes". Right: overlapping tilted collage of gigi (large), sunny and tortoise; spring entrance, slight parallax with `useScroll`, and gentle pointer tilt via motion values only. Mobile: text first, then collage with no overflow.
3. **Marquee** (only one on page): sunflower accent band, slightly rotated, repeating piece names in big display, with a Phosphor `FlowerLotus` between. CSS animation; pauses on reduced motion; clip to avoid horizontal page scroll.
4. **The makes** (`#makes`): H2 "Meet the makes", pill filter All / Plushies / Flowers / Accessories with sliding `layoutId` indicator. Asymmetric masonry using CSS columns or a grid with mixed spans; items animate with `AnimatePresence`+`layout`. Each tile is a real `<button>`: photo, then name below. Hover: photo scales 1.03. Click: shared-element morph (`layoutId`) to a dialog with large photo, name, description, "Order on Instagram" (plus WhatsApp if set). Dialog: Esc, backdrop click, focus trap and focus return, `role="dialog"`, scroll lock.
5. **Turn her around** (signature moment): tall section with a sticky stage; scroll progress drives `rotateY` flip of a card, front rapunzel.webp and back rapunzel-back.webp, with `backface-visibility`. Beside it H2 "Every side gets the same attention." and one line "The back of every piece is stitched as carefully as the front." Reduced motion or mobile fallback: both photos side by side, no pin.
6. **Ordering** (`#ordering`): H2 "How ordering works". A single stitched dashed yarn SVG path that draws with scroll (`useScroll` to `pathLength`; mask a dashed line so the stitches stay dashed) wandering across three staggered offset blocks: "Say hello" (DM us the piece or colours you have in mind), "We hook it" (it is crocheted by hand after you ask), "It comes home" (wrapped with its little flurr tag and sent your way). Mobile: vertical path at left, no horizontal overflow.
7. **Custom** (`#custom`): moss panel with 28px radius. H2 "Want something that doesn't exist yet?" Interactive message builder, real state: choose a type (Plushie, Flowers, Accessory) as pills; pick up to 3 yarn colours as round swatches with visible name, `aria-pressed` (Sunflower #F6B916, Lilac #B79AD9, Rose #E8789A, Mint #8FD6C2, Cobalt #2C4FB5, Leaf #2E8B3D, Cocoa #6B4226, Cream #F5EEDC; picked swatches pop with a spring and a Check icon); optional labelled textarea "Who is it for?". Live preview of the message text. Button "Copy message and open Instagram" copies to clipboard, shows inline "Copied" feedback (fallback note when clipboard fails) and opens the DM link in a new tab. Show WhatsApp button if configured. A preview with nothing picked shows a friendly default.
8. **About + care** (`#about`): yarn.webp in a large rounded photo with H2 "The hands behind flurr". Copy only: "flurr is made by samiksha garg, one stitch at a time." Add `{/* TODO: samiksha's own words */}`. Beside it an accordion "Caring for your piece" using height-safe motion: keep out of constant direct sun; spot clean with a damp cloth and mild soap; hold by the body, not the limbs or stems.
9. **Footer**: giant "flurr" display wordmark clipped to width, @flurr_co link, "Ordering is a conversation on Instagram.", copyright 2026 with computed year.

## Motion and quality
Section reveals via `whileInView` once with ease `[0.16,1,0.3,1]`. Animate transform/opacity only (pathLength excepted). Every animation respects `useReducedMotion`. No `window` scroll listeners; no useState for pointer/scroll values. CTA press `scale(0.97)` and fill feedback. Visible focus rings. Skip link. WCAG AA contrast in both themes. No horizontal overflow from 360px to 1920px. Meta title, description and OG tags from the brand; lazy-load all images but hero; preload gigi.
