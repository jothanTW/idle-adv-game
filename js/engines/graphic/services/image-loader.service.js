import { Sprite } from "../models/sprite";

/** @type {Map<string, HTMLImageElement>} */
let sourceImages = new Map();

let transformCanvas = document.createElement('canvas');
let transformContext = transformCanvas.getContext('2d');

let ImageLoaderService = {
  /** The pixels in loaded images to replace with transparency
   * @type {{r: number, g: number, b: number}} 
   */
  transparentColorReplacement: {
    r: 0, g: 0, b: 0
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
            pxArray.data[i] === this.transparentColorReplacement.r &&
            pxArray.data[i + 1] === this.transparentColorReplacement.g &&
            pxArray.data[i + 2] === this.transparentColorReplacement.b
          ) {
            pxArray[i + 3] = 0;
          }
        }

        // put the transformed pixels into a new image and store it
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
   * @param {string} name 
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   * @returns {Sprite}
   */
  createSprite: function(name, x, y, w, h) {
    let img = sourceImages.get(name);
    if (!img) {
      throw 'Image ' + name + ' was not loaded!';
    }
    if (x < 0 || y < 0 || x + w > img.width || y + h > img.height) {
      throw 'Sprite bounds are outside the bounds of the image!';
    }
    return new Sprite(img, x, y, w, h);
  }
};

export { ImageLoaderService };
