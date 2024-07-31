import { CanvasService } from "./services/canvas.service.js"
import { ShaderService } from "./services/shader.service.js";
import { TextureService } from "./services/texture.service.js";

/** @type {WebGLShader} */
let fragmentShader;
/** @type {WebGLShader} */
let vertexShader;
/** @type {WebGLProgram} */
let shaderProgram;

const maxTextures = 8;
let currentTextureNum = 0;

let GraphicsEngine = {

  /**
   * @param {string} canvasContainerId 
   * @returns {Promise<any>}
   */
  init: function(canvasContainerId = 'main') {
    CanvasService.init(canvasContainerId);
    let gl = CanvasService.getGlContext();
    return Promise.all([
      ShaderService.loadShaderFromURL(gl, gl.VERTEX_SHADER, '/shaders/shader.vert'),
      ShaderService.loadShaderFromURL(gl, gl.FRAGMENT_SHADER, '/shaders/shader.frag'),
    ]).then(data => {
      vertexShader = data[0];
      fragmentShader = data[1];
      shaderProgram = ShaderService.linkShaders(gl, data[0], data[1]);
    });
  },

  loadTexture: function(url) {
    if (currentTextureNum >= maxTextures) {
      return Promise.reject('Loaded too many textures for fast loading!');
    }
    let gl = CanvasService.getGlContext();
    return TextureService.loadTexture(gl, url).then(texture => {
      gl.activeTexture(gl['TEXTURE' + currentTextureNum]);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    }).then(() => {
      return currentTextureNum++;
    });
  },

  setBackgroundColor: function(color) {
    CanvasService.setBackgroundColor(color);
  },

  clearCanvas: function() {
    CanvasService.clearCanvas();
  },
}

export { GraphicsEngine }