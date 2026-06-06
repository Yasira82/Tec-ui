'use client';

import React from 'react';

export type PaymentStatusValue =
  | 'pending'
  | 'approved'
  | 'completed'
  | 'cancelled'
  | 'failed';

export interface PaymentStatusBadgeProps {
  status: PaymentStatusValue;
  size?:  'sm' | 'md';
}

const CONFIG: Record<PaymentStatusValue, { label: string; bg: string; color: string; dot: string }> = {
  pending:   { label: 'Pending',   bg: 'rgba(212,175,55,0.12)', color: '#d4af37', dot: '#d4af37' },
  approved:  { label: 'Approved',  bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', dot: '#60a5fa' },
  completed: { label: 'Completed', bg: 'rgba(34,197,94,0.12)',  color: '#4ade80', dot: '#4ade80' },
  cancelled: { label: 'Cancelled', bg: 'rgba(156,163,175,0.12)',color: '#9ca3af', dot: '#9ca3af' },
  failed:    { label: 'Failed',    bg: 'rgba(239,68,68,0.12)',  color: '#f87171', dot: '#f87171' },
};

export function PaymentStatusBadge({ status, size = 'md' }: PaymentStatusBadgeProps) {
  const cfg      = CONFIG[status];
  const fontSize = size === 'sm' ? 10 : 12;
  const dotSize  = size === 'sm' ? 6  : 7;
  const padding  = size === 'sm' ? '3px 8px' : '4px 10px';

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding, borderRadius: 99,
      background: cfg.bg,
      fontFamily: 'system-ui,sans-serif',
      fontSize, fontWeight: 600, color: cfg.color,
      letterSpacing: '0.02em',
    }}>
      <span style={{
        width: dotSize, height: dotSize,
        borderRadius: '50%', background: cfg.dot,
        flexShrink: 0,
      }} />
      {cfg.label}
    </span>
  );
}
