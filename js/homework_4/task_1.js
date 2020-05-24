'use strict';

function convertIntToObj(int) {
    let obj = {
        units: int % 10,
        tens: (Math.floor(int / 10)) % 10,
        hundreds: Math.floor(int / 100)
    };
    return obj;
}

function getUserInt() {
    let node = document.querySelector('.b-line__form-wrapper'),
        markup = {
            input: node.querySelector('.b-line__convert'),
            button: node.querySelector('.b-line__button'),
            answer: node.querySelector('.b-result__answer')
        };

    markup.answer.innerText = '';
    while (markup.answer.firstChild) {
        markup.answer.removeChild(markup.answer.firstChild);
    }

    if (isNaN(markup.input.value) || markup.input.value == '') {
        markup.answer.innerText = 'Введите корректное число';
        return;
    }

    if (+markup.input.value < 0 || +markup.input.value > 999 || !Number.isInteger(+markup.input.value)) {
        markup.answer.innerText = 'Число должно быть в диапазоне от 0 до 999';
        return;
    }

    let converted = convertIntToObj(Number(markup.input.value));

    for (let key in converted) {
        markup.answer.insertAdjacentHTML('beforeend', `
        <p class="b-line__code b-line__code_padding">${key} : ${converted[key]}</p>
        `);
    }
}

