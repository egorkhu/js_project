'use strict';

/**
 * Очищает поля ввода.
 * @returns {void}
 */
function clearInputs() {
    let numbers = document.querySelectorAll('.b-line__convert');

    for(let number of numbers) {
        number.value = '';
    }
}

/**
 * Очищает поля ответа.
 * @returns {void}
 */
function clearAnswers() {
    let answers = document.querySelectorAll('.answer-line');

    for(let answer of answers) {
        answer.parentElement.removeChild(answer);
    }
}

/**
 * Функция создает массив из чисел от a до b включительно.
 * @params a
 * @params b
 * @returns {Array}
 */
function createArray(a, b) {
    let arr = [];

    for (let i = a; i <= b; i++) {
        arr.push(i);
    }

    return arr;
}

/**
 * Функция определяет какие числа четные, а какие нет и ноль.
 * @params a
 * @params b
 * @returns {void}
 */
function isEvenOrNot(a, b) {
    let getArray = createArray(a, b),
        answers = document.querySelectorAll('.b-result__answer'),
        answer = answers[0];

    for (let i = 0; i < getArray.length; i++) {
        if(getArray[i] === 0) {
            console.log(getArray[i] + ' - это ноль!');
            answer.parentElement.insertAdjacentHTML('beforeend', `<p class='answer-line'>${getArray[i]} - это ноль!</p>`);
        } else if(getArray[i] % 2 === 0) {
            console.log(getArray[i] + ' - это четное число!');
            answer.parentElement.insertAdjacentHTML('beforeend', `<p class='answer-line'>${getArray[i]} - это четное число!</p>`);
        } else {
            console.log(getArray[i] + ' - это нечетное число!');
            answer.parentElement.insertAdjacentHTML('beforeend', `<p class='answer-line'>${getArray[i]} - это нечетное число!</p>`);
        }
    }
}

/**
 * Принимает значения диапазона, который указывает пользователь.
 * @returns {void}
 */
function getUserRange() {
    let inputs = document.querySelectorAll('.b-line__convert'),
        answers = document.querySelectorAll('.b-result__answer'),
        userRange = inputs[0].value.split('-'),
        answer = answers[0],
        a = userRange[0],
        b = userRange[1];

    clearInputs();
    clearAnswers();

    if (a === '' || isNaN(a)) {
        answer.innerText = 'Введите корректное значение!';
    } else {
        isEvenOrNot(+a, +b);
    }
}

const post = {
    author: 'John', //вывести этот текст
    postId: 23,
    comments: [
        {
            userId: 10,
            userName: 'Alex',
            text: 'lorem ipsum',
            rating: {
                likes: 10,
                dislikes: 2 //вывести это число
            }
        },
        {
            userId: 5, //вывести это число
            userName: 'Jane',
            text: 'lorem ipsum 2', //вывести этот текст
            rating: {
                likes: 3,
                dislikes: 1 }
        },
    ]
};

console.log(post.author);
console.log(post.comments[0].rating.dislikes);
console.log(post.comments[1].userId);
console.log(post.comments[1].text);

const products = [
    {
        id: 3,
        price: 200,
    },
    {
        id: 4,
        price: 900,
    },
    {
        id: 1,
        price: 1000,
    },
];

/**
 * Функция применения скидки на товары в размере discount
 * @params {Array} products
 * @params {Number} discount
 * @returns {Array} products с примененной скидкой
 */
function applyDiscount(products, discount) {
    products.forEach(function(product) {
        product.price = (product.price - product.price * (discount / 100)).toFixed(2);

    });
    console.log(products);
    return products;
}

/**
 * Получает и проверяет данные введенные пользователем.
 */
function getDiscount() {
    let inputs = document.querySelectorAll('.b-line__convert'),
        answers = document.querySelectorAll('.b-result__answer'),
        discount = inputs[1].value,
        answer = answers[1];
    
    if (discount === '' || isNaN(discount)) {
        answer.innerText = 'Введите корректные данные!' 
    } else {
        applyDiscount(products, +discount);
        deleteGoodsMarkup();
        createGoodsMarkup(products);
    }
}

/**
 * Удаляет разметку страницы с товарами.
 */
function deleteGoodsMarkup() {
    let codes = document.querySelectorAll('.b-line__code');

    for (let code of codes) {
        code.parentElement.removeChild(code);
    }
}

/**
 * Создает разметку страницы с товарами.
 * @params {Array} products
 */
function createGoodsMarkup(products) {
    let labels = document.getElementsByTagName('label'),
        label = labels[1];

    clearInputs();

    for(let i = 0; i < products.length; i++) {
        label.insertAdjacentHTML('beforebegin', `
            <p class='b-line__code b-line__code_padding'><b>Товар – ${i + 1}</b></p>
            <p class='b-line__code b-line__code_padding'>id - ${products[i].id}, цена - ${products[i].price}</p>
        `);
    }
}

createGoodsMarkup(products);

const goods = [
    {
        id: 3,
        price: 127,
        photos: [
            '1.jpg',
            '2.jpg',
        ]
    },
    {
        id: 5,
        price: 499,
        photos: []
    },
    {
        id: 10,
        price: 26,
        photos: [
            '3.jpg'
        ]
    },
    {
        id: 8,
        price: 78,
    },
];

/**
 * Функция фильтрации товаров с фото.
 * @param {Array} goods
 * @return {void}
 */
function filterGoods(goods) {
    const filterResult = goods.filter(item => 'photos' in item && item.photos.length !== 0);
    let fieldsets = document.querySelectorAll('.b-line__form-wrapper'),
        wrapper = fieldsets[3];

    console.log(filterResult);

    wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'><b>Объекты массива со свойством photos</b></p>
        `);

    for (let i = 0; i < filterResult.length; i++) {
        wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'>${i + 1}. id: ${filterResult[i].id}</p>
        `);
    }
}

/**
 * Функция сортировки товаров по возрастанию цены
 * @param {Array} goods
 * @return {void}
 */
function sortGoods(goods) {
    const sortResult = goods.sort(function(a,b){
        return a.price - b.price;
    });

    let fieldsets = document.querySelectorAll('.b-line__form-wrapper'),
        wrapper = fieldsets[3];

    console.log(sortResult);

    wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'><b>Объекты массива отсортированные по возрастанию цены</b></p>
        `);

    for (let i = 0; i < sortResult.length; i++) {
        wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'>${i + 1}. id: ${sortResult[i].id}</p>
        `);
    }
}

filterGoods(goods);
sortGoods(goods);

for (let i = 0; i <= 9; console.log(i++)) {}

let x = '',
    fieldsets = document.querySelectorAll('.b-line__form-wrapper'),
    wrapper = fieldsets[5];

for(let i = 1; i <= 20; i++) {
    wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'>${x += 'X'}</p>
        `);
}

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