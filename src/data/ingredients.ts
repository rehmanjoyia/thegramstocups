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
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: '113.5g per half cup (1 stick)'
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
    state: 'Dry, old-fashioned rolled oats',
    gramsPerReferenceCup: 89,
    referenceCupMl: 236.588,
    measurementMethod: 'Scooped gently and leveled',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: 'Official Ingredient Weight Chart'
    },
    alternativeSources: [
      {
        name: 'USDA Food Buying Guide',
        gramsPerCup: 81,
        note: 'USDA lists 81g per cup for regular and quick rolled oats.'
      }
    ],
    confidence: 'high',
    aliases: ['old fashioned oats', 'rolled oats', 'oatmeal', 'quick oats'],
    notes: 'Steel-cut oats are much denser (approx 170g/cup). This reference applies to old-fashioned rolled oats.',
    metaDescription: 'Convert rolled oats grams to cups with source-backed references (King Arthur 89g vs USDA 81g). Get practical baking fractions.'
  },
  {
    id: 'rice',
    name: 'Uncooked White Rice',
    category: 'grain',
    state: 'Uncooked, long grain dry',
    gramsPerReferenceCup: 185,
    referenceCupMl: 236.588,
    measurementMethod: 'Scooped and leveled dry',
    primarySource: {
      name: 'USDA FoodData Central / Culinary Reference',
      publicationOrRecord: 'USDA Standard Reference Portion Data'
    },
    confidence: 'medium_pinned',
    aliases: ['white rice', 'raw rice', 'jasmine rice', 'basmati rice', 'dry rice'],
    notes: '1 cup of uncooked white rice yields approximately 3 cups of cooked rice. Cooked rice density differs significantly.',
    metaDescription: 'Convert uncooked white rice grams to cups with dry state clearly identified. See common recipe conversion tables.'
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'sweetener',
    state: 'Liquid at room temperature',
    gramsPerReferenceCup: 336,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured liquid volume (21g per tbsp × 16 tbsp)',
    primarySource: {
      name: 'King Arthur Baking Company',
      url: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
      publicationOrRecord: '21g per tablespoon'
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
    notes: 'Honey is a dense viscous liquid. 1 tablespoon weighs exactly 21 grams.',
    metaDescription: 'Convert honey grams to cups, tablespoons, and teaspoons. Source-backed at 336g/cup (21g per tbsp) for sticky ingredient accuracy.'
  },
  {
    id: 'oil',
    name: 'Vegetable / Olive Oil',
    category: 'oil',
    state: 'Liquid (density 0.915 g/mL)',
    gramsPerReferenceCup: 216,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured liquid measure',
    primarySource: {
      name: 'USDA FoodData Central',
      publicationOrRecord: 'FDC ID 171413 (Olive Oil / Vegetable Oil)'
    },
    confidence: 'medium_pinned',
    aliases: ['olive oil', 'vegetable oil', 'canola oil', 'cooking oil', 'sunflower oil'],
    notes: 'Cooking oils float on water because their density (approx 0.915 g/mL) is lower than water (1.0 g/mL).',
    metaDescription: 'Convert cooking oil grams to cups and tablespoons with liquid density (0.915 g/mL) transparency.'
  },
  {
    id: 'milk',
    name: 'Whole Milk',
    category: 'liquid',
    state: 'Liquid (density 1.03 g/mL)',
    gramsPerReferenceCup: 244,
    referenceCupMl: 236.588,
    measurementMethod: 'Poured liquid measure',
    primarySource: {
      name: 'USDA FoodData Central',
      publicationOrRecord: 'FDC ID 171265 (Whole Milk 3.25%)'
    },
    confidence: 'medium_pinned',
    aliases: ['whole milk', 'fresh milk', 'milk', 'dairy milk'],
    notes: 'Milk is slightly denser than pure water (236.6g/cup) due to milk solids, fat, and sugar content.',
    metaDescription: 'Convert whole milk grams to cups with USDA FoodData Central reference values and cup-standard options.'
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
