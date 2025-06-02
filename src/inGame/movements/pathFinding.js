export default class Pathfinding {
  constructor(tilemap, collidableLayers, tileSize, scale) {
    this.tilemap = tilemap;
    this.collidableLayers = collidableLayers;
    this.tileSize = tileSize;
    this.scale = scale;

    console.log("THE SCALE IS : " + scale)

    this.grid = this.createGrid();
    
    this.easystar = new EasyStar.js();
    this.easystar.setGrid(this.grid);
    this.easystar.setAcceptableTiles([0]); // assuming 0 = walkable
  }

  createGrid() {
    const width = this.tilemap.width;
    const height = this.tilemap.height;

    // Create a 2D array with width x height
    const grid = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        // Check if any layer has collision at (x,y)
        let collides = false;
        for (const layer of this.collidableLayers) {
          // Use getTileAt without scale, since tilemap tiles are not scaled, only the sprite layers are scaled
          const tile = layer.hasTileAt(x, y);
          if (tile) {
            collides = true;
            break;
          }
        }
        row.push(collides ? 1 : 0);
      }
      grid.push(row);
    }
    return grid;
  }

  worldToTile(x, y) {
  const tileX = Math.floor(x / (this.tileSize * this.scale));
  const tileY = Math.floor(y / (this.tileSize * this.scale));
  return {
    tileX: Phaser.Math.Clamp(tileX, 0, this.grid[0].length - 1),
    tileY: Phaser.Math.Clamp(tileY, 0, this.grid.length - 1),
  };
}

  tileToWorld(tileX, tileY) {
    // Convert tile coordinates back to world coordinates (pixels)
    // Use the scale factor here too
    return {
      x: tileX * this.tileSize * this.scale + (this.tileSize * this.scale) / 2,
      y: tileY * this.tileSize * this.scale + (this.tileSize * this.scale) / 2,
    };
  }

  findPath(startX, startY, endX, endY) {
    return new Promise((resolve) => {
      // Check if start and end points are inside grid
      if (
        startX < 0 || startX >= this.tilemap.width ||
        startY < 0 || startY >= this.tilemap.height ||
        endX < 0 || endX >= this.tilemap.width ||
        endY < 0 || endY >= this.tilemap.height
      ) {
        console.error("Start or end point outside grid bounds:", {
          startX, startY, endX, endY
        });
        resolve(null);
        return;
      }

      this.easystar.findPath(startX, startY, endX, endY, function(path) {
        if (path === null) {
          console.warn("Path was not found.");
          resolve(null);
        } else {
          resolve(path);
        }
      });
      this.easystar.calculate();
      
    });

  }
}
