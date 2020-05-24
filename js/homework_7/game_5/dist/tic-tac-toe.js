class Board {
    generateField() {
        let row = '';
        let id = 1;
        for (let i = 1; i <= 3; i++) {
            let col = '';
            for (let j = 1; j <= 3; j++) {
                col += `<td class="b-line__cell" id="cell-${id}">`;
                id++;
            }
            row += `<tr>${col}</tr>`;
        }
        return `<table class="b-line__table"><tbody>${row}</tbody></table>`;
    }

    colorCell(cells) {
        for (let cell of cells) {
            document.querySelector(`#cell-${cell}`).style.color = 'red';
        }
    }

    checkBusyCell(event) {
        return event.currentTarget.childElementCount > 0
    }

    clear() {
        document.querySelector('.b-line__table').remove();
    }
}

class Game {
    constructor() {
        this.step = 0;
        this.winningLines = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['1', '4', '7'],
            ['2', '5', '8'],
            ['3', '6', '9'],
            ['1', '5', '9'],
            ['3', '5', '7']
        ];
        this.move = this.makeMove.bind(this);
    }

    init(board, players) {
        this.board = board;
        this.players = players;
    }

    run() {
        this.createInfoMessage();
        let text = "Первыми ходят крестики, поставьте его в любом месте на поле.";
        this.showInfoMessage(text);
        let field = this.board.generateField();
        document.querySelector('.b_line__info-message').insertAdjacentHTML('afterend', field);
        document.querySelectorAll('.b-line__cell').forEach((element) => {
            element.addEventListener('click', this.move);
        });
    }

    makeMove(event) {
        let id = null;
        if (this.board.checkBusyCell(event)) {
            return;
        }
        if (this.players.ticPlayerMove === true) {
            event.target.insertAdjacentHTML('afterbegin', `<i class="fal fa-times"></i>`);
            id = event.target.id;
            this.players.ticMoveLine += id.slice(-1);
            this.players.ticPlayerMove = false;
            this.players.tacPlayerMove = true;
            this.step++;
        } else if (this.players.tacPlayerMove === true) {
            event.target.insertAdjacentHTML('afterbegin', `<i class="far fa-circle"></i>`);
            id = event.target.id;
            this.players.tacMoveLine += id.slice(-1);
            this.players.ticPlayerMove = true;
            this.players.tacPlayerMove = false;
            this.step++;
        }
        if (this.checkStep() === true) {
            let result = this.checkTheLine(this.players.ticMoveLine, this.players.tacMoveLine);
            if (result !== null) {
                this.showInfoMessage(result);
                this.createAgainBtn();
                document.querySelectorAll('.b-line__cell').forEach((element) => {
                    element.removeEventListener('click', this.move);
                });
            }
        }
    }

    checkStep() {
        return this.step > 4;
    }

    checkTheLine(ticLine, tacLine) {
        outer:
            for (let line of this.winningLines) {
                for (let i = 0; i < line.length; i++) {
                    if (ticLine.indexOf(line[i]) === -1) {
                        continue outer;
                    }
                }
                this.board.colorCell(line);
                return 'Победили крестики!';
            }
        outer:
            for (let line of this.winningLines) {
                for (let i = 0; i < line.length; i++) {
                    if (tacLine.indexOf(line[i]) === -1) {
                        continue outer;
                    }
                }
                this.board.colorCell(line);
                return 'Победили нолики!';
            }
        if (this.step === 9) {
            return 'Ничья';
        }
        return null;
    }

    createInfoMessage() {
        this.infoMessage = document.createElement('div');
        this.infoMessage.classList.add('b_line__info-message');
        document.querySelector('.b-form__legend').after(this.infoMessage);
    }

    showInfoMessage(text) {
        this.infoMessage.innerText = text;
    }

    deleteInfoMessage() {
        document.querySelector('.b_line__info-message').remove();
    }

    createAgainBtn() {
        document.querySelector('.b-line__table').insertAdjacentHTML('afterend', `<button class="b-line__button">Сыграем еще раз?</button>`);
        document.querySelectorAll('.b-line__button')[0].addEventListener('click', () => {
            this.fullReset();
            this.run();
        });
    }

    removeAgainBtn() {
        document.querySelectorAll('.b-line__button')[0].remove();
    }

    fullReset() {
        this.step = 0;
        this.players = new Players();
        this.board.clear();
        this.deleteInfoMessage();
        this.removeAgainBtn();
    }
}
window.addEventListener('load', () => {
    const board = new Board();
    const players = new Players();
    const game = new Game();

    game.init(board, players);
    game.run();
});
class Players {
    constructor() {
        this.ticPlayerMove = true;
        this.tacPlayerMove = false;
        this.ticMoveLine = '';
        this.tacMoveLine = '';
    }
}
//# sourceMappingURL=maps/tic-tac-toe.js.map
