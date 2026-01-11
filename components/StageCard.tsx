import React from 'react';
import { Lock, Play, CheckCircle } from 'lucide-react';
import { StageData, StageId } from '../types';

interface StageCardProps {
  stage: StageData;
  isLocked: boolean;
  isCompleted: boolean;
  onSelect: (id: StageId) => void;
}

/**
 * Thẻ hiển thị tóm tắt thông tin bài tập trong danh sách.
 * Xử lý 3 trạng thái giao diện:
 * 1. Locked: Mờ đi, không click được, hiện ổ khóa.
 * 2. Active (Default): Sáng, hover effect, hiện nút Play.
 * 3. Completed: Hiện dấu tích xanh.
 */
const StageCard: React.FC<StageCardProps> = ({ stage, isLocked, isCompleted, onSelect }) => {
  return (
    <div 
      className={`
        relative p-6 rounded-2xl shadow-sm transition-all duration-300 border-2
        ${isLocked 
          ? 'bg-gray-100 border-transparent opacity-70 cursor-not-allowed' // Style cho trạng thái khóa
          : 'bg-white border-transparent hover:border-blue-200 hover:shadow-md cursor-pointer transform hover:-translate-y-1' // Style tương tác
        }
      `}
      onClick={() => !isLocked && onSelect(stage.id)}
    >
      <div className="flex justify-between items-start mb-4">
        {/* Icon Container: Đổi màu nền nếu bị khóa */}
        <div className={`p-3 rounded-full ${isLocked ? 'bg-gray-200' : stage.color}`}>
          {isLocked ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : isCompleted ? (
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          ) : (
            <Play className="w-6 h-6 text-slate-700" />
          )}
        </div>
        <span className="text-sm font-semibold text-slate-400">Stage {stage.id}</span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">{stage.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">
        {stage.description}
      </p>

      {!isLocked && (
        <div className="text-xs font-medium text-blue-600 flex items-center">
          {isCompleted ? 'Luyện tập lại' : 'Bắt đầu ngay'} &rarr;
        </div>
      )}
    </div>
  );
};

export default StageCard;