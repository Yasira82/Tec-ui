import { type ReactNode } from 'react';
import { TEC_COLORS, TEC_RADIUS } from '../theme';
import { Icon, type IconName } from '../Icon';

export interface ChipProps {
  children:  ReactNode;
  active?:   boolean;
  icon?:     IconName;
  /** Accent color when active (defaults to EVL gold). */
  color?:    string;
  onClick?:  () => void;
}

/**
 * Pill chip for filters / tags. Active = filled accent, idle = outline. The
 * consistent shape + the icon slot are what make category rows read as a system
 * rather than ad-hoc emoji buttons.
 */
export function Chip({ children, active = false, icon, color = TEC_COLORS.gold, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
        fontSize: 12, fontWeight: 700, lineHeight: 1,
        padding: '7px 12px', borderRadius: TEC_RADIUS.full,
        color:      active ? '#0a0800' : TEC_COLORS.text,
        background: active ? `linear-gradient(135deg, ${color}, ${TEC_COLORS.goldDark})` : 'transparent',
        border:     `1px solid ${active ? 'transparent' : color + '33'}`,
        cursor:     onClick ? 'pointer' : 'default',
        transition: 'background .15s ease, border-color .15s ease, color .15s ease',
      }}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </button>
  );
}
