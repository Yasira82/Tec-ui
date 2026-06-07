import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getToken,
  getCsrfToken,
  buildPaymentHeaders,
  createPaymentRecord,
} from '../payment/createPayment';

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(document, 'cookie', {
    writable: true, configurable: true, value: '',
  });
});

// ── getToken ──────────────────────────────────────────────

describe('getToken', () => {
  it('returns null when cookie not set', () => {
    expect(getToken()).toBeNull();
  });

  it('returns token value from cookie', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true, configurable: true,
      value: 'tec_access_token=abc123; other=x',
    });
    expect(getToken()).toBe('abc123');
  });
});

// ── getCsrfToken ─────────────────────────────────────────

describe('getCsrfToken', () => {
  it('returns empty string when cookie not set', () => {
    expect(getCsrfToken()).toBe('');
  });

  it('returns csrf value from cookie', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true, configurable: true,
      value: 'tec_csrf=csrf-val; other=x',
    });
    expect(getCsrfToken()).toBe('csrf-val');
  });
});

// ── buildPaymentHeaders ───────────────────────────────────

describe('buildPaymentHeaders', () => {
  it('includes Content-Type and x-request-id', () => {
    const h = buildPaymentHeaders();
    expect(h['Content-Type']).toBe('application/json');
    expect(h['x-request-id']).toBeTruthy();
  });

  it('includes x-csrf-token from cookie', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true, configurable: true,
      value: 'tec_csrf=csrf-tok',
    });
    const h = buildPaymentHeaders();
    expect(h['x-csrf-token']).toBe('csrf-tok');
  });

  it('includes Authorization header when token exists', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true, configurable: true,
      value: 'tec_access_token=my-token',
    });
    const h = buildPaymentHeaders();
    expect(h['Authorization']).toBe('Bearer my-token');
  });

  it('omits Authorization header when no token', () => {
    const h = buildPaymentHeaders();
    expect(h['Authorization']).toBeUndefined();
  });
});

// ── createPaymentRecord ───────────────────────────────────

describe('createPaymentRecord', () => {
  it('returns internalId on success (data.data.payment.id)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { payment: { id: 'payment-id-1' } } }),
    }) as any;
    const result = await createPaymentRecord(10, 'prod-1', 'test memo', 'shop');
    expect(result).toBe('payment-id-1');
  });

  it('returns internalId from data.data.id', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { id: 'data-id-2' } }),
    }) as any;
    const result = await createPaymentRecord(10, 'prod-1', 'memo', 'shop');
    expect(result).toBe('data-id-2');
  });

  it('returns internalId from top-level id', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'top-id-3' }),
    }) as any;
    const result = await createPaymentRecord(5, 'prod-2', 'memo', 'cart');
    expect(result).toBe('top-id-3');
  });

  it('returns null when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Unauthorized' }),
    }) as any;
    const result = await createPaymentRecord(5, 'prod-2', 'memo', 'cart');
    expect(result).toBeNull();
  });

  it('returns null when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error')) as any;
    const result = await createPaymentRecord(5, 'prod-2', 'memo', 'cart');
    expect(result).toBeNull();
  });

  it('posts to correct endpoint', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'x' }),
    }) as any;
    await createPaymentRecord(10, 'prod-1', 'memo', 'shop');
    const [url] = (global.fetch as any).mock.calls[0];
    expect(url).toBe('/api/bff/payment/create');
  });
});
