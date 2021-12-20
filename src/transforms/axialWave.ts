import { MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { getDistanceFromXAxis, withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(12, 13, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = withSeededRange(1.2, 1.2, SEED_TRANSFORM_SPEED);
const SLOWDOWN = 2;
const DIRECTION = SEED_TRANSFORM_DIRECTION ? -1 : 1;

const distanceFromXAxisCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromXAxis);

export const axialWaveTransform: Transform = ({ i, j, t }) => {
  const distanceFromXAxis = distanceFromXAxisCache.get(i, j);
  return AMPLITUDE * Math.sin((t / SLOWDOWN + DIRECTION * (distanceFromXAxis / SLOWDOWN + j) / PERIOD));
};