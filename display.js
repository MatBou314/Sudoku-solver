import { newBoard } from './board.js';

const SQUARE_OF_IDX = new Uint8Array([
    0, 0, 0, 1, 1, 1, 2, 2, 2,
    0, 0, 0, 1, 1, 1, 2, 2, 2,
    0, 0, 0, 1, 1, 1, 2, 2, 2,
    3, 3, 3, 4, 4, 4, 5, 5, 5,
    3, 3, 3, 4, 4, 4, 5, 5, 5,
    3, 3, 3, 4, 4, 4, 5, 5, 5,
    6, 6, 6, 7, 7, 7, 8, 8, 8,
    6, 6, 6, 7, 7, 7, 8, 8, 8,
    6, 6, 6, 7, 7, 7, 8, 8, 8,
])

const SQUARE_POSITION = new Uint8Array([
    0, 1, 2, 0, 1, 2, 0, 1, 2,
    3, 4, 5, 3, 4, 5, 3, 4, 5,
    6, 7, 8, 6, 7, 8, 6, 7, 8,
    0, 1, 2, 0, 1, 2, 0, 1, 2,
    3, 4, 5, 3, 4, 5, 3, 4, 5,
    6, 7, 8, 6, 7, 8, 6, 7, 8,
    0, 1, 2, 0, 1, 2, 0, 1, 2,
    3, 4, 5, 3, 4, 5, 3, 4, 5,
    6, 7, 8, 6, 7, 8, 6, 7, 8
])

function newAffBoard() {
    const obj = {
        board: newBoard(),
        boardElem: createBoard(),
    }
    updateBoard(obj);
    return obj;
}

function createBoard() {
    const boardElem = document.createElement("div");
    boardElem.classList.add("board");
    const exSquare = document.createElement("div");
    exSquare.classList.add("square");
    const exCell = document.createElement("div");
    exCell.classList.add("cell");
    for (let i = 0; i < 9; i++) {
      exSquare.appendChild(exCell.cloneNode(true));
    }
    for (let i = 0; i < 9; i++) {
        boardElem.appendChild(exSquare.cloneNode(true));
    }
    document.body.appendChild(boardElem);
    return boardElem;
}

function updateBoard(affBoard) {
    const {grid} = affBoard.board;
    const {boardElem} = affBoard;
    for (let i = 0; i < 81; i++) {
        const square = boardElem.children[SQUARE_OF_IDX[i]];
        const cell = square.children[SQUARE_POSITION[i]];
        const num = grid[i];
        cell.textContent = num === 0 ? "" : num;
    }
}

const mainAffBoard = newAffBoard();