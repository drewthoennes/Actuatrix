import p5 from 'p5';
import { radialWaveTransformation } from './radialWave';
import { CANVAS_SIZE, PRISM_SIDE_LENGTH, PRISM_HEIGHT, MATRIX_SIDE_LENGTH } from './constants';
import { Coordinate } from './types';

const CONTAINER = document.getElementById("sketch");

const TOPMOST_POINT = [
  CANVAS_SIZE / 2,
  (CANVAS_SIZE - PRISM_SIDE_LENGTH * MATRIX_SIDE_LENGTH - PRISM_HEIGHT) / 2,
];

let t = 0;
const coordinates: { [row: number]: { [col: number]: Coordinate }} = {};

const sketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  
    for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
      for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
        const coordinate: Coordinate = [
          TOPMOST_POINT[0] + (i - j) * ((PRISM_SIDE_LENGTH / 2) * Math.sqrt(3)),
          TOPMOST_POINT[1] + (i + j) * (PRISM_SIDE_LENGTH / 2),
        ];
        
        if (coordinates[i] == null) {
          coordinates[i] = [];
        }
        
        coordinates[i][j] = coordinate;
      }
    }
  };

  p.draw = () => {
    p.background(240);
  
    for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
      for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
        const coordinate = coordinates[i][j];
        const transformedCoordinate = radialWaveTransformation({ coordinate, i, j, t });
        p.drawPrism(transformedCoordinate);
      }
    }
  
    t += 0.15;
  };

  p.drawPrism = ([x, y]: Coordinate) => {
    p.beginShape();
    p.vertex(x, y);
    p.vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    p.vertex(x, y + PRISM_SIDE_LENGTH);
    p.vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    p.endShape(p.CLOSE);
  
    p.beginShape();
    p.vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    p.vertex(
      x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3),
      y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT
    );
    p.vertex(x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT);
    p.vertex(x, y + PRISM_SIDE_LENGTH);
    p.endShape(p.CLOSE);
  
    p.beginShape();
    p.vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
    p.vertex(
      x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3),
      y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT
    );
    p.vertex(x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT);
    p.vertex(x, y + PRISM_SIDE_LENGTH);
    p.endShape(p.CLOSE);
  };
};

new p5(sketch, CONTAINER);