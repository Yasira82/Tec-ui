import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createU2APayment } from '../payment/createPayment';

const makePi = (overrides: Partial<{
  authenticate: any;
  createPayment: any;
}> = {}) => ({
  authenticate: vi.fn().mockResolvedValue({ accessToken: 'tok', user: { uid: 'u1', username: 'alice' } }),
  createPayment: vi.fn(),
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(document, 'cookie', {
    writable: true, configurable: true,
    value: 'tec_access_token=tok; tec_csrf=csrf',
  });
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }) as any;
});

afterEach(() => {
  delete (window as any).Pi;
});

// ── No Pi SDK ─────────────────────────────────────────────

describe('createU2APayment — no Pi SDK', () => {
  it('returns error when window.Pi is undefined', async () => {
    delete (window as any).Pi;
    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('error');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Pi SDK');
  });
});

// ── Auth failure ──────────────────────────────────────────

describe('createU2APayment — auth failure', () => {
  it('returns error when Pi.authenticate throws', async () => {
    (window as any).Pi = makePi({
      authenticate: vi.fn().mockRejectedValue(new Error('auth denied')),
    });
    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('error');
    expect(result.message).toBe('auth denied');
  });
});

// ── onCancel ──────────────────────────────────────────────

describe('createU2APayment — onCancel', () => {
  it('returns cancelled when Pi payment is cancelled', async () => {
    const pi = makePi({
      createPayment: vi.fn((_data, cbs) => {
        cbs.onCancel('pay-id');
      }),
    });
    (window as any).Pi = pi;

    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('cancelled');
    expect(result.success).toBe(false);
  });
});

// ── onError ───────────────────────────────────────────────

describe('createU2APayment — onError', () => {
  it('returns error when Pi reports onError', async () => {
    const pi = makePi({
      createPayment: vi.fn((_data, cbs) => {
        cbs.onError(new Error('Pi error'));
      }),
    });
    (window as any).Pi = pi;

    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('error');
    expect(result.message).toBe('Pi error');
  });
});

// ── onReadyForServerApproval — approve fails ──────────────

describe('createU2APayment — approve fails', () => {
  it('returns error when approve endpoint returns non-ok', async () => {
    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('/approve'))
        return { ok: false, json: async () => ({ error: 'bad approve' }) };
      return { ok: true, json: async () => ({}) };
    }) as any;

    const pi = makePi({
      createPayment: vi.fn((_data, cbs) => {
        cbs.onReadyForServerApproval('pi-pay-id');
      }),
    });
    (window as any).Pi = pi;

    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('error');
    expect(result.message).toBe('bad approve');
  });
});

// ── onReadyForServerCompletion — success ──────────────────

describe('createU2APayment — success', () => {
  it('resolves completed on successful approve+complete', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }) as any;

    const pi = makePi({
      createPayment: vi.fn((_data, cbs) => {
        // Approve first, then complete
        cbs.onReadyForServerApproval('pi-pay-id');
        setTimeout(() => cbs.onReadyForServerCompletion('pi-pay-id', 'txid-abc'), 0);
      }),
    });
    (window as any).Pi = pi;

    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('completed');
    expect(result.success).toBe(true);
    expect(result.txid).toBe('txid-abc');
  });
});

// ── onReadyForServerCompletion — complete fails ───────────

describe('createU2APayment — complete fails', () => {
  it('returns error when complete endpoint returns non-ok', async () => {
    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('/complete')) return { ok: false, json: async () => ({}) };
      return { ok: true, json: async () => ({}) };
    }) as any;

    const pi = makePi({
      createPayment: vi.fn((_data, cbs) => {
        cbs.onReadyForServerCompletion('pi-pay-id', 'txid-abc');
      }),
    });
    (window as any).Pi = pi;

    const result = await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(result.status).toBe('error');
    expect(result.message).toBe('Complete failed');
  });
});

// ── incomplete payment handler ────────────────────────────

describe('createU2APayment — incomplete payment resolved', () => {
  it('calls resolve-incomplete endpoint for incomplete payments', async () => {
    const resolveUrl: string[] = [];
    global.fetch = vi.fn(async (url: string) => {
      if (url.includes('resolve-incomplete')) resolveUrl.push(url);
      return { ok: true, json: async () => ({}) };
    }) as any;

    const pi = makePi({
      authenticate: vi.fn().mockImplementation(async (_scopes, onIncomplete) => {
        await onIncomplete({ identifier: 'incomplete-pi-id' });
        return { accessToken: 'tok', user: { uid: 'u1', username: 'alice' } };
      }),
      createPayment: vi.fn((_data, cbs) => {
        cbs.onCancel('x');
      }),
    });
    (window as any).Pi = pi;

    await createU2APayment(10, 'memo', {}, 'internal-id');
    expect(resolveUrl.some(u => u.includes('resolve-incomplete'))).toBe(true);
  });
});
