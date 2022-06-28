import Sprite from "./Sprite";

export default class Fighter extends Sprite {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  color: string;
  height: number;
  width: number;
  lastKey: string;
  attackBox : {
    position: {x:number,y:number},
    offset: {x:number,y:number},
    width: number,
    height: number,
  };
  isAttacking: boolean;
  health: number;
  sprites: any;
  death = false;

  constructor({
    position,
    velocity,
    color,
    framesMax,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 10,
    offset = {x: 0,y: 0},
    imageSrc,
    scale,
    sprites,
    attackBox,
  }: {
    position: {
      x: number;
      y: number;
    };
    velocity: {
      x: number;
      y: number;
    };
    color: string;
    framesMax: number;
    framesCurrent?: number;
    framesElapsed?: number;
    framesHold?: number;
    offset?: {x:number,y:number};
    imageSrc: string;
    scale: number;
    sprites: any;
    attackBox : {
      position: {x:number,y:number},
      offset: {x:number,y:number},
      width: number,
      height: number,
    };
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      framesCurrent,
      framesElapsed,
      framesHold,
      offset,
    })
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey = "";
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.image = new Image();
    this.image.src = imageSrc;
    this.framesMax = framesMax;
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update(c:CanvasRenderingContext2D, canvas?:HTMLCanvasElement, gravity?:number) {
    if(!canvas || !gravity) return;
    this.draw(c);
    if (!this.death) this.animateFrame();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    Math.random() > 0.5
      ? this.switchSprites("attack1")
      : this.switchSprites("attack2");
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 1000);
  }

  takeHit() {
    this.health -= 10;
    if (this.health <= 0) {
      this.switchSprites("death");
    } else {
      this.switchSprites("takeHit");
    }
  }

  switchSprites(sprite:string) {
    if (this.image === this.sprites.death.image) {
      if(this.framesCurrent === this.sprites.death.framesMax - 1) this.death = true;
      return;
    }
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    ) {
      return;
    }
    if (
      (this.image === this.sprites.attack1.image &&
        this.framesCurrent < this.sprites.attack1.framesMax - 1) ||
      (this.image === this.sprites.attack2.image &&
        this.framesCurrent < this.sprites.attack2.framesMax - 1)
    ) {
      return;
    }
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.framesMax = this.sprites.attack2.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
