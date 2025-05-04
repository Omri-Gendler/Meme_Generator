'use strict';

const happy = '😊'
const sad = '😒'
const laugh = '😂'
const crazy = '😶'
const king = '♔'

function addSmiley() {
    const elHappy = document.querySelector('.smiley-happy')
    const elSad = document.querySelector('.smiley-sad')
    const elLaugh = document.querySelector('.smiley-laugh')
    const elCrazy = document.querySelector('.smiley-crazy')
    const elKing = document.querySelector('.smiley-king')

    elHappy.innerText = happy
    elSad.innerText = sad
    elLaugh.innerText = laugh
    elCrazy.innerText = crazy
    elKing.innerText = king
}

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