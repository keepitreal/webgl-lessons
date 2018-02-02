// Vertex shader program
var VSHADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.0, 0.5, 0.0, 1.0); // coordinates
    gl_PointSize = 10.0; // set the point size
  }
`;

var FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }
`;

function main() {
  // Retrieve canvas el
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('failed to initialize shaders');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // draw a point
  gl.drawArrays(gl.POINTS, 0, 1);
}
