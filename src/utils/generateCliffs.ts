import { SEED_AS_DECIMAL } from '../constants';
import { Coordinate, Direction } from '../types';

console.log(SEED_AS_DECIMAL);

const DIRECTIONS: readonly Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

function generateMatrix<T>(rows: number, cols: number, getDefaultValue: (i: number, j: number) => T): readonly T[][] {
  const matrix: T[][]= [];

  for (let i = 0; i < rows; i++) {
    matrix.push([] as T[]);
    for (let j = 0; j < cols; j++) {
      matrix[i].push(getDefaultValue(i, j));
    }
  }

  return matrix;
}

function getRandomDirection(coordinate: Coordinate, height: number, width: number): Direction {
  const [x, y] = coordinate;
  const directions = DIRECTIONS.filter((direction) => {
    switch (direction) {
      case 'UP':
        return y !== 0;
      case 'DOWN':
        return y !== height - 1;
      case 'LEFT':
        return x !== 0;
      case 'RIGHT':
        return x !== width - 1;
      default:
        return false;
    }
  });

  return directions[Math.floor(SEED_AS_DECIMAL * directions.length)];
}

function getNextCell(coordinate: Coordinate, height: number, width: number): Coordinate {
  const [x, y] = coordinate;
  const direction = getRandomDirection(coordinate, height, width);

  switch (direction) {
    case 'UP':
      return [x, y - 1];
    case 'DOWN':
      return [x, y + 1];
    case 'LEFT':
      return [x - 1, y];
    case 'RIGHT':
      return [x + 1, y];
    default:
      return coordinate;
  }
}

function getRandomHeight(minHeight: number, maxHeight: number): number {
  return Math.floor(minHeight + (maxHeight - minHeight) * SEED_AS_DECIMAL);
}

namespace GenerateCliff {
  export interface Args {
    height: number;
    width: number;
    total: number;
    minCliffHeight: number;
    maxCliffHeight: number;
  }

  export type Return = readonly (number | undefined)[][];
}

export function generateCliff({ height, width, total, minCliffHeight, maxCliffHeight }: GenerateCliff.Args): GenerateCliff.Return {
  if (height * width < total) {
    throw new Error(`Unable to make ${total} cliffs in a ${height} x ${width} grid`);
  } else if (height * width === total) {
    return generateMatrix<number | undefined>(height, width, () => getRandomHeight(minCliffHeight, maxCliffHeight));
  }

  const matrix = generateMatrix<number | undefined>(height, width, () => undefined);
  let cliffs = 0;
  let currentCoordinate: Coordinate = [Math.floor(height * SEED_AS_DECIMAL), Math.floor(width * SEED_AS_DECIMAL)];

  while (cliffs < total) {
    const nextCoordinate = getNextCell(currentCoordinate, height, width);
    const [nextCoordinateX, nextCoordinateY] = nextCoordinate;

    if (matrix[nextCoordinateY][nextCoordinateX] == null) {
      cliffs++;
      matrix[nextCoordinateY][nextCoordinateX] = getRandomHeight(minCliffHeight, maxCliffHeight);
    }

    currentCoordinate = nextCoordinate;
  }

  return matrix;
}