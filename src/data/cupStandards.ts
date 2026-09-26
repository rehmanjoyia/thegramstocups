export interface CupStandard {
  id: 'us_customary' | 'us_legal' | 'metric';
  name: string;
  shortName: string;
  volumeMl: number;
  description: string;
  isDefault: boolean;
}

export const CUP_STANDARDS: Record<string, CupStandard> = {
  us_customary: {
    id: 'us_customary',
    name: 'US Customary Cup',
    shortName: 'US Customary (236.6 mL)',
    volumeMl: 236.588,
    description: 'Standard American baking cup used in most US recipes & King Arthur charts.',
    isDefault: true
  },
  us_legal: {
    id: 'us_legal',
    name: 'US Legal / Nutrition Label Cup',
    shortName: 'US Legal (240 mL)',
    volumeMl: 240.0,
    description: 'FDA nutrition labeling standard cup (exactly 240 mL).',
    isDefault: false
  },
  metric: {
    id: 'metric',
    name: 'Metric Cup',
    shortName: 'Metric (250 mL)',
    volumeMl: 250.0,
    description: 'International & Commonwealth standard (Australia, NZ, UK, Canada).',
    isDefault: false
  }
};

export const DEFAULT_CUP_STANDARD = CUP_STANDARDS.us_customary;
