var canvas1 = document.getElementById('canvas')
var context = canvas.getContext('2d')
autoSetSize(canvas1)
listenToUser(canvas1)
var activeEraser = false
eraser.onclick = function () {
  activeEraser = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function () {
  activeEraser = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}
black.onclick = function(){
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  context.fillStyle = 'balck'
  context.strokeStyle = 'black'
}
red.onclick = function () {
  black.classList.remove('active')
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
}
green.onclick = function () {
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
  context.fillStyle = 'lightgreen'
  context.strokeStyle = 'lightgreen'
}
blue.onclick = function () {
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
  context.fillStyle = 'lightskyblue'
  context.strokeStyle = 'lightskyblue'
}





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

function listenToUser(canvas) {
  var lastPoint = {
    'x': undefined,
    'y': undefined
  }
  var using = false
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (a) {
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
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
    canvas.ontouchmove = function (a) {
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
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
  } else {
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
  }
}