import type { Ingredient } from '../data/ingredients.ts';
import type { CupStandard } from '../data/cupStandards.ts';
import { DEFAULT_CUP_STANDARD } from '../data/cupStandards.ts';

export interface ConversionResult {
  grams: number;
  cups: number;
  decimalCupsFormatted: string;
  fractionFormatted: string;
  practicalMeasure: string;
  butterSticksFormatted?: string;
  tablespoonFormatted?: string;
  teaspoonFormatted?: string;
  ingredient: Ingredient;
  cupStandard: CupStandard;
  sourceAttribution: {
    sourceName: string;
    gramsPerCupReference: number;
    effectiveGramsPerCup?: number;
    state: string;
    method: string;
  };
  alternateComparison?: {
    sourceName: string;
    grams: number;
    cups: number;
    note: string;
  };
}

export interface KitchenFraction {
  decimal: number;
  label: string;
  unicode: string;
}

export const KITCHEN_FRACTIONS: KitchenFraction[] = [
  { decimal: 0.125, label: '1/8', unicode: '⅛' },
  { decimal: 0.25, label: '1/4', unicode: '¼' },
  { decimal: 0.33333, label: '1/3', unicode: '⅓' },
  { decimal: 0.375, label: '3/8', unicode: '⅜' },
  { decimal: 0.5, label: '1/2', unicode: '½' },
  { decimal: 0.625, label: '5/8', unicode: '⅝' },
  { decimal: 0.66667, label: '2/3', unicode: '⅔' },
  { decimal: 0.75, label: '3/4', unicode: '¾' },
  { decimal: 0.875, label: '7/8', unicode: '⅞' }
];

/**
 * Converts grams to cups for a specific ingredient and cup standard.
 */
export function convertGramsToCups(
  grams: number,
  ingredient: Ingredient,
  cupStandard: CupStandard = DEFAULT_CUP_STANDARD
): ConversionResult {
  if (grams < 0 || isNaN(grams) || !isFinite(grams)) {
    throw new Error('Invalid grams input');
  }

  if (grams === 0) {
    return createZeroResult(ingredient, cupStandard);
  }

  // Adjusted grams per cup based on target cup volume vs reference cup volume
  const effectiveGramsPerCup = ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl);
  const rawCups = grams / effectiveGramsPerCup;

  const decimalCupsFormatted = formatCupDecimal(rawCups);
  const fractionFormatted = formatFraction(rawCups);
  const practicalMeasure = formatPracticalMeasure(rawCups, cupStandard);

  let butterSticksFormatted: string | undefined;
  if (ingredient.id === 'butter') {
    const sticks = grams / 113.5;
    butterSticksFormatted = formatSticks(sticks);
  }

  let tablespoonFormatted: string | undefined;
  let teaspoonFormatted: string | undefined;
  const totalTbsp = rawCups * 16;
  tablespoonFormatted = `${formatDecimal(totalTbsp)} tbsp`;
  teaspoonFormatted = `${formatDecimal(totalTbsp * 3)} tsp`;

  let alternateComparison: ConversionResult['alternateComparison'];
  if (ingredient.alternativeSources && ingredient.alternativeSources.length > 0) {
    const primaryAlt = ingredient.alternativeSources[0];
    const altEffectiveGrams = primaryAlt.gramsPerCup * (cupStandard.volumeMl / ingredient.referenceCupMl);
    const altCups = grams / altEffectiveGrams;
    alternateComparison = {
      sourceName: primaryAlt.name,
      grams,
      cups: altCups,
      note: primaryAlt.note
    };
  }


  return {
    grams,
    cups: rawCups,
    decimalCupsFormatted,
    fractionFormatted,
    practicalMeasure,
    butterSticksFormatted,
    tablespoonFormatted,
    teaspoonFormatted,
    ingredient,
    cupStandard,
    sourceAttribution: {
      sourceName: ingredient.primarySource.name,
      gramsPerCupReference: ingredient.gramsPerReferenceCup,
      effectiveGramsPerCup: Math.round(effectiveGramsPerCup * 10) / 10,
      state: ingredient.state,
      method: ingredient.measurementMethod
    },
    alternateComparison
  };
}

