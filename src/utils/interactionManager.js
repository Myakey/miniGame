// utils/InteractionManager.js
import { EventBus } from '../../src/inGame/EventBus';
import { GameState } from '../../src/hooks/gamestate';

export function setupInteractionHandler(scene, config = {}) {
  const {
    getPlayer,
    getInteractables,
    getKey,
    handleSaveVN = () => {},
    handlers = {}, // << per-scene ID handlers
  } = config;

  scene.currentInteractable = null;

  scene.checkOverlap = function () {
    const player = getPlayer();
    const interactables = getInteractables();
    const eKey = getKey();

    if (!player || !interactables) return;

    scene.currentInteractable = null;

    interactables.children.iterate((obj) => {
      if (obj && scene.physics.overlap(player, obj)) {
        scene.currentInteractable = obj;
      }
    });

    if (scene.currentInteractable && Phaser.Input.Keyboard.JustDown(eKey)) {
      const id = scene.currentInteractable.properties?.id;
      console.log(`[${scene.scene.key}] Interact ID:`, id);

      if (!id) return;

      const handler = handlers[id];
      if (handler) {
        handler({ scene, id, handleSaveVN, GameState });
      } else {
        console.warn(`No handler for interaction ID "${id}" in scene "${scene.scene.key}"`);
      }

      scene.currentInteractable = null;
    }
  };
}
