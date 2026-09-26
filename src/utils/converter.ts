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

  const decimalCupsFormatted = formatDecimal(rawCups);
  const fractionFormatted = formatFraction(rawCups);
  const practicalMeasure = formatPracticalMeasure(rawCups);

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
 * Formats decimal numbers cleanly (e.g. 0.833, 1.5, 2).
 */
export function formatDecimal(val: number): string {
  if (val === 0) return '0';
  if (val >= 10) {
    return Math.round(val).toString();
  }
  const formatted = val.toFixed(3);
  return parseFloat(formatted).toString();
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
export function formatPracticalMeasure(cups: number): string {
  if (cups <= 0) return '0 cups';

  const whole = Math.floor(cups);
  let remainderCups = cups - whole;
  let totalTbsp = remainderCups * 16;

  let cupPart = '';
  if (whole > 0) {
    cupPart = `${whole} ${whole === 1 ? 'cup' : 'cups'}`;
  }

  // Major fraction thresholds in tablespoons
  // ¾ cup = 12 tbsp, ⅔ cup = 10.67 tbsp, ½ cup = 8 tbsp, ⅓ cup = 5.33 tbsp, ¼ cup = 4 tbsp, ⅛ cup = 2 tbsp
  let fractionLabel = '';
  if (totalTbsp >= 11.5) {
    fractionLabel = '¾ cup';
    totalTbsp -= 12;
  } else if (totalTbsp >= 9.5) {
    fractionLabel = '⅔ cup';
    totalTbsp -= 10.667;
  } else if (totalTbsp >= 7.5) {
    fractionLabel = '½ cup';
    totalTbsp -= 8;
  } else if (totalTbsp >= 4.8) {
    fractionLabel = '⅓ cup';
    totalTbsp -= 5.333;
  } else if (totalTbsp >= 3.5) {
    fractionLabel = '¼ cup';
    totalTbsp -= 4;
  } else if (totalTbsp >= 1.8) {
    fractionLabel = '⅛ cup';
    totalTbsp -= 2;
  }

  // Combine cup parts
  const cupsCombined = [cupPart, fractionLabel].filter(Boolean).join(' + ');

  // Remaining tablespoons and teaspoons
  let tbspCount = Math.floor(totalTbsp);
  let remainingTbspFraction = totalTbsp - tbspCount;
  if (remainingTbspFraction < 0) {
    tbspCount = 0;
    remainingTbspFraction = 0;
  }

  let tspCount = Math.round(remainingTbspFraction * 3);
  if (tspCount === 3) {
    tbspCount += 1;
    tspCount = 0;
  }

  const parts: string[] = [];
  if (cupsCombined) parts.push(cupsCombined);
  if (tbspCount > 0) parts.push(`${tbspCount} ${tbspCount === 1 ? 'tbsp' : 'tbsp'}`);
  if (tspCount > 0) parts.push(`${tspCount} ${tspCount === 1 ? 'tsp' : 'tsp'}`);

  if (parts.length === 0) {
    return '0 cups';
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
      state: ingredient.state,
      method: ingredient.measurementMethod
    }
  };
}

