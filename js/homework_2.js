'use strict';

/**
 * Функция вычисляет переменные, к которым применены различные (префиксные и постфиксные) инкременты.
 * @returns {void}
 */
function calcIncrement() {
    //пример 1
    let a = 1, b = 1, c, d; //происходит обявление переменных и присвоение первым двух значений
    c = ++a; //т.к. используется префиксная форма инкремента, то переменная a сначала увеличится на 1, а потом скопируется в переменную c. Итого: a = 2, с = 2
    alert(c); // ответ: 2

    //пример 2
    d = b++; //т.к. используется постфиксная форма инкремента, то сначала выполнится копирование значение из b в d, а потом увеличение b на 1. Итого: d = 1, b = 2
    alert(d); //ответ: 1

    //пример 3
    c = 2 + ++a; // сначала увеличение a на 1, в итоге a = 3, прибавляем 2, получается 5 и записываем это значение в переменную c. Итого: a = 3, c = 5
    alert(c); //ответ: 5

    //пример 4
    d = 2 + b++; // сначала происходит сложение 2 + b = 2, получим 4, это значение запишется в переменную d, а затем увеличение переменной b на 1. Итого: b = 3, d = 4
    alert(d); //ответ: 4

    alert(a); //3
    alert(b); //3
}

/**
 * Функция вычисляет выражение.
 * @returns {void}
 */
function calcExpression() {
    let a = 2; // объявляем переменную a и присваиваем ей значение 2
    let x = 1 + (a *= 2); // выражение в скобках можно представить как (a = a * 2), получим 4, затем к 4 прибавим 1 и получим 5, это значение запишется в переменную x. Итого: a = 4, x = 5
}

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

/**
 * Функция суммирования двух чисел.
 * @param {number} a Первое число
 * @param {number} b Второе число
 * @returns {number} Сумма двух чисел
 */
function sum(a, b) {
    return a + b;
}

/**
 * Функция вычитания двух чисел.
 * @param {number} a Первое число
 * @param {number} b Второе число
 * @returns {number} Разница двух чисел
 */
function diff(a, b) {
    return a - b;
}

/**
 * Функция произведения двух чисел.
 * @param {number} a Первое число
 * @param {number} b Второе число
 * @returns {number} Умножение двух чисел
 */
function mul(a, b) {
    return a * b;
}

/**
 * Функция деления двух чисел.
 * @param {number} a Первое число
 * @param {number} b Второе число
 * @returns {number} Деление двух чисел
 */
function div(a, b) {
    return a / b;
}

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

/**
 * Функция склоняет слово "рубль" в зависимости от цифры на которую оканчивается сумма депозита.
 * @returns {void}
 */
function inclineWord() {
    const markup = getMarkup();
    const num = markup.numbers[5].value;
    if (num === "" || isNaN(num)) {
        markup.answers[2].innerText = "Вы ничего не положили";
        clearInputs();
        return;
    }

    let lastDigit = +num.slice(-2); // берем две последние цифры, чтобы проверить их на исключение из правил и сравнить с числами от 11 до 14
    if (lastDigit >= 11 && lastDigit <= 14) {
        markup.answers[2].innerText = "Ваша сумма в " + num + " рублей успешно зачислена!";
        clearInputs();
        return;
    }

    lastDigit = +num.slice(-1);
    switch (lastDigit) {
        case 1:
            markup.answers[2].innerText = "Ваша сумма в " + num + " рубль успешно зачислена!";
            clearInputs();
            break;
        case 2:
        case 3:
        case 4:
            markup.answers[2].innerText = "Ваша сумма в " + num + " рубля успешно зачислена!";
            clearInputs();
            break;
        default:
            markup.answers[2].innerText = "Ваша сумма в " + num + " рублей успешно зачислена!";
            clearInputs();
            break;
    }
}
