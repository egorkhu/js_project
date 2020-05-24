'use strict'

/**
 * Функция проверки на валидность имени переменной.
 * @return {void}
 */
function checkName() {
    let name = document.querySelectorAll('.b-line__names'),
        answer = document.querySelectorAll('.b-result__answer'),
        userVar = null;

    for (let i = 0; i < name.length; i++) {
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