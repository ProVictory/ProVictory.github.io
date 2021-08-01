let logCss = 'background-color:blue; padding: 0 0.5em 0 0.5em; border-radius: 1em; color: white;'
console.log('%cindex.js', logCss, 'loaded')


let canvas = document.querySelector("#canvas")
console.log(canvas)
let gl = canvas.getContext("webgl")
if (!gl) alert("no WebGL content found")

let vertexShaderSource = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`
let fragmentShaderSource = `
precision mediump float;
 
void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
}
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = createProgram(gl, vertexShader, fragmentShader)
const positionAttributeLocation = gl.getAttribLocation(program, "a_position")

let positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
var positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.useProgram(program)

gl.enableVertexAttribArray(positionAttributeLocation)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

 // draw
var primitiveType = gl.TRIANGLES
var offset = 0
var count = 3
gl.drawArrays(primitiveType, offset, count)