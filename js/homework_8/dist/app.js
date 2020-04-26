class Board {
    constructor() {
        this.boardEl = document.querySelector('.minesweeper__board');
        this.openCell = this.openCell.bind(this);
        this.popCell = this.popCell.bind(this);
        this.smilePush = this.smilePush.bind(this);
        this.smilePop = this.smilePop.bind(this);
    }

    init(settings, mines, game, data, sprite) {
        this.settings = settings;
        this.mines = mines;
        this.game = game;
        this.data = data;
        this.sprite = sprite;
    }

    renderBoard() {
        for (let i = 1; i <= this.settings.rows + 4; i++) {
            let tr = document.createElement('tr');

            for (let j = 1; j <= this.settings.cols + 2; j++) {
                let td = document.createElement('td');

                if (i === 1) {
                    td.classList.add('minesweeper-border-top');
                    tr.appendChild(td);
                    continue;
                }

                if (i === 2 && j > 1 && j < this.settings.cols) {
                    td.classList.add('minesweeper-info');
                    td.setAttribute('colspan', `${this.settings.cols}`);
                    j = this.settings.cols + 1;
                    td.insertAdjacentHTML('beforeend', `
                        <div class="minesweeper-info-content">
                            <div class="minesweeper-mine-count">
                                <span class="minesweeper-mine-count-hundreds"></span>
                                <span class="minesweeper-mine-count-tens"></span>
                                <span class="minesweeper-mine-count-units"></span>
                            </div>
                            <span class="minesweeper-smile-face"></span>
                            <div class="minesweeper-timer">
                                <span class="minesweeper-timer-hundreds"></span>
                                <span class="minesweeper-timer-tens"></span>
                                <span class="minesweeper-timer-units"></span>
                            </div>
                        </div>
                    `);
                    tr.appendChild(td);
                    continue;
                }

                if (i === 2) {
                    td.classList.add('minesweeper-info');
                    tr.appendChild(td);
                    continue;
                }

                if (i === 3) {
                    td.classList.add('minesweeper-border-middle');
                    tr.appendChild(td);
                    continue;
                }

                if (j === 1) {
                    td.classList.add('minesweeper-border-left');
                    tr.appendChild(td);
                    continue;
                }

                if (j === this.settings.cols + 2) {
                    td.classList.add('minesweeper-border-right');
                    tr.appendChild(td);
                    continue;
                }

                if (i === this.settings.rows + 4) {
                    td.classList.add('minesweeper-border-bottom');
                    tr.appendChild(td);
                    continue;
                }

                td.classList.add(`y-${i - 3}`);
                td.classList.add(`x-${j - 1}`);
                td.classList.add('minesweeper-cell');
                tr.appendChild(td);
            }
            this.boardEl.appendChild(tr);
        }
    }

    checkCell(cell) {
        if (cell.classList.contains('flag')) {
            return;
        }

        if (!cell.classList.contains('minesweeper-cell')) {
            return;
        }

        if (this.data.minesArr.indexOf(cell) !== -1) {
            cell.classList.add('mine-exploded');
            this.game.lose(cell);
            return;
        }

        let i = 0;
        for (let tip of this.data.numberTips) {
            if (tip === cell) {
                i++;
            }
        }

        if (i > 0) {
            cell.classList.add(`value-${i}`);
            cell.classList.add('open');
            if (this.isCellsAreOpen()) {
                this.game.win();
            }
            return;
        }

        cell.classList.add('open');
        cell.removeEventListener('click', this.openCell);

        let cellCoords = {
            y: Number(cell.classList[0].slice(2)),
            x: Number(cell.classList[1].slice(2))
        };

        let cellSiblings = new Siblings(cellCoords);

        for (let cell of cellSiblings.arr) {
            if (cell !== null && !cell.classList.contains('open') && !cell.classList.contains('flag')) {
                cell.classList.add('open');
                this.checkCell(cell);
                this.openCell(cell);
            }
        }
    }

    openCell(cell) {
        this.checkCell(cell);
    }

    popCell(cell) {
        document.querySelector('.minesweeper-smile-face').classList.add('smile-surprised');
        this.popupCell(cell);
        document.querySelectorAll('.minesweeper-cell').forEach(element => {
            element.addEventListener('mouseenter', this.popupCell);
            element.addEventListener('mouseleave', this.popdownCell);
        });
    }

    popupCell(element) {
        event.target.classList.add('pop');
    }

    popdownCell() {
        event.target.classList.remove('pop');
    }

    popCellRemove(cell) {
        document.querySelector('.minesweeper-smile-face').classList.remove('smile-surprised');
        this.popdownCell(cell);
        this.openCell(cell);
        document.querySelectorAll('.minesweeper-cell').forEach(element => {
            element.removeEventListener('mouseenter', this.popupCell);
            element.removeEventListener('mouseleave', this.popdownCell);
        });
    }

    smilePush() {
        this.smilePopDown();
        document.querySelector('.minesweeper-smile-face').addEventListener('mouseenter', this.smilePopDown);
        document.querySelector('.minesweeper-smile-face').addEventListener('mouseleave', this.smilePopUp);
    }

    smilePop() {
        this.smilePopUp();
        document.querySelector('.minesweeper-smile-face').removeEventListener('mouseenter', this.smilePopDown);
        document.querySelector('.minesweeper-smile-face').removeEventListener('mouseleave', this.smilePopUp);
    }

    smilePopDown() {
        document.querySelector('.minesweeper-smile-face').classList.add('smile-pushed');
    }

    smilePopUp() {
        document.querySelector('.minesweeper-smile-face').classList.remove('smile-pushed');
    }

    placeFlag(event) {
        if (this.data.flagsArr.indexOf(event.target) === -1) {
            if (this.settings.mineCount < 1) {
                return;
            }
            this.data.flagsArr.push(event.target);
        }

        if (event.target.classList.contains('flag')) {
            this.mines.increaseCount();
            event.target.classList.remove('flag');
            this.data.flagsArr.splice(this.data.flagsArr.indexOf(event.target), 1);
        } else {
            this.mines.decreaseCount();
            event.target.classList.add('flag');
        }

        if (this.isCellsAreOpen()) {
            this.game.win();
        }
    }

    isCellsAreOpen() {
        let cells = document.querySelectorAll('.minesweeper-cell');
        for (let cell of cells) {
            if (!cell.classList.contains('open') && !cell.classList.contains('flag')) {
                return;
            }
        }
        return true;
    }

    showWrongFlags() {
        for (let flag of this.data.flagsArr) {
            if (this.data.minesArr.indexOf(flag) < 0) {
                this.data.wrongFlags.push(flag);
            }
        }
        this.data.wrongFlags.forEach((flag) => {
            flag.classList.add('wrong-flag');
        });
    }

    getCellEl(x, y) {
        return document.querySelector(`.y-${y}.x-${x}`);
    }

    clear() {
        while (this.boardEl.firstChild) {
            this.boardEl.removeChild(this.boardEl.firstChild);
        }
    }
}


