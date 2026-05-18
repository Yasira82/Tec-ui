import { TEC_DOMAINS } from '../constants';

export interface HubPayParams {
  amount:    number;
  memo:      string;
  productId: string;
  returnUrl: string;
  source:    string;
}

export const buildHubPayUrl = (params: HubPayParams): string =>
  `${TEC_DOMAINS.HUB}/hub?pay=1`
  + `&amount=${params.amount}`
  + `&memo=${encodeURIComponent(params.memo)}`
  + `&product_id=${encodeURIComponent(params.productId)}`
  + `&return_url=${encodeURIComponent(params.returnUrl)}`
  + `&source=${params.source}`;

export const handleBuy = (params: HubPayParams): void => {
  window.location.href = buildHubPayUrl(params);
};

export interface PaymentReturnParams {
  status:    string | null;
  txid:      string | null;
  paymentId: string | null;
  productId: string | null;
}

export const getPaymentReturnParams = (): PaymentReturnParams => {
  if (typeof window === 'undefined') {
    return { status: null, txid: null, paymentId: null, productId: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    status:    params.get('payment_status'),
    txid:      params.get('txid'),
    paymentId: params.get('payment_id'),
    productId: params.get('product_id'),
  };
};

export const clearPaymentParams = (): void => {
  window.history.replaceState({}, '', window.location.pathname);
};
