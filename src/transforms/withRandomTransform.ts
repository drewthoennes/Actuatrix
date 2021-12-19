import { circularWaveTransform, linearWaveTransform, radialWaveTransform, swirlTransform } from ".";
import { SEED_TRANSFORM } from "../traits";

// TODO: Weight these to simulate rarity
const TRANSFORMS = [
  circularWaveTransform,
  linearWaveTransform,
  radialWaveTransform,
  swirlTransform,
];
const TRANSFORM = TRANSFORMS[Math.floor(TRANSFORMS.length * SEED_TRANSFORM)];

export const withRandomTransform = TRANSFORM;