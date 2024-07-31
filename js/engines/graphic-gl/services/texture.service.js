let TextureService = {
  /**
   * @param {WebGLRenderingContext} gl 
   * @param {string} url 
   * @returns {Promise<WebGLTexture>}
   */
  loadTexture: function(gl, url) {
    return new Promise((resolve, reject) => {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
  
      let image = new Image();
      image.onload = () => {
        try {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            image,
          );
          resolve(texture);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = (err) => {
        reject(err);
      }
      image.src = url;
    });
  }
}

export {
  TextureService
}