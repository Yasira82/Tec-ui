// ── Pi Network SDK Global Types ───────────────────────────
// يُستخدم في layout.tsx و createPayment.ts

interface PiPaymentCallbacks {
  onReadyForServerApproval: (piPaymentId: string) => void;
  onReadyForServerCompletion: (piPaymentId: string, txid: string) => void;
  onCancel:  (paymentId: string) => void;
  onError:   (error: Error, payment?: unknown) => void;
}

interface PiPaymentData {
  amount:   number;
  memo:     string;
  metadata: Record<string, unknown>;
}

interface PiSDK {
  init: (options: { version: string; sandbox: boolean; appId?: string }) => void;
  authenticate: (
    scopes:              string[],
    onIncompletePayment: (payment: unknown) => void,
  ) => Promise<{ accessToken: string; user: { uid: string; username: string } }>;
  createPayment: (data: PiPaymentData, callbacks: PiPaymentCallbacks) => void;
}

declare global {
  interface Window {
    Pi:                         PiSDK;
    __TEC_PI_READY:             boolean;
    __TEC_PI_FOREIGN_SESSION:   boolean;
    __TEC_PI_ERROR:             boolean;
  }
}

export {};
