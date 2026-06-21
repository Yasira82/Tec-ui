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
      // Regression floor — set just below current (77/67/73/81). Raise as coverage grows.
      thresholds: {
        statements: 72,
        branches:   62,
        functions:  68,
        lines:      75,
      },
    },
  },
});
