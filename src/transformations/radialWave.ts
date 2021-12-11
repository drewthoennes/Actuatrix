import { MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { Transformation } from '../types';

const MATRIX_CENTER = [Math.ceil(MATRIX_SIDE_LENGTH / 2), Math.ceil(MATRIX_SIDE_LENGTH / 2)];
const AMPLITUDE = 15;
const PERIOD = 2;

const getDistanceFromCenter = (i: number, j: number) => Math.sqrt(Math.pow(MATRIX_CENTER[0] - i, 2) + Math.pow(MATRIX_CENTER[1] - j, 2));
const distanceFromCenterCache = new CoordinateCache(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, getDistanceFromCenter);

export const radialWaveTransformation: Transformation = ({ coordinate, i, j, t }) => {
  const [x, y] = coordinate;
  const distanceFromCenter = distanceFromCenterCache.get(i, j);
  return [x, y - (AMPLITUDE * Math.sin((t + distanceFromCenter) / PERIOD))];
};