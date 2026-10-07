import { getSudoku } from 'sudoku-gen';

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





const MASK = 0b1111111110

function getRandBoard(mode="hard") {
    const sudoku = getSudoku(mode);
    return  Uint8Array.from(sudoku.puzzle, char => char === '-' ? 0 : Number(char));
}

function newBoard(grid=null, mode="hard") {
    const obj = {
        grid: grid === null ? getRandBoard(mode) : grid,
        usedNums: new Uint16Array(27), // the 9 up-down lines, the 9 left-right lines, then the 9 squares
        candidatesPosition: new Uint8Array(27), // the 9 up-down lines, the 9 left-right lines, then the 9 squares
        candidates: new Uint16Array(81),
    }
    initBoard(obj);
    return obj;
}

function initBoard(board) {
    const {grid, usedNums} = board;
    for (let i = 0; i < 81; i++) {
        const num = grid[i];
        if (num === 0) continue;
        const col = (i % 9);
        const row = Math.floor(i/9) + 9;
        const square = SQUARE_OF_IDX[i] + 18;
        const bits = 1 << num;
        usedNums[col] |= bits;
        usedNums[row] |= bits;
        usedNums[square] |= bits;
    }
    updateCandidates(board);
}

function updateCandidates(board) {
    const {grid, usedNums, candidates} = board;
    for (let i = 0; i < 81; i++) {
        const num = grid[i];
        if (num !== 0) continue;
        const col = (i % 9);
        const row = Math.floor(i/9) + 9;
        const square = SQUARE_OF_IDX[i] + 18;
        candidates[i] = ~(usedNums[col] | usedNums[row] | usedNums[square]) & MASK
    }
    console.log(candidates);
}
export { newBoard, SQUARE_OF_IDX, SQUARE_POSITION }