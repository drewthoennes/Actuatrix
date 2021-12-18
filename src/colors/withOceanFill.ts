import { RGB } from "../Color";
import { Fill } from "../types";
import { fillWithOffset } from "./fillWithOffset";

const bottom: RGB = [39, 69, 145];
const top: RGB = [93, 199, 174];

export const withOceanFill: Fill = ({ offset, min, max }) => {
  return fillWithOffset(offset, min, max, bottom, top);
}