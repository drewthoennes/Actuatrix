import { MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { getDistanceFromXAxis, withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(12, 13, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = withSeededRange(1.5, 1.5, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_TRANSFORM_DIRECTION ? -1 : 1;

const distanceFromXAxisCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, (i, j) => Math.abs(getDistanceFromXAxis(i, j)));

export const arrowTransform: Transform = ({ i, j, t }) => {
  const distanceFromXAxis = distanceFromXAxisCache.get(i, j);
  return AMPLITUDE * Math.sin((t + DIRECTION * (distanceFromXAxis + j) / PERIOD));
};