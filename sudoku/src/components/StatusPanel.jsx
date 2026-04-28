import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, Gauge } from 'lucide-react';

const StatusPanel = ({ status, message, speed, onSpeedChange, isSolving }) => {
  // Determine styles based on status
  let bgColor = "bg-slate-100";
  let textColor = "text-slate-700";
  let Icon = Info;

  switch (status) {
    case 'idle':
      bgColor = "bg-slate-100";
      textColor = "text-slate-700";
      Icon = Info;
      break;
    case 'solving':
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      Icon = Info;
      break;
    case 'solved':
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      Icon = CheckCircle;
      break;
    case 'invalid':
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      Icon = XCircle;
      break;
    case 'unsolvable':
      bgColor = "bg-orange-100";
      textColor = "text-orange-800";
      Icon = AlertTriangle;
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-2xl mx-auto w-full my-4">
      <div className={`flex-1 w-full flex items-center gap-3 p-3 rounded-md transition-colors duration-300 ${bgColor} ${textColor}`}>
        <Icon size={20} className={status === 'solving' ? 'animate-pulse' : ''} />
        <span className="font-medium text-sm sm:text-base">{message}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-white p-2 rounded-md border border-slate-200 shadow-sm shrink-0">
        <Gauge size={18} className="text-slate-500" />
        <span className="text-sm font-medium text-slate-600 mr-1">Speed:</span>
        <select 
          value={speed} 
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          disabled={isSolving}
          className="text-sm bg-slate-50 border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value={100}>Slow</option>
          <option value={10}>Medium</option>
          <option value={1}>Fast</option>
          <option value={0}>Instant</option>
        </select>
      </div>
    </div>
  );
};

export default StatusPanel;
