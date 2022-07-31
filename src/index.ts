export type AEConfig = {
  output?: HTMLCanvasElement;
};

type Size = {
  width: number;
  height: number;
};

export default class AsciiEffect {
  private input: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private config: AEConfig;
  private ready: boolean;
  private size: Size | undefined;
  constructor(input: HTMLVideoElement, config?: AEConfig) {
    console.log('Constructed');
    this.input = input;
    this.config = config || {};
    this.canvas = this.config.output || document.createElement('canvas');
    this.ready = true;
    this.size = {
      width: this.input.width,
      height: this.input.height,
    };
    this.resize(this.size);
    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);
    this.input.onresize = this.resize;
    requestAnimationFrame(this.animate);
  }
  private animate() {
    requestAnimationFrame(this.animate);
    if (this.ready) this.render();
  }
  private render() {}
  resize(targetSize?: Size | UIEvent) {
    if (targetSize instanceof UIEvent) {
      targetSize = undefined;
    }
    const { width, height } = targetSize || this.input;
    this.size = {
      width,
      height,
    };
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
