'use strict'

/**
 * Возвращает элемент ввода под определенным номером 'a' из NodeList.
 * @param a номер элемента в NodeList
 * @returns {Element}
 */
function getInput(a) {
    return document.querySelectorAll('.b-line__convert')[a];
}

/**
 * Очищает поле ввода.
 * @param input
 */
function clearInput(input) {
    input.value = '';
}

/**
 * Возвращает элемент в котором выводится ответ на задачу под определенным номером 'a' из NodeList.
 * @param a номер элемента в NodeList
 * @returns {Element}
 */
function getAnswer(a) {
    return document.querySelectorAll('.b-result__answer')[a];
}

/**
 * Очищает поле ответа.
 * @returns {void}
 */
function clearAnswer(answer) {
    answer.innerText = '';
}

/**
 * Разделяет диапазон введеный пользователем.
 * @param {String} userRange
 * @return {Array}
 */
function splitUserRange(userRange) {
    return userRange.split('-');
}

/**
 * Функция создает массив из диапазона, введенного пользователем.
 * @param {String} userRange
 * @return {Array}
 */
function createArray(userRange) {
    let splittedArr = splitUserRange(userRange);

    let a = +splittedArr[0];
    let b = +splittedArr[1];

    let completeArr = [];

    for (let i = a; i <= b; i++) {
        completeArr.push(i);
    }

    return completeArr;
}

/**
 * Проверяет являются ли значения массива нулем, четными или нечетныи числами.
 * @param {Number} number
 */
function isEvenOrNot(number) {
    if(number === 0) {
        console.log(number + ' - это ноль!');
        return `<p class='answer-line'>${number} - это ноль!</p>`;
    } else if(number % 2 === 0) {
        console.log(number + ' - это четное число!');
        return `<p class='answer-line'>${number} - это четное число!</p>`;
    } else {
        console.log(number + ' - это нечетное число!');
        return `<p class='answer-line'>${number} - это нечетное число!</p>`;
    }
}

/**
 * Проверяет введенный пользователем диапазон.
 * @param {String} userRange
 * @returns {Boolean}
 */
function checkUserRange(userRange) {
    if (userRange === '') {
        return false;
    }
    if (userRange.indexOf('-') === -1) {
        return false;
    }
    let splittedUserRange = splitUserRange(userRange);
    for (let number of splittedUserRange) {
        if (isNaN(number)) return false;
    }
    return true;
}

/**
 * Выводит все числа из диапазона и указывает являются ли они четными или нет и ноль.
 */
function showUserRange() {
    let input = getInput(0);
    let answer = getAnswer(0);
    let userRange = input.value;

    while (answer.firstChild) {
        answer.removeChild(answer.firstChild);
    }

    if (checkUserRange(userRange)) {
        let userArr = createArray(userRange);
        for (let number of userArr) {
            let result = isEvenOrNot(number);
            answer.insertAdjacentHTML('beforeend', result);
        }
        return;
    }

    clearInput(input);

    answer.innerHTML = 'Введите корректное значение!';
}