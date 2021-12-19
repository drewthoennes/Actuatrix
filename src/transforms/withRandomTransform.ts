import { circularWaveTransform, linearWaveTransform, radialWaveTransform, swirlTransform } from ".";
import { SEED_TRANSFORM } from "../traits";
import { revolvingSourceCircularWaveTransform } from "./revolvingSourceCircularWave";

// TODO: Weight these to simulate rarity
const TRANSFORMS = [
  circularWaveTransform,
  linearWaveTransform,
  radialWaveTransform,
  revolvingSourceCircularWaveTransform,
  swirlTransform,
];
const TRANSFORM = TRANSFORMS[Math.floor(TRANSFORMS.length * SEED_TRANSFORM)];

export const withRandomTransform = TRANSFORM;