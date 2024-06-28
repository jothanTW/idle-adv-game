

let CanvasService = {
  container,
  foreground: {
    canvas,
    context,
  },
  background: {
    canvas,
    context,
  },

  init: function(containerId = 'mainCanvasContainer') {
    if (this.canvas) {
      throw 'CanvasService is already initialized!';
    }
    this.container = document.getElementById(containerId);
    // make the container, make the canvases
  }
}

export {
  CanvasService
}