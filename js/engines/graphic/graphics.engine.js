import { GraphicsObject } from './models/graphics-object.js';
import { Sprite } from './models/sprite.js';

import { CanvasService } from './services/canvas.service.js';
import { ImageLoaderService } from './services/image-loader.service.js';

let GraphicsEngine = {
  GraphicsObject,

  init: function(containerId = 'mainCanvasContainer') {
    CanvasService.init(containerId);
  },

  clearCanvas: function() {
    CanvasService.clearCanvas();
  },

  resizeCanvas: function(width, height) {
    CanvasService.resizeCanvas(width, height);
  },

  setBackgroundColor: function(color) {
    CanvasService.setBackgroundColor(color);
  },

  /**
   * Draw an object on the primary canvas
   * @param {GraphicsObject} obj 
   * @param {number} x 
   * @param {number} y 
   */
  drawObject: function(obj, x, y) {
    obj.draw(CanvasService.foreground.context, x, y);
  },

  /**
   * Register an image url and return the loaded image with transparency
   * @param {string} url 
   * @param {string} name 
   * @returns {Promise<HTMLImageElement>}
   */
  loadImage: function(url, name) {
    return ImageLoaderService.loadImageFromSource(url, name);
  },

  /**
   * Create a Sprite object from a section of an image
   * @param {string} name - The name of the registered spritesheet
   * @param {number} x - The left coordinate of the sprite
   * @param {number} y = The top coordinate of the sprite
   * @param {number} w - The width of the sprite
   * @param {number} h - The height of the sprite
   * @param {boolean} mirrorH - Should the image be flipped horizontally
   * @param {boolean} mirrorY - Should the image be flipped vertically
   * @returns {Sprite}
   */
  createSprite: function(name, x, y, w, h, mirrorV = false, mirrorH = false) {
    return ImageLoaderService.createSprite(name, x, y, w, h, mirrorH, mirrorV);
  }
}

export {
  GraphicsEngine
}