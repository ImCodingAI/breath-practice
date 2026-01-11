import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Quote, Volume2, VolumeX } from 'lucide-react';
import { StageData } from '../types';
import { INSPIRATIONAL_QUOTES } from '../constants';
import BreathingCircle from './BreathingCircle';
import { useBreathingSound } from '../hooks/useBreathingSound';

interface BreathingGuideProps {
  stage: StageData;
  onComplete: (duration: number) => void; 
  onExit: (duration: number) => void;     
}

const TARGET_CYCLES = 10;

const BreathingGuide: React.FC<BreathingGuideProps> = ({ stage, onComplete, onExit }) => {
  const [sessionDuration, setSessionDuration] = useState(0); 
  const [isActive, setIsActive] = useState(false);           
  const [showCompletion, setShowCompletion] = useState(false); 
  const [completedCycles, setCompletedCycles] = useState(0);   
  const [randomQuote, setRandomQuote] = useState('');          

  const { playInhale, playExhale, toggleMute, isMuted } = useBreathingSound();

  useEffect(() => {
    const startTimer = setTimeout(() => setIsActive(true), 500);
    return () => clearTimeout(startTimer);
  }, []);

  const handleFinish = useCallback(() => {
    setIsActive(false);
    const quote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
    setRandomQuote(quote);
    setShowCompletion(true);
  }, []);

  const handleSessionTick = useCallback(() => {
    setSessionDuration(prev => prev + 1);
  }, []);

  const handleCycleComplete = useCallback(() => {
    setCompletedCycles(prev => {
      const newCount = prev + 1;
      if (newCount >= TARGET_CYCLES && stage.id !== 'custom') {
        return newCount; 
      }
      return newCount;
    });
  }, [stage.id]);

  const handleStepChange = useCallback((action: 'inhale' | 'exhale' | 'hold') => {
    if (action === 'inhale') {
      playInhale();
    } else if (action === 'exhale') {
      playExhale();
    }
  }, [playInhale, playExhale]);

  useEffect(() => {
    if (stage.id !== 'custom' && completedCycles >= TARGET_CYCLES && isActive) {
      handleFinish();
    }
  }, [completedCycles, isActive, handleFinish, stage.id]);

  const confirmCompletion = () => {
    onComplete(sessionDuration); 
  };

  const handleExitClick = () => {
    onExit(sessionDuration); 
  };

  if (showCompletion) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center p-6 bg-slate-50 min-h-screen">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-slate-100 relative overflow-hidden">
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

  return (
    <div className="relative flex flex-col items-center justify-between h-screen w-full max-w-md mx-auto py-6">
      
      <div className="w-full flex justify-between items-center px-6 pt-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-700">{stage.title}</h2>
          <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
            {stage.id === 'custom' ? `Thời gian: ${Math.floor(sessionDuration/60)}:${(sessionDuration%60).toString().padStart(2,'0')}` : `Chu kỳ: ${completedCycles}/${TARGET_CYCLES}`}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className={`p-2 rounded-full transition-colors ${!isMuted ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-400'}`}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <button 
            onClick={handleExitClick}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
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
          onStepChange={handleStepChange}
        />
      </div>

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