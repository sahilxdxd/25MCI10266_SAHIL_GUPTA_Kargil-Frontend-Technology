import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Controls from './components/Controls';
import StatusPanel from './components/StatusPanel';
import { 
  createEmptyBoard, 
  isSafe, 
  findEmptyCell, 
  isValidBoard, 
  getConflictingCells, 
  isSolved,
  SAMPLE_PUZZLES 
} from './utils/sudokuLogic';

const App = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [initialBoard, setInitialBoard] = useState(createEmptyBoard());
  const [status, setStatus] = useState('idle'); // idle, solving, solved, invalid, unsolvable
  const [message, setMessage] = useState('Ready to solve! Input a puzzle or load a sample.');
  const [speed, setSpeed] = useState(10); // delay in ms
  const [activeCell, setActiveCell] = useState(null);
  const [conflictingCells, setConflictingCells] = useState([]);
  const [solvingCell, setSolvingCell] = useState(null);
  
  // Refs to access latest state in async recursive function
  const isSolvingRef = useRef(false);
  const speedRef = useRef(speed);
  
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const handleCellChange = (row, col, value) => {
    if (status === 'solving') return;
    
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);
    
    // Clear conflicts/status when user modifies board
    setConflictingCells([]);
    setStatus('idle');
    setMessage('Board modified. Ready to solve.');
  };

  const handleCellFocus = (row, col) => {
    if (status === 'solving') return;
    setActiveCell([row, col]);
  };

  const handleClear = () => {
    setBoard(createEmptyBoard());
    setInitialBoard(createEmptyBoard());
    setConflictingCells([]);
    setSolvingCell(null);
    setActiveCell(null);
    setStatus('idle');
    setMessage('Board cleared.');
  };

  const handleReset = () => {
    setBoard(initialBoard.map(row => [...row]));
    setConflictingCells([]);
    setSolvingCell(null);
    setActiveCell(null);
    setStatus('idle');
    setMessage('Board reset to initial state.');
  };

  const handleLoadSample = (difficulty) => {
    const sample = SAMPLE_PUZZLES[difficulty];
    if (sample) {
      const copy = sample.map(row => [...row]);
      setBoard(copy);
      setInitialBoard(sample.map(row => [...row]));
      setConflictingCells([]);
      setSolvingCell(null);
      setActiveCell(null);
      setStatus('idle');
      setMessage(`Loaded ${difficulty} sample puzzle.`);
    }
  };

  const handleValidate = () => {
    const conflicts = getConflictingCells(board);
    setConflictingCells(conflicts);
    
    if (conflicts.length > 0) {
      setStatus('invalid');
      setMessage(`Invalid puzzle! Found conflicts in ${conflicts.length} cell(s).`);
    } else {
      if (isSolved(board)) {
        setStatus('solved');
        setMessage('Congratulations! The puzzle is already solved and valid.');
      } else {
        setStatus('idle');
        setMessage('The current board is valid. Ready to solve.');
      }
    }
  };

  // Sleep function for animation
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSolve = async () => {
    // Basic validation first
    const conflicts = getConflictingCells(board);
    if (conflicts.length > 0) {
      setConflictingCells(conflicts);
      setStatus('invalid');
      setMessage('Cannot solve: the current board contains conflicts.');
      return;
    }

    if (isSolved(board)) {
      setStatus('solved');
      setMessage('The puzzle is already solved!');
      return;
    }

    // Prepare for solving
    setStatus('solving');
    setMessage('Solving with recursive backtracking...');
    isSolvingRef.current = true;
    setActiveCell(null);
    setConflictingCells([]);
    
    // Save current as initial if not already saved (allows resetting user input)
    if (initialBoard.every((row, r) => row.every((val, c) => val === 0))) {
      setInitialBoard(board.map(row => [...row]));
    }

    // Work on a copy of the board to avoid excessive re-renders during deep recursion
    // But we will update state periodically for visualization
    const currentBoard = board.map(row => [...row]);
    
    const solve = async () => {
      // Allow interrupting
      if (!isSolvingRef.current) return false;

      const emptyCell = findEmptyCell(currentBoard);
      
      // If no empty cells, puzzle is solved
      if (!emptyCell) return true;
      
      const [r, c] = emptyCell;
      setSolvingCell([r, c]);
      
      for (let num = 1; num <= 9; num++) {
        if (!isSolvingRef.current) return false;

        if (isSafe(currentBoard, r, c, num)) {
          // Place number
          currentBoard[r][c] = num;
          
          // Update visualization if delay > 0
          if (speedRef.current > 0) {
            setBoard(currentBoard.map(row => [...row]));
            await sleep(speedRef.current);
          }

          // Recurse
          if (await solve()) {
            return true;
          }

          // Backtrack
          currentBoard[r][c] = 0;
          if (speedRef.current > 0) {
            setBoard(currentBoard.map(row => [...row]));
            await sleep(speedRef.current);
          }
        }
      }
      
      return false; // Trigger backtracking
    };

    const success = await solve();
    
    if (success) {
      setBoard(currentBoard); // Final update
      setStatus('solved');
      setMessage('Puzzle solved successfully!');
    } else if (isSolvingRef.current) { // Check if not interrupted
      setStatus('unsolvable');
      setMessage('This puzzle cannot be solved.');
    }
    
    setSolvingCell(null);
    isSolvingRef.current = false;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isSolvingRef.current = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center">
        <StatusPanel 
          status={status} 
          message={message} 
          speed={speed} 
          onSpeedChange={setSpeed}
          isSolving={status === 'solving'}
        />

        <Board 
          board={board}
          initialBoard={initialBoard}
          onChange={handleCellChange}
          activeCell={activeCell}
          onCellFocus={handleCellFocus}
          conflictingCells={conflictingCells}
          solvingCell={solvingCell}
        />

        <Controls 
          onSolve={handleSolve}
          onClear={handleClear}
          onReset={handleReset}
          onValidate={handleValidate}
          onLoadSample={handleLoadSample}
          isSolving={status === 'solving'}
        />
        
        <div className="mt-12 max-w-2xl mx-auto w-full bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-slate-700">
          <h2 className="text-xl font-bold mb-3 text-slate-800">How it works</h2>
          <p className="mb-3">
            This application uses a <strong>Recursive Backtracking Algorithm</strong>. It's a depth-first search approach that systematically tries to fill empty cells with numbers from 1 to 9.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Find the first empty cell in the grid.</li>
            <li>Try placing a number (1-9) that doesn't violate Sudoku rules (no duplicates in row, column, or 3x3 subgrid).</li>
            <li>If a valid number is found, recursively attempt to solve the rest of the board.</li>
            <li>If a dead-end is reached (no valid numbers can be placed), <strong>backtrack</strong> by clearing the cell and trying the next number in the previous cell.</li>
          </ul>
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-500 text-sm py-4">
        <p>Built with React, Vite, and Tailwind CSS. Demonstrating Backtracking Algorithms.</p>
      </footer>
    </div>
  );
};

export default App;
