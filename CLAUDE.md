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
- Do NOT release v1.2.0 without testing PaymentModal in Pi Browser (not just Chrome)
- Do NOT remove or rename exports without JSDoc @deprecated + major version bump

---

## Commit Convention

```
feat(ui):     new component or export
fix(ui):      visual or type bug
refactor:     no external behavior change
chore:        build/config only
```

---

## Phase 0 — v1.2.0 Roadmap (C-41)

v1.2.0 is a Phase 0 deliverable required before Mainnet submission:

```
□ Add createU2APayment() to src/payment/     ← NEXT
□ Add PaymentModal component to src/payment/ ← NEXT
□ Add payment status badge components
□ Add observability status components (success/failure indicators)
□ Publish v1.2.0
□ Coordinate upgrade: Commerce + Assets + Ecommerce all update simultaneously
```

### v1.2.0 Upgrade Coordination Plan
When v1.2.0 is ready:
1. Run `npm run build + type-check` in ALL 4 consumer apps before publishing
2. Replace each app's local PaymentModal with @yasser172/tec-ui PaymentModal
3. Verify Pi Browser rendering (not just Chrome) before merging any app
4. Deploy ALL 4 apps simultaneously — staggered deploy = version mismatch risk

**Why shared PaymentModal matters:**
- Currently each app builds its own payment UI (fragmentation risk)
- v1.2.0 centralizes this → one fix if Pi payment UX changes
- Complies with P5 Layer Responsibility (contracts layer = tec-ui)

---

## Platform Orchestra — This Repo

**Role:** Shared Design System — the visual language of the entire TEC platform
**Consumers:** tec-app · tec-ecommerce · tec-assets · tec-commerce (ALL apps)
**Rule:** Pure UI only — no Pi SDK, no auth, no backend calls

```
tec-app, tec-ecommerce, tec-assets, tec-commerce
  → import @yasser172/tec-ui
      → TEC_COLORS, GlobalNav, formatPi, PaymentModal (v1.2.0)
      → all styling via inline styles (Pi Browser compatible)
```

A breaking change here breaks ALL 4 apps simultaneously.

---

## Commercial Targets

- v1.2.0: payment UI helpers + observability components (Phase 0 milestone)
- Pi Browser compatibility: every component renders without CSS modules
- Backward compatibility: NEVER remove export without major version bump
- TEC_COLORS adoption: all apps use token names — zero hardcoded hex

---

## Common Debug Patterns

### "Component renders blank in Pi Browser"
```
Symptom: Component works in Chrome but blank/broken in Pi Browser.
Cause A: CSS modules or Tailwind classes used — Pi Browser incompatible.
Cause B: CSS variable (var(--tec-gold) etc.) undefined — consuming app missing token import.
Fix A:   ALL styles must be inline styles. No CSS modules. No Tailwind. No styled-components.
Fix B:   Consuming app's layout.tsx must import '@/styles/tec-design-tokens.css'.
         Check if hub/layout.tsx or dashboard/layout.tsx has this import.
```

### "Type error after upgrading tec-ui version"
```
Symptom: TypeScript errors in app after npm update @yasser172/tec-ui.
Cause:   Breaking change in tec-ui without semver major version bump.
Fix:     ANY export removal, rename, or prop type change = major version bump.
         NEVER remove an export — all 4 apps depend on all exported symbols.
         Add JSDoc @deprecated before removing — keep for 1 full major version.
```

### "PaymentModal not available after npm install"
```
Symptom: 'PaymentModal' is not exported from '@yasser172/tec-ui'.
Cause:   v1.2.0 not yet published — PaymentModal is a Phase 0 deliverable.
Status:  PENDING — v1.2.0 adds: createU2APayment(), PaymentModal, status badges.
Fix:     Each app uses its own PaymentModal until v1.2.0 ships.
         When v1.2.0 publishes: ALL 4 apps upgrade simultaneously (coordinated deploy).
```

### "Build error: 'window is not defined' in tec-ui"
```
Symptom: Build error referencing a file inside @yasser172/tec-ui.
Cause:   Browser API (window.*, document.*) or Pi SDK added to tec-ui package.
Fix:     Run: grep -r "window\." src/ — must return zero results.
         tec-ui is PURE UI — zero browser API, zero Pi SDK, zero fetch calls.
         Remove immediately — this breaks SSR for ALL 4 apps simultaneously.
```

---

## Risk Register

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| R1 | Breaking change breaks ALL apps | P0 | Semver strict — breaking = major version |
| R2 | CSS modules or Tailwind added | P1 | Inline styles ONLY — Pi Browser incompatible |
| R3 | `window.Pi` reference added | P1 | ZERO Pi SDK in this package |
| R4 | App-specific component added | P2 | Platform-wide only — reject app-specific PRs |
| R5 | TEC_COLORS values changed | P1 | Color tokens = contract — coordinate across apps |

---

## Platform Governance

### SHARED — This package defines the visual contract
- `TEC_COLORS`: canonical color tokens — all apps must use
- `GlobalNav`: shared navigation component
- `formatPi`, `formatDate`: shared formatters
- `PaymentModal` (v1.2.0): shared payment UI — no per-app reimplementation

### SOVEREIGN — This package owns
- Component API surface and prop design
- Style implementation
- Build output format (ESM + CJS)

---

## Release Gate Protocol

```bash
npm run type-check   # 0 errors
npm run build        # clean dist/ — both ESM and CJS outputs
grep -r "window\.Pi\|Pi\.init\|Pi\.create" src/ && echo "FAIL: Pi SDK detected" || echo "clean"
grep -r "\.module\.\|tailwind" src/ && echo "FAIL: CSS framework detected" || echo "clean"
git status           # clean
git fetch origin claude/ecommerce-engineering-review-EuiQO
git rebase origin/claude/ecommerce-engineering-review-EuiQO
```

**Before any export removal/rename:** verify all 4 consumer apps compile with updated version.

---

## Platform Context

Full platform context, ADR system, and engineering roadmap:
→ `TEC_MODELS_PAT.prompt.yml` in yasira82/tec-app (branch: claude/ecommerce-engineering-review-EuiQO)
→ `TEC_Ecosystem_AI_Key.prompt.yml` in yasira82/tec-app
→ C-41 Engineering Roadmap — v1.2.0 is Phase 0 deliverable
