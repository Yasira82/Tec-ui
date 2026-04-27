import React from 'react';
import { TEC_COLORS, TEC_FONTS } from './theme';

export type TecApp =
  | 'hub' | 'assets' | 'commerce' | 'wallet'
  | 'dashboard' | 'analytics' | 'kyc' | 'settings';

export interface GlobalNavItem {
  icon:   string;
  label:  string;
  app:    TecApp | null;
  action: () => void;
}

export interface GlobalNavProps {
  currentApp?: TecApp;
  items:       GlobalNavItem[];
}

export function GlobalNav({ currentApp, items }: GlobalNavProps) {
  return (
    <nav style={{
      position:        'fixed',
      bottom:          0,
      left:            0,
      right:           0,
      background:      'rgba(10,10,18,0.97)',
      backdropFilter:  'blur(20px)',
      borderTop:       `1px solid ${TEC_COLORS.border}`,
      display:         'flex',
      padding:         '10px 0 22px',
      fontFamily:      TEC_FONTS.system,
      zIndex:          1000,
    }}>
      {items.map(item => {
        const isActive = item.app === currentApp;
        return (
          <button
            key={item.label}
            onClick={item.action}
            style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            3,
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              padding:        '4px 0',
            }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{
              fontSize:      9,
              color:         isActive ? TEC_COLORS.gold : TEC_COLORS.subtext,
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontWeight:    isActive ? 700 : 400,
            }}>
              {item.label}
            </span>
            {isActive && (
              <span style={{
                width:        4,
                height:       4,
                borderRadius: '50%',
                background:   TEC_COLORS.gold,
                marginTop:    -2,
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
