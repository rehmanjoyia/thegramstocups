export interface AlternativeSource {
  name: string;
  gramsPerCup: number;
  note: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'flour' | 'sugar' | 'butter' | 'grain' | 'liquid' | 'sweetener' | 'oil';
  state: string;
  gramsPerReferenceCup: number;
  referenceCupMl: number; // reference cup volume used by source (default: 236.588 US Customary)
  measurementMethod: string;
  primarySource: {
    name: string;
    url?: string;
    publicationOrRecord?: string;
  };
  alternativeSources?: AlternativeSource[];
  confidence: 'high' | 'medium_pinned' | 'provisional';
  aliases: string[];
  stickEquivalentGrams?: number; // e.g. butter stick = 113.5g
  tablespoonEquivalentGrams?: number; // e.g. honey tbsp = 21g
  notes: string;
  metaDescription: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'flour',
    name: 'All-Purpose Flour',
    category: 'flour',
    state: 'Dry, spooned and leveled',
    gramsPerReferenceCup: 120,
    referenceCupMl: 236.588,
    measurementMethod: 'Fluffed, spooned gently into cup, and leveled with a straight edge',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: 'Official Ingredient Weight Chart'
    },
    alternativeSources: [
      {
        name: 'USDA Food Buying Guide',
        gramsPerCup: 125,
        note: 'USDA lists enriched white flour at 125g per cup using standard commercial packing.'
      }
    ],
    confidence: 'high',
    aliases: ['ap flour', 'white flour', 'plain flour', 'all purpose flour'],
    notes: 'Flour density varies greatly with technique. Dipping a measuring cup directly into a flour bag packs it down, resulting in up to 140g per cup.',
    metaDescription: 'Convert flour grams to cups with a source-backed 120g/cup reference (King Arthur Baking). Includes practical kitchen fractions and spooning tips.'
  },
  {
    id: 'sugar',
    name: 'Granulated White Sugar',
    category: 'sugar',
    state: 'Granulated, dry',
    gramsPerReferenceCup: 198,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured or scooped and leveled',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: 'Official Ingredient Weight Chart'
    },
    alternativeSources: [
      {
        name: 'Standard Kitchen Chart Rounding',
        gramsPerCup: 200,
        note: 'Many general recipe conversion charts round granulated sugar to 200g per cup.'
      }
    ],
    confidence: 'high',
    aliases: ['white sugar', 'table sugar', 'granulated sugar', 'sugar'],
    notes: 'Granulated sugar has a consistent density because crystals do not pack or compress significantly.',
    metaDescription: 'Convert granulated white sugar grams to cups using source-backed weights. Get precise decimal cups, kitchen fractions, and quick baking charts.'
  },
  {
    id: 'butter',
    name: 'Butter',
    category: 'butter',
    state: 'Solid / softened (standard stick)',
    gramsPerReferenceCup: 227,
    referenceCupMl: 236.588,
    measurementMethod: 'Packed solid into cup or measured by stick',
    primarySource: {
      name: "Land O'Lakes",
      url: 'https://www.landolakes.com/kitchen-reference/measurements-abbreviations/',
      publicationOrRecord: 'Specific butter conversion table, 1 cup = 227g (2 sticks)'
    },
    confidence: 'high',
    aliases: ['unsalted butter', 'salted butter', 'butter stick'],
    stickEquivalentGrams: 113.5,
    notes: '1 cup of butter equals 2 standard US sticks (8 tablespoons or 227g). 1 stick equals 1/2 cup (113.5g).',
    metaDescription: 'Convert butter grams to cups, sticks, and tablespoons. Source-backed at 227g per cup (113.5g per stick) for precise baking.'
  },
  {
    id: 'brown-sugar',
    name: 'Brown Sugar (Packed)',
    category: 'sugar',
    state: 'Firmly packed',
    gramsPerReferenceCup: 213,
    referenceCupMl: 236.588,
    measurementMethod: 'Firmly packed into measuring cup until it holds its shape',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: 'Official Ingredient Weight Chart'
    },
    alternativeSources: [
      {
        name: 'Unpacked / Loose Brown Sugar',
        gramsPerCup: 170,
        note: 'Unpacked brown sugar weighs roughly 170g per cup.'
      }
    ],
    confidence: 'high',
    aliases: ['light brown sugar', 'dark brown sugar', 'packed brown sugar'],
    notes: 'Standard baking recipes specify packed brown sugar. If your recipe calls for unpacked brown sugar, density is lower.',
    metaDescription: 'Convert packed brown sugar grams to cups with a source-backed 213g reference weight. Exposes packed vs loose preparation state.'
  },
  {
    id: 'powdered-sugar',
    name: 'Powdered / Confectioners\' Sugar',
    category: 'sugar',
    state: 'Unsifted',
    gramsPerReferenceCup: 113,
    referenceCupMl: 236.588,
    measurementMethod: 'Lightly spooned into cup unsifted',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: 'Official Ingredient Weight Chart'
    },
    alternativeSources: [
      {
        name: 'Sifted Powdered Sugar',
        gramsPerCup: 100,
        note: 'Sifted powdered sugar contains more air pockets and weighs approximately 100g per cup.'
      }
    ],
    confidence: 'high',
    aliases: ['icing sugar', 'confectioners sugar', '10x sugar', 'powdered sugar'],
    notes: 'Always verify if a recipe asks to measure powdered sugar before or after sifting.',
    metaDescription: 'Convert powdered sugar (icing sugar) grams to cups with clear unsifted (113g/cup) vs sifted (100g/cup) reference disclosures.'
  },
  {
    id: 'oats',
    name: 'Rolled Oats',
    category: 'grain',
    state: 'Dry old-fashioned or quick-cooking oats',
    gramsPerReferenceCup: 89,
    referenceCupMl: 236.588,
    measurementMethod: 'Scooped gently and leveled',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: 'Official Ingredient Weight Chart (Oats: old-fashioned or quick-cooking)'
    },
    alternativeSources: [
      {
        name: 'King Arthur Branded Rolled Oats',
        gramsPerCup: 113,
        note: 'Branded King Arthur Rolled Oats product is listed separately at 113g per cup.'
      },
      {
        name: 'USDA Food Buying Guide',
        gramsPerCup: 81,
        note: 'USDA lists 81g per cup for regular and quick rolled oats.'
      }
    ],
    confidence: 'high',
    aliases: ['old fashioned oats', 'rolled oats', 'oatmeal', 'quick oats'],
    notes: 'Generic dry oat reference of 89g per cup. Steel-cut oats are much denser (approx 170g/cup).',
    metaDescription: 'Convert rolled oats grams to cups with source-backed references (King Arthur 89g vs USDA 81g). Get practical baking fractions.'
  },
  {
    id: 'rice',
    name: 'Uncooked White Rice',
    category: 'grain',
    state: 'Raw, regular long-grain white rice',
    gramsPerReferenceCup: 185,
    referenceCupMl: 236.588,
    measurementMethod: 'Scooped and leveled dry (USDA 1 cup reference)',
    primarySource: {
      name: 'USDA Home and Garden Bulletin 72 (Nutritive Value of Foods)',
      url: 'https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf#page=56',
      publicationOrRecord: 'Printed p. 50, food 635 (White, long grain, regular, raw)'
    },
    confidence: 'high',
    aliases: ['white rice', 'raw rice', 'jasmine rice', 'basmati rice', 'dry rice'],
    notes: '1 cup of uncooked white rice yields approximately 3 cups of cooked rice. Cooked rice density differs significantly.',
    metaDescription: 'Convert uncooked white rice grams to cups with dry state clearly identified. See common recipe conversion tables.'
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'sweetener',
    state: 'Strained or extracted honey',
    gramsPerReferenceCup: 339,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured liquid measure (USDA 1 cup reference)',
    primarySource: {
      name: 'USDA Home and Garden Bulletin 72 (Nutritive Value of Foods)',
      url: 'https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf#page=80',
      publicationOrRecord: 'Printed p. 74, food 1005 (Honey, strained or extracted, 1 cup)'
    },
    alternativeSources: [
      {
        name: 'Commercial Conversion Charts',
        gramsPerCup: 340,
        note: 'Many commercial kitchen charts round honey density to 340g per cup.'
      }
    ],
    confidence: 'high',
    aliases: ['pure honey', 'raw honey', 'liquid honey'],
    tablespoonEquivalentGrams: 21,
    notes: 'Honey is a dense viscous liquid. 1 cup weighs 339 grams based on USDA HG72.',
    metaDescription: 'Convert honey grams to cups, tablespoons, and teaspoons. Source-backed at 339g/cup (USDA HG72) for sticky ingredient accuracy.'
  },
  {
    id: 'oil',
    name: 'Olive Oil',
    category: 'oil',
    state: 'Olive oil; not every cooking oil',
    gramsPerReferenceCup: 216,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured liquid measure (USDA 1 cup reference)',
    primarySource: {
      name: 'USDA Home and Garden Bulletin 72 (Nutritive Value of Foods)',
      url: 'https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf#page=30',
      publicationOrRecord: 'Printed p. 24, food 175 (Olive oil, 1 cup)'
    },
    confidence: 'high',
    aliases: ['olive oil', 'cooking oil', 'oil'],
    notes: 'Olive oil reference weight from USDA HG72 (216g per US cup). Does not represent every cooking oil.',
    metaDescription: 'Convert olive oil grams to cups and tablespoons with USDA reference values (216g per US cup).'
  },
  {
    id: 'milk',
    name: 'Whole Milk',
    category: 'liquid',
    state: 'Fluid whole milk, 3.3% fat',
    gramsPerReferenceCup: 244,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured liquid measure (USDA 1 cup reference)',
    primarySource: {
      name: 'USDA Home and Garden Bulletin 72 (Nutritive Value of Foods)',
      url: 'https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf#page=26',
      publicationOrRecord: 'Printed p. 20, food 118 (Fluid whole milk, 1 cup)'
    },
    confidence: 'high',
    aliases: ['whole milk', 'fresh milk', 'milk', 'dairy milk'],
    notes: 'Whole milk reference from USDA HG72 (3.3% fat, 244g per US cup). Does not describe condensed, evaporated or plant-based milks.',
    metaDescription: 'Convert whole milk grams to cups with USDA reference values (244g per US cup).'
  }
];

export function getIngredientById(id: string): Ingredient | undefined {
  return INGREDIENTS.find(item => item.id === id);
}

export function searchIngredients(query: string): Ingredient[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return INGREDIENTS;
  return INGREDIENTS.filter(item => 
    item.name.toLowerCase().includes(cleanQuery) ||
    item.aliases.some(alias => alias.toLowerCase().includes(cleanQuery))
  );
}
