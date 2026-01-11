import React, { useState, useEffect } from 'react';
import { Wind, Heart, BarChart2, Flame, Settings, Moon, Sun } from 'lucide-react';
import { STAGES_DATA } from './constants';
import { StageId, StageData, DailyStat, MoodValue } from './types';
import StageCard from './components/StageCard';
import BreathingGuide from './components/BreathingGuide';
import StageDetail from './components/StageDetail';
import ProgressBar from './components/ProgressBar';
import StatisticsDashboard from './components/StatisticsDashboard';
import CustomBreathingBuilder from './components/CustomBreathingBuilder';
import { getSavedProgress, saveProgressToDB, saveSession, getWeeklyStats, calculateStreak } from './utils/db';

const App: React.FC = () => {
  // --- STATE QUẢN LÝ ---
  const [currentStageId, setCurrentStageId] = useState<StageId | null>(null);
  const [customStageData, setCustomStageData] = useState<StageData | null>(null);
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isListVisible, setIsListVisible] = useState(true);

  // State Dashboard & Custom & Dark Mode
  const [showStats, setShowStats] = useState(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [streak, setStreak] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState<DailyStat[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // --- LIFECYCLE ---
  useEffect(() => {
    loadUserData();
    // Load dark mode preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const loadUserData = async () => {
    try {
      const [savedLevel, currentStreak, stats] = await Promise.all([
        getSavedProgress(),
        calculateStreak(),
        getWeeklyStats()
      ]);
      setProgress(savedLevel);
      setStreak(currentStreak);
      setWeeklyStats(stats);
    } catch (error) {
      console.error("Failed to load user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- HANDLERS (ĐIỀU KHIỂN LUỒNG) ---

  const handleSelectStage = (id: StageId) => {
    setIsListVisible(false);
    setTimeout(() => setCurrentStageId(id), 300);
  };

  const handleBackToMenu = () => {
    setCurrentStageId(null);
    setCustomStageData(null);
    setTimeout(() => setIsListVisible(true), 50);
  };

  const handleStartPractice = () => {
    setIsPracticeMode(true);
  };

  // Xử lý Custom Mode
  const handleOpenCustomBuilder = () => setShowCustomBuilder(true);
  const handleCloseCustomBuilder = () => setShowCustomBuilder(false);
  
  const handleStartCustomPractice = (stageData: StageData) => {
    setCustomStageData(stageData);
    setShowCustomBuilder(false);
    setIsPracticeMode(true);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Logic kết thúc bài tập
  const handleSessionEnd = async (duration: number, isCompleted: boolean, moodBefore?: MoodValue, moodAfter?: MoodValue) => {
    const activeId = customStageData ? 'custom' : currentStageId;
    
    if (activeId) {
      await saveSession(duration, activeId, moodBefore, moodAfter);
    }

    if (isCompleted && currentStageId && typeof currentStageId === 'number') {
       if (currentStageId === progress && progress < 5) { // Update max progress
        const newProgress = progress + 1;
        setProgress(newProgress);
        await saveProgressToDB(newProgress);
      }
    }

    await loadUserData();

    setIsPracticeMode(false);
    if (customStageData) {
      setCustomStageData(null);
    }
  };

  const onGuideComplete = (duration: number, moodBefore?: MoodValue, moodAfter?: MoodValue) => handleSessionEnd(duration, true, moodBefore, moodAfter);
  const onGuideExit = (duration: number) => handleSessionEnd(duration, false);

  const handleExitApp = () => {
    setIsPracticeMode(false);
    setCurrentStageId(null);
    setCustomStageData(null);
    setTimeout(() => setIsListVisible(true), 50);
  }

  // --- RENDER ---
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin text-blue-500"><Wind size={40} /></div>
      </div>
    );
  }

  // VIEW: Tập luyện (Breathing Guide)
  if (isPracticeMode) {
    const activeStage = customStageData || STAGES_DATA.find((s) => s.id === currentStageId);
    
    if (activeStage) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden animate-fade-in text-slate-800 dark:text-slate-100 transition-colors duration-500">
          <BreathingGuide 
            stage={activeStage} 
            onComplete={onGuideComplete}
            onExit={onGuideExit}
          />
        </div>
      );
    }
  }

  // VIEW: Dashboard Chính
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-8 md:py-12 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
             <div 
              className="inline-flex items-center p-2 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all self-start"
              onClick={handleExitApp}
            >
              <Wind className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Hơi Thở Tĩnh Lặng</span>
            </div>
            {!currentStageId && (
               <p className={`text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xs transition-opacity duration-300 ${isListVisible ? 'opacity-100' : 'opacity-0'}`}>
                 Tìm lại sự cân bằng trong từng hơi thở.
               </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md transition-all"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            
            <button 
              onClick={() => setShowStats(true)}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-600 dark:text-slate-300 hover:text-orange-500"
            >
              {streak > 0 ? (
                <>
                  <Flame className="w-5 h-5 text-orange-500 fill-current animate-pulse" />
                  <span className="font-bold">{streak}</span>
                </>
              ) : (
                <BarChart2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </header>

        {/* Modal: Statistics */}
        {showStats && (
          <StatisticsDashboard 
            stats={weeklyStats} 
            streak={streak} 
            onClose={() => setShowStats(false)} 
          />
        )}

        {/* Modal: Custom Builder */}
        {showCustomBuilder && (
          <CustomBreathingBuilder 
            onStart={handleStartCustomPractice} 
            onClose={handleCloseCustomBuilder} 
          />
        )}

        {/* Main Content */}
        {!currentStageId && <ProgressBar currentLevel={progress} totalLevels={5} />}

        <div className="relative min-h-[400px]">
          
          {/* Detail View Layer */}
          {currentStageId && !customStageData && (
            <div className="absolute inset-0 z-10">
              {STAGES_DATA.map(stage => {
                if (stage.id !== currentStageId) return null;
                return (
                  <StageDetail 
                    key={stage.id}
                    stage={stage}
                    onStart={handleStartPractice}
                    onBack={handleBackToMenu}
                  />
                );
              })}
            </div>
          )}

          {/* List View Layer */}
          {!currentStageId && !customStageData && (
            <div 
              className={`
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ease-in-out transform pb-20
                ${isListVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
              `}
            >
              {/* Render bài tập chính */}
              {STAGES_DATA.map((stage) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  isLocked={typeof stage.id === 'number' ? stage.id > progress : false}
                  isCompleted={typeof stage.id === 'number' ? stage.id < progress : false}
                  onSelect={handleSelectStage}
                />
              ))}

              {/* Card Custom Mode */}
              <div 
                onClick={handleOpenCustomBuilder}
                className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 cursor-pointer transition-all group flex flex-col items-center justify-center text-center min-h-[280px]"
              >
                <div className="bg-rose-100 dark:bg-rose-900/50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400">Tự do</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Thiết lập thời gian riêng</p>
              </div>
            </div>
          )}
        </div>

        <footer className={`text-center text-slate-400 dark:text-slate-500 text-sm flex flex-col items-center gap-2 transition-opacity duration-300 ${currentStageId ? 'opacity-0 hidden' : 'opacity-100'}`}>
          <div className="flex items-center gap-1">
            <span>Được tạo với</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>cho sức khỏe của bạn</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;