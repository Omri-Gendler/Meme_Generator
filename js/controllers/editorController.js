'use strict';

let gCanvas = null
let gCtx = null
let gCurrImg = null
let gCurrText = ''

let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: []
}

const TOP_TEXT_Y = 40
const BOTTOM_TEXT_Y_MARGIN = 40
const DEFAULT_FONT_SIZE = 40
const DEFAULT_FONT = 'Arial'
const DEFAULT_COLOR = 'black'
const DEFAULT_STROKE_COLOR = 'black'
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_TEXT_ALIGN = 'center'

function initEditor() {
    gCanvas = document.querySelector('.canvas')
    gCtx = gCanvas.getContext('2d')

    const imgSrcFromStorage = localStorage.getItem('imgSelected');
    if (imgSrcFromStorage) {
        loadImgToCanvas(imgSrcFromStorage)
    } else {
        console.error('No image found in local storage.')
        gCanvas.width = 300
        gCanvas.height = 300
        gCtx.fillStyle = 'lightgray'
        gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
        gCtx.fillStyle = 'black'
        gCtx.textAlign = 'center'
        gCtx.fillText('Please select an image from the gallery', gCanvas.width / 2, gCanvas.height / 2)
    }

    const textInput = document.querySelector('.meme-text')
    if (textInput) {
        textInput.addEventListener('input', onTextInput)
    }
    addSmiley()
}

function loadImgToCanvas(imgSrc) {
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        gCurrImg = img
        gCanvas.width = img.naturalWidth
        gCanvas.height = img.naturalHeight
        gMeme.lines = [
            createLine(TOP_TEXT_Y, 'top', 'top text'),
            createLine(BOTTOM_TEXT_Y_MARGIN, 'bottom', 'bottom text')
        ]
        gMeme.selectedLineIdx = 0
        syncInputWithSelectedLine()
        renderCanvas()
    }
    img.onerror = () => {
        console.error('Failed to load image')
    }
}

function createLine(yPos, baseline, defaultText = '') {
    return {
        text: defaultText,
        x: gCanvas.width / 2,
        y: yPos,
        font: DEFAULT_FONT,
        fontSize: DEFAULT_FONT_SIZE,
        color: DEFAULT_COLOR,
        strokeColor: DEFAULT_STROKE_COLOR,
        strokeWidth: DEFAULT_STROKE_WIDTH,
        textAlign: DEFAULT_TEXT_ALIGN,
        textBaseline: baseline
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
    const textInput = document.querySelector('.meme-text')
    const txt = textInput.value.trim()

    let yPos
    let baseline
    const currLineCount = gMeme.lines.length

    if (currLineCount % 2 === 0) {
        yPos = TOP_TEXT_Y
        baseline = 'top'
        renderCanvas()
        console.log('gMeme.lines', gMeme.lines)
        console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);

        // saveTextLine()
    } else {
        yPos = gCanvas.height - BOTTOM_TEXT_Y_MARGIN
        baseline = 'bottom'
        renderCanvas()
        console.log('gMeme.lines', gMeme.lines)
        console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
        // saveTextLine()
    }

    const newLine = {
        text: txt,
        x: gCanvas.width / 2,
        y: yPos,
        font: DEFAULT_FONT,
        fontSize: DEFAULT_FONT_SIZE,
        color: DEFAULT_COLOR,
        strokeColor: DEFAULT_STROKE_COLOR,
        strokeWidth: DEFAULT_STROKE_WIDTH,
        textAlign: DEFAULT_TEXT_ALIGN,
        textBaseline: baseline
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1

    textInput.value = ''
    updateTextInput()
    renderCanvas()
}

function drawTextLine(line) {
    if (!line) return

    gCtx.font = `${line.fontSize}px ${line.font}`
    gCtx.fillStyle = 'black'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = line.strokeWidth
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = line.textBaseline

    gCtx.strokeText(line.text, line.x, line.y)
    gCtx.fillText(line.text, line.x, line.y)
}

function upDown() {
    const textInput = document.querySelector('.meme-text')
    const txt = textInput.value.trim()

    let yPos
    let baseline
    const currLineCount = gMeme.lines.length

    if (currLineCount % 2 === 0) {
        yPos = TOP_TEXT_Y
        baseline = 'top'
    } else {
        yPos = gCanvas.height - BOTTOM_TEXT_Y_MARGIN
        baseline = 'bottom'
    }

}

function renderCanvas() {

    if (!gCtx || !gCanvas) return

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

    if (gCurrImg) {
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    }
    gMeme.lines.forEach((line) => {
        drawTextLine(line)
    })

    if (gMeme.selectedLineIdx >= 0 && gMeme.lines[gMeme.selectedLineIdx]) {
        drawSelectionIndicator(gMeme.lines[gMeme.selectedLineIdx])
    }
}

function onGarbage() {
    const textInput = document.querySelector('.meme-text')
    textInput.value = ''
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = -1
    renderCanvas()
}

function saveTextLine() {
    const textInput = document.querySelector('.meme-text')
    const txt = textInput.value.trim()
    console.log('txt', txt);


    if (txt) {
        console.log('gMeme.lines', gMeme.lines)
        console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);

        gMeme.lines[gMeme.selectedLineIdx].text = txt
        renderCanvas()
    } else {
        console.error('No text to save')
    }
}

function drawSelectionIndicator(line) {
    if (!line) return

    const textWidth = gCtx.measureText(line.text).width
    const textHeight = line.fontSize
    const padding = 5
    let rectX = line.x
    let rectY = line.y
    if (line.textAlign === 'center') rectX -= textWidth / 2
    if (line.textBaseline !== 'top') rectY -= textHeight / 1.5

    gCtx.strokeStyle = 'rgb(20, 214, 207)'
    gCtx.lineWidth = 2;
    gCtx.strokeRect(rectX - padding, rectY - padding, textWidth + (padding * 2), textHeight + (padding * 2))
}

function onTextInput() {
    const newText = document.querySelector('.meme-text').value
    if (gMeme.selectedLineIdx >= 0 && gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx].text = newText
        renderCanvas()
    }
}

function updateTextInput() {
    const textInput = document.querySelector('.meme-text')
    if (gMeme.selectedLineIdx >= 1 && gMeme.lines[gMeme.selectedLineIdx]) {
        textInput.value = gMeme.lines[gMeme.selectedLineIdx].text
        console.log('textInput.value', textInput.value)
        console.log('gselectedLineIdx', gMeme.selectedLineIdx)
        console.log('gMeme.lines.text', gMeme.lines[gMeme.selectedLineIdx].text)


    } else if (gMeme.selectedLineIdx > 1) {
        gMeme.lines.value = gMeme.selectedLineIdx[0].text
        console.log('gmwme.lines.value', gMeme.lines.value);

        console.log('textInput.value', textInput.value)
        // gMeme.lines[gMeme.selectedLineIdx].text = textInput.value
    }
}

function syncInputWithSelectedLine() {
    const textInput = document.querySelector('.meme-text')
    if (gMeme.selectedLineIdx >= 0 && gMeme.lines[gMeme.selectedLineIdx]) {
        textInput.value = gMeme.lines[gMeme.selectedLineIdx].text
    } else {
        textInput.value = ''
    }
}

function switchToNextLine() {
    if (gMeme.lines.length < 2) return

    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 0) ? 1 : 0

    syncInputWithSelectedLine()
    renderCanvas()
}