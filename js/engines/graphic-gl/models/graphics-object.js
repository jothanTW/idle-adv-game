import { Sprite } from "./sprite.js";

export class GraphicsObject {
  backupCharacter;
  x;
  y;
  color;
  anim;
  /** @type {{front: Sprite[], back: Sprite[], left: Sprite[], right: Sprite[]}} */
  sprites;
  facing;

  constructor() {
    this.backupCharacter = "X";
    this.color = "#000000";
    this.anim = {
      timer: 0,
      clock: 0,
      state: 0,
    };
    /** @type {{front: Sprite[], back: Sprite[], left: Sprite[], right: Sprite[]}} */
    this.sprites = {
      front: [],
      back: [],
      left: [],
      right: [],
    };
    this.facing = 0;
    this.x = 0;
    this.y = 0;
  }
}

/** Progresses the animation state by a number of clock ticks
 * @param {number} time - the number of clock ticks to progress the state; defaults to 1
*/
GraphicsObject.prototype.tick = function (time = 1) {
  if (this.anim.timer <= 0) {
    return;
  }
  this.anim.clock += time;
  while (this.anim.clock >= this.anim.timer) {
    this.anim.clock -= this.anim.timer;
    this.anim.state++;
  }
};

/**
 * @returns {Sprite}
 */
GraphicsObject.prototype.getCurrentSprite = function () {
 this.facing = this.facing % 4; // make sure here
 let spriteArr;
 switch (this.facing) {
   case 0:
     spriteArr = this.sprites.front;
     break;
   case 1:
     spriteArr = this.sprites.left;
     break;
   case 2:
     spriteArr = this.sprites.back;
     break;
   case 3:
     spriteArr = this.sprites.right;
     break;
 }
 let i = this.anim.state % spriteArr.length;
 return spriteArr[i];
};

/**
 * @param {string} char 
 * @param {string} color 
 */
GraphicsObject.prototype.setBackupCharacter = function(char, color) {
  this.backupCharacter = char;
  this.color = color;
}

/**
 * Sets the number of clock frames between animation frames
 * Non-positive values will halt animation
 * @param {number} time 
 */
GraphicsObject.prototype.setAnimationTime = function(time) {
  this.anim.timer = time;
}

/**
 * @param {number} facing 
 * @param  {...Sprite} sprites 
 */
GraphicsObject.prototype.setSprites = function(facing, ...sprites) {
  if (facing < 0 || facing > 3) {
    throw 'Facing value out of bounds for setting sprites!';
  }
  switch (this.facing) {
    case 0:
      this.sprites.front = sprites;
      break;
    case 1:
      this.sprites.left = sprites;
      break;
    case 2:
      this.sprites.back = sprites;
      break;
    case 3:
      this.sprites.right = sprites;
      break;
  }
}

/** @param {number} facing */
GraphicsObject.prototype.setFacing = function(facing) {
  if (facing < 0 || facing > 3) {
    throw 'Facing value out of bounds for setting facing!';
  }
  this.facing = facing;
}