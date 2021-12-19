import { MATRIX_CENTER, MATRIX_SIDE_LENGTH, MAX_DISTANCE_FROM_CENTER, SEED_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { Transform } from '../types';
import { getDistanceFromCenter, getRadiansFromCartesianPoint, withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(18, 22, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = 0.9;
const SLOWDOWN = withSeededRange(5, 7, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_DIRECTION ? -1 : 1;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const swirlTransform: Transform = ({ i, j, t }) => {
  const radians = getRadiansFromCartesianPoint(MATRIX_CENTER, [i, j]);
  const distanceFromCenter = distanceFromCenterCache.get(i, j);

  return AMPLITUDE * Math.sin((t / SLOWDOWN + radians + DIRECTION * distanceFromCenter) / PERIOD);
};