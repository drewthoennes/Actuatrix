import { circularWaveTransform, linearWaveTransformation, radialWaveTransform, swirlTransform } from ".";
import { SEED_AS_DECIMAL } from "../constants";

// TODO: Weight these to simulate rarity
const TRANSFORMS = [
  circularWaveTransform,
  linearWaveTransformation,
  radialWaveTransform,
  swirlTransform,
];
const TRANSFORM = TRANSFORMS[Math.floor(TRANSFORMS.length * SEED_AS_DECIMAL)];

export const withRandomTransform = TRANSFORM;