// TEC Economic Visual Language (EVL) — C-83 is the authority for these tokens.
// v2.0.0 adopts EVL as the live platform identity (was the legacy gold #d4af37 set).
//
// v3.0.0 moves WEALTH to the Pi amber. The value is sampled from the Pi app
// itself — #FBB44A is its splash mark — so a TEC app sitting beside Pi Browser
// chrome reads as part of the same product instead of a near-miss of it. The
// Hub already ships this value; the package was the last place still exporting
// the generic amber-400, which is why the two disagreed on screen.
//
// The APIs are unchanged: every key still holds a plain 6-digit hex. That is
// deliberate and load-bearing — consumers append alpha to these strings
// (`1px solid ${TEC_COLORS.gold}33`, 216 places across the fleet), so a
// `var(--tec-gold)` here would produce `var(--tec-gold)33`: invalid CSS, no
// error, and a border that silently stops painting. Theme-aware colour belongs
// in a CSS custom property the app owns, not in this object.
//
// It is a MAJOR bump because the values move: nothing is renamed or removed,
// but every surface built on WEALTH changes hue, so the apps deploy together.
export const TEC_COLORS = {
  // ── WEALTH (primary accent) — the Pi amber ──────────────────────
  // Tuned for a dark ground, which is what every TEC app currently paints. An
  // app that adopts a light theme wants the deeper #FEA500 instead, and should
  // take it from its own `--tec-gold` rather than from here — one constant
  // cannot be two values.
  gold:       '#FBB44A',   // Pi splash amber (was #FBBF24)
  goldDark:   '#E8962A',   // gradients/buttons
  goldLight:  '#FDCF7A',   // highlights
  // ── Background layers (C-83 §4 — immutable) ─────────────────────
  bg:         '#050816',   // Layer 1 — primary background (was #020205)
  surface:    '#0B1020',   // Layer 2 — surface (was #0d0d14)
  surface2:   '#111627',   // Layer 3 — card / elevated
  border:     '#ffffff08',
  text:       '#ffffff',
  subtext:    '#6b6b7a',
  // ── EVL semantic domains (C-83 §5) ──────────────────────────────
  purple:     '#8B5CF6',   // IDENTITY
  green:      '#22C55E',   // GROWTH
  cyan:       '#06B6D4',   // INTELLIGENCE
  red:        '#EF4444',   // RISK
  blue:       '#3B82F6',   // GOVERNANCE
  // ── State colors (aligned to EVL semantics) ─────────────────────
  success:    '#22C55E',   // GROWTH
  error:      '#EF4444',   // RISK
  info:       '#06B6D4',   // INTELLIGENCE
  // Aliases WEALTH by definition, so it moves with it. Left as a literal
  // rather than `gold` so the object stays a flat map of hex strings.
  warning:    '#FBB44A',   // WEALTH
} as const;

export const TEC_FONTS = {
  system: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
} as const;

export const TEC_RADIUS = {
  sm:  8,
  md:  12,
  lg:  18,
  xl:  24,
  full: 9999,
} as const;
