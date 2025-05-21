export default function CreatePlayerAnimation (scene){
    const { anims } = scene;

    anims.create({
      key: "walkUp",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "walkRight",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [8, 9, 10, 11],
      }),
      frameRate: 8,
      repeat: -1,
    });
    
    anims.create({
      key: "walkDown",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [16, 17, 18, 19],
      }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "walkLeft",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [24, 25, 26, 27],
      }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "walkDiagRightUp",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "walkDiagRightDown",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [12, 13, 14, 15],
      }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "walkDiagLeftDown",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [20, 21, 22, 23],
      }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "walkDiagLeftUp",
      frames: anims.generateFrameNumbers("Yukari", {
        frames: [28, 29, 30, 31],
      }),
      frameRate: 8,
      repeat: -1,
    });
}

