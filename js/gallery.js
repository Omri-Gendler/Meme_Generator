'use strict';

function getImg() {
    const img = new Image()
    const imagePath = 'meme-imgs/meme-imgs (square)1.jpg'

    img.src = imagePath

    console.log('Image object created, loading started:', img)
    return img
}

getImg()