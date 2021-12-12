import memoize from 'memoizee';
import { MATRIX_CENTER, MATRIX_SIDE_LENGTH, MAX_DISTANCE_FROM_CENTER } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { Transformation } from '../types';
import { getDistanceFromCenter, getRadiansFromCartesianPoint } from '../utils/utils';

const AMPLITUDE = 15;
const PERIOD = 0.5;
const SLOWDOWN = 7;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

const getAmplitudeModifier = memoize((i: number, j: number) => {
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  // This function grows quadratically, bound between 1 and 4
  return 1 + 3 * Math.pow(distanceFromCenter / MAX_DISTANCE_FROM_CENTER, 2);
}, { primitive: true });

export const radialWaveTransform: Transformation = ({ i, j, t }) => {
  const radians = getRadiansFromCartesianPoint(MATRIX_CENTER, [i, j]);
  const amplitudeModifier = getAmplitudeModifier(i, j);

  return amplitudeModifier * AMPLITUDE * Math.sin((t / SLOWDOWN + radians) / PERIOD);
};