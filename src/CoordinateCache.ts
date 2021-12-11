import { Coordinate } from "./types";

type CacheType = number | Coordinate;

export class CoordinateCache<T extends CacheType> {
  cache: { [row: number]: { [col: number]: T } } = {};

  constructor(length: number, width: number, defaultValue: T | ((i: number, j: number) => T)) {
    for (let i = 0; i < length; i++) {
      this.cache[i] = [];

      for (let j = 0; j < width; j++) {
        this.cache[i][j] = typeof defaultValue === 'function' ? defaultValue(i, j) : defaultValue;
      }
    }
  }

  get(i: number, j: number) {
    return this.cache[i][j];
  }

  set(i: number, j: number, value: T) {
    this.cache[i][j] = value;
    return this.cache;
  }
}