export type Coordinate = [number, number];
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Transformation = (args: { i: number, j: number, t: number}) => number;