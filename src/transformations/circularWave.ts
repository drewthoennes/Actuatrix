import { MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { Transformation } from '../types';
import { getDistanceFromCenter } from '../utils/utils';

const AMPLITUDE = 15;
const PERIOD = 2;

const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const circularWaveTransform: Transformation = ({ i, j, t }) => {
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  return AMPLITUDE * Math.sin((t + distanceFromCenter) / PERIOD);
};