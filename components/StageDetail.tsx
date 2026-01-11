import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, Info, Sparkles, User } from 'lucide-react';
import { StageData } from '../types';

interface StageDetailProps {
  stage: StageData;
  onStart: () => void;
  onBack: () => void;
}

/**
 * Component hiển thị chi tiết bài tập trước khi bắt đầu.
 * Giúp người dùng chuẩn bị tâm thế và hiểu rõ lợi ích.
 */
const StageDetail: React.FC<StageDetailProps> = ({ stage, onStart, onBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Effect kích hoạt animation trượt lên (Slide Up Fade In) khi component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        w-full max-w-2xl mx-auto transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Header màu sắc động theo stage */}
        <div className={`${stage.color} p-8 text-center`}>
          <div className="inline-block p-4 bg-white/50 backdrop-blur-sm rounded-full mb-4 shadow-sm">
             <Sparkles className="w-8 h-8 text-slate-700" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{stage.title}</h2>
          <p className="text-slate-600 max-w-md mx-auto">{stage.description}</p>
        </div>

        <div className="p-8">
          {/* Phần hướng dẫn tư thế */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Tư thế chuẩn bị
            </h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {stage.instruction}
            </p>
          </div>

          {/* Phần liệt kê lợi ích */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-emerald-500" />
              Lợi ích bài tập
            </h3>
            <ul className="space-y-3">
              {stage.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Nút chính Action Call */}
          <button
            onClick={onStart}
            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
            Bắt đầu luyện tập
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageDetail;