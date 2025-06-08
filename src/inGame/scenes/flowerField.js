import Phaser from "phaser";

import CreatePlayerAnimation from "../movements/animation";
import { handleMovement } from "../movements/handleMovement";
import { GameState } from "../../hooks/gamestate";

import Pathfinding from "../movements/npcTry";

import { LightingManager } from "../lighting/LightingManager";
import { PlayerLightManager } from "../lighting/PlayerLightManager";
import { LightSource } from "../lighting/lightSource";

import { setupInteractionHandler } from "../../utils/interactionManager";

export class FlowerField extends Phaser.Scene {
  constructor() {
    super({ key: "FlowerField" });
  }

  preload() {
    GameState.currentlocation.currentLoc = "FlowerField";
    this.posX = GameState.afterVN ? GameState.currentlocation.currentPosX : 747; // Default position if not set
    this.posY = GameState.afterVN ? GameState.currentlocation.currentPosY : 859; // Default position if not set
    GameState.afterVN = false;
  }

  create(data) {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.generateMap();

    if (this.sys.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this.lights.enable();
      this.lights.setAmbientColor(0xffffff);

      this.lightingManager = new LightingManager(this);

      const currentHour = this.currentHour();

      // Add light source:
      this.playerLightManager = new PlayerLightManager(this, this.player, {
        radius: 200,
        color: 0xffffff,
        intensity: 1,
      });

      this.lightingManager.initializeWithHour(currentHour);
      this.playerLightManager.initializeWithHour(currentHour);
    } else {
      console.warn("WebGL not supported — skipping lights");
    }

    this.scaleFactor = 3; // same scale you used for map layers

    this.pathfinder = new Pathfinding(
      this.map,
      [
        this.fenceHouseLayer,
        this.treeLayer,
        this.flowerLayer,
        this.grassLayer,
        this.groundLayer,
        this.YuukaLayer,
      ],
      this.tileSize,
      3 // pass scale here
    );

    this.setupNPC();

    this.physics.add.collider(this.npc, this.fenceHouseLayer);
    this.physics.add.collider(this.npc, this.treeLayer);
    this.physics.add.collider(this.npc, this.flowerLayer);
    this.physics.add.collider(this.npc, this.grassLayer);
    this.physics.add.collider(this.npc, this.groundLayer);
    this.physics.add.collider(this.npc, this.YuukaLayer);

    this.time.addEvent({
      delay: 1000,
      callback: this.moveAIAlongPath,
      callbackScope: this,
      loop: true,
    });

    console.log("Tile size:", this.tileSize);
    console.log("Scale factor:", this.scaleFactor);
    console.log("Map size in tiles:", this.map.width, this.map.height);
    console.log("Player pos:", this.player.x, this.player.y);
    console.log("NPC pos:", this.npc.x, this.npc.y);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    setupInteractionHandler(this, {
      getPlayer: () => this.player,
      getInteractables: () => this.interactables,
      getKey: () => this.eKey,
      handleSaveVN: () => console.log("Saved at pantai"),

      handlers: {
        out: ({ scene }) => {
          const enteringText = this.add
            .text(this.cameras.main.centerX, -50, "Exiting....", {
              fontSize: "48px",
              fill: "#ffffff",
              fontStyle: "bold",
              resolution: 2,
            })
            .setOrigin(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
          GameState.afterVN = false;
          this.cameras.main.fadeOut(1000, 0, 0, 0);

          this.cameras.main.once("camerafadeoutcomplete", () => {
            enteringText.destroy();
            this.scene.start("MainGame");
          });
        },
      },
    });
  }

  update() {
    handleMovement(this);

    this.checkOverlap();
  }

  generateMap() {
    // const map = this.add.tilemap("flowerField");
    this.map = this.make.tilemap({ key: "flowerField" });

    this.tileSize = this.map.tileWidth;

    const grass = this.map.addTilesetImage("field", "flowerFieldTiles");
    const sunflowers = this.map.addTilesetImage("flower", "sunflowers");
    const tree = this.map.addTilesetImage("tree", "flowerFieldTree");
    const fence = this.map.addTilesetImage("fence", "flowerFieldFence");
    const Yuuka = this.map.addTilesetImage("Yuuka", "Yuuka");

    this.groundLayer = this.map
      .createLayer("ground", tree)
      .setPipeline("Light2D");
    this.grassLayer = this.map
      .createLayer("grass", [grass, tree])
      .setPipeline("Light2D");
    this.flowerLayer = this.map
      .createLayer("flower", [sunflowers, tree])
      .setPipeline("Light2D");
    this.fenceHouseLayer = this.map
      .createLayer("house&Fence", [fence, tree])
      .setPipeline("Light2D");
    this.treeLayer = this.map
      .createLayer("tree", [tree, grass])
      .setPipeline("Light2D");
    this.YuukaLayer = this.map
      .createLayer("Yuuka", Yuuka)
      .setPipeline("Light2D");

    this.player = this.physics.add
      .sprite(this.posX, this.posY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);

    const scale = 3;
    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;

    this.groundLayer.setScale(scale);
    this.grassLayer.setScale(scale);
    this.flowerLayer.setScale(scale);
    this.fenceHouseLayer.setScale(scale);
    this.treeLayer.setScale(scale);
    this.YuukaLayer.setScale(scale);

    this.fenceHouseLayer.setCollisionByProperty({ collides: true });
    this.treeLayer.setCollisionByProperty({ collides: true });
    this.flowerLayer.setCollisionByProperty({ collides: true });
    this.grassLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.YuukaLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.fenceHouseLayer);
    this.physics.add.collider(this.player, this.treeLayer);
    this.physics.add.collider(this.player, this.flowerLayer);
    this.physics.add.collider(this.player, this.grassLayer);
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.YuukaLayer);

