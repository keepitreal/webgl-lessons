// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`;

var FSHADER_SOURCE = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

function main() {
  // Retrieve canvas el
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);

  // Set the color for clearing the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // draw a point
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
  ]);

  var n = 4;

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  return n;
}

