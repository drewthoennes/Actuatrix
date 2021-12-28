import { MATRIX_CENTER, MATRIX_SIDE_LENGTH, MAX_DISTANCE_FROM_CENTER } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { getDistanceFromCenter, getRadiansFromCartesianPoint, withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(21, 21, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = 0.95;
const SLOWDOWN = withSeededRange(5, 5, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_TRANSFORM_DIRECTION ? -1 : 1;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const swirlTransform: Transform = ({ i, j, t }) => {
  const radians = getRadiansFromCartesianPoint(MATRIX_CENTER, [i, j]);
  const distanceFromCenter = distanceFromCenterCache.get(i, j);

  return AMPLITUDE * Math.sin((t / SLOWDOWN + radians + DIRECTION * distanceFromCenter) / PERIOD);
};