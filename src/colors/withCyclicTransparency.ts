import { RGB, RGBA } from "../Color";

const BASE_COLOR: RGB = [255, 255, 255];
const PERIOD = 7;
const LOWER_ALPHA_BOUND = 20;
const UPPER_ALPHA_BOUND = 80;

const OFFSET = (LOWER_ALPHA_BOUND + UPPER_ALPHA_BOUND) / 2;
const RANGE = OFFSET - LOWER_ALPHA_BOUND;

export function withCyclicTransparency(t: number): RGBA {
  return [...BASE_COLOR, OFFSET + RANGE * Math.sin(t / PERIOD)];
}