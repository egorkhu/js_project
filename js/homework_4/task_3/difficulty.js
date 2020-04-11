let difficulty = {
    choose() {
        markup2.hideElement(markup2.buttonStart);
        markup2.resetElement(markup2.info);
        markup2.info.innerText = `Выберите уровень сложности игры, чем больше цифра,
                                  тем сложнее вопросы:`;
        for (let i = 1; i <= 3; i++) {
            markup2.buttonOptions[i].style.display = 'inline-block';
            markup2.buttonOptions[i].innerText = i;
            markup2.buttonOptions[i].setAttribute('onclick', `questions.ask(${i})`);
        }
    }
};