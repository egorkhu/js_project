let app = {
    config: {
        rows: 10,
        cols: 10
    },

    player: {
        y: 1,
        x: 1
    },

    run() {
        let field = document.querySelector('.walker');
        if (!field) {
            let field = app.generateField();
            buttonWalker.insertAdjacentHTML('beforebegin', field);
            document.querySelector('.walker').insertAdjacentHTML('beforebegin', `<p>Нажимайте кнопки → ← ↑ ↓ для управления красным квадратом.</p>`);
        }
    },

    generateField() {
        let field = '';
        for (let i = 1; i <= this.config.rows; i++) {
            let row = '';
            row = this.generateRow(i);
            field += row;
        }
        return `<table class="walker"><tbody>${field}</tbody></table>`;
    },

    generateRow(rowNum) {
        let row = '';
        for (let i = 1; i <= this.config.cols; i++) {
            let cell = '';
            cell = this.generateCell(rowNum, i);
            row += cell;
        }
        return `<tr>${row}</tr>`;
    },

    generateCell(rowNum, colNum) {
        if (colNum === this.player.x && rowNum === this.player.y) {
            return `<td class="active" data-row="${rowNum}" data-col="${colNum}"></td>`
        } else {
            return `<td data-row="${rowNum}" data-col="${colNum}"></td>`
        }
    },

    checkTheButton(event) {
        let key = event.keyCode;
        app.changeCoordinates(key);
    },

    changeCoordinates(pressedButton) {
        let x = this.player.x;
        let y = this.player.y;
        if (pressedButton === 37) {
            x = --x;
        } else if (pressedButton === 38) {
            y = --y;
        } else if (pressedButton === 39) {
            x = ++x;
        } else if (pressedButton === 40) {
            y = ++y;
        }
        if (x > 0 && x <= this.config.cols && y > 0 && y <= this.config.rows) {
            document.querySelector(`[data-row="${this.player.y}"][data-col="${this.player.x}"]`).classList.remove('active');
            this.player.x = x;
            this.player.y = y;
            this.mover(x, y);
        }
    },

    mover(x, y) {
        document.querySelector(`[data-row="${y}"][data-col="${x}"]`).classList.add('active');
    }
};

const buttonWalker = document.querySelectorAll('.b-line__button')[4];
buttonWalker.addEventListener('click', app.run);
document.addEventListener('keydown', app.checkTheButton);