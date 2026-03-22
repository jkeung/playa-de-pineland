# Playa de Pineland — Project Notes

## What This Is

A landing page for **Playa de Pineland**, a private beach volleyball coaching business in Fairfax, Virginia. The brand leans hard into a tropical, "beach vacation without leaving Fairfax" vibe — sand tones, ocean blues, sunset oranges, palm trees, the works.

The entire site is a single `index.html` file. No frameworks, no build tools, no JavaScript frameworks. Just HTML, CSS, and one line of JS for the copyright year.

## Technical Architecture

**Stack:** Pure HTML5 + CSS3, deployed as a static site.

**Why a single file?** For a simple landing page, this is actually the optimal choice:
- One HTTP request = instant load
- Zero dependencies = nothing to break or update
- Deployable anywhere (GitHub Pages, Netlify, S3, literally any web server)
- No build step, no CI/CD complexity

**Layout approach:** CSS Grid + Flexbox. Responsive with breakpoints at 980px (tablet) and 720px (mobile).

## Codebase Structure

It's one file — `index.html` (771 lines) — but it's well-organized:

1. **CSS variables** (lines ~1-30 in `<style>`) — color palette, spacing
2. **Base styles** — typography, resets
3. **Component styles** — nav, hero, cards, sections, footer
4. **Media queries** — responsive overrides at bottom of CSS
5. **HTML sections** — nav → hero → training → experience → CTA → footer
6. **Script** — one line for copyright year

## Design System

The color palette is cohesive and memorable:
- **Sand:** `#f5e3b3`, `#e6c983` — warm background tones
- **Ocean:** `#0f5c73`, `#083948` — deep blues for headers/nav
- **Sunset:** `#ff8a5b` — accent/CTA color
- **Palm:** `#1f5f4a` — green accents
- **Base:** `#fffdf8` — warm white

Key CSS techniques:
- **Glassmorphism** — `rgba` backgrounds + `backdrop-filter: blur()`
- **Fluid typography** — `clamp(3rem, 6vw, 5.4rem)` for responsive headings
- **Pure CSS illustrations** — the entire beach scene (sun, ocean, sand, net, palm trees) is built with CSS gradients, clip-paths, and transforms. No images.

## Technologies Used

| Tech | Why |
|------|-----|
| Vanilla HTML/CSS | Simplicity, performance, zero maintenance |
| CSS Custom Properties | Theming consistency |
| CSS Grid/Flexbox | Modern responsive layouts |
| Calendly (external) | Booking/scheduling integration |
| Gmail | Business contact (`playadepineland@gmail.com`) |

## Lessons Learned

- **You don't always need a framework.** For a landing page, vanilla HTML/CSS is faster to build, faster to load, and easier to maintain than React/Next.js/etc. The instinct to `npx create-next-app` for everything is worth resisting.

- **CSS can do more than you think.** The entire beach scene — sunset, ocean waves, sand texture, volleyball net, palm trees — is pure CSS. No SVGs, no images, no canvas. This means zero asset loading and the scene scales perfectly on any screen.

- **Single-file has a shelf life.** At 771 lines it's manageable, but if the site grows (multiple pages, interactive features, a blog), splitting into separate files or adopting a static site generator would be the next step.

- **Don't forget the SEO basics.** Missing `<meta description>` and favicon are easy wins that are easy to overlook when you're focused on visual design.