import React from 'react';
import { Trophy } from 'lucide-react';

interface ProgressBarProps {
  currentLevel: number; // Stage hiện tại người dùng đang có thể chơi
  totalLevels: number;  // Tổng số stage
}

/**
 * Thanh tiến trình hiển thị hành trình của người dùng.
 * Giúp người dùng biết mình đang ở đâu trong lộ trình tổng thể.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ currentLevel, totalLevels }) => {
  // Tính toán phần trăm độ rộng của thanh màu
  // Công thức: (Level hiện tại - 1) / (Tổng - 1) * 100
  // Ví dụ: Level 1 -> 0%, Level 2 -> 50%, Level 3 -> 100%
  const percentage = Math.min(100, Math.max(0, ((currentLevel - 1) / (totalLevels - 1)) * 100));
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Label & Badge */}
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hành trình của bạn</span>
        <div className="flex items-center text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-full shadow-sm">
          <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
          <span>Stage {currentLevel}/{totalLevels}</span>
        </div>
      </div>
      
      {/* Bar Container */}
      <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
        {/* Các vạch ngăn chia (Visual only) */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 border-r border-slate-50/20"></div>
          <div className="flex-1 border-r border-slate-50/20"></div>
          <div className="flex-1"></div>
        </div>
        
        {/* Active Progress Bar (Gradient Color) */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;