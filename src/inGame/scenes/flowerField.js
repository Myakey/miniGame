import Phaser from "phaser"

import CreatePlayerAnimation from "../movements/animation";
import { handleMovement } from "../movements/handleMovement";
import { GameState } from "../../hooks/gamestate";

export class FlowerField extends Phaser.Scene{
    constructor(){
        super({ key : "FlowerField" });
    }

    preload(){
      GameState.currentlocation.currentLoc = "flowerField";
      this.posX = GameState.afterVN ? GameState.currentlocation.currentPosX : 747; // Default position if not set
      this.posY = GameState.afterVN ? GameState.currentlocation.currentPosY : 859; // Default position if not set
    }

    create(data) {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.generateMap();

     this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SHIFT
        );
  }


  update(){
    handleMovement(this);

    this.checkOverlap();
  }

  checkOverlap(){
      let stillOverlapping = false;
  
    this.interactables.children.iterate(obj => {
      if (this.physics.overlap(this.player, obj)) {
        this.currentInteractable = obj;
        stillOverlapping = true;
      }
    });
  
    if (!stillOverlapping) {
      this.currentInteractable = null;
    }
  
    // Check for E press only if still overlapping
    if (this.currentInteractable && Phaser.Input.Keyboard.JustDown(this.eKey)) {
      const id = this.currentInteractable.properties?.id;
      console.log("YA!");
      if (id != "out") {
        console.log("Pressing E near:", id);
        EventBus.emit("callObjective", "Done");
        EventBus.emit("show-dialog", { id });
        
      }else if(id == "out"){
        const enteringText = this.add
          .text(
            this.cameras.main.centerX,
            -50,
            "Exiting....",
            {
              fontSize: "48px",
              fill: "#ffffff",
              fontStyle: "bold",
              resolution: 2
            }
            
          )
          .setOrigin(0.5)
          .setDepth(1000)
          .setScrollFactor(0);
        GameState.afterVN = false;
        this.cameras.main.fadeOut(1000, 0, 0, 0);
  
        this.cameras.main.once("camerafadeoutcomplete", () => {
          enteringText.destroy(); 
          this.scene.start("MainGame");
        });
      }
      if(id === "Kosuzu1"){
        this.handleSaveVN();
        EventBus.emit("performVN", "act3Data");
      }
    }
    }

  generateMap(){
      const map = this.add.tilemap("flowerField");
      const grass = map.addTilesetImage("field", "flowerFieldTiles");
      const sunflowers = map.addTilesetImage("flower", "sunflowers");
      const tree = map.addTilesetImage("tree", "flowerFieldTree");
      const fence = map.addTilesetImage("fence", "flowerFieldFence");
      const Yuuka = map.addTilesetImage("Yuuka", "Yuuka");
  
      const groundLayer = map.createLayer("ground", tree);
      const grassLayer = map.createLayer("grass", [grass, tree]);
      const flowerLayer = map.createLayer("flower", [sunflowers, tree]);
      const fenceHouseLayer = map.createLayer("house&Fence", [fence, tree]);
      const treeLayer = map.createLayer("tree", [tree, grass]);

      const YuukaLayer = map.createLayer("Yuuka", Yuuka);
  
      this.player = this.physics.add
        .sprite(this.posX, this.posY, "Yukari")
        .setScale(0.3);
      this.player.body.setCollideWorldBounds(true);
  
  
      const scale = 3;
      const mapWidth = map.widthInPixels;
      const mapHeight = map.heightInPixels;
  
      groundLayer.setScale(scale);
      grassLayer.setScale(scale);
      flowerLayer.setScale(scale);
      fenceHouseLayer.setScale(scale);
      treeLayer.setScale(scale);
      YuukaLayer.setScale(scale);
  
      fenceHouseLayer.setCollisionByProperty({ collides: true });
      treeLayer.setCollisionByProperty({ collides: true });
      flowerLayer.setCollisionByProperty({ collides: true });
      grassLayer.setCollisionByProperty({ collides: true });
      groundLayer.setCollisionByProperty({ collides: true });
      YuukaLayer.setCollisionByProperty({ collides: true });

      this.physics.add.collider(this.player, fenceHouseLayer);
      this.physics.add.collider(this.player, treeLayer);
      this.physics.add.collider(this.player, flowerLayer);
      this.physics.add.collider(this.player, grassLayer);
      this.physics.add.collider(this.player, groundLayer);
      this.physics.add.collider(this.player, YuukaLayer);
  
      this.physics.world.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
      this.cameras.main.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
      this.cameras.main.setZoom(1);
      this.cameras.main.startFollow(this.player);
  
  
      //TODO Perbaikin Object Eclipse posisi
      //OBJECTS TRIAL
      //OBJECT TRIAL
       const objects = map.getObjectLayer("Interactables").objects;
       const SCALE = 3;
  
      this.interactables = this.physics.add.group();
  
      objects.forEach(obj => {
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
    obj.properties?.forEach(prop => {
      sprite.properties[prop.name] = prop.value;
    });
  
    this.interactables.add(sprite);
  
    if (sprite.properties.collides) {
      sprite.body.setImmovable(true);
      sprite.body.setVelocity(0, 0);
      sprite.body.moves = false;
      if ('pushable' in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
      this.physics.add.collider(this.player, sprite);
    }
  } else {
        const x = (obj.x + obj.width /2) * SCALE;
        const y = (obj.y + obj.height /2) * SCALE;
  
        const sprite = this.physics.add.sprite(x, y, null);
        sprite.setVisible(false); // Still invisible trigger zone
        sprite.body.setAllowGravity(false);
  
        // 👇 Scale the physics body to match map scale
        sprite.body.setSize(obj.width * SCALE, obj.height * SCALE);
        // 👇 Do NOT call sprite.setScale() unless you want a visible sprite scaled
        // sprite.setScale(SCALE); // ❌ Not needed for invisible area
  
        // Copy object properties
        sprite.properties = {};
        obj.properties?.forEach(prop => {
          sprite.properties[prop.name] = prop.value;
        });
  
    this.interactables.add(sprite);
    if (sprite.properties.collides) {
      sprite.body.setImmovable(true);
      sprite.body.setVelocity(0, 0);
      sprite.body.moves = false;
      if ('pushable' in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
      this.physics.add.collider(this.player, sprite);
    }
  }
        
  });
  
  
      //JUST USING FOR TRIAL 
      this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  
      this.physics.add.overlap(this.player, this.interactables, (player, obj) => {
    console.log("Overlapping with:", obj.properties?.id); // 🔍 Debug here
    this.currentInteractable = obj;
  }, null, this);
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
}