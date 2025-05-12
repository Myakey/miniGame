import Phaser from 'phaser';

//emit events between components, html, and Phaser Scenes
export const EventBus = new Phaser.Events.EventEmitter();