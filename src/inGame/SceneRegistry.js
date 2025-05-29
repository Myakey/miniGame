// SceneRegistry.js

const scenes = {};

export const SceneRegistry = {
  /**
   * Register a scene under its key
   */
  setScene(key, scene) {
    scenes[key] = scene;
  },

  /**
   * Get a scene by its key
   */
  getScene(key) {
    return scenes[key];
  },

  /**
   * Get all scenes
   */
  getAll() {
    return scenes;
  },

  /**
   * Remove a scene
   */
  removeScene(key) {
    delete scenes[key];
  }
};