class Data {
    constructor() {
        this.firstClick = null;
        this.minesArr = [];
        this.numberTips = [];
        this.flagsArr = [];
        this.wrongFlags = [];
    }
}
class Game {
    init(settings, board, mines, timer, params, data, sprite) {
        this.settings = settings;
        this.board = board;
        this.mines = mines;
        this.timer = timer;
        this.params = params;
        this.data = data;
        this.sprite = sprite;
    }

    run() {
        this.mines.markupCount();
        this.mines.setCount();
        this.timer.markup();
        this.timer.set();

        this.setHandlers();
    }

    win() {
        if (this.data.flagsArr.length === 0) {
            return;
        }
        if (this.data.flagsArr.length !== this.data.minesArr.length) {
            return;
        }
        for (let flag of this.data.flagsArr) {
            if (this.data.minesArr.indexOf(flag) < 0) {
                return false;
            }
        }
        document.querySelector('.minesweeper-smile-face').classList.add('smile-win');
        clearInterval(this.timer.intervalID);
        this.clearHandlers();
    }

    lose(cell) {
        clearInterval(this.timer.intervalID);
        this.mines.showMines(cell);
        this.board.showWrongFlags()
        document.querySelector('.minesweeper-smile-face').classList.add('smile-dead');
        this.clearHandlers();
    }

