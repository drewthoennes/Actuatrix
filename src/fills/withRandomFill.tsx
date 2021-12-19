import { SEED_FILL } from "../traits";
import { randomDistribution } from "../utils/random";
import { withCyclicTransparency } from "./withCyclicTransparency";
import { withLavaFill } from "./withLavaFill";
import { withOceanFill } from "./withOceanFill";
import { withRandomCyclicFill } from "./withRandomCyclicFill";

const FILLS = {
  withCyclicTransparency,
  withLavaFill,
  withOceanFill,
  withRandomCyclicFill,
} as const;

const WEIGHTS: Record<keyof typeof FILLS, number> = {
  withCyclicTransparency: 2,
  withLavaFill: 1,
  withOceanFill: 1,
  withRandomCyclicFill: 4,
} as const;


export const withRandomFill = FILLS[randomDistribution(WEIGHTS, SEED_FILL)];