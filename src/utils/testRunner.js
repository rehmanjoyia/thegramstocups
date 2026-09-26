import { INGREDIENTS, getIngredientById } from '../data/ingredients.ts';
import { CUP_STANDARDS } from '../data/cupStandards.ts';
import { convertGramsToCups, convertCupsToGrams } from './converter.ts';

console.log('--- STARTING CONVERSION ENGINE UNIT TESTS ---\n');
let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

const flour = getIngredientById('flour');
const butter = getIngredientById('butter');
const brownSugar = getIngredientById('brown-sugar');
const powderedSugar = getIngredientById('powdered-sugar');

// Test 1: 120g All-Purpose Flour = 1 US Customary Cup
const flour120 = convertGramsToCups(120, flour, CUP_STANDARDS.us_customary);
assert(flour120.cups === 1, '120g flour = 1 US Customary Cup');
assert(flour120.decimalCupsFormatted === '1', '120g flour decimal formatted is "1"');

// Test 2: 100g Flour = 0.833 US Customary Cups & Practical measure
const flour100 = convertGramsToCups(100, flour, CUP_STANDARDS.us_customary);
assert(Math.abs(flour100.cups - 0.83333) < 0.001, '100g flour = 0.8333 cups');
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
assert(butter227.butterSticksFormatted && butter227.butterSticksFormatted.includes('2 sticks'), '227g butter = 2 sticks');

const butter113 = convertGramsToCups(113.5, butter, CUP_STANDARDS.us_customary);
assert(butter113.cups === 0.5, '113.5g butter = 0.5 cups');
assert(butter113.butterSticksFormatted && butter113.butterSticksFormatted.includes('1 stick'), '113.5g butter = 1 stick');

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
} catch (e) {
  assert(true, 'Negative input throws error as expected');
}

console.log(`\n--- TESTS COMPLETED: ${passed}/${total} PASSED ---`);
