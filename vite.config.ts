import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
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
      }
    }
  }
});
