export type Coordinate = [number, number];
export type Transformation = (args: { coordinate: Coordinate, i: number, j: number, t: number}) => Coordinate;