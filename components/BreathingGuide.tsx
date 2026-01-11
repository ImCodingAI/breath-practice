import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Quote } from 'lucide-react';
import { StageData } from '../types';
import { INSPIRATIONAL_QUOTES } from '../constants';
import BreathingCircle from './BreathingCircle';

interface BreathingGuideProps {
  stage: StageData;
  onComplete: (duration: number) => void; 
  onExit: (duration: number) => void;     
}

// Số vòng lặp cần thiết để hoàn thành bài tập (Gamification)
const TARGET_CYCLES = 10;

/**
 * Component quản lý phiên tập luyện (Session Manager).
 * Chịu trách nhiệm về: Thời gian, Đếm chu kỳ, và Màn hình kết quả.
 */
const BreathingGuide: React.FC<BreathingGuideProps> = ({ stage, onComplete, onExit }) => {
  const [sessionDuration, setSessionDuration] = useState(0); // Tổng thời gian tập (giây)
  const [isActive, setIsActive] = useState(false);           // Trạng thái chạy/dừng
  const [showCompletion, setShowCompletion] = useState(false); // Trạng thái hiển thị màn hình chúc mừng
  const [completedCycles, setCompletedCycles] = useState(0);   // Số chu kỳ đã hoàn thành
  const [randomQuote, setRandomQuote] = useState('');          // Trích dẫn ngẫu nhiên

  // Tự động bắt đầu sau 0.5s để UI render xong mượt mà
  useEffect(() => {
    const startTimer = setTimeout(() => setIsActive(true), 500);
    return () => clearTimeout(startTimer);
  }, []);

  // Xử lý khi kết thúc (dù do người dùng bấm hay tự động)
  const handleFinish = useCallback(() => {
    setIsActive(false);
    // Chọn random 1 câu quote từ constants
    const quote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
    setRandomQuote(quote);
    setShowCompletion(true);
  }, []);

  // Handler: Gọi mỗi giây từ BreathingCircle
  // Sử dụng useCallback để đảm bảo function identity ổn định, tránh re-render con
  const handleSessionTick = useCallback(() => {
    setSessionDuration(prev => prev + 1);
  }, []);

  // Handler: Gọi khi BreathingCircle chạy hết 1 vòng các bước
  const handleCycleComplete = useCallback(() => {
    setCompletedCycles(prev => {
      const newCount = prev + 1;
      // Chế độ Custom không có Target Cycle cố định, nhưng ta cứ để 10 cho thống nhất
      if (newCount >= TARGET_CYCLES && stage.id !== 'custom') {
        return newCount; // Effect sẽ trigger finish
      }
      return newCount;
    });
  }, [stage.id]);

  // Effect theo dõi completion (chỉ áp dụng cho bài tập có sẵn, custom thì tập thoải mái)
  useEffect(() => {
    if (stage.id !== 'custom' && completedCycles >= TARGET_CYCLES && isActive) {
      handleFinish();
    }
  }, [completedCycles, isActive, handleFinish, stage.id]);

  const confirmCompletion = () => {
    onComplete(sessionDuration); // Gửi duration về App để lưu DB
  };

  const handleExitClick = () => {
    onExit(sessionDuration); // Gửi duration về App để lưu DB
  };

  // --- MÀN HÌNH CHÚC MỪNG (SUCCESS SCREEN) ---
  if (showCompletion) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center p-6 bg-slate-50 min-h-screen">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-slate-100 relative overflow-hidden">
           {/* Thanh trang trí gradient trên cùng */}
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-emerald-400"></div>

          <div className="mb-6 flex justify-center mt-4">
            <div className="bg-emerald-100 p-4 rounded-full ring-8 ring-emerald-50 animate-bounce-slow">
              <Check className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Tuyệt vời!</h2>
          <p className="text-slate-500 mb-6 text-sm">
             Bạn đã thư giãn trong {Math.floor(sessionDuration / 60)} phút {sessionDuration % 60} giây.
          </p>

          {/* Quote Block */}
          <div className="bg-slate-50 p-6 rounded-xl mb-8 relative">
            <Quote className="w-8 h-8 text-blue-200 absolute -top-3 -left-2 fill-current" />
            <p className="text-slate-700 italic font-medium leading-relaxed z-10 relative">
              "{randomQuote}"
            </p>
          </div>

          <button
            onClick={confirmCompletion}
            className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // --- MÀN HÌNH TẬP LUYỆN (PRACTICE SCREEN) ---
  return (
    <div className="relative flex flex-col items-center justify-between h-screen w-full max-w-md mx-auto py-6">
      
      {/* Top Bar: Tiêu đề & Đếm chu kỳ */}
      <div className="w-full flex justify-between items-center px-6 pt-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-700">{stage.title}</h2>
          <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
            {stage.id === 'custom' ? `Thời gian: ${Math.floor(sessionDuration/60)}:${(sessionDuration%60).toString().padStart(2,'0')}` : `Chu kỳ: ${completedCycles}/${TARGET_CYCLES}`}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExitClick}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Khu vực trung tâm: Animation */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
        <BreathingCircle 
          stage={stage} 
          isActive={isActive} 
          onSessionTick={handleSessionTick}
          onCycleComplete={handleCycleComplete}
        />
      </div>

      {/* Bottom Control: Nút kết thúc sớm */}
      <div className="w-full px-8 pb-8 text-center">
        <p className="text-slate-500 mb-10 italic text-sm font-medium opacity-80 animate-pulse">
          "Hãy tập trung vào hơi thở, thả lỏng vai và thư giãn tâm trí."
        </p>
        
        <button
          onClick={handleFinish}
          className="w-full bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all shadow-sm hover:shadow-md"
        >
          Kết thúc
        </button>
      </div>
    </div>
  );
};

export default BreathingGuide;