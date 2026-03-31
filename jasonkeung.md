# Playa de Pineland — Project Notes

## What This Is

A web app for **Playa de Pineland**, a private beach volleyball coaching business in Fairfax, Virginia. The brand leans hard into a tropical, "beach vacation without leaving Fairfax" vibe — sand tones, ocean blues, sunset oranges, palm trees, the works.

Started as a single `index.html` file, now a full **Next.js 15** app with a marketing site and an authenticated **Player Portal** backed by **Supabase**.

## Technical Architecture

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Supabase (auth + Postgres)

**Layout approach:** Tailwind CSS v4 for inline utilities + retained custom CSS in `globals.css` (~1,050 lines). Responsive at 980px (`lg:`), 720px (`md:`), and 600px (`sm:`) via custom breakpoints. Dark mode uses `dark:` variant mapped to `[data-theme="dark"]`.

**Authentication flow:**
- Supabase Auth handles email/password sign-up and login
- `@supabase/ssr` manages cookies for server-side session handling
- Middleware (`middleware.ts`) refreshes sessions and protects `/portal/*` routes
- OAuth callback at `/auth/callback` exchanges codes for sessions
- Server actions in `app/portal/actions.ts` handle login, signup, logout, and profile updates using React 19's `useActionState`

**Route groups:**
- `app/(marketing)/` — public marketing site (Navbar, Footer, BackToTop)
- `app/portal/` — authenticated player portal (PortalNav, no marketing chrome)
- Root `app/layout.tsx` only has html/body/theme-script/globals.css — no nav/footer

## Codebase Structure

```
app/
  layout.tsx              # Root: html, body, theme script, globals.css
  globals.css             # Tailwind config + retained custom CSS (~1,050 lines)
  (marketing)/
    layout.tsx            # Marketing shell: Navbar + Footer + BackToTop
    page.tsx              # Home page with all sections
    loading.tsx           # Loading screen
    contact/page.tsx      # Standalone contact page
    find-us/page.tsx      # Standalone location page
    faq/page.tsx          # Standalone FAQ page
    rules/page.tsx        # Beach volleyball rules reference
  portal/
    layout.tsx            # Portal shell: auth gate + PortalNav
    page.tsx              # Dashboard: level badge, quick links, account info
    actions.ts            # Server actions: login, signup, logout, updateProfile
    login/page.tsx        # Login page
    signup/page.tsx       # Signup page
    profile/page.tsx      # Profile page: edit name, phone, bio, level
  auth/callback/route.ts  # OAuth callback handler
components/
  Navbar.tsx              # Marketing nav (links to /contact, /find-us, /faq, /rules)
  Footer.tsx, BackToTop.tsx, ThemeToggle.tsx, ScrollReveal.tsx
  Hero.tsx, BeachScene.tsx, Training.tsx, Progression.tsx, ...
  Weather.tsx             # Live weather widget (Open-Meteo API)
  portal/
    AuthForm.tsx          # Login/signup form (shared component)
    PortalNav.tsx         # Portal navigation bar
    ProfileForm.tsx       # Profile edit form
    UserMenu.tsx          # "My Portal" / "Sign In" link in marketing nav
lib/supabase/
  client.ts               # Browser Supabase client
  server.ts               # Server Supabase client (async cookies)
  middleware.ts            # Session refresh + route protection logic
middleware.ts             # Next.js middleware entry point
```

## Technologies Used

| Tech | Why |
|------|-----|
| Next.js 15 (App Router) | Server components, server actions, route groups, middleware |
| React 19 | `useActionState` for form handling with server actions |
| TypeScript | Type safety |
| Supabase | Auth + Postgres + RLS in one service, generous free tier |
| `@supabase/ssr` | Cookie-based session management for SSR |
| Tailwind CSS v4 | Utility-first styling — theme colors, dark mode, breakpoints configured in `globals.css` `@theme` block. Preflight disabled (only theme + utilities imported) to coexist with existing CSS |
| CSS Custom Properties | Theming consistency, dark mode (retained alongside Tailwind theme tokens) |
| CSS Grid/Flexbox | Responsive layouts |
| Calendly (external) | Booking/scheduling integration |
| Open-Meteo API | Free weather data — no API key needed, client-side fetch |

## Database Schema

Supabase Postgres with Row Level Security:

- **`profiles`** table: `id` (FK to auth.users), `full_name`, `display_name`, `phone`, `level` (B/BB/A/AA/Open), `bio`, `created_at`, `updated_at`
- Auto-creates profile on sign-up via trigger
- Auto-updates `updated_at` via trigger
- RLS: users can only read/write their own profile

## Design System

**Colors:**
- **Sand:** `#dde4cc`, `#b0b888` — warm tones
- **Ocean:** `#1e6b48`, `#143d2b` — deep greens for headers/nav
- **Sunset:** `#ff8a5b` — accent/CTA
- **Palm:** `#1a5240` — green accents
- **Level badges:** B=light blue, BB=blue, A=indigo, AA=purple, Open=gold (progression ramp)

