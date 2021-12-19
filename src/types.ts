import { Color } from "./Color";

export type Pair<T> = [T, T];

export type Coordinate = [number, number];
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Transform = (args: { i: number, j: number, t: number}) => number;
export type Fill = (args: { offset: number, t: number, min: number, max: number }) => Color;