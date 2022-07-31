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
    this.input = input;
    this.config = config || {};
    this.canvas = this.config.output || document.createElement('canvas');
    this.ready = false;
    this.input.oncanplay = () => {
      console.log('ready');
      this.ready = true;
      this.size = {
        width: this.input.width,
        height: this.input.height,
      };
    };
    console.log('Constructed');
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }
  animate() {
    requestAnimationFrame(this.animate);
    if (this.ready) this.render();
  }
  render() {}
}
