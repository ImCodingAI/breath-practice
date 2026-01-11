import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion';
import { StageData, BreathingStep } from '../types';

interface BreathingCircleProps {
  stage: StageData;
  isActive: boolean;
  onSessionTick?: () => void;
  onCycleComplete?: () => void;
  onStepChange?: (action: 'inhale' | 'exhale' | 'hold') => void;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ 
  stage, 
  isActive, 
  onSessionTick, 
  onCycleComplete,
  onStepChange
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(stage.steps[0].duration);
  
  const startTimeRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const hasStartedRef = useRef<boolean>(false);

  const currentStep: BreathingStep = stage.steps[currentStepIndex];

  useEffect(() => {
    if (isActive && !hasStartedRef.current && onStepChange) {
      onStepChange(stage.steps[0].action);
      hasStartedRef.current = true;
    }
    if (!isActive) {
      hasStartedRef.current = false;
    }
  }, [isActive, onStepChange, stage.steps]);

  useEffect(() => {
    if (!isActive) {
      startTimeRef.current = null;
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      lastTickRef.current = 0; 
    }

    const interval = setInterval(() => {
      if (!startTimeRef.current) return;

      const now = Date.now();
      const elapsedSeconds = (now - startTimeRef.current) / 1000;
      const stepDuration = currentStep.duration;
      
      const remaining = Math.max(0, stepDuration - elapsedSeconds);
      
      const displayTime = Math.ceil(remaining);
      setTimeLeft(displayTime === 0 ? 1 : displayTime);

      const currentTick = Math.floor(elapsedSeconds);
      if (currentTick > lastTickRef.current) {
        if (onSessionTick) onSessionTick();
        lastTickRef.current = currentTick;
      }

      if (elapsedSeconds >= stepDuration) {
        const nextIndex = (currentStepIndex + 1) % stage.steps.length;
        
        if (onStepChange) {
          onStepChange(stage.steps[nextIndex].action);
        }

        startTimeRef.current = Date.now();
        lastTickRef.current = 0;
        
        if (nextIndex === 0 && onCycleComplete) {
          onCycleComplete();
        }
        setCurrentStepIndex(nextIndex);
        setTimeLeft(stage.steps[nextIndex].duration);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, currentStepIndex, stage.steps, currentStep.duration, onSessionTick, onCycleComplete, onStepChange]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStepIndex(0);
      setTimeLeft(stage.steps[0].duration);
      startTimeRef.current = null;
    }
  }, [isActive, stage]);

  const pathPoints = {
    top: { cx: 100, cy: 30 },
    midTop: { cx: 112, cy: 65 },
    midBot: { cx: 88, cy: 105 },
    bot: { cx: 100, cy: 140 }
  };

  const getBallAnimation = (action: string, duration: number): TargetAndTransition => {
    if (action === 'inhale') {
      return {
        cx: [pathPoints.top.cx, pathPoints.midTop.cx, pathPoints.midBot.cx, pathPoints.bot.cx],
        cy: [pathPoints.top.cy, pathPoints.midTop.cy, pathPoints.midBot.cy, pathPoints.bot.cy],
        fill: "#60a5fa", 
        scale: [1, 1.2, 1.4, 1.5],
        filter: "drop-shadow(0 0 8px rgba(96, 165, 250, 0.8))",
        transition: { duration: duration, ease: "easeInOut", times: [0, 0.33, 0.66, 1] }
      };
    }
    
    if (action === 'exhale') {
      return {
        cx: [pathPoints.bot.cx, pathPoints.midBot.cx, pathPoints.midTop.cx, pathPoints.top.cx],
        cy: [pathPoints.bot.cy, pathPoints.midBot.cy, pathPoints.midTop.cy, pathPoints.top.cy],
        fill: "#34d399", 
        scale: [1.5, 1.3, 1.1, 1.0],
        filter: "drop-shadow(0 0 5px rgba(52, 211, 153, 0.6))",
        transition: { duration: duration, ease: "easeInOut", times: [0, 0.33, 0.66, 1] }
      };
    }

    if (action === 'hold') {
      const isFull = currentStep.scale > 1.2;
      const targetPos = isFull ? pathPoints.bot : pathPoints.top;
      const baseScale = isFull ? 1.5 : 1.0;
      
      return {
        cx: targetPos.cx,
        cy: targetPos.cy,
        scale: [baseScale, baseScale * 1.1, baseScale],
        fill: "#fbbf24", 
        filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))",
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      };
    }
    
    return {};
  };

  const getInstructionText = (action: string) => {
    switch (action) {
      case 'inhale': return 'Dẫn khí xuống Đan Điền';
      case 'exhale': return 'Đẩy khí ra khỏi cơ thể';
      case 'hold': return 'Giữ khí tĩnh lặng';
      default: return '';
    }
  };

  const visualPath = `M${pathPoints.top.cx},${pathPoints.top.cy} C120,60 80,90 ${pathPoints.bot.cx},${pathPoints.bot.cy}`;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[400px]">
      
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
            </linearGradient>
             <linearGradient id="bodyGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Hơi thở nền (Outer Glow) */}
          <motion.circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.5"
            opacity="0.2"
            animate={{
              scale: [0.98, 1.02, 0.98],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Silhouette Cơ thể */}
          <path
            d="M100,20 C115,20 125,30 130,45 C135,60 150,70 160,90 C170,110 180,160 140,175 L60,175 C20,160 30,110 40,90 C50,70 65,60 70,45 C75,30 85,20 100,20 Z"
            className="fill-[url(#bodyGradient)] dark:fill-[url(#bodyGradientDark)]"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <path d="M60,175 Q100,190 140,175" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />

          {/* Các điểm Chakra */}
          <circle cx="100" cy="30" r="2" fill="#94a3b8" opacity="0.5" />
          <circle cx="100" cy="140" r="3" fill="#94a3b8" opacity="0.8" />

          {/* Đường dẫn khí */}
          <path
            d={visualPath}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
            className="dark:stroke-slate-600"
          />

          {/* Hạt năng lượng (The Ball) */}
          <motion.circle
            r="6"
            animate={getBallAnimation(currentStep.action, currentStep.duration)}
          />
          
          {/* Luồng khí bao quanh (Aura) */}
          <AnimatePresence>
            {currentStep.action === 'inhale' && (
              <motion.path
                d="M100,15 C125,15 140,30 145,50 C155,70 170,80 180,100 C190,130 190,180 100,190 C10,180 10,130 20,100 C30,80 45,70 55,50 C60,30 75,15 100,15 Z"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.9, pathLength: 0 }}
                animate={{ opacity: 0.3, scale: 1.05, pathLength: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                transition={{ duration: 4, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

        </svg>
      </div>

      <div className="mt-4 text-center z-10">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center"
          >
            <h3 className={`text-3xl font-bold uppercase tracking-widest mb-1 ${
               currentStep.action === 'inhale' ? 'text-blue-500 dark:text-blue-400' :
               currentStep.action === 'exhale' ? 'text-emerald-500 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'
            }`}>
              {currentStep.label}
            </h3>
            
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-2">
              {getInstructionText(currentStep.action)}
            </p>

            <span className="text-6xl font-light font-mono text-slate-700 dark:text-slate-200">
              {Math.ceil(timeLeft)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BreathingCircle;