import { mapValues, sum } from "lodash-es";
import { RGB, RGBA } from "../Color";
import { SEED_POWER } from "../traits";

// This is based on the mulberry32 random number generator (https://stackoverflow.com/a/47593316)
export function seededRandom(seed?: number) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Given a mapping of keys to integer propabilities and a seed, this function selects a random key.
 * Consider the below example:
 *
 * ```ts
 * randomDistribution({ first: 2, second: 1, third: 1 }, Math.random())
 * ```
 *
 * It should produce first 50% of the time, second 25%, and third 25%.
 */
export function randomDistribution(distribution: Record<string, number>, seed: number) {
  const keys = Object.keys(distribution);
  const total = sum(Object.values(distribution));
  const probabilities = mapValues(distribution, (probability) => probability / total);
  let remaining = seed;

  for (const key of keys) {
    const probability = probabilities[key];

    if (probability > remaining) {
      return key;
    }

    remaining -= probability;
  }

  return keys[keys.length - 1];
}

export function randomRGB(seed: number): RGB {
  const random = seededRandom(seed * Math.pow(10, SEED_POWER));
  return [
    Math.floor(256 * random()),
    Math.floor(256 * random()),
    Math.floor(256 * random()),
  ];
}

export function randomRGBA(seed: number, isTransparent: boolean): RGBA {
  const random = seededRandom(seed * Math.pow(10, SEED_POWER));
  return [
    Math.floor(256 * random()),
    Math.floor(256 * random()),
    Math.floor(256 * random()),
    isTransparent ? Math.floor(256 * random()) : 255,
  ];
}