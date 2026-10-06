import { keyFeaturesAr1, type FeatureGroupAr } from './key-features-ar-1';
import { keyFeaturesAr2 } from './key-features-ar-2';
import { keyFeaturesAr3 } from './key-features-ar-3';
import { keyFeaturesAr4 } from './key-features-ar-4';

export type { FeatureGroupAr };

// Arabic translations of key_features, same slug/group/point order as src/data/details/*.json.
export const keyFeaturesAr: Record<string, FeatureGroupAr[]> = {
  ...keyFeaturesAr1,
  ...keyFeaturesAr2,
  ...keyFeaturesAr3,
  ...keyFeaturesAr4,
};
