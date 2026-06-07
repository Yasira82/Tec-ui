import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PaymentStatusBadge } from '../payment/PaymentStatusBadge';

const statuses = ['pending', 'approved', 'completed', 'cancelled', 'failed'] as const;

describe('PaymentStatusBadge', () => {
  it.each(statuses)('renders %s status label', (status) => {
    render(React.createElement(PaymentStatusBadge, { status }));
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    expect(screen.getByText(label)).toBeTruthy();
  });

  it('applies sm size (smaller font)', () => {
    const { container } = render(
      React.createElement(PaymentStatusBadge, { status: 'pending', size: 'sm' })
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.fontSize).toBe('10px');
  });

  it('applies md size (default)', () => {
    const { container } = render(
      React.createElement(PaymentStatusBadge, { status: 'completed' })
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.fontSize).toBe('12px');
  });

  it('uses green color for completed', () => {
    const { container } = render(
      React.createElement(PaymentStatusBadge, { status: 'completed' })
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.color).toBe('#4ade80');
  });

  it('uses red color for failed', () => {
    const { container } = render(
      React.createElement(PaymentStatusBadge, { status: 'failed' })
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.color).toBe('#f87171');
  });
});
