<script setup lang="ts">
import Fighter from './classes/Fighter';
import { onMounted } from 'vue';
import Sprite from './classes/Sprite';

onMounted(() => {
  function rectangularCollision({ rectangle1, rectangle2 }: { rectangle1: Fighter, rectangle2: Fighter }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
  }

  function determineWinner({ player, enemy, timerId }: { player: Fighter, enemy: Fighter, timerId: number }) {
    clearTimeout(timerId);
    let resultBox = <HTMLElement>document.querySelector("#result");
    if (resultBox) {
      if (player.health === enemy.health) {
        resultBox.innerHTML = "Tie";
        resultBox.style.display = "flex";
      }
      if (player.health > enemy.health) {
        resultBox.innerHTML = "Player 1 Win";
        resultBox.style.display = "flex";
      }
      if (player.health < enemy.health) {
        resultBox.innerHTML = "Player 2 Win";
        resultBox.style.display = "flex";
      }
    }

  }

  let timer = 60;
  let timerId: number;
  function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000);
      timer -= 1;
      let timerBox = document.querySelector("#timer");
      if (timerBox)
        timerBox.innerHTML = timer.toString();
    }
    if (timer === 0) {
      determineWinner({ player, enemy, timerId });
    }
  }
  const canvas = document.querySelector('canvas');
  const c = canvas?.getContext('2d');
  if (canvas && c) {
    canvas.width = 1024;
    canvas.height = 576;
    c.fillRect(0, 0, canvas.width, canvas.height);
  }

  const gravity = 0.7;

  const background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "src/assets/background.png",
    scale: 1,
    framesMax: 1,
  });

  const shop = new Sprite({
    position: {
      x: 600,
      y: 129,
    },
    imageSrc: "src/assets/shop.png",
    scale: 2.75,
    framesMax: 6,
  })

  const player = new Fighter({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    color: "red",
    offset: {
      x: 215,
      y: 156,
    },
    imageSrc: "src/assets/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,
    sprites: {
      idle: {
        imageSrc: "src/assets/samuraiMack/Idle.png",
        framesMax: 8,
      },
      run: {
        imageSrc: "src/assets/samuraiMack/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "src/assets/samuraiMack/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "src/assets/samuraiMack/Fall.png",
        framesMax: 2,
      },
      attack1: {
        imageSrc: "src/assets/samuraiMack/Attack1.png",
        framesMax: 6,
      },
      attack2: {
        imageSrc: "src/assets/samuraiMack/Attack2.png",
        framesMax: 6,
      },
      takeHit: {
        imageSrc: "src/assets/samuraiMack/Take Hit - white silhouette.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "src/assets/samuraiMack/Death.png",
        framesMax: 6,
      },
    },
    attackBox: {
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 100,
        y: 50,
      },
      width: 150,
      height: 50,
    },
  });

  const enemy = new Fighter({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    color: "blue",
    offset: {
      x: 215,
      y: 167,
    },
    imageSrc: "src/assets/kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,
    sprites: {
      idle: {
        imageSrc: "src/assets/kenji/Idle.png",
        framesMax: 4,
      },
      run: {
        imageSrc: "src/assets/kenji/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "src/assets/kenji/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "src/assets/kenji/Fall.png",
        framesMax: 2,
      },
      attack1: {
        imageSrc: "src/assets/kenji/Attack1.png",
        framesMax: 4,
      },
      attack2: {
        imageSrc: "src/assets/kenji/Attack2.png",
        framesMax: 4,
      },
      takeHit: {
        imageSrc: "src/assets/kenji/Take hit.png",
        framesMax: 3,
      },
      death: {
        imageSrc: "src/assets/kenji/Death.png",
        framesMax: 7,
      },
    },
    attackBox: {
      position: { x: 0, y: 0 },
      offset: {
        x: -100,
        y: 50,
      },
      width: 120,
      height: 50,
    },
  });

  if (c) {
    player.draw(c);
    enemy.draw(c);
  }

  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
    ArrowUp: {
      pressed: false,
    },
    ArrowDown: {
      pressed: false,
    },
  };

  decreaseTimer();

  function animate() {
    window.requestAnimationFrame(animate);
    if (c && canvas) {
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);
      background.update(c);
      shop.update(c);
      player.update(c, canvas, gravity);
      enemy.update(c, canvas, gravity);

      // Movement      
      player.velocity.x = 0;
      if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
        player.switchSprites('run');
      } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
        player.switchSprites('run');
      } else {
        player.switchSprites('idle');
      }

      if (player.velocity.y < 0) {
        player.switchSprites("jump");
      } else if (player.velocity.y > 0) {
        player.switchSprites("fall");
      }

      enemy.velocity.x = 0;
      if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5;
        enemy.switchSprites('run');
      } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5;
        enemy.switchSprites('run');
      } else {
        enemy.switchSprites('idle');
      }

      if (enemy.velocity.y < 0) {
        enemy.switchSprites("jump");
      } else if (enemy.velocity.y > 0) {
        enemy.switchSprites("fall");
      }

      // Colision detection
      let playerHealthBox = <HTMLElement>document.querySelector("#playerHealth");
      let enemyHealthBox = <HTMLElement>document.querySelector("#enemyHealth");
      // Colision detection
      if (
        rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
        player.isAttacking &&
        player.framesCurrent === 4
      ) {
        enemy.takeHit();
        player.isAttacking = false;
        enemyHealthBox.style.width = enemy.health + "%";
      }

      //if player misses
      if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
      }

      if (
        rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
        enemy.isAttacking &&
        enemy.framesCurrent === 2
      ) {
        player.takeHit();
        enemy.isAttacking = false;
        playerHealthBox.style.width = player.health + "%";
      }

      //if enemy misses
      if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
      }

    }
    // end game
    if (enemy.health <= 0 || player.health <= 0) determineWinner({ player, enemy, timerId });
  }

  animate();
  window.addEventListener("keydown", function (e) {
    if (!player.death) {
      switch (e.key) {
        case "d":
          keys.d.pressed = true;
          player.lastKey = "d";
          break;
        case "a":
          keys.a.pressed = true;
          player.lastKey = "a";
          break;
        case "w":
          player.velocity.y = -15;
          break;
        case "s":
          player.attack();
          break;
        case " ":
          player.attack();
          e.preventDefault();
          break;
      }
    }
    if (!enemy.death) {
      switch (e.key) {
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          enemy.lastKey = "ArrowRight";
          e.preventDefault();
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          enemy.lastKey = "ArrowLeft";
          e.preventDefault();
          break;
        case "ArrowUp":
          enemy.velocity.y = -15;
          e.preventDefault();
          break;
        case "ArrowDown":
          enemy.attack();
          e.preventDefault();
          break;
      }
    }
  });

  window.addEventListener("keyup", function (e) {
    if (!player.death) {
      switch (e.key) {
        case "d":
          keys.d.pressed = false;
          break;
        case "a":
          keys.a.pressed = false;
          break;
        case "w":
          keys.w.pressed = false;
          break;
        case "s":
          keys.s.pressed = false;
          break;
      }
    }
    if (!enemy.death) {
      switch (e.key) {
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
          break;
        case "ArrowUp":
          keys.ArrowUp.pressed = false;
          break;
        case "ArrowDown":
          keys.ArrowDown.pressed = false;
          break;
      }
    }
  });
})

</script>

<template>
  <div style="position: relative; display: inline-block">
    <div style="
        position: absolute;
        display: flex;
        width: 100%;
        align-items: center;
        padding: 15px;
      ">
      <div style="
          position: relative;
          height: 30px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        ">
        <div style="background-color: yellow; width: 100%; height: 100%"></div>
        <div style="
            position: absolute;
            background-color: blue;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
          " id="playerHealth"></div>
      </div>
      <div id="timer" style="
          background-color: red;
          height: 100px;
          width: 100px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
        10
      </div>
      <div style="position: relative; height: 30px; width: 100%">
        <div style="background-color: yellow; width: 100%; height: 100%"></div>
        <div style="
            position: absolute;
            background-color: blue;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
          " id="enemyHealth"></div>
      </div>
    </div>
    <div id="result" style="
        position: absolute;
        color: white;
        /* display: flex; */
        align-items: center;
        justify-content: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: none;
      ">
      Result
    </div>
    <canvas></canvas>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
</style>
