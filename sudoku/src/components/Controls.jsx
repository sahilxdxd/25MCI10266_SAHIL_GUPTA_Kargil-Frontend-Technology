import React from 'react';
import { Play, RotateCcw, Trash2, CheckCircle, FileDown } from 'lucide-react';

const Controls = ({ 
  onSolve, 
  onReset, 
  onClear, 
  onValidate, 
  onLoadSample, 
  isSolving 
}) => {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <div className="flex flex-wrap justify-center gap-2">
        <button 
          onClick={onSolve} 
          disabled={isSolving}
          className="btn btn-primary min-w-[120px]"
        >
          <Play size={18} /> Solve
        </button>
        
        <button 
          onClick={onValidate} 
          disabled={isSolving}
          className="btn btn-secondary"
        >
          <CheckCircle size={18} /> Validate
        </button>
        
        <button 
          onClick={onReset} 
          disabled={isSolving}
          className="btn btn-secondary"
          title="Reset to initial loaded state"
        >
          <RotateCcw size={18} /> Reset
        </button>
        
        <button 
          onClick={onClear} 
          disabled={isSolving}
          className="btn btn-danger"
          title="Clear the entire board"
        >
          <Trash2 size={18} /> Clear
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
        <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
          <FileDown size={16} /> Load Sample:
        </span>
        <button 
          onClick={() => onLoadSample('easy')} 
          disabled={isSolving}
          className="px-3 py-1 text-sm bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors"
        >
          Easy
        </button>
        <button 
          onClick={() => onLoadSample('medium')} 
          disabled={isSolving}
          className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
        >
          Medium
        </button>
        <button 
          onClick={() => onLoadSample('hard')} 
          disabled={isSolving}
          className="px-3 py-1 text-sm bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default Controls;
