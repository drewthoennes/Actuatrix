import memoize from 'memoizee';
import { MATRIX_CENTER, MATRIX_SIDE_LENGTH, MAX_DISTANCE_FROM_CENTER } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { SEED_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { getDistanceFromCenter, getRadiansFromCartesianPoint, withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(7, 15, SEED_TRANSFORM_AMPLITUDE);
const EXPONENTIATION = withSeededRange(1, 1.5, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = 0.5;
const SLOWDOWN = withSeededRange(5, 10, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_DIRECTION ? -1 : 1;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

const getAmplitudeModifier = memoize((i: number, j: number) => {
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  // This function grows quadratically, bound between 1 and 4
  return 1 + 3 * Math.pow(EXPONENTIATION * distanceFromCenter / MAX_DISTANCE_FROM_CENTER, 2);
}, { primitive: true });

export const radialWaveTransform: Transform = ({ i, j, t }) => {
  const radians = getRadiansFromCartesianPoint(MATRIX_CENTER, [i, j]);
  const amplitudeModifier = getAmplitudeModifier(i, j);

  return amplitudeModifier * AMPLITUDE * Math.sin((DIRECTION * t / SLOWDOWN + radians) / PERIOD);
};