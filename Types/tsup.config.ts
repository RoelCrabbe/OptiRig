import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    skipNodeModulesBundle: true,
    minify: false,
    sourcemap: false,
    target: 'es2020',
});
