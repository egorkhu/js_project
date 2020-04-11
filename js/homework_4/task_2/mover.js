let mover = {
    /**
     * Получает и отдает направление движения от пользователя
     * @returns {int | null} Возвращает направление введеное пользователем
     */
    getDirection() {
        const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];
        let direction = markup.input.value;
        if(+direction === 0 && direction.length !== 0) {
            return null;
        } else if(isNaN(direction) || direction.length === 0 || !availableDirections.includes(+direction)) {
            markup.info.innerText = 'Для перемещения необходимо ввести одно из чисел 1, 2, 3, 4, 6, 7, 8, 9 или 0 для выхода.';
            window.setTimeout(() => {
                markup.info.innerHTML = 'Ваше положение на поле в виде о.';
            }, 4000);
        } else {
            return direction;
        }
    },

    /**
     * Отдает следующую точку, в которой будет находиться пользователь после движения
     * @param {init }direction Направление движения игрока
     * @returns {{x: int, y:int}} Следующая позиция игрока
     */
    getNextPosition(direction) {
        const nextPosition = {
            x: player.x,
            y: player.y
        };

        switch(direction) {
            case 1:
                nextPosition.x--;
                nextPosition.y++;
                break;
            case 2:
                nextPosition.y++;
                break;
            case 3:
                nextPosition.x++;
                nextPosition.y++;
                break;
            case 4:
                nextPosition.x--;
                break;
            case 6:
                nextPosition.x++;
                break;
            case 7:
                nextPosition.x--;
                nextPosition.y--;
                break;
            case 8:
                nextPosition.y--;
                break;
            case 9:
                nextPosition.x++;
                nextPosition.y--;
                break;
        }
        return nextPosition;
    }
};