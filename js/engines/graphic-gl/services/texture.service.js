import { Color } from "../models/color.js";

let transformCanvas = document.createElement('canvas');
let transformContext = transformCanvas.getContext('2d');

  /**
   * @param {WebGLRenderingContext} gl 
   * @param {HTMLImageElement} image
   * @returns {WebGLTexture}
   */
function createTextureFromLoadedImage(gl, image) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    image,
  );

  return texture;
}

let TextureService = {
  /**
   * @param {WebGLRenderingContext} gl 
   * @param {string} url 
   * @param {Color} transparentColor
   * @returns {Promise<WebGLTexture>}
   */
  loadTexture: function(gl, url, transparentColor = null) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        if (transparentColor) {
          transformCanvas.width = image.width;
          transformCanvas.height = image.height;
          transformContext.clearRect(0, 0, image.width, image.height);
          transformContext.drawImage(image, 0, 0);
  
          // get the pixel data and remove transparent pixels
          let pxArray = transformContext.getImageData(0, 0, image.width, image.height);
          for (let i = 0; i < pxArray.data.length; i += 4) {
            if (
              pxArray.data[i] === transparentColor.r &&
              pxArray.data[i + 1] === transparentColor.g &&
              pxArray.data[i + 2] === transparentColor.b
            ) {
              pxArray.data[i + 3] = 0;
            }
          }
  
          // put the transformed pixels into a new image and store it
          transformContext.clearRect(0, 0, image.width, image.height)
          transformContext.putImageData(pxArray, 0, 0);
          let nImage = new Image();
          nImage.onload = () => {
            try {
              resolve(createTextureFromLoadedImage(gl, nImage));
            } catch (e) {
              reject(e);
            }
          }
          nImage.onerror = (err) => {
            reject(err);
          }
          nImage.src = transformCanvas.toDataURL();
          return;
        }
        try {
          resolve(createTextureFromLoadedImage(gl, image));
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = (err) => {
        reject(err);
      }
      image.src = url;
    });
  },

  /**
   * @param {string} url 
   * @returns {Color}
   */
  getBackgroundColorFromPalette: function(url) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        if (transparentColor) {
          transformCanvas.width = img.width;
          transformCanvas.height = img.height;
          transformContext.clearRect(0, 0, img.width, img.height);
          transformContext.drawImage(img, 0, 0);
  
          // get the pixel data and remove transparent pixels
          let pxArray = transformContext.getImageData(0, 0, img.width, img.height);

          resolve(new Color(
            pxArray[0], pxArray[1], pxArray[2], pxArray[3]
          ));
        }
      }
    });
  }
}

export {
  TextureService
}