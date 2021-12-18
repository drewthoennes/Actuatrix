import memoize from 'memoizee';
import { MATRIX_CENTER } from "../constants";
import { Coordinate } from "../types";

// This is based on the mulberry32 random number generator (https://stackoverflow.com/a/47593316)
export function seededRandom(seed?: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function getDistanceFromCenter(i: number, j: number) {
  return Math.sqrt(Math.pow(MATRIX_CENTER[0] - i, 2) + Math.pow(MATRIX_CENTER[1] - j, 2));
}

// This takes the top of the matrix to be the second quadrant (135°)
export const getRadiansFromCartesianPoint = memoize(([centerX, centerY]: Coordinate, [pointX, pointY]: Coordinate): number => {
  if (centerX === pointX && centerY === pointY) {
    return 0;
  }

  const [relativePointX, relativePointY] = [pointX - centerX, centerY - pointY];
  const unshiftedAngle = Math.atan(relativePointY / relativePointX);

  if (relativePointX < 0 && relativePointY >= 0) { // Second quadrant
    return unshiftedAngle + Math.PI;
  } else if (relativePointX <= 0 && relativePointY < 0) { // Third quadrant
    return unshiftedAngle + Math.PI;
  } else if (relativePointX > 0 && relativePointY < 0) { // Fourth quadrant
    return unshiftedAngle + (2 * Math.PI);
  }

  return unshiftedAngle; // First quadrant
}, { primitive: true });
