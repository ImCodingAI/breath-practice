import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, Info, Sparkles, User } from 'lucide-react';
import { StageData } from '../types';

interface StageDetailProps {
  stage: StageData;
  onStart: () => void;
  onBack: () => void;
}

const StageDetail: React.FC<StageDetailProps> = ({ stage, onStart, onBack }) => {
  const [isVisible, setIsVisible] = useState(false);

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
        className="mb-6 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors font-medium text-sm group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
        {/* Header màu sắc động */}
        <div className={`${stage.color} p-8 text-center transition-colors`}>
          <div className="inline-block p-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-full mb-4 shadow-sm">
             <Sparkles className="w-8 h-8 text-slate-700 dark:text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{stage.title}</h2>
          <p className="text-slate-600 dark:text-slate-200 max-w-md mx-auto">{stage.description}</p>
        </div>

        <div className="p-8">
          {/* Hướng dẫn tư thế */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Tư thế chuẩn bị
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              {stage.instruction}
            </p>
          </div>

          {/* Lợi ích */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-emerald-500" />
              Lợi ích bài tập
            </h3>
            <ul className="space-y-3">
              {stage.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-slate-800 dark:bg-slate-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
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