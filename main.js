<<<<<<< HEAD
var canvas1 = document.getElementById('canvas')
var context = canvas.getContext('2d')
//
autoSetSize(canvas1)

listenToMouse(canvas1)
var activeEraser = false
eraser.onclick = function () {
  activeEraser = true
  action.className = 'action x'
}
brush.onclick = function () {
  activeEraser = false
  action.className = 'action'
}
//
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
}

function setCanvasSize(canvas) {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

function autoSetSize(canvas1) {
  setCanvasSize(canvas1)
  window.onresize = function setPageSize(canvas1) {
    setCanvasSize(canvas1)
  }
}

function listenToMouse(canvas) {
  var lastPoint = {
    'x': undefined,
    'y': undefined
  }
  var using = false
  canvas.onmousedown = function (a) {
    var x = a.clientX
    var y = a.clientY
    using = true
    if (activeEraser) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      drawCircle(x, y, 1)
      lastPoint = {
        'x': x,
        'y': y
      }
    }
  }
  canvas.onmousemove = function (a) {
    var x = a.clientX
    var y = a.clientY
    if (!using) {
      return
    }
    if (activeEraser) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var newPoint = {
        'x': x,
        'y': y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
  canvas.onmouseup = function (a) {
    using = false
  }
=======
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
>>>>>>> 97c53adf4662408ca7c73f43faf971d60e2c795c
}