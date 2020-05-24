'use strict'

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