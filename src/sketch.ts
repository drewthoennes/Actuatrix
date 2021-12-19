import p5 from 'p5';
import { Color } from './Color';
import { PRISM_SIDE_LENGTH, PRISM_HEIGHT, MATRIX_SIDE_LENGTH } from './constants';
import { CoordinateCache } from './CoordinateCache';
import { withRandomFill } from './fills/withRandomFill';
import { SEED, SEED_START_TIME } from "./traits";
import { withRandomTransform } from './transforms/withRandomTransform';
import { Coordinate } from './types';

const CONTAINER = document.getElementById("sketch");

let t = SEED_START_TIME;
const coordinates = new CoordinateCache<Coordinate>(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, undefined);

const sketch = (p: any) => {
  p.setup = () => {
    const TOPMOST_POINT = [
      p.windowWidth / 2,
      (p.windowHeight - PRISM_SIDE_LENGTH * MATRIX_SIDE_LENGTH - PRISM_HEIGHT) / 2,
    ];

    p.createCanvas(p.windowWidth, p.windowHeight);
  
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
    p.background(16);
    p.drawSeed();

    for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
      for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
        const [x, y] = coordinates.get(i, j);

        const offset = withRandomTransform({ i, j, t });
        const fill = withRandomFill({ offset, t, min: 0, max: 50 });

        p.drawPrism([x, y - offset], fill);
      }
    }
  
    t += 0.15;
  };

  p.drawPrism = ([x, y]: Coordinate, fill?: Color) => {
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
    p.line(x, y + PRISM_SIDE_LENGTH, x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT)
  };

  p.drawIrregularPrism = ([x, y]: Coordinate, fill?: Color) => {
    p.beginShape();

    if (fill != null) {
      p.fill(fill);
    }

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

  p.drawSeed = () => {
    p.textSize(24);
    p.fill(120);
    p.text(SEED, 10, 30);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch, CONTAINER);