'use strict'

/**
 * Функция для конвертирвания температуры из Цельсия в Фаренгейт.
 * @returns {void}
 */
function convertCtoF() {
    let input = document.querySelector('.b-line__convert');
    let answer = document.querySelectorAll('.b-result__answer')[0];
    let celsium = input.value;

    if (celsium === '' || isNaN(celsium)) {
        answer.innerText="Введите число!";
        input.value = '';
    } else {
        let farh = (9 / 5) * celsium + 32;
        answer.innerText="Это будет " + farh.toFixed(2) + " градусов по Фаренгейту";
        input.value = '';
    }
}