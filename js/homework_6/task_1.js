'use strict';

let ticTacToe = {

    player1: true,
    player2: false,
    player1moves: '',
    player2moves: '',
    step: 0,
    winningLines: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ],

    game(event) {
        let id = null;
        if (event.currentTarget.childElementCount > 0) {
            return;
        }
        if (ticTacToe.player1) {
            event.target.insertAdjacentHTML('afterbegin',`<i class="fal fa-times"></i>`);
            id = event.target.id;
            ticTacToe.player1moves += id.slice(-1);
            ticTacToe.player1 = false;
            ticTacToe.player2 = true;
            ticTacToe.step++;
            console.log(ticTacToe.player1moves);
        } else if (ticTacToe.player2) {
            event.target.insertAdjacentHTML('afterbegin', `<i class="far fa-circle"></i>`);
            id = event.target.id;
            ticTacToe.player2moves += id.slice(-1);
            ticTacToe.player1 = true;
            ticTacToe.player2 = false;
            ticTacToe.step++;
            console.log(ticTacToe.player2moves);
        }
        if (ticTacToe.step > 4) {
            let result = ticTacToe.checkTheLine(ticTacToe.player1moves, ticTacToe.player2moves);
            if (result !== null) {
                document.querySelector('.b_line__info-message').innerText = result;
                document.querySelectorAll('.b-line__cell').forEach((element) => {
                    element.removeEventListener('click', ticTacToe.game);
                });
                document.querySelector('.b-line__table').insertAdjacentHTML('afterend', `<button class="b-line__button">Сыграем еще раз?</button>`);
                document.querySelectorAll('.b-line__button')[0].addEventListener('click', function() {
                    ticTacToe.reset();
                    ticTacToe.init();
                });

            }
            if (result == null && ticTacToe.step == 9) {
                document.querySelector('.b_line__info-message').innerText = 'Ничья!';
                document.querySelector('.b-line__table').insertAdjacentHTML('afterend', `<button class="b-line__button">Сыграем еще раз?</button>`);
                document.querySelectorAll('.b-line__button')[0].addEventListener('click', function() {
                    ticTacToe.reset();
                    ticTacToe.init();
                });

            }
        }

    },

    init() {
        let infoMessage = document.createElement('div');
        infoMessage.classList.add('b_line__info-message');
        infoMessage.innerText = "Первыми ходят крестики, поставьте его в любом месте на поле.";
        document.querySelector('.b-form__legend').after(infoMessage);
        let field = this.generateField();
        document.querySelector('.b_line__info-message').insertAdjacentHTML('afterend', field);
        document.querySelectorAll('.b-line__cell').forEach((element) => {
            element.addEventListener('click', ticTacToe.game);
        });
    },

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
    },

    checkTheLine(moves1, moves2) {
        outer:
        for (let line of this.winningLines) {
            for (let i = 0; i < line.length; i++) {
                if (moves1.indexOf(line[i]) === -1) {
                    continue outer;
                }
            }
            this.colorCell(line);
            return `Победили крестики!`;
        }
        outer:
        for (let line of this.winningLines) {
            for (let i = 0; i < line.length; i++) {
                if (moves2.indexOf(line[i]) === -1) {
                    continue outer;
                }
            }
            this.colorCell(line);
            return `Победили нолики!`;
        }
        return null;
    },

    colorCell(cells) {
        for (let cell of cells) {
            document.querySelector(`#cell-${cell}`).style.color = 'red';
        }
    },

    reset() {
        this.player1 = true;
        this.player2 = false;
        this.player1moves = '';
        this.player2moves = '';
        this.step = 0;
        document.querySelector('.b_line__info-message').remove();
        document.querySelector('.b-line__table').remove();
        document.querySelector('.b-line__button').remove();
    }
};

ticTacToe.init();
