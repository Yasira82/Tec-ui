# @yasser172/tec-ui — Claude Code Instructions

## What This Package Is

Shared design system and UI component library for the TEC Federated Platform.
Used by ALL TEC apps: Hub, Ecommerce, Assets, Commerce.

**Rule: No app-specific logic. Pure UI and shared constants only.**

---

## Stack

- React 18 + TypeScript strict
- tsup build (ESM + CJS outputs)
- Inline styles only — no CSS modules, no Tailwind (Pi Browser compatibility)

---

## Key Exports

```
src/
  GlobalNav.tsx     # Top navigation bar (used by all apps)
  theme.ts          # TEC_COLORS, TEC_FONTS, spacing
  payment/          # Payment UI helpers (status badges, π amount display)
  constants/        # Platform-wide constants
  types/            # Shared TypeScript types (Product, User, PaymentStatus…)
  utils/            # Formatting utilities (formatPi, formatDate, truncateAddress)
```

### TEC_COLORS (always use these, never hardcode hex in apps)
```typescript
TEC_COLORS.gold      // #d4af37  — primary accent
TEC_COLORS.goldDark  // #b8882a  — buttons/gradients
TEC_COLORS.bg        // #020205  — page background
TEC_COLORS.surface   // #0d0d14  — card/drawer background
```

---

## Rules

- No Pi SDK calls (`window.Pi`) in this package — pure UI
- No auth logic — components receive user data via props
- No backend calls — fetch stays in the consuming app
- Maintain backward compatibility: apps depend on all exported symbols
- All components must render in Pi Browser (no CSS modules, no Tailwind)

---

## Development Commands

```bash
npm run build       # tsup build → dist/
npm run type-check  # TypeScript strict check
```

---

## What NOT To Do

- Do NOT import axios, fetch, or any HTTP client
- Do NOT add `window.Pi` or Pi SDK references
- Do NOT add app-specific components (ecommerce-only, hub-only, etc.)
- Do NOT remove or rename existing exports without a major version bump
- Do NOT use Tailwind, CSS modules, or styled-components

---

## Commit Convention

```
feat(ui):     new component or export
fix(ui):      visual or type bug
refactor:     no external behavior change
chore:        build/config only
```

## Platform Context

Full platform context, ADR system, and engineering roadmap:
→ `TEC_MODELS_PAT.prompt.yml` in yasira82/tec-app (branch: claude/ecommerce-engineering-review-EuiQO)
→ `TEC_Ecosystem_AI_Key.prompt.yml` in yasira82/tec-app
