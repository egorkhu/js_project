const button = document.querySelectorAll('.b-line__button')[3];
const checkmate = {
    rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    columns: [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 9],
    cellColor: 'white',
    blackFigures: ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'],
    whiteFigures: ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'],
    fieldCoordinates: [],

    generate: function() {
        if (document.querySelector('table') !== null) {
            document.querySelector('table').remove();
        }
        button.insertAdjacentHTML('beforebegin', `<table><tbody></tbody></table>`);
        checkmate.createRows();
        checkmate.placeFigures(checkmate.whiteFigures, 'white');
        checkmate.placeFigures(checkmate.blackFigures, 'black');
    },

    createRows: function() {
        for (let row of this.rows) {
            document.querySelector('tbody').insertAdjacentHTML('afterbegin', `<tr></tr>`);
            this.createColumns(row);
            if (this.cellColor === 'white') {
                this.cellColor = 'black';
            } else {
                this.cellColor = 'white';
            }
        }
    },

    createColumns: function(row) {
         if (row === 0 || row === 9) {
             for (let column of this.columns) {
                 if (column !== 0 && column !== 9) {
                     document.querySelectorAll('tr')[0].insertAdjacentHTML('beforeend', `<td>${column}</td>`);
                 } else {
                     document.querySelectorAll('tr')[0].insertAdjacentHTML('beforeend', `<td></td>`);
                 }
             }
         } else {
             for (let column of this.columns) {
                 if (column === 0 || column === 9) {
                     document.querySelectorAll('tr')[0].insertAdjacentHTML('beforeend', `<td>${row}</td>`);
                 } else {
                     let cell = null;
                     if (this.cellColor === 'white') {
                         document.querySelectorAll('tr')[0].insertAdjacentHTML('beforeend', `<td class="white-cell row-${row} column-${column}"></td>`);
                         this.cellColor = 'black';
                         cell = document.querySelector(`.row-${row}.column-${column}`);
                         this.fieldCoordinates.push(cell);
                     } else if (this.cellColor === 'black') {
                         document.querySelectorAll('tr')[0].insertAdjacentHTML('beforeend', `<td class="black-cell row-${row} column-${column}"></td>`);
                         this.cellColor = 'white';
                         cell = document.querySelector(`.row-${row}.column-${column}`);
                         this.fieldCoordinates.push(cell);
                     }
                 }
             }
         }
    },

    placeFigures: function(figures, color) {
        for (let figure of figures) {
            switch(figure) {
                case 'pawn':
                     if (color === 'black') {
                         document.querySelectorAll('.row-7').forEach((element) => {
                             element.innerHTML = '<i class="fas fa-chess-pawn"></i>';
                         });
                     } else {
                         document.querySelectorAll('.row-2').forEach((element) => {
                             element.innerHTML = '<i class="far fa-chess-pawn"></i>';
                         });
                     }
                    break;
                case 'rook':
                    if (color === 'black') {
                        document.querySelectorAll('.row-8').forEach((element) => {
                            if (element.classList.contains('column-A') || element.classList.contains('column-H')) {
                                element.innerHTML = '<i class="fas fa-chess-rook"></i>';
                            }
                        });
                    } else {
                        document.querySelectorAll('.row-1').forEach((element) => {
                            if (element.classList.contains('column-A') || element.classList.contains('column-H')) {
                                element.innerHTML = '<i class="far fa-chess-rook"></i>';
                            }
                        });
                    }
                    break;
                case 'knight':
                    if (color === 'black') {
                        document.querySelectorAll('.row-8').forEach((element) => {
                            if (element.classList.contains('column-B') || element.classList.contains('column-G')) {
                                element.innerHTML = '<i class="fas fa-chess-knight"></i>';
                            }
                        });
                    } else {
                        document.querySelectorAll('.row-1').forEach((element) => {
                            if (element.classList.contains('column-B') || element.classList.contains('column-G')) {
                                element.innerHTML = '<i class="far fa-chess-knight"></i>';
                            }
                        });
                    }
                    break;
                case 'bishop':
                    if (color === 'black') {
                        document.querySelectorAll('.row-8').forEach((element) => {
                            if (element.classList.contains('column-C') || element.classList.contains('column-F')) {
                                element.innerHTML = '<i class="fas fa-chess-bishop"></i>';
                            }
                        });
                    } else {
                        document.querySelectorAll('.row-1').forEach((element) => {
                            if (element.classList.contains('column-C') || element.classList.contains('column-F')) {
                                element.innerHTML = '<i class="far fa-chess-bishop"></i>';
                            }
                        });
                    }
                    break;
                case 'queen':
                    if (color === 'black') {
                        document.querySelectorAll('.row-8').forEach((element) => {
                            if (element.classList.contains('column-D')) {
                                element.innerHTML = '<i class="fas fa-chess-queen"></i>';
                            }
                        });
                    } else {
                        document.querySelectorAll('.row-1').forEach((element) => {
                            if (element.classList.contains('column-D')) {
                                element.innerHTML = '<i class="far fa-chess-queen"></i>';
                            }
                        });
                    }
                    break;
                case 'king':
                    if (color === 'black') {
                        document.querySelectorAll('.row-8').forEach((element) => {
                            if (element.classList.contains('column-E')) {
                                element.innerHTML = '<i class="fas fa-chess-king"></i>';
                            }
                        });
                    } else {
                        document.querySelectorAll('.row-1').forEach((element) => {
                            if (element.classList.contains('column-E')) {
                                element.innerHTML = '<i class="far fa-chess-king"></i>';
                            }
                        });
                    }
                    break;
            }
        }
    }
};

button.addEventListener('click', checkmate.generate);