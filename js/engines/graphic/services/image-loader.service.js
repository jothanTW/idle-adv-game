import { Sprite } from "../models/sprite.js";

/** @type {Map<string, HTMLImageElement>} */
let sourceImages = new Map();
let mirroredHImages = new Map();
let mirroredVImages = new Map();
let mirroredRImages = new Map();

let transformCanvas = document.createElement('canvas');
let transformContext = transformCanvas.getContext('2d');

let ImageLoaderService = {
  /** The pixels in loaded images to replace with transparency
   * @type {{r: number, g: number, b: number}} 
   */
  transparentColorReplacement: {
    r: 255, g: 0, b: 255
  },

  /**
   * Registers an image for future drawing, and sets transparent pixels according to transparentColorReplacement
   * @param {string} url 
   * @param {string} name 
   * @returns {Promise<HTMLImageElement>}
   */
  loadImageFromSource: function(url, name) {
    return new Promise((resolve, reject) => {
      if (sourceImages.has(name)) {
        reject('Image already loaded for ' + name + '!');
      }

      // reserve the name
      sourceImages.set(name, null);
  
      let img = new Image();
      img.src = url;
      img.onload = function() {
        // draw the image to a fake canvas
        transformCanvas.width = img.width;
        transformCanvas.height = img.height;
        transformContext.clearRect(0, 0, img.width, img.height);
        transformContext.drawImage(img, 0, 0);

        // get the pixel data and remove transparent pixels
        let pxArray = transformContext.getImageData(0, 0, img.width, img.height);
        for (let i = 0; i < pxArray.data.length; i += 4) {
          if (
            pxArray.data[i] === ImageLoaderService.transparentColorReplacement.r &&
            pxArray.data[i + 1] === ImageLoaderService.transparentColorReplacement.g &&
            pxArray.data[i + 2] === ImageLoaderService.transparentColorReplacement.b
          ) {
            pxArray.data[i + 3] = 0;
          }
        }

        // put the transformed pixels into a new image and store it
        transformContext.clearRect(0, 0, img.width, img.height)
        transformContext.putImageData(pxArray, 0, 0);
        let nImage = new Image();
        nImage.src = transformCanvas.toDataURL();
        sourceImages.set(name, nImage);
        resolve(nImage);
      }
    });
  },

  /**
   * Creates a sprite from a registered image
   * @param {string} name - The name of the registered spritesheet
   * @param {number} x - The left coordinate of the sprite
   * @param {number} y = The top coordinate of the sprite
   * @param {number} w - The width of the sprite
   * @param {number} h - The height of the sprite
   * @param {boolean} mirrorH - Should the image be flipped horizontally
   * @param {boolean} mirrorY - Should the image be flipped vertically
   * @returns {Sprite}
   */
  createSprite: function(name, x, y, w, h, mirrorH = false, mirrorV = false) {
    let img = sourceImages.get(name);
    if (!img) {
      throw 'Image ' + name + ' was not loaded!';
    }
    if (x < 0 || y < 0 || x + w > img.width || y + h > img.height) {
      throw 'Sprite bounds are outside the bounds of the image!';
    }
    if (w < 0 || h < 0) {
      throw 'Cannot make a sprite with negative width/height- to flip an image, use mirrorH or mirrorV arguments';
    }
    if (mirrorH) {
      if (mirrorV) {
        console.log('creating rotated image')
        return this.createMirroredRSprite(name, x, y, w, h);
      }
      console.log('creating h flipped image')
      return this.createMirroredHSprite(name, x, y, w, h);
    }
    if (mirrorV) {
      console.log('creating v flipped image')
      return this.createMirroredVSprite(name, x, y, w, h);
    }
    console.log('creating normal image')
    return new Sprite(img, x, y, w, h);
  },

  createMirroredHSprite: function(name, x, y, w, h) {
    if (!mirroredHImages.has(name)) {
      this.mirrorImageH(name);
    }
    let img = mirroredHImages.get(name);
    // transform the coordinates
    y = img.height - (y + h);
    return new Sprite(img, x, y, w, h);
  },

  createMirroredVSprite: function(name, x, y, w, h) {
    if (!mirroredVImages.has(name)) {
      this.mirrorImageV(name);
    }
    let img = mirroredVImages.get(name);
    // transform the coordinates
    x = img.width - (x + w);
    return new Sprite(img, x, y, w, h);
  },

  createMirroredRSprite: function(name, x, y, w, h) {
    if (!mirroredRImages.has(name)) {
      this.mirrorImageR(name);
    }
    let img = mirroredRImages.get(name);
    // transform the coordinates
    x = img.width - (x + w);
    y = img.height - (y + h);
    return new Sprite(img, x, y, w, h);
  },

  mirrorImageH: function(name) {
    if (!sourceImages.has(name)) {
      throw 'Source image ' + name + ' has not been loaded!';
    }
    if (mirroredHImages.has(name)) {
      return;
    }

    let img = sourceImages.get(name);

    let mImage = new Image();
    
    transformCanvas.width = img.width;
    transformCanvas.height = img.height;
    transformContext.clearRect(0, 0, img.width, img.height);

    transformContext.save();
    transformContext.scale(1, -1);
    transformContext.drawImage(img, 0, img.height * -1);
    transformContext.restore();
    
    mImage.src = transformCanvas.toDataURL();

    mirroredHImages.set(name, mImage);
  },

  mirrorImageV: function(name) {
    if (!sourceImages.has(name)) {
      throw 'Source image ' + name + ' has not been loaded!';
    }
    if (mirroredVImages.has(name)) {
      return;
    }

    let img = sourceImages.get(name);

    let mImage = new Image();
    
    transformCanvas.width = img.width;
    transformCanvas.height = img.height;
    transformContext.clearRect(0, 0, img.width, img.height);

    transformContext.save();
    transformContext.scale(-1, 1);
    transformContext.drawImage(img, img.width * -1, 0);
    transformContext.restore();
    
    mImage.src = transformCanvas.toDataURL();

    mirroredVImages.set(name, mImage);
  },
  
  mirrorImageR: function(name) {
    if (!sourceImages.has(name)) {
      throw 'Source image ' + name + ' has not been loaded!';
    }
    if (mirroredRImages.has(name)) {
      return;
    }

    let img = sourceImages.get(name);

    let mImage = new Image();
    
    transformCanvas.width = img.width;
    transformCanvas.height = img.height;
    transformContext.clearRect(0, 0, img.width, img.height);

    transformContext.save();
    transformContext.scale(-1, -1);
    transformContext.drawImage(img, img.width * -1, img.height * -1);
    transformContext.restore();
    
    mImage.src = transformCanvas.toDataURL();

    mirroredRImages.set(name, mImage);
  },
};

export { ImageLoaderService };
