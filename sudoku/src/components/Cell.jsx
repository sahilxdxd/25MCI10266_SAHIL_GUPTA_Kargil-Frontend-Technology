import React from 'react';

const Cell = ({ 
  value, 
  row, 
  col, 
  isInitial, 
  onChange, 
  isSelected, 
  isConflicting,
  isSolving,
  onFocus
}) => {
  const isRightThick = (col + 1) % 3 === 0 && col !== 8;
  const isBottomThick = (row + 1) % 3 === 0 && row !== 8;

  let cellClass = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-medium outline-none transition-colors duration-200 cursor-pointer caret-transparent bg-white text-center ";

  // Borders for 3x3 blocks
  cellClass += isRightThick ? "cell-right-thick " : "";
  cellClass += isBottomThick ? "cell-bottom-thick " : "";
  
  // States and colors
  if (isInitial) {
    cellClass += "text-slate-800 font-bold bg-slate-100 ";
  } else {
    cellClass += "text-blue-600 ";
  }

  if (isSolving) {
    cellClass += "bg-yellow-200 animate-pulse ";
  } else if (isConflicting) {
    cellClass += "bg-red-100 text-red-600 ";
  } else if (isSelected) {
    cellClass += "bg-blue-100 ring-2 ring-inset ring-blue-500 ";
  }

  const handleChange = (e) => {
    let val = e.target.value;
    // Allow only empty string or numbers 1-9
    if (val === "" || val === "0") {
      onChange(row, col, 0);
      return;
    }
    const num = parseInt(val.slice(-1)); // take only the last typed character
    if (num >= 1 && num <= 9) {
      onChange(row, col, num);
    }
  };

  return (
    <input
      type="number"
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onFocus={() => onFocus(row, col)}
      readOnly={isInitial && value !== 0} // Only initial values that are not 0 are readonly
      className={cellClass}
      min="1"
      max="9"
    />
  );
};

export default Cell;
