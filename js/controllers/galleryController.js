'use strict';

function handleImgClick(ev) {

    const img = ev.target
    const imgSrc = img.getAttribute('src')

    if (!imgSrc) {
        console.error('Image source not found')
        return
    }

    localStorage.setItem('imgSelected', imgSrc)
    window.location.href = '/html/index.html'
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryImgs = document.querySelectorAll('.gallery-container .gallery-imgs')
    galleryImgs.forEach((img) => {
        img.addEventListener('click', handleImgClick)
    })
})