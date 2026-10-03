import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    // Target modern mobile browsers: smaller output, no unnecessary transpilation shims
    target: 'es2022',

    // Prevent any asset from being base64-inlined (avoids +33% size bloat and
    // allows fonts/SVGs to be preloaded via <link rel="preload"> and cached immutably)
    assetsInlineLimit: 0,

    // Drop Vite's internal modulepreload polyfill — all target browsers support it natively
    modulePreload: {
      polyfill: false
    },

    // Use esbuild for faster, tighter CSS minification
    cssMinify: 'esbuild',
    cssCodeSplit: true,

    // Faster CI/Vercel builds — compressed size is calculated by Vercel's CDN anyway
    reportCompressedSize: false,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cupsToGrams: resolve(__dirname, 'cups-to-grams/index.html'),
        flour: resolve(__dirname, 'grams-to-cups/flour/index.html'),
        sugar: resolve(__dirname, 'grams-to-cups/sugar/index.html'),
        butter: resolve(__dirname, 'grams-to-cups/butter/index.html'),
        brownSugar: resolve(__dirname, 'grams-to-cups/brown-sugar/index.html'),
        powderedSugar: resolve(__dirname, 'grams-to-cups/powdered-sugar/index.html'),
        oats: resolve(__dirname, 'grams-to-cups/oats/index.html'),
        rice: resolve(__dirname, 'grams-to-cups/rice/index.html'),
        honey: resolve(__dirname, 'grams-to-cups/honey/index.html'),
        oil: resolve(__dirname, 'grams-to-cups/oil/index.html'),
        milk: resolve(__dirname, 'grams-to-cups/milk/index.html'),
        fiftyGrams: resolve(__dirname, '50-grams-to-cups/index.html'),
        hundredGrams: resolve(__dirname, '100-grams-to-cups/index.html'),
        gramsPerCup: resolve(__dirname, 'grams-per-cup/index.html'),
        cupSizes: resolve(__dirname, 'cup-sizes/index.html'),
        conversionChart: resolve(__dirname, 'conversion-chart/index.html'),
        methodology: resolve(__dirname, 'methodology/index.html'),
        howToMeasureFlour: resolve(__dirname, 'how-to-measure-flour/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html')
      },
      output: {
        // Deterministic hashed naming enables immutable long-term Vercel edge caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
