'use strict';

function up() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.y = currLine.y - 10
    drawTextLine(currLine)
    renderCanvas()
}

function down() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.y = currLine.y + 10
    drawTextLine(currLine)
    renderCanvas()
}

function increseFont() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.fontSize += 2
    renderCanvas()
}

function decreaseFont() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.fontSize -= 2
    renderCanvas()
}

function moveTextRight() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.x += 100
    renderCanvas()
}

function moveTextLeft() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.x -= 100
    renderCanvas()
}

function changeTextColor() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    const currColor = document.querySelector('.color').value
    console.log('currColor', currColor)
    console.log('currLine', currLine)

    currLine.color = currColor
    currLine.strokeStyles = currColor
    renderCanvas()
}

function boldText() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]

}