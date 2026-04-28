import React from 'react';
import Cell from './Cell';

const Board = ({ 
  board, 
  initialBoard, 
  onChange, 
  activeCell, 
  onCellFocus, 
  conflictingCells,
  solvingCell 
}) => {
  return (
    <div className="flex justify-center my-6">
      <div className="sudoku-grid grid grid-cols-9 shadow-xl rounded-sm overflow-hidden">
        {board.map((row, rIndex) => (
          row.map((cellValue, cIndex) => {
            const isInitial = initialBoard[rIndex][cIndex] !== 0;
            const isSelected = activeCell && activeCell[0] === rIndex && activeCell[1] === cIndex;
            const isConflicting = conflictingCells.includes(`${rIndex}-${cIndex}`);
            const isSolving = solvingCell && solvingCell[0] === rIndex && solvingCell[1] === cIndex;

            return (
              <Cell
                key={`${rIndex}-${cIndex}`}
                row={rIndex}
                col={cIndex}
                value={cellValue}
                isInitial={isInitial}
                onChange={onChange}
                isSelected={isSelected}
                isConflicting={isConflicting}
                isSolving={isSolving}
                onFocus={onCellFocus}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default Board;
