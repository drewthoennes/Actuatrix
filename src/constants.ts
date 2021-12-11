import { Coordinate } from "./types";

export const CANVAS_SIZE = 800;
export const PRISM_SIDE_LENGTH = 30;
export const PRISM_HEIGHT = 180;
export const MATRIX_SIDE_LENGTH = 13;

export const MATRIX_CENTER: Coordinate = [Math.ceil(MATRIX_SIDE_LENGTH / 2), Math.ceil(MATRIX_SIDE_LENGTH / 2)];

export const MAX_DISTANCE_FROM_CENTER = Math.sqrt(Math.pow(MATRIX_CENTER[0], 2) + Math.pow(MATRIX_CENTER[1], 2));