/**
 * Converts cups to grams for a specific ingredient and cup standard.
 */
export function convertCupsToGrams(
  cups: number,
  ingredient: Ingredient,
  cupStandard: CupStandard = DEFAULT_CUP_STANDARD
): number {
  if (cups < 0 || isNaN(cups) || !isFinite(cups)) {
    throw new Error('Invalid cups input');
  }
  if (cups === 0) return 0;

  const scaleFactor = cupStandard.volumeMl / ingredient.referenceCupMl;
  const rawGrams = cups * ingredient.gramsPerReferenceCup * scaleFactor;
  return Math.round(rawGrams * 10) / 10;
}

/**
 * Formats decimal cups according to the site rounding policy:
 * - Up to two decimal places across calculators and conversion tables.
 * - Conventional rounding with halfway values rounded up.
 * - Removes unnecessary trailing zeros (e.g. 1, 0.5, 0.83).
 * - For any positive result below 0.01 cup, displays "<0.01".
 * - Exact zero displays "0".
 */
export function formatCupDecimal(cups: number): string {
  if (cups <= 0) return '0';
  if (cups < 0.01) return '<0.01';

  // Conventional rounding with halfway values rounded up
  const rounded = Number(Math.round(Number(cups + 'e2')) + 'e-2');
  return rounded.toString();
}

/**
 * Formats general decimal numbers cleanly (up to 1 decimal place for grams/spoons).
 */
export function formatDecimal(val: number): string {
  if (val === 0) return '0';
  if (val >= 10) {
    return (Math.round(val * 10) / 10).toString();
  }
  const formatted = (Math.round(val * 10) / 10).toString();
  return formatted;
}

/**
 * Converts decimal cups to the nearest familiar kitchen fraction string.
 */
export function formatFraction(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;

  if (remainder < 0.05) {
    return whole > 0 ? `${whole}` : '0';
  }
  if (remainder > 0.95) {
    return `${whole + 1}`;
  }

  let closest: KitchenFraction | null = null;
  let minDiff = 1;

  for (const frac of KITCHEN_FRACTIONS) {
    const diff = Math.abs(remainder - frac.decimal);
    if (diff < minDiff) {
      minDiff = diff;
      closest = frac;
    }
  }

  if (closest && minDiff < 0.06) {
    return whole > 0 ? `${whole} ${closest.unicode}` : closest.unicode;
  }

  return formatDecimal(cups);
}

/**
 * Decomposes cups into practical kitchen measures: whole cups + ¾, ½, ⅓, ¼ cup + tbsp + tsp.
 */
