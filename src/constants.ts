import { Coordinate } from "./types";

const SEED_POWER = 6;
export const SEED = Math.round(Math.random() * Math.pow(10, SEED_POWER));
export const SEED_AS_DECIMAL = SEED / Math.pow(10, SEED_POWER);
export const SEED_AS_BOOLEAN = SEED_AS_DECIMAL > 0.5;

export const PRISM_SIDE_LENGTH = 30;
export const PRISM_HEIGHT = 180;
export const MATRIX_SIDE_LENGTH = 8 + Math.floor(8 * SEED_AS_DECIMAL);

export const MATRIX_CENTER: Coordinate = [Math.ceil(MATRIX_SIDE_LENGTH / 2), Math.ceil(MATRIX_SIDE_LENGTH / 2)];

export const MAX_DISTANCE_FROM_CENTER = Math.sqrt(Math.pow(MATRIX_CENTER[0], 2) + Math.pow(MATRIX_CENTER[1], 2));