export class Sprite {
  /** @type {HTMLImageElement} */
  sheet;
  /** @type {number} */
  x;
  /** @type {number} */
  y;
  /** @type {number} */
  w;
  /** @type {number} */
  h;

  /**
   * 
   * @param {HTMLImageElement} sheet 
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   */
  constructor(sheet, x, y, w, h) {
    /** @type {HTMLImageElement} */
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
  context.drawImage(this.sheet, this.x, this.y, this.w, this.h, x, y, this.w, this.h);
}