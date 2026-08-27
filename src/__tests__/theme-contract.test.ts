/**
 * TEC_COLORS is a contract, not a convenience object.
 *
 * Two things about it are load-bearing and neither is obvious from reading a
 * call site, so they are pinned here:
 *
 *  1. Every value is a PLAIN HEX. Consumers append alpha to these strings —
 *     `1px solid ${TEC_COLORS.gold}33` — in 216 places across the fleet.
 *     Switching a value to `var(--tec-gold)` to make it theme-aware would
 *     produce `var(--tec-gold)33`: invalid CSS, no error thrown, and a border
 *     that silently stops painting in 216 places at once.
 *
 *  2. The accent is the PI amber. The package shipped amber-400 (#FBBF24)
 *     while the Hub had already moved to the value sampled from the Pi app,
 *     so the shared design system and its largest consumer disagreed about
 *     the brand colour.
 */
import { describe, it, expect } from 'vitest';
import { TEC_COLORS } from '../theme';

const HEX = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;

describe('every colour is an interpolatable hex', () => {
  it.each(Object.entries(TEC_COLORS))('%s is a plain hex, not a var()', (_k, v) => {
    expect(v).toMatch(HEX);
  });

  it('names no CSS function anywhere', () => {
    // rgb()/hsl()/var() would all survive a `toMatch` on some other key and
    // break the same interpolation, so the whole object is checked at once.
    const joined = Object.values(TEC_COLORS).join(' ');
    expect(joined).not.toMatch(/var\(|rgb|hsl|color-mix/);
  });

  it('appends alpha the way callers actually do', () => {
    expect(`${TEC_COLORS.gold}33`).toBe('#FBB44A33');
    expect(`1px solid ${TEC_COLORS.gold}22`).toBe('1px solid #FBB44A22');
  });
});

describe('the accent is the Pi amber', () => {
  it('is the value sampled from the Pi app, not the generic amber', () => {
    expect(TEC_COLORS.gold).toBe('#FBB44A');
    expect(TEC_COLORS.gold).not.toBe('#FBBF24'); // amber-400, v2.x
    expect(TEC_COLORS.gold).not.toBe('#d4af37'); // the legacy gold, pre-2.0
  });

  it('keeps WEALTH consistent — warning aliases the accent', () => {
    // These are the same idea in the EVL palette (C-83 §5). When one moved and
    // the other did not, a warning chip sat beside a gold button in two
    // different oranges.
    expect(TEC_COLORS.warning).toBe(TEC_COLORS.gold);
  });

  it('keeps the light and dark ends on the same hue', () => {
    // goldDark and goldLight are the gradient/highlight ends of the SAME
    // accent. Leaving them on the old amber while gold moved is what made
    // buttons darker than the text beside them.
    expect(TEC_COLORS.goldDark).toBe('#E8962A');
    expect(TEC_COLORS.goldLight).toBe('#FDCF7A');
    expect(TEC_COLORS.goldDark).not.toBe('#F59E0B');
    expect(TEC_COLORS.goldLight).not.toBe('#FCD34D');
  });
});

describe('nothing was removed', () => {
  it.each([
    'gold', 'goldDark', 'goldLight',
    'bg', 'surface', 'surface2', 'border', 'text', 'subtext',
    'purple', 'green', 'cyan', 'red', 'blue',
    'success', 'error', 'info', 'warning',
  ])('still exports %s', (key) => {
    // A value change is a major bump; a REMOVED export is a broken build in
    // every app at once, which is a different and worse kind of release.
    expect(TEC_COLORS).toHaveProperty(key);
  });
});
