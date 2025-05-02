'use strict';

let gCanvas = null
let gCtx = null
let gCurrImg = null
let gCurrText = ''

let gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: []
}

const TOP_TEXT_Y = 40
const BOTTOM_TEXT_Y_MARGIN = 40
const DEFAULT_FONT_SIZE = 40
const DEFAULT_FONT = 'Arial'
const DEFAULT_COLOR = 'white'
const DEFAULT_STROKE_COLOR = 'black'
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_TEXT_ALIGN = 'center'

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

function onEnterTextInput() {
    const textInput = document.querySelector('.meme-text')
    const newTextLayer = {
        text: textInput.value,
        x: gCanvas.width / 2,
        y: gCanvas.height / 2,
        font: 'Arial',
        fontSize: 40,
        color: 'white',
        strokeColor: 'pink',
        strokeWidth: 4,
        textAlign: 'center'
    }

    gMeme.push(newTextLayer)
    console.log('gTextLayer:', gMeme);
}

function addTextToCanvas() {
    const textInput = document.querySelector('.meme-text')
    onEnterTextInput()
    textInput.value = ''
}

function increaseText() {
    const currLayer = gMeme[gMeme.length - 1]
    if (currLayer) {
        currLayer.fontSize += 2
        drawText()
        renderCanvas()
    }
    else {
        console.error('No text layer to increase size')
    }

}

function drawText() {
    gCurrText = document.querySelector('.meme-text').value

    gCtx.strokeText(gCurrText, 50, 50)
    gCtx.fillText(gCurrText, 50, 50)
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

    gMeme.push(textInput.value)
    // textInput.value = ''
    renderCanvas()
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    if (gCurrImg) {
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    }
    drawText()
}

document.addEventListener('DOMContentLoaded', () => {
    initEditor()
    drawImg()
})

document.addEventListener('input', () => {
    drawText()
    drawImg()
    renderCanvas()
})