    setHandlers() {
        document.onmousedown = () => {
            let cell = event.target;

            if (event.which === 1 && cell.classList.contains('minesweeper-cell')) {
                this.board.popCell(cell);
            }
        };

        document.onmouseup = () => {
            if (event.which === 1 && event.target.classList.contains('minesweeper-cell')) {
                if (this.data.firstClick === null) {
                    let firstClickCoords = {
                        y: Number(event.target.classList[0].slice(2)),
                        x: Number(event.target.classList[1].slice(2))
                    };
                    this.data.firstClick = new Siblings(firstClickCoords);
                    this.mines.generateMines();
                    this.mines.generateNumberTips();
                    this.timer.starter();
                }
                let cell = event.target;
                this.board.popCellRemove(cell);
            }
        };

        document.oncontextmenu = (event) => {

            if (event.target.classList.contains('open')) {
                event.preventDefault();
                return;
            }
            if (event.target.classList.contains('minesweeper-cell')) {
                this.board.placeFlag(event);
                event.preventDefault();
            }
        };

        let smile = document.querySelector('.minesweeper-smile-face');

        smile.addEventListener('mousedown', this.board.smilePush);
        smile.addEventListener('mouseup', () => {
            this.reset();
            this.board.renderBoard();
            this.run();
        });
        document.addEventListener('mouseup', () => {
            if (event.target !== smile) {
                this.board.smilePop();
            }
        });
    }

    clearHandlers() {
        document.oncontextmenu = (event) => {
            event.preventDefault();
        };
        document.onmousedown = (event) => {
            event.preventDefault();
        };
        document.onmouseup = (event) => {
            event.preventDefault();
        };
    }

    reset() {
        this.data = new Data();
        this.board.clear();
        this.timer.clear();
        this.timer = new Timer();
        this.timer.init(this.sprite);
        this.settings.init(this.params);
        this.mines.init(this.settings, this.sprite, this.board, this.data);
        this.board.init(this.settings, this.mines, this, this.data, this.sprite);
    }
}
window.addEventListener('load', function() {
    const settings = new Settings();
    const board = new Board();
    const sprite = new Sprite();
    const mines = new Mines();
    const timer = new Timer();
    let data = new Data();
    const game = new Game();

    let params = {rows: 20, cols: 20, mineCount: 29};

    settings.init(params);
    board.init(settings, mines, game, data, sprite);
    mines.init(settings, sprite, board, data);
    timer.init(sprite);
    game.init(settings, board, mines, timer, params, data, sprite);

    board.renderBoard();
    game.run();
});
class Mines {
    init(settings, sprite, board, data) {
        this.settings = settings;
        this.sprite = sprite;
        this.board = board;
        this.data = data;
        this.mineCount = this.settings.mineCount;
    }

    markupCount() {
        this.units = document.querySelector('.minesweeper-mine-count-units');
        this.tens = document.querySelector('.minesweeper-mine-count-tens');
        this.hundreds = document.querySelector('.minesweeper-mine-count-hundreds');
    }

    setCount() {
        let splittedCount = this.splitCount();

        this.units.style.backgroundPosition = `${this.sprite.numberValues[splittedCount[2]]} 0`;
        this.tens.style.backgroundPosition = `${this.sprite.numberValues[splittedCount[1]]} 0`;
        this.hundreds.style.backgroundPosition = `${this.sprite.numberValues[splittedCount[0]]} 0`;
    }

    splitCount() {
        return [
            Math.floor(this.settings.mineCount / 100),
            (Math.floor(this.settings.mineCount / 10)) % 10,
            this.settings.mineCount % 10
        ];
    }

    decreaseCount() {
        this.settings.mineCount--;
        this.setCount();
    }

    increaseCount() {
        this.settings.mineCount++;
        this.setCount();
    }

    generateMines() {
        for (let i = 0; i < this.mineCount; i++) {
            let cell = this.generateRandomCoordinates();
            if (this.data.minesArr.indexOf(cell) !== -1) {
                i--;
                continue;
            }
            this.data.minesArr.push(cell);
        }
    }

    showMines(cell) {
        for (let element of this.data.minesArr) {
            if (element === cell) {
                continue;
            }
            element.classList.add('mine');
        }
    }
    generateRandomCoordinates() {
        outer:
        while (true) {
            let x = Math.floor(Math.random() * this.settings.cols) + 1;
            let y = Math.floor(Math.random() * this.settings.rows) + 1;
            let cell = this.board.getCellEl(x, y);

            for (let element of this.data.firstClick.arr) {
                if (cell === element || cell === event.target) {
                    continue outer;
                }
            }
            return cell;
        }
    }

