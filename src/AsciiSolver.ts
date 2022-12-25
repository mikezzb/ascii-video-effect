import { SHADES, QUANTIZATION_STEP_VALUE, ASCII_WIDTH } from './config';

const pixel2ascii = (
  r: number,
  g: number,
  b: number,
  shades: string[] = SHADES
) => {
  const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
  const shadeIdx = Math.floor(grayscale / QUANTIZATION_STEP_VALUE);
  return shades[shadeIdx] || '';
};

export default class AsciiSolver {
  private context: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private width: number;
  private height: number;
  private rX: number;
  private rY: number;
  private shades: string[];
  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    shades: string[] = SHADES
  ) {
    this.context = context;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.shades = shades;
    this.width = ASCII_WIDTH;
    this.height = ASCII_WIDTH * (height / width);
    this.rX = this.canvasWidth / this.width;
    this.rY = this.canvasHeight / this.height;
  }
  solve() {
    let asciiStr = '';
    const { data } = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    let i_old = 0,
      j_old = 0;
    let x = 0,
      y = 0;
    for (let i = 0; i < this.height; i++) {
      j_old = 0;
      for (let j = 0; j < this.width; j++) {
        let r = 0,
          g = 0,
          b = 0;
        const targetY = (i + 1) * this.rY - i_old,
          targetX = (j + 1) * this.rX - j_old;

        for (y = 0; y < targetY && y <= this.canvasHeight; y++) {
          for (x = 0; x < targetX && x <= this.canvasWidth; x++) {
            const offset = (j_old + x + (i_old + y) * this.canvasWidth) * 4;
            r += data[offset];
            g += data[offset + 1];
            b += data[offset + 2];
          }
        }
        r /= x * y;
        g /= x * y;
        b /= x * y;
        const char = pixel2ascii(r, g, b, this.shades);
        j_old += x;
        asciiStr += char;
      }
      i_old += y;
      asciiStr += '\n';
    }
    return asciiStr;
  }
}
