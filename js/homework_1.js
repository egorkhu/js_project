'use strict';

/**
 * Функция для конвертирвания температуры из Цельсия в Фаренгейт.
 * @returns {void}
 */
function convertCtoF() {
    let celsium = document.querySelector('.b-line__convert'),
        answer = document.querySelectorAll('.b-result__answer'),
        temp = celsium.value;

    if ( temp === '' || isNaN(temp) ) {
        answer[0].innerText="Введите число!";
        celsium.value = '';
    } else {
        let farh = (9 / 5) * temp + 32;
        answer[0].innerText="Это будет " + farh.toFixed(2) + " градусов по Фаренгейту";
        celsium.value = '';
    }
}

/**
 * Функция предоставления прав администратора пользователю.
 * @return {void}
 */
function makeAdmin() {
    let user = document.querySelector('.b-line__user'),
        answer = document.querySelectorAll('.b-result__answer'),
        admin = user.value;

    if( admin === '' ) {
        answer[1].innerText="Введите имя!";
    } else {
        answer[1].innerText= admin + " теперь Администратор!";
        user.value = '';
        console.log(admin);
    }
}

/**
 * Функция математических вычислений.
 * @returns {void}
 */
function mathCalc() {
    let arr = [
            10 + 10 + "10",
            /*
            1. 10 прибавляется к 10 получаем 20
            2. так как второй операнд у нас строка то, 20 прибаляем к строке 10
                получаем строку 2010
             */
            10 + "10" + 10,
            /*
            1. 10 прибавляется к строке получаем строку 1010
            2. строка 1010 прибавляется к числу 10 получаем строку 101010
             */
            10 + 10 + +"10",
            /*
            1. унарный плюс преобразует строку 10 в число 10
            2. 10 прибавляем к 10 получается 20
            3. 20 прибавляем к 10 получаем 30
             */
            10 / -"",
            /*
            1. унарный минус преобразует пустую строку в число -0
            2. 10 делим на -0 получается -Infinity
             */
            10 / +"2,5"
            /*
            1. унарный плюс преобразует строку 2,5 в NaN, так как используется запятая, а не точка
            2. 10 делим на NaN получается NaN
             */
    ],
    answer = document.querySelectorAll('.b-result__answer');

    for ( let i = 2; i <= 6; i++ ) {
        answer[i].innerText = arr[i-2];
        console.log(arr[i-2]);
    }
}

/**
 * Функция проверки на валидность имени переменной.
 * @return {void}
 */
function checkName() {
    let name = document.querySelectorAll('.b-line__names'),
        answer = document.querySelectorAll('.b-result__answer'),
        userVar;

    for ( let i = 0; i < name.length; i++ ) {
        userVar = name[i].innerText;
        if (userVar[4].match(/[a-z_]/i) || userVar[4] === "$") {
            answer[i+7].style.color = 'lightgreen';
            answer[i+7].innerText= " Можно использовать";
        } else {
            answer[i+7].style.color = 'red';
            answer[i+7].innerText= " Нельзя использовать";
        }
    }
}


