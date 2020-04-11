let fieldsets = document.querySelectorAll('.b-line__form-wrapper'),
    node = fieldsets[1],
    markup = {
        info: node.querySelector('.b-line__game-info'),
        map: node.querySelector('.b-line__map'),
        label: node.querySelector('label'),
        input: node.querySelector('.b-line__convert'),
        buttonStart: node.querySelector('.start'),
        buttonNext: node.querySelector('.next')
    };