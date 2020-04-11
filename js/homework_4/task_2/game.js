let game = {
    /**
     * Запуск игры
     */
    run() {
        markup.buttonStart.style.display = 'none';
        markup.label.style.display = 'block';
        markup.input.style.display = 'block';
        markup.buttonNext.style.display = 'inline-block';
        markup.info.innerHTML = 'Ваше положение на поле в виде о.<br>Чтобы начать игру нажмите кнопку внизу.';
    },

    userPrompt() {
        // Получаем направление от игрока
        let direction = mover.getDirection();
        if (direction === null) {
            markup.info.innerText = 'Игра окончена';
            markup.buttonStart.style.display = 'block';
            markup.buttonNext.style.display = 'none';
            markup.label.style.display = 'none';
            window.setTimeout(() => {
                markup.info.innerHTML = 'Ваше положение на поле в виде о.<br>Чтобы начать игру нажмите кнопку внизу.';
            }, 4000);
            markup.info.innerText = 'Игра окончена';
            player.reset();
            renderer.clear();
            renderer.render();
            return;
        }
        direction = Number(direction);
        const nextPoint = mover.getNextPosition(direction);
        renderer.clear();
        player.move(nextPoint);
        renderer.render();
    },

    // Этот метод выполняется при открытии страницы
    init() {
        markup.info.innerHTML = 'Ваше положение на поле в виде о.<br>Чтобы начать игру нажмите кнопку внизу.';
        renderer.render();
    }
};

game.init();