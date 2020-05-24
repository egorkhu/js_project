'use strict'

const markup = `<p class="b-product__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate ducimus fugiat natus placeat quis sapiente soluta veritatis. Inventore, veritatis?</p>`;
const changeImgToText = function(event) {
    const container = event.target.parentNode;
    let product = {
        header: container.querySelector('.b-product__header'),
        image: container.querySelector('img'),
        button: container.querySelector('.b-line__button')
    };

    if (product.button.innerText === "Подробнее") {
        product.button.innerText = 'Отмена';
        product.image.style.display = 'none';
        product.header.insertAdjacentHTML('afterend', markup);
    } else {
        product.button.innerText = 'Подробнее';
        container.querySelector('.b-product__text').remove();
        product.image.style.display = 'block';
    }
};

const buttons = document.querySelectorAll('.b-line__button');

buttons.forEach((button) => {
    if (button.innerText === 'Подробнее') {
        button.addEventListener('click', changeImgToText);
    }
});