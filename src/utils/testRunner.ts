import { getIngredientById } from '../data/ingredients';
import { CUP_STANDARDS } from '../data/cupStandards';
import { convertGramsToCups, convertCupsToGrams, formatGramDecimal } from './converter';

function runTests() {
  console.log('--- STARTING CONVERSION ENGINE UNIT TESTS ---\n');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
    }
  }

  const flour = getIngredientById('flour')!;
  const butter = getIngredientById('butter')!;
  const brownSugar = getIngredientById('brown-sugar')!;
  const powderedSugar = getIngredientById('powdered-sugar')!;
  const honey = getIngredientById('honey')!;

  // Test 1: 120g All-Purpose Flour = 1 US Customary Cup
  const flour120 = convertGramsToCups(120, flour, CUP_STANDARDS.us_customary);
  assert(flour120.cups === 1, '120g flour = 1 US Customary Cup');
  assert(flour120.decimalCupsFormatted === '1', '120g flour decimal formatted is "1"');

  // Test 2: 100g Flour = 0.83 US Customary Cups & Practical measure
  const flour100 = convertGramsToCups(100, flour, CUP_STANDARDS.us_customary);
  assert(Math.abs(flour100.cups - 0.83333) < 0.001, '100g flour internal precision = 0.8333 cups');
  assert(flour100.decimalCupsFormatted === '0.83', '100g flour decimal formatted is "0.83"');
  assert(flour100.practicalMeasure.includes('¾ cup'), '100g flour practical measure includes "¾ cup"');

  // Test 3: Reverse Identity (100g -> cups -> grams)
  const cups100 = flour100.cups;
  const backToGrams = convertCupsToGrams(cups100, flour, CUP_STANDARDS.us_customary);
  assert(Math.abs(backToGrams - 100) < 0.1, 'Reverse identity 100g -> cups -> 100g');

  // Test 4: Cup standard scaling (120g flour in Metric Cup 250mL)
  const flourMetric = convertGramsToCups(120, flour, CUP_STANDARDS.metric);
  assert(Math.abs(flourMetric.cups - (236.588 / 250)) < 0.001, '120g flour in Metric Cup = 0.946 cups');

  // Test 5: Butter sticks calculation (227g = 1 cup / 2 sticks, 113.5g = 1 stick)
  const butter227 = convertGramsToCups(227, butter, CUP_STANDARDS.us_customary);
  assert(butter227.cups === 1, '227g butter = 1 cup');
  assert(Boolean(butter227.butterSticksFormatted?.includes('2 sticks')), '227g butter = 2 sticks');

  const butter113 = convertGramsToCups(113.5, butter, CUP_STANDARDS.us_customary);
  assert(butter113.cups === 0.5, '113.5g butter = 0.5 cups');
  assert(Boolean(butter113.butterSticksFormatted?.includes('1 stick')), '113.5g butter = 1 stick');

  // Test 6: Brown Sugar state metadata
  const bsResult = convertGramsToCups(100, brownSugar, CUP_STANDARDS.us_customary);
  assert(bsResult.sourceAttribution.state.toLowerCase().includes('packed'), 'Brown sugar state explicitly includes "packed"');

  // Test 7: Powdered Sugar state metadata
  const psResult = convertGramsToCups(100, powderedSugar, CUP_STANDARDS.us_customary);
  assert(psResult.sourceAttribution.state.toLowerCase().includes('unsifted'), 'Powdered sugar state explicitly includes "unsifted"');

  // Test 8: Zero input
  const zeroResult = convertGramsToCups(0, flour, CUP_STANDARDS.us_customary);
  assert(zeroResult.cups === 0 && zeroResult.practicalMeasure === '0 cups', 'Zero input returns 0 cups cleanly');

  // Test 9: Invalid negative input error handling
  try {
    convertGramsToCups(-50, flour);
    assert(false, 'Negative input should throw error');
  } catch {
    assert(true, 'Negative input throws error as expected');
  }

  // Test 10: 100g Brown Sugar practical measure matches ¼ cup + 3 tbsp + 1½ tsp (99.84g representation)
  assert(bsResult.practicalMeasure === '¼ cup + 3 tbsp + 1½ tsp', '100g brown sugar practical measure is "¼ cup + 3 tbsp + 1½ tsp"');

  // Test 11: 0.1g flour below measurable quantity explanation
  const tinyFlour = convertGramsToCups(0.1, flour, CUP_STANDARDS.us_customary);
  assert(tinyFlour.practicalMeasure === 'Less than ¼ teaspoon', '0.1g flour practical measure is "Less than ¼ teaspoon"');

  // Test 12: 1 metric cup flour converts to 126.8g formatted
  const metricFlourGrams = convertCupsToGrams(1, flour, CUP_STANDARDS.metric);
  assert(formatGramDecimal(metricFlourGrams) === '126.8', '1 metric cup flour formatted = 126.8g');

  // Test 13: Positive result below 0.01 cup displays "<0.01"
  const tinyGrams = convertGramsToCups(0.5, flour, CUP_STANDARDS.us_customary);
  assert(tinyGrams.decimalCupsFormatted === '<0.01', '0.5g flour (<0.01 cup) decimal formatted is "<0.01"');

  // Test 14: Trailing zero removal (e.g. 60g flour = 0.5 cups)
  const halfCupFlour = convertGramsToCups(60, flour, CUP_STANDARDS.us_customary);
  assert(halfCupFlour.decimalCupsFormatted === '0.5', '60g flour decimal formatted removes trailing zero to "0.5"');

  // Test 15: Finding 3 - 39.375g flour on quarter-teaspoon grid (exactly 15.75 tsp = ¼ cup + 1 tbsp + ¾ tsp)
  const flour39 = convertGramsToCups(39.375, flour, CUP_STANDARDS.us_customary);
  assert(flour39.decimalCupsFormatted === '0.33', '39.375g flour decimal formatted is "0.33"');
  assert(flour39.practicalMeasure === '¼ cup + 1 tbsp + ¾ tsp', '39.375g flour practical measure decomposes to "¼ cup + 1 tbsp + ¾ tsp"');

  // Test 16: Finding 3 - 0.5g flour (< ¼ tsp threshold) produces "Less than ¼ teaspoon"
  assert(tinyGrams.practicalMeasure === 'Less than ¼ teaspoon', '0.5g flour practical measure is "Less than ¼ teaspoon"');

  // Test 17: Finding 6 - 0.00001 cup honey raw unrounded preserved to display "<0.1"
  const honeyTinyCups = convertCupsToGrams(0.00001, honey, CUP_STANDARDS.us_customary);
  assert(formatGramDecimal(honeyTinyCups) === '<0.1', '0.00001 cup honey formats to "<0.1" grams');

  // Test 18: Finding 2 - Honey has no unverified commercial chart alternative
  assert(!honey.alternativeSources || honey.alternativeSources.length === 0, 'Honey has no unsupported alternative sources');

  console.log(`\n--- TESTS COMPLETED: ${passed}/${total} PASSED ---`);
}

runTests();
