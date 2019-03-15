var canvas1 = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 2
var eraserWidth = 10
autoSetSize(canvas1)
function Clear(){
  context.clearRect(0,0,canvas1.width,canvas1.height)
}
fillWhite()

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
black.onclick = function () {
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
Thin.onclick = function () {
  thin_banner.classList.add('active')
  medium_banner.classList.remove('active')
  thick_banner.classList.remove('active')
  lineWidth = 0.5
  eraserWidth = 5
}
Medium.onclick = function () {
  thin_banner.classList.remove('active')
  medium_banner.classList.add('active')
  thick_banner.classList.remove('active')
  lineWidth = 1
  eraserWidth = 10
}
Thick.onclick = function () {
  thin_banner.classList.remove('active')
  medium_banner.classList.remove('active')
  thick_banner.classList.add('active')
  lineWidth = 3
  eraserWidth = 20
}
clear.onclick = function (){
  context.clearRect(0,0,canvas1.width,canvas1.height)
}
download.onclick = function(){
  var url = canvas1.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.click()
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
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
        context.clearRect(x - (eraserWidth/2), y - (eraserWidth/2),eraserWidth,eraserWidth)
      } else {
        drawCircle(x, y, 0.5)
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
        context.clearRect(x - (eraserWidth/2), y - (eraserWidth/2), eraserWidth, eraserWidth)
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
        context.clearRect(x - 5, y - 5, eraserWidth, eraserWidth)
      } else {
        drawCircle(x, y, 0.5)
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
        context.clearRect(x - 5, y - 5, eraserWidth, eraserWidth)
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
function fillWhite() {  //下载图片背景色
  context.fillStyle= 'white'
  context.fillRect(0,0,canvas1.width,canvas1.height)
}