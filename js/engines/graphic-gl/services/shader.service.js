
/**
 * @param {WebGLRenderingContext} gl 
 * @param {number} type 
 * @param {string} source 
 * @returns {WebGLShader | null}
 */
function loadShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

let ShaderService = {
  fragmentShader: null,
  vertexShader: null,

  /**
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLShader} vertexShader 
   * @param {WebGLShader} fragmentShader 
   * @returns {WebGLProgram}
   */
  linkShaders: function (gl, vertexShader, fragmentShader) {
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(shaderProgram,));
      return null;
    }

    return shaderProgram;
  },

  /**
   * @param {WebGLRenderingContext} gl 
   * @param {number} type 
   * @param {string} url 
   * @returns {Promise<WebGLShader>}
   */
  loadShaderFromURL(gl, type, url) {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.addEventListener('load', data => {
        if (data.target.status == 200) {
          resolve(loadShader(gl, type, data.target.responseText));
        } else {
          reject(data.target.statusText)
        }
      });
      req.addEventListener('error', data => {
        console.error(data);
        reject();
      });
      req.open("GET", url);
      req.send();
    });
  },
}

export {
  ShaderService
}