var canvas1 = document.getElementById('canvas')
var context = canvas.getContext('2d')

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 2
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}
var painting = false
var lastPoint = {
  x: undefined,
  y: undefined
}
canvas1.onmousedown = function (a) {
  painting = true
  var x = a.clientX
  var y = a.clientY
  lastPoint = {
    "x": x,
    "y": y
  }
  drawCircle(x, y, 1)
}
canvas1.onmousemove = function (a) {
  if (painting) {
    var x2 = a.clientX
    var y2 = a.clientY
    var newPoint = {
      'x': x2,
      'y': y2
    }
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint = newPoint
  }
}
canvas1.onmouseup = function (a) {
  painting = false
}