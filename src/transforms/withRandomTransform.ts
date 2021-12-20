import { circularWaveTransform, linearWaveTransform, radialWaveTransform, swirlTransform } from ".";
import { SEED_TRANSFORM } from "../traits";
import { randomDistribution } from "../utils/random";
import { arrowTransform } from "./arrow";
import { axialWaveTransform } from "./axialWave";
import { revolvingSourceCircularWaveTransform } from "./revolvingSourceCircularWave";

const TRANSFORMS = {
  arrowTransform,
  axialWaveTransform,
  circularWaveTransform,
  linearWaveTransform,
  radialWaveTransform,
  revolvingSourceCircularWaveTransform,
  swirlTransform,
} as const;

const WEIGHTS: Record<keyof typeof TRANSFORMS, number> = {
  arrowTransform: 2,
  axialWaveTransform: 3,
  circularWaveTransform: 3,
  linearWaveTransform: 3,
  radialWaveTransform: 2,
  revolvingSourceCircularWaveTransform: 1,
  swirlTransform: 2,
} as const;

export const withRandomTransform = TRANSFORMS[randomDistribution(WEIGHTS, SEED_TRANSFORM)];