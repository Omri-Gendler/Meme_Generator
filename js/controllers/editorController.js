'use strict';

let gCanvas = null
let gCtx = null
let gCurrImg = null
let gCurrText = ''
let gTextLayers = []

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
            renderCanvas()
        }
    }
}

function getText() {
    const textInput = document.querySelector('.meme-text').value
    console.log('Text:', gCurrText)
}

function getTextInput() {
    const textInput = document.querySelector('.meme-text')
    const newTextLayer = {
        text: textInput.value,
        x: gCanvas.width / 2,
        y: gCanvas.height / 2,
        font: 'Arial',
        fontSize: 40,
        color: 'white',
        strokeColor: 'black',
        strokeWidth: 2,
        textAlign: 'center'
    }

    gTextLayers.push(newTextLayer)
    textInput.value = ''
    renderCanvas()
}

function drawText() {
    gCurrText = document.querySelector('.meme-text').value
    let y = 50


    const fontSize = 40
    const strokeColor = 'black'
    const fillColor = 'white'
    const lineWidth = 2
    const font = 'Arial'

    gTextLayers.forEach((layer) => {
        gCtx.font = `${fontSize}px ${font}`
        gCtx.fillStyle = fillColor
        gCtx.strokeStyle = strokeColor
        gCtx.lineWidth = lineWidth
        y += fontSize + 10

        gCtx.strokeText(layer.text, layer.x, layer.y)
        gCtx.fillText(layer.text, layer.x, layer.y)
    })

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
    if (gCurrImg) {
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    }
    drawText()
}

function addTextToCanvas() {
    const textInput = document.querySelector('.meme-text')
    renderCanvas()
    textInput.value = ''
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