import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Icon, type IconName } from '../Icon';
import { CountUp } from '../CountUp';

const ALL_ICONS: IconName[] = [
  'hub', 'wallet', 'gem', 'cart', 'settings', 'bell', 'sparkles', 'store',
  'receipt', 'chart', 'box', 'plus', 'search', 'tag', 'truck', 'home', 'shirt', 'phone',
  // expanded set (professional icon system — replaces emoji across apps)
  'utensils', 'heart', 'book', 'palette', 'code', 'wrench', 'briefcase', 'building',
  'rocket', 'star', 'gift', 'compass', 'trophy', 'user', 'users', 'coins', 'globe',
  'shield', 'check', 'verified', 'lock', 'zap', 'info', 'alert', 'pin',
  'arrow-right', 'chevron-right', 'external', 'close', 'refresh', 'calendar', 'clock',
];

describe('Icon', () => {
  it('renders an svg for every icon name', () => {
    for (const name of ALL_ICONS) {
      const { container, unmount } = render(<Icon name={name} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
      expect(svg?.innerHTML.length).toBeGreaterThan(0);   // path(s) injected
      unmount();
    }
  });

  it('uses defaults (size 24, currentColor, strokeWidth 2)', () => {
    const { container } = render(<Icon name="bell" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('24');
    // Stroke rides on inline STYLE, not the presentation attribute — see below.
    expect(svg.style.stroke).toBe('currentColor');
    expect(svg.getAttribute('stroke-width')).toBe('2');
  });

  it('honours size / color / strokeWidth / style props', () => {
    const { container } = render(
      <Icon name="cart" size={32} color="#FBBF24" strokeWidth={1.5} style={{ opacity: 0.5 }} />,
    );
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
    expect(svg.style.stroke).toBe('#FBBF24');
    expect(svg.getAttribute('stroke-width')).toBe('1.5');
    expect(svg.style.opacity).toBe('0.5');
  });

  it('paints stroke through style, so a design TOKEN resolves', () => {
    // The reason this is not a presentation attribute: `stroke="var(--x)"` is
    // not reliably parsed as a CSS value, and an unresolved stroke renders the
    // icon invisible. Consumers pass tokens (`var(--tec-gold)`) constantly.
    const { container } = render(<Icon name="bot" color="var(--tec-gold)" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('stroke')).toBeNull();
    expect(svg.style.stroke).toBe('var(--tec-gold)');
  });

  it('lets a caller style override the default stroke', () => {
    const { container } = render(<Icon name="crown" style={{ stroke: 'red' }} />);
    expect(container.querySelector('svg')!.style.stroke).toBe('red');
  });
});

describe('CountUp', () => {
  const mm = window.matchMedia;
  afterEach(() => { window.matchMedia = mm; vi.restoreAllMocks(); });
  beforeEach(() => {
    // default: motion allowed
    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
  });

  it('renders the formatted value with thousands separator', () => {
    render(<CountUp value={1234.5} decimals={2} />);
    expect(screen.getByText('1,234.50')).toBeInTheDocument();
  });

  it('respects the className/style props', () => {
    const { container } = render(<CountUp value={5} decimals={0} className="x" style={{ color: 'red' }} />);
    const span = container.querySelector('span.x')!;
    expect(span).toBeTruthy();
    expect((span as HTMLElement).style.color).toBe('red');
  });

  it('snaps instantly when prefers-reduced-motion is set', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    const { rerender } = render(<CountUp value={0} decimals={0} />);
    rerender(<CountUp value={42} decimals={0} />);
    await waitFor(() => expect(screen.getByText('42')).toBeInTheDocument());
  });

  it('animates from previous value up to the new value', async () => {
    const { rerender } = render(<CountUp value={0} decimals={0} duration={20} />);
    rerender(<CountUp value={100} decimals={0} duration={20} />);
    await waitFor(() => expect(screen.getByText('100')).toBeInTheDocument(), { timeout: 2000 });
  });
});
