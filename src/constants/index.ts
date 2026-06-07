import type { TecAppMeta } from '../types';

export const TEC_DOMAINS = {
  HUB:       process.env['NEXT_PUBLIC_HUB_URL']        ?? 'https://hub.tecosystem.app',
  COMMERCE:  process.env['NEXT_PUBLIC_COMMERCE_URL']   ?? 'https://commerce.tecosystem.app',
  ASSETS:    process.env['NEXT_PUBLIC_ASSETS_URL']     ?? 'https://assets.tecosystem.app',
  ECOMMERCE: process.env['NEXT_PUBLIC_ECOMMERCE_URL']  ?? 'https://ecommerce.tecosystem.app',
  LIFE:      process.env['NEXT_PUBLIC_LIFE_URL']       ?? 'https://life.tecosystem.app',
  GATEWAY:   process.env['NEXT_PUBLIC_API_GATEWAY_URL'] ?? '',
} as const;

export const TEC_APPS: TecAppMeta[] = [
  { id: 'hub',       name: 'Hub',       domain: TEC_DOMAINS.HUB,       emoji: '🔷', status: 'live'        },
  { id: 'commerce',  name: 'Commerce',  domain: TEC_DOMAINS.COMMERCE,  emoji: '🛒', status: 'live'        },
  { id: 'assets',    name: 'Assets',    domain: TEC_DOMAINS.ASSETS,    emoji: '💎', status: 'live'        },
  { id: 'ecommerce', name: 'Ecommerce', domain: TEC_DOMAINS.ECOMMERCE, emoji: '📦', status: 'coming_soon' },
  { id: 'life',      name: 'Life',      domain: TEC_DOMAINS.LIFE,      emoji: '🌱', status: 'coming_soon' },
];

export const TEC_COOKIES = {
  ACCESS_TOKEN:  'tec_access_token',
  REFRESH_TOKEN: 'tec_refresh_token',
  USER:          'tec_user',
  CSRF:          'tec_csrf',
} as const;
