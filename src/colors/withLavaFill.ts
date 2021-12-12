import { clamp } from "lodash-es";
import { RGB, RGBPair } from "../rgb";

const DURATION = 60;
const COLORS: readonly [RGB, RGB][] = [
  [[97, 38, 31], [222, 104, 91]],
  [[102, 36, 24], [230, 155, 50]],
  [[61, 59, 47], [230, 222, 170]],
  [[43, 43, 43], [227, 227, 227]],
];

export function withLavaFill(offset: number, t: number, min: number, max: number): RGB {
  const indexOfCurrentPair = Math.floor(t / DURATION) % COLORS.length;
  const indexOfNextPair = (indexOfCurrentPair + 1) % COLORS.length;
  const currentColorPair = COLORS[indexOfCurrentPair];
  const nextColorPair = COLORS[indexOfNextPair];

  const completedDuration = (t % DURATION) / DURATION;

  const currentToNextDiff: RGBPair = [
    RGB.average(currentColorPair[0], nextColorPair[0], completedDuration),
    RGB.average(currentColorPair[1], nextColorPair[1], completedDuration)
  ];

  const clampedOffset = clamp(offset, min, max);
  const range = max - min;
  const relativeOffset = (clampedOffset - min) / range;

  return RGB.average(...currentToNextDiff, relativeOffset);
}