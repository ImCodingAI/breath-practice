import React from 'react';
import { Lock, Play, CheckCircle } from 'lucide-react';
import { StageData, StageId } from '../types';

interface StageCardProps {
  stage: StageData;
  isLocked: boolean;
  isCompleted: boolean;
  onSelect: (id: StageId) => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, isLocked, isCompleted, onSelect }) => {
  return (
    <div 
      className={`
        relative p-6 rounded-2xl shadow-sm transition-all duration-300 border-2
        ${isLocked 
          ? 'bg-gray-100 dark:bg-slate-800/50 border-transparent opacity-70 cursor-not-allowed' 
          : 'bg-white dark:bg-slate-800 border-transparent hover:border-blue-200 dark:hover:border-slate-600 hover:shadow-md cursor-pointer transform hover:-translate-y-1'
        }
      `}
      onClick={() => !isLocked && onSelect(stage.id)}
    >
      <div className="flex justify-between items-start mb-4">
        {/* Icon Container */}
        <div className={`p-3 rounded-full ${isLocked ? 'bg-gray-200 dark:bg-slate-700' : stage.color}`}>
          {isLocked ? (
            <Lock className="w-6 h-6 text-gray-400 dark:text-slate-500" />
          ) : isCompleted ? (
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Play className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          )}
        </div>
        <span className="text-sm font-semibold text-slate-400">Stage {stage.id}</span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{stage.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
        {stage.description}
      </p>

      {!isLocked && (
        <div className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center">
          {isCompleted ? 'Luyện tập lại' : 'Bắt đầu ngay'} &rarr;
        </div>
      )}
    </div>
  );
};

export default StageCard;