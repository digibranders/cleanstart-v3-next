# CLAUDE.md — CleanStart Next.js Project

## Project Overview

CleanStart marketing website for a container security/hardening product. Static marketing site — no API routes, no database, no auth, no CMS. All content is hardcoded.

**Stack:** Next.js 16.2.0 (App Router), React 19.2.4, TypeScript strict, Tailwind CSS v4, Motion (Framer Motion v12), Lenis smooth scroll.

**UI Libraries:** Radix UI (Accordion, Dialog, Select, Tabs, Tooltip, Navigation Menu), Lucide React icons, Embla Carousel, CVA, Sonner toasts.

## Directory Structure

```
app/                          # Next.js App Router pages
  layout.tsx                  # Root layout (metadata, fonts, providers)
  page.tsx                    # Home page
  not-found.tsx               # 404 page
  globals.css                 # Tailwind v4 imports + CSS variables
  book-demo/                  # Demo booking
  pricing/                    # Pricing
  partners/                   # Partners
  company/                    # about/, careers/, contact/, team/
  products/                   # hardened-images/, cleansight-dashboard/, software-bill-of-materials/
  solutions/                  # attack-surface-reduction/, fips-compliance/, for-ciso/, for-developers/, software-composition-analysis/, vulnerability-remediation/
  resources/                  # blog/, events/, knowledge-hub/, newsroom/, podcast/, resource-center/

components/
  home/                       # Home page sections (hero, FAQ, stats, testimonials, etc.)
  layout/                     # site-header, site-footer, smooth-scroll-provider, scroll-to-top, page-transition
  shared/                     # Reusable: scroll-reveal, call-to-action-button, page-hero-banner, animated-counter, animated-bird, etc.
  products/                   # Product-specific: flow-diagram, side-panel-animation, isometric-icons, etc.
  visualizations/             # Complex animations: terminal-simulation, security-pipeline-diagram, mascot-sprite-animation, etc.

lib/
  animations.ts               # EASE_OUT_CUBIC easing, scrollRevealProps() factory
  utils.ts                    # cn() helper (clsx + tailwind-merge)
  svg-data/                   # 50+ SVG path components exported from Figma

public/
  home/, blogs/, cleansight/  # Page-specific images
  kubr-bird-frames/           # 133 PNG frames for mascot sprite animation
```

## Page File Pattern

Every route follows the same structure:
- `page.tsx` — Server Component. Exports `metadata`. Renders the content component.
- `[page-name]-content.tsx` — Client Component (`"use client"`). Contains all interactive content.

## Skill-First Development

You have access to 244+ skill files across 8 repositories at `~/skills/`. Before writing code, ALWAYS read the relevant SKILL.md file for the task at hand.

### Skill Lookup — Read These Before Coding

**Next.js:** `~/skills/vercel-next-skills/skills/next-best-practices/SKILL.md` (PRIMARY) + supporting docs in same dir (`rsc-boundaries.md`, `file-conventions.md`, `data-patterns.md`, `metadata.md`, `image.md`, `font.md`, etc.)

**React:** `~/skills/vercel-agent-skills/skills/react-best-practices/SKILL.md` (64 rules), `~/skills/vercel-agent-skills/skills/composition-patterns/SKILL.md`

**TypeScript:** `~/skills/wshobson-agents/plugins/javascript-typescript/skills/typescript-advanced-types/SKILL.md`

**UI/UX Pro Max:** `.claude/skills/ui-ux-pro-max/SKILL.md` (PRIMARY for all UI/UX — 50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types across 10 stacks)

**Frontend Design:** `.claude/skills/frontend-design/skills/frontend-design/SKILL.md` (production-grade aesthetic direction, anti-AI-slop patterns)

**Tailwind & Design:** `~/skills/wshobson-agents/plugins/frontend-mobile-development/skills/tailwind-design-system/SKILL.md`, `~/skills/vercel-agent-skills/skills/web-design-guidelines/SKILL.md` (100+ rules), `~/skills/supercent-skills/.agent-skills/responsive-design/SKILL.md`

**Testing:** `~/skills/obra-superpowers/skills/test-driven-development/SKILL.md`, `~/skills/anthropic-skills/skills/webapp-testing/SKILL.md`

**Security:** `~/skills/supercent-skills/.agent-skills/security-best-practices/SKILL.md`

**Accessibility:** `~/skills/supercent-skills/.agent-skills/web-accessibility/SKILL.md`, `~/skills/wshobson-agents/plugins/ui-design/skills/accessibility-compliance/SKILL.md`

**Performance:** `~/skills/supercent-skills/.agent-skills/performance-optimization/SKILL.md`

**Debugging:** `~/skills/obra-superpowers/skills/systematic-debugging/SKILL.md`

**Git:** `~/skills/supercent-skills/.agent-skills/git-workflow/SKILL.md`

**Deployment:** `~/skills/vercel-agent-skills/skills/deploy-to-vercel/SKILL.md`

**Verification:** `~/skills/obra-superpowers/skills/verification-before-completion/SKILL.md`

**Skill Conflict Priority:** Vercel official > Anthropic official > Supercent > WS Hobson > GitHub Copilot

## Architecture Conventions

- **Server Components default.** `"use client"` only for state, effects, browser APIs, event handlers, Motion animations.
- **File-based routing.** `app/` directory. Every page exports `metadata`.
- **`next/image`** for all images. `priority` on above-the-fold. Always `alt`.
- **`next/link`** for all internal navigation.
- **Font loading** via `<link>` preconnect to Google Fonts in root layout (Google Sans 400/500/600/700).
- **No API routes.** Fully static marketing site.
- **No global state management.** Local `useState`/`useRef`/`useEffect` only.
- **No barrel exports.** Import directly from component files.
- **No testing setup yet.** No test runner, no test files.

