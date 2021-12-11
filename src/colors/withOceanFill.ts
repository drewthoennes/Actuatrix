import { RGB } from "../rgb";
import { fillWithOffset } from "./fillWithOffset";

const bottom: RGB = [39, 69, 145];
const top: RGB = [93, 199, 174];

export function withOceanFill(offset: number, min: number, max: number): RGB {
  return fillWithOffset(offset, min, max, bottom, top);
}