import { clamp } from "lodash-es";
import { RGB } from "../types";

const bottom: RGB = [39, 69, 145];
const top: RGB = [93, 199, 174];

const diff = [top[0] - bottom[0], top[1] - bottom[1], top[2] - bottom[2]];

export function fillWithOffset(offset: number, min: number, max: number): RGB {
  const clampedOffset = clamp(offset, min, max);
  const range = max - min;
  const relativeOffset = (clampedOffset - min) / range;

  return [bottom[0] + relativeOffset * diff[0], bottom[1] + relativeOffset * diff[0], bottom[2] + relativeOffset * diff[0]];
}