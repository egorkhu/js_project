'use strict'

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
function filterAndShowGoods(goods) {
    let wrapper = document.querySelectorAll('.b-line__form-wrapper')[3];
    const filterResult = goods.filter(item => 'photos' in item && item.photos.length !== 0);

    wrapper.insertAdjacentHTML('beforeend', `
        <p class='b-line__code b-line__code_padding'><b>Объекты массива со свойством photos:</b></p>
    `);

    for (let i = 0; i < filterResult.length; i++) {
        wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'>${i + 1}. id: ${filterResult[i].id}</p>
        `);
    }

    console.log(filterResult);
}

/**
 * Функция сортировки товаров по возрастанию цены.
 * @param {Array} goods
 * @return {void}
 */
function sortGoods(goods) {
    const sortResult = goods.sort(function(a,b){
        return a.price - b.price;
    });

    let wrapper = document.querySelectorAll('.b-line__form-wrapper')[3];

    wrapper.insertAdjacentHTML('beforeend', `
        <p class='b-line__code b-line__code_padding'><b>Объекты массива отсортированные по возрастанию цены</b></p>
    `);

    for (let i = 0; i < sortResult.length; i++) {
        wrapper.insertAdjacentHTML('beforeend', `
            <p class='b-line__code b-line__code_padding'>${i + 1}. id: ${sortResult[i].id}</p>
        `);
    }

    console.log(sortResult);
}

filterAndShowGoods(goods);
sortGoods(goods);