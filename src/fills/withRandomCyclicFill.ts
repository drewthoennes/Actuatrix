import { Color } from "../Color";
import { SEED_FILL, SEED_FILL_TRANSPARENT } from "../traits";
import { Fill } from "../types";
import { randomRGBA } from "../utils/random";
import { fillWithOffset } from "./fillWithOffset";

const bottom = randomRGBA(SEED_FILL, SEED_FILL_TRANSPARENT);
const top = randomRGBA(SEED_FILL + 1, SEED_FILL_TRANSPARENT);

export const withRandomCyclicFill: Fill = ({ offset, min, max }) => {
  return fillWithOffset(offset, min, max, bottom, top);
}