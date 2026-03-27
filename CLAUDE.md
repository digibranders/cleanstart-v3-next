# CLAUDE.md — CleanStart Next.js Project

## Project Overview
CleanStart marketing website. Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4. Container security/hardening product.

## Skill-First Development

You have access to 244+ skill files across 8 repositories at `~/skills/`. Before writing code, ALWAYS read the relevant SKILL.md file for the task at hand.

### Skill Lookup — Read These Before Coding

**Next.js (pages, routes, RSC, layouts):**
- `~/skills/vercel-next-skills/skills/next-best-practices/SKILL.md` ← PRIMARY
- Supporting docs in same directory: `rsc-boundaries.md`, `file-conventions.md`, `data-patterns.md`, `async-patterns.md`, `route-handlers.md`, `error-handling.md`, `metadata.md`, `image.md`, `font.md`, `bundling.md`, `suspense-boundaries.md`, `parallel-routes.md`, `hydration-error.md`, `debug-tricks.md`
- `~/skills/wshobson-agents/plugins/frontend-mobile-development/skills/nextjs-app-router-patterns/SKILL.md`

**React (components, hooks, state, perf):**
- `~/skills/vercel-agent-skills/skills/react-best-practices/SKILL.md` ← 64 rules
- `~/skills/vercel-agent-skills/skills/composition-patterns/SKILL.md`
- `~/skills/supercent-skills/.agent-skills/state-management/SKILL.md`

**TypeScript:**
- `~/skills/wshobson-agents/plugins/javascript-typescript/skills/typescript-advanced-types/SKILL.md`

**Tailwind CSS & Design:**
- `~/skills/wshobson-agents/plugins/frontend-mobile-development/skills/tailwind-design-system/SKILL.md`
- `~/skills/vercel-agent-skills/skills/web-design-guidelines/SKILL.md` ← 100+ rules
- `~/skills/supercent-skills/.agent-skills/responsive-design/SKILL.md`

**API Design:**
- `~/skills/supercent-skills/.agent-skills/api-design/SKILL.md`
- `~/skills/wshobson-agents/plugins/backend-development/skills/api-design-principles/SKILL.md`

**Database:**
- `~/skills/supercent-skills/.agent-skills/database-schema-design/SKILL.md`
- `~/skills/wshobson-agents/plugins/database-design/skills/postgresql/SKILL.md`

**Testing:**
- `~/skills/obra-superpowers/skills/test-driven-development/SKILL.md`
- `~/skills/supercent-skills/.agent-skills/testing-strategies/SKILL.md`
- `~/skills/anthropic-skills/skills/webapp-testing/SKILL.md`

**Code Review:**
- `~/skills/supercent-skills/.agent-skills/code-review/SKILL.md`
- `~/skills/wshobson-agents/plugins/developer-essentials/skills/code-review-excellence/SKILL.md`

**Security:**
- `~/skills/supercent-skills/.agent-skills/security-best-practices/SKILL.md`
- `~/skills/supercent-skills/.agent-skills/authentication-setup/SKILL.md`

**Accessibility:**
- `~/skills/supercent-skills/.agent-skills/web-accessibility/SKILL.md`
- `~/skills/wshobson-agents/plugins/ui-design/skills/accessibility-compliance/SKILL.md`

**Performance:**
- `~/skills/supercent-skills/.agent-skills/performance-optimization/SKILL.md`

**Debugging:**
- `~/skills/obra-superpowers/skills/systematic-debugging/SKILL.md`

**Git:**
- `~/skills/supercent-skills/.agent-skills/git-workflow/SKILL.md`
- `~/skills/obra-superpowers/skills/using-git-worktrees/SKILL.md`

**Deployment:**
- `~/skills/supercent-skills/.agent-skills/deployment-automation/SKILL.md`
- `~/skills/vercel-agent-skills/skills/deploy-to-vercel/SKILL.md`

**Frontend Design:**
- `~/skills/anthropic-skills/skills/frontend-design/SKILL.md`

**Planning:**
- `~/skills/obra-superpowers/skills/writing-plans/SKILL.md`
- `~/skills/obra-superpowers/skills/executing-plans/SKILL.md`

**Verification:**
- `~/skills/obra-superpowers/skills/verification-before-completion/SKILL.md`

## Architecture Conventions

- **Server Components default.** `"use client"` only for state, effects, browser APIs, event handlers, Framer Motion.
- **File-based routing.** `app/` directory. Every page exports `metadata`.
- **`next/image`** for all images. `priority` on above-the-fold. Always `alt`.
- **`next/link`** for all internal navigation.
- **`next/font`** for font loading.
- **`next/dynamic`** with `ssr: false` for heavy client components.
- **Error boundaries** via `error.tsx`. Loading states via `loading.tsx`.

## TypeScript Rules

- `strict: true` — no exceptions
- No `any` — use `unknown` + type guards
- Explicit return types on exports
- `interface [ComponentName]Props` — exported, never inline
- Discriminated unions for variants
- `as const satisfies` for static data

## Naming Rules

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types: `PascalCase`
- BANNED: Container, Wrapper, Group, Frame, Box, Item, Element, Block, generic Section, Component1, Handler, Manager, Data, Info
- REQUIRED: Domain-descriptive names

## Code Standards

- One component per file
- No barrel exports
- No dead code or commented-out code
- DRY after 3 duplications
- Import icons individually from lucide-react
- Semantic HTML (`nav`, `main`, `section`, `article`, `header`, `footer`)
- WCAG AA contrast (4.5:1 / 3:1)
- Keyboard accessible
- Validate user input server-side
- No secrets in client code
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

## Skill Conflict Priority

1. Vercel official (next-skills, agent-skills)
2. Anthropic official (anthropic-skills)
3. Supercent (supercent-skills)
4. WS Hobson (wshobson-agents)
5. GitHub Copilot (github-copilot-skills)

## Completion Checklist

Before finishing any task:
- [ ] TypeScript strict passes
- [ ] No accessibility violations
- [ ] No security anti-patterns
- [ ] All images have alt text
- [ ] Server/Client boundary is correct
- [ ] Read verification skill: `~/skills/obra-superpowers/skills/verification-before-completion/SKILL.md`
