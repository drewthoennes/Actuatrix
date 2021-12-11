import { MATRIX_SIDE_LENGTH } from '../constants';
import { Transformation } from '../types';

const MATRIX_CENTER = [Math.ceil(MATRIX_SIDE_LENGTH / 2), Math.ceil(MATRIX_SIDE_LENGTH / 2)];
const AMPLITUDE = 15;
const PERIOD = 2;

const distanceFromCenterCache: { [row: number]: { [col: number]: number } } = {};

export const radialWaveTransformation: Transformation = ({ coordinate, i, j, t }) => {
  const [x, y] = coordinate;
  const distanceFromCenter = distanceFromCenterCache[i] != null && distanceFromCenterCache[i][j] != null ?
    distanceFromCenterCache[i][j] :
    Math.sqrt(Math.pow(MATRIX_CENTER[0] - i, 2) + Math.pow(MATRIX_CENTER[1] - j, 2));

  return [x, y - (AMPLITUDE * Math.sin((t + distanceFromCenter) / PERIOD))];
};