**Dark mode:** `[data-theme="dark"]` with localStorage persistence and a blocking script to prevent flash.

**Key patterns:**
- `.card` — glassmorphism cards (rgba background + backdrop-filter)
- `.btn .btn-primary` / `.btn-secondary` — gradient buttons
- `.portal-form-input` — portal-specific form inputs (different from marketing `.form-input` which assumes white-on-dark)
- `.progression-badge--{color}` — level badges reused in portal (5-column grid for B/BB/A/AA/Open)

## Beach Scene (Pure CSS)

The hero illustration is entirely CSS — no images or SVGs:
- **Sky elements:** Sun with glow animation, 5 drifting clouds at varying speeds/opacities
- **Ocean:** Gradient background with 3 animated wave layers
- **Sand:** Gradient with radial highlights and rounded top edges
- **Net:** Two poles with CSS grid mesh between them, anchored to the sand
- **Palm trees:** 7 leaves per tree fanned from -55° to +72° with sway animation
- All animations respect `prefers-reduced-motion` — wrapped in `@media (prefers-reduced-motion: no-preference)`

## Lessons Learned

- **`cookies()` is async in Next.js 15.** Must `await cookies()` before passing to Supabase's `createServerClient`. This is a breaking change from Next.js 14.

- **`redirect()` in server actions throws.** Don't wrap it in try/catch or it'll be silently swallowed. Place it after the try/catch block.

- **Route groups are invisible to URLs.** `app/(marketing)/page.tsx` still serves `/`. Great for giving different layouts to different sections without affecting URLs. But file moves need care — the dev server may need a restart.

- **Marketing and portal forms need different styles.** The marketing `.form-input` class uses white text for dark backgrounds (contact section). The portal needs `.portal-form-input` with `var(--text)` color for card backgrounds. Don't reuse the marketing form class in the portal.

- **Single globals.css works at this scale.** ~1,050 lines after Tailwind migration (down from ~3,100). Contains Tailwind config (`@theme`, `@custom-variant`), CSS variables, base resets, shared classes (`.btn`, `.card`, `.container`), beach scene CSS art, keyframe animations, pseudo-element styles (`li::before` for pricing/progression/rules lists), schedule/progression color variants, announcement styling, form inputs with complex states, and the level picker.

- **Tailwind v4 migration: disable preflight.** The biggest lesson: `@import "tailwindcss"` includes a preflight CSS reset that sets `margin: 0; padding: 0; border: 0 solid` on ALL elements — this completely destroys existing styles. Instead use `@import "tailwindcss/theme"` and `@import "tailwindcss/utilities"` to skip the reset. This lets Tailwind utilities coexist with hand-written CSS.

- **Tailwind v4 uses `@theme` not `tailwind.config.js`.** Config lives directly in CSS. Custom breakpoints set via `--breakpoint-sm/md/lg`. Colors via `--color-*`. No separate config file needed.

- **CSS variable colors in Tailwind need `text-[color:var(--xyz)]`.** Just `text-ocean-dark` doesn't work for CSS variables — you need the full `text-[color:var(--ocean-dark)]` syntax. Same for backgrounds: `bg-[var(--card)]`.

- **`max-*:` variants for mobile-down styles.** Since the original CSS used `max-width` media queries and Tailwind is mobile-first, use `max-sm:`, `max-md:`, `max-lg:` for styles that only apply below breakpoints.

- **Keep pseudo-element styles as CSS.** `::before`, `::after`, `::placeholder`, `:focus` with complex styles, and dynamically-applied color variants (schedule cells, progression badges, announcement badges) are better left as CSS classes. Tailwind's `before:` variants exist but are unwieldy for content-generating pseudos.

- **Engine compatibility with yarn.** Node v23 conflicts with some eslint packages. Use `--ignore-engines` flag with yarn when installing.

- **Pure CSS beach scene still works.** The entire illustration (sun, ocean, sand, net, palm trees, clouds, waves) is pure CSS gradients, transforms, and keyframe animations. Zero images. Adding animated players/volleyball was attempted but looked awkward at this scale — simple scenes read better.

- **Move sections to standalone pages to reduce homepage clutter.** Contact, Location, FAQ, and Rules each got their own route under `app/(marketing)/`. Follow the same pattern: import the component, add metadata, wrap in `<div className="container">`. Update Navbar links from hash anchors (`/#section`) to direct routes (`/section`).

- **CSS `clamp()` for responsive typography needs testing.** `clamp(1.9rem, 3vw, 2.7rem)` caused section headings to wrap on mid-size screens. Lowering the minimum to `1.5rem` fixed it. Always check heading text at various viewport widths.

- **Progression grid must match the number of tiers.** When adding the Open level (5th tier), the CSS grid stayed at `repeat(4, ...)` causing the last item to overflow to a new row. Always update grid column counts when adding items.
