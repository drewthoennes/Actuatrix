import { SEED_FILL } from "../traits";
import { withCyclicTransparency } from "./withCyclicTransparency";
import { withLavaFill } from "./withLavaFill";
import { withOceanFill } from "./withOceanFill";
import { withRandomCyclicFill } from "./withRandomCyclicFill";

const FILLS = [
  withCyclicTransparency,
  withLavaFill,
  withOceanFill,
  withRandomCyclicFill,
];
const FILL = FILLS[Math.floor(FILLS.length * SEED_FILL)];

export const withRandomFill = FILL;