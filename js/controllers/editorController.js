'use strict';

let gCanvas = null
let gCtx = null
let gCurrImg = null
let gCurrText = null

function initEditor() {
    gCanvas = document.querySelector('.canvas')

    loadInitImg()
    addTextInputListener()
}

function drawImg() {
    const canvas = document.querySelector('.canvas')
    if (!canvas) {
        console.error('Canvas not found')
        return
    }

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
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            localStorage.removeItem('imgSelected')
        }
    }
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

    if (gCurrImg) {
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    } else {
        console.error('No image loaded')
        return
    }

    renderTextOnCanvas()
}

function renderTextOnCanvas() {
    if (!gCanvas || !gCtx) return

    const text = document.querySelector('.meme-text').value
    if (!text) return

    const fontSize = 40
    const strokeColor = 'black'
    const fillColor = 'white'
    const lineWidth = 2

    gCtx.fontSize = `${fontSize}px`
    gCtx.textAlign = 'center'
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.lineWidth = lineWidth

    gCtx.strokeText(text, gCanvas.width / 2, gCanvas.height / 2)
    gCtx.fillText(text, gCanvas.width / 2, gCanvas.height / 2)

}

function addTextListener() {
    const textInput = document.querySelector('.meme-text')
    if (!textInput) {
        console.error('Text input not found')
        return
    }

    textInput.addEventListener('input', () => {
        renderTextOnCanvas()
        renderCanvas()
    })
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

function addTextInputListener() {
    const textInput = document.querySelector('.meme-text')

    textInput.addEventListener('input', () => {
        gCurrText = textInput.value
        renderCanvas()
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initEditor()
})

document.addEventListener('DOMContentLoaded', () => {
    drawImg(),renderCanvas()
})
