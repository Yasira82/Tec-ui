import { type CSSProperties, type ReactNode, useState } from 'react';
import { TEC_COLORS, TEC_RADIUS } from '../theme';

export interface CardProps {
  children:     ReactNode;
  padding?:     number;
  /** Adds a hover lift + gold border + pointer (for clickable cards). */
  interactive?: boolean;
  onClick?:     () => void;
  style?:       CSSProperties;
}

/**
 * Surface card with depth. The elevation + hover lift are what separate a
 * "professional" card from a flat bordered box. Inline-styled (Pi-Browser safe).
 */
export function Card({ children, padding = 16, interactive = false, onClick, style }: CardProps) {
  const [hover, setHover] = useState(false);
  const lifted = interactive && hover;
  return (
    <div
      onClick={onClick}
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        background:    TEC_COLORS.surface,
        border:        `1px solid ${lifted ? TEC_COLORS.gold + '44' : TEC_COLORS.border}`,
        borderRadius:  TEC_RADIUS.md,
        padding,
        boxShadow:     lifted ? '0 10px 30px rgba(0,0,0,0.45)' : '0 1px 2px rgba(0,0,0,0.25)',
        transform:     lifted ? 'translateY(-2px)' : 'none',
        transition:    'transform .18s ease, box-shadow .18s ease, border-color .18s ease',
        cursor:        onClick || interactive ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