    this.physics.world.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player);

    //TODO Perbaikin Object Eclipse posisi
    //OBJECTS TRIAL
    //OBJECT TRIAL
    const objects = this.map.getObjectLayer("Interactables").objects;
    const SCALE = 3;

    this.interactables = this.physics.add.group();

    objects.forEach((obj) => {
      if (obj.ellipse) {
        // Position of the circle's center (Tiled's obj.x and obj.y are top-left of bounding box)
        const radius = (obj.width * SCALE) / 2;
        const centerX = (obj.x + obj.width / 2) * SCALE;
        const centerY = (obj.y + obj.height / 2) * SCALE;

        const sprite = this.physics.add.sprite(centerX, centerY, null);
        sprite.setOrigin(0.5, 0.5);
        sprite.setVisible(false);
        sprite.body.setAllowGravity(false);

        // Set the body to a circle
        sprite.body.setCircle(radius);

        sprite.properties = {};
        obj.properties?.forEach((prop) => {
          sprite.properties[prop.name] = prop.value;
        });

        this.interactables.add(sprite);

        if (sprite.properties.light) {
          new LightSource(this, x, y, {
            radius: Number(sprite.properties.lightRadius) || 150,
            color: sprite.properties.lightColor || "#ffffff",
            intensity: Number(sprite.properties.lightIntensity) || 1.0,
            nightOnly: sprite.properties.lightNightOnly === true,
            initialHour: this.currentHour(), // you need to pass this in
          });
        }

        if (sprite.properties.collides) {
          sprite.body.setImmovable(true);
          sprite.body.setVelocity(0, 0);
          sprite.body.moves = false;
          if ("pushable" in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
          this.physics.add.collider(this.player, sprite);
        }
      } else {
        const x = (obj.x + obj.width / 2) * SCALE;
        const y = (obj.y + obj.height / 2) * SCALE;

        const sprite = this.physics.add.sprite(x, y, null);
        sprite.setVisible(false); // Still invisible trigger zone
        sprite.body.setAllowGravity(false);

        // 👇 Scale the physics body to match map scale
        sprite.body.setSize(obj.width * SCALE, obj.height * SCALE);
        // 👇 Do NOT call sprite.setScale() unless you want a visible sprite scaled
        // sprite.setScale(SCALE); // ❌ Not needed for invisible area

        // Copy object properties
        sprite.properties = {};
        obj.properties?.forEach((prop) => {
          sprite.properties[prop.name] = prop.value;
        });

        if (sprite.properties.light) {
          new LightSource(this, x, y, {
            radius: Number(sprite.properties.lightRadius) || 150,
            color: sprite.properties.lightColor || "#ffffff",
            intensity: Number(sprite.properties.lightIntensity) || 1.0,
            nightOnly: sprite.properties.lightNightOnly === true,
            initialHour: this.currentHour(), // you need to pass this in
          });
        }

        this.interactables.add(sprite);
        if (sprite.properties.collides) {
          sprite.body.setImmovable(true);
          sprite.body.setVelocity(0, 0);
          sprite.body.moves = false;
          if ("pushable" in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
          this.physics.add.collider(this.player, sprite);
        }
      }
    });

    //JUST USING FOR TRIAL
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.physics.add.overlap(
      this.player,
      this.interactables,
      (player, obj) => {
        console.log("Overlapping with:", obj.properties?.id); // 🔍 Debug here
        this.currentInteractable = obj;
      },
      null,
      this
    );
    //------------------------------

    this.input.gamepad.once("connected", (pad) => {
      this.gamepad = pad;
      console.log("Gamepad connected:", pad.id);
    });
    if (this.input.gamepad.total > 0) {
      const pads = this.input.gamepad.gamepads;
      for (let i = 0; i < pads.length; i++) {
        if (pads[i]) {
          this.gamepad = pads[i];
          console.log("Gamepad already connected:", this.gamepad.id);
        }
      }
    }
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
  }

  setupNPC() {
    // place NPC at some position
    this.npc = this.physics.add.sprite(this.posX, this.posY, "Yukari");
    this.npc.setScale(0.3);
    this.npc.setCollideWorldBounds(true);
    this.npc.body.enable = true;

    // AI path state
    this.aiPath = [];
    this.aiStep = 0;
    this.aiMoving = false;
  }

  async moveAIAlongPath() {
    const start = this.pathfinder.worldToTile(this.npc.x, this.npc.y);
    const end = this.pathfinder.worldToTile(this.player.x, this.player.y);

    const maxX = this.map.width;
    const maxY = this.map.height;

    if (
      start.tileX < 0 ||
      start.tileX >= maxX ||
      start.tileY < 0 ||
      start.tileY >= maxY ||
      end.tileX < 0 ||
      end.tileX >= maxX ||
      end.tileY < 0 ||
      end.tileY >= maxY
    ) {
      console.warn("🚫 Invalid path request", { start, end });
      return;
    }

    const path = await this.pathfinder.findPath(start, end);

    if (!path || path.length === 0) {
      console.warn("❌ Path was not found.");
      return;
    }

    this.aiPath = path;
    this.aiStep = 0;
    this.aiMoving = true;

    this.followPath();
  }

  followPath() {
    const NPC_SPEED = 100; // pixels per second
    if (this.aiStep >= this.aiPath.length) {
      this.aiMoving = false;
      this.npc.anims.stop();

      // Optional: Face the last direction at the end
      this.setIdleFrame(this.lastDirection);
      return;
    }

    const point = this.aiPath[this.aiStep];
    const worldPos = this.pathfinder.tileToWorld(point.x, point.y);

    // Calculate direction
    const dx = worldPos.x - this.npc.x;
    const dy = worldPos.y - this.npc.y;
    const direction = this.getDirection(dx, dy);

    if (direction) {
      this.npc.anims.play(direction, true);
      this.lastDirection = direction;
    }

    const distance = Phaser.Math.Distance.Between(
      this.npc.x,
      this.npc.y,
      worldPos.x,
      worldPos.y
    );
    const duration = (distance / NPC_SPEED) * 1000;

    this.tweens.add({
      targets: this.npc,
      x: worldPos.x,
      y: worldPos.y,
      duration: duration,
      ease: "Linear",
      onComplete: () => {
        this.aiStep++;
        this.followPath();
      },
    });
  }

  getDirection(dx, dy) {
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const threshold = 1; // small threshold to ignore jitter

    if (absDx < threshold && dy < 0) return "walkUp";
    if (absDx < threshold && dy > 0) return "walkDown";
    if (dx > 0 && absDy < threshold) return "walkRight";
    if (dx < 0 && absDy < threshold) return "walkLeft";
    if (dx > 0 && dy < 0) return "walkDiagRightUp";
    if (dx > 0 && dy > 0) return "walkDiagRightDown";
    if (dx < 0 && dy > 0) return "walkDiagLeftDown";
    if (dx < 0 && dy < 0) return "walkDiagLeftUp";

    return null;
  }

  setIdleFrame(direction) {
    const idleFrames = {
      walkUp: 0,
      walkRight: 8,
      walkDown: 16,
      walkLeft: 24,
      walkDiagRightUp: 4,
      walkDiagRightDown: 12,
      walkDiagLeftDown: 20,
      walkDiagLeftUp: 28,
    };

    if (direction && idleFrames[direction] !== undefined) {
      this.npc.setFrame(idleFrames[direction]);
    }
  }

  currentHour() {
    return GameState.time.hour;
  }
}
