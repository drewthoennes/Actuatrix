import { clamp } from "lodash-es";
import memoize from 'memoizee';
import { RGB } from "../Color";

export const fillWithOffset = memoize((offset: number, min: number, max: number, bottom: RGB, top: RGB): RGB => {
  const diff = [top[0] - bottom[0], top[1] - bottom[1], top[2] - bottom[2]];
  const clampedOffset = clamp(offset, min, max);
  const range = max - min;
  const relativeOffset = (clampedOffset - min) / range;

  return [bottom[0] + relativeOffset * diff[0], bottom[1] + relativeOffset * diff[0], bottom[2] + relativeOffset * diff[0]];
}, { primitive: true });