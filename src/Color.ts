import { clamp } from "lodash-es";
import { Pair } from "./types";

export type RGB = readonly [number, number, number];
export type RGBA = readonly [number, number, number, number];
export type Color = RGB | RGBA;

export type RGBPair = Pair<RGB>;
export type RGBAPair = Pair<RGBA>;
export type ColorPair = Pair<Color>;

type ColorCompareFn<C, A extends any[] = []> = (left: C, right: C, ...args: A) => C;

function isRGB(color: Color): color is RGB {
  return color.length === 3;
}

function isRGBA(color: Color): color is RGBA {
  return color.length === 4;
}

const plus: ColorCompareFn<Color> = (left, right) => {
  if (isRGB(left)) {
    return [
      clamp(left[0] + right[0], 0, 255),
      clamp(left[1] + right[1], 0, 255),
      clamp(left[2] + right[2], 0, 255),
    ];
  }

  return [
    clamp(left[0] + right[0], 0, 255),
    clamp(left[1] + right[1], 0, 255),
    clamp(left[2] + right[2], 0, 255),
    clamp(left[3] + right[3], 0, 255),
  ];
};

// Note: this does not necessarily output a valid Color since values can be negative
const difference: ColorCompareFn<Color> = (left, right) => {
  if (isRGB(left)) {
    return [right[0] - left[0], right[1] - left[1], right[2] - left[2]];
  }

  return [right[0] - left[0], right[1] - left[1], right[2] - left[2], right[3] - left[3]];
};

const average: ColorCompareFn<Color, [number]> = (left, right, weight?: number) => {
  weight = clamp(weight ?? 0.5, 0, 1);
  const diff = difference(left, right);

  if (isRGB(left)) {
    return [left[0] + weight * diff[0], left[1] + weight * diff[1], left[2] + weight * diff[2]];
  }

  return [left[0] + weight * diff[0], left[1] + weight * diff[1], left[2] + weight * diff[2], left[3] + weight * diff[3]];
};


export const Color = {
  isRGB,
  isRGBA,
  plus,
  difference,
  average,
} as const;