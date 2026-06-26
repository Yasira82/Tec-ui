# @yasser172/tec-ui

Shared design system and UI component library for the **TEC Federated Platform**,
used by every TEC app (Hub, Ecommerce, Assets, Commerce).

> **Pure UI only** — no Pi SDK, no auth, no backend calls. **Inline styles only**
> (no CSS modules / Tailwind) so every component renders inside the Pi Browser.

---

## Install

```bash
npm install @yasser172/tec-ui
```

**Peer dependencies:** `react >=18`, `react-dom >=18`.

---

## Usage

### Design tokens (EVL palette — v2.x)

Always use the tokens; never hardcode hex in apps.

```ts
import { TEC_COLORS, TEC_FONTS, TEC_RADIUS } from '@yasser172/tec-ui';

TEC_COLORS.gold     // #FBBF24 — WEALTH accent
TEC_COLORS.bg       // #050816 — page background
TEC_COLORS.surface  // #0B1020 — cards/drawers
TEC_COLORS.purple   // #8B5CF6 — IDENTITY   (semantic domains, C-83)
TEC_COLORS.green    // #22C55E — GROWTH
TEC_COLORS.cyan     // #06B6D4 — INTELLIGENCE
TEC_COLORS.red      // #EF4444 — RISK
TEC_COLORS.blue     // #3B82F6 — GOVERNANCE
```

### Components

```tsx
import { GlobalNav, Icon, CountUp, PaymentModal, PaymentStatusBadge } from '@yasser172/tec-ui';

<GlobalNav /* current app + items */ />
<Icon name="wallet" size={18} />
<CountUp value={1234.56} />              // animated, prefers-reduced-motion aware
<PaymentStatusBadge status="completed" />
```

### Utilities & payment helpers

```ts
import { formatPi, formatDate, buildHubPayUrl, createU2APayment } from '@yasser172/tec-ui';

formatPi(1.23)              // "π 1.2300"
buildHubPayUrl({ /* ... */ }) // canonical /hub?pay=1&... URL
```

### Subpath export

```ts
import { PaymentModal } from '@yasser172/tec-ui/payment';
```

---

## Exports at a glance

| Group | Exports |
|-------|---------|
| Components | `GlobalNav`, `Icon`, `CountUp`, `PaymentModal`, `PaymentStatusBadge`, `ObservabilityStatus`, `ServiceHealthDot` |
| Theme | `TEC_COLORS`, `TEC_FONTS`, `TEC_RADIUS` |
| Constants | `TEC_DOMAINS`, `TEC_APPS`, `TEC_COOKIES` |
| Utils | `formatPi`, `parsePiAmount`, `formatDate`, `generateRequestId`, `buildBffHeaders` |
| Payment | `buildHubPayUrl`, `handleBuy`, `createPaymentRecord`, `createU2APayment`, … |
| Types | `TecAppId`, `PaymentStatus`, `PaymentRecord`, … |

---

## Rules

- **No** `window.Pi` / Pi SDK, **no** `fetch`/axios, **no** auth logic — pure UI.
- **Inline styles only** — no CSS modules, Tailwind, or styled-components (Pi Browser).
- **Backward compatibility:** never remove/rename an export without a major version bump.
- Color token *values* are a contract (C-83) — changing them is a coordinated, breaking change.

---

## Development

```bash
npm run build       # tsup → dist/ (ESM + CJS + .d.ts)
npm run test        # vitest
npm run typecheck   # tsc --noEmit
```

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE) © TEC
