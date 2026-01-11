import { DailyStat } from '../types';
import { format, subDays, isSameDay, parseISO, startOfDay } from 'date-fns';

/**
 * Tiện ích quản lý IndexedDB.
 * Stores:
 * 1. user_progress: { id: 'main_progress', level: number }
 * 2. sessions: { id: autoIncrement, date: ISOString, durationSeconds: number, stageId: number|string }
 */

const DB_NAME = 'SereneBreathDB';
const DB_VERSION = 2; // Bump version to add new store
const STORE_PROGRESS = 'user_progress';
const STORE_SESSIONS = 'sessions';
const PROGRESS_KEY = 'main_progress';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Store 1: Progress
      if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
        db.createObjectStore(STORE_PROGRESS, { keyPath: 'id' });
      }

      // Store 2: History/Sessions
      if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
        const sessionStore = db.createObjectStore(STORE_SESSIONS, { keyPath: 'id', autoIncrement: true });
        sessionStore.createIndex('date', 'date', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => {
      console.error("IndexedDB error:", (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// --- PROGRESS FUNCTIONS ---

export const getSavedProgress = async (): Promise<number> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction([STORE_PROGRESS], 'readonly');
      const req = tx.objectStore(STORE_PROGRESS).get(PROGRESS_KEY);
      req.onsuccess = () => resolve(req.result ? req.result.level : 1);
      req.onerror = () => resolve(1);
    });
  } catch { return 1; }
};

export const saveProgressToDB = async (level: number): Promise<void> => {
  const db = await openDB();
  const tx = db.transaction([STORE_PROGRESS], 'readwrite');
  tx.objectStore(STORE_PROGRESS).put({ id: PROGRESS_KEY, level, updatedAt: new Date().toISOString() });
};

// --- SESSION & STATS FUNCTIONS ---

/**
 * Lưu một phiên tập luyện vào lịch sử
 */
export const saveSession = async (durationSeconds: number, stageId: number | string): Promise<void> => {
  if (durationSeconds < 10) return; // Bỏ qua các session quá ngắn (< 10s)
  
  const db = await openDB();
  const tx = db.transaction([STORE_SESSIONS], 'readwrite');
  tx.objectStore(STORE_SESSIONS).add({
    date: new Date().toISOString(),
    durationSeconds,
    stageId
  });
};

/**
 * Lấy thống kê 7 ngày gần nhất
 */
export const getWeeklyStats = async (): Promise<DailyStat[]> => {
  const db = await openDB();
  const sessions: any[] = await new Promise((resolve) => {
    const tx = db.transaction([STORE_SESSIONS], 'readonly');
    const req = tx.objectStore(STORE_SESSIONS).getAll();
    req.onsuccess = () => resolve(req.result);
  });

  // Tạo mảng 7 ngày gần nhất
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(new Date(), 6 - i);
    return {
      dateObj: startOfDay(d),
      dateStr: format(d, 'yyyy-MM-dd'),
      dayName: format(d, 'EE'), // Mon, Tue... (cần map sang TV nếu muốn)
    };
  });

  const dayMap: Record<string, string> = {
    'Mon': 'T2', 'Tue': 'T3', 'Wed': 'T4', 'Thu': 'T5', 'Fri': 'T6', 'Sat': 'T7', 'Sun': 'CN'
  };

  // Tính tổng thời gian cho từng ngày
  const stats = last7Days.map(day => {
    const totalSeconds = sessions
      .filter(s => isSameDay(parseISO(s.date), day.dateObj))
      .reduce((sum, s) => sum + s.durationSeconds, 0);
    
    return {
      day: dayMap[day.dayName] || day.dayName,
      date: day.dateStr,
      minutes: Math.round(totalSeconds / 60)
    };
  });

  return stats;
};

/**
 * Tính số ngày liên tiếp (Streak)
 */
export const calculateStreak = async (): Promise<number> => {
  const db = await openDB();
  const sessions: any[] = await new Promise((resolve) => {
    const tx = db.transaction([STORE_SESSIONS], 'readonly');
    const store = tx.objectStore(STORE_SESSIONS);
    const index = store.index('date');
    // Lấy tất cả, nhưng tối ưu hơn nên dùng cursor ngược. Ở đây dùng getAll cho đơn giản vì data nhỏ.
    const req = index.getAll(); 
    req.onsuccess = () => resolve(req.result);
  });

  if (sessions.length === 0) return 0;

  // Sắp xếp giảm dần theo ngày
  const sortedDates = sessions
    .map(s => startOfDay(parseISO(s.date)).getTime())
    .sort((a, b) => b - a);
  
  // Loại bỏ trùng lặp ngày
  const uniqueDates = [...new Set(sortedDates)];

  if (uniqueDates.length === 0) return 0;

  const today = startOfDay(new Date()).getTime();
  const yesterday = startOfDay(subDays(new Date(), 1)).getTime();
  const lastPractice = uniqueDates[0];

  // Nếu lần cuối tập không phải hôm nay hoặc hôm qua -> Mất chuỗi
  if (lastPractice !== today && lastPractice !== yesterday) {
    return 0;
  }

  let streak = 1;
  // Bắt đầu đếm ngược từ ngày gần nhất
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = uniqueDates[i];
    const prev = uniqueDates[i + 1];
    
    // Kiểm tra xem prev có phải là ngày ngay trước current không (cách nhau 24h = 86400000ms)
    // Cho phép sai số nhỏ do timezone change
    const diffDays = (current - prev) / (1000 * 60 * 60 * 24);
    
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
