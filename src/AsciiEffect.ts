import AsciiSolver from './AsciiSolver';
import { CHAR_HEIGHT_TO_WIDTH_RATIO, FONT_SIZE } from './config';

type Size = {
  width: number;
  height: number;
};

type OnResultAvailable = (s: string) => void;

export default class AsciiEffect {
  private input: HTMLVideoElement;
  private callback: OnResultAvailable;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private size: Size;
  private solver?: AsciiSolver;
  private shades?: string[];
  private aniReq: number | null = null;
  constructor(
    input: HTMLVideoElement,
    callback: OnResultAvailable,
    width = 0,
    height = 0,
    shades?: string[],
    canvas?: HTMLCanvasElement
  ) {
    this.input = input;
    this.callback = callback;
    this.canvas = canvas || document.createElement('canvas');
    this.context = this.canvas.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    this.size = {
      width,
      height,
    };
    this.shades = shades;
    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);
    this.input.onresize = this.resize;
  }
  private animate() {
    requestAnimationFrame(this.animate);
    this.render();
  }
  private render() {
    if (!this.solver) return;
    const { width, height } = this.size;
    this.context.drawImage(this.input, 0, 0, width, height);
    const asciiStr = this.solver.solve();
    this.callback(asciiStr);
  }
  init() {
    this.size.width ||= this.input.videoWidth;
    this.size.height ||= this.input.videoHeight;
    this.resize(this.size);
    if (!this.solver) {
      this.solver = new AsciiSolver(
        this.context,
        this.size.width,
        this.size.height,
        this.shades
      );
    }
  }
  start() {
    if (!this.solver) this.init();
    this.aniReq = requestAnimationFrame(this.animate);
  }
  stop() {
    if (this.aniReq != null) {
      cancelAnimationFrame(this.aniReq);
      this.aniReq = null;
    }
  }
  getAsciiContainerStyles() {
    const { width, height } = this.size;
    const aspectRatio = width / height;
    const charHeightAdjustRatio = CHAR_HEIGHT_TO_WIDTH_RATIO / aspectRatio;
    const transform = `scaleY(${charHeightAdjustRatio})`;
    const fontSize = `${FONT_SIZE}px`;
    return {
      '-webkit-transform': transform,
      transform,
      'font-size': fontSize,
      'line-height': fontSize,
    };
  }
  resize(targetSize?: Size | UIEvent) {
    if (targetSize instanceof UIEvent) {
      targetSize = undefined;
    }
    const { width, height } = targetSize || this.input;
    if (!width || !height) return;
    this.size = {
      width,
      height,
    };
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
