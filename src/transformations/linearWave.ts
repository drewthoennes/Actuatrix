import { Transformation } from '../types';

const AMPLITUDE = 25;
const PERIOD = 2.5;

export const linearWaveTransformation: Transformation = ({ i, t }) => {
  return AMPLITUDE * Math.sin((t + i) / PERIOD);
};