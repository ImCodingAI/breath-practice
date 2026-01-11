/**
 * Định nghĩa các Stage (Cấp độ) có sẵn trong ứng dụng.
 * 'custom' là ID đặc biệt cho chế độ tự do.
 */
export type StageId = 1 | 2 | 3 | 'custom';

/**
 * Cấu trúc của một bước thở (Ví dụ: Hít vào, Nín thở...).
 */
export interface BreathingStep {
  /** Hành động cụ thể: hít, thở, hoặc nín */
  action: 'inhale' | 'exhale' | 'hold';
  /** Nhãn hiển thị trên màn hình (UI) */
  label: string;
  /** Thời gian thực hiện bước này (tính bằng giây) */
  duration: number; 
  /** 
   * Hệ số tỉ lệ hình ảnh (Visual Scale).
   * 1.0: Kích thước bình thường (khi thở ra hết).
   * 1.5: Kích thước lớn nhất (khi hít đầy phổi).
   */
  scale: number; 
}

/**
 * Dữ liệu đầy đủ cho một bài tập (Stage).
 * Dùng để render UI danh sách và điều khiển logic bài tập.
 */
export interface StageData {
  id: StageId;
  title: string;
  description: string;
  /** Class màu nền Tailwind (ví dụ: bg-blue-100) */
  color: string;
  /** Danh sách các lợi ích (hiển thị ở màn hình chi tiết) */
  benefits: string[];
  /** Hướng dẫn tư thế ngồi/nằm */
  instruction: string;
  /** Mảng các bước thở lặp đi lặp lại */
  steps: BreathingStep[];
}

/**
 * Dữ liệu cho biểu đồ thống kê
 */
export interface DailyStat {
  day: string; // Tên thứ (T2, T3...)
  date: string; // YYYY-MM-DD
  minutes: number;
}
