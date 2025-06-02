import EasyStar from "easystarjs";

export default class Pathfinding {
  constructor(tilemap, collidableLayers, tileSize, scale) {
    this.tilemap = tilemap;
    this.collidableLayers = collidableLayers;
    this.tileSize = tileSize;
    this.scale = scale;

    console.log("THE SCALE IS :", scale);

    this.grid = this.createGrid();

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(this.grid);
    this.easystar.setAcceptableTiles([0]);
    this.easystar.enableDiagonals(); // optional: allow diagonal movement
    this.easystar.setIterationsPerCalculation(1000); // to avoid delay
  }

  createGrid() {
  const width = this.tilemap.width;
  const height = this.tilemap.height;
  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];

    for (let x = 0; x < width; x++) {
      let collides = false;

      for (const layer of this.collidableLayers) {
        const tile = layer.getTileAt(x, y);
        if (tile && tile.properties && tile.properties.collides) {
          collides = true;
          break;
        }
      }

      row.push(collides ? 1 : 0); // 1 = blocked, 0 = walkable
    }

    grid.push(row);
  }
  
  return grid;
}


  worldToTile(x, y) {
    const tileX = Math.floor(x / (this.tileSize * this.scale));
    const tileY = Math.floor(y / (this.tileSize * this.scale));
    return { tileX, tileY };
  }

  tileToWorld(tileX, tileY) {
    return {
      x: tileX * this.tileSize * this.scale + (this.tileSize * this.scale) / 2,
      y: tileY * this.tileSize * this.scale + (this.tileSize * this.scale) / 2,
    };
  }

  async findPath(start, end) {
    return new Promise((resolve) => {
      // Check bounds
      const width = this.tilemap.width;
      const height = this.tilemap.height;

      if (
        start.tileX < 0 || start.tileX >= width ||
        start.tileY < 0 || start.tileY >= height ||
        end.tileX < 0 || end.tileX >= width ||
        end.tileY < 0 || end.tileY >= height
      ) {
        console.warn("🚫 Invalid path request", { start, end });
        resolve(null);
        return;
      }

      this.easystar.findPath(
        start.tileX, start.tileY,
        end.tileX, end.tileY,
        (path) => {
          if (!path) {
            console.warn("❌ Path not found.");
            resolve(null);
          } else {
            resolve(path.map(p => ({ x: p.x, y: p.y })));
            
          }
        }
      );

      this.easystar.calculate();
      
    });
  }

  getAllWalkableTileIndices() {
  const walkable = new Set();

  for (let y = 0; y < this.tilemap.height; y++) {
    for (let x = 0; x < this.tilemap.width; x++) {
      for (const layer of this.collidableLayers) {
        const tile = layer.getTileAt(x, y);
        if (tile && !tile.properties.collides) {
          walkable.add(tile.index);
        }
      }
    }
  }

  return Array.from(walkable);
}
}
