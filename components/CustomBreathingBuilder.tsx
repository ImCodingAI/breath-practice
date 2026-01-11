import React, { useState } from 'react';
import { Settings, Play, RefreshCw, X } from 'lucide-react';
import { StageData, BreathingStep } from '../types';

interface CustomBreathingBuilderProps {
  onStart: (customStage: StageData) => void;
  onClose: () => void;
}

const CustomBreathingBuilder: React.FC<CustomBreathingBuilderProps> = ({ onStart, onClose }) => {
  // State cho 4 giai đoạn
  const [inhale, setInhale] = useState(4);
  const [hold1, setHold1] = useState(4);
  const [exhale, setExhale] = useState(4);
  const [hold2, setHold2] = useState(0);

  const handleStart = () => {
    const steps: BreathingStep[] = [];
    
    steps.push({ action: 'inhale', label: 'Hít vào', duration: inhale, scale: 1.5 });
    if (hold1 > 0) steps.push({ action: 'hold', label: 'Nín thở', duration: hold1, scale: 1.5 });
    steps.push({ action: 'exhale', label: 'Thở ra', duration: exhale, scale: 1.0 });
    if (hold2 > 0) steps.push({ action: 'hold', label: 'Nín thở', duration: hold2, scale: 1.0 });

    const customStage: StageData = {
      id: 'custom',
      title: 'Hơi Thở Tự Do',
      description: 'Chế độ tùy chỉnh theo nhịp điệu riêng của bạn.',
      color: 'bg-rose-100',
      benefits: ['Tùy biến theo nhu cầu cá nhân', 'Thử nghiệm các kỹ thuật mới'],
      instruction: 'Thực hiện theo cấu hình bạn vừa thiết lập.',
      steps: steps
    };

    onStart(customStage);
  };

  const SliderControl = ({ label, val, setVal, color }: any) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-slate-600 font-medium text-sm">{label}</label>
        <span className={`font-bold ${color}`}>{val} giây</span>
      </div>
      <input
        type="range"
        min="0"
        max="15"
        step="1"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-rose-50">
          <div className="flex items-center gap-2">
            <Settings className="text-rose-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-800">Thiết lập Hơi thở</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <SliderControl label="Hít vào (Inhale)" val={inhale} setVal={setInhale} color="text-blue-500" />
          <SliderControl label="Nín thở (Giữ hơi)" val={hold1} setVal={setHold1} color="text-amber-500" />
          <SliderControl label="Thở ra (Exhale)" val={exhale} setVal={setExhale} color="text-emerald-500" />
          <SliderControl label="Nín thở (Xả hơi)" val={hold2} setVal={setHold2} color="text-slate-500" />

          {/* Preview Cycle */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Chu trình dự kiến</p>
            <div className="flex items-center justify-center gap-2 font-mono text-lg text-slate-700">
              <span className="text-blue-500">{inhale}s</span>
              <span>-</span>
              <span className="text-amber-500">{hold1}s</span>
              <span>-</span>
              <span className="text-emerald-500">{exhale}s</span>
              <span>-</span>
              <span className="text-slate-500">{hold2}s</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Tổng cộng: {inhale + hold1 + exhale + hold2}s / chu kỳ</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={handleStart}
            disabled={inhale === 0 || exhale === 0}
            className={`
              w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center shadow-lg transition-all
              ${(inhale === 0 || exhale === 0) ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-xl hover:scale-[1.02]'}
            `}
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Bắt đầu tập
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomBreathingBuilder;
