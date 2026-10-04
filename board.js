import { getSudoku } from 'sudoku-gen';

function getRandBoard(mode="hard") {
    const sudoku = getSudoku(mode);
    return  Uint8Array.from(sudoku.puzzle, char => char === '-' ? 0 : Number(char));
}

function newBoard(grid=null) {
    return {
        grid: grid === null ? getRandBoard() : grid,
    }
}

export { newBoard }