import { MATRIX_CENTER, MATRIX_SIDE_LENGTH } from '../constants';
import { CoordinateCache } from '../CoordinateCache';
import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(12, 13, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = withSeededRange(1.5, 1.5, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_TRANSFORM_DIRECTION ? -1 : 1;

const RADIUS_OF_CENTER = MATRIX_SIDE_LENGTH;
const CENTER_RATE_OF_CHANGE = 15;

export const revolvingSourceCircularWaveTransform: Transform = ({ i, j, t }) => {
  const center = [RADIUS_OF_CENTER * Math.cos(t / CENTER_RATE_OF_CHANGE), RADIUS_OF_CENTER * Math.sin(t / CENTER_RATE_OF_CHANGE)];

  // We need to conver the index of this transform into the coordinates of it in the matrix with respect to the center
  const [x, y] = [i - MATRIX_CENTER[0], MATRIX_CENTER[1] - j]; // TODO: Offset either of these coordinates to create "noise"

  const distanceFromCenter = Math.sqrt(Math.pow(center[0] - x, 2) + Math.pow(center[1] - y, 2));
  return AMPLITUDE * Math.sin((t + DIRECTION * distanceFromCenter) / PERIOD);
};