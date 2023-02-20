// affiche l'historique des couleurs
import {tooltip,printColor} from './print-color.js'
import {context} from './context-history.js'
export function history() {
    const history = document.getElementById("history")
    while (history.firstChild) history.removeChild(history.firstChild)
    const colors = getColors()
    for (let i = 0; i < 10; i++) {
        const color = document.createElement('span')
        color.classList.add('clr')
        history.appendChild(color)
    }
    if (!localStorage.getItem('colors')) return
    let i = 0
    colors.slice().reverse().forEach(function(e) {
        const colored = history.querySelectorAll('span')[i]
        colored.style.backgroundColor = e.color
        colored.id = e.id
        colored.style.cursor = 'pointer'
        colored.addEventListener("contextmenu",function() {return context(this)})
        tooltip(colored,'top','Choose me  !',true,'3rem','3.5rem')
        colored.addEventListener('click', () => {
            document.getElementById('pick-color').value=e.color
            printColor(e.color)
        });
        ++i    
    });
}
// suprime l'historique
export function clearHistory() {
    if (localStorage.getItem('colors')) localStorage.removeItem('colors')
    history()
}
// suprime une couleur précise dans l'historique
export function clearColor(ColorsId) {
    if (localStorage.getItem('colors')) {
        const colors = JSON.parse(localStorage.getItem('colors'))
        const clrs = []
        colors.forEach(color => {
            if (color.id !== ColorsId){
                clrs.push(color)
            }
        })
        localStorage.setItem('colors', JSON.stringify(clrs))
        history()
    }
}
// sauvegarde la couleur dans l'historique
export function saveColor(color) {
    const old = localStorage.getItem('colors')
    if (!old) {
        const colors = []
        let id = crypto.randomUUID();
        colors.push({color:color,id:id})
        localStorage.setItem('colors', JSON.stringify(colors))
    } else {
        let id = crypto.randomUUID()
        const colors = []
        JSON.parse(old).forEach(color => colors.push(color))
        var exists = false
        colors.forEach(clr => {
            if (clr.id === id) return exists = true
            if (clr.color === color) return exists = true
        })
        if (exists) {document.getElementById('save-color').onclick = () => {
            const noadd = document.getElementById('no-add') 
            noadd.innerHTML = '<div class="red-alert"><svg width="32px" height="32px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M19.5907523,15.8607776 L12.0056301,1.92309891 C11.5148908,1.01057747 10.7787819,0.5 9.98933176,0.5 C9.19988163,0.5 8.47444097,1.02144082 7.97303345,1.93396226 L0.409247749,15.8607776 C-0.0814915205,16.7624357 -0.134832745,17.6858205 0.270560564,18.3919383 C0.675953874,19.098056 1.48674049,19.5 2.48955552,19.5 L17.5104445,19.5 C18.5132595,19.5 19.3240461,19.098056 19.7294394,18.3919383 C20.1348327,17.6858205 20.0814915,16.773299 19.5907523,15.8607776 Z M10,4.85620354 C10.3947251,4.85620354 10.7147724,5.18210406 10.7147724,5.58404803 L10.7147724,12.1672384 C10.7147724,12.5692158 10.3947579,12.8950829 10,12.8950829 C9.6052421,12.8950829 9.28522759,12.5692158 9.28522759,12.1672384 L9.28522759,5.58404803 C9.28522759,5.19296741 9.60527494,4.85620354 10,4.85620354 L10,4.85620354 Z M10,16.4799886 C9.38124179,16.4799886 8.89050252,15.9694111 8.89050252,15.3393368 C8.89050252,14.7092624 9.39191004,14.198685 10,14.198685 C10.6187582,14.198685 11.1094975,14.7092624 11.1094975,15.3393368 C11.1094975,15.9694111 10.60809,16.4799886 10,16.4799886 Z"/></svg> This color already exist !</div>'
            setTimeout(() => noadd.innerHTML = '', 1500)
        }
        return}
        if (colors.length >= 10) colors.shift()
        colors.push({color:color,id:id})
        localStorage.setItem('colors', JSON.stringify(colors))
    }
    history()
}
// parse les couleurs en string
export function getColors(){ return JSON.parse(localStorage.getItem('colors'))}