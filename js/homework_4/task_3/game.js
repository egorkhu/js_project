let game2 = {

    run() {
        difficulty.choose();
    },

    result(counter) {
        markup2.info.innerHTML = `Вы дали правильных ответов - ${counter}. Сыграть еще раз?`;
        markup2.resetElement(markup2.question);
        markup2.buttonStart.innerText = 'Да';
        markup2.buttonStart.setAttribute('onclick', 'game2.run()');
        markup2.buttonOptions[1].innerText = 'Нет';
        markup2.buttonOptions[1].setAttribute('onclick', 'game2.init()');
        for (let i = 2; i <= 3; i++) {
            markup2.hideElement(markup2.buttonOptions[i]);
        }
    },

    init() {
        markup2.info.innerHTML = `Добро пожаловать в аналог телевизионной игры 
                                  <b>"Кто хочет стать миллионером"</b>!
                                  Если готов, нажми кнопку ниже и мы начнем.`;
        markup2.buttonStart.innerText = 'Начать';
        markup2.hideElement( markup2.buttonOptions[1]);
        markup2.buttonStart.setAttribute('onclick', 'game2.run()');
    }
};

game2.init();