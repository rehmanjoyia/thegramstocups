import { CalculatorComponent } from './components/calculator.ts';
import { initNavigation } from './components/navigation.ts';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation drawer & menu toggle
  initNavigation();

  // If calculator container exists on current page, initialize calculator
  const calcContainer = document.getElementById('calculator-app');
  if (calcContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const gramsParam = urlParams.get('grams');
    const ingredientParam = urlParams.get('ingredient');
    const cupParam = urlParams.get('cup');
    const dirParam = urlParams.get('dir');

    const initialState: Record<string, any> = {};

    const dataIng = calcContainer.getAttribute('data-ingredient');
    const dataVal = calcContainer.getAttribute('data-value');
    const dataDir = calcContainer.getAttribute('data-direction');

    if (dataIng) initialState.ingredientId = dataIng;
    if (dataVal && !isNaN(parseFloat(dataVal))) initialState.value = parseFloat(dataVal);
    if (dataDir === 'ctg' || dataDir === 'cupsToGrams') initialState.direction = 'cupsToGrams';

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
      if (!gramsParam && !dataVal) initialState.value = 1;
    }

    new CalculatorComponent('calculator-app', initialState);
  }
});
