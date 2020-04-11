'use strict'

/**
 * Функция предоставления прав администратора пользователю.
 * @return {void}
 */
function makeAdmin() {
    let input = document.querySelector('.b-line__user');
    let answer = document.querySelectorAll('.b-result__answer')[1];
    let user = input.value;
    let admin = user;

    if(admin === '') {
        answer.innerText="Введите имя!";
    } else {
        answer.innerText= admin + " теперь Администратор!";
        input.value = '';
        console.log(admin);
    }
}