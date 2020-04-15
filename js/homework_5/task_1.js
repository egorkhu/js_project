'use strict'

const popupButton = document.querySelectorAll('.b-line__button')[0];
const popupContainer = document.querySelector('.popup-container');
const popupContent = document.querySelector('.popup-content');

const showPopup = function() {
    popupContent.classList.remove('bounceOut');
    popupContainer.style.display = 'flex';
    popupContent.classList.add('animated', 'bounceIn');
    document.querySelector('.popup-close').addEventListener('click', closePopup);
};

const closePopup = function() {
    popupContent.classList.remove('bounceIn');
    popupContent.classList.add('bounceOut');
    setTimeout(() => popupContainer.style.display = 'none', 720);
};

const checkClick = function(event) {
    if (event.target === popupContainer) {
        closePopup();
    }
};

window.addEventListener('click', checkClick);
popupButton.addEventListener('click', showPopup);