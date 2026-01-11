import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Quote, Smile, Frown, Meh, Annoyed } from 'lucide-react';
import { StageData, MoodValue } from '../types';
import { INSPIRATIONAL_QUOTES } from '../constants';
import BreathingCircle from './BreathingCircle';

interface BreathingGuideProps {
  stage: StageData;
  onComplete: (duration: number, moodBefore?: MoodValue, moodAfter?: MoodValue) => void; 
  onExit: (duration: number) => void;     
}

const TARGET_CYCLES = 10;

type SessionStep = 'mood_checkin' | 'breathing' | 'mood_checkout' | 'completed';

const BreathingGuide: React.FC<BreathingGuideProps> = ({ stage, onComplete, onExit }) => {
  const [currentStep, setCurrentStep] = useState<SessionStep>('mood_checkin');
  const [sessionDuration, setSessionDuration] = useState(0); 
  const [isActive, setIsActive] = useState(false);           
  const [completedCycles, setCompletedCycles] = useState(0);   
  const [randomQuote, setRandomQuote] = useState('');          
  
  // Mood State
  const [moodBefore, setMoodBefore] = useState<MoodValue | undefined>(undefined);
  const [moodAfter, setMoodAfter] = useState<MoodValue | undefined>(undefined);

  useEffect(() => {
    // Only start timer/activity if we are in the breathing step
    if (currentStep === 'breathing') {
      const startTimer = setTimeout(() => setIsActive(true), 500);
      return () => clearTimeout(startTimer);
    } else {
      setIsActive(false);
    }
  }, [currentStep]);

  const handleFinishBreathing = useCallback(() => {
    setIsActive(false);
    setCurrentStep('mood_checkout');
  }, []);

  const handleSessionTick = useCallback(() => {
    setSessionDuration(prev => prev + 1);
  }, []);

  const handleCycleComplete = useCallback(() => {
    setCompletedCycles(prev => {
      const newCount = prev + 1;
      return newCount;
    });
  }, []);

  useEffect(() => {
    if (stage.id !== 'custom' && completedCycles >= TARGET_CYCLES && currentStep === 'breathing') {
      handleFinishBreathing();
    }
  }, [completedCycles, currentStep, handleFinishBreathing, stage.id]);

  const handleCompleteSession = () => {
    const quote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
    setRandomQuote(quote);
    setCurrentStep('completed');
  };

  const confirmExit = () => {
    onComplete(sessionDuration, moodBefore, moodAfter); 
  };

  const handleExitClick = () => {
    onExit(sessionDuration); 
  };

  // --- MOOD SELECTION COMPONENTS ---

  const MoodSelector = ({ onSelect }: { onSelect: (m: MoodValue) => void }) => (
    <div className="grid grid-cols-5 gap-2 w-full max-w-sm px-4">
      {[
        { val: 1, icon: Annoyed, label: 'Căng thẳng' },
        { val: 2, icon: Frown, label: 'Lo âu' },
        { val: 3, icon: Meh, label: 'Bình thường' },
        { val: 4, icon: Smile, label: 'Tốt' },
        { val: 5, icon: Check, label: 'Thư thái' } // Using Check temporarily as 'very happy' equivalent icon
      ].map((item) => (
        <button
          key={item.val}
          onClick={() => onSelect(item.val as MoodValue)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-110 transition-all shadow-sm">
            <item.icon className="w-8 h-8 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
          </div>
          <span className="text-[10px] font-medium text-slate-400 group-hover:text-blue-500 uppercase tracking-wide">{item.label}</span>
        </button>
      ))}
    </div>
  );

  // --- RENDER STEPS ---

  if (currentStep === 'mood_checkin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-900 animate-fade-in px-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">Bạn đang cảm thấy thế nào?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-center text-sm">Hãy dành một chút thời gian để lắng nghe bản thân.</p>
        <MoodSelector onSelect={(m) => { setMoodBefore(m); setCurrentStep('breathing'); }} />
        <button onClick={() => setCurrentStep('breathing')} className="mt-12 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm underline">
          Bỏ qua
        </button>
      </div>
    );
  }

  if (currentStep === 'mood_checkout') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-900 animate-fade-in px-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">Sau bài tập, bạn thấy sao?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-center text-sm">Ghi nhận sự thay đổi của cơ thể và tâm trí.</p>
        <MoodSelector onSelect={(m) => { setMoodAfter(m); handleCompleteSession(); }} />
        <button onClick={handleCompleteSession} className="mt-12 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm underline">
          Bỏ qua
        </button>
      </div>
    );
  }

  if (currentStep === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-sm w-full border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-colors">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-emerald-400"></div>

          <div className="mb-6 flex justify-center mt-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-full ring-8 ring-emerald-50 dark:ring-emerald-900/20 animate-bounce-slow">
              <Check className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Tuyệt vời!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
             Bạn đã thư giãn trong {Math.floor(sessionDuration / 60)} phút {sessionDuration % 60} giây.
          </p>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl mb-8 relative">
            <Quote className="w-8 h-8 text-blue-200 dark:text-blue-500/30 absolute -top-3 -left-2 fill-current" />
            <p className="text-slate-700 dark:text-slate-200 italic font-medium leading-relaxed z-10 relative">
              "{randomQuote}"
            </p>
          </div>

          <button
            onClick={confirmExit}
            className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-700 dark:hover:bg-slate-600 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // --- BREATHING VIEW ---
  return (
    <div className="relative flex flex-col items-center justify-between h-screen w-full max-w-md mx-auto py-6">
      
      {/* Header Controls */}
      <div className="w-full flex justify-between items-center px-6 pt-2 z-20">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">{stage.title}</h2>
          <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
            {stage.id === 'custom' ? `Thời gian: ${Math.floor(sessionDuration/60)}:${(sessionDuration%60).toString().padStart(2,'0')}` : `Chu kỳ: ${completedCycles}/${TARGET_CYCLES}`}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Audio Controls Removed */}
          <button 
            onClick={handleExitClick}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
        <BreathingCircle 
          stage={stage} 
          isActive={isActive} 
          onSessionTick={handleSessionTick}
          onCycleComplete={handleCycleComplete}
        />
      </div>

      <div className="w-full px-8 pb-8 text-center">
        <p className="text-slate-500 dark:text-slate-400 mb-10 italic text-sm font-medium opacity-80 animate-pulse">
          "Hãy tập trung vào hơi thở, thả lỏng vai và thư giãn tâm trí."
        </p>
        
        <button
          onClick={handleFinishBreathing}
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md"
        >
          Kết thúc
        </button>
      </div>
    </div>
  );
};

export default BreathingGuide;