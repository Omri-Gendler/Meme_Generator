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

    const imgSrcFromStorage = localStorage.getItem('imgSelected')
    if (imgSrcFromStorage) {
        loadImgToCanvas()
    } else {
        console.error('No image found in local storage')
    }
    gMeme.lines = []
    renderCanvas()
}

function loadImgToCanvas(imgSrc) {
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        gCurrImg = img
        gCanvas.width = img.widthNaturalWidth
        gCanvas.height = img.heightNaturalHeight
        renderCanvas()
    }
    img.onerror = () => {
        console.error('Failed to load image')
    }
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

function addTextLine() {
    const textInput = document.querySelector('.text-input')
    const text = textInput.value.trim()

    let yPos
    let baseLine

    if (gMeme.lines.length === 0) {
        yPos = TOP_TEXT_Y
        baseLine = 'top'
    } else if (gMeme.lines.length === 1) {
        yPos = gCanvas.height - BOTTOM_TEXT_Y_MARGIN
        baseLine = 'bottom'
    } else {
        return
    }
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