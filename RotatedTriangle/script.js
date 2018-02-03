// Vertex shader program
var VSHADER_SOURCE = `
  // x' = x cos b - y sin b
  // y' = x sin b + y cos b
  // z' = z
  attribute vec4 a_Position;
  uniform float u_CosB, u_SinB;
  void main() {
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB - a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }
`;

var FSHADER_SOURCE = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

// Rotation Angle
var ANGLE = 90.0;

function main() {
  // Retrieve canvas el
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);

  // Pass the data required to rotate the shape to the vertex shader
  var radian = Math.PI * ANGLE / 180.0; // Convert to radians
  var cosB = Math.cos(radian);
  var sinB = Math.sin(radian);
  var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
  var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');

  gl.uniform1f(u_CosB, cosB);
  gl.uniform1f(u_SinB, sinB);

  // Set the color for clearing the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // draw a point
  gl.drawArrays(gl.TRIANGLES, 0, n);
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

