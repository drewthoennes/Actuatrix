import { MATRIX_SIDE_LENGTH } from '../constants';
import { Coordinate } from '../types';

const MATRIX_CENTER = [Math.ceil(MATRIX_SIDE_LENGTH / 2), Math.ceil(MATRIX_SIDE_LENGTH / 2)];

const distanceFromCenterCache: { [row: number]: { [col: number]: number } } = {};

export function radialWaveTransformation({ coordinate, i, j, t }: { coordinate: Coordinate, i: number; j: number, t: number}) {
  const [x, y] = coordinate;
  const distanceFromCenter = distanceFromCenterCache[i] != null && distanceFromCenterCache[i][j] != null ?
    distanceFromCenterCache[i][j] :
    Math.sqrt(Math.pow(MATRIX_CENTER[0] - i, 2) + Math.pow(MATRIX_CENTER[1] - j, 2));

  return [x, y - (15 * Math.sin((t + distanceFromCenter) / 2) + 25)];
}