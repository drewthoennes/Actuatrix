import { RGB } from "../Color";
import { Fill } from "../types";

const BASE_COLOR: RGB = [255, 255, 255];
const PERIOD = 7;
const LOWER_ALPHA_BOUND = 20;
const UPPER_ALPHA_BOUND = 80;

const OFFSET = (LOWER_ALPHA_BOUND + UPPER_ALPHA_BOUND) / 2;
const RANGE = OFFSET - LOWER_ALPHA_BOUND;

export const withCyclicTransparency: Fill = ({ t }) => {
  return [...BASE_COLOR, OFFSET + RANGE * Math.sin(t / PERIOD)];
};