import { clamp } from "lodash-es";
import memoize from 'memoizee';
import { Color } from "../Color";

type FillWithOffset<C extends Color> = (offset: number, min: number, max: number, bottom: C, top: C) => C;

export const fillWithOffset = memoize<FillWithOffset<Color>>((offset, min, max, bottom, top) => {
  const diff = Color.difference(bottom, top);
  const clampedOffset = clamp(offset, min, max);
  const range = max - min;
  const relativeOffset = (clampedOffset - min) / range;

  if (Color.isRGB(bottom)) {
    return [bottom[0] + relativeOffset * diff[0], bottom[1] + relativeOffset * diff[1], bottom[2] + relativeOffset * diff[2]];
  }

  return [
    bottom[0] + relativeOffset * diff[0],
    bottom[1] + relativeOffset * diff[1],
    bottom[2] + relativeOffset * diff[2],
    bottom[3] + relativeOffset * diff[3],
  ];
}, { primitive: true });