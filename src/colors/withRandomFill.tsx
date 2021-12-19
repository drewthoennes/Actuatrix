import { SEED_FILL } from "../traits";
import { withCyclicTransparency } from "./withCyclicTransparency";
import { withLavaFill } from "./withLavaFill";
import { withOceanFill } from "./withOceanFill";

const FILLS = [
  withCyclicTransparency,
  withLavaFill,
  withOceanFill,
];
const FILL = FILLS[Math.floor(FILLS.length * SEED_FILL)];

export const withRandomFill = FILL;