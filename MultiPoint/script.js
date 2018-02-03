// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
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
  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
  ]);

  var n = 3;

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

