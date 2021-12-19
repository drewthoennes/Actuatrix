// This is based on the mulberry32 random number generator (https://stackoverflow.com/a/47593316)
function seededRandom(seed?: number) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const SEED_POWER = 7;
export const SEED = Math.round(Math.random() * Math.pow(10, SEED_POWER));
export const SEED_AS_DECIMAL = SEED / Math.pow(10, SEED_POWER);
const random = seededRandom(SEED);

export const SEED_START_TIME = Math.floor(100 * random());
export const SEED_MATRIX_LENGTH = random();
export const SEED_TRANSFORM = random();
export const SEED_TRANSFORM_SPEED = random();
export const SEED_TRANSFORM_AMPLITUDE = random();
export const SEED_FILL = random();
export const SEED_DIRECTION = random() > 0.5;
