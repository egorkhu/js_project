'use strict'

let x = '',
    wrapper = document.querySelectorAll('.b-line__form-wrapper')[5];

for(let i = 1; i <= 20; i++) {
    wrapper.insertAdjacentHTML('beforeend', `
        <p class='b-line__code b-line__code_padding'>${x += 'X'}</p>
    `);
}