import { GraphicsObject } from './models/graphics-object';
import { Sprite } from './models/sprite';

import { CanvasService } from './services/canvas.service';
import { ImageLoaderService } from './services/image-loader.service';

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
   * @returns {HTMLImageElement}
   */
  loadImage: function(url, name) {
    return ImageLoaderService.loadImageFromSource(url, name);
  },

  /**
   * Create a Sprite object from a section of an image
   * @param {string} name 
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   * @returns {Sprite}
   */
  createSprite: function(name, x, y, w, h) {
    return ImageLoaderService.createSprite(name, x, y, w, h);
  }
}

export {
  GraphicsEngine
}