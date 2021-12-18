import { SEED_AS_DECIMAL } from "../constants";
import { withCyclicTransparency } from "./withCyclicTransparency";
import { withLavaFill } from "./withLavaFill";
import { withOceanFill } from "./withOceanFill";

console.log(SEED_AS_DECIMAL);

const FILLS = [
  withCyclicTransparency,
  withLavaFill,
  withOceanFill,
];
const FILL = FILLS[Math.floor(FILLS.length * SEED_AS_DECIMAL)];

export const withRandomFill = FILL;