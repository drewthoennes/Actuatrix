import p5 from 'p5';
import { circularWaveTransform, linearWaveTransformation, radialWaveTransform, swirlTransform } from './transformations';
import { CANVAS_SIZE, PRISM_SIDE_LENGTH, PRISM_HEIGHT, MATRIX_SIDE_LENGTH } from './constants';
import { Coordinate, RGB } from './types';
import { CoordinateCache } from './CoordinateCache';
import { fillWithOffset } from './colors/fillWithOffset';

const CONTAINER = document.getElementById("sketch");

const TOPMOST_POINT = [
  CANVAS_SIZE / 2,
  (CANVAS_SIZE - PRISM_SIDE_LENGTH * MATRIX_SIDE_LENGTH - PRISM_HEIGHT) / 2,
];

let t = 0;
const coordinates = new CoordinateCache<Coordinate>(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, undefined);

const sketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  
    for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
      for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
        const coordinate: Coordinate = [
          TOPMOST_POINT[0] + (i - j) * ((PRISM_SIDE_LENGTH / 2) * Math.sqrt(3)),
          TOPMOST_POINT[1] + (i + j) * (PRISM_SIDE_LENGTH / 2),
        ];

        coordinates.set(i, j, coordinate);
      }
    }
  };

  p.draw = () => {
    p.background(240);
  
    for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
      for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
        const [x, y] = coordinates.get(i, j);

        const yOffset = swirlTransform({ i, j, t });
        const fill = fillWithOffset(yOffset, 0, 50);

        p.drawPrism([x, y - yOffset], fill);
      }
    }
  
    t += 0.15;
  };

  p.drawPrism = ([x, y]: Coordinate, fill?: RGB) => {
    p.beginShape();

    if (fill != null) {
      p.fill(fill);
    }

    p.vertex(x, y);
    p.vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    p.vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT);
    p.vertex(x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT);
    p.vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT);
    p.vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    
    p.endShape(p.CLOSE);

    p.line(x, y + PRISM_SIDE_LENGTH, x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2)
    p.line(x, y + PRISM_SIDE_LENGTH, x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2)
    p.line(x, y + PRISM_SIDE_LENGTH, x, y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT)
  };

  p.drawIrregularPrism = ([x, y]: Coordinate) => {
    p.beginShape();

    p.vertex(x, y);
    p.vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT);
    p.vertex(x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT);
    p.vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT);
    p.vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    
    p.endShape(p.CLOSE);

    p.line(x, y + PRISM_SIDE_LENGTH, x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT)
    p.line(x, y + PRISM_SIDE_LENGTH, x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2)
    p.line(x, y + PRISM_SIDE_LENGTH, x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT)
  };
};

new p5(sketch, CONTAINER);