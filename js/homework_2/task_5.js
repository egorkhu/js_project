'use strict'

/**
 * Получение введенных данных.
 * @returns {void}
 */
function getData() {
    const markup = getMarkup();
    const numbers = getDataFromInputs(markup,2, 3);

    if (numbers.a === 0 || numbers.b === 0 || isNaN(numbers.a) || isNaN(numbers.b) || numbers.a === '' || numbers.b === '') {
        markup.answers[1].innerText = 'Введите корректные данные';
        clearInputs();
        return;
    }

    const operator = markup.numbers[4].value;

    numbers.a = Number(numbers.a);
    numbers.b = Number(numbers.b);

    const result = calcOperations(numbers.a, numbers.b, operator);

    if (!result) {
        markup.answers[1].innerText = 'Такой операции не существует';
        clearInputs();
    } else {
        markup.answers[1].innerText = result;
        clearInputs();
    }
}

/**
 * Функция выполняет раздичные математические операции с числами.
 * @params {number} arg1 Первый операнд
 * @params {number} arg2 Второй операнд
 * @params {string} operator Оператор
 * @returns {number | boolean} Результат математической операции если успешно или false
 */
function calcOperations(arg1, arg2, operator) {
    switch (operator) {
        case 'сложить':
            return sum(arg1, arg2);
        case 'вычесть':
            return diff(arg1, arg2);
        case 'умножить':
            return mul(arg1, arg2);
        case 'разделить':
            return div(arg1, arg2);
        default:
            return false;
    }
}