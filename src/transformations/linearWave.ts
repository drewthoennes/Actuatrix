import { Transformation } from '../types';

const AMPLITUDE = 25;
const PERIOD = 2.5;

export const linearWaveTransformation: Transformation = ({ coordinate, i, t }) => {
  const [x, y] = coordinate;
  return [x, y - (AMPLITUDE * Math.sin((t + i) / PERIOD))];
};