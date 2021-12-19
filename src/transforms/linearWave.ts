import { SEED_TRANSFORM_DIRECTION, SEED_TRANSFORM_AMPLITUDE, SEED_TRANSFORM_SPEED } from "../traits";
import { Transform } from '../types';
import { withSeededRange } from '../utils/utils';

const AMPLITUDE = withSeededRange(15, 45, SEED_TRANSFORM_AMPLITUDE);
const PERIOD = withSeededRange(2, 5, SEED_TRANSFORM_SPEED);
const DIRECTION = SEED_TRANSFORM_DIRECTION ? -1 : 1;

export const linearWaveTransform: Transform = ({ i, t }) => {
  return AMPLITUDE * Math.sin((t + DIRECTION * i) / PERIOD);
};