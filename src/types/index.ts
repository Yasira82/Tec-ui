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
  error?:   { code: string; message: string; field?: string; requestId?: string };
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

// ✅ amount = string DECIMAL دايماً مش number
export interface PaymentRecord {
  id:        string;
  amount:    string;       // DECIMAL(20,8) as string
  currency:  string;
  status:    PaymentStatus;
  memo:      string;
  source?:   string;
  createdAt: string;
  txid?:     string;
}

export type PaymentSource =
  | 'hub' | 'commerce' | 'assets' | 'ecommerce'
  | 'life' | 'connection' | 'fundx' | 'estate';

// ── User ──────────────────────────────────────────────────
export type SubscriptionPlan = 'FREE' | 'PRO' | 'ENTERPRISE';
export type KycStatus = 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface TecUser {
  id:               string;
  piId:             string;
  piUsername:       string;
  role:             string;
  subscriptionPlan: SubscriptionPlan | null;
  kycVerified?:     boolean;
  createdAt:        string;
}

// ── Wallet ────────────────────────────────────────────────
export interface WalletBalance {
  balance:  string;   // DECIMAL string
  currency: string;
}

// ── Notification ──────────────────────────────────────────
export type NotifType = 'PAYMENT' | 'WALLET' | 'KYC' | 'SECURITY' | 'SYSTEM';

export interface TecNotification {
  id:        string;
  type:      NotifType;
  title:     string;
  message:   string;
  read:      boolean;
  createdAt: string;
}
