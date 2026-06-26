import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals:     true,
    setupFiles:  ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include:  ['src/**/*.{ts,tsx}'],
      exclude:  ['src/__tests__/**', 'src/**/*.d.ts'],
      // Regression floor — ratcheted just below current actual (81.8/70.6/77.5/84.2).
      // Raise as coverage grows; never lower without justification.
      thresholds: {
        statements: 80,
        branches:   68,
        functions:  75,
        lines:      82,
      },
    },
  },
});
