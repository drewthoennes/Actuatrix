import { SEED_AS_BOOLEAN } from '../constants';
import { Transformation } from '../types';

const AMPLITUDE = 25;
const PERIOD = 2.5;
const DIRECTION = SEED_AS_BOOLEAN ? -1 : 1;

export const linearWaveTransformation: Transformation = ({ i, t }) => {
  return AMPLITUDE * Math.sin((t + DIRECTION * i) / PERIOD);
};