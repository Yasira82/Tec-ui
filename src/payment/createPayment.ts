// ── Mode 2: Direct Pi.createPayment() ────────────────────

// ── Local Pi type (مش بنعتمد على global) ─────────────────
interface PiSDK {
  authenticate: (
    scopes:              string[],
    onIncompletePayment: (payment: unknown) => void,
  ) => Promise<{ accessToken: string; user: { uid: string; username: string } }>;
  createPayment: (
    data: {
      amount:   number;
      memo:     string;
      metadata: Record<string, unknown>;
    },
    callbacks: {
      onReadyForServerApproval:    (piPaymentId: string) => void;
      onReadyForServerCompletion:  (piPaymentId: string, txid: string) => void;
      onCancel: (paymentId: string) => void;
      onError:  (error: Error, payment?: unknown) => void;
    },
  ) => void;
}

// ── Cookie helpers ────────────────────────────────────────
export const getToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  return document.cookie
    .split('; ')
    .find(r => r.startsWith('tec_access_token='))
    ?.split('=')?.[1] ?? null;
};

export const getCsrfToken = (): string => {
  if (typeof document === 'undefined') return '';
  return document.cookie
    .split('; ')
    .find(r => r.startsWith('tec_csrf='))
    ?.split('=')?.[1] ?? '';
};

export const buildPaymentHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type':  'application/json',
    'x-csrf-token':  getCsrfToken(),
    'x-request-id':  crypto.randomUUID(),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

// ── Types ─────────────────────────────────────────────────
export interface PaymentResult {
  status:     'completed' | 'cancelled' | 'error';
  success:    boolean;
  paymentId?: string;
  txid?:      string;
  message?:   string;
}

// ── createPaymentRecord ───────────────────────────────────
export const createPaymentRecord = async (
  amount:    number,
  productId: string,
  memo:      string,
  source:    string,
): Promise<string | null> => {
  try {
    const res = await fetch('/api/bff/payment/create', {
      method:      'POST',
      credentials: 'include',
      headers:     buildPaymentHeaders(),
      body: JSON.stringify({ amount, product_id: productId, memo, source }),
    });
    if (!res.ok) return null;
    const data = await res.json() as {
      data?: { payment?: { id?: string }; id?: string };
      id?:   string;
    };
    return data?.data?.payment?.id ?? data?.data?.id ?? data?.id ?? null;
  } catch {
    return null;
  }
};

// ── createU2APayment ──────────────────────────────────────
export const createU2APayment = async (
  amount:     number,
  memo:       string,
  metadata:   Record<string, unknown>,
  internalId: string,
): Promise<PaymentResult> => {
  return new Promise(async (resolve) => {
    // ✅ Local PiSDK type — مش global
    const pi = (
      typeof window !== 'undefined'
        ? (window as unknown as { Pi?: PiSDK }).Pi
        : undefined
    );

    if (!pi) {
      resolve({ status: 'error', success: false, message: 'Pi SDK not ready' });
      return;
    }

    let settled = false;
    const done = (result: PaymentResult): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };

    const timer = setTimeout(() => {
      done({ status: 'error', success: false, message: 'Payment timed out' });
    }, 90_000);

    const headers = buildPaymentHeaders();

    // ✅ Authenticate + handle incomplete payments
    try {
      await pi.authenticate(
        ['username', 'payments'],
        async (incomplete: unknown) => {
          const pid = (incomplete as { identifier?: string } | null)?.identifier;
          if (!pid) return;
          await fetch('/api/bff/payment/resolve-incomplete', {
            method:      'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify({ pi_payment_id: pid }),
          }).catch(() => {});
        },
      );
    } catch (authErr) {
      done({
        status:  'error',
        success: false,
        message: authErr instanceof Error ? authErr.message : 'Pi auth failed',
      });
      return;
    }

    // ✅ Pi.createPayment
    try {
      pi.createPayment(
        { amount, memo, metadata: { ...metadata, internalId } },
        {
          onReadyForServerApproval: async (piPaymentId: string) => {
            const res = await fetch('/api/bff/payment/approve', {
              method:      'POST',
              credentials: 'include',
              headers,
              body: JSON.stringify({
                payment_id:    internalId,
                pi_payment_id: piPaymentId,
              }),
            });
            if (!res.ok) {
              const e = await res.json().catch(() => ({})) as Record<string, string>;
              done({ status: 'error', success: false, message: e?.error ?? 'Approve failed' });
            }
          },
          onReadyForServerCompletion: async (piPaymentId: string, txid: string) => {
            const res = await fetch('/api/bff/payment/complete', {
              method:      'POST',
              credentials: 'include',
              headers,
              body: JSON.stringify({
                payment_id:     internalId,
                pi_payment_id:  piPaymentId,
                transaction_id: txid,
              }),
            });
            if (res.ok) {
              done({ status: 'completed', success: true, paymentId: internalId, txid });
            } else {
              done({ status: 'error', success: false, message: 'Complete failed' });
            }
          },
          onCancel:  () => done({ status: 'cancelled', success: false }),
          onError:   (err: Error) =>
            done({ status: 'error', success: false, message: err.message }),
        },
      );
    } catch (err) {
      done({
        status:  'error',
        success: false,
        message: err instanceof Error ? err.message : 'Payment error',
      });
    }
  });
};
