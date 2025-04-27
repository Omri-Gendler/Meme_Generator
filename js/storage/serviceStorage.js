'use strict';

function saveToStorage(imageUrl) {
    localStorage.setItem(this.storage_key, imageUrl)
}

function loadFromStorage() {
    const imageUrl = localStorage.getItem(this.storage_key)
    console.log('loadFromStorage', imageUrl)
    return imageUrl ? imageUrl : null

}