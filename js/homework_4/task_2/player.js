/**
 * Объект игрока, здесь хранятся все методы и свойства, связанные с ним
 * @property {int} x Координаты по оси x
 * @property {int} y Координаты по оси y
 */
const player = {
    x: 0,
    y: 0,

    /**
     * Двигает игрока по переданному направлению
     * @param {{x: int, y: int}}nextPoint Следующая точка пользователя
     */
    move(nextPoint) {
        if (nextPoint.x >= 0 && nextPoint.y >= 0) {
            if (nextPoint.x < config.colsCount && nextPoint.y < config.rowsCount) {
                this.x = nextPoint.x;
                this.y = nextPoint.y;
            }
        }
    },

    reset() {
        this.x = 0;
        this.y = 0;
    }
};
