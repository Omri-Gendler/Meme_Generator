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