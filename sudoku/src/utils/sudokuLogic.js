// src/utils/sudokuLogic.js

// Initialize an empty 9x9 board
export const createEmptyBoard = () => Array(9).fill().map(() => Array(9).fill(0));

// Check if a number is safe to place in the given row and col
export const isSafe = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num && x !== col) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num && x !== row) return false;
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num && (i + startRow !== row || j + startCol !== col)) {
        return false;
      }
    }
  }

  return true;
};

// Find the first empty cell (0) in the board
export const findEmptyCell = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        return [r, c];
      }
    }
  }
  return null;
};

// Check if the current board is fully valid (no conflicts)
export const isValidBoard = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) {
        if (!isSafe(board, r, c, board[r][c])) {
          return false;
        }
      }
    }
  }
  return true;
};

// Get a list of all conflicting cell coordinates for highlighting
export const getConflictingCells = (board) => {
  const conflicts = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) {
        if (!isSafe(board, r, c, board[r][c])) {
          conflicts.push(`${r}-${c}`);
        }
      }
    }
  }
  return conflicts;
};

// Check if board is full and valid
export const isSolved = (board) => {
  return findEmptyCell(board) === null && isValidBoard(board);
};

// Synchronous solver to just check if solvable
export const isSolvable = (board) => {
  const boardCopy = board.map(row => [...row]);
  
  const solve = () => {
    const emptyCell = findEmptyCell(boardCopy);
    if (!emptyCell) return true;
    
    const [r, c] = emptyCell;
    
    for (let num = 1; num <= 9; num++) {
      if (isSafe(boardCopy, r, c, num)) {
        boardCopy[r][c] = num;
        if (solve()) return true;
        boardCopy[r][c] = 0;
      }
    }
    return false;
  };
  
  return solve();
};

// Sample Puzzles
export const SAMPLE_PUZZLES = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  medium: [
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0]
  ],
  hard: [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0]
  ]
};
