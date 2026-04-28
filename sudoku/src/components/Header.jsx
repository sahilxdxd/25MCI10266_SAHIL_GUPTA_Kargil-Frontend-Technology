import React from 'react';

const Header = () => {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">
        Sudoku <span className="text-blue-600">Solver</span>
      </h1>
      <p className="text-slate-600 max-w-xl mx-auto">
        A visual demonstration of the recursive backtracking algorithm. 
        Input a puzzle manually or load a sample, then watch the algorithm solve it step by step.
      </p>
    </header>
  );
};

export default Header;
