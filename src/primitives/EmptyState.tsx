import { type ReactNode } from 'react';
import { TEC_COLORS, TEC_RADIUS } from '../theme';
import { Icon, type IconName } from '../Icon';

export interface EmptyStateProps {
  icon?:        IconName;
  title:        string;
  description?: string;
  /** Optional call-to-action (e.g. a <Button/>). */
  action?:      ReactNode;
}

/**
 * The honest empty state (C-135 §4): "nothing yet" done with polish, never a
 * fabricated placeholder. A framed icon + clear title + optional CTA reads as
 * intentional, not broken.
 */
export function EmptyState({ icon = 'sparkles', title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      gap: 10, padding: '40px 24px',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: TEC_RADIUS.full,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: TEC_COLORS.gold + '14', border: `1px solid ${TEC_COLORS.gold}2e`,
        color: TEC_COLORS.gold,
      }}>
        <Icon name={icon} size={24} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, color: TEC_COLORS.text }}>{title}</div>
      {description && (
        <div style={{ fontSize: 13, color: TEC_COLORS.subtext, lineHeight: 1.55, maxWidth: 320 }}>
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: 6 }}>{action}</div>}
    </div>
  );
}
