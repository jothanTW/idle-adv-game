class CanvasSet {
  /** @type {HTMLCanvasElement} */
  canvas;
  /** @type {CanvasRenderingContext2D} */
  context;

  constructor() {
    /** @type {HTMLCanvasElement} */
    this.canvas = null;
    /** @type {CanvasRenderingContext2D} */
    this.context = null;
  }
}

let canvasWidth = 800;
let canvasHeight = 600;

let CanvasService = {
  /** @type {HTMLElement} */
  container,
  /** @type {CanvasSet} */
  foreground,
  /** @type {CanvasSet} */
  background,
  /** @type {CanvasSet} */
  hud,
  /** @type {string} */
  backgroundColor,

  /**
   * Initializes the CanvasService in a new or existing container
   * @param {string} containerId - The id of the container to use
   */
  init: function (containerId) {
    if (this.container) {
      throw 'CanvasService is already initialized!';
    }

    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      document.getElementsByTagName('body')[0].appendChild(this.container);
    }

    this.foreground = new CanvasSet();
    this.background = new CanvasSet();
    this.hud = new CanvasSet();

    this.backgroundColor = '#FFF';

    loadCanvas(this.foreground, 'foregroundCanvas');
    loadCanvas(this.background, 'backgroundCanvas');
    loadCanvas(this.hud, 'hudCanvas');
  },

  clearCanvas: function() {
    this.foreground.context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.background.context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.hud.context.clearRect(0, 0, canvasWidth, canvasHeight);

    this.background.context.fillStyle = this.backgroundColor;
    this.background.context.fillRect(0, 0, canvasWidth, canvasHeight);
  },

  resizeCanvas: function(width, height) {
    canvasWidth = width;
    canvasHeight = height;
    this.foreground.canvas.width = width;
    this.foreground.canvas.height = height;
    this.background.canvas.width = width;
    this.background.canvas.height = height;
    this.hud.canvas.width = width;
    this.hud.canvas.height = height;
  },

  setBackgroundColor: function(color) {
    this.backgroundColor = color;
  },
};

/**
 * Loads one of the canvases into the parent container
 * @param {CanvasSet} canvasSet
 * @param {string} canvasId
 */
function loadCanvas(canvasSet, canvasId) {
  if (canvasSet.canvas) {
    throw 'Canvas already initialized!';
  }

  canvasSet.canvas = document.getElementById(canvasId);
  if (!canvasSet.canvas) {
    canvasSet.canvas = document.createElement('canvas');
    CanvasService.container.appendChild(canvasSet.canvas);
  }

  canvasSet.context = canvasSet.canvas.getContext('2d');
  canvasSet.canvas.width = canvasWidth;
  canvasSet.canvas.height = canvasHeight;
}

export { CanvasService };
