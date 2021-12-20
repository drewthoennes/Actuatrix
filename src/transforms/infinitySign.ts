import memoize from "memoizee";
import { MATRIX_CENTER, MATRIX_SIDE_LENGTH } from "../constants";
import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Coordinate, Transform } from '../types';
import { withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(15, 45, SEED_TRANSFORM_AMPLITUDE);
const DIRECTION = SEED_TRANSFORM_DIRECTION ? -1 : 1;

const INFINITY_SIGN_WIDTH = 0.4 * MATRIX_SIDE_LENGTH;
const INFINITY_SIGN_SLOWDOWN = withSeededRange(3, 8, SEED_TRANSFORM_SPEED);

const getInfinitySignPosition = memoize((t: number): Coordinate => {
  return [
    DIRECTION * INFINITY_SIGN_WIDTH * Math.cos(t / INFINITY_SIGN_SLOWDOWN),
    DIRECTION * INFINITY_SIGN_WIDTH *  Math.sin(t / INFINITY_SIGN_SLOWDOWN) * Math.cos(t / INFINITY_SIGN_SLOWDOWN),
  ];
}, { primitive: true });

export const infinitySignTransform: Transform = ({ i, j, t }) => {
  const infinitySignPosition = getInfinitySignPosition(t);
  const [x, y] = [i - MATRIX_CENTER[0], MATRIX_CENTER[1] - j];
  const distanceFromInfinitySign = Math.sqrt(Math.pow(infinitySignPosition[0] - x, 2) + Math.pow(infinitySignPosition[1] - y, 2));

  return AMPLITUDE / Math.pow(Math.E, 2 * distanceFromInfinitySign);
};