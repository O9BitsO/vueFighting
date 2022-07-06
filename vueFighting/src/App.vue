<script setup lang="ts">
import './styles/globalStyles.css';
import Fighter from './classes/Fighter';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Sprite from './classes/Sprite';
import ResultScreen from './components/ResultScreen.vue';
import { usePointStore } from './stores/point';

const battleResult = ref('');
const start = ref('Input Title here!');
const timerRef = ref(90);
const point = usePointStore();
let keyup = function (e: KeyboardEvent) { };
let keydown = function (e: KeyboardEvent) { };
function increasePoint() {
  point.win();
}

function resetResult() {
  window.removeEventListener('keydown', keydown);
  window.removeEventListener('keyup', keyup);
  init();
  battleResult.value = '';
  timerRef.value = 90;
  countDown();
}

function startBattle() {
  window.removeEventListener('keydown', keydown);
  window.removeEventListener('keyup', keyup);
  init();
  start.value = '';
  battleResult.value = '';
  timerRef.value = 90;
  countDown();
}

let countDownId: number;
function countDown() {
  if (timerRef.value > 0) {
    countDownId = setTimeout(countDown, 1000);
    timerRef.value--;
  }
  if (timerRef.value === 0) {
    if (countDownId) clearTimeout(countDownId);
    battleResult.value = 'Time up!';
  }
}

// watch(battleResult, async (val) => {
//   console.log(val);
// })


function init() {
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

  function determineWinner({ player, enemy }: { player: Fighter, enemy: Fighter }) {
    if (countDownId) clearTimeout(countDownId);
    let resultBox = <HTMLElement>document.querySelector("#result");
    if(battleResult.value !== '') return;
    if (resultBox) {
      let result = '';
      if (player.health === enemy.health) {
        result = "Tie";
      }
      if (player.health > enemy.health) {
        result = "Player 1 Win";
        point.win();
      }
      if (player.health < enemy.health) {
        result = "Player 2 Win";
        point.lose();
      }
      battleResult.value = result;
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
    imageSrc: "/assets/background.png",
    scale: 1,
    framesMax: 1,
  });

  const shop = new Sprite({
    position: {
      x: 600,
      y: 129,
    },
    imageSrc: "/assets/shop.png",
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
    imageSrc: "/assets/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,
    sprites: {
      idle: {
        imageSrc: "/assets/samuraiMack/Idle.png",
        framesMax: 8,
      },
      run: {
        imageSrc: "/assets/samuraiMack/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "/assets/samuraiMack/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "/assets/samuraiMack/Fall.png",
        framesMax: 2,
      },
      attack1: {
        imageSrc: "/assets/samuraiMack/Attack1.png",
        framesMax: 6,
      },
      attack2: {
        imageSrc: "/assets/samuraiMack/Attack2.png",
        framesMax: 6,
      },
      takeHit: {
        imageSrc: "/assets/samuraiMack/Take Hit - white silhouette.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "/assets/samuraiMack/Death.png",
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
    imageSrc: "/assets/kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,
    sprites: {
      idle: {
        imageSrc: "/assets/kenji/Idle.png",
        framesMax: 4,
      },
      run: {
        imageSrc: "/assets/kenji/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "/assets/kenji/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "/assets/kenji/Fall.png",
        framesMax: 2,
      },
      attack1: {
        imageSrc: "/assets/kenji/Attack1.png",
        framesMax: 4,
      },
      attack2: {
        imageSrc: "/assets/kenji/Attack2.png",
        framesMax: 4,
      },
      takeHit: {
        imageSrc: "/assets/kenji/Take hit.png",
        framesMax: 3,
      },
      death: {
        imageSrc: "/assets/kenji/Death.png",
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

  // decreaseTimer();

  function animate() {
    let animationId = window.requestAnimationFrame(animate);
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
    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy });
      window.cancelAnimationFrame(animationId);
      animationId = 0;
    };
  }

  animate();

  keydown = function (e: KeyboardEvent) {
    console.log('down');
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
  }
  keyup = function (e: KeyboardEvent) {
    console.log('up');
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
  }
  removeListener();
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);

  function removeListener() {
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);
  }
}

onMounted(() => {
  init();
})

onUnmounted(() => {
  window.removeEventListener('keydown', keydown);
  window.removeEventListener('keyup', keyup);
})

</script>

<template>
  <div
    style="width: 100%; height: 100%; position: absolute; display: flex; justify-content: center; align-items: center;">
    <div style="position: relative; display: inline-block;" class="border-double border-4 border-indigo-600">
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
          height: 100px;
          width: 100px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        " class="bg-red-600 text-black rounded-full hover:text-red-600 hover:bg-blue-300 hover:text-3xl">
          {{ timerRef }}
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
      <ResultScreen
        style="position: absolute; width: 100%; height: 100%; align-items: center; justify-content: center;top: 0;right: 0;bottom: 0;left: 0;"
        :message="battleResult" :btn-text="'Restart'" @reset="resetResult"></ResultScreen>
      <ResultScreen
        style="position: absolute; width: 100%; height: 100%; align-items: center; justify-content: center;top: 0;right: 0;bottom: 0;left: 0;"
        :message="start" :btn-text="'Restart'" @reset="startBattle"></ResultScreen>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
</style>
