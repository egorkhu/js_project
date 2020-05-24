let node2 = fieldsets[2],
    markup2 = {
            info: node2.querySelector('.b-line__game-info'),
            question: node2.querySelector('.b-line__question'),
            label: node2.querySelector('label'),
            input: node2.querySelector('.b-line__convert'),
            buttonStart: node2.querySelector('.start'),
            buttonOptions: node2.querySelectorAll('.b-line__button'),

            showElement(element) {
                element.style.display = 'block';
            },

            hideElement(element) {
                element.style.display = 'none';
            },

            resetElement(element) {
                element.innerHTML = '';
            }
    };