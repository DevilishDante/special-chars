// get et affiche la couleur
export function printColor(color) {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const result_rgb = document.getElementById("result-rgb")
    const result_hex = document.getElementById("result-hex")
    const pickicon = document.getElementById('pick-icon')
    while (result_rgb.firstChild) result_rgb.removeChild(result_rgb.firstChild)

    const red = document.createElement('span')
    red.classList.add('red')
    red.textContent = `R: ${r}`
    result_rgb.appendChild(red)

    const green = document.createElement('span')
    green.classList.add('green')
    green.textContent = `G: ${g}`
    result_rgb.appendChild(green)
    
    const blue = document.createElement('span')
    blue.classList.add('blue')
    blue.textContent = `B: ${b}`
    result_rgb.appendChild(blue)
    result_rgb.onclick = () => {
        result_rgb.textContent = 'Copied !'
        navigator.clipboard.writeText(`rgb(${r},${g},${b})`)
        setTimeout(() => printColor(color), 1500)
    }
    // partie hexa
    while (result_hex.firstChild) result_hex.removeChild(result_hex.firstChild)
    const hex = document.createElement('div')
    hex.classList.add('hex')
    hex.textContent = color
    hex.onclick = () => {
        hex.textContent = 'Copied !'
        navigator.clipboard.writeText(color)
        setTimeout(() => hex.textContent = color, 1500)
    }
    svg(invertColor(color,true))
    result_hex.appendChild(hex)
}
// inverse la couleur du picker
export function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {hex = hex.slice(1);}
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];}
    if (hex.length !== 6) {throw new Error('Invalid HEX color.');}
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
export function svg (color) {
    const svg = document.getElementById('search-svg')
    svg.innerHTML = `<svg fill="${color}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="16px" height="16px" viewBox="0 0 592.709 592.709"
    xml:space="preserve">
        <g>
            <g>
                <path d="M442.029,347.604c3.979-7.188,7.602-14.597,10.829-22.228c12.205-28.856,18.395-59.485,18.395-91.035
                    s-6.188-62.178-18.395-91.035c-11.78-27.851-28.635-52.854-50.097-74.316s-46.466-38.317-74.316-50.097
                    C299.589,6.689,268.96,0.5,237.411,0.5s-62.179,6.189-91.035,18.395c-27.851,11.78-52.854,28.635-74.316,50.097
                    c-21.461,21.462-38.317,46.465-50.097,74.316C9.757,172.165,3.568,202.793,3.568,234.342s6.188,62.178,18.394,91.035
                    c11.78,27.852,28.635,52.854,50.097,74.316c21.462,21.462,46.465,38.317,74.316,50.097c28.857,12.205,59.486,18.395,91.035,18.395
                    s62.178-6.188,91.035-18.395c4.836-2.045,9.579-4.253,14.239-6.603l131.022,131.023c11.607,11.606,27.038,17.998,43.452,17.998
                    s31.846-6.392,43.452-17.998l10.561-10.56c23.959-23.96,23.959-62.944,0.001-86.903L442.029,347.604z M349.255,389.175
                    c-11.984,8.672-25.014,15.986-38.866,21.719c-22.486,9.306-47.13,14.451-72.979,14.451c-105.488,0-191.002-85.515-191.002-191.003
                    S131.922,43.34,237.41,43.34s191.003,85.515,191.003,191.002c0,29.135-6.534,56.74-18.2,81.447
                    c-6.313,13.373-14.131,25.895-23.239,37.346C376.108,366.795,363.413,378.93,349.255,389.175z M540.879,533.358l-10.561,10.56
                    c-3.635,3.635-8.397,5.451-13.159,5.451c-4.763,0-9.525-1.817-13.16-5.451L379.873,419.792
                    c8.011-6.169,15.655-12.865,22.889-20.099c5.162-5.162,10.051-10.534,14.674-16.097L540.879,507.04
                    C548.146,514.308,548.146,526.09,540.879,533.358z"/>
                <path d="M517.159,592.709c-16.547,0-32.104-6.444-43.806-18.145L342.587,443.797c-4.647,2.334-9.338,4.505-13.947,6.454
                    c-28.917,12.231-59.611,18.434-91.229,18.434c-31.615,0-62.31-6.202-91.23-18.434c-27.909-11.804-52.966-28.695-74.475-50.204
                    c-21.509-21.509-38.399-46.566-50.204-74.476C9.271,296.653,3.068,265.96,3.068,234.342c0-31.616,6.202-62.31,18.434-91.229
                    c11.804-27.909,28.695-52.966,50.204-74.475c21.509-21.508,46.565-38.399,74.475-50.204C175.1,6.202,205.793,0,237.411,0
                    c31.616,0,62.31,6.202,91.229,18.434c27.911,11.805,52.968,28.696,74.476,50.204c21.507,21.507,38.398,46.564,50.204,74.475
                    c12.231,28.917,18.434,59.611,18.434,91.229c0,31.615-6.202,62.309-18.434,91.229c-3.13,7.399-6.719,14.781-10.671,21.945
                    l128.878,128.878c24.153,24.154,24.152,63.456-0.001,87.61l-10.561,10.56C549.265,586.265,533.707,592.709,517.159,592.709z
                        M342.782,442.578l131.278,131.279c11.513,11.512,26.818,17.852,43.099,17.852c16.281,0,31.587-6.34,43.099-17.852l10.561-10.56
                    c23.764-23.765,23.764-62.432,0.001-86.196l-129.41-129.41l0.183-0.329c4.007-7.237,7.642-14.699,10.806-22.18
                    c12.18-28.797,18.355-59.359,18.355-90.84c0-31.483-6.176-62.046-18.355-90.84c-11.755-27.792-28.574-52.742-49.989-74.158
                    c-21.416-21.416-46.366-38.235-74.157-49.99C299.455,7.176,268.892,1,237.411,1c-31.482,0-62.045,6.176-90.84,18.355
                    C118.78,31.109,93.83,47.928,72.413,69.345c-21.417,21.417-38.236,46.368-49.99,74.158c-12.179,28.795-18.354,59.358-18.354,90.84
                    c0,31.483,6.175,62.045,18.354,90.84c11.754,27.789,28.573,52.739,49.99,74.157c21.418,21.418,46.368,38.236,74.158,49.989
                    c28.796,12.18,59.359,18.355,90.84,18.355c31.483,0,62.046-6.176,90.84-18.355c4.695-1.985,9.476-4.202,14.208-6.588
                    L342.782,442.578z M517.159,549.869c-5.104,0-9.903-1.988-13.514-5.598L379.117,419.743l0.451-0.348
                    c8.035-6.188,15.72-12.936,22.84-20.056c5.08-5.08,10.007-10.484,14.643-16.062l0.351-0.422l123.831,123.831
                    c7.45,7.45,7.45,19.574,0,27.025l-10.561,10.56C527.062,547.881,522.264,549.869,517.159,549.869z M380.629,419.841
                    l123.724,123.724c3.422,3.421,7.97,5.305,12.807,5.305s9.385-1.884,12.806-5.305l10.561-10.56c7.061-7.062,7.061-18.551,0-25.611
                    L417.469,384.338c-4.553,5.452-9.38,10.735-14.354,15.709C396.098,407.064,388.535,413.722,380.629,419.841z M237.409,425.845
                    c-105.595,0-191.502-85.908-191.502-191.503S131.814,42.84,237.41,42.84s191.503,85.908,191.503,191.502
                    c0,28.542-6.14,56.016-18.248,81.661c-6.281,13.305-14.121,25.902-23.3,37.443c-10.904,13.709-23.628,25.866-37.817,36.134
                    c-12.103,8.757-25.213,16.083-38.968,21.775C287.348,420.97,262.73,425.845,237.409,425.845z M237.41,43.84
                    c-105.043,0-190.503,85.459-190.503,190.502c0,105.044,85.459,190.503,190.502,190.503c25.189,0,49.678-4.85,72.788-14.413
                    c13.684-5.662,26.726-12.95,38.765-21.662c14.115-10.214,26.772-22.309,37.62-35.946c9.132-11.479,16.93-24.012,23.179-37.248
                    c12.045-25.509,18.152-52.84,18.152-81.233C427.913,129.299,342.453,43.84,237.41,43.84z"/>
            </g>
        </g>
    </svg>`
}
// Gêre les infobulles
export function tooltip(element,position,text,empty,h,w){
    const tooltip = document.createElement('tooltip')
    const tcontent = document.createElement('content')
    if (empty){
        tooltip.style.width = w
        tooltip.style.height = h
    }
    element.appendChild(tooltip)
    tcontent.classList.add(`t-content`)
    tcontent.classList.add(`t-${position}`)
    tcontent.textContent = text
    tooltip.appendChild(tcontent)
}