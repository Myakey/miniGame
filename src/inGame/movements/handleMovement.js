// movementHandler.js
import { isPaused } from "../gameController";
import { EventBus } from "../EventBus"; // Adjust the path as needed

export function registerMovementEvents(scene) {
  EventBus.on("move", direction => handleMove(scene, direction));
  EventBus.on("stop", () => handleStopInput(scene));
}

function handleMove(scene, direction) {
  const cursors = scene.cursors;
  if (!cursors) return;

  switch (direction) {
    case "up":
      cursors.up.isDown = true;
      break;
    case "down":
      cursors.down.isDown = true;
      break;
    case "left":
      cursors.left.isDown = true;
      break;
    case "right":
      cursors.right.isDown = true;
      break;
  }
}

function handleStopInput(scene) {
  const cursors = scene.cursors;
  if (!cursors) return;

  cursors.left.isDown = false;
  cursors.right.isDown = false;
  cursors.up.isDown = false;
  cursors.down.isDown = false;
}

export function handleMovement(scene) {
  if (!scene || isPaused) return;

  const { player, cursors, gamepad, shiftKey } = scene;
  let baseSpeed = 100;
  let velocityX = 0;
  let velocityY = 0;
  let speed = shiftKey?.isDown ? baseSpeed * 2 : baseSpeed;
  let moving = false;

  if (gamepad) {
    const axisH = gamepad.axes[0].getValue();
    const axisV = gamepad.axes[1].getValue();
    const deadZone = 0.2;

    if (Math.abs(axisH) > deadZone) velocityX = axisH;
    if (Math.abs(axisV) > deadZone) velocityY = axisV;

    if (gamepad.buttons[2].pressed) speed *= 2;
  }

  if (cursors.left.isDown) velocityX = -1;
  else if (cursors.right.isDown) velocityX = 1;

  if (cursors.up.isDown) velocityY = -1;
  else if (cursors.down.isDown) velocityY = 1;

  if (velocityX !== 0 && velocityY !== 0) {
    const norm = Math.sqrt(0.5);
    velocityX *= norm;
    velocityY *= norm;

    const dir = getDiagonalDirection(velocityX, velocityY);
    player.play(dir.anim, true);
    scene.lastDirection = dir.key;
    moving = true;
  } else {
    const dir = getCardinalDirection(velocityX, velocityY);
    if (dir) {
      player.play(dir.anim, true);
      scene.lastDirection = dir.key;
      moving = true;
    }
  }

  player.body.setVelocity(velocityX * speed, velocityY * speed);

  if (!moving) {
    player.anims.stop();
    const frameMap = {
      up: 0,
      right: 8,
      down: 16,
      left: 24,
      diagLeftUp: 0,
      diagRightUp: 8,
      diagLeftDown: 16,
      diagRightDown: 24,
    };
    player.setFrame(frameMap[scene.lastDirection] ?? 0);
  }
}

function getDiagonalDirection(x, y) {
  if (x < 0 && y < 0) return { anim: "walkDiagLeftUp", key: "diagLeftUp" };
  if (x > 0 && y < 0) return { anim: "walkDiagRightUp", key: "diagRightUp" };
  if (x < 0 && y > 0) return { anim: "walkDiagLeftDown", key: "diagLeftDown" };
  if (x > 0 && y > 0) return { anim: "walkDiagRightDown", key: "diagRightDown" };
  return null;
}

function getCardinalDirection(x, y) {
  if (x < 0) return { anim: "walkLeft", key: "left" };
  if (x > 0) return { anim: "walkRight", key: "right" };
  if (y < 0) return { anim: "walkUp", key: "up" };
  if (y > 0) return { anim: "walkDown", key: "down" };
  return null;
}
