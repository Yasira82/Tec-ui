export const formatPi = (amount: number | string, decimals = 2): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0π';
  return `${num.toFixed(decimals)}π`;
};

export const parsePiAmount = (value: string): number => {
  const parsed = parseFloat(value.replace(/π/g, '').trim());
  return isNaN(parsed) ? 0 : parsed;
};

export const formatDate = (
  date:    string | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', options ?? {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

export const generateRequestId = (): string => crypto.randomUUID();

export const buildBffHeaders = (csrfToken?: string): Record<string, string> => ({
  'Content-Type':  'application/json',
  'x-request-id': generateRequestId(),
  ...(csrfToken ? { 'x-csrf-token': csrfToken } : {}),
});
