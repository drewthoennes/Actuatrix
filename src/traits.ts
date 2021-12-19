import { seededRandom } from "./utils/random";

export const SEED_POWER = 7;
export const SEED = Math.round(Math.random() * Math.pow(10, SEED_POWER));
export const SEED_AS_DECIMAL = SEED / Math.pow(10, SEED_POWER);
const random = seededRandom(SEED);

export const SEED_START_TIME = Math.floor(100 * random());
export const SEED_MATRIX_LENGTH = random();

export const SEED_TRANSFORM = random();
export const SEED_TRANSFORM_SPEED = random();
export const SEED_TRANSFORM_AMPLITUDE = random();
export const SEED_TRANSFORM_DIRECTION = random() >= 0.5;

export const SEED_FILL = random();
export const SEED_FILL_TRANSPARENT = random() > 0.9;