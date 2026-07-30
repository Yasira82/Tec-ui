// ── UI Components ─────────────────────────────────────────
export { GlobalNav }                                     from './GlobalNav';
export type { GlobalNavProps, GlobalNavItem, TecApp }    from './GlobalNav';
export { Icon }                                          from './Icon';
export type { IconName }                                 from './Icon';
export { CountUp }                                       from './CountUp';

// ── Primitives (polished, shared building blocks) ─────────
export { Card, Button, Chip, EmptyState, Skeleton }      from './primitives';
export type {
  CardProps, ButtonProps, ButtonVariant, ButtonSize,
  ChipProps, EmptyStateProps, SkeletonProps,
}                                                        from './primitives';

// ── Theme ─────────────────────────────────────────────────
export { TEC_COLORS, TEC_FONTS, TEC_RADIUS }             from './theme';

// ── Types ─────────────────────────────────────────────────
export type {
  TecAppId, TecAppMeta,
  ApiResponse, PaginatedResponse,
  PaymentStatus, PaymentRecord,
}                                                        from './types';

// ── Constants ─────────────────────────────────────────────
export { TEC_DOMAINS, TEC_APPS, TEC_COOKIES }            from './constants';

// ── Utils ─────────────────────────────────────────────────
export {
  formatPi, parsePiAmount,
  formatDate,
  generateRequestId, buildBffHeaders,
}                                                        from './utils';

// ── Payment ───────────────────────────────────────────────
export {
  buildHubPayUrl, handleBuy,
  getPaymentReturnParams, clearPaymentParams,
  createPaymentRecord, createU2APayment,
  getToken, getCsrfToken, buildPaymentHeaders,
  PaymentModal,
  PaymentStatusBadge,
  ObservabilityStatus, ServiceHealthDot,
}                                                        from './payment';
export type {
  HubPayParams, PaymentReturnParams, PaymentResult,
  PaymentModalProps, PayStatus,
  PaymentStatusBadgeProps, PaymentStatusValue,
  ObservabilityStatusProps, ServiceHealthDotProps,
}                                                        from './payment';
