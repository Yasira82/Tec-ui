'use client';

import React from 'react';

export interface ObservabilityStatusProps {
  successRate: number;
  label?:      string;
  total?:      number;
}

export interface ServiceHealthDotProps {
  healthy:  boolean;
  label:    string;
  latency?: number;
}

function getColor(rate: number): { fg: string; bg: string } {
  if (rate >= 95) return { fg: '#4ade80', bg: 'rgba(34,197,94,0.12)' };
  if (rate >= 80) return { fg: '#facc15', bg: 'rgba(250,204,21,0.12)' };
  return              { fg: '#f87171', bg: 'rgba(239,68,68,0.12)' };
}

export function ObservabilityStatus({ successRate, label = 'Success Rate', total }: ObservabilityStatusProps) {
  const { fg, bg } = getColor(successRate);

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 14px', borderRadius: 12,
      background: bg, border: `1px solid ${fg}22`,
      fontFamily: 'system-ui,sans-serif',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: fg, boxShadow: `0 0 6px ${fg}88`, flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 1 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: fg, lineHeight: 1 }}>
          {successRate.toFixed(1)}%
          {total !== undefined && (
            <span style={{ fontSize: 10, fontWeight: 400, color: '#6b7280', marginLeft: 4 }}>
              / {total} txns
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ServiceHealthDot({ healthy, label, latency }: ServiceHealthDotProps) {
  const color = healthy ? '#4ade80' : '#f87171';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 7,
      fontFamily: 'system-ui,sans-serif',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%', background: color,
        boxShadow: `0 0 5px ${color}88`, flexShrink: 0,
      }} />
      <span style={{ fontSize: 12, color: '#9ca3af' }}>{label}</span>
      {latency !== undefined && (
        <span style={{ fontSize: 11, color: '#6b7280' }}>{latency}ms</span>
      )}
    </div>
  );
}
