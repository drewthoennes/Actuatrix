import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import p5 from 'p5';
import { Color } from './Color';
import { PRISM_SIDE_LENGTH, PRISM_HEIGHT, MATRIX_SIDE_LENGTH } from './constants';
import { CoordinateCache } from './CoordinateCache';
import { withRandomFill } from './fills/withRandomFill';
import { SEED, SEED_START_TIME } from "./traits";
import { withRandomTransform } from './transforms/withRandomTransform';
import { Coordinate } from './types';

const IS_CAPTURING: false = false;
const CAPTURE_DURATION: number | undefined = 15;
const zip = new JSZip();
const zipName = SEED.toString();
const zipScreenshotFolder = zip.folder(zipName);

const CONTAINER = document.getElementById("sketch");

let t = SEED_START_TIME;
const coordinates = new CoordinateCache<Coordinate>(MATRIX_SIDE_LENGTH, MATRIX_SIDE_LENGTH, undefined);

const sketch = (p: any) => {
  p.setup = () => {
    if (IS_CAPTURING) {
      p.frameRate(2);
    }

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

    if (IS_CAPTURING) {
      const canvas = document.getElementById('defaultCanvas0') as HTMLCanvasElement;
      canvas.toBlob((blob) => {
        const fileName = `${p.frameCount}`.padStart(7, '0');
        zipScreenshotFolder.file(`${fileName}.png`, blob, { base64: true });
      });

      if (CAPTURE_DURATION != null && t - SEED_START_TIME > CAPTURE_DURATION) {
        p.noLoop();
        console.log('Finished capture', t);

        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, `${zipName}.zip`);
        });
      }
    }
  };

  p.drawPrism = ([x, y]: Coordinate, color?: Color) => {
    p.beginShape();

    if (color != null) {
      p.fill(color);
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

  p.drawIrregularPrism = ([x, y]: Coordinate, color?: Color) => {
    p.beginShape();

    if (color != null) {
      p.fill(color);
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