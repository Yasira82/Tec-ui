# Changelog

All notable changes to `@yasser172/tec-ui` are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/)

---

## [2.1.0] - 2026-06-26

### Added
- `Icon` — lucide-style inline SVG icon set (shared chrome glyphs).
- `CountUp` — animated number component (rAF easeOutCubic, thousands separator,
  `prefers-reduced-motion` aware).
- Tests covering `Icon` + `CountUp` to hold the coverage floor.

### Packaging
- README, LICENSE (MIT), and CHANGELOG added; `engines`, `sideEffects: false`,
  and `license` metadata set; README + LICENSE now included in the published
  package.

## [2.0.0] - 2026-06 — EVL palette (breaking visual change)

### Changed
- **BREAKING (visual):** adopted the EVL palette (C-83) as the live identity.
  Token *values* changed — `gold` `#d4af37 → #FBBF24`, `bg` `#020205 → #050816`,
  `surface` `#0d0d14 → #0B1020`. No exports were removed.

### Added
- EVL semantic domain tokens: `purple` (IDENTITY), `green` (GROWTH),
  `cyan` (INTELLIGENCE), `red` (RISK), `blue` (GOVERNANCE).
- `surface2` elevated background layer.

### Migration
- Consumers bump to `^2.0.0` and adopt simultaneously (coordinated deploy across
  all four apps) — see the upgrade plan in `CLAUDE.md`.

## [1.x] - prior

- `GlobalNav`, `TEC_COLORS`/`TEC_FONTS`/`TEC_RADIUS`, payment helpers
  (`buildHubPayUrl`, `createU2APayment`, `PaymentModal`, status badges),
  formatting utils (`formatPi`, `formatDate`), and shared constants/types.
