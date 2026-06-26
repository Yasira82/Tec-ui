// TEC Economic Visual Language (EVL) — C-83 is the authority for these tokens.
// v2.0.0 adopts EVL as the live platform identity (was the legacy gold #d4af37 set).
export const TEC_COLORS = {
  // ── WEALTH (primary accent) — EVL gold ──────────────────────────
  gold:       '#FBBF24',   // EVL WEALTH (was #d4af37)
  goldDark:   '#F59E0B',   // amber-500 — gradients/buttons
  goldLight:  '#FCD34D',   // amber-300 — highlights
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
  warning:    '#FBBF24',   // WEALTH
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
