'use strict'

let randomNumber = [],
    userNumber = null;

/**
 * Генерирует случайное число в диапазоне от min до max
 * @params min
 * @params max
 * @returns {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Функция генерирует случайное четырехначное число
 * @returns {void}
 */
function numberGenerate() {
    if (randomNumber.length !== 0) {
        randomNumber = [];
    }
    for (let i = 0; i < 4; i++) {
        let digit = getRandomInt(0, 9);

        if (randomNumber.includes(digit)) {
            i--;
        } else {
            randomNumber.push(digit);
        }
    }

    console.log(randomNumber);
    checkAnswer(randomNumber);

}

/**
 * Проверяет количество коров (наличие числа на любой позиции)
 * @params userNumber
 * @params randomNumber
 * @returns {number}
 */
function checkCows(userNumber, randomNumber) {
    let counter = 0;

    randomNumber.forEach(function(digit) {
        if (userNumber.includes(digit)) {
            counter++;
            randomNumber.slice(digit);
        }
    });

    return counter;
}

/**
 * Проверяет количество быков (совпадение числа по его позиции)
 * @params {Array} userNumber
 * @params {Array} randomNumber
 * @returns {number} counter
 */
function checkBulls(userNumber, randomNumber) {
    let counter = 0;

    for (let i = 0; i < userNumber.length; i++) {
        if (userNumber[i] === randomNumber[i]) {
            counter++;
        }
    }

    return counter;
}

/**
 * Сравнивает ответ пользователя и загаданный компьютером
 * @params {Array} randomNumber
 */
function checkAnswer(randomNumber) {
    while (true) {
        userNumber = prompt('Введите четырехзначное число', '');

        if (userNumber === null) {
            alert('Вы вышли из игры');
            break;
        } else if (isNaN(userNumber) || userNumber.length !== 4) {
            alert('Введите корректные данные');
            checkAnswer(randomNumber);
        }

        userNumber = userNumber.split('');

        for (let i =0; i < userNumber.length; i++) {
            userNumber[i] = +userNumber[i];
        }

        let cowsCount = checkCows(userNumber, randomNumber),
            bullsCount = checkBulls(userNumber, randomNumber);

        if (bullsCount === 4) {
            alert('Поздравляю, вы победили!');
            break;
        } else {
            alert(`
            Количество коров – ${cowsCount - bullsCount}
            Количество быков – ${bullsCount}`);
            console.log(cowsCount - bullsCount);
            console.log(bullsCount);
        }
    }
}