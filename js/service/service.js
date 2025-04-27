'use stirct';

function handleImgClick(ev) {
    const img = ev.target
    console.log('img', img)
    const imgSrc = img.getAttribute('src')
}