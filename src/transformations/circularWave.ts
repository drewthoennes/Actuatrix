import { MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { Transformation } from '../types';
import { getDistanceFromCenter } from '../utils';

const AMPLITUDE = 15;
const PERIOD = 2;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const circularWaveTransform: Transformation = ({ coordinate, i, j, t }) => {
  const [x, y] = coordinate;
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  return [x, y - (AMPLITUDE * Math.sin((t + distanceFromCenter) / PERIOD))];
};