import Phaser from 'phaser';

export default class DrawScene extends Phaser.Scene {
  constructor() {
    super('DrawScene');
  }

  preload() {}

  create() {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    this.brushSize = 4;
    this.drawingColor = 0x000000;
    this.isDrawing = false;

    // Fullscreen render texture
    this.canvas = this.add.renderTexture(0, 0, screenWidth, screenHeight).setOrigin(0);

    // Color Palette (top-left corner)
    const colors = [0x000000, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
    colors.forEach((color, index) => {
      let box = this.add.rectangle(20 + index * 40, screenHeight - 10, 30, 30, color).setInteractive();
      box.on('pointerdown', () => {
        this.drawingColor = color;
        this.isErasing = false;
      });
    });

    // Eraser button
    this.isErasing = false;
    const eraserBtn = this.add.text(250, screenHeight - 60, '[ Eraser Tool ]', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#444444',
      padding: { x: 10, y: 5 }
    }).setInteractive();
    eraserBtn.on('pointerdown', () => {
      this.isErasing = true;
    });

    // Clear button
    const clearBtn = this.add.text(400, screenHeight - 60, '[ Clear Canvas ]', {
      fontSize: '16px',
      color: '#ffaaaa',
      backgroundColor: '#550000',
      padding: { x: 10, y: 5 }
    }).setInteractive();
    clearBtn.on('pointerdown', () => {
      this.canvas.clear();
    });

    // Save button
    const saveBtn = this.add.text(550, screenHeight - 60, '[ Save Drawing ]', {
      fontSize: '16px',
      color: '#aaffaa',
      backgroundColor: '#004400',
      padding: { x: 10, y: 5 }
    }).setInteractive();
    saveBtn.on('pointerdown', () => {
      this.saveCanvasImage();
    });

    // Mouse Events
    this.input.on('pointerdown', (pointer) => {
      if (pointer.y < screenHeight - 70) this.isDrawing = true;
    });

    this.input.on('pointerup', () => {
      this.isDrawing = false;
    });

    this.input.on('pointermove', (pointer) => {
  if (this.isDrawing && pointer.y < this.scale.height - 70) {
    const worldPoint = pointer.positionToCamera(this.cameras.main);

    // Optional: Snap to "pixel grid"
    const gridSize = this.brushSize;
    const snappedX = Math.floor(worldPoint.x / gridSize) * gridSize;
    const snappedY = Math.floor(worldPoint.y / gridSize) * gridSize;

    const square = this.add.graphics();
    const color = this.isErasing ? 0x222222 : this.drawingColor;
    square.fillStyle(color, 1);
    square.fillRect(0, 0, gridSize, gridSize);
    this.canvas.draw(square, snappedX, snappedY);
    square.destroy();
  }
});

  }

  saveCanvasImage() {
    const key = '__screenshot';
    this.canvas.saveTexture(key);
    const base64 = this.textures.getBase64(key);
    const a = document.createElement('a');
    a.href = base64;
    a.download = 'my_drawing.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.textures.remove(key);
  }
}
