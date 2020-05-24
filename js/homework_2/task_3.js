'use strict'

/**
 * Функция получает разметку.
 * @returns {Object} содержит все inputs и answers на странице
 */
function getMarkup() {
    return {
        numbers: document.querySelectorAll('.b-line__convert'),
        answers: document.querySelectorAll('.b-result__answer')
    }
};

/**
 * Функция получает введенные пользователем данные.
 * @params {Object} содержит все inputs и answers на странице
 * @params {number} содержит порядковый номер первого числа в массиве
 * @params {number} содержит порядковый номер второго числа в массиве
 * @returns {Object} содержит числа a и b введенные пользователем
 */
function getDataFromInputs(markup, id1, id2) {
    return {
        a: markup.numbers[id1].value,
        b: markup.numbers[id2].value
    }
}

/**
 * Функция применяет различные операторы к двум операндам, в зависимости от их знака.
 * @returns {void}
 */
function calcResultDependOnSign() {
    const markup = getMarkup();
    const numbers = getDataFromInputs(markup, 0, 1);
    if (numbers.a === '' || numbers.b === '') {
        markup.answers[0].innerText = "Числа не могут быть пустыми.";
        clearInputs();
        return;
    }
    if (isNaN(numbers.a) || isNaN(numbers.b)) {
        markup.answers[0].innerText = "Числа не могут содержать буквы.";
        clearInputs();
        return;
    }

    numbers.a = Number(numbers.a);
    numbers.b = Number(numbers.b);

    if(numbers.a >= 0 && numbers.b >= 0) {
        markup.answers[0].innerText = numbers.a - numbers.b;
        clearInputs();
    } else if (numbers.a < 0 && numbers.b < 0) {
        markup.answers[0].innerText = numbers.a * numbers.b;
        clearInputs();
    } else if (Math.sign(numbers.a) !== Math.sign(numbers.b)) {
        markup.answers[0].innerText = numbers.a + numbers.b;
        clearInputs();
    }
}

/**
 * Функция очищает поля ввода.
 * @returns {void}
 */
function clearInputs() {
    let numbers = document.querySelectorAll('.b-line__convert');

    for(let number of numbers) {
        number.value = '';
    }
}