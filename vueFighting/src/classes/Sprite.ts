export default class Sprite {
  position: {
    x: number;
    y: number;
  };
  image: HTMLImageElement;
  width: number;
  height: number;
  constructor({
    position,
    imageSrc,
  }: {
    position: {
      x: number;
      y: number;
    };
    imageSrc: string;
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
  }
}
