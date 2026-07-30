import { type CSSProperties, useEffect } from 'react';
import { TEC_COLORS, TEC_RADIUS } from '../theme';
import { ensureKeyframes } from './keyframes';

export interface SkeletonProps {
  width?:  number | string;
  height?: number | string;
  radius?: number;
  style?:  CSSProperties;
}

/**
 * Loading placeholder with a gentle pulse. A consistent skeleton (instead of a
 * spinner or a blank flash) is a hallmark of a polished, professional load state.
 */
export function Skeleton({ width = '100%', height = 16, radius = TEC_RADIUS.sm, style }: SkeletonProps) {
  useEffect(() => { ensureKeyframes(); }, []);
  return (
    <div
      aria-hidden="true"
      style={{
        width, height, borderRadius: radius,
        background: TEC_COLORS.surface2,
        animation: 'tecPulse 1.4s ease-in-out infinite',
        ...style,
      }}
    />
  );
}
