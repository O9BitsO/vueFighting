export default class Sprite {
  position: {
    x: number;
    y: number;
  };
  image: HTMLImageElement;
  width: number;
  height: number;
  scale: number = 1;
  framesMax: number = 0;
  framesCurrent: number = 0;
  framesElapsed: number = 0;
  framesHold: number = 10;
  offset: {x:number,y:number} = {
    x: 0,
    y: 0,
  };
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 10,
    offset = {x: 0,y: 0},
  }: {
    position: {
      x: number;
      y: number;
    };
    imageSrc: string;
    scale: number;
    framesMax: number;
    framesCurrent?: number;
    framesElapsed?: number;
    framesHold?: number;
    offset?: {x:number,y:number}
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = framesCurrent;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
    this.offset = offset;
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(
      this.image,
      (this.framesCurrent * this.image.width) / this.framesMax,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrame() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      this.framesCurrent === this.framesMax - 1
        ? (this.framesCurrent = 0)
        : this.framesCurrent++;
    }
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.animateFrame();
  }
}
