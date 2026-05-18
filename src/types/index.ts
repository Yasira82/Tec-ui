export type TecAppId =
  | 'hub' | 'commerce' | 'assets' | 'ecommerce'
  | 'life' | 'analytics' | 'fundx' | 'estate'
  | 'connection' | 'titan' | 'nbf' | 'dx'
  | 'legend' | 'elite' | 'vip' | 'epic'
  | 'zone' | 'alert' | 'system' | 'nx'
  | 'brookfield' | 'nexus' | 'explorer' | 'insure';

export interface TecAppMeta {
  id:     TecAppId;
  name:   string;
  domain: string;
  emoji:  string;
  status: 'live' | 'coming_soon';
}

export interface ApiResponse<T = unknown> {
  success:  boolean;
  data?:    T;
  error?:   { code: string; message: string };
  message?: string;
}

export interface PaginatedResponse<T> {
  data:       T[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}

export type PaymentStatus =
  | 'created' | 'approved' | 'completed'
  | 'cancelled' | 'failed';

export interface PaymentRecord {
  id:        string;
  amount:    number;
  currency:  string;
  status:    PaymentStatus;
  memo:      string;
  createdAt: string;
  txHash?:   string;
}
