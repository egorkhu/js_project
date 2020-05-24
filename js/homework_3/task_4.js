'use strict'

const products = [
    {
        id: 3,
        price: 200,
    },
    {
        id: 4,
        price: 900,
    },
    {
        id: 1,
        price: 1000,
    },
];

/**
 * Рассчет скидки discount для каждого товара из Array.
 * @params {Array} products
 * @params {Number} discount
 * @returns {Array} products с примененной скидкой
 */
function calculateDiscount(products, discount) {
    products.forEach(function(product) {
        product.price = (product.price - product.price * (discount / 100)).toFixed(2);

    });
    console.log(products);
    return products;
}

/**
 * Создает разметку страницы с товарами.
 * @params {Array} products
 */
function createGoodsMarkup(products) {
    let label = document.getElementsByTagName('label')[1];

    for(let i = 0; i < products.length; i++) {
        label.insertAdjacentHTML('beforebegin', `
            <p class='b-line__goods b-line__goods_padding'><b>Товар – ${i + 1}</b></p>
            <p class='b-line__goods b-line__goods_padding'>id - ${products[i].id}, цена - ${products[i].price}</p>
        `);
    }
}

/**
 * Удаляет разметку страницы с товарами.
 */
function deleteGoodsMarkup() {
    let markup = document.querySelectorAll('.b-line__goods');

    for (let line of markup) {
        line.parentElement.removeChild(line);
    }
}

/**
 * Проверка скидки, введенной пользователем.
 * @param discount
 * @return {boolean}
 */
function checkDiscount(discount) {
    return (discount === '' || isNaN(discount));
}

/**
 * Применяет скидку, введенную пользователем.
 */
function applyDiscount() {
    let input = getInput(1);
    let answer = getAnswer(1);
    let discount = input.value;

    if (!checkDiscount(discount)) {
        calculateDiscount(products, discount);
        deleteGoodsMarkup();
        createGoodsMarkup(products);
        clearInput(input);
        return;
    }
    answer.innerText = 'Введите корректное значение!';
    clearInput(input);
}

createGoodsMarkup(products);

