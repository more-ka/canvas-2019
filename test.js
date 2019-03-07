var e = document.getElementById('canvas')
var painting = false
//按下
e.onmousedown = function (a) {
  painting = true
  var x = a.clientX
  var y = a.clientY
  var div = document.createElement('div')
  console.log(x, y)
  div.style = "width:2px;height:2px;border-radius:50%;position:absolute;background:black;left:"+ x+"px;top:" + y +"px"
  e.appendChild(div)
}
e.onmousemove = function (a) {
  if (painting) {
    var x = a.clientX
    var y = a.clientY
    var div = document.createElement('div')
    div.style = "position:absolute;width:2px;height:2px;border-radius:50%;background:black;left:" + x + "px;top:" + y + "px"
    e.appendChild(div)
  }
}
e.onmouseup = function (a) {
  painting = false
}