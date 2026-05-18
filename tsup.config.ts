import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry:     { index: 'src/index.ts' },
    format:    ['cjs', 'esm'],
    dts:       true,
    sourcemap: true,
    clean:     true,
    external:  ['react', 'react-dom'],
  },
  {
    entry:     { index: 'src/payment/index.ts' },
    format:    ['cjs', 'esm'],
    dts:       true,
    sourcemap: true,
    outDir:    'dist/payment',
    external:  ['react', 'react-dom'],
  },
]);
