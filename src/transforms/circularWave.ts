import { MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { getDistanceFromCenter, withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(12, 13, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = withSeededRange(1.5, 1.5, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_TRANSFORM_DIRECTION ? 1 : -1;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const circularWaveTransform: Transform = ({ i, j, t }) => {
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  return AMPLITUDE * Math.sin((t + DIRECTION * distanceFromCenter) / PERIOD);
};