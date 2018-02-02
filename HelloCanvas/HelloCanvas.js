function main() {
  // Retrieve canvas el
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);

  gl.clearColor(0.5, 0.5, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