    generateNumberTips() {
        for (let mine of this.data.minesArr) {
            let mineCoords = {
                y: Number(mine.classList[0].slice(2)),
                x: Number(mine.classList[1].slice(2))
            };

            const cellSiblings = new Siblings(mineCoords);

            for (let element of cellSiblings.arr) {
                if (element !== null && this.data.minesArr.indexOf(element) === -1) {
                    this.data.numberTips.push(element);
                }
            }
        }
    }
}
class Settings {

    init(params) {
        let defaultParams = {rows: 10, cols: 10, mineCount: 10};
        Object.assign(defaultParams, params);

        if (defaultParams.rows < 4 || defaultParams.rows >= 30) {
            throw new Error('Введено недопустимое количество строк');
        }

        if (defaultParams.cols < 7 || defaultParams.cols >= 30) {
            throw new Error('Введено недопустимое количество столбцов');
        }

        if (defaultParams.mineCount < 1 || defaultParams.mineCount >= 30) {
            throw new Error('Введено недопустимое количество мин');
        }

        this.rows = defaultParams.rows;
        this.cols = defaultParams.cols;
        this.mineCount = defaultParams.mineCount;
    }

}
class Siblings {
    constructor(mineCoords) {
        this.arr = [document.querySelector(`.y-${mineCoords.y + 1}.x-${mineCoords.x}`),
                    document.querySelector(`.y-${mineCoords.y + 1}.x-${mineCoords.x - 1}`),
                    document.querySelector(`.y-${mineCoords.y + 1}.x-${mineCoords.x + 1}`),
                    document.querySelector(`.y-${mineCoords.y - 1}.x-${mineCoords.x}`),
                    document.querySelector(`.y-${mineCoords.y - 1}.x-${mineCoords.x - 1}`),
                    document.querySelector(`.y-${mineCoords.y - 1}.x-${mineCoords.x + 1}`),
                    document.querySelector(`.y-${mineCoords.y}.x-${mineCoords.x - 1}`),
                    document.querySelector(`.y-${mineCoords.y}.x-${mineCoords.x + 1}`)
        ];
    }
}
class Sprite {
    constructor() {
        this.numberValues = {
            0: '0px',
            1: '-19px',
            2: '-38px',
            3: '-58px',
            4: '-77px',
            5: '-97px',
            6: '-116px',
            7: '-136px',
            8: '-155px',
            9: '-175px'
        };
    }
}
class Timer {
    constructor() {
        this.timerUnits = 0;
        this.timerTens = 0;
        this.timerHundreds = 0;
        this.status = false;
        this.intervalID = null;
        this.starter = this.start.bind(this);
        this.checker = this.check.bind(this);
    }

    init(sprite) {
        this.sprite = sprite;
    }

     start() {
        this.status = true;
        this.intervalID = setInterval(() => {
            if (this.timerUnits !== 9) {
                this.timerUnits++;
                this.set();
                return;
            }
            if (this.timerUnits === 9 && this.timerTens !== 9) {
                this.timerUnits = 0;
                this.timerTens++;
                this.set();
                return;
            }
            if (this.timerUnits === 9 && this.timerTens === 9 && this.timerHundreds !== 9) {
                this.timerUnits = 0;
                this.timerTens = 0;
                this.timerHundreds++;
                this.set();
                return;
            }
            if (this.timerUnits === 9 && this.timerTens === 9 && this.timerHundreds === 9) {
                clearInterval(this.intervalID);
            }
        }, 1000);
    }

    markup() {
        this.units = document.querySelector('.minesweeper-timer-units');
        this.tens = document.querySelector('.minesweeper-timer-tens');
        this.hundreds = document.querySelector('.minesweeper-timer-hundreds');
    }

    set() {
        this.units.style.backgroundPosition = `${this.sprite.numberValues[this.timerUnits]} 0`;
        this.tens.style.backgroundPosition = `${this.sprite.numberValues[this.timerTens]} 0`;
        this.hundreds.style.backgroundPosition = `${this.sprite.numberValues[this.timerHundreds]} 0`;
    }

    check() {
        if (this.status) {
            document.querySelectorAll('.minesweeper-cell').forEach(cell => {
                cell.removeEventListener('mouseup', this.starter);
            });
            document.removeEventListener('mouseup', this.checker);
        }
    }

    clear() {
        clearInterval(this.intervalID);
    }
}
//# sourceMappingURL=maps/app.js.map
