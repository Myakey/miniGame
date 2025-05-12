import Phaser from "phaser";
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { EventBus } from "../EventBus";
// import trialMap from "../../assets/image/InGame/maps/Trial.tmj"

export class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: "MainGame" });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/src/assets/image/InGame/maps/mapTrial2.tmj");
    this.load.image("Grass", "/src/assets/image/InGame/maps/Grass.png");
    this.load.image("ChickenHouse", "/src/assets/image/InGame/maps/ChickenHouse.png");
    this.load.spritesheet(
      "Yukari",
      "src/assets/image/InGame/SpriteSheets/Yukari.png",
      {
        frameWidth: 176,
        frameHeight: 240,
      }
    );
  }

  generatePlayerAnimation() {
    this.anims.create({
      key: "walkUp",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkRight",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [8, 9, 10, 11],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkDown",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [16, 17, 18, 19],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [24, 25, 26, 27],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkDiagRightUp",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkDiagRightDown",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [12, 13, 14, 15],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkDiagLeftDown",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [20, 21, 22, 23],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walkDiagLeftUp",
      frames: this.anims.generateFrameNumbers("Yukari", {
        frames: [28, 29, 30, 31],
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  create() {
    this.generatePlayerAnimation();

    // const map = this.make.tilemap({ key: "map" });
   

    const map = this.add.tilemap("map");
    const tiles = map.addTilesetImage("ground", "Grass");
    const chickenHouse = map.addTilesetImage("ChickenHouse", "ChickenHouse");
    const groundLayer = map.createLayer("ground", tiles);
    const obstacleLayer = map.createLayer("obstacles", chickenHouse);

    this.player = this.physics.add.sprite(400, 300, "Yukari");
    this.player.setScale(0.5)

    this.cameras.main.setZoom(1);
    // this.cameras.main.followOffset(true);

    const scale = 3;
      groundLayer.setScale(scale);
      obstacleLayer.setScale(scale);
    this.input.gamepad.once(
      "connected",
      function (pad) {
        this.gamepad = pad;
      },
      this
    );

    this.player.body.setCollideWorldBounds();

    this.triggerZone = this.add.zone(400, 300, 100, 100);
    this.physics.world.enable(this.triggerZone);
    this.triggerZone.body.setAllowGravity(false);
    this.triggerZone.body.setImmovable(true);

    this.cameras.main.startFollow(this.player);

    // obstacleLayer.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, obstacleLayer);

    // this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.add.collider(this.player, obstacleLayer)


    this.infoText = this.add
      .text(280, 250, "Nice!", {
        fontSize: "20px",
        fill: "#fff",
      }).setVisible(false);


    this.physics.add.overlap(this.player, this.triggerZone, () => {
      this.infoText.setVisible(true);
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    EventBus.emit("current-scene-ready", this);
  }

  handleMovement(){
    let baseSpeed = 100;
    let velocityX = 0;
    let velocityY = 0;
    let speed = this.shiftKey.isDown ? baseSpeed * 2 : baseSpeed;
    let moving = false;

    if (this.gamepad) {
      //X Value of the pad
      let axisH = this.gamepad.axes[0].getValue();
      let axisV = this.gamepad.axes[1].getValue();

      //DI baawah 0.2 sticknya berarti ga bisa maju lagi
      const deadZone = 0.2;
      if (Math.abs(axisH) > deadZone) velocityX = axisH;
      if (Math.abs(axisV) > deadZone) velocityY = axisV;

      //0 = A, 1 = B, 2 = X, 3 = Y
      if (this.gamepad.buttons[2].pressed) {
        speed *= 2;
      }
    }

    if (this.cursors.left.isDown) {
      velocityX = -1;
    } else if (this.cursors.right.isDown) {
      velocityX = 1;
    }

    if (this.cursors.up.isDown) {
      velocityY = -1;
    } else if (this.cursors.down.isDown) {
      velocityY = 1;
    }

    if (velocityX !== 0 && velocityY !== 0) {
      const norm = Math.sqrt(0.5); 
      velocityX *= norm;
      velocityY *= norm;

      if (velocityX < 0 && velocityY < 0) {
        this.player.play("walkDiagLeftUp", true);
        this.lastDirection = "diagLeftUp";
      } else if (velocityX > 0 && velocityY < 0) {
        this.player.play("walkDiagRightUp", true);
        this.lastDirection = "diagRightUp";
      } else if (velocityX < 0 && velocityY > 0) {
        this.player.play("walkDiagLeftDown", true);
        this.lastDirection = "diagLeftDown";
      } else if (velocityX > 0 && velocityY > 0) {
        this.player.play("walkDiagRightDown", true);
        this.lastDirection = "diagRightDown";
      }

      moving = true;
    } else {
      if (velocityX < 0) {
        this.player.play("walkLeft", true);
        this.lastDirection = "left";
        moving = true;
      } else if (velocityX > 0) {
        this.player.play("walkRight", true);
        this.lastDirection = "right";
        moving = true;
      }

      if (velocityY < 0) {
        this.player.play("walkUp", true);
        this.lastDirection = "up";
        moving = true;
      } else if (velocityY > 0) {
        this.player.play("walkDown", true);
        this.lastDirection = "down";
        moving = true;
      }
    }

    this.player.body.setVelocity(velocityX * speed, velocityY * speed);

    if (!moving) {
      this.player.anims.stop();

      switch (this.lastDirection) {
        case "up":
          this.player.setFrame(0); 
          break;
        case "right":
          this.player.setFrame(8); 
          break;
        case "down":
          this.player.setFrame(16); 
          break;
        case "left":
          this.player.setFrame(24); 
          break;
          //Bisa ditambahin lagi buat yang diagonal? Coba ditambahin lagi buat diagonal
        default:
          this.player.setFrame(0); 
      }
    }
  }

  update() {
    this.handleMovement();

    if (this.gamepad) {
      const xButtonPressed = this.gamepad.buttons[2].pressed; // X button (standard mapping)

      

      const playerBounds = this.player.getBounds();
      const areaBounds = this.triggerZone.getBounds();

      
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, areaBounds)) {
        if (xButtonPressed) {
          this.interactWithArea();
        }
      }
    }

      const inZone = Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.triggerZone.getBounds()
      );

      this.infoText.setVisible(inZone);
  }

   interactWithArea() {
    console.log("Interacted with the special area!");
    // Add your interaction logic here
  }
}
