import { clamp } from "lodash-es";

export type RGB = readonly [number, number, number];
export type RGBPair = readonly [RGB, RGB];

function plus(left: RGB, right: RGB): RGB {
  return [
    clamp(left[0] + right[0], 0, 255),
    clamp(left[1] + right[1], 0, 255),
    clamp(left[2] + right[2], 0, 255),
  ];
}

function difference(left: RGB, right: RGB): RGB {
  return [right[0] - left[0], right[1] - left[1], right[2] - left[2]];
}

function average(left: RGB, right: RGB, weight?: number): RGB {
  weight = clamp(weight ?? 0.5, 0, 1);
  const diff = difference(left, right);

  return [left[0] + weight * diff[0], left[1] + weight * diff[1], left[2] + weight * diff[2]];
}

export const RGB = {
  plus,
  difference,
  average,
};