export function formatPracticalMeasure(
  cups: number,
  cupStandard: CupStandard = DEFAULT_CUP_STANDARD
): string {
  if (cups <= 0) return '0 cups';

  // Number of quarter-teaspoons per cup:
  // US Customary / US Legal: 16 tbsp * 3 tsp * 4 = 192 quarter-tsp.
  // Metric (250 mL): 250 mL / 1.25 mL = 200 quarter-tsp.
  const unitsPerCup = cupStandard.id === 'metric' ? 200 : 192;
  const totalQuarterTsp = cups * unitsPerCup;

  // Below-measurable-quantity threshold (under 0.75 quarter-teaspoon)
  if (totalQuarterTsp < 0.75) {
    return 'Less than ¼ teaspoon';
  }

  let units = Math.round(totalQuarterTsp);
  const wholeCups = Math.floor(units / unitsPerCup);
  units = units % unitsPerCup;

  let cupPart = '';
  if (wholeCups > 0) {
    cupPart = wholeCups === 1 ? '1 cup' : `${wholeCups} cups`;
  }

  let fractionPart = '';
  // Fractional cup thresholds (in quarter-teaspoons)
  const threeQuarter = Math.round(unitsPerCup * 0.75); // 144 US, 150 Metric
  const twoThirds = Math.round(unitsPerCup * (2 / 3)); // 128 US, 133 Metric
  const half = Math.round(unitsPerCup * 0.5);          // 96 US, 100 Metric
  const oneThird = Math.round(unitsPerCup * (1 / 3));  // 64 US, 67 Metric
  const oneQuarter = Math.round(unitsPerCup * 0.25);   // 48 US, 50 Metric

  // Check near-exact ⅔ or ⅓ match
  if (Math.abs(units - twoThirds) <= 1) {
    fractionPart = '⅔ cup';
    units -= twoThirds;
  } else if (Math.abs(units - oneThird) <= 1) {
    fractionPart = '⅓ cup';
    units -= oneThird;
  } else if (units >= threeQuarter) {
    fractionPart = '¾ cup';
    units -= threeQuarter;
  } else if (units >= half) {
    fractionPart = '½ cup';
    units -= half;
  } else if (units >= oneQuarter) {
    fractionPart = '¼ cup';
    units -= oneQuarter;
  }

  // If a major cup fraction was selected and remaining units is merely a tiny residual (<= 1 quarter-tsp), drop it for clean kitchen fractions
  if (fractionPart && units <= 1) {
    units = 0;
  }

  // 1 tablespoon = 3 teaspoons = 12 quarter-teaspoons (in both US and 15mL metric tbsp)
  const tbspUnits = 12;
  let tbsp = Math.floor(units / tbspUnits);
  units = units % tbspUnits;

  // 1 teaspoon = 4 quarter-teaspoons
  const tspWhole = Math.floor(units / 4);
  const remQuarter = units % 4;

  let tspStr = '';
  if (tspWhole > 0 && remQuarter === 2) {
    tspStr = `${tspWhole}½ tsp`;
  } else if (tspWhole > 0 && remQuarter === 0) {
    tspStr = `${tspWhole} tsp`;
  } else if (tspWhole === 0 && remQuarter === 2) {
    tspStr = '½ tsp';
  } else if (tspWhole === 0 && remQuarter === 1) {
    tspStr = '¼ tsp';
  } else if (tspWhole === 0 && remQuarter === 3) {
    tspStr = '¾ tsp';
  } else if (tspWhole > 0 && remQuarter > 0) {
    tspStr = `${tspWhole + remQuarter / 4} tsp`;
  }

  const parts: string[] = [];
  const combinedCups = [cupPart, fractionPart].filter(Boolean).join(' + ');
  if (combinedCups) parts.push(combinedCups);
  if (tbsp > 0) parts.push(`${tbsp} tbsp`);
  if (tspStr) parts.push(tspStr);

  if (parts.length === 0) {
    return 'Less than ¼ teaspoon';
  }

  return parts.join(' + ');
}

/**
 * Formats stick count for butter.
 */
export function formatSticks(sticks: number): string {
  if (sticks === 0) return '0 sticks';
  if (sticks === 1) return '1 stick';
  if (sticks === 0.5) return '½ stick (4 tbsp)';
  if (sticks === 0.25) return '¼ stick (2 tbsp)';

  const formatted = Math.round(sticks * 100) / 100;
  return `${formatted} sticks`;
}

function createZeroResult(ingredient: Ingredient, cupStandard: CupStandard): ConversionResult {
  return {
    grams: 0,
    cups: 0,
    decimalCupsFormatted: '0',
    fractionFormatted: '0',
    practicalMeasure: '0 cups',
    butterSticksFormatted: ingredient.id === 'butter' ? '0 sticks' : undefined,
    tablespoonFormatted: '0 tbsp',
    teaspoonFormatted: '0 tsp',
    ingredient,
    cupStandard,
    sourceAttribution: {
      sourceName: ingredient.primarySource.name,
      gramsPerCupReference: ingredient.gramsPerReferenceCup,
      effectiveGramsPerCup: Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10,
      state: ingredient.state,
      method: ingredient.measurementMethod
    }
  };
}

