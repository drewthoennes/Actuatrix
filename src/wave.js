const CANVAS_SIZE = 800;
const PRISM_SIDE_LENGTH = 30;
const PRISM_HEIGHT = 180;
const MATRIX_SIDE_LENGTH = 13;

const TOPMOST_POINT = [
  CANVAS_SIZE / 2,
  (CANVAS_SIZE - PRISM_SIDE_LENGTH * MATRIX_SIDE_LENGTH - PRISM_HEIGHT) / 2,
];
const matrixCenter = [Math.ceil(MATRIX_SIDE_LENGTH / 2), Math.ceil(MATRIX_SIDE_LENGTH / 2)];

let t = 0;
let coordinates = {};

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  
  for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
    for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
      const coordinate = [
        TOPMOST_POINT[0] + (i - j) * ((PRISM_SIDE_LENGTH / 2) * Math.sqrt(3)),
        TOPMOST_POINT[1] + (i + j) * (PRISM_SIDE_LENGTH / 2),
      ];
      
      if (coordinates[i] == null) {
        coordinates[i] = [];
      }
      
      coordinates[i][j] = coordinate;
    }
  }
}

function draw() {
  background(240);


  for (let i = 0; i < MATRIX_SIDE_LENGTH; i++) {
    for (let j = 0; j < MATRIX_SIDE_LENGTH; j++) {
      const coordinate = coordinates[i][j];
      drawPrism(radialWaveTransformation(coordinate, i, j));
    }
  }

  t += 0.15;
}

function drawPrism([x, y]) {
  beginShape();
  vertex(x, y);
  vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
  vertex(x, y + PRISM_SIDE_LENGTH);
  vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
  endShape(CLOSE);

  beginShape();
  vertex(x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
  vertex(
    x + (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3),
    y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT
  );
  vertex(x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT);
  vertex(x, y + PRISM_SIDE_LENGTH);
  endShape(CLOSE);

  beginShape();
  vertex(x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3), y + PRISM_SIDE_LENGTH / 2);
  vertex(
    x - (PRISM_SIDE_LENGTH / 2) * Math.sqrt(3),
    y + PRISM_SIDE_LENGTH / 2 + PRISM_HEIGHT
  );
  vertex(x, y + PRISM_SIDE_LENGTH + PRISM_HEIGHT);
  vertex(x, y + PRISM_SIDE_LENGTH);
  endShape(CLOSE);
}

const distanceFromCenterCache = {};
function radialWaveTransformation([x, y], i, j) {
  const distanceFromCenter =
    distanceFromCenterCache[i] != null && distanceFromCenterCache[i][j] != null
      ? distanceFromCenterCache[i][j]
      : Math.sqrt(
          Math.pow(matrixCenter[0] - i, 2) + Math.pow(matrixCenter[1] - j, 2)
        );
  
  return [x, y - (35 * sin((t + distanceFromCenter) / 5) + 25)];
}