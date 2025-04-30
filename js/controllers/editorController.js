'use strict';

let gCanvas = null
let gCtx = null
let gCurrImg = null
let gCurrText = ''

function initEditor() {
    gCanvas = document.querySelector('.canvas')
    gCtx = gCanvas.getContext('2d')
    gCurrImg = localStorage.getItem('imgSelected')
}

function drawImg() {
    const canvas = document.querySelector('.canvas')
    if (!canvas) {
        console.error('Canvas not found')
        return
    }

    gCanvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        console.error('Context not found')
        return
    }

    let imgSrc = localStorage.getItem('imgSelected')
    // imgSrc = '1.jpg'
    if (imgSrc) {
        const img = new Image()
        img.src = imgSrc

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            gCurrImg = img
<<<<<<< HEAD
            renderCanvas()
=======
>>>>>>> 05e2de07ee613bcdb42d32e590bf2b11b4cc38ac
        }
    }
}

function getText() {
    const textInput = document.querySelector('.meme-text').value
    console.log('Text:', gCurrText)
}

function drawText() {
    gCurrText = document.querySelector('.meme-text').value
    console.log('Text:', gCurrText)

    const fontSize = 40
    const strokeColor = 'black'
    const fillColor = 'white'
    const lineWidth = 2

    gCtx.fontSize = `${fontSize}px`
    gCtx.textAlign = 'center'
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.lineWidth = lineWidth

    gCtx.strokeText(gCurrText, gCanvas.width / 2, gCanvas.height / 2)
    gCtx.fillText(gCurrText, gCanvas.width / 2, gCanvas.height / 2)
}

function loadInitImg(imgSrc) {
    if (!gCurrImg) {
        console.error('No image selected')
        return
    }
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
<<<<<<< HEAD
    console.log('gCurrImg:', gCurrImg)
=======
>>>>>>> 05e2de07ee613bcdb42d32e590bf2b11b4cc38ac
    if (gCurrImg) {
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    }
    drawText()
    console.log('Drawing text:', gCurrText)
    console.log('Current image:', gCurrImg)
}


document.addEventListener('DOMContentLoaded', () => {
    initEditor()
    drawImg()
})

document.addEventListener('input', () => {
    getText()
    drawText()
    drawImg()
    renderCanvas()
})