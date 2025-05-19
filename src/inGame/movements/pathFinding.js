import EasyStar from 'easystarjs';

export default function setupPlayerMovement(scene, player, tilemap, walkableLayer) {
  const finder = new EasyStar.js();

  const grid = [];
  for (let y = 0; y < tilemap.height; y++) {
    const row = [];
    for (let x = 0; x < tilemap.width; x++) {
      const tile = walkableLayer.getTileAt(x, y);
      row.push(tile?.index ?? 0);
    }
    grid.push(row);
  }

  finder.setGrid(grid);
  finder.setAcceptableTiles([0]); // Adjust this based on walkable tile indices
  finder.enableDiagonals();

  let path = [];
  let moving = false;
  let lastDirection = 'down';

  scene.input.on('pointerdown', (pointer) => {
    const worldPoint = pointer.positionToCamera(scene.cameras.main);
    const toX = walkableLayer.worldToTileX(worldPoint.x);
    const toY = walkableLayer.worldToTileY(worldPoint.y);

    const fromX = walkableLayer.worldToTileX(player.x);
    const fromY = walkableLayer.worldToTileY(player.y);

    finder.findPath(fromX, fromY, toX, toY, (p) => {
      if (p === null) return;
      path = p;
      moving = true;
    });

    finder.calculate();
  });

  scene.events.on('update', () => {
    if (!moving || path.length === 0) {
      player.setVelocity(0);
      player.anims.stop();

      // Set idle frame
      switch (lastDirection) {
        case 'up': player.setFrame(0); break;
        case 'right': player.setFrame(8); break;
        case 'down': player.setFrame(16); break;
        case 'left': player.setFrame(24); break;
        // Add more if needed
      }
      return;
    }

    const next = path[0];
    const targetX = walkableLayer.tileToWorldX(next.x) + tilemap.tileWidth / 2;
    const targetY = walkableLayer.tileToWorldY(next.y) + tilemap.tileHeight / 2;

    const dx = targetX - player.x;
    const dy = targetY - player.y;

    const dist = Phaser.Math.Distance.Between(player.x, player.y, targetX, targetY);

    if (dist < 4) {
      path.shift();
      if (path.length === 0) {
        moving = false;
      }
    } else {
      scene.physics.moveTo(player, targetX, targetY, 120);

      // Determine direction for animation
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          player.play('walkRight', true);
          lastDirection = 'right';
        } else {
          player.play('walkLeft', true);
          lastDirection = 'left';
        }
      } else {
        if (dy > 0) {
          player.play('walkDown', true);
          lastDirection = 'down';
        } else {
          player.play('walkUp', true);
          lastDirection = 'up';
        }
      }
    }
  });

  return {
    stop: () => {
      moving = false;
      path = [];
      player.body.setVelocity(0);
    },
  };
}