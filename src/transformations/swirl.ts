import { MATRIX_CENTER, MATRIX_SIDE_LENGTH, MAX_DISTANCE_FROM_CENTER } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { Transformation } from '../types';
import { getDistanceFromCenter, getRadiansFromCartesianPoint } from '../utils/utils';

const AMPLITUDE = 20;
const PERIOD = 0.9;
const SLOWDOWN = 5;
const IS_EMANATING = true;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const swirlTransform: Transformation = ({ i, j, t }) => {
  const radians = getRadiansFromCartesianPoint(MATRIX_CENTER, [i, j]);
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  const direction = IS_EMANATING ? -1 : 1;

  return AMPLITUDE * Math.sin((t / SLOWDOWN + radians + direction * distanceFromCenter) / PERIOD);
};