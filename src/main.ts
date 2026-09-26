import { CalculatorComponent } from './components/calculator.ts';

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL search parameters for prefilled state (e.g. /?grams=250&ingredient=flour)
  const urlParams = new URLSearchParams(window.location.search);
  const gramsParam = urlParams.get('grams');
  const ingredientParam = urlParams.get('ingredient');
  const cupParam = urlParams.get('cup');
  const dirParam = urlParams.get('dir');

  const initialState: Record<string, any> = {};

  if (gramsParam && !isNaN(parseFloat(gramsParam))) {
    initialState.value = Math.max(0, parseFloat(gramsParam));
  }
  if (ingredientParam) {
    initialState.ingredientId = ingredientParam;
  }
  if (cupParam) {
    initialState.cupStandardId = cupParam;
  }
  if (dirParam === 'ctg' || dirParam === 'cupsToGrams') {
    initialState.direction = 'cupsToGrams';
    if (!gramsParam) initialState.value = 1;
  }

  // Instantiate the interactive calculator component
  new CalculatorComponent('calculator-app', initialState);
});
