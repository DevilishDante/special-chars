import {clearHistory,clearColor} from './history.js'
var xMousePosition = 0
var yMousePosition = 0

document.oncontextmenu = function() {return false}
onmousemove = function(e){
    xMousePosition = e.clientX
    yMousePosition = e.clientY   
}

function remove(element) {
    clearColor(element.id)
}

function remove_all(element) {
    clearHistory()
}

export function context(element) {
    var x = document.getElementById('ctxmenu1')
    if(x) x.parentNode.removeChild(x)
    var d = document.createElement('div')
    d.setAttribute('class', 'ctxmenu')
    d.setAttribute('id', 'ctxmenu1')
    element.parentNode.appendChild(d)
    d.style.left = xMousePosition + "px"
    d.style.top = yMousePosition + "px"

    d.onmouseover = function() { this.style.cursor = 'pointer' } 
    d.onclick = function() { d.remove()  }
    document.body.onclick = function() { d.remove() }

    var p1 = document.createElement('p')
    d.appendChild(p1)
    p1.onclick=function() { remove(element) }  
    p1.setAttribute('class', 'ctxline')
    p1.textContent = "Clear" 

    var p2 = document.createElement('p')
    d.appendChild(p2)
    p2.onclick=function() { remove_all(element) }  
    p2.setAttribute('class', 'ctxline')
    p2.textContent = "Clear all"

    return false
}