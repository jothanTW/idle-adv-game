export class Sprite {
  /** @type {number} */
  sheetId;
  /** @type {number} */
  x;
  /** @type {number} */
  y;
  /** @type {number} */
  w;
  /** @type {number} */
  h;
  /** @type {WebGLBuffer} */
  vertBuffer;
  /** @type {WebGLBuffer} */
  texBuffer;

  /**
   * 
   * @param {number} sheetId
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   */
  constructor(sheet, x, y, w, h) {
    /** @type {number} */
    this.sheet = sheet;
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.w = w;
    /** @type {number} */
    this.h = h;
  }
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {number} x 
 * @param {number} y 
 */
Sprite.prototype.draw = function(context, x, y) {
  
}

/**
 * @param {WebGLRenderingContext} gl 
 */
Sprite.prototype.setBuffers = function(gl) {
  this.texBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);

  let l = this.x;
  let t = this.y;
  let r = this.x + this.w;
  let b = this.y + this.h;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([ l, t, r, t, r, b, l, b ]),
    gl.STATIC_DRAW,
  );

  this.vertBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array([this.w, this.h, 0, this.h, this.w, 0, 0, 0]), 
    gl.STATIC_DRAW);
}