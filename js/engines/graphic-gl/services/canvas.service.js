import { Color } from "../models/color.js";

/** @type {HTMLElement} */
let mainContainer;
/** @type {HTMLCanvasElement} */
let mainCanvas;
/** @type {WebGLRenderingContext} */
let mainContext;

let CanvasService = {
  init: function(containerId) {
    if (mainContainer) {
      throw 'Canvas already initialized!';
    }

    mainContainer = document.getElementById(containerId);
    if (!mainContainer) {
      mainContainer = document.createElement('div');
      document.body.appendChild(mainContainer);
    }

    mainCanvas = document.createElement('canvas');
    mainContainer.appendChild(mainCanvas);

    mainContext = mainCanvas.getContext('webgl');
    mainContext.clearColor(0, 0, 0, 1);
  },

  getGlContext: function() {
    return mainContext;
  },

  /**
   * @param {Color} color 
   */
  setBackgroundColor: function(color) {
    mainContext.clearColor(color.r, color.g, color.b, color.a)
  },

  clearCanvas: function() {
    mainContext.clear(mainContext.COLOR_BUFFER_BIT);
  },
}

export {
  CanvasService
}