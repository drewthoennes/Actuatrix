import memoize from 'memoizee';
import { MATRIX_CENTER } from "../constants";
import { Coordinate } from "../types";

export function getDistanceFromCenter(i: number, j: number) {
  return Math.sqrt(Math.pow(MATRIX_CENTER[0] - i, 2) + Math.pow(MATRIX_CENTER[1] - j, 2));
}

export function getDistanceFromXAxis(i: number, j: number) {
  return i - MATRIX_CENTER[0];
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

/**
 * Returns a range of values between the minimum and maximum given a specific decimal seed
 */
export function withSeededRange(min: number, max: number, seed: number): number {
  return min + (max - min) * seed;
}