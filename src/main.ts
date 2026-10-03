import { CalculatorComponent } from './components/calculator.ts';
import { initNavigation } from './components/navigation.ts';
import { initContactForm } from './components/contactForm.ts';
import { INGREDIENTS } from './data/ingredients.ts';
import { CUP_STANDARDS } from './data/cupStandards.ts';

const VALID_INGREDIENT_IDS = new Set(INGREDIENTS.map(i => i.id));
const VALID_CUP_STANDARD_IDS = new Set(Object.keys(CUP_STANDARDS));

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation drawer & menu toggle
  initNavigation();

  // Initialize contact form if present on current page
  initContactForm();

  // Initialize print chart button if present
  const printBtn = document.getElementById('btn-print-chart');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

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

    if (dataIng && VALID_INGREDIENT_IDS.has(dataIng)) initialState.ingredientId = dataIng;
    if (dataVal && !isNaN(parseFloat(dataVal))) initialState.value = parseFloat(dataVal);
    if (dataDir === 'ctg' || dataDir === 'cupsToGrams') initialState.direction = 'cupsToGrams';

    if (gramsParam) {
      const parsed = parseFloat(gramsParam);
      // Clamp to [0, 100000] — same upper bound enforced by parseInputValue()
      if (!isNaN(parsed) && isFinite(parsed)) {
        initialState.value = Math.min(Math.max(0, parsed), 100_000);
      }
    }
    if (ingredientParam && VALID_INGREDIENT_IDS.has(ingredientParam)) {
      initialState.ingredientId = ingredientParam;
    }
    if (cupParam && VALID_CUP_STANDARD_IDS.has(cupParam)) {
      initialState.cupStandardId = cupParam;
    }
    if (dirParam === 'ctg' || dirParam === 'cupsToGrams') {
      initialState.direction = 'cupsToGrams';
      if (!gramsParam && !dataVal) initialState.value = 1;
    }

    new CalculatorComponent('calculator-app', initialState);
  }
});