## Design Tokens & Brand

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Brand Blue | `#056BF1` | Primary buttons, links, accents |
| Bright Cyan | `#06C7F2` | Hover states, secondary accent |
| Cyan Light | `#CDF5FE` | Card backgrounds, light accents |
| Dark Navy | `#0F1924` | Body text, dark sections, footer |
| Near Black | `#181818` | Headings on light backgrounds |
| Light Gray | `#ECEDEF` | Section backgrounds |
| Off White | `#F8FAFC` | Page backgrounds |
| White | `#FFFFFF` | Cards, text on dark |

### Typography
- **Font:** Google Sans (`font-['Google_Sans',sans-serif]`)
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Body:** `text-[14px] md:text-[16px]`
- **Headings:** `text-[40px] md:text-[48px]` (h1), smaller for h2-h6
- **Letter spacing:** `tracking-[-0.02em]` (tight headings), `tracking-[-0.3px]` (nav)

### Spacing & Layout
- **Max width:** `max-w-[1340px] mx-auto`
- **Page padding:** `px-4 md:px-8 lg:px-[50px]`
- **Section spacing:** `py-12 md:py-[80px]`
- **Mobile-first:** default styles = mobile, `md:` / `lg:` for larger screens

## Animation System

### Easing & Timing
```typescript
// lib/animations.ts — USE THIS everywhere
export const EASE_OUT_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function scrollRevealProps(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: EASE_OUT_CUBIC },
  };
}
```

### Animation Conventions
- **Easing:** Always `EASE_OUT_CUBIC` ([0.16, 1, 0.3, 1]) — never custom per-component
- **Scroll trigger:** `whileInView` with `viewport: { once: true, margin: "-60px" }`
- **Durations:** 0.6s (quick), 0.7-0.8s (standard), 1.2s (hero intro)
- **Stagger delays:** `i * 0.08` to `i * 0.1`
- **Properties:** Only `opacity` + `transform` (GPU-accelerated)

### Reusable Animation Components
- `ScrollReveal` — fade + slide (direction: up/down/left/right/none)
- `ScrollRevealStagger` + `ScrollRevealItem` — staggered children
- `ScrollScale` — opacity + scale on scroll

## Key Reusable Components

### `CallToActionButton` (components/shared/call-to-action-button.tsx)
7 variants: `premium`, `light`, `dark`, `mobile-dark`, `ghost-light`, `on-white`, `on-blue`, `on-card`
- **Pill variants** (light/dark/premium): expanding circle animation from arrow
- **No-bg variants** (ghost-light/on-white/on-blue/on-card): arrow rotation on hover
- Always use this for CTAs — never create ad-hoc buttons

### `PageHeroBanner` (components/shared/page-hero-banner.tsx)
Standard hero for inner pages. Gradient backgrounds (blue/cyan/dark), animated title + subtitle + CTA.

### `SplitContentHeader` (components/shared/split-content-header.tsx)
30:70 grid layout — title left, description right. Used across many inner pages.

### `SiteHeader` (components/layout/site-header.tsx)
Sticky nav. Scroll detection (white bg at scroll > 50px). Desktop mega-menu on hover, mobile hamburger with collapsible sections.

### `SiteFooter` (components/layout/site-footer.tsx)
Gradient background blue → dark. Floating mascot (Kubr bird) over CTA card. Column links + badges + social.

## TypeScript Rules

- `strict: true` — no exceptions
- No `any` — use `unknown` + type guards
- Explicit return types on exports
- `interface [ComponentName]Props` — exported, never inline
- Discriminated unions for variants
- `as const satisfies` for static data
- Path alias: `@/*` maps to `./*`

## Naming Rules

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- **BANNED names:** Container, Wrapper, Group, Frame, Box, Item, Element, Block, generic Section, Component1, Handler, Manager, Data, Info
- **REQUIRED:** Domain-descriptive names only

## Code Standards

- One component per file
- No barrel exports
- No dead code or commented-out code
- DRY after 3 duplications
- Import icons individually: `import { ChevronDown } from "lucide-react"`
- Semantic HTML: `nav`, `main`, `section`, `article`, `header`, `footer`
- WCAG AA contrast (4.5:1 text / 3:1 UI)
- Keyboard accessible
- No secrets in client code
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

## Responsive Patterns

```tsx
// Direction change
<div className="flex flex-col md:flex-row">

// Hide/show at breakpoints
<div className="hidden md:block">
<div className="block md:hidden">

// Grid collapse
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Responsive spacing
<div className="px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px]">
```

## SVG Data Pattern

Figma exports live in `lib/svg-data/` as TypeScript constants (SVG path data). Import and render via `<svg>` + `<path>`. File naming: `svg-[hash].ts` with named exports.

## Build & Dev

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

## Completion Checklist

Before finishing any task:
- [ ] TypeScript strict passes (`npm run build` or IDE check)
- [ ] No accessibility violations
- [ ] No security anti-patterns
- [ ] All images have `alt` text
- [ ] Server/Client boundary is correct
- [ ] Animations use `EASE_OUT_CUBIC` and `scrollRevealProps()`
- [ ] Responsive: works on mobile, tablet, desktop
- [ ] Uses existing reusable components (CTA button, scroll reveal, page hero)
- [ ] No banned names in new code
- [ ] Read verification skill: `~/skills/obra-superpowers/skills/verification-before-completion/SKILL.md`
