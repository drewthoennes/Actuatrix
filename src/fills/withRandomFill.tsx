import { SEED_FILL } from "../traits";
import { randomDistribution } from "../utils/random";
import { withCyclicTransparency } from "./withCyclicTransparency";
import { withLavaFill } from "./withLavaFill";
import { withOceanFill } from "./withOceanFill";
import { withRandomCyclicFill } from "./withRandomCyclicFill";

const FILLS = {
  withCyclicTransparency,
  withRandomCyclicFill,
} as const;

const WEIGHTS: Record<keyof typeof FILLS, number> = {
  withCyclicTransparency: 1,
  withRandomCyclicFill: 9,
} as const;


export const withRandomFill = FILLS[randomDistribution(WEIGHTS, SEED_FILL)];