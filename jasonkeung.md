# Playa de Pineland — Project Notes

## What This Is

A web app for **Playa de Pineland**, a private beach volleyball coaching business in Fairfax, Virginia. The brand leans hard into a tropical, "beach vacation without leaving Fairfax" vibe — sand tones, ocean blues, sunset oranges, palm trees, the works.

Started as a single `index.html` file, now a full **Next.js 15** app with a marketing site and an authenticated **Player Portal** backed by **Supabase**.

## Technical Architecture

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Supabase (auth + Postgres)

**Layout approach:** CSS Grid + Flexbox. Responsive at 980px (tablet) and 720px (mobile). All styles in a single `globals.css` — no CSS modules or Tailwind.

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
  globals.css             # All styles (~2100 lines)
  (marketing)/
    layout.tsx            # Marketing shell: Navbar + Footer + BackToTop
    page.tsx              # Home page with all sections
    loading.tsx           # Loading screen
  portal/
    layout.tsx            # Portal shell: auth gate + PortalNav
    page.tsx              # Dashboard: level badge, quick links, account info
    actions.ts            # Server actions: login, signup, logout, updateProfile
    login/page.tsx        # Login page
    signup/page.tsx       # Signup page
    profile/page.tsx      # Profile page: edit name, phone, bio, level
  auth/callback/route.ts  # OAuth callback handler
components/
  Navbar.tsx              # Marketing nav (includes UserMenu for auth state)
  Footer.tsx, BackToTop.tsx, ThemeToggle.tsx, ScrollReveal.tsx
  Hero.tsx, BeachScene.tsx, Training.tsx, Progression.tsx, ...
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
| CSS Custom Properties | Theming consistency, dark mode |
| CSS Grid/Flexbox | Responsive layouts |
| Calendly (external) | Booking/scheduling integration |

## Database Schema

Supabase Postgres with Row Level Security:

- **`profiles`** table: `id` (FK to auth.users), `full_name`, `display_name`, `phone`, `level` (B/BB/A/AA), `bio`, `created_at`, `updated_at`
- Auto-creates profile on sign-up via trigger
- Auto-updates `updated_at` via trigger
- RLS: users can only read/write their own profile

## Design System

**Colors:**
- **Sand:** `#dde4cc`, `#b0b888` — warm tones
- **Ocean:** `#1e6b48`, `#143d2b` — deep greens for headers/nav
- **Sunset:** `#ff8a5b` — accent/CTA
- **Palm:** `#1a5240` — green accents
- **Level badges:** B=sand, BB=palm, A=ocean, AA=sunset

**Dark mode:** `[data-theme="dark"]` with localStorage persistence and a blocking script to prevent flash.

**Key patterns:**
- `.card` — glassmorphism cards (rgba background + backdrop-filter)
- `.btn .btn-primary` / `.btn-secondary` — gradient buttons
- `.portal-form-input` — portal-specific form inputs (different from marketing `.form-input` which assumes white-on-dark)
- `.progression-badge--{color}` — level badges reused in portal

## Lessons Learned

- **`cookies()` is async in Next.js 15.** Must `await cookies()` before passing to Supabase's `createServerClient`. This is a breaking change from Next.js 14.

- **`redirect()` in server actions throws.** Don't wrap it in try/catch or it'll be silently swallowed. Place it after the try/catch block.

- **Route groups are invisible to URLs.** `app/(marketing)/page.tsx` still serves `/`. Great for giving different layouts to different sections without affecting URLs. But file moves need care — the dev server may need a restart.

- **Marketing and portal forms need different styles.** The marketing `.form-input` class uses white text for dark backgrounds (contact section). The portal needs `.portal-form-input` with `var(--text)` color for card backgrounds. Don't reuse the marketing form class in the portal.

- **Single globals.css works at this scale.** ~2100 lines, well-organized with section comments. No need for CSS modules yet, but if the portal grows significantly, consider splitting.

- **Engine compatibility with yarn.** Node v23 conflicts with some eslint packages. Use `--ignore-engines` flag with yarn when installing.

- **Pure CSS beach scene still works.** The entire illustration (sun, ocean, sand, net, palm trees) is pure CSS gradients and transforms. Zero images.
