import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import { TEC_COLORS, TEC_RADIUS } from '../theme';
import { Icon } from '../Icon';
import { ensureKeyframes } from './keyframes';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children:   ReactNode;
  onClick?:   () => void;
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  disabled?:  boolean;
  loading?:   boolean;
  fullWidth?: boolean;
  type?:      'button' | 'submit';
  style?:     CSSProperties;
}

const SIZES: Record<ButtonSize, { pad: string; font: number; icon: number }> = {
  sm: { pad: '8px 14px',  font: 13, icon: 14 },
  md: { pad: '11px 18px', font: 14, icon: 16 },
  lg: { pad: '14px 22px', font: 15, icon: 18 },
};

function base(variant: ButtonVariant): CSSProperties {
  switch (variant) {
    case 'primary':
      return { background: `linear-gradient(135deg, ${TEC_COLORS.gold}, ${TEC_COLORS.goldDark})`, color: '#0a0800', border: '1px solid transparent' };
    case 'secondary':
      return { background: 'transparent', color: TEC_COLORS.gold, border: `1px solid ${TEC_COLORS.gold}55` };
    case 'danger':
      return { background: 'transparent', color: TEC_COLORS.error, border: `1px solid ${TEC_COLORS.error}55` };
    case 'ghost':
    default:
      return { background: 'transparent', color: TEC_COLORS.text, border: '1px solid transparent' };
  }
}

/**
 * The platform button — one place for the gold gradient, states, and motion, so
 * every app's primary action looks the same. Hover/disabled/loading handled here.
 */
export function Button({
  children, onClick, variant = 'primary', size = 'md',
  disabled = false, loading = false, fullWidth = false, type = 'button', style,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const sz  = SIZES[size];
  const off = disabled || loading;

  useEffect(() => { if (loading) ensureKeyframes(); }, [loading]);

  return (
    <button
      type={type}
      onClick={off ? undefined : onClick}
      disabled={off}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: fullWidth ? '100%' : undefined,
        padding: sz.pad, fontSize: sz.font, fontWeight: 700, lineHeight: 1,
        borderRadius: TEC_RADIUS.sm,
        cursor: off ? 'not-allowed' : 'pointer',
        opacity: off ? 0.55 : (hover ? 0.9 : 1),
        transition: 'opacity .15s ease, transform .1s ease',
        transform: hover && !off ? 'translateY(-1px)' : 'none',
        fontFamily: 'inherit',
        ...base(variant),
        ...style,
      }}
    >
      {loading && <Icon name="refresh" size={sz.icon} style={{ animation: 'tecSpin .8s linear infinite' }} />}
      {children}
    </button>
  );
}
