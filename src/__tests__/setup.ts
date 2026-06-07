import '@testing-library/jest-dom';
import { vi } from 'vitest';

if (typeof document !== 'undefined') {
  Object.defineProperty(document, 'cookie', {
    writable: true, configurable: true, value: '',
  });
}

// Stub crypto.randomUUID so tests don't fail in happy-dom
if (typeof crypto === 'undefined' || !crypto.randomUUID) {
  (globalThis as any).crypto = {
    randomUUID: vi.fn(() => 'test-uuid-1234'),
  };
}
