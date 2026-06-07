import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatPi, parsePiAmount, formatDate, generateRequestId, buildBffHeaders } from '../utils';

describe('formatPi', () => {
  it('formats number with 2 decimal places by default', () => {
    expect(formatPi(3.14159)).toBe('3.14π');
  });

  it('formats string input', () => {
    expect(formatPi('5.5')).toBe('5.50π');
  });

  it('respects custom decimals', () => {
    expect(formatPi(10, 4)).toBe('10.0000π');
  });

  it('returns 0π for NaN input', () => {
    expect(formatPi('not-a-number')).toBe('0π');
  });

  it('handles zero', () => {
    expect(formatPi(0)).toBe('0.00π');
  });
});

describe('parsePiAmount', () => {
  it('strips π and returns number', () => {
    expect(parsePiAmount('3.14π')).toBe(3.14);
  });

  it('works without π suffix', () => {
    expect(parsePiAmount('10.5')).toBe(10.5);
  });

  it('returns 0 for invalid input', () => {
    expect(parsePiAmount('abc')).toBe(0);
  });

  it('handles leading/trailing whitespace', () => {
    expect(parsePiAmount('  5.00π  ')).toBe(5);
  });
});

describe('formatDate', () => {
  it('formats a Date object', () => {
    const d = new Date('2025-01-15T10:00:00Z');
    const result = formatDate(d);
    expect(result).toContain('Jan');
    expect(result).toContain('15');
  });

  it('formats a date string', () => {
    const result = formatDate('2025-06-01T00:00:00Z');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('respects custom options', () => {
    const d = new Date('2025-01-15T10:00:00Z');
    const result = formatDate(d, { year: 'numeric' });
    expect(result).toContain('2025');
  });
});

describe('generateRequestId', () => {
  it('returns a non-empty string', () => {
    const id = generateRequestId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('returns unique values on each call', () => {
    // Override with real unique values for this test
    let counter = 0;
    vi.spyOn(globalThis.crypto, 'randomUUID').mockImplementation(() => `uuid-${++counter}` as any);
    const id1 = generateRequestId();
    const id2 = generateRequestId();
    expect(id1).not.toBe(id2);
    vi.restoreAllMocks();
  });
});

describe('buildBffHeaders', () => {
  it('includes Content-Type and x-request-id', () => {
    const headers = buildBffHeaders();
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['x-request-id']).toBeTruthy();
  });

  it('includes x-csrf-token when provided', () => {
    const headers = buildBffHeaders('my-csrf-token');
    expect(headers['x-csrf-token']).toBe('my-csrf-token');
  });

  it('omits x-csrf-token when not provided', () => {
    const headers = buildBffHeaders();
    expect(headers['x-csrf-token']).toBeUndefined();
  });
});
