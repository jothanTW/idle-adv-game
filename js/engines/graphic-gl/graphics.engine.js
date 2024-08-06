import { Color } from "./models/color.js";
import { GraphicsObject } from "./models/graphics-object.js";
import { Sprite } from "./models/sprite.js";

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
let currentTextureNum = 1;

let GraphicsEngine = {
  Color,
  GraphicsObject,
  Sprite,

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
      gl.useProgram(shaderProgram);
    });
  },

  loadTexture: function(url, transparency) {
    if (currentTextureNum >= maxTextures) {
      return Promise.reject('Loaded too many textures for fast loading!');
    }
    let gl = CanvasService.getGlContext();
    return TextureService.loadTexture(gl, url, transparency).then(texture => {
      gl.activeTexture(gl['TEXTURE' + currentTextureNum]);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    }).then(() => {
      return currentTextureNum++;
    });
  },

  loadPalette: function(url) {
    return TextureService.getBackgroundColorFromPalette(url).then(color => {
      this.setBackgroundColor(color);
      
      let gl = CanvasService.getGlContext();
      return TextureService.loadTexture(gl, url).then(texture => {
        this.setPalette(texture);
      });
    });
  },

  setBackgroundColor: function(color) {
    CanvasService.setBackgroundColor(color);
  },

  clearCanvas: function() {
    CanvasService.clearCanvas();
  },

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   */
  setCameraFrame: function(x, y, width, height) {
    let gl = CanvasService.getGlContext();
    gl.uniform1f(gl.getAttribLocation(shaderProgram, 'uLeft'), x);
    gl.uniform1f(gl.getAttribLocation(shaderProgram, 'uTop'), y);
    gl.uniform1f(gl.getAttribLocation(shaderProgram, 'uWidth'), width);
    gl.uniform1f(gl.getAttribLocation(shaderProgram, 'uHeight'), height);
  },

  /**
   * @param {WebGLTexture} texture 
   */
  setPalette: function(texture) {
    let gl = CanvasService.getGlContext();
    // The palette is always on texture slot 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation('uPalette'), 0);
  },

  /**
   * @param {GraphicsObject} obj 
   */
  setObjectAttributes: function(obj) {
    let gl = CanvasService.getGlContext();
    gl.vertexAttrib1f(gl.getAttribLocation(shaderProgram, 'aPosCoord'), obj.x, obj.y);

    let sprite = obj.getCurrentSprite();

    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.texBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, 'aTexCoord'), 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, 'aTexCoord'));

    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vertBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, 'aPosCoord'), 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, 'aPosCoord'));
    
    gl.uniform1i(gl.getUniformLocation('uSampler'), sprite.sheet);
  },

  /**
   * @param {GraphicsObject[]} objs 
   */
  draw: function(objs) {
    let gl = CanvasService.getGlContext();
    this.clearCanvas();

    for (let obj of objs) {
      this.setObjectAttributes(gl, obj);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }
}

export { GraphicsEngine }